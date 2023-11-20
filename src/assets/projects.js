import nutritionCodersMainImage from "../assets/nutritionCoders/main.png"
import stackOverflowImage from "../assets/stackOverflow/StackOverflow.png"
import goldenCityImage from "../assets/goldenCity/main.png"

const projects = [
  {
    title: "Nutrition Coders",
    mainImg: nutritionCodersMainImage,
    description: "바쁘다 바빠 현대사회!\n하지만…\n아무리 바빠도\n내 건강은 내가 챙겨야만 하니까!\n\n나만의, 나로 인한, 나만을 위한\n식단관리!\n\n오직 나만을 위한\n개인 맞춤형 식단관리 프로그램!\n‘뉴트리션 코더스’",
    detailDescription: "나의 식단에 대한 평가는 물론,\nAI에게 식단추천도 받고,\n다른 이들과의 식단을 공유할 수 있는\n커뮤니티를 구축하였습니다.",
    stack: ["React", "AWS", "OAuth", "Zustand", "Axios", "Styled-components", "Big-calendar"],
    part:
`1. 계정 관리
- 신규 회원가입 및 로그인 페이지 구현
- OAuth 로그인 페이지 구현
2. AWS S3 버킷관리
- 패치파일 업데이트
- 불필요 파일 정리/삭제
3. 데이터 흐름 정리
- 프론트엔드 데이터 흐름 파악
- 백엔드 ERD 테이블 피드백
- Postman API 헤더,바디 및 쿼리 피드백
4. 기획 및 디자인
- Figma 디자인 페이지 협업
- 기획을 구체화하여 화면정의서 작성
5. 상태관리
- Zustand를 통한 상태관리 진행
- store 폴더로 상태관리 페이지 통합
6. index.html 관리
`,
    github: "https://github.com/codestates-seb/seb45_main_002",
    demo: "http://nutrients-coders.com"
  },
  {
    title: "StackOverflow",
    mainImg: stackOverflowImage,
    description: "개발자들의 지식인\n\n전 세계 모든 개발자들의\n질문에 답해주는\n개발자들의 보물창고\n\nStackOverflow\n(copy)",
    detailDescription: "협업과정을 배우기 위하여 첫번째 프로젝트는 StackOverflow를 클론코딩하는 작업이 되었습니다.",
    stack: ["React", "AWS", "OAuth", "Redux", "Axios", "Styled-components", "MySQL", "JAVA", "JWT"],
    part:
`1. AWS S3 + github-Action CI/CD
  - yaml 파일을 통한 CI/CD 작성
  - 특정 브랜치에 push할 시에, 자동 S3 빌드파일 업로드 설정
2. 기획 결정
  - 구현할 페이지와 그렇지 않은 페이지 구분
  - 페이지와 버튼들의 흐름 파악
3. 상태관리
  - Redux를 통한 상태관리 진행
  - store 폴더로 상태관리 페이지 통합
4. index.html 관리`,
    github: "https://github.com/codestates-seb/seb45_pre_031",
    demo: "http://se-sof.s3-website.ap-northeast-2.amazonaws.com"
  },
  {
    title: "Golden City",
    mainImg: goldenCityImage,
    description: "역사의 중심, 경주!\n\n혹시 지금\n경주여행을\n준비중이신가요?\n\n금빛도시 경주",
    detailDescription: "공공데이터포털(https://www.data.go.kr/)을\n사용해보기 위해,\n경주관광정보를 활용한\n간단한 여행팁 입니다.",
    stack: ["React", "Axios", "Styled-components"],
    part: "솔로 프로젝트 (1인 개발)",
    github: "https://github.com/poiuy4004/goldencity",
    demo: "https://poiuy4004.github.io/goldencity/"
  },
  {
    title: "New Project",
    mainImg: "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13212923&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOS8yMS9DTFMxMDAwNC8xMzIxMjkyM19XUlQyMDE5MTAwOF8x&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004",
    description: "세상에 유익한,\n기분좋은 한 걸음을\n다시 한 번 걸어나가고 있습니다.",
    detailDescription: "새로운 프로젝트에 대한 정보를 공개할 순 없지만,\n계속하여 프로젝트를 진행중입니다.",
    stack: ["많은","기대","관심","부탁드립니다."],
    part: "작업중입니다.",
    github: "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13212923&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOS8yMS9DTFMxMDAwNC8xMzIxMjkyM19XUlQyMDE5MTAwOF8x&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004",
    demo: "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13212923&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOS8yMS9DTFMxMDAwNC8xMzIxMjkyM19XUlQyMDE5MTAwOF8x&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
  },
]
export default projects;