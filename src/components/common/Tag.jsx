export default function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 6,
      background: "#F3F4F6", color: "#4B5563",
      border: "1px solid #E5E7EB",
      whiteSpace: "nowrap", display: "inline-block",
      letterSpacing: "0.01em",
    }}>{label}</span>
  );
}
