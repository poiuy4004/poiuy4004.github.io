# Home Gate Cinematic Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Concept C ("Whispered Name") cinematic interactions on the `/` gate page — ambient mesh background, particle drift, mouse glow, staggered entrance, input ripples, error shake/vignette, and a success ignite-to-white transition leading into `/main`.

**Architecture:** Pure CSS keyframes + minimal React state. A `Phase` state machine in `Home.tsx` orchestrates transitions; three new components (`MeshBackground`, `MouseGlow`, `IgniteOverlay`) provide the visual layers. No new npm dependencies.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS (v4 with `@import "tailwindcss"`), react-router-dom v7.

**Project constraints (important for executor):**
- **No test framework is set up.** Verification uses TypeScript build (`npx tsc -b`), ESLint (`npx eslint`), and manual browser checks via `npm run dev`. The user prefers Playwright with `msedge` channel if browser automation is needed.
- **Not a git repository.** Skip `git commit` steps — use **checkpoint** verification instead (tsc + eslint pass, manual check).
- Tailwind v4 in this project uses `@import "tailwindcss"` in `src/index.css` (no separate tailwind.config). Custom keyframes/utilities go directly in `index.css`.

---

## File Structure

**New files:**
- `src/home/MeshBackground.tsx` — Ambient mesh gradient + floating particle layer (`absolute inset-0`, `z-0`, `aria-hidden`)
- `src/home/MouseGlow.tsx` — Cursor-following purple glow (`fixed`, `z-30`, `pointer-events-none`, desktop only)
- `src/home/IgniteOverlay.tsx` — Success-state expanding bloom + white hold (`fixed`, `z-50`)

**Modified files:**
- `src/index.css` — Append CSS keyframes, animation utility classes, and `prefers-reduced-motion` overrides
- `src/home/Home.tsx` — Add `Phase` state machine, mount new components, wrap content with stagger classes
- `src/home/NameGateForm.tsx` — Accept `onMatch`/`onWrong` callbacks, add input ripple, shake on error, ignite gather glow
- `src/main/Main.tsx` — Add `animate-fade-in` on root for continuity from `/`

---

## Task 1: CSS Foundation (Keyframes + Utility Classes)

**Files:**
- Modify: `src/index.css`

This task adds all the CSS infrastructure used by subsequent components. No visible change yet — but every later task references these classes.

- [ ] **Step 1: Append keyframes and utility classes to `src/index.css`**

Open `src/index.css` and append the following to the end of the file (after line 81):

```css

/* ====================================================
   Home gate cinematic interactions
   ==================================================== */

/* Ambient mesh drift (3 different paths for asymmetry) */
@keyframes mesh-drift-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(60px, -40px) rotate(8deg); }
}
@keyframes mesh-drift-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-50px, 50px) rotate(-6deg); }
}
@keyframes mesh-drift-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(40px, 30px) rotate(4deg); }
}

/* Particle floats upward with subtle x sway */
@keyframes particle-float {
  0%   { transform: translate(0, 0); opacity: 0; }
  10%  { opacity: 0.4; }
  50%  { transform: translate(12px, -40vh); }
  90%  { opacity: 0.4; }
  100% { transform: translate(-8px, -90vh); opacity: 0; }
}

/* Title text mask reveal */
@keyframes mask-reveal {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

/* Generic fade + slide-up for entrance */
@keyframes rise {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Input ripple */
@keyframes ripple {
  from { transform: translateX(-50%) scale(0); opacity: 0.4; }
  to   { transform: translateX(-50%) scale(2.5); opacity: 0; }
}

/* Error shake */
@keyframes shake {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-6px); }
  80%  { transform: translateX(4px); }
  100% { transform: translateX(0); }
}

/* Error vignette flash */
@keyframes vignette-flash {
  0%   { opacity: 0; }
  12%  { opacity: 1; }
  100% { opacity: 0; }
}

/* Success ignite bloom (translate keeps origin at button center) */
@keyframes ignite-bloom {
  0%   { transform: translate(-50%, -50%) scale(0);   background-color: rgb(168 85 247); }
  60%  {                                              background-color: rgb(168 85 247); }
  100% { transform: translate(-50%, -50%) scale(70);  background-color: rgb(255 255 255); }
}

/* Generic fade-in for /main entrance */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Utility classes */
.animate-rise          { animation: rise 600ms cubic-bezier(0.25, 0.4, 0.25, 1) forwards; opacity: 0; }
.animate-mask-reveal   { animation: mask-reveal 700ms cubic-bezier(0.25, 0.4, 0.25, 1) forwards; }
.animate-ripple        { animation: ripple 800ms ease-out forwards; }
.animate-shake         { animation: shake 400ms ease-out; }
.animate-vignette-flash{ animation: vignette-flash 680ms ease-out forwards; }
.animate-ignite-bloom  { animation: ignite-bloom 800ms ease-out forwards; }
.animate-fade-in       { animation: fade-in 600ms ease-out forwards; opacity: 0; }
.animate-mesh-1        { animation: mesh-drift-1 18s ease-in-out infinite; }
.animate-mesh-2        { animation: mesh-drift-2 22s ease-in-out infinite; }
.animate-mesh-3        { animation: mesh-drift-3 26s ease-in-out infinite; }
.animate-particle      { animation: particle-float linear infinite; }

/* Reduced motion overrides */
@media (prefers-reduced-motion: reduce) {
  .animate-rise,
  .animate-mask-reveal,
  .animate-fade-in {
    animation: fade-in 200ms ease-out forwards;
  }
  .animate-ripple,
  .animate-shake,
  .animate-vignette-flash,
  .animate-mesh-1,
  .animate-mesh-2,
  .animate-mesh-3,
  .animate-particle,
  .animate-ignite-bloom {
    animation: none;
  }
  .reduced-motion-hide { display: none !important; }
}
```

