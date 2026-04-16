import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms
from model_def import AcneModel

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

def probe(image_path):
    img = Image.open(image_path).convert("RGB")
    x = preprocess(img).unsqueeze(0)

    with torch.no_grad():
        logits = model(x)[0]
        probs = F.softmax(logits, dim=0)

    print("Logits:", logits.tolist())
    print("Probs:", probs.tolist())

if __name__ == "__main__":
    probe("your_image.jpg")
