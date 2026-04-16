import torch
from model_def import AcneModel

model = AcneModel()  # no arguments
state = torch.load("acne_model.pt", map_location="cpu")
model.load_state_dict(state)
model.eval()

print("Model loaded successfully!")
