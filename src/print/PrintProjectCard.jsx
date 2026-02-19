function parseParagraph(text) {
  return text.split(/(\[[^\]]+\])/g).map((chunk, i) => {
    if (/^\[[^\]]+\]$/.test(chunk)) {
      return (
        <span key={i} style={{
          display: "inline-block",
          fontSize: 11, fontWeight: 700,
          padding: "2px 9px", borderRadius: 4, marginRight: 6,
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
      fontSize: 12, fontWeight: 600, padding: "3px 11px", borderRadius: 20,
      background: color + "18", color,
      border: "1px solid " + color + "28",
      whiteSpace: "nowrap", display: "inline-block",
    }}>{label}</span>
  );
}

function PrintMetricCard({ value, label, sub, color }) {
  return (
    <div style={{
      padding: "18px 20px", borderRadius: 14,
      background: color + "07", border: "1px solid " + color + "20",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -14, right: -14,
        width: 64, height: 64, borderRadius: "50%",
        background: color + "12", pointerEvents: "none",
      }} />
      <p style={{ fontSize: 26, fontWeight: 800, color, margin: "0 0 6px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>{sub}</p>
    </div>
  );
}

function PrintDetailBlock({ icon, title, paragraphs, code, image, images, imageCaption }) {
  const imgList = images ?? (image ? [image] : []);

  return (
    <div style={{ padding: "20px 0", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: "#F8F7FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 10px" }}>{title}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.8, margin: 0 }}>
                {parseParagraph(para)}
              </p>
            ))}
          </div>
          {code && (
            <pre style={{
              marginTop: 12, padding: "14px 16px", borderRadius: 10,
              background: "#1A1B26", color: "#A9B1D6",
              fontSize: 12.5, lineHeight: 1.65, fontFamily: "monospace",
              whiteSpace: "pre-wrap", wordBreak: "break-word", overflow: "hidden",
            }}>{code}</pre>
          )}
          {imgList.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {imgList.map((src, i) => (
                  <img key={i} src={src} alt={imageCaption || title} style={{
                    height: 220, width: "auto",
                    borderRadius: 10, border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    objectFit: "cover",
                  }} />
                ))}
              </div>
              {imageCaption && (
                <p style={{ fontSize: 12, color: "#B0B7C3", textAlign: "center", margin: "8px 0 0", fontFamily: "monospace" }}>
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
      marginBottom: 28, borderRadius: 20,
      border: "1px solid #E8E8EC", background: "#fff",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      {/* Accent top bar */}
      <div style={{ height: 4, background: `linear-gradient(to right, ${proj.accent}, ${proj.accent}44)` }} />

      {/* Header */}
      <div style={{ padding: "32px 36px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 12, fontWeight: 700, fontFamily: "monospace",
            color: proj.accent, letterSpacing: "0.08em",
            background: proj.accent + "10", padding: "3px 11px", borderRadius: 6,
          }}>{proj.period}</span>
          <PrintTag label={"기여도 " + proj.contribution} color={proj.accent} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8, flexWrap: "wrap" }}>
          <h3 style={{
            fontSize: 32, fontWeight: 800, color: "#0A0A0A",
            margin: 0, fontFamily: "'Syne', sans-serif",
            letterSpacing: "-0.02em", lineHeight: 1.1,
          }}>{proj.title}</h3>
          {proj.github && (
            <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: "monospace" }}>
              {proj.github.replace("https://", "")}
            </span>
          )}
        </div>

        <p style={{ fontSize: 14, color: "#9CA3AF", margin: "0 0 16px", lineHeight: 1.55 }}>{proj.sub}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {proj.tags.map(t => <PrintTag key={t} label={t} color={proj.accent} />)}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ padding: "0 36px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {proj.metrics.map((m, i) => (
            <PrintMetricCard key={i} value={m.value} label={m.label} sub={m.sub} color={proj.accent} />
          ))}
        </div>
      </div>

      {/* Screenshots */}
      {proj.images && proj.images.length > 0 && (
        <div style={{ padding: "0 36px 24px" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {proj.images.map((src, i) => (
              <img key={i} src={src} alt="" style={{
                height: 260, width: "auto",
                borderRadius: 12, border: "1px solid #E5E7EB",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                objectFit: "cover",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div style={{ padding: "0 36px 12px", borderTop: "1px solid #F3F4F6" }}>
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