- [ ] **Step 2: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/index.css
```

Expected: both commands exit with no output (success). ESLint may skip `.css` files — if so, that's fine; only check for errors.

- [ ] **Step 3: Checkpoint**

The CSS is in place but no component uses it yet. Confirm:
- `src/index.css` ends with the new block
- `npx vite build` succeeds (run it once to be sure):

```
npx vite build
```

Expected: `✓ built in ...ms`. If there's any CSS parse error, fix it before moving on.

---

## Task 2: MeshBackground (Gradient Layer Only, No Particles)

**Files:**
- Create: `src/home/MeshBackground.tsx`
- Modify: `src/home/Home.tsx`

Start with just the 3 drifting gradient orbs. Particles come in Task 3.

- [ ] **Step 1: Create `src/home/MeshBackground.tsx`**

```tsx
export default function MeshBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-3xl animate-mesh-1 dark:bg-purple-500/25" />
      <div className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-purple-400/15 blur-3xl animate-mesh-2 dark:bg-purple-600/20" />
      <div className="absolute left-1/3 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl animate-mesh-3 dark:bg-purple-400/15" />
    </div>
  );
}
```

- [ ] **Step 2: Mount `MeshBackground` inside `Home.tsx`**

Open `src/home/Home.tsx`. Add import and mount as the first child of `<main>`:

```tsx
import ThemeToggle from "../main/components/ThemeToggle";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import MeshBackground from "./MeshBackground";
import NameGateForm from "./NameGateForm";

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
      <div className="absolute right-6 top-6 z-40">
        <ThemeToggle size="sm" />
      </div>
      <div className="relative z-20 w-full max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          정확한 이름을 입력해 주세요
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400">
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <NameGateForm expectedName={profile.name} />
      </div>
    </main>
  );
}
```

Key changes: added `overflow-hidden` to `<main>`, mounted `<MeshBackground />` first, added `z-40` to ThemeToggle, added `relative z-20` to the content wrapper.

- [ ] **Step 3: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/MeshBackground.tsx src/home/Home.tsx
```

Expected: both clean.

- [ ] **Step 4: Manual verification**

Run dev server:

```
npm run dev
```

Open the URL (Vite prints it, usually `http://localhost:5173/`). On the `/` page:
- ✅ Three soft purple gradient orbs visible behind the content
- ✅ Orbs drift slowly (watch for ~20s — should see subtle movement)
- ✅ Content (Welcome / title / form) is still clearly visible above the mesh
- ✅ Theme toggle (top right) is clickable; dark mode shows deeper purple orbs

Stop the dev server (Ctrl+C) when done.

- [ ] **Step 5: Checkpoint**

`MeshBackground` mounted. Move to particles.

---

## Task 3: Particles inside MeshBackground

**Files:**
- Modify: `src/home/MeshBackground.tsx`

Add 12 floating particles (6 on mobile). Use deterministic randomness at mount time so positions don't reshuffle on re-render.

