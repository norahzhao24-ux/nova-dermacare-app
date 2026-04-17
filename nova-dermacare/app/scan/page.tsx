"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: any) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selected.type)) {
      alert("We only support JPG and PNG formats. Thanks!");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const analyzeImage = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ⭐ UPDATED — now calling your Render backend
      const res = await fetch("https://nova-backend-z5l9.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const result = await res.json();
      localStorage.setItem("analysisResult", JSON.stringify(result));

      router.push("/loading");

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #0a0f2d, #0f1f4d, #1a3a7c)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", width: "100%", maxWidth: 450 }}>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 700,
            marginBottom: 30,
            background: "linear-gradient(90deg, #7ecbff, #d0eaff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Scan Your Skin
        </h1>

        <div
          style={{
            padding: 30,
            borderRadius: 20,
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 0 40px rgba(0, 150, 255, 0.15)",
          }}
        >
          <button
            onClick={() => router.push("/")}
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              color: "white",
              fontWeight: 600,
              fontSize: 16,
              border: "1px solid rgba(255,255,255,0.25)",
              cursor: "pointer",
              marginBottom: 20,
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
          >
            ← Back to Home
          </button>

          <label
            style={{
              display: "block",
              padding: "14px 20px",
              borderRadius: 12,
              background: "linear-gradient(90deg, #4db8ff, #7ecbff, #b0e0ff)",
              color: "#0a0f2d",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              marginBottom: 15,
              boxShadow: "0 0 20px rgba(100,180,255,0.4)",
            }}
          >
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          {file && (
            <p style={{ marginBottom: 15, opacity: 0.8, fontSize: 15 }}>
              Selected: <strong>{file.name}</strong>
            </p>
          )}

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: 20,
                boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              }}
            />
          )}

          <button
            onClick={analyzeImage}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: 12,
              background: "linear-gradient(90deg, #4db8ff, #7ecbff, #b0e0ff)",
              color: "#0a0f2d",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              cursor: loading ? "default" : "pointer",
              boxShadow: "0 0 20px rgba(100,180,255,0.4)",
              transition: "0.3s",
            }}
          >
            {loading ? "Analyzing..." : "Analyze with NOVA"}
          </button>
        </div>
      </div>
    </div>
  );
}
