"use client";

const SCORE_PALETTE = [
  "#8b5cf6", "#ec4899", "#3b82f6", "#22d3ee", "#facc15", "#4ade80",
];


const COUNTRY_FLAGS = {
  "United States": "🇺🇸",
  "China": "🇨🇳",
  "Germany": "🇩🇪",
  "Japan": "🇯🇵",
  "South Korea": "🇰🇷",
  "United Kingdom": "🇬🇧",
  "France": "🇫🇷",
  "India": "🇮🇳",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
};

export default function ResultCard({ data, index = 0 }) {
  const score = typeof data.score === "number" ? data.score : null;
  const scorePct = score !== null ? Math.min(Math.round(score * 100), 100) : null;
  const flag = COUNTRY_FLAGS[data.country] ?? "🌍";
  const accentColor = SCORE_PALETTE[index % SCORE_PALETTE.length];

  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        borderLeft: `3px solid ${accentColor}44`,
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = accentColor;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.50), 0 0 0 1px ${accentColor}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = `${accentColor}44`;
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#e2e8f0",
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {data.title}
        </h3>

        {/* Score badge */}
        {score !== null && (
          <span
            style={{
              flexShrink: 0,
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "3px 9px",
              borderRadius: 99,
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}40`,
              color: accentColor,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {score.toFixed(3)}
          </span>
        )}
      </div>

      {/* Abstract */}
      {data.abstract && (
        <p
          style={{
            fontSize: "0.82rem",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.abstract}
        </p>
      )}

      {/* Divider */}
      <div className="divider" style={{ margin: 0 }} />

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.45)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span>{flag}</span> {data.country || "Unknown"}
        </span>

        {/* Similarity bar */}
        {scorePct !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 60,
                height: 4,
                borderRadius: 99,
                background: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: `${scorePct}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: accentColor,
                }}
              />
            </div>
            <span style={{ fontSize: "0.70rem", color: "rgba(255,255,255,0.30)", fontVariantNumeric: "tabular-nums" }}>
              {scorePct}%
            </span>
          </div>
        )}
      </div>
    </article>
  );
}