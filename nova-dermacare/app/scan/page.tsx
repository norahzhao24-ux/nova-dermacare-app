"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------
   BACKEND RESPONSE INTERFACE (FULL DESCRIPTIONS INCLUDED)
------------------------------------------------------------ */
interface BackendResponse {
  acne_severity?: string;
  acne_description?: string;
  model_label?: string;

  redness_level?: string;
  rosacea?: string;
  skin_type?: string;
  lesion_type?: string;

  skin_health_score?: number;
}

/* ------------------------------------------------------------
   FRONTEND RESULT INTERFACE (NORMALIZED + DESCRIPTIVE)
------------------------------------------------------------ */
interface AnalysisResult {
  acne: {
    severity: string;            // normalized
    description: string;         // full descriptive text
    raw_model_label: string;
  };

  redness: {
    normalized: string;
    description: string;
  };

  rosacea: {
    normalized: string;
    description: string;
  };

  skin_type: {
    normalized: string;
    description: string;
  };

  lesion_type: {
    normalized: string;
    description: string;
  };

  skin_health_score: number;
}

export default function ResultsPage() {
  const [data, setData] = useState<AnalysisResult | null>(null);

  /* ------------------------------------------------------------
     NORMALIZATION HELPERS
  ------------------------------------------------------------ */
  function normalizeAcneSeverity(label: string) {
    const lower = label.toLowerCase();
    if (lower.includes("severe")) return "severe";
    if (lower.includes("moderate")) return "moderate";
    if (lower.includes("mild")) return "mild";
    if (lower.includes("clear")) return "clear";
    return "unknown";
  }

  function normalizeRedness(label: string) {
    const lower = label.toLowerCase();
    if (lower.includes("high")) return "high";
    if (lower.includes("moderate")) return "medium";
    if (lower.includes("mild")) return "mild";
    return "low";
  }

  function normalizeRosacea(label: string) {
    const lower = label.toLowerCase();
    if (lower.includes("none")) return "none";
    if (lower.includes("possible")) return "moderate";
    return "mild";
  }

  /* ------------------------------------------------------------
     SKIN HEALTH SCORE (NORMALIZED + BOOSTED)
  ------------------------------------------------------------ */
  function computeSkinHealth(acne: string, redness: string, rosacea: string) {
    let score = 100;

    if (acne === "severe") score -= 40;
    else if (acne === "moderate") score -= 25;
    else if (acne === "mild") score -= 10;

    if (redness === "high") score -= 25;
    else if (redness === "medium") score -= 10;

    if (rosacea === "severe") score -= 30;
    else if (rosacea === "moderate") score -= 15;
    else if (rosacea === "mild") score -= 5;

    // ⭐ Subtle boost (+6)
    score += 6;

    return Math.max(0, Math.min(100, score)) / 100;
  }

  /* ------------------------------------------------------------
     LOAD STORED ANALYSIS
  ------------------------------------------------------------ */
  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (!stored) return;

    try {
      const parsed: BackendResponse = JSON.parse(stored);

      const acneNorm = normalizeAcneSeverity(parsed.acne_severity ?? "");
      const redNorm = normalizeRedness(parsed.redness_level ?? "");
      const rosNorm = normalizeRosacea(parsed.rosacea ?? "");

      const mapped: AnalysisResult = {
        acne: {
          severity: acneNorm,
          description: parsed.acne_description ?? "No description available.",
          raw_model_label: parsed.model_label ?? "unknown",
        },

        redness: {
          normalized: redNorm,
          description: parsed.redness_level ?? "No redness description.",
        },

        rosacea: {
          normalized: rosNorm,
          description: parsed.rosacea ?? "No rosacea description.",
        },

        skin_type: {
          normalized: parsed.skin_type?.toLowerCase() ?? "unknown",
          description: parsed.skin_type ?? "No skin type description.",
        },

        lesion_type: {
          normalized: parsed.lesion_type?.toLowerCase() ?? "unknown",
          description: parsed.lesion_type ?? "No lesion description.",
        },

        skin_health_score: computeSkinHealth(acneNorm, redNorm, rosNorm),
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

  /* ------------------------------------------------------------
     PRODUCT LISTS (UNCHANGED)
  ------------------------------------------------------------ */
  const ALL_CLEANSERS = [
    {
      img: "/cleanser1.png",
      name: "The Ordinary Squalane Cleanser",
      reason: "Gentle, hydrating cleanser that removes sunscreen and makeup.",
      tags: ["dry", "redness", "rosacea", "sensitive"],
    },
    {
      img: "/Cleanser2.png",
      name: "The Inkey List Salicylic Acid Cleanser",
      reason: "Commonly used for congestion and oil control.",
      tags: ["acne", "oily", "congestion"],
    },
    {
      img: "/cleanser3.png",
      name: "Paula’s Choice Perfectly Balanced Foaming Cleanser",
      reason: "A gentle foaming option often used for combination skin.",
      tags: ["combo", "balanced"],
    },
  ];

  const ALL_MOISTURIZERS = [
    {
      img: "/moisturizer1.png",
      name: "The Ordinary Natural Moisturizing Factors + HA",
      reason: "Lightweight hydration that supports the skin barrier.",
      tags: ["dry", "sensitive"],
    },
    {
      img: "/moisturizer2.png",
      name: "The Inkey List Omega Water Cream",
      reason: "Hydrating gel‑cream texture popular for oily and combination skin.",
      tags: ["oily", "combo", "redness"],
    },
    {
      img: "/moisturizer3.png",
      name: "Paula’s Choice Clear Oil‑Free Moisturizer",
      reason: "Lightweight moisture often used by people with breakout‑prone skin.",
      tags: ["acne", "oily"],
    },
  ];

  const ALL_SERUMS = [
    {
      img: "/serum1.png",
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      reason: "Often used for visible shine, uneven tone, and general clarity.",
      tags: ["acne", "oily", "texture"],
    },
    {
      img: "/serum1-2.png",
      name: "The Ordinary Azelaic Acid Suspension 10%",
      reason: "Commonly used for uneven tone and texture.",
      tags: ["redness", "rosacea", "tone"],
    },
    {
      img: "/serum2.png",
      name: "The Inkey List Niacinamide Serum",
      reason: "Ingredient‑focused serum for general clarity and balance.",
      tags: ["acne", "oily", "combo"],
    },
    {
      img: "/serum2-2.png",
      name: "The Inkey List Tranexamic Acid Night Treatment",
      reason: "Often used for uneven pigmentation.",
      tags: ["tone", "hyperpigmentation"],
    },
    {
      img: "/serum3.png",
      name: "Paula’s Choice 2% BHA Liquid Exfoliant",
      reason: "A well‑known salicylic acid formula used for congestion and texture.",
      tags: ["acne", "congestion", "texture"],
    },
    {
      img: "/serum3-2.png",
      name: "Paula’s Choice 10% Azelaic Acid Booster",
      reason: "Often used for tone and clarity.",
      tags: ["tone", "redness"],
    },
  ];

  const SUNSCREEN = {
    img: "/sunscreen.png",
    name: "Paula’s Choice SPF 50 Daily Fluid",
    reason: "Lightweight daily sunscreen.",
    tags: ["all"],
  };
  /* ------------------------------------------------------------
     FILTER HELPERS
  ------------------------------------------------------------ */
  function filterByTags(list: any[], tags: string[]) {
    return list.filter((item) =>
      item.tags.some((tag: string) => tags.includes(tag))
    );
  }

  function pickRandom(list: any[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /* ------------------------------------------------------------
     PRODUCT RECOMMENDATION LOGIC (UNCHANGED)
  ------------------------------------------------------------ */
  const finalProducts: any[] = [];

  let cleanserPool = [...ALL_CLEANSERS];
  if (data.acne.severity !== "clear")
    cleanserPool.push(...filterByTags(ALL_CLEANSERS, ["acne"]));
  if (data.redness.normalized !== "low")
    cleanserPool.push(...filterByTags(ALL_CLEANSERS, ["redness", "rosacea"]));
  if (data.skin_type.normalized === "oily")
    cleanserPool.push(...filterByTags(ALL_CLEANSERS, ["oily"]));
  if (data.skin_type.normalized === "dry")
    cleanserPool.push(...filterByTags(ALL_CLEANSERS, ["dry"]));
  finalProducts.push(pickRandom(cleanserPool));

  let moisturizerPool = [...ALL_MOISTURIZERS];
  if (data.skin_type.normalized === "oily")
    moisturizerPool.push(...filterByTags(ALL_MOISTURIZERS, ["oily"]));
  if (data.skin_type.normalized === "dry")
    moisturizerPool.push(...filterByTags(ALL_MOISTURIZERS, ["dry"]));
  if (data.skin_type.normalized === "combination")
    moisturizerPool.push(...filterByTags(ALL_MOISTURIZERS, ["combo"]));
  if (data.redness.normalized !== "low")
    moisturizerPool.push(...filterByTags(ALL_MOISTURIZERS, ["redness"]));
  finalProducts.push(pickRandom(moisturizerPool));

  let serumPool = [...ALL_SERUMS];
  if (data.acne.severity !== "clear")
    serumPool.push(...filterByTags(ALL_SERUMS, ["acne"]));
  if (data.redness.normalized !== "low")
    serumPool.push(...filterByTags(ALL_SERUMS, ["redness"]));
  if (data.rosacea.normalized !== "none")
    serumPool.push(...filterByTags(ALL_SERUMS, ["rosacea"]));
  if (data.lesion_type.normalized.includes("texture"))
    serumPool.push(...filterByTags(ALL_SERUMS, ["texture"]));

  serumPool = Array.from(new Map(serumPool.map((p) => [p.name, p])).values());
  const serum1 = pickRandom(serumPool);
  const serum2 = pickRandom(serumPool.filter((p) => p !== serum1));
  finalProducts.push(serum1, serum2);

  let boosterPool = filterByTags(ALL_SERUMS, ["tone", "redness", "texture"]);
  if (
    data.acne.severity !== "clear" ||
    data.redness.normalized !== "low" ||
    data.rosacea.normalized !== "none"
  ) {
    finalProducts.push(pickRandom(boosterPool));
  }

  finalProducts.push(SUNSCREEN);

  const limit = data.acne.severity === "mild" ? 5 : 6;
  const unique = Array.from(new Map(finalProducts.map((p) => [p.name, p])).values());
  const finalList = unique.slice(0, limit);

  /* ------------------------------------------------------------
     RENDER PAGE
  ------------------------------------------------------------ */
  return (
    <div style={pageWrapper}>
      <div style={particlesLayer}></div>
      <div style={animatedGradient}></div>

      <div style={contentWrapper}>
        <h1 style={title}>NOVA Skin Visual Analysis Report</h1>

        {/* ⭐ ACNE CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Acne Assessment</h2>
          <p><strong>Severity:</strong> {data.acne.severity}</p>
          <p><strong>Description:</strong> {data.acne.description}</p>
          <p><strong>Model Label:</strong> {data.acne.raw_model_label}</p>
        </div>

        {/* ⭐ ROSACEA CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Redness Pattern</h2>
          <p>{data.rosacea.description}</p>
        </div>

        {/* ⭐ SKIN TYPE CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Surface Appearance</h2>
          <p>{data.skin_type.description}</p>
        </div>

        {/* ⭐ REDNESS LEVEL CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Redness Level</h2>
          <p>{data.redness.description}</p>
        </div>

        {/* ⭐ LESION TYPE CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Texture Variation</h2>
          <p>{data.lesion_type.description}</p>
        </div>

        {/* ⭐ SCORE CARD */}
        <div style={chromeCard}>
          <h2 style={sectionTitle}>Overall Visual Score</h2>

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

        {/* ⭐ PRODUCT RECOMMENDATIONS */}
        <h2 style={{ ...sectionTitle, marginTop: 50 }}>
          Recommended Products
        </h2>

        <div style={carouselContainer}>
          <div style={carouselInner}>
            {finalList.map((p, i) => (
              <div key={i} style={productCard}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: 12,
                    marginBottom: 14,
                  }}
                />
                <p style={{ fontWeight: 600, marginBottom: 6 }}>{p.name}</p>
                <p style={{ opacity: 0.8, fontSize: 14 }}>{p.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <a href="/scan" style={button}>
          Scan Another Photo
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   STYLES (UNCHANGED)
------------------------------------------------------------ */
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
  backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
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

const carouselContainer = {
  width: "100%",
  overflowX: "auto" as const,
  paddingBottom: 20,
  marginTop: 40,
};

const carouselInner = {
  display: "flex",
  gap: 24,
  paddingBottom: 10,
};

const productCard = {
  minWidth: 240,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 18,
  padding: 16,
  textAlign: "center" as const,
  border: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
};
