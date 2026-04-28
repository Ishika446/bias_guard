export default function Loader({ message = "Analyzing patents…" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "48px 24px",
      }}
    >
      {/* Animated ring */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(139,92,246,0.15)",
          }}
        />
        <div className="spinner" style={{ width: 56, height: 56, borderWidth: 3 }} />
        <div
          style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.20), transparent)",
          }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#e2e8f0",
          }}
        >
          {message}
        </p>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.30)", marginTop: 6 }}>
          Running AI vector search across 2.4M+ patents
        </p>
      </div>

      {/* Progress placeholder steps */}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {["Embedding", "Searching", "Analyzing", "Report"].map((step, i) => (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.70rem",
              color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.20)",
              fontWeight: i === 0 ? 600 : 400,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === 0 ? "#8b5cf6" : "rgba(255,255,255,0.12)",
              }}
            />
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}