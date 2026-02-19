import CodeBlock from "./CodeBlock";

// [Problem], [Solution] 등 대괄호 키워드를 badge로 렌더링
function parseParagraph(text) {
  return text.split(/(\[[^\]]+\])/g).map((chunk, i) => {
    if (/^\[[^\]]+\]$/.test(chunk)) {
      const label = chunk.slice(1, -1);
      return (
        <span key={i} style={{
          display: "inline-block",
          fontSize: 10.5, fontWeight: 700,
          padding: "2px 8px", borderRadius: 4, marginRight: 6,
          background: "#1A1A1A", color: "#fff",
          fontFamily: "monospace", letterSpacing: "0.02em",
          verticalAlign: "middle",
        }}>{label}</span>
      );
    }
    return chunk;
  });
}

export default function DetailBlock({ icon, title, paragraphs, code, image, images, imageCaption }) {
  const imgList = images ?? (image ? [image] : []);

  return (
    <div style={{ marginBottom: 0, padding: "20px 0", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

        {/* Icon box */}
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: "#F3F4F6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, marginTop: 1,
        }}>
          {icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          <p style={{
            fontSize: 14, fontWeight: 700, color: "#111",
            margin: "0 0 10px", lineHeight: 1.4,
          }}>{title}</p>

          {/* Paragraphs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontSize: 13.5, color: "#6B7280",
                lineHeight: 1.8, margin: 0,
              }}>
                {parseParagraph(para)}
              </p>
            ))}
          </div>

          {/* Code block */}
          {code && <CodeBlock code={code} />}

          {/* Images */}
          {imgList.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{
                display: "flex", gap: 10, overflowX: "auto",
                paddingBottom: 2,
              }}>
                {imgList.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={imageCaption || title}
                    style={{
                      flex: "0 0 auto",
                      height: "clamp(200px, 30vw, 320px)",
                      width: "auto",
                      maxWidth: "100%",
                      borderRadius: 10,
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              {imageCaption && (
                <p style={{
                  fontSize: 11, color: "#B0B7C3", textAlign: "center",
                  margin: "8px 0 0", fontFamily: "monospace",
                }}>{imageCaption}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
