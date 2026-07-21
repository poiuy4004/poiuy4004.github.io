# poiuy4004.github.io

장용민(Yongmin Jang)의 개인 포트폴리오. React 19 + TypeScript + Vite + Tailwind CSS v4로 만들었고, GitHub Actions로 GitHub Pages에 배포합니다.

**https://poiuy4004.github.io**

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입체크 + 프로덕션 빌드 (dist/)
npm run lint     # ESLint
npm test         # Node 내장 테스트 러너
npm run preview  # 빌드 결과 미리보기
```

Node 24 이상이 필요합니다. 테스트는 Node의 네이티브 타입 스트리핑을 사용하므로 별도 테스트 프레임워크를 설치하지 않습니다.

## 구조

```
index.html              메타·OG·테마 선반영 스크립트 (JSON-LD는 빌드 시 주입)
src/
  main.tsx              엔트리
  App.tsx               포트폴리오 + 게이트 오버레이 합성
  index.css             전역 토큰, 애니메이션, 인쇄 스타일
  components/           페이지 공용 (Header, Footer, NavLink)
  home/                 이름 게이트 오버레이와 그 연출
  main/
    Main.tsx            포트폴리오 본문
    containers/         섹션 단위 (Intro, About, Skills, Career, ...)
    components/         재사용 UI (Card, Tag, Reveal, SkillMeter, ...)
    data/               콘텐츠 원본 — 내용 수정은 대부분 여기서
    hooks/              useInView, useTheme, useScrollSpy, ...
    auth/               게이트 상태와 이름 매칭
    utils/
```

### 콘텐츠 수정

경력·프로젝트·스킬 등 모든 텍스트는 `src/main/data/`에 있습니다. 컴포넌트를 고칠 필요 없이 데이터만 바꾸면 됩니다.

- `career.ts` — 경력 타임라인
- `projects.ts` — 프로젝트 카드
- `skills.ts` — 스킬 그룹과 숙련도
- `strengths.ts` — 가치관, 주변인 평가, 핵심 역량
- `profile.ts` — 이름·연락처·요약
- `stats.ts` — Intro 상단 지표 (위 데이터에서 자동 계산)

`structuredData.ts`는 같은 데이터로 JSON-LD를 만들고, `vite.config.ts`의 `structured-data` 플러그인이 빌드 시 `index.html`에 넣습니다. 구조화 데이터를 손으로 관리하지 않아도 됩니다.

## 설계 메모

**이름 게이트는 접근 제어가 아니라 연출입니다.** 포트폴리오 본문은 항상 DOM에 렌더되고 게이트는 그 위를 덮는 오버레이입니다. 검색엔진이 콘텐츠를 그대로 수집할 수 있어야 하기 때문입니다. 게이트가 열리기 전에는 본문에 `inert`가 걸려 키보드·스크린리더가 뒤로 새지 않습니다.

**단일 페이지입니다.** 라우터를 쓰지 않고, 알 수 없는 경로는 `main.tsx`에서 `/`로 정리합니다. GitHub Pages용 `404.html`은 빌드 시 `index.html`을 복사해 만듭니다.

**모션은 항상 `prefers-reduced-motion`을 존중합니다.** 새 애니메이션을 추가하면 `index.css`의 reduced-motion 블록에도 대응을 넣어 주세요.

## 배포

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 lint → test → build → Pages 배포를 실행합니다.
