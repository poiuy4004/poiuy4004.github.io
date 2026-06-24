export type SkillLevel = "expert" | "advanced" | "intermediate" | "familiar";

type Skill = {
  name: string;
  level: SkillLevel;
};

type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "프로덕션에서 매일 사용하는 언어들",
    skills: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Java", level: "expert" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    description: "웹·앱 출시까지 실제로 진행해 본 프레임워크",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "React Native", level: "expert" },
      { name: "Spring Framework", level: "expert" },
      { name: "Flutter", level: "familiar" },
    ],
  },
  {
    title: "Styling & UI",
    description: "디자인 시스템과 컴포넌트 단위 스타일링",
    skills: [
      { name: "Tailwind CSS", level: "expert" },
      { name: "Styled-Components", level: "expert" },
      { name: "Storybook", level: "expert" },
      { name: "Figma", level: "expert" },
    ],
  },
  {
    title: "Backend · Auth · Database",
    description: "프론트 외에도 운영을 위해 직접 다뤄 본 영역",
    skills: [
      { name: "Next.js API Routes", level: "expert" },
      { name: "NextAuth", level: "expert" },
      { name: "OAuth (Google · Kakao · Naver)", level: "expert" },
      { name: "Upstash Redis (REST)", level: "expert" },
      { name: "MySQL", level: "expert" },
      { name: "PostgreSQL", level: "expert" },
    ],
  },
  {
    title: "Cloud · Infra · Publishing",
    description: "배포·운영·앱 출시를 위한 환경",
    skills: [
      {
        name: "AWS (EC2 · RDS · S3 · CloudFront · LoadBalancing)",
        level: "expert",
      },
      { name: "Vercel", level: "expert" },
      { name: "CAFE24 · FTP (FileZilla)", level: "intermediate" },
      { name: "Git / GitHub", level: "expert" },
      { name: "Google Play Console", level: "advanced" },
      { name: "App Store Connect", level: "expert" },
    ],
  },
  {
    title: "SEO · AI · Media",
    description: "검색 최적화, AI 활용·튜닝, 자체 리소스 제작",
    skills: [
      { name: "Google Search Console", level: "expert" },
      { name: "Naver Search Advisor", level: "expert" },
      { name: "Google Maps Platform", level: "expert" },
      { name: "Claude · Gemini", level: "expert" },
      { name: "Prompt Engineering", level: "expert" },
      { name: "RAG", level: "expert" },
      { name: "Fine-tuning", level: "expert" },
      { name: "웹 크롤링 (판례·데이터 수집)", level: "expert" },
      { name: "Adobe Photoshop · Premiere", level: "expert" },
    ],
  },
];
