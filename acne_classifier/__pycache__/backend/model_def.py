import timm
import torch.nn as nn

class AcneModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = timm.create_model(
            "efficientnet_b2",
            pretrained=False,   # must be False when loading your own weights
            num_classes=4       # your model was trained with 4 classes
        )

    def forward(self, x):
        return self.backbone(x)