- [ ] **Step 1: Replace `MeshBackground.tsx` with particle-enabled version**

```tsx
import { useMemo } from "react";

type Particle = {
  id: number;
  left: number; // 0 - 100 (vw %)
  size: number; // px
  duration: number; // s
  delay: number; // s
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 10,
  }));
}

export default function MeshBackground() {
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const particles = useMemo(
    () => generateParticles(isMobile ? 6 : 12),
    [isMobile],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-3xl animate-mesh-1 dark:bg-purple-500/25" />
      <div className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-purple-400/15 blur-3xl animate-mesh-2 dark:bg-purple-600/20" />
      <div className="absolute left-1/3 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl animate-mesh-3 dark:bg-purple-400/15" />

      <div className="reduced-motion-hide absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 block rounded-full bg-purple-400/40 animate-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
```

Notes:
- `reduced-motion-hide` class hides the entire particle layer when `prefers-reduced-motion: reduce`.
- Mesh orbs themselves continue to display (just without drift animation) per spec.

- [ ] **Step 2: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/MeshBackground.tsx
```

Expected: clean.

- [ ] **Step 3: Manual verification**

```
npm run dev
```

On `/`:
- ✅ Small purple dots float upward from the bottom of the page
- ✅ Each dot fades in, drifts up, fades out
- ✅ Resize browser to mobile width (<768px) and reload — should see fewer particles (6 instead of 12)
- ✅ Open DevTools → Rendering → Emulate CSS prefers-reduced-motion: `reduce` → particles disappear; mesh orbs stop animating

Stop dev server.

- [ ] **Step 4: Checkpoint**

Particles working. Move to entrance animations.

---

## Task 4: Entrance Stagger + Title Mask Reveal

**Files:**
- Modify: `src/home/Home.tsx`

Add the 4-step stagger: eyebrow (200ms) → title (350ms, mask reveal) → description (600ms) → form (800ms).

- [ ] **Step 1: Update `src/home/Home.tsx` with stagger classes and mask wrap**

```tsx
import ThemeToggle from "../main/components/ThemeToggle";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import MeshBackground from "./MeshBackground";
import NameGateForm from "./NameGateForm";

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
      <div className="absolute right-6 top-6 z-40">
        <ThemeToggle size="sm" />
      </div>
      <div className="relative z-20 w-full max-w-xl text-center">
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 animate-rise dark:text-neutral-500"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.15em" }}
          >
            <span
              className="inline-block animate-mask-reveal"
              style={{ animationDelay: "350ms", transform: "translateY(100%)" }}
            >
              정확한 이름을 입력해 주세요
            </span>
          </span>
        </h1>
        <p
          className="text-base text-neutral-500 animate-rise dark:text-neutral-400"
          style={{ animationDelay: "600ms" }}
        >
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <div className="animate-rise" style={{ animationDelay: "800ms" }}>
          <NameGateForm expectedName={profile.name} />
        </div>
      </div>
    </main>
  );
}
```

Key points:
- `animate-rise` starts with `opacity:0` (defined in Task 1 CSS) so elements stay hidden until their delay fires
- The `<h1>` uses a nested `overflow:hidden` wrapper for the mask reveal effect
- `paddingBottom: 0.15em` on the wrapper prevents Korean character descenders from being clipped
- Inline `transform: translateY(100%)` ensures the mask starts hidden even before the animation kicks in (prevents flash)

- [ ] **Step 2: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/Home.tsx
```

Expected: clean.

- [ ] **Step 3: Manual verification**

```
npm run dev
```

On `/` (refresh to see entrance):
- ✅ Page initially blank for ~200ms
- ✅ "Welcome" eyebrow fades in first
- ✅ Title slides up from below (mask reveal) at ~350ms
- ✅ Description fades in around 600ms
- ✅ Form fades in last around 800ms
- ✅ No flash of unstyled content
- ✅ DevTools → Rendering → Emulate reduced motion: all elements appear with a quick simple fade instead

Stop dev server.

- [ ] **Step 4: Checkpoint**

Entrance complete. Next: input ripples.

---

## Task 5: Input Ripple in NameGateForm

**Files:**
- Modify: `src/home/NameGateForm.tsx`

Add a single ripple element that re-mounts on each throttled keystroke via `key` trick.

- [ ] **Step 1: Update `src/home/NameGateForm.tsx`**

Replace the entire file with:

