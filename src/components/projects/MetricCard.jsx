export default function MetricCard({ value, label, sub, color }) {
  return (
    <div style={{
      padding: "18px 20px", borderRadius: 14,
      background: color + "07",
      border: "1px solid " + color + "20",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative background circle */}
      <div style={{
        position: "absolute", top: -16, right: -16,
        width: 72, height: 72, borderRadius: "50%",
        background: color + "12",
        pointerEvents: "none",
      }} />

      <p style={{
        fontSize: "clamp(22px, 3vw, 28px)",
        fontWeight: 800, color,
        margin: "0 0 6px", lineHeight: 1,
        fontFamily: "'Syne', sans-serif",
        letterSpacing: "-0.02em",
      }}>{value}</p>

      <p style={{
        fontSize: 13, fontWeight: 600,
        color: "#1a1a1a", margin: "0 0 3px",
        lineHeight: 1.3,
      }}>{label}</p>

      <p style={{
        fontSize: 11.5, color: "#9CA3AF",
        margin: 0, lineHeight: 1.5,
      }}>{sub}</p>
    </div>
  );
}
