import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import Tag from "../common/Tag";

function LinkBadge({ href, icon, label, onClick }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
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
        e.currentTarget.style.background = "#F0F0F0";
        e.currentTarget.style.color = "#111";
        e.currentTarget.style.borderColor = "#D1D5DB";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#F3F4F6";
        e.currentTarget.style.color = "#374151";
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
      {label}
    </a>
  );
}

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

function GithubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
    </svg>
  );
}

function HighlightItem({ h, accent }) {
  return (
    <a
      href={h.url || "#"}
      target={h.url ? "_blank" : undefined}
      rel="noreferrer"
      onClick={e => {
        if (!h.url) e.preventDefault();
      }}
      style={{
        display: "block",
        padding: "16px 18px",
        borderRadius: 12,
        background: "#FAFAFB",
        border: "1px solid #F0F0F3",
        marginBottom: 10,
        textDecoration: "none",
        color: "inherit",
        transition: "background 0.2s, border-color 0.2s, transform 0.15s",
        cursor: h.url ? "pointer" : "default",
      }}
      onMouseEnter={e => {
        if (!h.url) return;
        e.currentTarget.style.background = "#F5F5F7";
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        if (!h.url) return;
        e.currentTarget.style.background = "#FAFAFB";
        e.currentTarget.style.borderColor = "#F0F0F3";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        {h.pr && (
          <span style={{
            fontSize: 11, fontWeight: 700, fontFamily: "monospace",
            color: accent, letterSpacing: "0.02em",
            padding: "2px 8px", borderRadius: 5,
            background: `${accent}15`,
          }}>{h.pr}</span>
        )}
        {h.state && (
          <span style={{
            fontSize: 11, fontWeight: 500,
            color: "#9CA3AF",
          }}>{h.state}</span>
        )}
      </div>
      <p style={{
        fontSize: 14, fontWeight: 700, color: "#111",
        margin: "0 0 6px", lineHeight: 1.4, wordBreak: "keep-all",
      }}>{h.title}</p>
      <p style={{
        fontSize: 13, color: "#6B7280",
        margin: 0, lineHeight: 1.7, wordBreak: "keep-all",
      }}>{h.desc}</p>
    </a>
  );
}

export default function OpenSourceCard({ data, initOpen }) {
  const [open, setOpen] = useState(initOpen);
  const [ref, vis] = useInView();

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.65s ease, transform 0.65s ease",
      marginBottom: 12, borderRadius: 16,
      border: "1px solid #E8E8EC",
      background: "#fff",
      overflow: "hidden",
    }}>
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

            {/* Period + Role row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {data.period && (
                <span style={{
                  fontSize: 11, fontWeight: 600, fontFamily: "monospace",
                  color: "#6B7280", letterSpacing: "0.06em",
                }}>{data.period}</span>
              )}
              {data.role && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>{data.role}</span>
                </>
              )}
              {data.stars && (
                <>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}>{data.stars}</span>
                </>
              )}
            </div>

            {/* Badge */}
            {data.badge && (
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  display: "inline-block",
                  fontSize: 12, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 999,
                  background: `${data.accent}15`,
                  color: data.accent,
                  letterSpacing: "0.01em",
                }}>{data.badge}</span>
              </div>
            )}

            {/* Repo + Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              {data.repo && (
                <span style={{
                  fontSize: 13, fontWeight: 600, fontFamily: "monospace",
                  color: "#374151",
                }}>{data.repo}</span>
              )}
              {data.repoUrl && (
                <LinkBadge
                  href={data.repoUrl}
                  onClick={e => e.stopPropagation()}
                  icon={<GithubIcon />}
                  label="GitHub"
                />
              )}
              {data.npmUrl && (
                <LinkBadge
                  href={data.npmUrl}
                  onClick={e => e.stopPropagation()}
                  icon={<NpmIcon />}
                  label="npm"
                />
              )}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: "clamp(18px, 2.6vw, 22px)",
              fontWeight: 700, color: "#0A0A0A",
              margin: "0 0 8px",
              fontFamily: "'Space Grotesk', Georgia, sans-serif",
              letterSpacing: "-0.01em", lineHeight: 1.3,
              wordBreak: "keep-all",
            }}>{data.title}</h3>

            {/* Sub */}
            {data.sub && (
              <p style={{
                fontSize: 13.5, color: "#6B7280",
                margin: "0 0 14px", lineHeight: 1.7,
                wordBreak: "keep-all",
              }}>{data.sub}</p>
            )}

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {data.tags.map(t => <Tag key={t} label={t} color={data.accent} />)}
              </div>
            )}
          </div>

          {/* Toggle button */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
            border: "1.5px solid #E5E7EB",
            background: open ? "#111" : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#fff" : "#6B7280",
            transition: "background 0.25s, color 0.25s, border-color 0.25s",
            marginTop: 4,
          }}>
            <ChevronIcon open={open} />
          </div>
        </div>
      </button>

      {open && data.highlights && (
        <div style={{ padding: "20px 24px 24px" }}>
          {data.highlights.map((h, i) => (
            <HighlightItem key={i} h={h} accent={data.accent} />
          ))}
        </div>
      )}
    </div>
  );
}
