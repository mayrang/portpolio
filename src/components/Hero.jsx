const BULLETS = [
  {
    title: "코드 품질과 프로덕트 안정성",
    desc: "FSD 아키텍처 전환·TDD 테스트 구축(0→237개), 번들 분석 기반 성능 최적화(초기 번들 -91%, Lighthouse Performance 98점), 에러 핸들링 공통화 및 Sentry 모니터링 도입, 웹 접근성 개선(Lighthouse Accessibility 96점) 등 코드 품질과 서비스 안정성 향상을 주도해왔습니다.",
  },
  {
    title: "데이터로 증명하는 UX 개선",
    desc: "직감이 아닌 데이터로 소통합니다. 팀 내 UX 개선 필요성을 설득하기 위해 자발적으로 Amplitude를 도입하고, 데이터 기반으로 가입 플로우를 재설계해 회원가입 전환율을 6%→14%(2.3배)로 높였습니다.",
  },
  {
    title: "팀 DX 개선 및 오픈소스 기여",
    desc: "동료들의 개발 경험을 중요하게 생각합니다. React Native 애니메이션 라이브러리(reanimated-composer)를 직접 개발해 npm 오픈소스로 배포, 반복 보일러플레이트 30줄을 3줄로 단축했습니다.",
  },
];

export default function Hero() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "120px 24px 80px" }}>

      {/* Label */}
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
        color: "#9CA3AF", fontFamily: "monospace",
        margin: "0 0 24px",
        animation: "fadeUp 0.7s ease both",
      }}>FRONTEND DEVELOPER</p>

      {/* Name */}
      <h1 style={{
        fontSize: "clamp(48px, 8vw, 72px)",
        fontWeight: 800, lineHeight: 1,
        fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em",
        margin: "0 0 28px", color: "#0A0A0A",
        animation: "fadeUp 0.8s ease 0.1s both",
      }}>박건상</h1>

      {/* Tagline */}
      <p style={{
        fontSize: "clamp(15px, 2vw, 18px)",
        fontWeight: 600, lineHeight: 1.65,
        color: "#374151",
        margin: "0 0 12px",
        animation: "fadeUp 0.8s ease 0.2s both",
        maxWidth: 560,
        wordBreak: "keep-all",
      }}>
        코드 품질과 서비스 성장을{" "}
        <span style={{ color: "#7C3AED", fontWeight: 700 }}>
          함께 고민하는 프론트엔드 개발자
        </span>입니다.
      </p>

      {/* Sub description */}
      <p style={{
        fontSize: 15, color: "#6B7280", lineHeight: 1.9,
        margin: "0 0 48px",
        animation: "fadeUp 0.8s ease 0.25s both",
        maxWidth: 520,
        wordBreak: "keep-all",
      }}>
        스타트업에서 아키텍처 개선·성능 최적화·접근성 대응 등 기술적 깊이를 쌓으며,
        서비스 지표와 팀 생산성 향상에도 직접 기여해왔습니다.
      </p>

      {/* Divider */}
      <div style={{
        width: "100%", height: 1, background: "#F0F0F0",
        marginBottom: 36,
        animation: "fadeUp 0.8s ease 0.3s both",
      }} />

      {/* Bullet list */}
      <div style={{
        display: "flex", flexDirection: "column",
        animation: "fadeUp 0.8s ease 0.35s both",
      }}>
        {BULLETS.map((b, i) => (
          <div key={i} style={{
            padding: "22px 0",
            borderBottom: i < BULLETS.length - 1 ? "1px solid #F3F4F6" : "none",
          }}>
            <p style={{ fontSize: 14.5, fontWeight: 700, color: "#111", margin: "0 0 7px", lineHeight: 1.4, wordBreak: "keep-all" }}>
              {b.title}
            </p>
            <p style={{ fontSize: 14.5, color: "#6B7280", lineHeight: 1.85, margin: 0, wordBreak: "keep-all" }}>
              {b.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Links */}
      <div style={{
        display: "flex", gap: 12, flexWrap: "wrap",
        marginTop: 40,
        animation: "fadeUp 0.8s ease 0.45s both",
      }}>
        <a
          href="https://github.com/mayrang"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 22px", borderRadius: 12,
            background: "#111", color: "#fff",
            fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#333"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>

        <a
          href="mailto:pkss0626@naver.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 22px", borderRadius: 12,
            background: "#fff", color: "#374151",
            fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            border: "1.5px solid #E5E7EB",
            transition: "border-color 0.2s, color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.color = "#111"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          pkss0626@naver.com
        </a>
      </div>
    </div>
  );
}
