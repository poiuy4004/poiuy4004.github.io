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
      { name: "Java", level: "familiar" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    description: "웹·앱 출시까지 실제로 진행해 본 프레임워크",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "advanced" },
      { name: "React Native", level: "advanced" },
      { name: "Flutter", level: "familiar" },
      { name: "Spring Framework", level: "familiar" },
    ],
  },
  {
    title: "Styling & UI",
    description: "디자인 시스템과 컴포넌트 단위 스타일링",
    skills: [
      { name: "Tailwind CSS", level: "advanced" },
      { name: "Styled-Components", level: "advanced" },
      { name: "Storybook", level: "intermediate" },
      { name: "Figma", level: "intermediate" },
    ],
  },
  {
    title: "Backend & Database",
    description: "프론트 외에도 운영을 위해 직접 다뤄 본 영역",
    skills: [
      { name: "Next.js API Routes", level: "advanced" },
      { name: "MySQL", level: "intermediate" },
      { name: "PostgreSQL", level: "intermediate" },
    ],
  },
  {
    title: "Cloud · Infra · Publishing",
    description: "배포·운영·앱 출시를 위한 환경",
    skills: [
      {
        name: "AWS (EC2 · RDS · S3 · CloudFront · LoadBalancing)",
        level: "advanced",
      },
      { name: "Vercel", level: "advanced" },
      { name: "CAFE24 · FTP (FileZilla)", level: "intermediate" },
      { name: "Git / GitHub", level: "expert" },
      { name: "Google Play Console", level: "advanced" },
      { name: "App Store Connect", level: "intermediate" },
    ],
  },
  {
    title: "SEO · AI · Media",
    description: "검색 최적화, AI 활용, 자체 리소스 제작",
    skills: [
      { name: "Google Search Console", level: "advanced" },
      { name: "Naver Search Advisor", level: "advanced" },
      { name: "Google Maps Platform", level: "intermediate" },
      { name: "Claude · Gemini", level: "advanced" },
      { name: "Prompt Engineering", level: "advanced" },
      { name: "Adobe Photoshop · Premiere", level: "intermediate" },
    ],
  },
];