```tsx
import { useMemo, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { openGate } from "../main/auth/gate";

type NameGateFormProps = {
  expectedName: string;
};

const RIPPLE_THROTTLE_MS = 50;

export default function NameGateForm({ expectedName }: NameGateFormProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [rippleId, setRippleId] = useState(0);
  const lastRippleAtRef = useRef(0);

  const matched = useMemo(
    () => value.trim() === expectedName,
    [value, expectedName],
  );
  const rendered = value.trim() === "" ? `{포트폴리오 주인의 이름}` : value;

  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError(false);
    const now = Date.now();
    if (now - lastRippleAtRef.current >= RIPPLE_THROTTLE_MS) {
      lastRippleAtRef.current = now;
      setRippleId((id) => id + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matched) {
      setError(false);
      openGate();
      navigate("/main");
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
      <label className="sr-only" htmlFor="owner-name">
        포트폴리오 주인의 이름
      </label>
      <div className="relative overflow-hidden rounded-xl">
        <input
          id="owner-name"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="이름을 입력하세요"
          autoComplete="off"
          className="w-full rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-center text-lg text-neutral-900 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
        />
        {rippleId > 0 && (
          <span
            key={rippleId}
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-purple-400/40 animate-ripple"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={!matched}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
      >
        <span>
          <span
            className={
              matched
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-neutral-500 dark:text-neutral-400"
            }
          >
            {rendered}
          </span>
          <span>의 포트폴리오 보러가기</span>
        </span>
        <span
          aria-hidden
          className="transition-transform group-hover:enabled:translate-x-0.5"
        >
          →
        </span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${error ? "text-red-500" : "text-transparent"}`}
      >
        이름이 일치하지 않습니다. 다시 시도해 주세요.
      </p>
    </form>
  );
}
```

Changes summary:
- Added `rippleId` state + `lastRippleAtRef` for throttling
- Extracted `handleChange` to dispatch ripple on every (throttled) keystroke
- Wrapped `<input>` in a `relative overflow-hidden` div
- Rendered ripple `<span>` with `key={rippleId}` for re-mount-on-change

- [ ] **Step 2: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/NameGateForm.tsx
```

Expected: clean.

- [ ] **Step 3: Manual verification**

```
npm run dev
```

On `/`:
- ✅ Type a letter — a small purple ripple expands from the input's bottom-center
- ✅ Type rapidly — only one ripple at a time (re-spawns on each keystroke, throttled at 50ms)
- ✅ Ripple doesn't overflow the input (clipped by `overflow-hidden`)
- ✅ DevTools → Rendering → Emulate reduced motion: ripple still spawns but doesn't animate (just hidden / static)

Stop dev server.

- [ ] **Step 4: Checkpoint**

Ripple working. Next: phase state + error feedback.

---

## Task 6: Phase State Machine + Error Feedback

**Files:**
- Modify: `src/home/Home.tsx`
- Modify: `src/home/NameGateForm.tsx`

Lift control: `Home` owns `Phase`, `NameGateForm` reports events via callbacks. Add shake + vignette flash on error.

- [ ] **Step 1: Update `src/home/Home.tsx` with Phase state**

```tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../main/components/ThemeToggle";
import { openGate } from "../main/auth/gate";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import MeshBackground from "./MeshBackground";
import NameGateForm from "./NameGateForm";

type Phase = "entering" | "idle" | "error" | "igniting" | "transitioning";

const ERROR_RESET_MS = 1200;

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("entering");
  const [errorVersion, setErrorVersion] = useState(0);
  const errorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("idle"), 1000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const handleWrong = () => {
    setPhase("error");
    setErrorVersion((v) => v + 1);
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      errorTimeoutRef.current = null;
    }, ERROR_RESET_MS);
  };

  const handleMatch = () => {
    openGate();
    // Ignite + transition wiring lands in Task 8. For now, navigate immediately.
    navigate("/main");
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
      <div className="absolute right-6 top-6 z-40">
        <ThemeToggle size="sm" />
      </div>

      {phase === "error" && (
        <div
          key={errorVersion}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 animate-vignette-flash"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(239,68,68,0.15) 100%)",
          }}
        />
      )}

      <div className="relative z-20 w-full max-w-xl text-center">
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 animate-rise dark:text-neutral-500"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.15em" }}
          >
            <span
              className="inline-block animate-mask-reveal"
              style={{ animationDelay: "350ms", transform: "translateY(100%)" }}
            >
              정확한 이름을 입력해 주세요
            </span>
          </span>
        </h1>
        <p
          className="text-base text-neutral-500 animate-rise dark:text-neutral-400"
          style={{ animationDelay: "600ms" }}
        >
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <div className="animate-rise" style={{ animationDelay: "800ms" }}>
          <NameGateForm
            expectedName={profile.name}
            shake={phase === "error"}
            onMatch={handleMatch}
            onWrong={handleWrong}
          />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Update `src/home/NameGateForm.tsx` to accept callbacks and shake**

Replace the relevant sections (props type, defaults, handlers, root wrapper class):

```tsx
import { useMemo, useRef, useState, type FormEvent } from "react";
import { openGate } from "../main/auth/gate";

