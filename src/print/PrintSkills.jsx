import SKILLS from "../data/skills";

export default function PrintSkills() {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "#A78BFA", fontFamily: "monospace" }}>
          // SKILLS
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #E5E7EB, transparent)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {SKILLS.map(s => (
          <div key={s.cat} style={{
            padding: "14px 16px", borderRadius: 12,
            background: "#fff", border: "1px solid #EEEFF2",
          }}>
            <p style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
              color: "#A78BFA", fontFamily: "monospace", margin: "0 0 10px",
            }}>{s.cat.toUpperCase()}</p>
            {s.items.map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#DDD6FE", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#374151" }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
