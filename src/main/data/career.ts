type CareerLink = {
  label: string;
  href: string;
};

export type CareerItem = {
  company: string;
  position: string;
  employmentType: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  stack: string[];
  links?: CareerLink[];
};

export const careers: CareerItem[] = [
  {
    company: "위플로우",
    position: "CTO",
    employmentType: "계약직",
    period: "2026.06 — 재직 중",
    current: true,
    description:
      "스타트업 위플로우의 출발을 함께하며 공식 홈페이지 제작을 맡았습니다. 상담 신청까지 자연스럽게 이어지는 CTA 흐름을 설계하고, 관리자 기능·배포·기획·디자인을 전반적으로 담당했습니다.",
    achievements: [
      "NextAuth 기반 관리자 페이지·비밀번호 인증 구현",
      "Vercel·GitHub 연동 배포 및 환경 변수 관리",
      "고객 응답 폼 저장과 상태 관리를 위한 어드민 페이지 구축",
      "상담 신청을 유도하는 CTA 기획과 브랜드 로고에 맞춘 디자인 전반 진행",
      "제작한 홈페이지를 공식 사이트로 운영 중",
    ],
    stack: ["Next.js", "TypeScript", "NextAuth", "Vercel"],
    links: [{ label: "Website", href: "https://weflow-web-task.vercel.app" }],
  },
  {
    company: "더퍼스트에듀",
    position: "Frontend Developer",
    employmentType: "프리랜서",
    period: "2026.06",
    description:
      "문서 작성이 익숙하지 않은 현장·기술직 등 다양한 직종 종사자를 위한 직무기술서 작성 보조 사이트 ʻ주도적 직무설계'를 개발했습니다.",
    achievements: [
      "ClaudeAI로 문서 형식에 맞춘 출력을 유도하는 AI 설계 (상담 기록·모범 사례 기반 학습)",
      "Upstash Redis(REST)를 순수 fetch로 연동해 외부 라이브러리 없이 DB 구현",
      "회원 문서 작성·계정 관리를 위한 관리자 페이지 개발",
      "무분별한 사용을 막는 기획과 블루프린트 톤·격자 스타일 디자인 적용",
      "상담사를 통한 내담자 학습 과정에 활용 중",
    ],
    stack: ["Next.js", "TypeScript", "Upstash Redis", "ClaudeAI"],
    links: [
      { label: "Website", href: "https://job-description-kappa.vercel.app" },
    ],
  },
  {
    company: "에이전트에이아이랩스",
    position: "Frontend Developer",
    employmentType: "정규직",
    period: "2026.04 — 2026.06",
    description:
      "법률 상담 AI 서비스 Lawbot, 블록체인 기반 Payment·PG, 사토시홀딩스 그룹사 홈페이지 등 신규 프로덕트의 프론트엔드와 AI 설계를 담당했습니다.",
    achievements: [
      "법률 상담 AI 서비스 ʻLawbot' 개발 — 판례·법령 기반 RAG와 파인튜닝으로 전문 상담 챗봇 구현",
      "구글·카카오·네이버 OAuth 소셜 로그인과 신규 회원가입·로그인 구현",
      "국가법령정보센터·법제처·케이스노트 등 API·크롤링으로 판례를 수집해 파인튜닝·RAG 구성",
      "판례·AI 튜닝용 DB 설계·마이그레이션과 S3 버킷 패치·정리 운영",
      "사토시홀딩스 그룹사(FIBER·DroneHUB 등) 홈페이지 개발 및 AWS 배포·도메인 연결 (05/15 상한가 달성)",
      "블록체인 기반 Payment·PG 프로젝트 프론트엔드 진행",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OAuth",
      "AWS S3",
      "ClaudeAI",
    ],
    links: [
      { label: "Lawbot", href: "https://lawbot.xyz" },
      { label: "사토시홀딩스", href: "https://satoshi.holdings" },
    ],
  },
  {
    company: "캘러스컴퍼니",
    position: "Vibe Coder (Frontend Developer)",
    employmentType: "정규직",
    period: "2026.03",
    description:
      "주력 사업인 스프린트 프로그램 준비 기간 동안 외주 개발을 통한 매출에 기여했습니다. Claude·Gemini 등 AI 도구를 적극 활용하면서도 결과물은 가독성 좋은 코드로 다듬어 인도했습니다.",
    achievements: [
      "Audition Me 앱(Android · iOS 동시)을 React Native로 개발",
      "AI 생성 코드의 구조를 정리해 유지보수 가능한 형태로 재구성",
      "기획·디자인 공백을 보완하며 이전 경험을 기반으로 잠재 버그·UX 이슈 사전 수정",
      "캘러스컴퍼니 메인 사업 시작을 위한 초기 자본 확보에 기여",
    ],
    stack: ["React Native", "TypeScript", "Claude", "Gemini"],
  },
  {
    company: "한국통번역주식회사",
    position: "Frontend Developer",
    employmentType: "계약직",
    period: "2025.04 — 2025.08",
    description:
      "팀원과 협업하여 진행한 첫 프로젝트로, 효과적인 협업 방식의 중요성과 다양한 개발 환경을 익혔습니다. 계약·견적부터 와이어프레임, 풀스택 개발, SEO까지 폭넓게 담당했습니다.",
    achievements: [
      "Next.js 풀스택(프론트엔드 + API)으로 홈페이지 리뉴얼",
      "PostgreSQL 데이터 저장 구조 신규 설계 및 적용",
      "CAFE24 파일 전송 프로토콜과 FileZilla 운영 흐름 정착",
      "프로젝트 매출 약 600만 원 발생",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "CAFE24"],
  },
  {
    company: "케이잡스",
    position: "Frontend Developer",
    employmentType: "정규직",
    period: "2024.04 — 2025.08",
    description:
      "글로벌 인재채용 플랫폼·취업 지원 앱·기업 홈페이지 리뉴얼·정부 위탁 앱(아미잡) 등 다양한 영역을 동시에 운영하며, 프론트엔드를 중심으로 백엔드·인프라·SEO까지 폭넓게 다뤘습니다.",
    achievements: [
      "ʻ커리어 커넥트' 앱·웹 개발 및 AI 커리어 설계 알고리즘 구축",
      "ʻ케이잡스링크' 글로벌 채용 플랫폼 신규 구축 (TailwindCSS 신규 도입)",
      "케이잡스 본사 홈페이지 리뉴얼 (Google Maps Platform 도입)",
      "ʻ아미잡' 국방전직교육원 앱 출시 (설치 1만 건 돌파, 내부 주요 사업으로 선정)",
      "AI 프롬프트 설계와 한고원 API 파인튜닝으로 결과 품질 개선",
    ],
    stack: [
      "React",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Styled-Components",
      "AWS",
    ],
  },
  {
    company: "더퍼스트에듀",
    position: "Frontend Developer",
    employmentType: "프리랜서",
    period: "2023.12 — 2024.03",
    description:
      "기획·디자인·프론트엔드·백엔드·배포·SEO까지 1인으로 전담한 첫 프로젝트입니다. 협업과 출시 전 과정의 어려움을 직접 겪으며 ʻ사용자 관점의 마무리'에 대한 기준을 세웠습니다.",
    achievements: [
      "Figma 기반 와이어프레임/디자인부터 직접 진행",
      "AWS EC2·RDS·S3·CloudFront·LoadBalancing을 활용한 운영 환경 구성",
      "Google Search Console·Naver Search Advisor 기반 SEO 작업",
      "2025년 직업소개소 사업자 허가 자료로 활용된 홈페이지로 현재까지 운영 중",
    ],
    stack: ["React", "AWS", "MySQL", "Figma"],
  },
];
