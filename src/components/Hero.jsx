const BULLETS = [
  {
    title: "오픈소스 깊이 — facebook/lexical 14번째 기여자",
    desc: "Meta 의 리치 텍스트 에디터 facebook/lexical 에 한국어 입력기 자동완성을 진입점으로 합류해 reconciler 성능 (5,000 paragraph 타이핑 8.46 배), 접근성 (WCAG 2.1 AA), 새 자료구조 (Named Slots) 까지 영역을 넓혔습니다. 메인테이너 (etrepum) 와 여러 차례 설계 논의를 거쳐 구조적 변경 PR 을 진행해 왔습니다.",
  },
  {
    title: "오픈소스 폭 — 다양한 라이브러리에 기여",
    desc: "텍스트 측정 라이브러리 chenglou/pretext (★48k) 에 한국어 / CJK 처리 관련 기여, vitest / recharts 등에도 본인이 마주친 버그를 직접 수정해 머지했습니다.",
  },
  {
    title: "자체 라이브러리 — npm 배포 2 종",
    desc: "팀 DX 향상용 애니메이션 라이브러리 Reanimated Composer 와 React 폼 자동 저장 라이브러리 formdraft (5.8KB brotli, 216 unit + 87 Playwright e2e) 두 종을 직접 개발해 npm 으로 배포했습니다.",
  },
  {
    title: "코드 품질 + 데이터 UX",
    desc: "스타트업 Sometime 에서 데이터 기반 UX 개선으로 회원가입 전환율 6% → 14% (2.3 배) 를 이끌었습니다. FSD 아키텍처 전환, TDD 0 → 237, 번들 -91%, Lighthouse Performance 98 / Accessibility 96 등 코드 품질 / 안정성 개선도 함께 진행했습니다.",
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
      }}>FRONTEND DEVELOPER · OPEN SOURCE CONTRIBUTOR</p>

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
        maxWidth: 620,
        wordBreak: "keep-all",
      }}>
        Meta 의 오픈소스 텍스트 에디터{" "}
        <span style={{
          fontFamily: "monospace",
          background: "#F3F4F6",
          padding: "1px 6px",
          borderRadius: 4,
          fontSize: "0.9em",
        }}>facebook/lexical</span>
        {" "}의{" "}
        <span style={{ color: "#7C3AED", fontWeight: 700 }}>
          14번째 기여자
        </span>입니다.
      </p>

      {/* Sub description */}
      <p style={{
        fontSize: 15, color: "#6B7280", lineHeight: 1.9,
        margin: "0 0 48px",
        animation: "fadeUp 0.8s ease 0.25s both",
        maxWidth: 580,
        wordBreak: "keep-all",
      }}>
        한국어 입력기 자동완성을 진입점으로 lexical 에 합류해 성능 / 접근성 / 자료구조까지 영역을 넓혔고,
        pretext / formdraft / vitest 등 다양한 오픈소스에 기여하고 있습니다.
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
