import IMGS from './images.js';
import sometimeScreen1 from '../assets/image/sometime/image.png';
import sometimeScreen2 from '../assets/image/sometime/image-2.png';
import sometimeEdaArch from '../assets/image/sometime/image-3.png';
import moingSentry from '../assets/image/moing/image-sentry.png';
import moingLighthouse from '../assets/image/moing/image-lighthouse.png';
import dietnamLib from '../assets/image/dietnam/image-12.png';
import dietnamGps from '../assets/image/dietnam/image-13.png';

const CODE_ERROR_HANDLING = `// Before: 13개 훅마다 에러 처리를 각자 작성 — retry 없음, Sentry 없음
const mutation = useMutation({
  mutationFn: () => postBookmark(accessToken, userId, travelNumber),
  onError: (error) => {
    console.error(error); // 정책 없음, 모니터링 없음
  },
});

// After: createMutationOptions로 정책 한 곳에서 주입
// ① 단순 케이스 — 네트워크/서버 에러 모두 Toast
const mutation = useMutation({
  ...createMutationOptions({
    mutationFn: () => postBookmark(accessToken, userId, travelNumber),
    policy: { network: 'toast', system: 'toast' },
  }),
  onSuccess: invalidateAll,
});

// ② retry 케이스 — 네트워크 에러 시 1s→2s→4s 재시도 후 Toast
const mutation = useMutation({
  ...createMutationOptions({
    mutationFn: () => createTrip(travelData, accessToken),
    policy: { network: 'retry', system: 'toast' },
  }),
});

// ③ business 에러 위임 — 로그인 4xx는 폼에서 처리
const mutation = useMutation({
  ...createMutationOptions({
    mutationFn: ({ email, password }) => axiosInstance.post('/api/login', { email, password }),
    policy: { network: 'retry', system: 'toast' },
    onBusinessError: () => { /* setError('email', ...) — 폼에서 결정 */ },
  }),
});`;

const CODE_LOGGER_INTERFACE = `// src/shared/lib/logger/types.ts
export interface ILogger {
  error(message: string, error?: unknown, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  info(message: string, context?: Record<string, unknown>): void;
  breadcrumb(message: string, data?: Record<string, unknown>): void;
  /** 로그인/로그아웃 시 호출. null이면 유저 컨텍스트 초기화 */
  setUser(user: { id: number | string; email?: string } | null): void;
}`;

const CODE_LOGGER_FACTORY = `// src/shared/lib/logger/index.ts
function createLogger(): ILogger {
  if (process.env.NODE_ENV === 'test')       return new NoopLogger();
  if (process.env.NODE_ENV === 'production') return new SentryLogger();
  return new ConsoleLogger();
}

export const logger: ILogger = createLogger();

// 호출부 — 환경 분기 없이 한 줄로 통일
logger.error('API 호출 실패', error, { url: '/api/travel' });`;

const CODE_FOCUS_TRAP = `// src/shared/ui/modal/BaseModal.tsx
const modalRef = useRef<HTMLDivElement>(null);
const previousFocusRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  if (!isOpen) return;
  previousFocusRef.current = document.activeElement as HTMLElement;

  const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable?.[0]?.focus(); // 모달 열릴 때 첫 요소로 포커스 이동

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'Tab' && focusable && focusable.length > 0) {
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();  // Shift+Tab: 맨 앞 → 맨 뒤 순환
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus(); // Tab: 맨 뒤 → 맨 앞 순환
      }
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    previousFocusRef.current?.focus(); // 닫힐 때 트리거 버튼으로 포커스 복귀
  };
}, [isOpen, onClose]);`;

const CODE_DYNAMIC_IMPORT = `// Before: 정적 import → 초기 번들에 포함 (1.79MB)
import TravelLogMap from "@/components/map/TravelLogMap";

// After: Dynamic Import → 별도 청크 분리 (164kB)
const TravelLogMap = dynamic(() => import("@/components/map/TravelLogMap"), {
  ssr: false,       // Leaflet window 참조 에러 동시 해결
  loading: () => <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-xl" />,
});

// ANALYZE=true yarn build → webpack 트리맵으로 병목 수치 확인 후 적용`;

const CODE_EDA = `// UI는 이벤트를 '발행(Emit)'하기만 합니다.
const handleSend = (text) => {
  addOptimisticMessage(text);                         // 1. UI 즉시 반영
  chatEventBus.emit('SEND_MESSAGE_REQUEST', { text }); // 2. 이벤트 발행
};
// 실제 로직은 구독(Subscribe)하는 Manager가 처리합니다.`;
const CODE_BEFORE = `// Before: 매번 반복되는 30줄 보일러플레이트
const translateY = useSharedValue(100);
const opacity = useSharedValue(0);
useEffect(() => {
  translateY.value = withTiming(isVisible ? 0 : 100);
  opacity.value = withTiming(isVisible ? 1 : 0);
}, [isVisible]);
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{ translateY: translateY.value }],
}));`;
const CODE_AFTER = `// After: reanimated-composer (3줄로 단축)
const { animatedStyle } = usePresetAnimation('slideInUp', {
  trigger: isVisible,
  overrides: { duration: 500 }
});`;

