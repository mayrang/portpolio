import { PROJECTS } from "../data/projects";
import PrintHero from "./PrintHero";
import PrintProjectCard from "./PrintProjectCard";
import PrintSkills from "./PrintSkills";

export default function PrintPage() {
  return (
    <div style={{
      background: "#F8F9FB",
      minHeight: "100vh",
      padding: "40px 0 60px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* 794px 고정 너비 — A4 기준 */}
      <div style={{
        width: 794,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#111",
      }}>

        {/* Nav */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36, paddingBottom: 16,
          borderBottom: "1px solid #EBEBEB",
        }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: "#7C3AED" }}>박</span>건상
          </span>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9CA3AF" }}>
            <span>pkss0626@naver.com</span>
            <span>·</span>
            <span>010-6571-0980</span>
            <span>·</span>
            <span>한밭대학교</span>
          </div>
        </div>

        {/* Hero */}
        <PrintHero />

        {/* Projects */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "#A78BFA", fontFamily: "monospace" }}>
              // PROJECTS
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #E5E7EB, transparent)" }} />
          </div>
          {PROJECTS.map(proj => (
            <PrintProjectCard key={proj.title} proj={proj} />
          ))}
        </div>

        {/* Skills */}
        <PrintSkills />

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #EEEFF2", paddingTop: 20, marginTop: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14 }}>
            <span style={{ color: "#7C3AED" }}>박</span>건상 · Frontend Developer
          </span>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>pkss0626@naver.com · 한밭대학교</span>
        </div>
      </div>
    </div>
  );
}
