# -----------------------------
# Imports
# -----------------------------
import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from model_def import AcneModel
import torch
from PIL import Image
from torchvision import transforms
import numpy as np
import io

# -----------------------------
# FastAPI App Setup
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Model Setup
# -----------------------------
label_names = ["acne0", "acne1", "acne2", "acne3"]

friendly_names = {
    "acne0": "Clear Skin",
    "acne1": "Mild Acne",
    "acne2": "Moderate Acne",
    "acne3": "Severe Acne"
}

# -----------------------------
# Descriptions
# -----------------------------
redness_descriptions = {
    "low": "Low redness — skin appears calm with minimal irritation",
    "mild": "Mild flushing — slight warmth or color variation",
    "moderate": "Moderate redness — visible warmth or mild irritation",
    "high": "High redness — significant flushing or irritation detected"
}

rosacea_descriptions = {
    "none": "No visible rosacea — skin tone appears even and calm",
    "possible rosacea": "Visible flushing and redness — could indicate rosacea"
}

skin_type_descriptions = {
    "dry": "Dry — reduced moisture and possible tightness",
    "normal": "Normal — balanced moisture and oil levels",
    "oily": "Oily — increased shine and sebum production"
}

lesion_descriptions = {
    "none": "None — no active inflammatory lesions",
    "micro_papules": "Micro‑papules — very small raised texture patterns",
    "papules": "Papules — visible raised bumps without white centers",
    "pustules": "Pustules — inflamed bumps with visible white centers",
    "nodules": "Nodules — deeper raised areas with shadowing",
    "deep_lesion": "Deep lesion pattern — appearance may resemble cystic‑type inflammation",
    "comedone_like": "Comedone‑like pattern — localized contrast irregularities",
    "enlarged_pores": "Enlarged‑pore pattern — visible pore prominence"
}

model = AcneModel()
model.load_state_dict(torch.load("acne_model.pt", map_location="cpu"))
model.eval()

preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])
# -----------------------------
# Expanded Redness Detection
# -----------------------------
def detect_redness(np_img):
    img = np_img.astype(np.float32)
    r, g, b = img[:,:,0], img[:,:,1], img[:,:,2]

    brightness = (r + g + b + 1e-5)
    r_norm = r / brightness
    g_norm = g / brightness
    b_norm = b / brightness

    redness_map = r_norm - ((g_norm + b_norm) / 2)

    skin_mask = (r > 70) & (g > 40) & (b > 20)
    values = redness_map[skin_mask]

    if len(values) == 0:
        return "low", 0.0

    avg = float(np.mean(values))

    # Expanded categories
    if avg < 0.045:
        return "low", avg
    elif avg < 0.075:
        return "mild", avg
    elif avg < 0.12:
        return "moderate", avg
    else:
        return "high", avg


# -----------------------------
# Redness Spread Detection
# -----------------------------
def redness_spread(np_img):
    img = np_img.astype(np.float32)
    r, g, b = img[:,:,0], img[:,:,1], img[:,:,2]

    brightness = (r + g + b + 1e-5)
    r_norm = r / brightness
    g_norm = g / brightness
    b_norm = b / brightness

    redness_map = r_norm - ((g_norm + b_norm) / 2)

    spread_mask = redness_map > 0.10
    return float(np.mean(spread_mask))


# -----------------------------
# Advanced Lesion Detection
# -----------------------------
def detect_lesions(np_img):
    gray = np.mean(np_img, axis=2).astype(np.float32)
    texture = np.std(gray)

    lap = np.abs(
        gray[1:-1,1:-1] * -4 +
        gray[:-2,1:-1] +
        gray[2:,1:-1] +
        gray[1:-1,:-2] +
        gray[1:-1,2:]
    )
    bump_strength = np.mean(lap)

    white_mask = (np_img[:,:,0] > 220) & (np_img[:,:,1] > 220) & (np_img[:,:,2] > 220)
    white_ratio = np.mean(white_mask)

    dark_mask = gray < 30
    dark_ratio = np.mean(dark_mask)

    contrast_map = np.abs(gray - np.mean(gray))
    comedone_strength = np.mean(contrast_map > 18)

    pore_strength = np.mean(lap > 14)

    if dark_ratio > 0.07 and bump_strength > 18:
        return "deep_lesion"

    if dark_ratio > 0.06 and bump_strength > 15:
        return "nodules"

    if white_ratio > 0.015:
        return "pustules"

    if bump_strength > 13 and texture > 15:
        return "papules"

    if bump_strength > 9 and texture > 11:
        return "micro_papules"

    if comedone_strength > 0.04:
        return "comedone_like"

    if pore_strength > 0.06:
        return "enlarged_pores"

    return "none"


# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    np_img = np.array(img)

    redness_level, redness_value = detect_redness(np_img)
    spread_value = redness_spread(np_img)

    # BALANCED ROSACEA LOGIC (clear skin protected)
    if redness_level == "high" and spread_value > 0.10:
        rosacea_key = "possible rosacea"
    elif redness_level == "moderate" and spread_value > 0.18:
        rosacea_key = "possible rosacea"
    else:
        rosacea_key = "none"

    brightness = np.mean(np_img)
    if brightness < 90:
        skin_type = "dry"
    elif brightness < 160:
        skin_type = "normal"
    else:
        skin_type = "oily"

    x = preprocess(img).unsqueeze(0)
    with torch.no_grad():
        preds = model(x)
        idx = torch.argmax(preds, dim=1).item()
        confidence = float(torch.softmax(preds, dim=1)[0][idx])

    acne_label = label_names[idx]
    friendly_label = friendly_names[acne_label]

    lesion_key = detect_lesions(np_img)

    roughness_score = int(np.std(np.mean(np_img, axis=2)) * 2)

    return {
        "acne_severity": friendly_label,
        "model_label": acne_label,
        "redness_level": redness_descriptions[redness_level],
        "skin_type": skin_type_descriptions[skin_type],
        "lesion_type": lesion_descriptions[lesion_key],
        "rosacea": rosacea_descriptions[rosacea_key],
        "surface_roughness_score": roughness_score,
        "skin_health_score": int(confidence * 100)
    }


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8010)
