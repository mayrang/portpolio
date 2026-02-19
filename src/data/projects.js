import IMGS from './images.js';
import sometimeScreen1 from '../assets/image/sometime/image.png';
import sometimeScreen2 from '../assets/image/sometime/image-2.png';
import sometimeEdaArch from '../assets/image/sometime/image-3.png';
import moingDesign from '../assets/image/moing/image-4.png';
import moingMap1 from '../assets/image/moing/image-5.png';
import moingMap2 from '../assets/image/moing/image-6.png';
import moingCalendar from '../assets/image/moing/image-7.png';
import moingAuth1 from '../assets/image/moing/image-8.png';
import moingAuth2 from '../assets/image/moing/image-9.png';
import moingFilter1 from '../assets/image/moing/image-10.png';
import moingFilter2 from '../assets/image/moing/image-11.png';
import dietnamLib from '../assets/image/dietnam/image-12.png';
import dietnamGps from '../assets/image/dietnam/image-13.png';

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
    sub: "지역 기반 대학생 인증 및 매칭 플랫폼 · https://some-in-univ.com/",
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
          "[Hypothesis: 이탈의 원인은 '복잡함'과 '모호함'] Amplitude 퍼널 분석 결과, 회원가입 단계에서 90% 이상의 이탈이 발생하는 것을 확인. 두 가지 가설을 수립했습니다: ① PASS 본인 인증의 피로감 — 복잡한 인증 절차가 높은 진입 장벽으로 작용 ② 지역 선택의 모호함 — '거주지'/'학교 위치' 선택 시 인지적 부하(Cognitive Load) 발생.",
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
    tags: ["React", "TypeScript", "TanStack Query", "Storybook", "Emotion", "Axios"],
    metrics: [
      { value: "Design", label: "Storybook 디자인 시스템", sub: "컴포넌트 표준화·모듈화" },
      { value: "Dual Map", label: "국내·해외 지도", sub: "Kakao × Google API 동적 분기" },
      { value: "Custom", label: "캘린더 자체 개발", sub: "라이브러리 미의존 확장 설계" },
    ],
    images: [],
    details: [
      {
        icon: "🎨",
        title: "1. Storybook 기반 디자인 시스템 구축 (DX 개선)",
        paragraphs: [
          "[Problem] 파편화된 UI 컴포넌트로 인해 디자인-개발 간 소통 비용 증가 및 개발 생산성 저하.",
          "[Solution & Result] Storybook과 Emotion(CSS-in-JS)을 결합하여 UI 컴포넌트를 표준화·모듈화. 독립적인 환경에서 재사용 가능한 디자인 시스템을 구축하여 팀원 간 UI 의존성을 낮추고 프론트엔드 개발 속도를 대폭 향상시켰습니다.",
        ],
        image: moingDesign,
        imageCaption: "Storybook 디자인 시스템",
      },
      {
        icon: "🗺",
        title: "2. 국내/해외 동적 지도 렌더링 및 다중 좌표 시각화",
        paragraphs: [
          "[Problem] 여행 서비스 특성상 국내외 지역을 모두 커버해야 하며, 사용자가 등록한 여러 일정을 한눈에 파악하기 어려움.",
          "[Solution & Result] 카카오 지도 API(국내)와 구글 지도 API(해외)를 주소 기반으로 동적 분기 처리. 각 일정의 좌표를 바탕으로 지도에 순서대로 선을 연결하는 UI를 구현하여 여행 동선을 직관적으로 시각화했습니다.",
        ],
        images: [moingMap1, moingMap2],
        imageCaption: "국내/해외 지도 렌더링",
      },
      {
        icon: "🗓",
        title: "3. 확장성을 고려한 커스텀 캘린더 자체 개발",
        paragraphs: [
          "[Problem] 기존 캘린더 라이브러리는 디자인 커스터마이징이 제한적이며, 여행 서비스 특성에 맞는 유연한 확장이 어려움.",
          "[Solution & Result] 라이브러리에 의존하지 않고 시작일/종료일 선택 및 확장이 유연한 커스텀 캘린더를 직접 개발. 서비스 톤앤매너를 유지하면서 확장성을 확보했습니다.",
        ],
        image: moingCalendar,
        imageCaption: "커스텀 캘린더",
      },
      {
        icon: "🔐",
        title: "4. 매끄러운 인증 플로우 및 동적 폼 유효성 검사",
        paragraphs: [
          "[Problem] 회원가입 및 로그인 과정에서의 불편함이 유저 이탈로 이어질 수 있음.",
          "[Solution & Result] 소셜 로그인(네이버·카카오·구글) 통합 및 Zod 스키마를 활용한 실시간 동적 폼 유효성 검사 적용. 특히 6자리 인증 코드 입력 시 useRef를 활용해 숫자 패드 지원, 붙여넣기 시 자동 분할, 백스페이스 포커스 이동 등 엣지 케이스를 완벽히 제어하여 사용자 피로도를 최소화했습니다.",
        ],
        images: [moingAuth1, moingAuth2],
        imageCaption: "인증 플로우 및 폼 유효성 검사",
      },
      {
        icon: "🔍",
        title: "5. 무한 스크롤 및 다중 필터 검색 최적화",
        paragraphs: [
          "[Problem] 다량의 동행 모집 글과 복잡한 검색 조건(장소·인원·기간·스타일 등)을 효율적으로 처리해야 함.",
          "[Solution & Result] useInfiniteScroll과 Intersection Observer를 조합해 페이지네이션을 최적화. 아코디언 방식의 다중 필터링 시스템을 구축하고, 선택된 필터 수에 따라 태그 라벨이 자동 변환되는 UI를 제공하여 탐색 경험을 개선했습니다.",
        ],
        images: [moingFilter1, moingFilter2],
        imageCaption: "다중 필터 검색",
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
