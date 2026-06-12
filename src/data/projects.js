import IMGS from './images.js';
import sometimeScreen1 from '../assets/image/sometime/image.png';
import sometimeScreen2 from '../assets/image/sometime/image-2.png';
import sometimeEdaArch from '../assets/image/sometime/image-3.png';

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
];

export { CODE_EDA, CODE_BEFORE, CODE_AFTER, PROJECTS };