type NameGateFormProps = {
  expectedName: string;
  shake?: boolean;
  onMatch: () => void;
  onWrong: () => void;
};

const RIPPLE_THROTTLE_MS = 50;

export default function NameGateForm({
  expectedName,
  shake,
  onMatch,
  onWrong,
}: NameGateFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [rippleId, setRippleId] = useState(0);
  const lastRippleAtRef = useRef(0);

  const matched = useMemo(
    () => value.trim() === expectedName,
    [value, expectedName],
  );
  const rendered = value.trim() === "" ? `{포트폴리오 주인의 이름}` : value;

  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError(false);
    const now = Date.now();
    if (now - lastRippleAtRef.current >= RIPPLE_THROTTLE_MS) {
      lastRippleAtRef.current = now;
      setRippleId((id) => id + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matched) {
      setError(false);
      onMatch();
    } else {
      setError(true);
      onWrong();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 flex flex-col gap-4 ${shake ? "animate-shake" : ""}`}
    >
      <label className="sr-only" htmlFor="owner-name">
        포트폴리오 주인의 이름
      </label>
      <div className="relative overflow-hidden rounded-xl">
        <input
          id="owner-name"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="이름을 입력하세요"
          autoComplete="off"
          className="w-full rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-center text-lg text-neutral-900 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
        />
        {rippleId > 0 && (
          <span
            key={rippleId}
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-purple-400/40 animate-ripple"
          />
        )}
      </div>
      <button
        type="submit"
        disabled={!matched}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
      >
        <span>
          <span
            className={
              matched
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-neutral-500 dark:text-neutral-400"
            }
          >
            {rendered}
          </span>
          <span>의 포트폴리오 보러가기</span>
        </span>
        <span
          aria-hidden
          className="transition-transform group-hover:enabled:translate-x-0.5"
        >
          →
        </span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${error ? "text-red-500" : "text-transparent"}`}
      >
        이름이 일치하지 않습니다. 다시 시도해 주세요.
      </p>
    </form>
  );
}
```

Changes:
- Removed `useNavigate` import — parent handles navigation now
- Removed `openGate` call (actually keep import — wait, we removed the inline call but kept import). Remove the now-unused `openGate` import line if present.

Wait — re-check: `openGate` is no longer called here, the parent does it via `handleMatch`. So remove `import { openGate } from "../main/auth/gate";` from `NameGateForm.tsx`.

The form file should NOT import `openGate` anymore. Verify the final imports match what's shown above (only `useMemo, useRef, useState, type FormEvent` from react).

Actually the snippet above still shows `import { openGate } from "../main/auth/gate";` — remove that line. Use only:

```tsx
import { useMemo, useRef, useState, type FormEvent } from "react";
```

- [ ] **Step 3: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/Home.tsx src/home/NameGateForm.tsx
```

Expected: clean. If lint complains about unused `openGate` import in NameGateForm, remove the import.

- [ ] **Step 4: Manual verification**

```
npm run dev
```

