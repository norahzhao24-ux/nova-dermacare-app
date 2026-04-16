from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms
from model_def import AcneModel
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = ["clear", "mild", "moderate", "severe"]

model = AcneModel()
state = torch.load("acne_model.pt", map_location="cpu")
model.load_state_dict(state)
model.eval()

preprocess = transforms.Compose([
    transforms.Resize((260, 260)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read uploaded image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")

    # Preprocess
    x = preprocess(img).unsqueeze(0)

    # Run model
    with torch.no_grad():
        logits = model(x)[0]
        probs = F.softmax(logits, dim=0)

    pred_idx = probs.argmax().item()
    pred_label = CLASS_NAMES[pred_idx]
    confidence = float(probs[pred_idx].item())

    # Build response JSON
    return {
        "acne_severity": pred_label,
        "model_label": pred_label,
        "rosacea": "none",
        "skin_type": "normal",
        "redness_level": "low",
        "lesion_type": "none",
        "skin_health_score": int(confidence * 100)
    }