const PROJECTS = [
  {
    period: "2025.06 – 2025.11",
    title: "Sometime",
    contribution: "50%",
    url: "https://some-in-univ.com",
    sub: "지역 기반 대학생 인증 및 매칭 플랫폼 · MAU 1,000+",
    accent: "#7C3AED",
    tags: ["React Native (Expo)", "TypeScript", "Reanimated", "Amplitude", "TanStack Query", "Zustand"],
    metrics: [
      { value: "2.3×", label: "가입 전환율 성장", sub: "6% → 14% (약 +133%)" },
      { value: "EDA", label: "이벤트 기반 아키텍처", sub: "Pub/Sub 패턴 · 낙관적 UI" },
      { value: "npm", label: "오픈소스 배포", sub: "reanimated-composer" },
    ],
    images: [sometimeScreen1, sometimeScreen2],
    details: [
      {
        icon: "🏗",
        title: "1. 이벤트 기반 아키텍처(EDA)로 채팅 시스템 구조 개선",
        paragraphs: [
          "[Problem: 강한 결합도와 저하된 사용자 경험] 기존 채팅 시스템은 UI 컴포넌트 내부에서 소켓 통신, 상태 업데이트, 낙관적 업데이트, 에러 처리를 모두 수행하여 강한 결합도가 발생했습니다. 이로 인해 유지보수가 어렵고, 메시지 전송 시 서버 응답을 기다려야 해 사용자가 느끼는 체감 속도가 느렸습니다.",
          "[Solution: Pub/Sub 패턴과 낙관적 업데이트] SocketManager, ChatManager가 중앙 이벤트 버스(ChatEventBus / RxJS Subject)를 통해 상태를 주고받도록 설계하여 코드 복잡도를 획기적으로 낮췄습니다. 메시지 전송 즉시(서버 응답 전) 가짜(Temporary) 메시지를 UI에 먼저 띄우고, 백그라운드에서 전송 성공 시 실제 데이터로 교체하는 낙관적 업데이트를 구현했습니다.",
        ],
        code: CODE_EDA,
        image: sometimeEdaArch,
        imageCaption: "EDA 기반 채팅 시스템 아키텍처",
      },
      {
        icon: "📈",
        title: "2. Amplitude 데이터로 증명한 가입 전환율 2.3배 성장",
        paragraphs: [
          "[Problem] 팀 내 UX 개선의 중요성을 객관적 지표로 설득하기 위해 팀 내 최초로 Amplitude 도입을 제안하고, 데이터 수집 설계부터 퍼널 분석·플로우 재설계까지 전체 프로세스를 단독으로 리딩했습니다. 퍼널 분석 결과 회원가입 단계에서 90% 이상의 이탈이 확인됐고, 두 가지 가설을 수립했습니다: ① PASS 본인 인증의 피로감 — 복잡한 인증 절차가 높은 진입 장벽으로 작용 ② 지역 선택의 모호함 — '거주지'/'학교 위치' 선택 시 인지적 부하(Cognitive Load) 발생.",
          "[Solution: 불필요한 단계 삭제 및 검색 강화] ① 카카오 소셜 로그인 도입으로 PASS 인증 대체(원클릭 진입) ② '지역 선택' 단계 과감히 삭제, 학교 선택으로 바로 직행 ③ 학교 검색 알고리즘 및 UI 대폭 강화.",
          "[Result] 배포 후 회원가입 전환율 6% → 14%, 약 2.3배(133%) 성장.",
        ],
      },
      {
        icon: "📦",
        title: "3. 자체 라이브러리 개발 및 npm 배포 (reanimated-composer)",
        paragraphs: [
          "[Problem: Reanimated의 높은 진입 장벽과 보일러플레이트] useSharedValue, useAnimatedStyle, useEffect 등 반복 보일러플레이트 코드가 과다했습니다. 애니메이션에 익숙하지 않은 팀원들이 매번 새로운 로직을 작성해야 해 구현 속도 저하 및 코드 일관성이 저하되는 문제가 발생했습니다.",
          "[Solution: 선언형 애니메이션 시스템 구축] 복잡한 명령형 로직을 숨기고, '상태(Trigger)'와 '프리셋(Preset)'만 선언하면 자동으로 애니메이션이 동작하는 reanimated-composer를 개발. usePresetAnimation 훅으로 slideInUp, fadeIn 등을 한 줄로 적용.",
          "[Impact] 30줄 → 3줄로 단축. npm 오픈소스 배포(reanimated-composer)로 팀 DX 향상 및 오픈소스 생태계에 기여.",
        ],
        code: CODE_BEFORE + "\n\n" + CODE_AFTER,
      },
    ],
  },
  {
    period: "2024.09 – 2025.06",
    title: "Moing",
    contribution: "50%",
    github: "https://github.com/SWYP6-Team7/frontend",
    sub: "여행 동행 모집 및 커뮤니티 플랫폼 · Frontend 2인, Backend 3인, 기획 1인, Design 2인",
    accent: "#0D9488",
    tags: ["Next.js", "React", "TypeScript", "TanStack Query", "Tailwind CSS", "Vitest", "Playwright", "Sentry"],
    metrics: [
      { value: "-91%", label: "번들 최적화", sub: "1.79MB → 164kB · Dynamic Import" },
      { value: "96점", label: "Lighthouse 접근성", sub: "WCAG 2.1 AA · Focus Trap" },
      { value: "Sentry", label: "에러 모니터링", sub: "공통 핸들링 · 환경별 Logger" },
    ],
    images: [],
    details: [
      {
        icon: "🛡",
        title: "1. 에러 핸들링 공통화 및 Sentry 프로덕션 모니터링 도입",
        paragraphs: [
          "[Problem] mutation마다 에러 처리가 흩어져 있었습니다. 일부는 console.error만 있고, retry 로직이나 Toast 피드백이 누락된 경우도 있었습니다. 또한 Sentry를 직접 호출하면 테스트 환경에서 SDK 로드 오버헤드, 개발 중 에러의 프로덕션 노이즈 수집, 서비스 교체 시 전체 호출부 수정 문제가 생겼습니다.",
          "[Solution] 에러를 네트워크 장애 · 비즈니스 오류(4xx) · 서버 오류(5xx)로 분류하는 classifyError를 설계하고, createMutationOptions 팩토리로 42개 mutation 전체에 재시도(지수 백오프 3회) · Toast · Logger 수집을 한 번에 주입했습니다. business 에러는 컨텍스트마다 의미가 달라 항상 콜백으로 위임하고, onSuccess는 팩토리 밖에서 선언하는 패턴으로 통일했습니다.",
          "[Logger] ILogger 인터페이스로 환경별 구현을 분기했습니다(test→Noop, production→Sentry, development→Console). Sentry에는 API URL · 네트워크 타입 · 유저 정보를 직접 추가하고, beforeSend로 민감 엔드포인트 수집을 차단했습니다.",
          "[Result] 에러 처리가 createMutationOptions 한 곳으로 모이고, 42개 mutation 에러가 Sentry에 자동 수집됩니다. 테스트는 NoopLogger로 SDK 로드 비용이 없고, 모니터링 서비스 교체 시 단일 파일만 수정하면 됩니다.",
        ],
        code: CODE_ERROR_HANDLING + "\n\n" + CODE_LOGGER_INTERFACE + "\n\n" + CODE_LOGGER_FACTORY,
        image: moingSentry,
        imageCaption: "Sentry 에러 수집 화면 — API URL · 환경 · 브라우저 컨텍스트 자동 기록",
      },
      {
        icon: "♿",
        title: "2. 번들 분석 기반 성능 최적화 — 초기 번들 -91%",
        paragraphs: [
          "[Problem] 감이 아닌 수치로 병목을 파악하기 위해 @next/bundle-analyzer로 webpack 트리맵을 시각화했습니다. TravelLogMap(Leaflet + 세계지도 GeoJSON)이 1.6MB 단일 청크를 점유하고 있었고, AppShell이 dynamic({ ssr: false })로 감싸져 SSR이 비활성화된 상태였습니다.",
          "[Solution] 초기 뷰포트에서 보이지 않는 3개 컴포넌트(TravelLogMap · MapContainer · EmblaCarousel)에 next/dynamic({ ssr: false })를 적용해 청크를 분리했습니다. AppShell SSR 활성화, next/image priority로 LCP 후보 이미지 preload, Pretendard 서브셋 전환(748kB → 264kB), loading.tsx 4개 라우트 작성으로 Streaming SSR을 구현했습니다.",
          "[Result] /userProfile/log 번들 1.79MB → 164kB(-91%), /trip/detail 450kB → 262kB(-42%)를 달성했습니다. ssr: false는 Leaflet의 window 참조 SSR 에러도 동시에 해결했습니다.",
        ],
        code: CODE_DYNAMIC_IMPORT,
      },
      {
        icon: "♿",
        title: "3. Production 빌드 기반 웹 접근성 개선 — Lighthouse Accessibility 96점",
        paragraphs: [
          "[Problem] axe-core 단위 테스트로는 발견되지 않는 구조적 접근성 문제가 존재했습니다. 앱 전체에 <main> 랜드마크 누락, WCAG 4.5:1 색 대비 미달 3곳, <div onClick> 패턴으로 키보드 접근 불가 요소 4건, 모달 Tab 이탈 문제 등 13개 위반이 확인됐습니다.",
          "[Solution] <div onClick> → <button> 전환, <main> 랜드마크 추가, CSS 변수 기반 색상 수정, focus-visible 포커스 스타일 적용. WAI-ARIA Listbox 패턴(↑↓ 탐색 · Enter 선택 · Escape 닫기)과 Focus Trap을 직접 구현해 키보드 · 스크린리더 사용자도 동일한 UX를 경험할 수 있도록 했습니다.",
          "[Result] Production 빌드 기준 Lighthouse Accessibility 96점 · Performance 98점을 달성했습니다.",
        ],
        code: CODE_FOCUS_TRAP,
        image: moingLighthouse,
        imageCaption: "Lighthouse 측정 결과 — Production 빌드 기준",
      },
    ],
  },
  {
    period: "2024.08",
    title: "Dietnam",
    contribution: "100%",
    github: "https://github.com/mayrang/Dietnam",
    sub: "베트남 현지 러닝 및 산책 경로 공유 서비스 · 베트남 하노이 국립대학 해외 인턴십",
    accent: "#EA580C",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "WeMap-GL"],
    metrics: [
      { value: "100%", label: "단독 개발·배포 총괄", sub: "기획·개발·파이프라인 전담" },
      { value: "−70%", label: "타임아웃 오류 감소", sub: "커스텀 훅 + 3단계 폴백 시스템" },
      { value: "<0.3%", label: "이동 거리 오차율", sub: "Haversine 공식 도입" },
    ],
    images: [],
    details: [
      {
        icon: "🛠",
        title: "1. 낯선 현지 기술 빠른 습득 및 라이브러리 직접 패칭",
        paragraphs: [
          "[러닝 커브 극복] 베트남 로컬 지도 SDK 'WeMap-GL' 교육을 이수하고, 현지 연구원들과 교류하며 단기간 내에 지도 기반 프로덕트를 성공적으로 기획·개발했습니다.",
          "[Patching] 지도 이동 시 라이브러리 내부에서 발생하는 URL 변경 및 타입(Type) 충돌 오류를 분석하고, 제공받은 wemap-gl 라이브러리 내부 코드를 직접 수정하여 호환성 문제를 적극적으로 해결했습니다.",
        ],
        image: dietnamLib,
        imageCaption: "WeMap-GL 기반 서비스 화면",
      },
      {
        icon: "☁️",
        title: "2. Supabase 기반 서버리스 아키텍처 구축",
        paragraphs: [
          "[Context] 짧은 프로젝트 기간과 백엔드 부재라는 제약 조건 하에서 Supabase를 도입했습니다.",
          "[Solution] Next.js와 연계한 실시간 데이터 동기화를 구현하고 사용자별 데이터 격리(RLS, Row-Level Security) 정책을 세팅. 배포 파이프라인(Vercel)까지 단독 총괄했습니다.",
        ],
      },
      {
        icon: "📍",
        title: "3. GPS 기반 실시간 고정밀 위치 추적 및 경로 렌더링",
        paragraphs: [
          "[Problem 1: 위치 추적 신뢰성 저하] 기본 Geolocation API 사용 시 타임아웃 오류가 빈번하고, 특히 실내 환경에서 50m 이상의 심각한 위치 오차가 발생하여 서비스 신뢰도가 하락했습니다.",
          "[Solution 1] enableHighAccuracy: true 옵션 및 10초 타임아웃 설정. 15초 샘플링 주기의 1m 단위 고정밀 위치 추적 커스텀 훅을 개발하고, 3단계 에러 폴백 시스템 적용 → 실외 환경 오차 3m 이내, 타임아웃 오류 70% 감소.",
          "[Problem 2: 경로 및 오차 반경 시각화 왜곡] 평면 좌표계 기반 연산으로 인해 원형 오차 범위가 왜곡되고, 단순 직선 거리 근사식으로 인해 실제 이동 거리 계산에 오차가 발생했습니다.",
          "[Solution 2] 지구의 곡률을 고려한 구면 삼각법 적용 → 5m 미만 오차의 정확한 원형 오차 반경 렌더링. Haversine 공식 도입 → 이동 거리 계산 오차율 0.3% 미만 달성. 상대적 위치 변화량 기반 이동 방향 판별 로직 수정 → 화살표 역전 현상 완벽 해결.",
        ],
        image: dietnamGps,
        imageCaption: "GPS 경로 추적 및 렌더링",
      },
    ],
  },
];

export { CODE_EDA, CODE_BEFORE, CODE_AFTER, PROJECTS };
