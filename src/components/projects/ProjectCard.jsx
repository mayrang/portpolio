import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import Tag from "../common/Tag";
import MetricCard from "./MetricCard";
import ScreenshotRow from "./ScreenshotRow";
import DetailBlock from "./DetailBlock";

function ChevronIcon({ open }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{
        transition: "transform 0.3s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function ProjectCard({ proj, initOpen }) {
  const [open, setOpen] = useState(initOpen);
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.65s ease, transform 0.65s ease",
      marginBottom: 16, borderRadius: 20,
      border: "1px solid #E8E8EC",
      background: "#fff",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      {/* Accent top bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(to right, ${proj.accent}, ${proj.accent}44)`,
      }} />

      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left",
          background: "none", border: "none", cursor: "pointer",
          padding: "28px 32px 24px",
          borderBottom: open ? "1px solid #F0F0F3" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1 }}>

            {/* Period + Contribution row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                color: proj.accent, letterSpacing: "0.08em",
                background: proj.accent + "10",
                padding: "3px 10px", borderRadius: 6,
              }}>{proj.period}</span>
              <Tag label={"기여도 " + proj.contribution} color={proj.accent} />
            </div>

            {/* Title + GitHub */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <h3 style={{
                fontSize: "clamp(22px, 3.5vw, 30px)",
                fontWeight: 800, color: "#0A0A0A",
                margin: 0,
                fontFamily: "'Syne', Georgia, sans-serif",
                letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>{proj.title}</h3>
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontSize: 11, color: "#9CA3AF",
                    textDecoration: "none", fontFamily: "monospace",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#7C3AED"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; }}
                >
                  {proj.github.replace("https://", "")}
                </a>
              )}
            </div>

            {/* Sub */}
            <p style={{
              fontSize: 13, color: "#9CA3AF",
              margin: "0 0 14px", lineHeight: 1.55,
            }}>{proj.sub}</p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {proj.tags.map(t => <Tag key={t} label={t} color={proj.accent} />)}
            </div>
          </div>

          {/* Toggle button */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
            border: "1.5px solid " + proj.accent + "30",
            background: open ? proj.accent : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#fff" : proj.accent,
            transition: "background 0.25s, color 0.25s",
            marginTop: 4,
          }}>
            <ChevronIcon open={open} />
          </div>
        </div>
      </button>

      {open && (
        <div style={{ padding: "24px 32px 12px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 10, marginBottom: 24,
          }}>
            {proj.metrics.map((m, i) => (
              <MetricCard key={i} value={m.value} label={m.label} sub={m.sub} color={proj.accent} />
            ))}
          </div>
          <ScreenshotRow images={proj.images} />
          {proj.details.map((d, i) => (
            <DetailBlock
              key={i}
              icon={d.icon}
              title={d.title}
              paragraphs={d.paragraphs}
              code={d.code}
              image={d.image}
              images={d.images}
              imageCaption={d.imageCaption}
            />
          ))}
        </div>
      )}
    </div>
  );
}
