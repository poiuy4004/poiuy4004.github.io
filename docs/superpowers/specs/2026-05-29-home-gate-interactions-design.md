# Home Gate — Cinematic Interactions ("Whispered Name")

**Date**: 2026-05-29
**Scope**: `/` (Home gate page) only. Other sections handled separately.
**Tone**: Cinematic. Concept C — ambient mesh + name ignites on success.

---

## 1. Goals

`/` 게이트 페이지에 6개의 인터랙션 순간을 추가해, 현재의 정적인 인상을 영화적·앰비언트한 분위기로 바꾼다. 기존 미니멀·보라 톤은 유지한다.

- 6개 순간: 진입 / 타이틀 등장 / 입력 중 / 오답 / 정답 / 전환
- 마우스 글로우 추가
- `prefers-reduced-motion` 완전 대응
- 모바일·터치 환경 자동 적응
- 추가 의존성 없음 (순수 CSS + React state)

---

## 2. Architecture

### 2.1 라이브러리

추가 의존성 없음. 순수 CSS keyframes + 최소 React state.

이유:
- 필요한 모션이 한 페이지에 한정 → framer-motion 30KB 도입은 과잉
- CSS 애니메이션의 GPU 가속과 `prefers-reduced-motion` 처리가 단순함
- 추후 전체 사이트 페이지 전환이 필요해지면 그때 도입

### 2.2 컴포넌트 구조

**새 파일 (3개)**:

| 파일 | 역할 |
|---|---|
| `src/home/MeshBackground.tsx` | 흐르는 메시 그라데이션 + 부유 파티클. `position:absolute inset-0`, `z-0` |
| `src/home/IgniteOverlay.tsx` | 정답 시 점화 → fade-to-white 오버레이. `position:fixed`, `z-50` |
| `src/home/MouseGlow.tsx` | 커서를 따라가는 보라 글로우. `position:fixed`, `z-30`, `pointer-events:none` |

**기존 파일 수정**:

| 파일 | 변경 |
|---|---|
| `src/home/Home.tsx` | phase state machine, 새 컴포넌트 마운트, 진입 stagger 클래스 |
| `src/home/NameGateForm.tsx` | `onMatch`/`onWrong` 콜백 props, ripple state, mask reveal wrapping |
| `src/main/Main.tsx` | `animate-fade-in` 클래스 추가 (전환 연속성) |
| `src/index.css` | 공통 keyframes 정의 |

### 2.3 Phase state machine (Home 내부)

```
entering → idle ⇄ typing
             ↓
           error  (1.2s 후 idle 복귀)
             ↓
        igniting (1.0s) → transitioning (200ms white hold) → navigate("/main")
```

State 모델:
```typescript
type Phase = "entering" | "idle" | "typing" | "error" | "igniting" | "transitioning";
```

- `entering` → mount 즉시, 1000ms 후 자동으로 `idle`로 전환
- `typing` → 입력 변화 감지 시 진입, 600ms 동안 입력 없으면 `idle`
- `error` → 오답 시 진입, 1200ms 후 `idle`
- `igniting` → 정답 시 진입, 1000ms 후 `transitioning`
- `transitioning` → 200ms 후 navigate

`error`와 `typing`은 ripple/shake 외 시각적으로 큰 차이 없음 (피드백용 transient state).

---

## 3. Interaction Details

### 3.1 진입 시퀀스 (0 → 1.0s)

| 시점 | 요소 | 효과 |
|---|---|---|
| 0ms | MeshBackground 마운트 | `mesh-drift` 무한 루프 시작 |
| 0ms | 파티클 12개 (모바일 6개) | 각자 다른 delay/duration으로 float-up |
| 200ms | "Welcome" eyebrow | fade + slide-up 8px (400ms) |
| 350ms | 타이틀 | mask reveal: `overflow:hidden` 컨테이너 내부 텍스트가 `translateY(100%) → translateY(0)`, cubic-bezier(0.25, 0.4, 0.25, 1), 700ms |
| 600ms | 설명 문구 | fade + slide-up |
| 800ms | NameGateForm | fade + slide-up |

구현: Tailwind `animation-delay` 인라인 스타일 또는 `style={{ animationDelay: "350ms" }}`. 각 요소는 `opacity-0`에서 시작해 `animate-rise` 적용.

### 3.2 Mesh Background (앰비언트, 무한)

- 3개의 큰 `radial-gradient` 원을 absolute로 좌상/우하/중앙 배치
- 각 원에 `@keyframes mesh-drift` 적용 — `translate(80px, -60px)`, `rotate(10deg)` 범위에서 천천히 이동
- 각 원마다 다른 duration (18s, 22s, 26s) → 비대칭적 흐름
- 라이트 모드: `bg-purple-300/15`, 다크 모드: `bg-purple-500/20`
- `blur-3xl` 처리로 부드러운 글로우

