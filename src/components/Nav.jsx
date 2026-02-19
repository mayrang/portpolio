export default function Nav({ solid }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "13px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: solid ? "rgba(248,249,251,0.94)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: solid ? "1px solid #EBEBEB" : "none",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 17,
        }}
      >
        <span style={{ color: "#7C3AED" }}>박</span>건상
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { l: "GitHub ↗", href: "https://github.com/mayrang" },
          { l: "pkss0626@naver.com", href: "mailto:pkss0626@naver.com" },
        ].map((item) => (
          <a
            key={item.l}
            href={item.href}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 14px",
              borderRadius: 20,
              background: "#7C3AED15",
              color: "#7C3AED",
              textDecoration: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7C3AED28";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7C3AED15";
            }}
          >
            {item.l}
          </a>
        ))}
      </div>
    </nav>
  );
}
