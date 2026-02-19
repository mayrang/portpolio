export default function CodeBlock({ code }) {
  return (
    <pre style={{
      marginTop: 12, padding: "14px 16px",
      borderRadius: 10,
      background: "#1A1B26", color: "#A9B1D6",
      fontSize: 12, lineHeight: 1.65,
      overflowX: "auto", fontFamily: "monospace",
      whiteSpace: "pre-wrap", wordBreak: "break-word"
    }}>{code}</pre>
  );
}
