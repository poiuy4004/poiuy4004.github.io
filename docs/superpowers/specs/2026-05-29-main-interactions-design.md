# /main Interaction Layer — Cinematic Interactions Across the Portfolio

**Date**: 2026-05-29
**Scope**: `/main` page only (gated portfolio). The `/` gate already has its cinematic interactions (see `2026-05-29-home-gate-interactions-design.md`).
**Tone**: Cinematic — carry the gate's purple, ambient, film-like feel into the whole portfolio, kept cohesive (not a pile of unrelated gadgets).

---

## 1. Goals

`/main`의 모든 섹션에 다양한 인터랙션을 입혀, 정적인 인상을 게이트와 통일된 영화적·앰비언트 경험으로 바꾼다. 기존 미니멀·보라 톤과 레이아웃은 유지한다.

사용자 승인 범위 (2026-05-29 brainstorm):
- 네 가지 인터랙션 묶음 **전부** 포함: ① 스크롤 등장(토대) ② 네비게이션 감각 ③ 히어로 & 데이터 시각화 ④ 택타일 마이크로
- 톤: 시네마틱 (게이트와 통일)
- 구현: 재사용 프리미티브 (`useInView` 훅 + `Reveal` 래퍼 + `index.css` 유틸 + 전용 데이터시각화 컴포넌트)
- **추가 의존성 없음** (순수 CSS keyframes + 최소 React). 사용자 표준 원칙: 가능하면 외부 라이브러리 없이.

---

## 2. Architecture

### 2.1 라이브러리

추가 의존성 없음. 순수 CSS keyframes + 최소 React state/hooks (IntersectionObserver, matchMedia, Clipboard API, requestAnimationFrame — 모두 브라우저 내장).

이유:
- 게이트에서 이미 순수 CSS 패턴이 확립됨 → 일관성
- IntersectionObserver/matchMedia로 스크롤·접근성 처리가 단순하고 전 브라우저 지원
- framer-motion / GSAP / AOS 등은 과잉이며 표준 원칙(외부 라이브러리 지양)에 어긋남
- CSS 스크롤 구동 애니메이션(`animation-timeline`)은 2026년 초 Safari/Firefox 지원 불완전 → 채택하지 않음(필요 시 `@supports`로만 점진 덧붙임 가능, 본 스펙 범위 밖)

### 2.2 새 파일

**훅 (`src/main/hooks/`)**

| 파일 | 역할 | 인터페이스 |
|---|---|---|
| `useInView.ts` | 요소가 뷰포트에 들어오면 `true`. 최초 1회 노출 후 unobserve | `useInView<T extends Element>(options?: { rootMargin?: string; threshold?: number; once?: boolean }) => { ref: RefCallback<T>; inView: boolean }` |
| `useReducedMotion.ts` | `prefers-reduced-motion: reduce` 구독 | `useReducedMotion() => boolean` |
| `useScrollSpy.ts` | 주어진 섹션 id 배열 중 현재 화면에 보이는 id 반환 | `useScrollSpy(ids: string[], options?) => string \| null` |
| `usePointerTilt.ts` | 데스크탑 카드 3D 틸트/sheen용 포인터 추적 (hover+fine 전용, rAF 배칭) | `usePointerTilt(options?) => { ref, onMouseMove, onMouseLeave, style }` (정확한 형태는 구현 시 확정) |

**컴포넌트 (`src/main/components/`)**

| 파일 | 역할 |
|---|---|
| `Reveal.tsx` | 자식을 감싸 뷰포트 진입 시 fade+rise. `delay`(ms)로 stagger, `as` prop 지원. 내부에서 `useInView` 사용 |
| `ScrollProgress.tsx` | 상단 고정 보라 진행 바 (스크롤 % = width). `fixed top-0 z-50`, `aria-hidden` |
| `BackToTop.tsx` | 히어로를 지나면 나타나는 "맨 위로" 버튼. 클릭 시 최상단 스크롤 |
| `CountUp.tsx` | 뷰포트 진입 시 선두 숫자 0→N 카운트, 접미사 보존. reduced-motion 시 즉시 최종값 |
| `SkillMeter.tsx` | 레벨 채움 바. 진입 시 0→비율 애니메이션 |

