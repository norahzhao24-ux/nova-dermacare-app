"use client";

import { useEffect, useState } from "react";

export default function LoadingPage() {
  // ⭐ Longer, more detailed NOVA facts
  const facts = [
    "NOVA Dermacare analyzes over 200+ dermatological biomarkers using clinically validated AI models to deliver precise, real‑time skin insights.",
    "Our inclusive AI is trained across the full Fitzpatrick scale (I–VI), ensuring accurate assessments for every skin tone without bias or under‑representation.",
    "Skin disease is now a WHO‑recognized global health crisis, and NOVA addresses the worldwide shortage of dermatologists by giving underserved communities a frontline tool for early, accurate skin assessment.",
    "We use federated learning to continuously improve accuracy without storing or transmitting your personal skin data, ensuring privacy by design.",
    "NOVA’s diagnostic engine evaluates acne severity, redness distribution, rosacea indicators, texture irregularities, pore density, and hydration patterns with clinical precision.",
    "Our AI is co‑developed with dermatologists worldwide, ensuring medical‑grade accuracy in a consumer‑friendly experience.",
    "NOVA adapts to lighting variations, camera quality differences, and environmental conditions to maintain consistent accuracy across all devices.",
    "Your privacy is foundational: all scans are processed securely on‑device or encrypted in transit with zero long‑term retention.",
  ];

  // ⭐ Random starting fact
  const [index, setIndex] = useState(Math.floor(Math.random() * facts.length));

  // ⭐ Animation types
  const animations = ["typewriter", "fadeBlur", "shiftFade", "openUp"];
  const [anim, setAnim] = useState("shiftFade");

  // ⭐ Typewriter text state
  const [typedText, setTypedText] = useState("");

  // ⭐ Handle animation changes
  useEffect(() => {
    if (anim === "typewriter") {
      setTypedText(""); // reset
      let i = 0;
      const text = facts[index];

      const interval = setInterval(() => {
        setTypedText((prev) => prev + text[i]);
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 25);

      return () => clearInterval(interval);
    }
  }, [index, anim]);

  // ⭐ Rotate facts every 4 seconds (slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length);
      setAnim(animations[Math.floor(Math.random() * animations.length)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ⭐ Auto‑redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/results";
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-container">
      {/* ⭐ Earth Icon */}
      <div className="earth-wrapper">
        <img src="/earth.png" className="earth" alt="Earth" />
      </div>

      {/* ⭐ Animated Fact Text */}
      <div className={`fact ${anim}`}>
        {anim === "typewriter" ? typedText : facts[index]}
      </div>

      <style>{`
        .loading-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 30%, #1b2f6b, #0a1538 60%, #020513);
          color: white;
          font-family: Inter, sans-serif;
          overflow: hidden;
          padding: 20px;
        }

        /* ⭐ Earth spinning with elastic wobble — slower + bigger */
        .earth-wrapper {
          width: 450px;
          height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
        }

        .earth {
          width: 100%;
          height: auto; /* ⭐ keeps original aspect ratio */
          animation: spinElastic 7s infinite ease-in-out;
          filter: drop-shadow(0 0 18px rgba(80,120,255,0.45));
        }

        @keyframes spinElastic {
          0%   { transform: rotate(0deg) scale(1); }
          20%  { transform: rotate(90deg) scale(1.04); }
          40%  { transform: rotate(180deg) scale(0.97); }
          60%  { transform: rotate(270deg) scale(1.03); }
          80%  { transform: rotate(350deg) scale(0.98); }
          100% { transform: rotate(360deg) scale(1); }
        }

        /* ⭐ Fact text */
        .fact {
          font-size: 22px;
          max-width: 750px;
          text-align: center;
          opacity: 0.9;
          min-height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          line-height: 1.4;
        }

        /* ⭐ Shift Fade In */
        .shiftFade {
          animation: shiftFadeIn 1s ease forwards;
        }

        @keyframes shiftFadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ⭐ Fade + Blur animation */
        .fadeBlur {
          animation: fadeBlurIn 1.2s ease forwards;
        }

        @keyframes fadeBlurIn {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }

        /* ⭐ Open Up (window opening effect) */
        .openUp {
          animation: openUpAnim 1s ease forwards;
          transform-origin: center;
        }

        @keyframes openUpAnim {
          0% { opacity: 0; transform: scaleY(0.2); filter: blur(8px); }
          100% { opacity: 1; transform: scaleY(1); filter: blur(0); }
        }

        /* ⭐ MULTI‑LINE TYPEWRITER */
        .typewriter {
          white-space: normal; /* ⭐ allows wrapping */
          overflow: hidden;
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
