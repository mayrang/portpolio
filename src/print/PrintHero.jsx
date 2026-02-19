const BULLETS = [
  {
    icon: "📊",
    title: "데이터 기반의 UX 최적화",
    desc: "직감이 아닌 '데이터'로 소통합니다. Amplitude를 활용해 유저 퍼널을 분석하고, 가입 플로우를 개선하여 전환율을 2.3배 높인 경험이 있습니다.",
  },
  {
    icon: "⚙️",
    title: "팀을 위한 DX 개선 및 지식 공유",
    desc: "동료들의 개발 경험을 중요하게 생각합니다. 사내 애니메이션 라이브러리를 자체 개발 및 npm에 배포하여 팀의 생산성과 프로덕트 퀄리티를 동시에 높였습니다.",
  },
  {
    icon: "🤝",
    title: "목적 중심의 커뮤니케이션",
    desc: "탄탄한 기술적 이해도를 바탕으로 다양한 직군과 적극적으로 협업하며, 최적의 문제 해결 방안을 도출해 냅니다.",
  },
];

export default function PrintHero() {
  return (
    <div style={{ marginBottom: 56 }}>
      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 18px", borderRadius: 99,
        background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.18)",
        marginBottom: 28,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7C3AED", display: "inline-block" }} />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#7C3AED", fontFamily: "monospace" }}>
          FRONTEND DEVELOPER
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontSize: 72, fontWeight: 800, lineHeight: 1,
        fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em",
        margin: "0 0 28px", color: "#0A0A0A",
      }}>박건상</h1>

      {/* Tagline */}
      <p style={{
        fontSize: 20, fontWeight: 600, lineHeight: 1.65,
        color: "#374151", margin: "0 0 14px",
      }}>
        데이터로 UX를 증명하고,{" "}
        <span style={{ color: "#7C3AED" }}>기술로 DX를 개선하는 프론트엔드 개발자</span>입니다.
      </p>

      <p style={{
        fontSize: 16, color: "#9CA3AF", lineHeight: 1.85, margin: "0 0 36px",
      }}>
        지난 4년간 웹 개발에 몰두하며, 단순히 화면을 구현하는 것을 넘어
        프로덕트의 비즈니스 목표 달성에 기여하는 엔지니어로 성장했습니다.
      </p>

      {/* Divider */}
      <div style={{ width: 40, height: 2, background: "linear-gradient(to right, #7C3AED, transparent)", marginBottom: 32 }} />

      {/* Bullets */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {BULLETS.map((b, i) => (
          <div key={i} style={{
            display: "flex", gap: 20, alignItems: "flex-start",
            padding: "18px 0",
            borderBottom: i < BULLETS.length - 1 ? "1px solid #F3F4F6" : "none",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, flexShrink: 0,
              background: "rgba(124,58,237,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
            }}>{b.icon}</div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{b.title}</p>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, margin: 0 }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