On `/`:
- ✅ Type wrong name (e.g., "abc") → submit
- ✅ Form shakes left/right (~400ms)
- ✅ Subtle red vignette flashes (radial red glow from screen edges, ~680ms)
- ✅ Red error text fades in
- ✅ After ~1.2s, error state clears (try typing again — vignette doesn't re-trigger until next submit)
- ✅ Type correct name "장용민" → enter → navigates to `/main` immediately (ignite comes in Task 8)
- ✅ DevTools reduced motion: shake does nothing, vignette doesn't animate

Stop dev server.

- [ ] **Step 5: Checkpoint**

Phase state working. Error feedback complete.

---

## Task 7: MouseGlow Component

**Files:**
- Create: `src/home/MouseGlow.tsx`
- Modify: `src/home/Home.tsx`

Cursor-following purple glow, desktop-only, rAF-batched.

- [ ] **Step 1: Create `src/home/MouseGlow.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(supportsHover && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0) translate(-50%, -50%)`;
          }
          if (!visible) setVisible(true);
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-96 w-96 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
        mixBlendMode: "screen",
        visibility: visible ? "visible" : "hidden",
        willChange: "transform",
      }}
    />
  );
}
```

- [ ] **Step 2: Mount `MouseGlow` in `Home.tsx`**

Add the import and mount it just before the content wrapper (after the ThemeToggle wrapper):

```tsx
import MouseGlow from "./MouseGlow";
```

In the JSX, after `<MeshBackground />` and before the ThemeToggle div, or after the ThemeToggle — either works. Placing after MeshBackground keeps related decorative layers grouped:

```tsx
<MeshBackground />
<MouseGlow />
<div className="absolute right-6 top-6 z-40">
  <ThemeToggle size="sm" />
</div>
```

- [ ] **Step 3: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/MouseGlow.tsx src/home/Home.tsx
```

Expected: clean.

- [ ] **Step 4: Manual verification**

```
npm run dev
```

On `/` desktop:
- ✅ Move mouse → soft purple glow follows the cursor
- ✅ Glow blends naturally with the background (lighter on light, brighter on dark)
- ✅ Before first mousemove, no glow visible (no flash in top-left corner)
- ✅ Move rapidly — glow smoothly tracks via rAF (no stutter)
- ✅ DevTools → Toggle device toolbar (mobile emulation) → reload → no glow renders
- ✅ DevTools → Emulate reduced motion → no glow renders

Stop dev server.

- [ ] **Step 5: Checkpoint**

MouseGlow working. Next: success transition.

---

## Task 8: IgniteOverlay + Main.tsx Continuity

**Files:**
- Create: `src/home/IgniteOverlay.tsx`
- Modify: `src/home/Home.tsx`
- Modify: `src/main/Main.tsx`

Wire `igniting` → `transitioning` → navigate, with bloom animation centered on the submit button.

- [ ] **Step 1: Create `src/home/IgniteOverlay.tsx`**

```tsx
type IgniteOverlayProps = {
  originX: number;
  originY: number;
};

export default function IgniteOverlay({ originX, originY }: IgniteOverlayProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50 h-6 w-6 rounded-full animate-ignite-bloom"
      style={{
        left: originX,
        top: originY,
        willChange: "transform, background-color",
      }}
    />
  );
}
```

- [ ] **Step 2: Update `src/home/Home.tsx` — wire ignite phase**

Full file:

```tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../main/components/ThemeToggle";
import { openGate } from "../main/auth/gate";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import IgniteOverlay from "./IgniteOverlay";
import MeshBackground from "./MeshBackground";
import MouseGlow from "./MouseGlow";
import NameGateForm from "./NameGateForm";

type Phase = "entering" | "idle" | "error" | "igniting" | "transitioning";

const ERROR_RESET_MS = 1200;
const IGNITE_TO_NAVIGATE_MS = 1000;

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("entering");
  const [errorVersion, setErrorVersion] = useState(0);
  const [igniteOrigin, setIgniteOrigin] = useState<{ x: number; y: number } | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const igniteTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("idle"), 1000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
      igniteTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleWrong = () => {
    setPhase("error");
    setErrorVersion((v) => v + 1);
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      errorTimeoutRef.current = null;
    }, ERROR_RESET_MS);
  };

  const handleMatch = (origin: { x: number; y: number }) => {
    openGate();
    setIgniteOrigin(origin);
    setPhase("igniting");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = reduced ? 250 : IGNITE_TO_NAVIGATE_MS;
    const t = window.setTimeout(() => {
      setPhase("transitioning");
      const t2 = window.setTimeout(() => navigate("/main"), 200);
      igniteTimeoutsRef.current.push(t2);
    }, wait);
    igniteTimeoutsRef.current.push(t);
  };

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
      <MouseGlow />
      <div className="absolute right-6 top-6 z-40">
        <ThemeToggle size="sm" />
      </div>

      {phase === "error" && (
        <div
          key={errorVersion}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 animate-vignette-flash"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(239,68,68,0.15) 100%)",
          }}
        />
      )}

      {(phase === "igniting" || phase === "transitioning") && igniteOrigin && (
        <IgniteOverlay originX={igniteOrigin.x} originY={igniteOrigin.y} />
      )}

      <div className="relative z-20 w-full max-w-xl text-center">
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 animate-rise dark:text-neutral-500"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.15em" }}
          >
            <span
              className="inline-block animate-mask-reveal"
              style={{ animationDelay: "350ms", transform: "translateY(100%)" }}
            >
              정확한 이름을 입력해 주세요
            </span>
          </span>
        </h1>
        <p
          className="text-base text-neutral-500 animate-rise dark:text-neutral-400"
          style={{ animationDelay: "600ms" }}
        >
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <div className="animate-rise" style={{ animationDelay: "800ms" }}>
          <NameGateForm
            expectedName={profile.name}
            shake={phase === "error"}
            igniting={phase === "igniting" || phase === "transitioning"}
            onMatch={handleMatch}
            onWrong={handleWrong}
          />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Update `src/home/NameGateForm.tsx` to report origin and show gather glow**

Replace the file with:

```tsx
import { useMemo, useRef, useState, type FormEvent } from "react";

