import SKILLS from "../data/skills";
import Reveal from "./common/Reveal";
import SectionHeader from "./common/SectionHeader";

export default function Skills() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>
      <Reveal>
        <SectionHeader label="SKILLS" />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {SKILLS.map((s, i) => (
          <Reveal key={s.cat} delay={i * 0.07}>
            <div style={{
              padding: "18px 20px", borderRadius: 12,
              background: "#fff", border: "1px solid #EEEFF2",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#9CA3AF", fontFamily: "monospace", margin: "0 0 12px" }}>
                {s.cat.toUpperCase()}
              </p>
              {s.items.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#D1D5DB", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
