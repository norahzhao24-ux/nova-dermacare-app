"use client";

import { useEffect, useState } from "react";

interface BackendResponse {
  acne_severity?: string;
  model_label?: string;
  rosacea?: string;
  skin_type?: string;
  redness_level?: string;
  lesion_type?: string;
  skin_health_score?: number; // 0–100
}

interface AnalysisResult {
  acne: {
    raw_model_label: string;
    severity: string;
  };
  rosacea: string;
  skin_type: string;
  redness: string;
  lesion_type: string;
  skin_health_score: number; // 0–1 normalized
}

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) return;

    try {
      const parsed: BackendResponse = JSON.parse(stored);

      // ⭐ FIX: map backend → your UI structure
      const mapped: AnalysisResult = {
        acne: {
          raw_model_label: parsed.model_label ?? "unknown",
          severity: parsed.acne_severity ?? "unknown",
        },
        rosacea: parsed.rosacea ?? "unknown",
        skin_type: parsed.skin_type ?? "unknown",
        redness: parsed.redness_level ?? "unknown",
        lesion_type: parsed.lesion_type ?? "unknown",
        skin_health_score:
          parsed.skin_health_score != null
            ? parsed.skin_health_score / 100
            : 0.5,
      };

      setData(mapped);
    } catch {
      setData(null);
    }
  }, []);

  if (!data) {
    return (
      <div style={{ padding: 40, color: "white" }}>
        No results found. Please scan again.
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div style={particlesLayer}></div>
      <div style={animatedGradient}></div>

      <div style={contentWrapper}>
        <h1 style={title}>NOVA Skin Intelligence Report</h1>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Acne Assessment</h2>
          <p><strong>Severity:</strong> {data.acne.severity}</p>
          <p><strong>Model Label:</strong> {data.acne.raw_model_label}</p>
        </div>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Rosacea</h2>
          <p>{data.rosacea}</p>
        </div>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Skin Type</h2>
          <p>{data.skin_type}</p>
        </div>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Redness Level</h2>
          <p>{data.redness}</p>
        </div>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Lesion Type</h2>
          <p>{data.lesion_type}</p>
        </div>

        <div style={chromeCard}>
          <h2 style={sectionTitle}>Skin Health Score</h2>

          <div style={progressBarOuter}>
            <div
              style={{
                ...progressBarInner,
                width: `${data.skin_health_score * 100}%`,
              }}
            />
          </div>

          <p style={{ marginTop: 10 }}>
            {(data.skin_health_score * 100).toFixed(0)} / 100
          </p>
        </div>

        <a href="/scan" style={button}>
          Scan Another Photo
        </a>
      </div>
    </div>
  );
}

/* ------------------ YOUR ORIGINAL STYLES (unchanged) ------------------ */

const pageWrapper = {
  position: "relative" as const,
  minHeight: "100vh",
  overflow: "hidden",
  background: "#050b1d",
  fontFamily: "Inter, sans-serif",
  color: "white",
};

const animatedGradient = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle at 20% 20%, rgba(0,150,255,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,200,255,0.2), transparent 60%)",
  animation: "pulse 8s ease-in-out infinite alternate",
  zIndex: 1,
};

const particlesLayer = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage:
    "url('https://grainy-gradients.vercel.app/noise.svg')",
  opacity: 0.08,
  zIndex: 2,
};

const contentWrapper = {
  position: "relative" as const,
  zIndex: 3,
  maxWidth: 750,
  margin: "0 auto",
  padding: "60px 20px",
};

const title = {
  fontSize: 40,
  fontWeight: 700,
  marginBottom: 30,
  background: "linear-gradient(90deg, #7ecbff, #d0eaff)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  textAlign: "center" as const,
};

const chromeCard = {
  padding: "24px 28px",
  marginBottom: 24,
  borderRadius: 20,
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow:
    "0 0 25px rgba(0,150,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
};

const sectionTitle = {
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 10,
  color: "#bfe6ff",
};

const progressBarOuter = {
  height: 14,
  width: "100%",
  background: "rgba(255,255,255,0.15)",
  borderRadius: 10,
  overflow: "hidden",
  marginTop: 8,
};

const progressBarInner = {
  height: "100%",
  background: "linear-gradient(90deg, #4db8ff, #9cd6ff, #d0eaff)",
  transition: "width 0.6s ease",
};

const button = {
  display: "block",
  margin: "40px auto 0",
  padding: "14px 28px",
  borderRadius: 14,
  background: "linear-gradient(90deg, #4db8ff, #7ecbff, #b0e0ff)",
  color: "#0a0f2d",
  fontWeight: 600,
  textDecoration: "none",
  textAlign: "center" as const,
  boxShadow: "0 0 25px rgba(100,180,255,0.4)",
};
