export default function ScreenshotRow({ images }) {
  if (!images || images.length === 0) return null;
  return (
    <div style={{
      margin: "0 0 24px", padding: "18px",
      background: "#F8F9FB", borderRadius: 12,
      border: "1px solid #EEEFF2"
    }}>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
        color: "#C0C4CC", fontFamily: "monospace", margin: "0 0 12px"
      }}>SCREENSHOTS</p>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 2 }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt="" style={{
            height: "clamp(320px, 45vw, 480px)", borderRadius: 10,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            objectFit: "cover", flexShrink: 0
          }} />
        ))}
      </div>
    </div>
  );
}
