async function analyzeImage() {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:8002/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const result = await response.json();
        displayResults(result);

    } catch (error) {
        document.getElementById("results").innerHTML = `
            <p class="error">Error analyzing image: ${error.message}</p>
        `;
    }
}

function translateSeverity(label) {
    const map = {
        "acne0": "Clear skin — no visible acne.",
        "acne1": "Mild acne — small breakouts or comedones.",
        "acne2": "Moderate acne — noticeable pimples or redness.",
        "acne3": "Severe acne — deep, inflamed, cystic lesions."
    };
    return map[label] || "Unknown result";
}

function displayResults(result) {
    const severityText = translateSeverity(result.severity);

    document.getElementById("results").innerHTML = `
        <h2>Your Results</h2>
        <p><strong>Severity:</strong> ${severityText}</p>
        <p><strong>Model confidence:</strong> ${(result.confidence * 100).toFixed(1)}%</p>
    `;
}
