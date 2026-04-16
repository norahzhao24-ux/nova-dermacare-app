"use client";

import Link from "next/link";

export default function DermatologyDesertsArticle() {
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
          src="/article4map.png"
          alt="Dermatology Deserts Map"
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
          Where Skin Care Is Out of Reach: Understanding Dermatology Deserts
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
          Why millions lack access to dermatologists and what it means for global skin health.
        </p>

        {/* META */}
        <p style={{ color: "#666", fontSize: 15, marginBottom: 40 }}>
          By <strong>Karen Zhao</strong> • February 13, 2026 • 5 MIN READ
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
            Skin disease is no longer a quiet or secondary medical issue. The World Health Organization
            identified skin conditions as a global public health priority in 2024 and 2025, citing the enormous
            burden they place on individuals and health systems. This recognition reflects a growing crisis:
            billions of people are living with untreated or poorly managed skin conditions because they simply
            cannot access a dermatologist when they need one.
          </p>

          <p>
            More than two billion people worldwide are affected by skin disease, according to WHO estimates.
            These conditions are not cosmetic inconveniences. They cause pain, itching, infections, scarring,
            sleep disruption, and significant emotional distress. For teenagers in particular, skin disease can
            shape identity, confidence, and mental health in lasting ways.
          </p>

          <h2 style={{ fontSize: 28 }}>A Shortage Unlike Any Other</h2>
          <p>
            Many medical specialties face workforce shortages, but dermatology stands out as one of the most
            severe. Large regions of the world have fewer than three dermatologists per 100,000 people. This
            includes rural North America, the Midwest and Great Plains of the United States, northern and
            Atlantic Canada, Sub Saharan Africa, and much of South Asia.
          </p>

          <p>
            In these areas, people often wait months or even years for an appointment. Some never receive a
            referral at all. Others must travel hundreds of miles to reach the nearest specialist. The result is
            a landscape where skin disease is common, but expert care is rare.
          </p>

          <h2 style={{ fontSize: 28 }}>The Frontline Gap</h2>
          <p>
            In underserved regions, skin conditions are usually managed in primary care or not managed at all.
            Primary care physicians and pediatricians are highly skilled, but most receive very limited
            dermatology training. They are expected to diagnose infections, inflammatory diseases, chronic
            conditions, and even early signs of skin cancer without the tools or experience that dermatologists
            rely on.
          </p>

          <p>
            This gap leads to delayed diagnosis, incorrect treatment, and preventable complications. Many
            conditions that could be resolved early become chronic simply because the right expertise was not
            available at the right time.
          </p>

          <h2 style={{ fontSize: 28 }}>Why Dermatologists Matter</h2>
          <p>
            Dermatologists are trained to distinguish between conditions that look similar but require very
            different treatments. They can identify infections, inflammatory disorders, autoimmune conditions,
            and malignancies that may appear identical to an untrained eye. They also understand how diseases
            present across different skin tones, something that is often overlooked in general medical training.
          </p>

          <p>
            Their expertise is especially important for conditions that progress quickly or mimic other
            diseases. A misdiagnosed rash can be inconvenient. A misdiagnosed melanoma can be fatal.
          </p>

          <h2 style={{ fontSize: 28 }}>Diagnostic Inequity on Darker Skin</h2>
          <p>
            One of the most serious issues in dermatology is the lack of accurate diagnosis for people with
            melanin rich skin. Many medical images, textbooks, and diagnostic datasets have historically
            underrepresented darker skin tones. As a result, conditions such as eczema, psoriasis, and Lyme
            disease are frequently misdiagnosed or diagnosed late.
          </p>

          <p>
            Newer systems that intentionally oversample Fitzpatrick IV through VI skin tones are helping to
            address this inequity. Better representation leads to better outcomes, and it ensures that people
            with darker skin receive the same quality of care as everyone else.
          </p>

          <h2 style={{ fontSize: 28 }}>A Global Burden Hidden in Plain Sight</h2>
          <p>
            Skin conditions are among the most common reasons people seek medical care worldwide. The British
            Journal of Dermatology reports that they are now the top new reason for primary care visits in
            England and Wales. This reflects a broader trend: people are seeking help, but specialists are not
            available to meet the demand.
          </p>

          <p>
            The burden is not only medical. It is emotional, social, and economic. People miss work, school, and
            social activities because of skin disease. They struggle with confidence and identity. They face
            stigma and misunderstanding. These challenges are magnified when access to care is limited.
          </p>

          <h2 style={{ fontSize: 28 }}>The Path Forward</h2>
          <p>
            Addressing dermatology deserts requires a combination of solutions. Increasing the number of
            dermatologists is important, but it is not enough. Frontline providers need better tools for visual
            diagnosis. Communities need accessible resources. Patients need clear information and early
            intervention.
          </p>

          <p>
            Technology can help bridge the gap. AI powered tools can support primary care providers, improve
            early detection, and reduce misdiagnosis. They are not replacements for dermatologists, but they can
            extend expertise into regions where specialists are scarce.
          </p>

          <p>
            Skin disease is a global crisis, but it is also a solvable one. With better access, better tools,
            and better representation, millions of people can receive the care they deserve.
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
