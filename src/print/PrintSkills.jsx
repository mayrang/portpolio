import SKILLS from "../data/skills";

export default function PrintSkills() {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: "#A78BFA", fontFamily: "monospace" }}>
          // SKILLS
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #E5E7EB, transparent)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {SKILLS.map(s => (
          <div key={s.cat} style={{
            padding: "20px 22px", borderRadius: 14,
            background: "#fff", border: "1px solid #EEEFF2",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
              color: "#A78BFA", fontFamily: "monospace", margin: "0 0 14px",
            }}>{s.cat.toUpperCase()}</p>
            {s.items.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#DDD6FE", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
