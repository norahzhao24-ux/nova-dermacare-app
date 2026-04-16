from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
import cv2
import numpy as np

# ---------------------------------------------------
# IMPORT ACNE MODEL
# ---------------------------------------------------
from model_def import AcneModel

class AcneClassifier(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.model = AcneModel()
        state_dict = torch.load("acne_model.pt", map_location="cpu")
        self.model.load_state_dict(state_dict)
        self.model.eval()

    def forward(self, x):
        return self.model(x)

model = AcneClassifier()
print("Acne model loaded successfully")

# ---------------------------------------------------
# FASTAPI APP
# ---------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running"}

# ---------------------------------------------------
# HUMAN DESCRIPTIONS
# ---------------------------------------------------

ACNE_DESCRIPTIONS = {
    "acne0": "Your skin shows minimal visible acne. You may have occasional tiny bumps, but overall your complexion appears clear.",
    "acne1": "You have mild acne. Small clogged pores or a few inflamed spots may be present, but inflammation is limited.",
    "acne2": "You have moderate acne. Noticeable papules and pustules are visible, indicating active inflammation.",
    "acne3": "You have severe acne. Deeper nodules or cystic lesions may be present, showing significant inflammation."
}

ROSACEA_DESCRIPTIONS = {
    "none": "No signs of rosacea were detected. Your skin does not show persistent flushing or vascular sensitivity.",
    "mild": "Mild rosacea — light flushing or subtle redness may appear in the central face.",
    "moderate": "Moderate rosacea — visible redness and irritation across the cheeks, nose, or forehead.",
    "severe": "Severe rosacea — pronounced redness, inflammation, or visible vascular patterns."
}

SKIN_TYPE_DESCRIPTIONS = {
    "oily": "Your skin appears oily, with increased shine and oil production, especially in the T‑zone.",
    "dry": "Your skin appears dry, with reduced moisture and possible tightness or flaking.",
    "combination": "Your skin is combination type — oily in the T‑zone but normal or dry on the cheeks.",
    "normal": "Your skin is well‑balanced with stable hydration and oil levels."
}

REDNESS_DESCRIPTIONS = {
    "low": "Your redness level is low. Your skin tone appears even with minimal irritation.",
    "moderate": "Your redness level is moderate. Some warmth or irritation is visible in certain areas.",
    "high": "Your redness level is high. Significant flushing or inflammation is present."
}

LESION_DESCRIPTIONS = {
    "none": "No active acne lesions are visible.",
    "papules": "Papules — small inflamed red bumps caused by clogged pores or irritation.",
    "pustules": "Pustules — inflamed bumps with visible white or yellow centers.",
    "nodules": "Nodules — deeper, painful lumps under the skin that indicate more severe acne."
}

# ---------------------------------------------------
# FEATURE EXTRACTION
# ---------------------------------------------------
def extract_features(image_np):
    img = cv2.resize(image_np, (256, 256))

    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    h, s, v = cv2.split(hsv)

    v = cv2.equalizeHist(v)
    hsv_norm = cv2.merge([h, s, v])
    img_norm = cv2.cvtColor(hsv_norm, cv2.COLOR_HSV2RGB)

    redness = float(np.mean(s)) / 255.0

    gray = cv2.cvtColor(img_norm, cv2.COLOR_RGB2GRAY)
    texture = float(cv2.Laplacian(gray, cv2.CV_64F).var()) / 2000.0

    blur = cv2.GaussianBlur(gray, (9, 9), 0)
    pores = float(np.mean(cv2.absdiff(gray, blur))) / 255.0

    oiliness = float(np.mean(v > 200))

    return redness, texture, pores, oiliness

# ---------------------------------------------------
# CLASSIFICATION
# ---------------------------------------------------
def classify_rosacea(r):
    if r < 0.12: return "none"
    if r < 0.22: return "mild"
    if r < 0.32: return "moderate"
    return "severe"

def classify_redness(r):
    if r < 0.10: return "low"
    if r < 0.25: return "moderate"
    return "high"

def classify_skin_type(o, p):
    if o > 0.25: return "oily"
    if p < 0.08: return "dry"
    if 0.08 <= p <= 0.16: return "normal"
    return "combination"

def classify_lesions(t, p):
    if t < 0.05 and p < 0.10: return "none"
    if t < 0.10: return "papules"
    if t < 0.18: return "pustules"
    return "nodules"

def compute_skin_health(acne_sev, r, t, p):
    score = 1.0
    score -= acne_sev * 0.22
    score -= r * 0.35
    score -= t * 0.30
    score -= p * 0.20
    return max(0.05, min(0.95, score))

# ---------------------------------------------------
# PREDICTION ENDPOINT
# ---------------------------------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image_np = np.array(image)

    # Acne model prediction
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    image_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image_tensor)
        probs = F.softmax(outputs, dim=1)
        confidence, predicted_class = torch.max(probs, dim=1)

    confidence = float(confidence)
    predicted_class = int(predicted_class)

    label_map = {0: "acne0", 1: "acne1", 2: "acne2", 3: "acne3"}
    raw_label = label_map[predicted_class]

    # Extract features
    redness, texture, pores, oiliness = extract_features(image_np)

    # ---------------------------------------------------
    # OVERRIDE WRONG ACNE PREDICTIONS
    # ---------------------------------------------------
    # If redness + texture + pores indicate severe acne → override
    inflammation_score = redness * 0.4 + texture * 0.4 + pores * 0.2

    if inflammation_score > 0.45:
        severity = "acne3"
    elif inflammation_score > 0.30:
        severity = "acne2"
    elif inflammation_score > 0.18:
        severity = "acne1"
    else:
        severity = raw_label  # only trust acne0 if skin is actually clear

    # ---------------------------------------------------
    # CLASSIFY OTHER CONDITIONS
    # ---------------------------------------------------
    rosacea = classify_rosacea(redness)
    redness_label = classify_redness(redness)
    skin_type = classify_skin_type(oiliness, pores)
    lesion = classify_lesions(texture, pores)

    skin_health = compute_skin_health(
        int(severity[-1]), redness, texture, pores
    )

    # ---------------------------------------------------
    # FINAL OUTPUT (FULL DESCRIPTIONS)
    # ---------------------------------------------------
    return {
        "acne": {
            "raw_model_label": raw_label,
            "severity": ACNE_DESCRIPTIONS[severity]
        },
        "rosacea": ROSACEA_DESCRIPTIONS[rosacea],
        "skin_type": SKIN_TYPE_DESCRIPTIONS[skin_type],
        "redness": REDNESS_DESCRIPTIONS[redness_label],
        "lesion_type": LESION_DESCRIPTIONS[lesion],
        "skin_health_score": round(skin_health, 3)
    }
