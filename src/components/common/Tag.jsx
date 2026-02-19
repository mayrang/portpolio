export default function Tag({ label, color = "#7C3AED" }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
      background: color + "18", color: color,
      border: "1px solid " + color + "28",
      whiteSpace: "nowrap", display: "inline-block"
    }}>{label}</span>
  );
}
