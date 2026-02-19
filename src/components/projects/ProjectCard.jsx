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
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 12, fontWeight: 600,
                    padding: "5px 12px", borderRadius: 8,
                    background: "#F3F4F6", color: "#374151",
                    textDecoration: "none",
                    border: "1px solid #E5E7EB",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#F3F0FF";
                    e.currentTarget.style.color = "#7C3AED";
                    e.currentTarget.style.borderColor = "#C4B5FD";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#F3F4F6";
                    e.currentTarget.style.color = "#374151";
                    e.currentTarget.style.borderColor = "#E5E7EB";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
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