### 2.3 수정 파일

| 파일 | 변경 |
|---|---|
| `src/index.css` | reveal 변형·meter-fill·timeline-draw·nav-underline·progress·sheen·pulse 키프레임/유틸 + 단일 reduced-motion 블록 추가 |
| `src/main/Main.tsx` | `ScrollProgress`, `BackToTop` 마운트, scrollspy 배선 (Header에 active id 전달) |
| `src/components/Header.tsx` | scrollspy 기반 active 네비 하이라이트(슬라이딩 밑줄 + `aria-current`), 스크롤 시 그림자 강조 |
| `src/main/containers/Intro.tsx` | 메시 배경 + 요소 stagger 등장, StatBlock 카운트업 배선 |
| `src/main/containers/About.tsx` | 카드 stagger reveal |
| `src/main/containers/Strengths.tsx` | 카드 stagger reveal |
| `src/main/containers/Skills.tsx` | 카드 reveal + SkillMeter 적용 |
| `src/main/containers/Career.tsx` | 타임라인 그려짐 연출 배선 |
| `src/main/containers/Projects.tsx` | 카드 stagger reveal |
| `src/main/containers/Contact.tsx` | ContactItem reveal + 복사 피드백 |
| `src/main/components/Section.tsx` | 헤더 reveal 옵션 내장 |
| `src/main/components/Card.tsx` | hover 리프트+보라 글로우, 선택적 포인터 틸트/sheen |
| `src/main/components/ProjectCard.tsx` / `ValueCard.tsx` / `TestimonialCard.tsx` | Card 기반 hover/틸트 전파 |
| `src/main/components/StatBlock.tsx` | `CountUp` 사용 |
| `src/main/components/SkillBadge.tsx` | `SkillMeter` 추가 (기존 dot+label 유지) |
| `src/main/components/TimelineItem.tsx` | 세로선 scaleY 그려짐 + current 점 pulse |
| `src/main/components/ContactItem.tsx` | 클릭 복사(Clipboard API) + "복사됨" 트랜션트 피드백, hover 리프트 |

### 2.4 레벨 → 비율 매핑 (SkillMeter)

```
expert       → 100%
advanced     → 75%
intermediate → 50%
familiar     → 25%
```

색: expert/advanced/intermediate는 보라 계열(`bg-purple-500/400/300`), familiar는 중립(`bg-neutral-400`). 기존 `LEVEL_STYLE` dot 색과 통일.

---

## 3. Interaction Details

### 3.1 스크롤 등장 (토대)

- `Reveal`이 `useInView`(rootMargin 하단 여유 `0px 0px -10% 0px`, threshold ~0.1, once)로 진입 감지
- 진입 시 `opacity 0 → 1` + `translateY(16px → 0)`, ~600ms cubic-bezier(0.25,0.4,0.25,1)
- 그리드(About/Strengths/Skills/Projects 카드 목록): 각 항목 index 기반 `delay = index * 80ms` (상한 ~400ms)로 순차 등장
- `Section` 헤더(eyebrow/title/description)는 자체 reveal
- 한 번 노출되면 다시 숨기지 않음(once)

### 3.2 네비게이션 감각

- **Scrollspy**: `useScrollSpy(["intro","about","strengths","skills","career","projects","contact"])`로 현재 섹션 추적. Header 네비의 해당 항목에 보라 밑줄(슬라이딩) + `aria-current="true"`
- **스크롤 진행 바**: `ScrollProgress` — `scrollY / (scrollHeight - innerHeight)` 비율로 상단 바 width. rAF 배칭, passive scroll 리스너
- **Smooth anchor 스크롤**: `html { scroll-behavior: smooth }` (reduced-motion 시 auto). 기존 `scroll-mt-20` 유지
- **Header 그림자**: 스크롤 > 8px이면 `shadow` 추가(기존 backdrop-blur 유지)
- **BackToTop**: 히어로 높이(또는 `scrollY > innerHeight`) 지나면 fade-in, 클릭 시 `window.scrollTo({ top: 0 })`(reduced-motion 고려). `aria-label` 포함

