# CLAUDE.md

장용민 개인 포트폴리오. React 19 + TypeScript(strict) + Vite + Tailwind CSS v4, GitHub Pages 배포.

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm test         # node --test (Node 24 타입 스트리핑)
```

작업을 끝내기 전에 `npm run lint`, `npm test`, `npm run build`를 모두 통과시킬 것.

## 반드시 지킬 것

**외부 라이브러리를 추가하지 않는다.** 런타임 의존성은 react, react-dom, tailwindcss뿐이다. 라우팅·상태관리·애니메이션·테스트 모두 표준 기능으로 구현되어 있다(각각 단일 페이지, `useSyncExternalStore`, CSS 애니메이션, `node:test`). 새 의존성이 꼭 필요하다고 판단되면 먼저 물어볼 것.

**게이트는 보안 장치가 아니다.** `src/home/`의 이름 게이트는 연출이다. 포트폴리오 본문(`Main`)은 항상 렌더되어야 하고 게이트가 그 위를 덮는다. 크롤러가 콘텐츠를 읽을 수 있어야 하므로, 게이트 통과 전에 본문을 `display:none`이나 조건부 렌더로 감추지 말 것. 감추는 수단은 `inert` + `aria-hidden`이다.

**콘텐츠는 `src/main/data/`에만 둔다.** 컴포넌트에 문자열을 하드코딩하지 말 것. Intro 상단 지표는 `stats.ts`가 career·projects에서 계산하고, JSON-LD는 `structuredData.ts`가 같은 데이터로 만들어 빌드 시 주입한다.

**모션에는 항상 reduced-motion 대응을 넣는다.** `index.css` 하단의 `@media (prefers-reduced-motion: reduce)` 블록에 새 애니메이션을 추가할 것. 스크롤 동작을 JS 인라인 스타일로 덮어쓰면 이 대응이 무력화되므로 하지 말 것.

**인쇄를 고려한다.** 장식 요소에는 `print:hidden`을 붙인다. 채용 담당자가 PDF로 저장한다.

## 컨벤션

- 문자열은 큰따옴표, 세미콜론 사용 (`vite.config.ts` 포함 전체 동일).
- 함수·상수가 2곳 이상에서 쓰이거나 50줄을 넘으면 별도 파일로 분리한다.
- `src/main/containers/`는 섹션 단위, `src/main/components/`는 재사용 UI.
- 상대 임포트는 확장자를 생략하되, **`node:test`로 테스트하는 모듈과 그 의존성은 `.ts` 확장자를 명시한다** (Node ESM이 확장자를 요구함). 현재 `auth/ownerName.ts`, `data/stats.ts`가 여기 해당.
- 테스트는 대상 파일 옆에 `*.test.ts`로 둔다. `tsconfig.app.json`에서 제외되고 `tsconfig.test.json`이 담당한다.
- 색상 강조는 purple 계열. 라이트 모드 본문 텍스트는 `neutral-500` 이상, 강조는 `purple-600` 이상을 쓸 것(`neutral-400`/`purple-500`은 흰 배경에서 WCAG AA 미달).

## 콘텐츠 관련 주의

경력 연차 문자열(`profile.yearsOfExperience`), 경력 기간 데이터, "05/15 상한가 달성" 문구, 전화번호 노출은 **의도된 상태다. 임의로 수정하지 말 것.**
