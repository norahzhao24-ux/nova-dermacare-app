import torch
from model_def import AcneModel

model = AcneModel()
state = torch.load("acne_model.pt", map_location="cpu")
model.load_state_dict(state)

print(model.backbone.classifier)