### 3.3 히어로 & 데이터 시각화

**Intro**
- 게이트 `MeshBackground`와 통일된 은은한 메시(섹션 한정, `absolute inset-0 -z-10`, 더 옅게). 파티클은 생략하거나 최소화(히어로 한정)
- 요소 stagger 등장: tag → name → tagline → summary → stats → CTAs (게이트 진입 stagger와 동일 결)
- 이름(보라) 선택적 은은한 글로우

**StatBlock 카운트업**
- `CountUp`: 진입 시 선두 정수 토큰을 0→N, ~1000ms ease-out, 나머지 문자열(접미사/한글) 보존
  - 예: `"5+"` → 0→5 후 `+`; `"4년 10개월"` → 첫 숫자 `4`만 카운트하고 `년 10개월` 보존; `"3"` → 0→3
- reduced-motion 시 최종값 즉시 표시

**Skills 레벨 미터**
- 각 SkillBadge에 얇은 바 추가, 진입 시 0→매핑 비율로 채움(transform: scaleX 또는 width), 그룹 내 stagger
- 기존 dot+label 그대로 유지

**Career 타임라인**
- 세로 연결선: `transform: scaleY(0 → 1)`, `transform-origin: top`, 리스트가 뷰에 들어오면 위→아래로 그려짐(~800ms)
- current 점: 은은한 pulse(보라 ring 확산 반복)

### 3.4 택타일 마이크로

- **카드 hover**: `Card` 기본에 hover 시 `translateY(-4px)` + 보라 틴트 그림자/글로우(기존 `hover:shadow-md` 강화)
- **포인터 틸트 + sheen**(데스크탑, `hover: hover and pointer: fine` 전용): `usePointerTilt`로 커서 위치 기반 미세 3D 회전(±6deg 내) + 빛 번짐(sheen) 오버레이. 터치/리듀스드모션 시 비활성
- **태그·링크**: hover 색/미세 scale 전환 통일·강화(기존 transition 활용)
- **ThemeToggle**: 아이콘 전환 트랜지션 추가(기존 동작 유지)
- **Contact 복사**: `ContactItem`의 email/phone 클릭 시 `navigator.clipboard.writeText` + "복사됨" 트랜션트 표시(~1.5s 후 원복). 기존 mailto/tel 링크는 유지하되 복사 보조 동작 추가(접근성: 버튼+aria-live)

### 3.5 진입 연속성

게이트 성공 전환 → `/main`은 이미 `animate-fade-in`(흰 배경 fade)로 연결됨(게이트 스펙 Task 8). 본 스펙은 그 위에 Intro 메시+stagger가 이어지도록 한다.

---

## 4. CSS Keyframes / Utilities (in `src/index.css`)

게이트 블록에 이어 새 블록 추가:

```css
@keyframes reveal-rise     { /* opacity 0→1 + translateY 16px→0 */ }
@keyframes meter-fill      { /* scaleX 0→1 (transform-origin left) */ }
@keyframes timeline-draw   { /* scaleY 0→1 (transform-origin top) */ }
@keyframes dot-pulse       { /* box-shadow ring 확산 반복 */ }
@keyframes sheen-sweep     { /* (선택) 카드 sheen */ }
```

유틸: `.animate-reveal-rise`, `.animate-meter-fill`, `.animate-timeline-draw`, `.animate-dot-pulse`, 네비 밑줄/진행 바 관련 클래스. 게이트와 동일하게 `index.css`에 직접 선언(tailwind.config 의존 없음).

reveal/stagger는 인라인 `animationDelay`로 제어.

---

## 5. Accessibility & Performance (불변 원칙)

### 5.1 `prefers-reduced-motion: reduce`

단일 `@media (prefers-reduced-motion: reduce)` 블록(게이트 블록과 병합 또는 인접)으로 일괄 처리:

