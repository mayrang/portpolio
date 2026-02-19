// [Problem], [Solution] 키워드 badge 파싱
function parseParagraph(text) {
  return text.split(/(\[[^\]]+\])/g).map((chunk, i) => {
    if (/^\[[^\]]+\]$/.test(chunk)) {
      return (
        <span key={i} style={{
          display: "inline-block",
          fontSize: 10, fontWeight: 700,
          padding: "1px 7px", borderRadius: 4, marginRight: 5,
          background: "#F3F0FF", color: "#7C3AED",
          fontFamily: "monospace", letterSpacing: "0.02em",
          verticalAlign: "middle",
        }}>{chunk.slice(1, -1)}</span>
      );
    }
    return chunk;
  });
}

function PrintTag({ label, color }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 9px", borderRadius: 20,
      background: color + "18", color,
      border: "1px solid " + color + "28",
      whiteSpace: "nowrap", display: "inline-block",
    }}>{label}</span>
  );
}

function PrintMetricCard({ value, label, sub, color }) {
  return (
    <div style={{
      padding: "14px 16px", borderRadius: 12,
      background: color + "07", border: "1px solid " + color + "20",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -12, right: -12,
        width: 56, height: 56, borderRadius: "50%",
        background: color + "12", pointerEvents: "none",
      }} />
      <p style={{ fontSize: 20, fontWeight: 800, color, margin: "0 0 4px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{sub}</p>
    </div>
  );
}

function PrintDetailBlock({ icon, title, paragraphs, code, image, images, imageCaption }) {
  const imgList = images ?? (image ? [image] : []);

  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: "#F8F7FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 8px" }}>{title}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>
                {parseParagraph(para)}
              </p>
            ))}
          </div>
          {code && (
            <pre style={{
              marginTop: 10, padding: "12px 14px", borderRadius: 8,
              background: "#1A1B26", color: "#A9B1D6",
              fontSize: 11, lineHeight: 1.6, fontFamily: "monospace",
              whiteSpace: "pre-wrap", wordBreak: "break-word", overflow: "hidden",
            }}>{code}</pre>
          )}
          {imgList.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {imgList.map((src, i) => (
                  <img key={i} src={src} alt={imageCaption || title} style={{
                    height: 200, width: "auto",
                    borderRadius: 8, border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    objectFit: "cover",
                  }} />
                ))}
              </div>
              {imageCaption && (
                <p style={{ fontSize: 10, color: "#B0B7C3", textAlign: "center", margin: "6px 0 0", fontFamily: "monospace" }}>
                  {imageCaption}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PrintProjectCard({ proj }) {
  return (
    <div style={{
      marginBottom: 24, borderRadius: 18,
      border: "1px solid #E8E8EC", background: "#fff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      {/* Accent top bar */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${proj.accent}, ${proj.accent}44)` }} />

      {/* Header */}
      <div style={{ padding: "24px 28px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: "monospace",
            color: proj.accent, letterSpacing: "0.08em",
            background: proj.accent + "10", padding: "2px 9px", borderRadius: 6,
          }}>{proj.period}</span>
          <PrintTag label={"기여도 " + proj.contribution} color={proj.accent} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
          <h3 style={{
            fontSize: 26, fontWeight: 800, color: "#0A0A0A",
            margin: 0, fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.02em", lineHeight: 1.1,
          }}>{proj.title}</h3>
          {proj.github && (
            <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace" }}>
              {proj.github.replace("https://", "")}
            </span>
          )}
        </div>

        <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 12px", lineHeight: 1.5 }}>{proj.sub}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {proj.tags.map(t => <PrintTag key={t} label={t} color={proj.accent} />)}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ padding: "0 28px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {proj.metrics.map((m, i) => (
            <PrintMetricCard key={i} value={m.value} label={m.label} sub={m.sub} color={proj.accent} />
          ))}
        </div>
      </div>

      {/* Screenshots */}
      {proj.images && proj.images.length > 0 && (
        <div style={{ padding: "0 28px 20px" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {proj.images.map((src, i) => (
              <img key={i} src={src} alt="" style={{
                height: 240, width: "auto",
                borderRadius: 10, border: "1px solid #E5E7EB",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                objectFit: "cover",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div style={{ padding: "0 28px 8px", borderTop: "1px solid #F3F4F6" }}>
        {proj.details.map((d, i) => (
          <PrintDetailBlock
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
    </div>
  );
}
