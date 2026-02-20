export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #EEEFF2", padding: "28px 24px",
      maxWidth: 860, margin: "0 auto",
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "center",
    }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>
        <span style={{ color: "#7C3AED" }}>박</span>건상 · Frontend Developer
      </span>
      <span style={{ fontSize: 12, color: "#9CA3AF" }}>pkss0626@naver.com · 한밭대학교</span>
    </footer>
  );
}