type NameGateFormProps = {
  expectedName: string;
  shake?: boolean;
  igniting?: boolean;
  onMatch: (origin: { x: number; y: number }) => void;
  onWrong: () => void;
};

const RIPPLE_THROTTLE_MS = 50;

export default function NameGateForm({
  expectedName,
  shake,
  igniting,
  onMatch,
  onWrong,
}: NameGateFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [rippleId, setRippleId] = useState(0);
  const lastRippleAtRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const matched = useMemo(
    () => value.trim() === expectedName,
    [value, expectedName],
  );
  const rendered = value.trim() === "" ? `{포트폴리오 주인의 이름}` : value;

  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError(false);
    const now = Date.now();
    if (now - lastRippleAtRef.current >= RIPPLE_THROTTLE_MS) {
      lastRippleAtRef.current = now;
      setRippleId((id) => id + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matched) {
      setError(false);
      const rect = buttonRef.current?.getBoundingClientRect();
      const origin = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      onMatch(origin);
    } else {
      setError(true);
      onWrong();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 flex flex-col gap-4 ${shake ? "animate-shake" : ""}`}
    >
      <label className="sr-only" htmlFor="owner-name">
        포트폴리오 주인의 이름
      </label>
      <div className="relative overflow-hidden rounded-xl">
        <input
          id="owner-name"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="이름을 입력하세요"
          autoComplete="off"
          disabled={igniting}
          className="w-full rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-center text-lg text-neutral-900 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
        />
        {rippleId > 0 && (
          <span
            key={rippleId}
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-purple-400/40 animate-ripple"
          />
        )}
      </div>
      <button
        ref={buttonRef}
        type="submit"
        disabled={!matched || igniting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
      >
        <span>
          <span
            className={
              matched
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-neutral-500 dark:text-neutral-400"
            }
            style={
              igniting
                ? { textShadow: "0 0 24px rgb(168 85 247 / 0.9)", transition: "text-shadow 200ms ease-out" }
                : undefined
            }
          >
            {rendered}
          </span>
          <span>의 포트폴리오 보러가기</span>
        </span>
        <span
          aria-hidden
          className="transition-transform group-hover:enabled:translate-x-0.5"
        >
          →
        </span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${error ? "text-red-500" : "text-transparent"}`}
      >
        이름이 일치하지 않습니다. 다시 시도해 주세요.
      </p>
    </form>
  );
}
```

- [ ] **Step 4: Update `src/main/Main.tsx` to fade in from white**

Replace the file with:

```tsx
import Footer from "../components/Footer";
import Header from "../components/Header";
import About from "./containers/About";
import Career from "./containers/Career";
import Contact from "./containers/Contact";
import Intro from "./containers/Intro";
import Projects from "./containers/Projects";
import Skills from "./containers/Skills";
import Strengths from "./containers/Strengths";
import { usePageMeta } from "./hooks/usePageMeta";

