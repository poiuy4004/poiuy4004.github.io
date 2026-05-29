export type CareerItem = {
  company: string;
  position: string;
  employmentType: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  stack: string[];
};

export const careers: CareerItem[] = [
  {
    company: "에이전트에이아이랩스",
    position: "Frontend Developer",
    employmentType: "정규직",
    period: "2026.04 — 재직 중",
    current: true,
    description:
      "법률 상담 서비스, 블록체인 기반 Payment·PG, 그리고 그룹사 홈페이지 등 신규 프로덕트의 프론트엔드를 담당하고 있습니다.",
    achievements: [
      "사토시홀딩스 그룹사 홈페이지 개발 (FIBER, DroneHUB 등 자회사 소개 페이지 포함)",
      "법률 상담 전문 서비스의 프론트엔드 구조 설계 및 구현 진행",
      "블록체인 Payment·PG 프로젝트 프론트엔드 구현 진행",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
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
