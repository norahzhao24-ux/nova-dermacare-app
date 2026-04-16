"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const glassRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLImageElement>(null);

  // ⭐ Move refraction hotspot to follow the ball
  useEffect(() => {
    const update = () => {
      if (!glassRef.current || !ballRef.current) return;

      const ball = ballRef.current.getBoundingClientRect();
      const glass = glassRef.current.getBoundingClientRect();

      const x = ball.left + ball.width / 2 - glass.left;
      const y = ball.top + ball.height / 2 - glass.top;

      glassRef.current.style.setProperty("--rx", `${x}px`);
      glassRef.current.style.setProperty("--ry", `${y}px`);
    };

    const interval = setInterval(update, 16);
    return () => clearInterval(interval);
  }, []);

  // ⭐ ALWAYS start at the top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative",
        overflowX: "hidden",
        color: "white",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      {/* ⭐ BACKGROUND BLOBS */}
      <div className="liquid-bg">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="blob blob4"></div>
      </div>

      {/* ⭐ FLOATING BALL */}
      <img
        ref={ballRef}
        src="/ball.png"
        alt="Floating Ball"
        style={{
          position: "absolute",
          left: "33%",
          top: "5%",
          width: "150px",
          zIndex: 2,
          animation: "ballOpposite 6s ease-in-out infinite",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ⭐ USB FLOATING — MOVED HIGHER */}
      <img
        src="/usbphoto.png"
        alt="USB Device"
        style={{
          position: "absolute",
          left: "10%",
          top: "35%",
          width: "300px",
          opacity: 0.7,
          animation: "usbFloat 6s ease-in-out infinite",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 3,
        }}
      />

      {/* ⭐ SCANNER FLOATING */}
      <img
        src="/scannerphoto.png"
        alt="NOVA Device"
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          width: "460px",
          opacity: 0.72,
          animation: "scannerFloat 6s ease-in-out infinite",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 3,
        }}
      />

      {/* ⭐ HERO SECTION — REDUCED TOP SPACE */}
      <div
        style={{
          width: "100%",
          maxWidth: 650,
          padding: "45px 35px",
          borderRadius: 28,
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 80px rgba(0,0,0,0.55)",
          animation: "fadeIn 1.2s ease-out forwards",
          position: "relative",
          zIndex: 5,
          overflow: "hidden",
          marginTop: "120px",
          marginBottom: 140,
        }}
      >

        {/* ⭐ LIQUID GLASS REFRACTION */}
        <div
          ref={glassRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 4,
            background:
              "radial-gradient(circle at var(--rx) var(--ry), rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 40%, transparent 70%)",
            mixBlendMode: "overlay",
            filter: "blur(20px) saturate(150%)",
          }}
        />

        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            marginBottom: 20,
            background: "linear-gradient(90deg, #d8e6ff, #f0f6ff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          NOVA Dermacare
        </h1>

        <p
          style={{
            fontSize: 19,
            opacity: 0.85,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Your AI‑powered skin wellness companion.  
          NOVA analyzes acne severity, redness, rosacea indicators, skin type,
          and overall skin health — all from a single photo.  
          Fast, private, and beautifully accurate.
        </p>

        <div
          style={{
            marginBottom: 40,
            textAlign: "left",
            padding: "22px 28px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 15,
              background: "linear-gradient(90deg, #d0e0ff, #e8f3ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Acne Severity Scale
          </h2>

          <p style={{ marginBottom: 10, opacity: 0.85 }}>
            <strong style={{ color: "#d0e0ff" }}>0 — Clear Skin:</strong>  
            No visible acne or inflammation.
          </p>

          <p style={{ marginBottom: 10, opacity: 0.85 }}>
            <strong style={{ color: "#bcd4ff" }}>1 — Mild Acne:</strong>  
            Small comedones or a few scattered pimples.
          </p>

          <p style={{ marginBottom: 10, opacity: 0.85 }}>
            <strong style={{ color: "#9fbfff" }}>2 — Moderate Acne:</strong>  
            More noticeable papules or pustules across the skin.
          </p>

          <p style={{ marginBottom: 10, opacity: 0.85 }}>
            <strong style={{ color: "#7aa7ff" }}>3 — Severe Acne:</strong>  
            Widespread inflammation, nodules, or deeper lesions.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/scan")}
          style={{
            padding: "16px 32px",
            borderRadius: 14,
            background: "linear-gradient(90deg, #4db8ff, #7ecbff, #b0e0ff)",
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
            color: "#0a0f2d",
            fontWeight: 700,
            fontSize: 20,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 25px rgba(100,180,255,0.35)",
            transition: "0.3s",
          }}
        >
          Start Skin Scan
        </button>

        {/* ⭐ SCROLL DOWN INDICATOR */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: 0.85,
            animation: "fadeIn 1.5s ease-out forwards",
          }}
        >
          <div
            style={{
              fontSize: 16,
              marginBottom: 8,
              letterSpacing: "0.5px",
            }}
          >
            Scroll for more info
          </div>

          <div
            style={{
              width: 24,
              height: 24,
              borderLeft: "3px solid #cfe2ff",
              borderBottom: "3px solid #cfe2ff",
              transform: "rotate(-45deg)",
              animation: "arrowBounce 1.6s infinite ease-in-out",
            }}
          />
        </div>
      </div>

      {/* ⭐ ARTICLES SECTION — HORIZONTAL CARDS */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          marginTop: 20,
          padding: "0 20px",
          zIndex: 5,
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            marginBottom: 30,
            background: "linear-gradient(90deg, #d8e6ff, #f0f6ff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "left",
          }}
        >
          Articles & Skin Education
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* CARD 1 */}
          <Link href="/articles/first-scan" style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                display: "flex",
                gap: 25,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="/article1.png"
                style={{
                  width: 260,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 14,
                }}
              />
              <div style={{ textAlign: "left", maxWidth: 500 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  Your First Scan: How to Get the Most Accurate Results
                </h3>
                <p style={{ opacity: 0.75, fontSize: 14, marginBottom: 6 }}>
                  A quick guide to capturing the clearest, most reliable skin scan.
                </p>
                <p style={{ opacity: 0.55, fontSize: 12 }}>5‑MIN READ</p>
              </div>
            </div>
          </Link>

          {/* CARD 2 */}
          <Link href="/articles/teen-misdiagnosis" style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                display: "flex",
                gap: 25,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="/article2.png"
                style={{
                  width: 260,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 14,
                }}
              />
              <div style={{ textAlign: "left", maxWidth: 500 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  The Hidden Crisis: Teen Skin Misdiagnosis in the Age of Social Media
                </h3>
                <p style={{ opacity: 0.75, fontSize: 14, marginBottom: 6 }}>
                  How trends and misinformation are shaping teen skin health.
                </p>
                <p style={{ opacity: 0.55, fontSize: 12 }}>5‑MIN READ</p>
              </div>
            </div>
          </Link>

          {/* CARD 3 */}
          <Link href="/articles/skin-myths" style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                display: "flex",
                gap: 25,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="/article3.png"
                style={{
                  width: 260,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 14,
                }}
              />
              <div style={{ textAlign: "left", maxWidth: 500 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  Mythbusting: The 15 Biggest Skin Health Myths, Debunked
                </h3>
                <p style={{ opacity: 0.75, fontSize: 14, marginBottom: 6 }}>
                  Separating fact from fiction in everyday skincare advice.
                </p>
                <p style={{ opacity: 0.55, fontSize: 12 }}>5‑MIN READ</p>
              </div>
            </div>
          </Link>

          {/* CARD 4 */}
          <Link href="/articles/dermatology-deserts" style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                display: "flex",
                gap: 25,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: 20,
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="/article4.png"
                style={{
                  width: 260,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 14,
                }}
              />
              <div style={{ textAlign: "left", maxWidth: 500 }}>
                <h3 style={{ fontSize: 20, marginBottom: 6 }}>
                  Where Skin Care Is Out of Reach: Understanding Dermatology Deserts
                </h3>
                <p style={{ opacity: 0.75, fontSize: 14, marginBottom: 6 }}>
                  Why millions lack access to dermatologists — and what it means.
                </p>
                <p style={{ opacity: 0.55, fontSize: 12 }}>5‑MIN READ</p>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* ⭐ Animations + Blob Styles */}
      <style>{`
        .liquid-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          background: #020513;
        }

        .blob {
          position: absolute;
          width: 120vw;
          height: 120vw;
          border-radius: 50%;
          filter: blur(160px);
          opacity: 0.50;
          animation: blobMove 30s ease-in-out infinite;
        }

        .blob1 { background: #0a1538; top: -10%; left: -10%; animation-delay: 0s; }
        .blob2 { background: #1b2f6b; top: -20%; right: -10%; animation-delay: 6s; }
        .blob3 { background: #2d4aa0; bottom: -15%; left: -5%; animation-delay: 12s; }
        .blob4 { background: #0f1f4d; bottom: -10%; right: -5%; animation-delay: 18s; }

        @keyframes blobMove {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(400px, -350px) scale(1.35); }
          50%  { transform: translate(-380px, 420px) scale(1.2); }
          75%  { transform: translate(300px, -300px) scale(1.4); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes ballOpposite {
          0% { transform: translateY(-40px); }
          50% { transform: translateY(40px); }
          100% { transform: translateY(-40px); }
        }

        @keyframes usbFloat {
          0% { transform: translateY(-50%); filter: blur(0px); }
          50% { transform: translateY(-70%); filter: blur(3px); }
          100% { transform: translateY(-50%); filter: blur(0px); }
        }

        @keyframes scannerFloat {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(-70%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes arrowBounce {
          0% { transform: translateY(0) rotate(-45deg); }
          50% { transform: translateY(10px) rotate(-45deg); }
          100% { transform: translateY(0) rotate(-45deg); }
        }
      `}</style>
    </div>
  );
}
