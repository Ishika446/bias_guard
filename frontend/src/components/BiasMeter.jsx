const RISK_CONFIG = {
  High:   { color: "#f87171", bg: "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.25)",  icon: "🔴" },
  Medium: { color: "#facc15", bg: "rgba(234,179,8,0.10)",  border: "rgba(234,179,8,0.25)",  icon: "🟡" },
  Low:    { color: "#4ade80", bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.25)",  icon: "🟢" },
};

export default function BiasMeter({ bias }) {
  if (!bias) {
    return (
      <p style={{ color: "rgba(255,255,255,0.30)", fontSize: "0.875rem" }}>
        No bias data available.
      </p>
    );
  }

  const risk = bias.bias_risk ?? "Unknown";
  const cfg = RISK_CONFIG[risk] ?? { color: "#94a3b8", bg: "rgba(148,163,184,0.10)", border: "rgba(148,163,184,0.20)", icon: "⚪" };

  const distribution = bias.country_distribution ?? {};
  const total = Object.values(distribution).reduce((s, v) => s + v, 0) || 1;
  const entries = Object.entries(distribution).sort(([, a], [, b]) => b - a);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Risk badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          borderRadius: 14,
        }}
      >
        <div>
          <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>
            Bias Risk Level
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: cfg.color, marginTop: 2 }}>
            {cfg.icon} {risk}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.40)", fontWeight: 500 }}>
            Dominant Country
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#e2e8f0", marginTop: 2 }}>
            {bias.dominant_country ?? "—"}
          </p>
        </div>
      </div>

      {/* Distribution bars */}
      {entries.length > 0 && (
        <div>
          <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: 14 }}>
            Geographic Distribution
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {entries.map(([country, count]) => {
              const pct = Math.round((count / total) * 100);
              return (
                <div key={country}>
                  <div className="score-row" style={{ marginBottom: 5 }}>
                    <span className="score-label">{country}</span>
                    <span className="score-value" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}>
                      {count} <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>({pct}%)</span>
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background:
                          pct > 60
                            ? `linear-gradient(90deg, ${cfg.color}88, ${cfg.color})`
                            : "linear-gradient(90deg, #8b5cf6, #ec4899)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}