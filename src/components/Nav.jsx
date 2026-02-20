export default function Nav({ solid }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "14px 36px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: solid ? "rgba(248,249,251,0.96)" : "transparent",
      backdropFilter: solid ? "blur(14px)" : "none",
      borderBottom: solid ? "1px solid #EBEBEB" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 17 }}>
        <span style={{ color: "#7C3AED" }}>박</span>건상
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {[
          { l: "GitHub", href: "https://github.com/mayrang" },
          { l: "pkss0626@naver.com", href: "mailto:pkss0626@naver.com" },
        ].map(item => (
          <a key={item.l} href={item.href} target="_blank" rel="noreferrer" style={{
            fontSize: 13, fontWeight: 500, color: "#6B7280",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#6B7280"; }}
          >{item.l}</a>
        ))}
      </div>
    </nav>
  );
}