export default function Main() {
  usePageMeta({
    title: "장용민 — 4년 10개월 차 Developer 포트폴리오",
    description:
      "장용민의 경력, 프로젝트, 기술 스택, 가치관을 한 자리에 모은 포트폴리오. React·Next.js·React Native 기반 웹·앱 출시 경험과 AtoZ 1인 개발 사례를 확인할 수 있습니다.",
    canonicalPath: "/main",
  });

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white text-left animate-fade-in dark:bg-neutral-950">
      <Header />
      <main className="flex-1">
        <Intro />
        <About />
        <Strengths />
        <Skills />
        <Career />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

Only change: added `animate-fade-in` to the root div's class list.

- [ ] **Step 5: Type-check and lint**

```
npx tsc -b --pretty false
npx eslint src/home/IgniteOverlay.tsx src/home/Home.tsx src/home/NameGateForm.tsx src/main/Main.tsx
```

Expected: clean.

- [ ] **Step 6: Manual verification — full success flow**

```
npm run dev
```

On `/`:
- ✅ Type "장용민" exactly → press Enter
- ✅ Name in button glows purple briefly (gather, ~200ms)
- ✅ A small purple orb at the button center expands rapidly outward, fading from purple to white
- ✅ Screen turns fully white at the peak
- ✅ Navigates to `/main`
- ✅ `/main` fades in from white over ~600ms (no abrupt jump)
- ✅ Click browser back → returns to `/` and the entrance plays again
- ✅ DevTools reduced motion: success skips the bloom (just brief flash) and navigates within ~250ms

Stop dev server.

- [ ] **Step 7: Checkpoint**

Success transition complete. Move to final verification.

---

## Task 9: Final Cross-Cutting Verification

**Files:** No file changes. Verification only.

- [ ] **Step 1: Full TypeScript build**

```
npx tsc -b --pretty false
```

Expected: no output (clean).

- [ ] **Step 2: Full ESLint**

```
npx eslint src/
```

Expected: no output (clean).

- [ ] **Step 3: Production build**

```
npx vite build
```

Expected: `✓ built in ...ms`. CSS bundle should be larger than baseline by a few KB (new keyframes/utilities). No errors.

- [ ] **Step 4: Manual cross-cutting scenarios**

```
npm run dev
```

Run through this matrix on `/`:

| Scenario | Expected |
|---|---|
| Initial load (light mode) | Mesh + particles + stagger entrance all visible |
| Initial load (dark mode) | Same, with deeper purple tones |
| Theme toggle during animation | Colors transition smoothly; no animation interruption |
| Wrong name 3 times in a row | Each attempt: shake + vignette; no piled-up effects |
| Rapid typing | Ripple keeps re-spawning at ≤20Hz |
| Correct name → back button → correct again | Both transitions work cleanly |
| Mobile viewport (DevTools 375×667) | No MouseGlow; 6 particles instead of 12; everything still readable |
| `prefers-reduced-motion: reduce` (DevTools Rendering panel) | No particles, no mesh drift, no glow, no shake; entrance is quick fade; success is quick fade-to-white |

- [ ] **Step 5: Browser console check**

While the dev server runs, open DevTools Console. Reload `/`. Then:
- Type wrong name → submit → check console for errors
- Type correct name → submit → check console for errors

Expected: no errors, no warnings related to the new code.

- [ ] **Step 6: Final checkpoint**

All scenarios green. The Home gate cinematic interactions are complete. Document for handoff to the next section (Intro hero) by leaving this plan checked off.

---

## Self-Review Notes (already applied during writing)

- Every keyframe used in tasks is defined in Task 1.
- `Phase` type is defined in Task 6 and extended (not redefined) in Task 8.
- `NameGateForm`'s `onMatch` signature evolves: Task 6 passes no args; Task 8 passes `{x, y}` origin. Both tasks ship a complete file replacement so there is no stale state.
- `openGate` import is removed from `NameGateForm` in Task 6 (parent handles it) and never re-added.
- `Math.random()` for particles runs in `useMemo` so positions are stable per mount. No `Math.random()` in render bodies.
- All decorative elements use `aria-hidden`. Functional ARIA (`role="status"`, `aria-live="polite"`) on the error message remains untouched.
- Cleanup of `setTimeout` IDs is split in `Home.tsx`: `errorTimeoutRef` (single, replaceable) for error reset, `igniteTimeoutsRef` (array) for ignite → transition chain. Both cleaned up on unmount.
- Vignette flash uses `key={errorVersion}` (a counter incremented on each `onWrong`) so it remounts only on a new error event, not on every render that happens to occur during error phase.
- Consecutive wrong submissions within 1.2s: previous timeout is cleared, ensuring the latest submission gets its full 1.2s window.