### 3.3 파티클 (앰비언트, 무한)

- 12개 1~3px `<span>`을 absolute 랜덤 좌표 (`Math.random()` 시드로 mount 시 1회 계산)
- 각 파티클: `@keyframes particle-float` — `translateY(-80vh)` + 미세 `translateX` 흔들림, opacity `0 → 0.4 → 0`
- duration 8~16s, delay 0~10s 무작위 분포
- 색: `bg-purple-400/30`
- 모바일에서 6개로 감량 (`window.innerWidth < 768` 체크 시 6개만 렌더)

### 3.4 입력 중 (타이핑 피드백)

- NameGateForm 내부에 `rippleId` state 유지
- 매 onChange마다 50ms throttle 적용 후 `setRippleId(id + 1)`
- 입력 박스의 **가운데 하단**(`bottom:0; left:50%; transform:translateX(-50%)`)에 ripple `<span>` 1개 렌더
- `key={rippleId}` 트릭으로 매번 재마운트 → 항상 1개만 DOM에 존재
- 효과: `scale(0) → scale(2.5)`, opacity `0.4 → 0`, 800ms ease-out
- 색: `bg-purple-400/40`
- 입력 박스 wrapper에 `position:relative` + `overflow:hidden` 추가

### 3.5 오답 피드백 (~800ms)

- 입력 박스 + 버튼 wrapper에 `animate-shake` 클래스 토글 (400ms 후 제거)
- shake keyframe: `translateX(-8px, +8px, -6px, +4px, -2px, 0)`
- 동시에 화면 전체 빨간 vignette flash:
  - 별도 `<div>` 오버레이 (`position:fixed inset-0 pointer-events-none z-20`)로 렌더
  - `error` phase일 때만 마운트, `key`로 매번 재마운트
  - 80ms fade-in → 600ms fade-out (총 680ms)
  - `radial-gradient(circle, transparent 30%, rgba(239,68,68,0.15) 100%)`
- 기존 에러 텍스트는 fade-in으로 등장 (기존 `min-h-5 text-sm` 유지 + opacity 토글)

### 3.6 정답 → 점화 → 전환 (~1.2s)

**1) Gather (0 → 200ms)**
- 버튼 내부 "rendered name" 글자에 보라 글로우 추가
- `text-shadow: 0 0 24px rgb(168 85 247 / 0.8)` transition 200ms

**2) Bloom (200ms → 1000ms)**
- IgniteOverlay 마운트
- 버튼 중심 좌표(`getBoundingClientRect`)에서 시작하는 `position:fixed` 원
- `width:24px, height:24px, border-radius:9999px`
- `transform: scale(0) → scale(70)`, color `purple-500 → white`
- opacity 1 유지
- 800ms ease-out

**3) Hold (1000ms → 1200ms)**
- 흰 화면 200ms 홀드

**4) Navigate (1200ms)**
- `navigate("/main")` 호출
- `transitioning` phase 진입 시 setTimeout(navigate, 1200) 등록
- unmount 시 cleanup

**5) `/main` 페이지 진입**
- `Main.tsx` 최상위에 `animate-fade-in` 클래스
- 0 opacity에서 시작 → 600ms fade-in
- 배경이 흰색이므로 이전 페이지 white와 연속

### 3.7 마우스 글로우

