import torch

try:
    state = torch.load("acne_model.pt", map_location="cpu")
    print("Loaded OK. Keys:", list(state.keys())[:10])
except Exception as e:
    print("Error:", e)
