"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeIdea } from "../services/api";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react"; // 🔐 AUTH

const EXAMPLE_IDEAS = [
  "AI-powered solar charging system",
  "Smart wearable health monitor",
  "Autonomous delivery drone",
  "Quantum encryption chip",
];

const FEATURES = [
  { icon: "🔍", label: "Semantic search" },
  { icon: "⚖️", label: "Bias detection" },
  { icon: "🌍", label: "Global coverage" },
  { icon: "⚡", label: "Real-time AI" },
];

export default function IdeaInput() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const { data: session } = useSession(); // 🔐 SESSION
  const router = useRouter();

  const handleChange = (e) => {
    setIdea(e.target.value);
    setCharCount(e.target.value.length);
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    // 🔐 BLOCK IF NOT LOGGED IN
    if (!session) {
      signIn(); // opens login
      return;
    }

    if (!idea.trim()) {
      setError("Please describe your invention or patent idea.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeIdea(idea, session?.user?.email);
      localStorage.setItem("result", JSON.stringify(result));
      router.push("/dashboard");
    } catch (err) {
      setError("Analysis failed. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* INPUT CARD */}
      <div
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 20,
          padding: "24px",
          boxShadow: `
            0 10px 60px rgba(0,0,0,0.6),
            0 0 40px rgba(139,92,246,0.15),
            inset 0 1px 0 rgba(255,255,255,0.06)
          `,
        }}
      >
        {/* 🔐 LOGIN WARNING */}
        {!session && (
          <div
            style={{
              marginBottom: 12,
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(250,204,21,0.10)",
              border: "1px solid rgba(250,204,21,0.25)",
              fontSize: "0.85rem",
              color: "#facc15",
            }}
          >
            🔒 Please login to analyze your idea
          </div>
        )}

        {/* TEXTAREA */}
        <div style={{ position: "relative" }}>
          <textarea
            value={idea}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
            }}
            placeholder="💡 Describe your invention or patent idea in detail..."
            rows={5}
            maxLength={1000}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 14,
              fontSize: "1rem",
              color: "#fff",
              background: "rgba(255,255,255,0.05)",
              border: error
                ? "1px solid rgba(239,68,68,0.6)"
                : "1px solid rgba(255,255,255,0.1)",
              outline: "none",
              boxShadow: idea.length
                ? "0 0 20px rgba(139,92,246,0.25)"
                : "none",
            }}
          />

          {/* CHAR COUNT */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 14,
              fontSize: "0.72rem",
              color:
                charCount > 900 ? "#f87171" : "rgba(255,255,255,0.25)",
            }}
          >
            {charCount}/1000
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              background: "rgba(239,68,68,0.10)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10,
              fontSize: "0.875rem",
              color: "#f87171",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* BUTTON */}
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleSubmit}
            disabled={loading || !idea.trim()}
            style={{
              padding: "13px 28px",
              borderRadius: 12,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
            }}
          >
            {loading ? "Analyzing..." : "⚡ Analyze Patent"}
          </button>
        </div>

        {/* STATUS */}
        <p
          style={{
            marginTop: 16,
            fontSize: "0.75rem",
            color: "#4ade80",
          }}
        >
          ● AI engine ready · Real-time patent analysis
        </p>
      </div>

      {/* EXAMPLES */}
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
          Try an example:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {EXAMPLE_IDEAS.map((item) => (
            <button
              key={item}
              onClick={() => {
                setIdea(item);
                setCharCount(item.length);
                setError(null);
              }}
              className="chip"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 28,
        }}
      >
        {FEATURES.map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", gap: 6, fontSize: "0.8rem" }}>
            <span>{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}