import CodeBlock from "./CodeBlock";

function parseParagraph(text) {
  // [키워드] 를 볼드 인라인 텍스트로 렌더링 (배지 제거)
  return text.split(/(\[[^\]]+\])/g).map((chunk, i) => {
    if (/^\[[^\]]+\]$/.test(chunk)) {
      const label = chunk.slice(1, -1);
      return (
        <strong key={i} style={{ color: "#111", fontWeight: 700 }}>{label}</strong>
      );
    }
    return chunk;
  });
}

export default function DetailBlock({ icon, title, paragraphs, code, image, images, imageCaption }) {
  const imgList = images ?? (image ? [image] : []);

  return (
    <div style={{ padding: "28px 0", borderBottom: "1px solid #F3F4F6" }}>
      {/* Title */}
      <p style={{
        fontSize: 15, fontWeight: 700, color: "#111",
        margin: "0 0 14px", lineHeight: 1.4,
      }}>{title}</p>

      {/* Paragraphs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: 14.5, color: "#4B5563",
            lineHeight: 1.9, margin: 0,
          }}>
            {parseParagraph(para)}
          </p>
        ))}
      </div>

      {/* Code block */}
      {code && <CodeBlock code={code} />}

      {/* Images */}
      {imgList.length > 0 && (
        <div style={{ marginTop: 20 }}>
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
              fontSize: 11.5, color: "#B0B7C3", textAlign: "center",
              margin: "8px 0 0",
            }}>{imageCaption}</p>
          )}
        </div>
      )}
    </div>
  );
}
