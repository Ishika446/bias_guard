"use client";
import Navbar from "../components/Navbar";
import IdeaInput from "../components/IdeaInput";

// NEW IMPORTS
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ParticlesBg from "../components/ui/ParticlesBg";


const STATS = [
  { value: "12432", label: "Patents analyzed" },
  { value: "92", label: "Detection accuracy (%)" },
  { value: "38", label: "Countries covered" },
  { value: "1.8", label: "Avg response time (s)" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Describe your idea",
    desc: "Enter your invention or innovation concept in plain English.",
    icon: "✍️",
  },
  {
    step: "02",
    title: "AI vector search",
    desc: "Our model embeds your idea and searches 2.4M+ global patents semantically.",
    icon: "🔍",
  },
  {
    step: "03",
    title: "Bias analysis",
    desc: "We detect geographic & demographic imbalances in the similar patent set.",
    icon: "⚖️",
  },
  {
    step: "04",
    title: "Actionable insights",
    desc: "Receive a detailed dashboard with scores, charts, and patent summaries.",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050811",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <ParticlesBg />

      {/* ── Orb decorations ── */}
      <div className="orb orb-1" style={{ zIndex: 0 }} />
      <div className="orb orb-2" style={{ zIndex: 0 }} />
      <div className="orb orb-3" style={{ zIndex: 0 }} />

      {/* ── Hero Section ─────────────────────────────── */}
      {/* ── Hero Section ─────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        {/* Top badge */}
        <div
          className="badge badge-purple animate-fade-up"
          style={{ marginBottom: 28 }}
        >
          <span className="pulse-dot" style={{ width: 7, height: 7 }} />
          Powered by AI · Real-time analysis
        </div>

        {/* Headline */}
        <TypeAnimation
          sequence={[
            "Uncover Hidden Bias in Patents",
            2000,
            "Detect Global Innovation Imbalance",
            2000,
            "Analyze Patent Intelligence",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
          className="font-display gradient-text animate-fade-up anim-delay-100"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: 780,
            marginBottom: 22,
          }}
        />

        {/* Sub-headline */}
        <p
          className="animate-fade-up anim-delay-200"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.20rem)",
            color: "rgba(255,255,255,0.50)",
            textAlign: "center",
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: 52,
          }}
        >
          Detect geographic &amp; demographic imbalances in innovation.
          Our AI scans millions of patents and surfaces insights invisible to the naked eye.
        </p>

        {/* Input */}
        <div
          className="animate-fade-up anim-delay-300"
          style={{ width: "100%", maxWidth: 680 }}
        >
          <IdeaInput />
        </div>

        {/* Glow line */}
        <div
          className="glow-line animate-fade-up anim-delay-400"
          style={{ width: "100%", maxWidth: 680, marginTop: 56 }}
        />

        {/* Stats row */}
        <div
          className="animate-fade-up anim-delay-500"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            maxWidth: 680,
            width: "100%",
            marginTop: 1,
          }}
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              style={{
                padding: "28px 12px",
                textAlign: "center",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <p
                className="font-display"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                <CountUp
                  end={parseFloat(value.replace(/[^\d.]/g, ""))}
                  duration={2}
                />
                {value.includes("+") && "+"}
                {value.includes("%") && "%"}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  fontWeight: 500,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── How It Works ─────────────────────────────── */}
      <section
        id="how-it-works"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 24px 120px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Section label */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            className="badge badge-purple"
            style={{ marginBottom: 16, display: "inline-flex" }}
          >
            How It Works
          </span>
          <h2
            className="font-display"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Four steps to clarity
          </h2>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 20,
          }}
        >
          {HOW_IT_WORKS.map(({ step, title, desc, icon }) => (
            <div key={step} className="card" style={{ position: "relative", overflow: "hidden" }}>
              {/* Step number watermark */}
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 16,
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.15))",
                  border: "1px solid rgba(139,92,246,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  marginBottom: 16,
                }}
              >
                {icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
          © 2026 BiasGuard AI · All rights reserved
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Contact"].map((t) => (
            <span
              key={t}
              className="footer-link"
            >
              {t}
            </span>
          ))}
        </div>
      </footer>
    </main>
  );
}