| 요소 | 일반 | 감소 모드 |
|---|---|---|
| 스크롤 등장 | fade+rise stagger | 즉시 표시(또는 200ms opacity) |
| 카운트업 | 0→N | 최종값 즉시 |
| 스킬 미터 | 채움 애니메이션 | 즉시 최종 비율 |
| 타임라인 그려짐 | scaleY draw | 즉시 전체 선 |
| current 점 pulse | 반복 | 정적 |
| 카드 틸트/sheen | 표시 | 비활성 |
| 메시 배경 | drift | 정적 |
| smooth scroll | smooth | auto |
| 진행 바·scrollspy·복사 | 유지(기능) | 유지(모션만 제거) |

JS 모션(카운트업·틸트)은 `useReducedMotion()`으로 분기.

### 5.2 성능

- 모든 reveal은 `once: true` → 1회 후 unobserve
- scroll 리스너는 passive + rAF 배칭(진행 바, header 그림자)
- 포인터 틸트/sheen은 데스크탑 전용, rAF 배칭, `will-change` 적절히
- transform/opacity 위주(레이아웃 reflow 회피)

### 5.3 Semantic / ARIA

- 장식 요소(메시, sheen, 진행 바, 미터 바, 타임라인 선) `aria-hidden`
- 네비 active: `aria-current`
- BackToTop: `aria-label`
- Contact 복사: 버튼 역할 + `aria-live="polite"`로 "복사됨" 안내
- 기존 시맨틱 구조(section/article/time/address 등) 보존

---

## 6. Z-index Layering (/main)

```
z-50: ScrollProgress (상단 바), BackToTop
z-40: Header (sticky, 기존)
z-10/z-0: 섹션 콘텐츠
-z-10: Intro 메시 배경
```

기존 Header `z-40` 유지, 새 상단 바/버튼만 `z-50`.

---

## 7. Edge Cases

| 케이스 | 처리 |
|---|---|
| 카운트업 대상이 숫자로 시작 안 함 | 선두 숫자 토큰 없으면 카운트 생략, 원문 그대로 |
| 빠른 스크롤로 여러 섹션 동시 진입 | once 옵션으로 각자 1회만, scrollspy는 최상단 가시 섹션 우선 |
| 터치 기기 | 틸트/sheen/마우스 글로우류 비활성(hover+fine 체크) |
| Clipboard API 미지원/권한 거부 | try/catch, 실패 시 기존 mailto/tel 링크로 폴백, 피드백은 표시 안 함 |
| 짧은 뷰포트에서 BackToTop | `scrollY > innerHeight` 임계로 과도 노출 방지 |
| reduced-motion 토글 변화 | matchMedia 구독으로 런타임 반영(가능 범위) |
| SSR/hydration | CSR 전용(Vite) — 무관 |

---

## 8. Testing / Verification

자동화 테스트 셋업 없음 → 수동 + 도구 검증:

1. **타입체크**: `npx tsc -b` 통과
2. **린트**: `npx eslint src/` 통과
3. **빌드**: `npx vite build` 성공
4. **시각 검증**: Playwright(**msedge 채널**, Chrome 설치 금지) 또는 `npm run dev` 수동
   - 스크롤하며 각 섹션 stagger 등장
   - Header active 네비 슬라이딩, 상단 진행 바, BackToTop
   - Intro 카운트업, Skills 미터 채움, Career 타임라인 그려짐
   - 카드 hover 리프트/틸트(데스크탑)
   - Contact 복사 → "복사됨"
   - `prefers-reduced-motion: reduce`에서 모션 비활성, 기능 유지
   - 모바일 뷰포트에서 틸트 없음·레이아웃 정상
   - 콘솔 에러 0

---

## 9. Out of Scope

- 게이트(`/`) 인터랙션 — 이미 완료(별도 스펙)
- 전역 페이지 전환 시스템(게이트→/main 외)
- 사운드 / haptic
- 데이터(profile/skills/career) 내용 변경 — 인터랙션만 추가
- 다국어 / 카피 변경
- CSS 스크롤 구동 애니메이션(`animation-timeline`) 본격 도입 — 브라우저 지원 이슈로 제외

---

## 10. Open Questions

없음. 모든 항목 사용자 승인됨 (2026-05-29 brainstorm 세션). 톤=시네마틱, 4개 묶음 전부, 구현=재사용 프리미티브.