- `position:fixed`, 384×384px (`w-96 h-96`) — 큰 영역에 부드럽게 분산
- 보라 radial-gradient: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)`
- 글로우는 커서가 컨테이너 정중앙에 오도록 `transform: translate3d(calc(x - 50%), calc(y - 50%), 0)`
- `mix-blend-mode: screen` → 라이트 배경에서는 은은하게, 다크 배경에서는 밝게 자연 적응
- `pointer-events: none`
- 위치 갱신: `mousemove` → `requestAnimationFrame` 1회 → `transform: translate3d(x, y, 0)` 직접 갱신 (state X)
- 첫 mousemove 전엔 `visibility:hidden`
- 모바일·터치 환경에선 렌더하지 않음 (CSS `@media (hover: hover) and (pointer: fine)` 또는 JS에서 `window.matchMedia` 체크 후 mount)

---

## 4. CSS Keyframes (in `src/index.css`)

```css
@keyframes mesh-drift-1 { /* translate + rotate */ }
@keyframes mesh-drift-2 { /* 다른 path */ }
@keyframes mesh-drift-3 { /* 다른 path */ }
@keyframes particle-float { /* y: 0 → -80vh + x 흔들림 + opacity 0→0.4→0 */ }
@keyframes mask-reveal { /* translateY 100% → 0 */ }
@keyframes rise { /* opacity 0 → 1 + translateY 8px → 0 */ }
@keyframes ripple { /* scale 0 → 2.5, opacity 0.4 → 0 */ }
@keyframes shake { /* translateX 진동 */ }
@keyframes vignette-flash { /* opacity 0 → 1 → 0 */ }
@keyframes ignite-bloom { /* scale 0 → 70, color purple → white */ }
@keyframes fade-in { /* opacity 0 → 1 */ }
```

Tailwind 유틸 클래스로 노출: `animate-rise`, `animate-shake`, `animate-fade-in` 등은 `tailwind.config` 의존 없이 `index.css`에 직접 `.animate-rise { animation: rise 600ms ease-out forwards; }` 형태로 선언.

---

## 5. Accessibility

### 5.1 `prefers-reduced-motion: reduce` 대응

| 요소 | 일반 | 감소 모드 |
|---|---|---|
| Mesh drift | 20s 무한 이동 | 정적 그라데이션만 유지 |
| 파티클 | 12개 부유 | `display:none` |
| 마우스 글로우 | 표시 | `display:none` |
| 타이틀 mask reveal | 700ms reveal | 200ms opacity fade |
| 진입 stagger | 0~800ms | 즉시 표시 + 200ms fade |
| 입력 잔물결 | scale 애니메이션 | 비활성 |
| Shake | 400ms 흔들림 | 입력 박스 border 200ms 적색 highlight |
| Vignette flash | 적색 깜빡임 | 비활성 |
| Bloom (ignite) | 1.2s 점화 시퀀스 | 200ms white fade로 즉시 전환 |
| 에러 텍스트 | 유지 (피드백 필수) | 유지 |

`index.css`에 단일 `@media (prefers-reduced-motion: reduce)` 블록으로 모두 처리.

### 5.2 Semantic / ARIA

- 기존 `role="status" aria-live="polite"` 에러 메시지 유지
- 새 데코 요소는 모두 `aria-hidden="true"` (MeshBackground, 파티클, MouseGlow, IgniteOverlay)
- 포커스 트랩 불필요 (단일 input)
- 키보드 사용자: 시각적 모션과 무관하게 정상 동작

---

## 6. Z-index Layering

```
z-50: IgniteOverlay (성공 시 마운트)
z-40: ThemeToggle (기존)
z-30: MouseGlow (pointer-events:none, mix-blend-mode:screen)
z-20: 컨텐츠 (타이틀, 폼)
z-0:  MeshBackground + 파티클
```

---

## 7. Edge Cases

| 케이스 | 처리 |
|---|---|
| 연타 입력 (ripple 폭주) | 50ms throttle, `key={rippleId}` 재마운트로 DOM 1개만 잔존 |
| 점화 중 unmount | `setTimeout` ref를 `useEffect` cleanup에서 `clearTimeout` |
| 다크모드 토글 중 애니메이션 | mesh/particle 색을 Tailwind `dark:` 클래스로 정의 → 자연 cross-fade |
| 공백 입력·다른 이름 | 기존 trim 후 비교 로직 그대로, 버튼 disabled |
| 뒤로가기로 재진입 | `entering` phase 매번 mount 시점부터 시작 (동일 경험) |
| gate가 이미 열려있는데 Home 재방문 | 현재 로직 그대로 — 게이트 다시 보임. 자동 redirect는 별도 결정 |
| SSR/hydration | 본 프로젝트는 CSR 전용 (Vite). 문제 없음 |
| 파티클 좌표 SSR 불일치 | CSR 전용이라 무관. 안전하게 `useEffect` 내부 생성도 가능 |

---

## 8. Testing / Verification

자동화된 테스트 셋업이 없으므로 수동 검증 위주:

1. **타입체크**: `npx tsc -b` 통과
2. **린트**: `npx eslint src/` 통과
3. **빌드**: `npx vite build` 성공
4. **수동 시나리오** (`npm run dev` 후 `/` 에서):
   - 페이지 로드 → 1초 안에 모든 요소가 stagger로 등장하는가
   - 마우스를 움직이면 보라 글로우가 따라오는가 (데스크탑)
   - 타이핑할 때마다 잔물결이 보이는가
   - 잘못된 이름 → shake + 적색 vignette 깜빡임 발생
   - 정답 이름 → 점화 → white wipe → `/main`이 흰 배경에서 fade-in
   - `prefers-reduced-motion` ON 상태로 OS 설정 후 재로딩 → 모션 거의 없음
   - 모바일 뷰포트로 축소 → 마우스 글로우 없음, 파티클 6개

---

## 9. Out of Scope

- 다른 섹션(Intro, About, Career 등)의 인터랙션 — 별도 spec
- 페이지 간 글로벌 전환 시스템 (Home → /main 외)
- 사운드 / haptic feedback
- 게이트 통과 후 자동 redirect 로직 변경
- 키보드 단축키 (예: Enter로 제출 — 이미 form submit으로 동작)

---

## 10. Open Questions

없음. 모든 항목 사용자 승인됨 (2026-05-29 brainstorm 세션).
