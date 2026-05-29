type ValueItem = {
  title: string;
  points: string[];
};

export const values: ValueItem[] = [
  {
    title: "준비된 개발자",
    points: [
      "상대방의 니즈를 파악하고, 말하기 전에 미리 준비합니다.",
      "부족한 점을 스스로 깨닫고, 지적을 받기 전에 스스로 고쳐 나갑니다.",
    ],
  },
  {
    title: "포기하지 않는 노력파",
    points: [
      "실패는 성공의 어머니라는 말을 믿습니다.",
      "노력과 시간은 배신하지 않는다는 말을 믿습니다.",
    ],
  },
];

type Testimonial = {
  quote: string;
  author: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "멘토링 하면서 만난 분들 중 가장 깔끔하게 코드를 작성하셨습니다. 가독성이 좋은 코드를 위해 코드의 구조를 상세하게 분석하고, 코드 컨벤션을 지키기 위해 노력하신 것 같습니다.",
    author: "부트캠프 멘토",
  },
  {
    quote: "끊임없이 자기발전을 위해 공부하시는 모습이 좋았습니다.",
    author: "부트캠프 동기",
  },
  {
    quote:
      "저희 조가 순항할 수 있었던 데에는 용민님이 프론트엔드 파트의 한 축을 담당하시면서 요구 사항을 더 나은 방향으로 발전시켜 진행했던 것이 중요했다고 생각합니다.",
    author: "부트캠프 동기",
  },
  {
    quote:
      "문제 해결 과정에서 적극적인 자세로 끝까지 해결해 나가는 모습이 멋졌습니다.",
    author: "부트캠프 동기",
  },
];

export const competencies: string[] = [
  "AtoZ 1인 개발(기획→디자인→FE→BE→배포→SEO) 경험으로 다른 포지션과 원활하게 소통합니다.",
  "외주, 사이드 프로젝트를 포함한 다양한 협업 환경을 경험했습니다.",
  "Next.js, React, Angular, JSP 등 다양한 프레임워크 경험을 보유했습니다.",
  "Styled-Components, Tailwind CSS 등 스타일링 라이브러리 활용 경험이 풍부합니다.",
  "Storybook을 활용한 통일성 있는 UI 시스템 구성이 가능합니다.",
  "AWS, Vercel, CAFE24 등 배포 환경에 구애받지 않습니다.",
  "다양한 AI 도구를 활용해 언어·프레임워크·라이브러리에 유연하게 대응합니다.",
  "FTP를 통한 운영 단계 유지보수가 가능합니다.",
  "Google Search Console·Naver Search Advisor를 통한 SEO 작업을 직접 수행합니다.",
  "Google Play Console·App Store Connect를 통한 앱 등록·배포 경험이 있습니다.",
];
