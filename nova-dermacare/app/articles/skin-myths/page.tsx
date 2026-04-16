"use client";

import Link from "next/link";

export default function SkinMythsArticle() {
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
          src="/article3.png"
          alt="Skin Myths"
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
          Mythbusting: The 15 Biggest Skin Health Myths, Debunked
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
          Separating fact from fiction in everyday skincare advice.
        </p>

        {/* META */}
        <p style={{ color: "#666", fontSize: 15, marginBottom: 40 }}>
          By <strong>Karen Zhao</strong> • March 7, 2026 • 5 MIN READ
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
            Skin care has always been surrounded by myths, but the internet has
            amplified them in ways that would have been unimaginable a decade
            ago. Advice spreads quickly, and once a claim becomes popular, it
            can take on a life of its own. Many people follow routines that are
            based on misinformation, and some of these habits can actually harm
            the skin rather than help it.
          </p>

          <p>
            Understanding what is true and what is exaggerated is essential for
            anyone who wants to take care of their skin in a safe and effective
            way. These are fifteen of the most common myths, along with the
            facts that debunk them.
          </p>

          <h2 style={{ fontSize: 28 }}>1. Toothpaste Clears Pimples</h2>
          <p>
            Toothpaste contains ingredients that are meant for teeth, not skin.
            It can cause irritation, dryness, and even chemical burns. Spot
            treatments designed for acne are safer and more effective.
          </p>

          <h2 style={{ fontSize: 28 }}>2. Natural Products Are Always Better</h2>
          <p>
            Natural ingredients can be beneficial, but they can also cause
            allergies or irritation. Synthetic ingredients are not inherently
            harmful. What matters is the formulation and how your skin responds.
          </p>

          <h2 style={{ fontSize: 28 }}>3. You Only Need Sunscreen on Sunny Days</h2>
          <p>
            UV rays pass through clouds and windows. Daily sunscreen is one of
            the most important steps for long term skin health, even when the
            weather looks dull.
          </p>

          <h2 style={{ fontSize: 28 }}>4. Oily Skin Does Not Need Moisturizer</h2>
          <p>
            When oily skin is dehydrated, it often produces even more oil.
            Lightweight, non comedogenic moisturizers help balance the skin
            rather than worsen shine.
          </p>

          <h2 style={{ fontSize: 28 }}>5. Acne Is Caused by Poor Hygiene</h2>
          <p>
            Acne is influenced by hormones, genetics, and inflammation. Washing
            your face more than twice a day can actually irritate the skin and
            make acne worse.
          </p>

          <h2 style={{ fontSize: 28 }}>6. Pores Can Open and Close</h2>
          <p>
            Pores do not have muscles. They cannot open or close. They may look
            smaller when clean and larger when clogged, but their size does not
            physically change.
          </p>

          <h2 style={{ fontSize: 28 }}>7. Tanning Clears Acne</h2>
          <p>
            Tanning temporarily darkens the skin, which can make acne look less
            visible. In reality, UV exposure increases inflammation and can lead
            to long term damage.
          </p>

          <h2 style={{ fontSize: 28 }}>8. More Products Mean Better Results</h2>
          <p>
            Overloading the skin with too many active ingredients can cause
            irritation and sensitivity. A simple routine is often more effective
            than a complicated one.
          </p>

          <h2 style={{ fontSize: 28 }}>9. Drinking Water Cures Dry Skin</h2>
          <p>
            Hydration is important, but dry skin is caused by a weakened skin
            barrier. Moisturizers that contain ceramides and lipids are more
            effective than water alone.
          </p>

          <h2 style={{ fontSize: 28 }}>10. You Should Feel a Tingling Sensation</h2>
          <p>
            Tingling is usually a sign of irritation, not effectiveness. Skin
            care should not sting unless it is a product specifically designed
            to exfoliate.
          </p>

          <h2 style={{ fontSize: 28 }}>11. Dark Spots Fade Quickly</h2>
          <p>
            Hyperpigmentation can take weeks or months to fade. Consistency is
            key, and sunscreen is essential to prevent spots from becoming
            darker.
          </p>

          <h2 style={{ fontSize: 28 }}>12. Scrubbing Makes Skin Cleaner</h2>
          <p>
            Harsh scrubs can damage the skin barrier and cause microtears. A
            gentle chemical exfoliant is usually safer and more effective.
          </p>

          <h2 style={{ fontSize: 28 }}>13. You Should Not Use Retinol When Young</h2>
          <p>
            Retinol is safe for many age groups when used correctly. It can help
            with acne, texture, and early signs of aging. The key is to start
            slowly and use sunscreen.
          </p>

          <h2 style={{ fontSize: 28 }}>14. Expensive Products Work Better</h2>
          <p>
            Price does not determine effectiveness. Many affordable products
            contain the same active ingredients as luxury brands.
          </p>

          <h2 style={{ fontSize: 28 }}>15. Skin Problems Always Mean Poor Health</h2>
          <p>
            Skin reflects many factors, including genetics, hormones, stress,
            and environment. Imperfections are normal and do not always indicate
            a deeper issue.
          </p>

          <h2 style={{ fontSize: 28 }}>The Truth Matters</h2>
          <p>
            Skin care is full of noise, but clarity is possible. When people
            understand the difference between myth and fact, they can make
            choices that support long term skin health instead of chasing trends
            that promise quick fixes.
          </p>

          <p>
            With accurate information and consistent habits, anyone can build a
            routine that works for them. The goal is not perfection. The goal is
            healthy, balanced skin that feels good and functions well.
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
