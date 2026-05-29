type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    title: "사토시홀딩스 그룹사 홈페이지",
    company: "에이전트에이아이랩스",
    period: "2026.04",
    role: "Frontend",
    summary:
      "AI로 혁신을 이끌고 있는 FIBER, DroneHUB 등 자회사를 포함한 사토시홀딩스 그룹사 홈페이지를 개발했습니다.",
    highlights: [
      "그룹사·자회사 소개 페이지 구조 설계",
      "재사용 가능한 섹션 컴포넌트 단위로 페이지 구성",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Website", href: "https://satoshi.holdings/" }],
  },
  {
    title: "Audition Me — Dance Tournament",
    company: "캘러스컴퍼니",
    period: "2026.03",
    role: "Frontend (RN), AI 협업 개발",
    summary:
      "댄스 토너먼트 플랫폼 ʻAudition Me'의 Android·iOS 앱을 React Native로 동시 개발했습니다. Claude·Gemini를 활용해 개발 속도를 끌어올리되, AI 결과물의 구조와 가독성을 직접 정리했습니다.",
    highlights: [
      "AI 협업으로 빠른 출시 속도 확보",
      "AI 생성 코드의 컨벤션·가독성 재정비",
      "기획·디자인 보완 및 UX 사전 점검",
    ],
    stack: ["React Native", "TypeScript", "Claude", "Gemini"],
    links: [
      { label: "Website", href: "https://www.audition-me.com/" },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.auditionmev2.app&pcampaignid=web_share",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/audition-me-dance-tournament/id1629825845",
      },
    ],
  },
  {
    title: "커리어 커넥트 (Konnect)",
    company: "케이잡스",
    period: "2025.04 — 2025.08",
    role: "Frontend, AI 알고리즘 설계",
    summary:
      "ClaudeAI를 활용해 취업 대상 연령과 목적에 최적화된 커리어 설계 알고리즘을 탑재한 앱·웹 서비스 ʻ커리어 커넥트'를 제작했습니다.",
    highlights: [
      "신규 회원가입·로그인 등 계정 관리 구현",
      "한고원 API 활용 파인튜닝으로 AI 결과의 편향 최소화",
      "AWS S3 버킷의 패치 파일 관리·정리 운영",
      "백엔드 ERD·Postman API 구조 피드백을 통한 데이터 흐름 정리",
      "대학교 교양과목 채택으로 매출 5,000만 원 달성",
    ],
    stack: ["React Native", "TypeScript", "ClaudeAI", "AWS S3"],
    links: [
      { label: "Website", href: "https://konnect.careers/" },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.kjobslink&pcampaignid=web_share",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/kr/app/ai-%EC%BB%A4%EB%A6%AC%EC%96%B4%ED%94%8C%EB%9E%98%EB%84%88-konnect/id6747299878",
      },
    ],
  },
  {
    title: "케이잡스링크 (글로벌 인재채용 플랫폼)",
    company: "케이잡스",
    period: "2025.01 — 2025.04",
    role: "Frontend 전반",
    summary:
      "해외 인력 수출·수입을 위한 글로벌 인재채용 플랫폼 ʻ케이잡스링크'의 개발 전반을 담당했습니다. 기존 Styled-Components 위주의 스타일링에 Tailwind CSS를 도입해 효율성을 끌어올렸습니다.",
    highlights: [
      "Tailwind CSS 신규 도입 및 적용 분석을 위한 별도 학습·도입 과정 운영",
      "계정 관리·AWS S3 운영·SEO 등 전반 영역 담당",
      "백엔드 ERD·Postman API 구조 피드백 제공",
      "플랫폼을 활용한 사업 계획서 작성 및 사업 수주",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "AWS S3"],
    links: [{ label: "Website", href: "https://kjobslink.co.kr/" }],
  },
  {
    title: "케이잡스 홈페이지 리뉴얼",
    company: "케이잡스",
    period: "2025.04 — 2025.08",
    role: "Frontend",
    summary:
      "본사 홈페이지 전반과 사무실 안내 지도·회사 소개·조직도 등 주요 컴포넌트의 리뉴얼을 진행했습니다. 글로벌 스탠다드 Google Maps Platform을 새로 도입했습니다.",
    highlights: [
      "Google Maps Platform 활용한 사무실 안내 지도 구현",
      "메인 페이지 팝업 이벤트(클릭·호버) 요소 적용",
      "회사 소개 페이지(인사말·미션·연혁·조직·협력기관) 전면 리뉴얼",
      "CAFE24 노후 파일 정리 및 패치 운영",
    ],
    stack: ["React", "Google Maps Platform", "CAFE24"],
    links: [{ label: "Website", href: "https://www.kjobs.co.kr/" }],
  },
  {
    title: "국방전직교육원 ʻ아미잡' 앱",
    company: "케이잡스",
    period: "2024.05 — 2024.07",
    role: "Frontend (RN), 백엔드, 배포",
    summary:
      "React Native로 국방전직교육원 앱을 개발하며 실무 첫 RN 출시 경험을 쌓았습니다. 기능 명세서 작성부터 배포까지 직접 진행했습니다.",
    highlights: [
      "MySQL 데이터 보관 구조 신규 설계",
      "S3 버킷을 통한 미디어 파일 저장 도입",
      "Vercel로 앱 등록용 랜딩 페이지 제작·배포",
      "Google Play Console·Play Store 정식 등록",
      "출시 후 설치 건수 1만 명 돌파, 국방전직교육원 주요 사업으로 선정",
    ],
    stack: ["React Native", "MySQL", "AWS S3", "Vercel"],
    links: [
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.armyjob&pcampaignid=web_share",
      },
    ],
  },
  {
    title: "한국통번역(KICAT) 홈페이지 리뉴얼",
    company: "한국통번역주식회사",
    period: "2025.04 — 2025.08",
    role: "팀 협업, 풀스택",
    summary:
      "팀원과 협업한 첫 프로젝트로, 계약·기획·디자인·풀스택 개발·SEO까지 전 과정을 함께 진행했습니다.",
    highlights: [
      "Next.js를 활용한 프론트엔드·백엔드 풀스택 구현",
      "PostgreSQL 데이터 저장 구조 신규 설계",
      "Admin 페이지에서 고객이 직접 운영 가능한 구조 설계",
      "프로젝트 매출 약 600만 원 발생",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "FileZilla"],
    links: [{ label: "Website", href: "https://www.kicat.co.kr/" }],
  },
  {
    title: "더퍼스트에듀 홈페이지",
    company: "더퍼스트에듀",
    period: "2023.11 — 2024.03",
    role: "AtoZ 1인 개발",
    summary:
      "기획·디자인·프론트·백·배포·SEO까지 1인으로 전담한 첫 프로젝트로, 초기 구상부터 출시 후 모니터링까지 모두 직접 진행했습니다.",
    highlights: [
      "Figma 기반 디자인·와이어프레임 설계",
      "AWS EC2·RDS·S3·CloudFront·LoadBalancing 운영 환경 구성",
      "MySQL 데이터 보관·S3 버킷 미디어 저장 구조 설계",
      "Google Search Console·Naver Search Advisor 기반 SEO 직접 운영",
      "2025년 직업소개소 사업자 허가 자료로 활용, 현재까지 운영 중",
    ],
    stack: ["React", "AWS", "MySQL", "Figma"],
    links: [{ label: "Website", href: "https://thefirstedu.net/" }],
  },
];
