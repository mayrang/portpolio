export default function SectionHeader({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#A78BFA", fontFamily: "monospace" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #E5E7EB, transparent)" }} />
    </div>
  );
}
