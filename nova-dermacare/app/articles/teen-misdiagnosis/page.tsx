"use client";

import Link from "next/link";

export default function TeenMisdiagnosisArticle() {
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
          src="/article2.png"
          alt="Teen Skin Misdiagnosis"
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
          The Hidden Crisis: Teen Skin Misdiagnosis in the Age of Social Media
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
          How trends and misinformation are shaping teen skin health.
        </p>

        {/* META */}
        <p style={{ color: "#666", fontSize: 15, marginBottom: 40 }}>
          By <strong>Norah Zhao</strong> • March 21, 2026 • 5 MIN READ
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
            Teenagers today are growing up in a world where skin care advice is
            everywhere. It appears in short videos, influencer routines, product
            hauls, and dramatic before and after transformations. What used to
            be a private struggle with acne has become a public conversation
            shaped by algorithms and viral trends. The result is a generation of
            young people who are trying to diagnose themselves without the tools
            to do it safely.
          </p>

          <p>
            Dermatologists have been raising concerns for years, but the problem
            has accelerated. Teens are misidentifying their skin conditions at
            alarming rates, often confusing normal hormonal changes with chronic
            disorders or mistaking temporary irritation for long term disease.
            Many are treating the wrong issues, and in some cases, making their
            skin worse.
          </p>

          <h2 style={{ fontSize: 28 }}>The Rise of Social Media Skin Experts</h2>
          <p>
            Social media has created a new category of authority. A teenager
            with a ring light and a handful of products can appear just as
            credible as a licensed dermatologist. The problem is not that teens
            are curious about skin care. Curiosity is healthy. The problem is
            that the loudest voices are not always the most informed.
          </p>

          <p>
            Many creators speak confidently about conditions they have never
            experienced or studied. A single viral video can convince thousands
            of teens that they have fungal acne, rosacea, or barrier damage,
            even when their symptoms do not match. The language of dermatology
            has become a trend, and teens are adopting it without understanding
            what it means.
          </p>

          <h2 style={{ fontSize: 28 }}>When Self Diagnosis Goes Wrong</h2>
          <p>
            Misdiagnosis is not just a harmless mistake. It can lead to
            unnecessary treatments, over exfoliation, and long term sensitivity.
            Many teens are using strong acids, retinoids, and active ingredients
            without guidance. Some are layering products that should never be
            combined. Others are avoiding ingredients they actually need because
            a creator told them it would ruin their skin.
          </p>

          <p>
            In more serious cases, teens are overlooking medical conditions that
            require professional care. What they believe is stubborn acne may be
            cystic inflammation. What they think is redness may be early signs
            of rosacea. What they assume is irritation may be an allergic
            reaction. Without proper diagnosis, they are left guessing.
          </p>

          <h2 style={{ fontSize: 28 }}>The Emotional Toll</h2>
          <p>
            Skin is deeply tied to self esteem, especially during adolescence.
            When teens misdiagnose themselves, they often blame their skin for
            not responding to treatments that were never appropriate in the
            first place. This creates a cycle of frustration and insecurity.
          </p>

          <p>
            Many teens report feeling overwhelmed by the pressure to have
            perfect skin. They compare themselves to filtered images and edited
            videos. They feel behind if they are not using the latest trending
            product. The emotional weight of this pressure is often invisible,
            but it is real.
          </p>

          <h2 style={{ fontSize: 28 }}>How Technology Can Help</h2>
          <p>
            Artificial intelligence is not a replacement for dermatologists, but
            it can help teens understand their skin more accurately. Tools like
            NOVA provide objective analysis based on real images rather than
            trends or assumptions. Instead of guessing, teens can receive
            guidance that is grounded in data.
          </p>

          <p>
            When used responsibly, AI can reduce confusion and prevent teens
            from misdiagnosing themselves. It can help them identify when a
            condition is mild and manageable at home, and when it is time to
            seek professional care.
          </p>

          <h2 style={{ fontSize: 28 }}>A Path Forward</h2>
          <p>
            The solution is not to remove teens from social media. It is to give
            them better tools, better information, and better support. Education
            matters. Clear explanations matter. Accessible resources matter.
          </p>

          <p>
            Teenagers deserve to understand their skin without fear or
            confusion. They deserve guidance that empowers them rather than
            overwhelms them. With the right tools and knowledge, they can make
            informed decisions that support long term skin health.
          </p>

          <p>
            The crisis is real, but it is not irreversible. With awareness,
            compassion, and accurate information, we can help teens navigate the
            noise and find clarity in a world that often makes skin care more
            complicated than it needs to be.
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
