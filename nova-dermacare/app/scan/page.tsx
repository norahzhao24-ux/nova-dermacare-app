"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload preview
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  // Send image to backend
  async function analyzeImage() {
    const input = document.getElementById("fileInput") as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://YOUR_BACKEND_URL/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const result = await res.json();

      // Store raw backend response
      localStorage.setItem("analysisResult", JSON.stringify(result));

      // Redirect to results page
      router.push("/results");
    } catch (err) {
      console.error(err);
      alert("Something went wrong analyzing the image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={pageWrapper}>
      <div style={contentWrapper}>
        <h1 style={title}>Scan Your Skin</h1>

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "260px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "20px",
              marginBottom: "20px",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
        )}

        {/* Upload Input */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
        />

        {/* Analyze Button */}
        <button
          onClick={analyzeImage}
          disabled={loading}
          style={button}
        >
          {loading ? "Analyzing..." : "Analyze Skin"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   STYLES
------------------------------------------------------------ */

const pageWrapper = {
  minHeight: "100vh",
  background: "#050b1d",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontFamily: "Inter, sans-serif",
};

const contentWrapper = {
  textAlign: "center" as const,
  padding: "40px 20px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.15)",
};

const title = {
  fontSize: "32px",
  fontWeight: 700,
  marginBottom: "20px",
  background: "linear-gradient(90deg, #7ecbff, #d0eaff)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const button = {
  padding: "14px 28px",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #4db8ff, #7ecbff, #b0e0ff)",
  color: "#0a0f2d",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
};
