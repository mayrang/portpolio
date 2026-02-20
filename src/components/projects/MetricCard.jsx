export default function MetricCard({ value, label, sub, color }) {
  return (
    <div style={{
      padding: "18px 20px", borderRadius: 12,
      background: "#fff", border: "1px solid #EEEFF2",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <p style={{
        fontSize: "clamp(22px, 3vw, 28px)",
        fontWeight: 800, color,
        margin: "0 0 6px", lineHeight: 1,
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: "-0.02em",
      }}>{value}</p>
      <p style={{ fontSize: 13.5, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 12.5, color: "#9CA3AF", margin: 0, lineHeight: 1.55 }}>{sub}</p>
    </div>
  );
}
