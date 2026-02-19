export default function SectionHeader({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
      <span style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.16em",
        color: "#9CA3AF", fontFamily: "monospace",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
    </div>
  );
}
