"use client";

import Link from "next/link";

export default function FirstScanArticle() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "black",
        background: "white",
        fontFamily: "Georgia, serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 760 }}>

        {/* BACK LINK */}
        <Link href="/" style={{ textDecoration: "none", color: "#555" }}>
          <p style={{ marginBottom: 25, fontSize: 15 }}>← Back to Home</p>
        </Link>

        {/* HEADER IMAGE */}
        <img
          src="/article1.png"
          alt="Your First Scan"
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            borderRadius: 6,
            marginBottom: 30,
          }}
        />

        {/* HEADLINE */}
        <h1
          style={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          Your First Scan: How to Get the Most Accurate Results
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            fontSize: 20,
            color: "#444",
            marginBottom: 18,
            lineHeight: 1.5,
          }}
        >
          A quick guide to capturing the clearest, most reliable skin scan.
        </p>

        {/* META */}
        <p style={{ color: "#666", fontSize: 15, marginBottom: 40 }}>
          By <strong>Norah Zhao</strong> • March 21, 2026 • 5‑MIN READ
        </p>

        {/* ARTICLE BODY */}
        <div
          style={{
            fontSize: 19,
            lineHeight: 1.75,
            color: "#222",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <p>
            Your first skin scan with NOVA is more than just a photo, it’s the
            beginning of a clearer understanding of your skin’s health. Whether
            you’re tracking acne, redness, texture, or overall balance,
            capturing a high‑quality image ensures the AI can analyze your skin
            with maximum accuracy.
          </p>

          <p>
            The good news is that you don’t need professional lighting or a
            studio setup. With just a few simple adjustments, you can improve
            scan accuracy dramatically. Here’s how to get the best results every
            time.
          </p>

          <h2 style={{ fontSize: 28, marginTop: 10 }}>1. Use Natural, Even Lighting</h2>
          <p>
            Lighting is the number one factor that affects scan quality. Harsh
            shadows, yellow indoor bulbs, or bright backlighting can distort
            redness levels and texture visibility. The ideal setup is facing a
            window with soft daylight. Avoid overhead lights and never stand
            with a bright light source behind you.
          </p>

          <h2 style={{ fontSize: 28 }}>2. Keep the Camera at Eye Level</h2>
          <p>
            Holding your phone too close or at an angle can stretch or compress
            facial features, making it harder for the AI to map your skin
            accurately. Position the camera at eye level, about 12–16 inches
            from your face. Rest your elbows on a surface to keep the phone
            steady.
          </p>

          <h2 style={{ fontSize: 28 }}>3. Remove Makeup and Heavy Skincare</h2>
          <p>
            Makeup, tinted sunscreen, and even thick moisturizers can mask
            redness, texture, and acne severity. For the most accurate scan,
            start with a clean, bare face. If you’re tracking progress over
            time, try to scan under similar conditions each time.
          </p>

          <h2 style={{ fontSize: 28 }}>4. Pull Hair Away From Your Face</h2>
          <p>
            Stray hairs can cast shadows or cover areas the AI needs to analyze.
            Use a headband or clip to keep your forehead and cheeks fully
            visible. If you have bangs, gently pin them back for the scan.
          </p>

          <h2 style={{ fontSize: 28 }}>5. Keep a Neutral Expression</h2>
          <p>
            Smiling or raising your eyebrows can stretch the skin and distort
            texture. A relaxed, neutral expression helps the AI read your skin
            consistently and accurately.
          </p>

          <h2 style={{ fontSize: 28 }}>6. Stay Still for One Second</h2>
          <p>
            Even slight movement can blur fine details like pores or small
            papules. Hold still for a moment after tapping the capture button.
            If your phone struggles to focus, tap your face on the screen to
            lock focus before taking the photo.
          </p>

          <h2 style={{ fontSize: 28 }}>7. Scan Regularly for Best Insights</h2>
          <p>
            Skin changes gradually — sometimes so slowly that it’s hard to see
            progress day‑to‑day. Weekly scans help NOVA track patterns,
            improvements, and flare‑ups over time. Consistency is key.
          </p>

          <h2 style={{ fontSize: 28 }}>The Bottom Line</h2>
          <p>
            Your first scan sets the foundation for everything NOVA can help you
            understand about your skin. With just a few simple adjustments, you
            can dramatically improve accuracy and get clearer, more meaningful
            insights. Think of it as giving your future self the best possible
            starting point.
          </p>

          <p>
            When you're ready, head back to the homepage and start your next
            scan — your skin journey is just beginning.
          </p>
        </div>

        {/* BACK LINK */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <p
            style={{
              marginTop: 50,
              fontSize: 16,
              color: "#444",
            }}
          >
            ← Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
}
