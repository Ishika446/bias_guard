"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // 🔐 AUTH

import ResultCard from "../../components/ResultCard";
import BiasMeter from "../../components/BiasMeter";
import Charts from "../../components/Charts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false);

  const { data: session, status } = useSession(); // 🔐 SESSION
  const router = useRouter();

  /* ── PROTECT ROUTE ── */
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/"); // redirect if not logged in
    }
  }, [session, status]);

  /* ── LOAD DATA ── */
  useEffect(() => {
    const stored = localStorage.getItem("result");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(null);
      }
    }
    setMounted(true);
  }, []);

  /* ── AUTH LOADING ── */
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  /* ── EMPTY STATE ── */
  if (!mounted || !data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div className="spinner" />
        <p style={{ color: "rgba(255,255,255,0.4)" }}>
          No analysis found
        </p>
        <button className="btn-primary" onClick={() => router.push("/")}>
          ← Back to Home
        </button>
      </div>
    );
  }

  const bias = data.bias_analysis;
  const patents = data.similar_patents || [];

  const totalPatents = patents.length;
  const avgScore =
    totalPatents > 0
      ? (patents.reduce((s, p) => s + (p.score || 0), 0) / totalPatents).toFixed(3)
      : "—";

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>

      {/* ── TOP BAR ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backdropFilter: "blur(20px)",
          background: "rgba(2,6,23,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-ghost" onClick={() => router.push("/")}>
            ← Home
          </button>

          <h1 style={{ fontWeight: 700 }}>Dashboard</h1>
        </div>

        {/* RIGHT (USER INFO) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session && (
            <>
              <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                {session.user?.name}
              </span>

              <button className="btn-ghost" onClick={() => signOut()}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { label: "Similar Patents", value: totalPatents },
            { label: "Avg Similarity", value: avgScore },
            { label: "Dominant Region", value: bias?.dominant_country ?? "—" },
            { label: "Bias Risk", value: bias?.bias_risk ?? "—" },
          ].map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>

        {/* ANALYSIS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <div className="card">
            <h2>Bias Analysis</h2>
            <BiasMeter bias={bias} />
          </div>

          <div className="card">
            <h2>Distribution</h2>
            <Charts bias={bias} />
          </div>
        </div>

        {/* PATENTS */}
        <div>
          <h2 style={{ marginBottom: 12 }}>🔍 Similar Patents</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {patents.map((item, i) => (
              <ResultCard key={i} data={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}