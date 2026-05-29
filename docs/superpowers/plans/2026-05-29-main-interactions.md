# /main Interaction Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cohesive, cinematic interaction layer to the gated `/main` portfolio page — scroll-reveal entrances, scrollspy nav + scroll progress + back-to-top, hero ambient mesh + stat count-up + skill meters + timeline draw, and tactile card hover/tilt + copy-to-clipboard — using only built-in browser APIs.

**Architecture:** Reusable primitives (`useInView`, `useReducedMotion`, `useScrollSpy`, `usePointerTilt` hooks + `Reveal`, `ScrollProgress`, `BackToTop`, `CountUp`, `SkillMeter` components) plus CSS keyframes/utilities appended to `src/index.css`, wired into existing containers/components. A state machine is not needed; effects are local and scroll/observer-driven.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@import "tailwindcss"` in `src/index.css`, no tailwind.config), react-router-dom v7. No new dependencies.

**Project constraints (important for executor):**
- **No test framework is set up.** Verification uses TypeScript build (`npx tsc -b --pretty false`), ESLint (`npx eslint <files>`), production build (`npx vite build`), and manual browser checks via `npm run dev`. For browser automation use Playwright with the **`msedge` channel** (never install Chrome).
- **Commits are deferred.** Do NOT run `git commit` per task. Use **Checkpoint** verification (tsc + eslint + manual). The user commits explicitly at the end.
- Tailwind v4: custom keyframes/utilities go directly in `src/index.css`. The `motion-reduce:` variant is available for transition-based effects.
- ESLint here enforces `react-hooks/set-state-in-effect` (no synchronous `setState` in an effect body) and `react-hooks/exhaustive-deps`. **Never call `setState` synchronously inside a `useEffect` body** — schedule it via `requestAnimationFrame`, an event listener, or an IntersectionObserver/matchMedia callback. Copy `ref.current` to a local before using it in cleanup.
- The gate page (`/`) already added CSS at `src/index.css` lines 82–188 (block titled "Home gate cinematic interactions"). Append the new block after line 188. Reuse existing gate utilities `.animate-rise` and `.animate-mesh-1/2/3` where noted.

---

## File Structure

**New files:**
- `src/main/hooks/useReducedMotion.ts` — subscribe to `prefers-reduced-motion`
- `src/main/hooks/useInView.ts` — IntersectionObserver-based "entered viewport" hook (once)
- `src/main/hooks/useScrollSpy.ts` — active section id tracking
- `src/main/hooks/usePointerTilt.ts` — desktop pointer-driven 3D tilt + sheen
- `src/main/components/Reveal.tsx` — fade+rise wrapper using `useInView`
- `src/main/components/ScrollProgress.tsx` — top scroll-progress bar
- `src/main/components/BackToTop.tsx` — floating back-to-top button
- `src/main/components/CountUp.tsx` — count-up number animation
- `src/main/components/SkillMeter.tsx` — skill level fill bar
- `src/main/components/IntroAmbient.tsx` — Intro-only ambient mesh (3 orbs, no particles)

**Modified files:**
- `src/index.css` — append `/main` keyframes/utilities + reduced-motion + smooth scroll
- `src/components/Header.tsx` — scrollspy active nav + scroll shadow
- `src/main/Main.tsx` — mount `ScrollProgress` + `BackToTop`
- `src/main/components/Section.tsx` — reveal the header block
- `src/main/containers/About.tsx`, `Strengths.tsx`, `Skills.tsx`, `Projects.tsx`, `Contact.tsx` — staggered card reveals
- `src/main/containers/Intro.tsx` — ambient mesh + stagger entrance + count-up
- `src/main/containers/Career.tsx` — pass reveal context to timeline
- `src/main/components/StatBlock.tsx` — use `CountUp`
- `src/main/components/SkillBadge.tsx` — add `SkillMeter`
- `src/main/components/TimelineItem.tsx` — line draw + current-dot pulse
- `src/main/components/Card.tsx` — hover lift/glow + optional tilt/sheen
- `src/main/components/ContactItem.tsx` — copy-to-clipboard feedback
- `src/main/components/ThemeToggle.tsx` — icon transition (minor)

---

## Task 1: CSS Foundation (keyframes + utilities + smooth scroll)

**Files:**
- Modify: `src/index.css` (append after line 188)

- [ ] **Step 1: Append the `/main` interaction CSS block**

Append exactly this to the end of `src/index.css`:

```css

/* ====================================================
   /main interaction layer
   ==================================================== */

/* Smooth in-page anchor scrolling */
html { scroll-behavior: smooth; }

/* Scroll-reveal entrance */
@keyframes reveal-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-reveal-rise { animation: reveal-rise 600ms cubic-bezier(0.25, 0.4, 0.25, 1) both; }

/* Career timeline line draw */
@keyframes timeline-draw {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
.animate-timeline-draw { animation: timeline-draw 800ms ease-out both; transform-origin: top; }

/* Current career dot pulse */
@keyframes dot-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.5); }
  70%  { box-shadow: 0 0 0 8px rgba(168, 85, 247, 0); }
  100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
}
.animate-dot-pulse { animation: dot-pulse 2.4s ease-out infinite; }

/* Reduced motion overrides for /main */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .animate-reveal-rise {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .animate-timeline-draw {
    animation: none;
    transform: none;
  }
  .animate-dot-pulse { animation: none; }
}
```

- [ ] **Step 2: Verify build**

Run: `npx vite build`
Expected: `✓ built in ...ms`, no CSS parse errors. (ESLint does not lint `.css`.)

- [ ] **Step 3: Checkpoint**

CSS is in place; nothing uses it yet. Proceed.

---

## Task 2: `useReducedMotion` hook

**Files:**
- Create: `src/main/hooks/useReducedMotion.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

Note: `setReduced` is only called inside the `change` listener (asynchronous), never synchronously in the effect body — satisfies `react-hooks/set-state-in-effect`.

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/hooks/useReducedMotion.ts`
Expected: both clean.

- [ ] **Step 3: Checkpoint** — hook ready.

---

## Task 3: `useInView` hook

**Files:**
- Create: `src/main/hooks/useInView.ts`

- [ ] **Step 1: Create the hook**

```ts
import { useEffect, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInView<T extends Element>(options: UseInViewOptions = {}) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.1, once = true } = options;
  const [node, setNode] = useState<T | null>(null);
  // Default to visible when IntersectionObserver is unavailable (no flash / SSR-safe).
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin, threshold, once]);

  return { ref: setNode, inView };
}
```

Note: `ref` is the stable `setNode` callback ref from `useState`. `setInView` is only called inside the observer callback (asynchronous). Callers must pass a stable `options` object or rely on the primitive defaults (do not inline a new object literal that changes identity every render — the defaults are destructured so passing nothing is fine).

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/hooks/useInView.ts`
Expected: both clean.

- [ ] **Step 3: Checkpoint** — hook ready.

---

## Task 4: `Reveal` component

**Files:**
- Create: `src/main/components/Reveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  as: Component = "div",
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Component
      ref={ref}
      className={`${className} ${inView ? "animate-reveal-rise" : "opacity-0"}`.trim()}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
```

Note: `as?: ElementType` keeps the ref prop loosely typed so passing the `setNode` callback ref compiles for any element (`div`, `li`, etc.). Before reveal the element is `opacity-0`; on reveal `animate-reveal-rise` (fill mode `both`) ends fully visible. Under reduced motion the CSS sets `opacity: 1` instantly.

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/Reveal.tsx`
Expected: both clean.

- [ ] **Step 3: Checkpoint** — component ready, not yet used.

---

## Task 5: Scroll-reveal rollout (Section header + card grids)

**Files:**
- Modify: `src/main/components/Section.tsx`
- Modify: `src/main/containers/About.tsx`
- Modify: `src/main/containers/Strengths.tsx`
- Modify: `src/main/containers/Skills.tsx`
- Modify: `src/main/containers/Projects.tsx`
- Modify: `src/main/containers/Contact.tsx`

- [ ] **Step 1: Reveal the `Section` header block**

Replace `src/main/components/Section.tsx` with:

```tsx
import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl text-left">
        {(eyebrow || title || description) && (
          <Reveal as="header" className="mb-10 md:mb-12">
            {eyebrow && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-purple-500 dark:text-purple-300">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="!mt-0 !mb-2 !text-3xl !leading-tight md:!text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Stagger-reveal About cards**

In `src/main/containers/About.tsx`, add `import Reveal from "../components/Reveal";` and change the numbered `<li>` mapping and the competencies `<li>` mapping to wrap each item in `Reveal as="li"` with a staggered delay. Replace the `<ul>` of numbered cards with:

```tsx
      <ul className="grid gap-4 md:grid-cols-3">
        {about.map((line, idx) => (
          <Reveal
            as="li"
            key={line}
            delay={idx * 80}
            className="rounded-2xl border border-neutral-200 bg-white/60 p-6 text-sm leading-relaxed text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-200"
          >
            <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/50 text-xs font-semibold text-purple-600 dark:text-purple-300">
              0{idx + 1}
            </span>
            <p>{line}</p>
          </Reveal>
        ))}
      </ul>
```

(Leave the "핵심 역량" `Card` and its inner list unchanged in this task — the Card hover/reveal is handled in Task 13.)

- [ ] **Step 3: Stagger-reveal Strengths cards**

In `src/main/containers/Strengths.tsx`, add `import Reveal from "../components/Reveal";` and wrap each list item. Replace the values `<ul>`:

```tsx
      <ul className="grid gap-4 md:grid-cols-2">
        {values.map((v, idx) => (
          <Reveal as="li" key={v.title} delay={idx * 80}>
            <ValueCard index={idx} title={v.title} points={v.points} />
          </Reveal>
        ))}
      </ul>
```

and the testimonials `<ul>`:

```tsx
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <Reveal as="li" key={t.quote} delay={idx * 80}>
            <TestimonialCard quote={t.quote} author={t.author} />
          </Reveal>
        ))}
      </ul>
```

- [ ] **Step 4: Stagger-reveal Skills cards**

In `src/main/containers/Skills.tsx`, add `import Reveal from "../components/Reveal";` and wrap each group `<li>`:

```tsx
      <ul className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <Reveal as="li" key={group.title} delay={idx * 80}>
            <Card className="h-full">
              <header className="mb-4">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {group.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {group.description}
                </p>
              </header>
              <ul className="grid gap-2 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </ul>
```

- [ ] **Step 5: Stagger-reveal Projects cards**

In `src/main/containers/Projects.tsx`, add `import Reveal from "../components/Reveal";` and wrap each `<li>`:

```tsx
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project, idx) => (
          <Reveal as="li" key={project.title} delay={idx * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
```

- [ ] **Step 6: Stagger-reveal Contact items**

In `src/main/containers/Contact.tsx`, add `import Reveal from "../components/Reveal";` and wrap each of the four `<li>` elements in `Reveal as="li"` with a staggered delay. For example, the Email item becomes:

```tsx
          <Reveal as="li" delay={0}>
            <ContactItem
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              icon={<span className="text-base">@</span>}
            />
          </Reveal>
```

Apply the same wrapping to the Mobile (`delay={80}`), Notion Resume (`delay={160}`), and Portfolio Archive (`delay={240}`) items, keeping each `ContactItem`'s existing props unchanged.

- [ ] **Step 7: Type-check and lint**

Run:
```
npx tsc -b --pretty false
npx eslint src/main/components/Section.tsx src/main/containers/About.tsx src/main/containers/Strengths.tsx src/main/containers/Skills.tsx src/main/containers/Projects.tsx src/main/containers/Contact.tsx
```
Expected: both clean.

- [ ] **Step 8: Manual verification**

Run `npm run dev`, open the printed URL, pass the gate (type `장용민`, Enter) to reach `/main`. Scroll down:
- ✅ Each section header fades+rises in as it enters view
- ✅ About/Strengths/Skills/Projects/Contact cards animate in, staggered left→right within each row
- ✅ Already-visible content does not re-hide when scrolling back up
- ✅ DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → items appear instantly (no rise) but still become visible

Stop the dev server.

- [ ] **Step 9: Checkpoint** — scroll-reveal bundle complete.

---

## Task 6: `useScrollSpy` + Header active nav + scroll shadow

**Files:**
- Create: `src/main/hooks/useScrollSpy.ts`
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Create `useScrollSpy`**

```ts
import { useEffect, useState } from "react";

export function useScrollSpy(
  ids: string[],
  rootMargin = "-45% 0px -50% 0px",
): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
```

Note: pass a module-level constant array for `ids` (stable identity) so the effect does not re-run every render.

- [ ] **Step 2: Wire Header active nav + scroll shadow**

Replace `src/components/Header.tsx` with:

```tsx
import { useEffect, useRef, useState } from "react";
import { useScrollSpy } from "../main/hooks/useScrollSpy";
import ThemeToggle from "../main/components/ThemeToggle";

const NAV_ITEMS = [
  { href: "#intro", id: "intro", label: "Intro" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#career", id: "career", label: "Career" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const activeId = useScrollSpy(NAV_IDS);
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      rafRef.current = 0;
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur transition-shadow dark:border-neutral-800 dark:bg-neutral-950/70 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <a
          href="#intro"
          className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          ymjang<span className="text-purple-500">.dev</span>
        </a>

        <div className="flex items-center gap-5">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              {NAV_ITEMS.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? "true" : undefined}
                      className={`relative transition hover:text-purple-500 dark:hover:text-purple-300 ${
                        active
                          ? "text-purple-600 dark:text-purple-300"
                          : ""
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-purple-500 transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

Note: `update()` runs only inside the rAF scheduled by `onScroll()` (which is called once for init) — `setScrolled` is never synchronous in the effect body.

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/hooks/useScrollSpy.ts src/components/Header.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main`. Scroll through sections:
- ✅ The nav item for the section currently in the middle of the viewport shows a purple underline that slides in, and turns purple
- ✅ Clicking a nav item smooth-scrolls to that section and updates the underline
- ✅ Header gains a subtle shadow once scrolled past the top
- ✅ Reduced-motion: nav still highlights; smooth scroll becomes instant

Stop dev server.

- [ ] **Step 5: Checkpoint** — scrollspy nav complete.

---

## Task 7: `ScrollProgress` bar

**Files:**
- Create: `src/main/components/ScrollProgress.tsx`
- Modify: `src/main/Main.tsx`

- [ ] **Step 1: Create `ScrollProgress`**

```tsx
import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      rafRef.current = 0;
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5"
    >
      <div
        className="h-full origin-left bg-purple-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
```

Note: init via `onScroll()` (schedules rAF) so `setProgress` is never synchronous in the effect body.

- [ ] **Step 2: Mount in `Main.tsx`**

In `src/main/Main.tsx`, add `import ScrollProgress from "./components/ScrollProgress";` and render it as the first child of the root `<div>` (before `<Header />`):

```tsx
    <div className="flex min-h-screen flex-1 flex-col bg-white text-left animate-fade-in dark:bg-neutral-950">
      <ScrollProgress />
      <Header />
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/ScrollProgress.tsx src/main/Main.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main`. Scroll:
- ✅ A thin purple bar at the very top grows from left (0%) to full width (100%) as you scroll to the bottom
- ✅ Resizing the window keeps the bar proportion correct

Stop dev server.

- [ ] **Step 5: Checkpoint** — progress bar complete.

---

## Task 8: `BackToTop` button

**Files:**
- Create: `src/main/components/BackToTop.tsx`
- Modify: `src/main/Main.tsx`

- [ ] **Step 1: Create `BackToTop`**

```tsx
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight);
      rafRef.current = 0;
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="맨 위로"
      className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/50 bg-white/80 text-lg text-purple-600 shadow-md backdrop-blur transition-opacity duration-300 hover:bg-purple-500/10 dark:bg-neutral-900/80 dark:text-purple-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
```

- [ ] **Step 2: Mount in `Main.tsx`**

In `src/main/Main.tsx`, add `import BackToTop from "./components/BackToTop";` and render it as the last child of the root `<div>` (after `<Footer />`):

```tsx
      <Footer />
      <BackToTop />
    </div>
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/BackToTop.tsx src/main/Main.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main`:
- ✅ Button is hidden near the top; appears (fades in) after scrolling past one viewport height
- ✅ Clicking scrolls smoothly to the top; button fades out
- ✅ Reduced-motion: click jumps to top instantly

Stop dev server.

- [ ] **Step 5: Checkpoint** — back-to-top complete. Navigation bundle done.

---

## Task 9: `CountUp` + StatBlock

**Files:**
- Create: `src/main/components/CountUp.tsx`
- Modify: `src/main/components/StatBlock.tsx`

- [ ] **Step 1: Create `CountUp`**

```tsx
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

type CountUpProps = {
  value: string;
  durationMs?: number;
};

const NUMBER_RE = /\d[\d,]*/;

export default function CountUp({ value, durationMs = 1000 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const match = value.match(NUMBER_RE);
  const target = match ? parseInt(match[0].replace(/,/g, ""), 10) : null;
  const [display, setDisplay] = useState(() =>
    target === null ? value : value.replace(NUMBER_RE, "0"),
  );
  const rafRef = useRef(0);

  useEffect(() => {
    if (target === null || !inView) return;
    if (reduced) {
      rafRef.current = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(rafRef.current);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      setDisplay(value.replace(NUMBER_RE, String(current)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, reduced, target, value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
```

Note: every `setDisplay` runs inside a `requestAnimationFrame` callback — never synchronous in the effect body. If `value` has no leading number, it renders unchanged.

- [ ] **Step 2: Use it in `StatBlock`**

Replace `src/main/components/StatBlock.tsx` with:

```tsx
import CountUp from "./CountUp";

type StatBlockProps = {
  value: string;
  label: string;
};

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/60 px-5 py-4 text-left dark:border-neutral-800 dark:bg-neutral-900/60">
      <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/CountUp.tsx src/main/components/StatBlock.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main` (Intro is at top; the stat row is just below the hero text). On load / when stats enter view:
- ✅ `5+` counts 0→5 then shows `+`; `8+` counts 0→8 then `+`; `3` counts 0→3
- ✅ The experience stat (e.g., `4년 10개월`) animates its leading number and keeps the suffix text
- ✅ Reduced-motion: final values show immediately

Stop dev server.

- [ ] **Step 5: Checkpoint** — count-up complete.

---

## Task 10: `SkillMeter` + SkillBadge

**Files:**
- Create: `src/main/components/SkillMeter.tsx`
- Modify: `src/main/components/SkillBadge.tsx`

- [ ] **Step 1: Create `SkillMeter`**

```tsx
import { useInView } from "../hooks/useInView";
import type { SkillLevel } from "../data/skills";

const LEVEL_RATIO: Record<SkillLevel, number> = {
  expert: 1,
  advanced: 0.75,
  intermediate: 0.5,
  familiar: 0.25,
};

const LEVEL_BAR: Record<SkillLevel, string> = {
  expert: "bg-purple-500",
  advanced: "bg-purple-400",
  intermediate: "bg-purple-300",
  familiar: "bg-neutral-400",
};

type SkillMeterProps = {
  level: SkillLevel;
};

export default function SkillMeter({ level }: SkillMeterProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden
      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
    >
      <div
        className={`h-full origin-left rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none ${LEVEL_BAR[level]}`}
        style={{ transform: `scaleX(${inView ? LEVEL_RATIO[level] : 0})` }}
      />
    </div>
  );
}
```

Note: the fill uses a CSS transition (not a keyframe). `motion-reduce:transition-none` makes it jump to its final width instantly under reduced motion.

- [ ] **Step 2: Add the meter to `SkillBadge`**

Replace `src/main/components/SkillBadge.tsx` with:

```tsx
import type { SkillLevel } from "../data/skills";
import SkillMeter from "./SkillMeter";

type SkillBadgeProps = {
  name: string;
  level: SkillLevel;
};

const LEVEL_STYLE: Record<SkillLevel, { dot: string; label: string }> = {
  expert: { dot: "bg-purple-500", label: "Expert" },
  advanced: { dot: "bg-purple-400", label: "Advanced" },
  intermediate: { dot: "bg-purple-300", label: "Intermediate" },
  familiar: { dot: "bg-neutral-400", label: "Familiar" },
};

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const meta = LEVEL_STYLE[level];
  return (
    <li className="rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="flex items-center justify-between">
        <span className="text-neutral-800 dark:text-neutral-200">{name}</span>
        <span className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden />
          {meta.label}
        </span>
      </div>
      <SkillMeter level={level} />
    </li>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/SkillMeter.tsx src/main/components/SkillBadge.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main` → Skills section. As each skills card enters view:
- ✅ A thin bar under each skill name fills left→right to its level (expert full, advanced ~3/4, intermediate ~1/2, familiar ~1/4)
- ✅ Bar colors match the level dot
- ✅ Reduced-motion: bars show final width instantly (no sweep)

Stop dev server.

- [ ] **Step 5: Checkpoint** — skill meters complete.

---

## Task 11: Career timeline draw + current-dot pulse

**Files:**
- Modify: `src/main/components/TimelineItem.tsx`

- [ ] **Step 1: Update `TimelineItem`**

Replace `src/main/components/TimelineItem.tsx` with:

```tsx
import type { CareerItem } from "../data/career";
import { periodToISO } from "../utils/date";
import { useInView } from "../hooks/useInView";
import Tag from "./Tag";

type TimelineItemProps = {
  item: CareerItem;
  isLast?: boolean;
};

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className="relative pl-8">
      <span
        aria-hidden
        className={`absolute left-2.5 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 ${
          item.current
            ? "border-purple-500 bg-purple-500 animate-dot-pulse"
            : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
        }`}
      />
      {!isLast && (
        <span
          aria-hidden
          className={`absolute left-2.5 top-5 -translate-x-1/2 h-[calc(100%-1rem)] w-px bg-neutral-200 dark:bg-neutral-800 ${
            inView ? "animate-timeline-draw" : "scale-y-0"
          }`}
          style={{ transformOrigin: "top" }}
        />
      )}

      <article className="pb-10">
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {item.company}
          </h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {item.position}
          </span>
          {item.current && <Tag variant="accent">Current</Tag>}
        </header>
        <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          <time dateTime={periodToISO(item.period)}>{item.period}</time>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {item.description}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
          {item.achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
              />
              <span>{a}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <li key={s}>
              <Tag variant="subtle">{s}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
```

Note: the connecting line starts at `scale-y-0` and plays `animate-timeline-draw` (origin top) when the item enters view. The current item's dot pulses via `animate-dot-pulse`. `Career.tsx` needs no change (it already maps `TimelineItem`).

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/TimelineItem.tsx`
Expected: both clean.

- [ ] **Step 3: Manual verification**

`npm run dev` → `/main` → Career section:
- ✅ As each timeline entry scrolls into view, its connecting line draws downward
- ✅ The "Current" entry's dot has a gentle repeating purple pulse
- ✅ Reduced-motion: lines show fully immediately; no pulse

Stop dev server.

- [ ] **Step 4: Checkpoint** — timeline complete.

---

## Task 12: Intro ambient mesh + stagger entrance

**Files:**
- Create: `src/main/components/IntroAmbient.tsx`
- Modify: `src/main/containers/Intro.tsx`

- [ ] **Step 1: Create `IntroAmbient`** (reuses gate `.animate-mesh-*` classes)

```tsx
export default function IntroAmbient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-purple-300/15 blur-3xl animate-mesh-1 dark:bg-purple-500/20" />
      <div className="absolute -right-24 top-1/3 h-[18rem] w-[18rem] rounded-full bg-purple-400/10 blur-3xl animate-mesh-2 dark:bg-purple-600/15" />
    </div>
  );
}
```

- [ ] **Step 2: Update `Intro.tsx`** — relative section, mesh, stagger entrance

Replace `src/main/containers/Intro.tsx` with:

```tsx
import IntroAction from "../components/IntroAction";
import IntroAmbient from "../components/IntroAmbient";
import StatBlock from "../components/StatBlock";
import Tag from "../components/Tag";
import { profile } from "../data/profile";

const STATS: { value: string; label: string }[] = [
  { value: profile.yearsOfExperience, label: "실무 경력" },
  { value: "5+", label: "소속·계약 회사" },
  { value: "8+", label: "배포까지 완수한 프로젝트" },
  { value: "3", label: "App Store 출시 앱" },
];

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative scroll-mt-20 overflow-hidden px-6 pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <IntroAmbient />
      <div className="relative mx-auto max-w-5xl text-left">
        <div className="flex flex-col items-start gap-3">
          <div className="animate-rise" style={{ animationDelay: "100ms" }}>
            <Tag variant="accent">
              {profile.yearsOfExperience} · {profile.role}
            </Tag>
          </div>
          <h1
            className="!mt-0 !mb-0 !text-5xl !leading-tight animate-rise md:!text-6xl"
            style={{ animationDelay: "200ms" }}
          >
            안녕하세요, <br />
            <span className="text-purple-500">{profile.name}</span> 입니다.
          </h1>
          <p
            className="mt-2 max-w-2xl text-lg text-neutral-600 animate-rise dark:text-neutral-300"
            style={{ animationDelay: "350ms" }}
          >
            {profile.tagline}
          </p>
          <p
            className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-500 animate-rise dark:text-neutral-400"
            style={{ animationDelay: "500ms" }}
          >
            {profile.summary}
          </p>
        </div>
        <div
          className="mt-10 grid grid-cols-2 gap-3 animate-rise sm:grid-cols-4"
          style={{ animationDelay: "650ms" }}
        >
          {STATS.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
        <div
          className="mt-8 flex flex-wrap items-center gap-3 animate-rise"
          style={{ animationDelay: "800ms" }}
        >
          <IntroAction href="#contact" variant="primary" trailing="→">
            연락하기
          </IntroAction>
          <IntroAction href="#projects">프로젝트 보기</IntroAction>
          <IntroAction href={profile.resume} external trailing="↗">
            Notion Resume
          </IntroAction>
        </div>
      </div>
    </section>
  );
}
```

Note: `.animate-rise` is the existing gate utility (`src/index.css`, opacity 0 → rise, reduced-motion → quick fade). The stat count-up (Task 9) still runs when the stat row's `CountUp` spans enter view — independent of the `animate-rise` entrance.

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/IntroAmbient.tsx src/main/containers/Intro.tsx`
Expected: both clean.

- [ ] **Step 4: Manual verification**

`npm run dev` → `/main` (or pass the gate to land here):
- ✅ Two soft purple orbs drift behind the hero (continuity with the gate)
- ✅ On load, tag → name → tagline → summary → stats → CTAs fade+rise in sequence
- ✅ Content stays readable above the mesh
- ✅ Reduced-motion: elements appear with a quick fade; orbs static

Stop dev server.

- [ ] **Step 5: Checkpoint** — hero & data-viz bundle complete.

---

## Task 13: Card hover lift + glow

**Files:**
- Modify: `src/main/components/Card.tsx`

- [ ] **Step 1: Strengthen Card hover**

Replace `src/main/components/Card.tsx` with:

```tsx
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/10 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-purple-500/40 ${className}`}
    >
      {children}
    </Tag>
  );
}
```

Note: adds `hover:-translate-y-1` (lift), purple-tinted border + shadow. Uses Tailwind `transition` (covered by `motion-reduce` since transforms on hover are user-initiated; reduced-motion users simply get the color change without much movement — acceptable, and `transition duration-300` could optionally carry `motion-reduce:transition-none` if desired).

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/Card.tsx`
Expected: both clean.

- [ ] **Step 3: Manual verification**

`npm run dev` → `/main`. Hover over Project / Skills / "핵심 역량" cards:
- ✅ Card lifts slightly and gains a soft purple shadow/border on hover
- ✅ Returns smoothly on mouse-out

Stop dev server.

- [ ] **Step 4: Checkpoint** — card hover complete.

---

## Task 14: `usePointerTilt` + Card tilt/sheen (desktop)

**Files:**
- Create: `src/main/hooks/usePointerTilt.ts`
- Modify: `src/main/components/Card.tsx`

- [ ] **Step 1: Create `usePointerTilt`**

```ts
import { useRef, type MouseEvent as ReactMouseEvent } from "react";

export function usePointerTilt(maxDeg = 6) {
  const ref = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);

  const enabled =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    if (!rafRef.current) {
      rafRef.current = window.requestAnimationFrame(() => {
        const rotateY = (px - 0.5) * 2 * maxDeg;
        const rotateX = -(py - 0.5) * 2 * maxDeg;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        el.style.setProperty("--sheen-x", `${px * 100}%`);
        el.style.setProperty("--sheen-y", `${py * 100}%`);
        el.style.setProperty("--sheen-opacity", "1");
        rafRef.current = 0;
      });
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    el.style.transform = "";
    el.style.setProperty("--sheen-opacity", "0");
  };

  return {
    enabled,
    ref,
    handlers: enabled ? { onMouseMove, onMouseLeave } : {},
  };
}
```

- [ ] **Step 2: Add optional tilt/sheen to `Card`**

Replace `src/main/components/Card.tsx` with:

```tsx
import type { ReactNode } from "react";
import { usePointerTilt } from "../hooks/usePointerTilt";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  tilt?: boolean;
};

export default function Card({
  children,
  className = "",
  as: Tag = "div",
  tilt = false,
}: CardProps) {
  const { enabled, ref, handlers } = usePointerTilt();
  const useTilt = tilt && enabled;

  return (
    <Tag
      ref={useTilt ? (ref as React.Ref<HTMLDivElement & HTMLElement>) : undefined}
      {...(useTilt ? handlers : {})}
      className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/10 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-purple-500/40 ${className}`}
      style={useTilt ? { willChange: "transform", transformStyle: "preserve-3d" } : undefined}
    >
      {useTilt && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{
            background:
              "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(168,85,247,0.18), transparent 45%)",
            opacity: "var(--sheen-opacity, 0)",
          }}
        />
      )}
      {children}
    </Tag>
  );
}
```

Note: tilt/sheen only activate when `tilt` is passed AND the device supports hover+fine pointer AND reduced motion is off. The hover lift transform from Task 13 and the JS tilt transform both write `transform`; when tilt is active the inline `el.style.transform` (set on mousemove) takes precedence over the Tailwind hover class, and `onMouseLeave` clears it so the hover lift resumes. This is acceptable; the dominant effect on a tilt card is the tilt.

- [ ] **Step 3: Enable tilt on Project and Skills cards**

In `src/main/components/ProjectCard.tsx`, change `<Card as="article" ...>` to include `tilt`:

```tsx
    <Card as="article" tilt className="flex h-full flex-col">
```

In `src/main/containers/Skills.tsx`, change the group `<Card className="h-full">` to:

```tsx
            <Card tilt className="h-full">
```

- [ ] **Step 4: Type-check and lint**

Run:
```
npx tsc -b --pretty false
npx eslint src/main/hooks/usePointerTilt.ts src/main/components/Card.tsx src/main/components/ProjectCard.tsx src/main/containers/Skills.tsx
```
Expected: both clean. (If tsc complains about the `ref` cast, keep `ref as React.Ref<HTMLDivElement & HTMLElement>` exactly as shown.)

- [ ] **Step 5: Manual verification**

`npm run dev` → `/main` on desktop:
- ✅ Hover over a Project or Skills card → it tilts subtly toward the cursor with a soft purple sheen following the pointer
- ✅ Moving off resets the card smoothly
- ✅ DevTools device toolbar (touch emulation) → reload → no tilt, cards still lift on (simulated) hover
- ✅ Reduced-motion → no tilt/sheen; hover lift/color only

Stop dev server.

- [ ] **Step 6: Checkpoint** — tilt/sheen complete.

---

## Task 15: Contact copy-to-clipboard feedback

**Files:**
- Modify: `src/main/components/ContactItem.tsx`

- [ ] **Step 1: Add a copy button with transient feedback**

The current `ContactItem` props are `{ label: string; value: string; href?: string; icon?: ReactNode; subLabel?: string }`, it wraps the whole row as an `<a>` (or `<div>` when no `href`), and it displays `subLabel || value` as the main text. The replacement below keeps those exact props and the `subLabel || value` display, but moves the link inline (a `<button>` cannot be nested inside an `<a>`) and copies `value`.

Replace `src/main/components/ContactItem.tsx` with:

```tsx
import { useRef, useState, type ReactNode } from "react";

type ContactItemProps = {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
  subLabel?: string;
};

export default function ContactItem({
  label,
  value,
  href,
  icon,
  subLabel,
}: ContactItemProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable or denied — the link remains the fallback.
    }
  };

  const display = subLabel || value;

  return (
    <div className="group relative flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-500/5 hover:shadow-md hover:shadow-purple-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-purple-500/40">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="truncate text-sm font-medium text-neutral-800 hover:text-purple-600 dark:text-neutral-100 dark:hover:text-purple-300"
          >
            {display}
          </a>
        ) : (
          <span className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {display}
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} 복사`}
        className="shrink-0 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-500 transition hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-purple-300"
      >
        복사
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute right-2 top-2 rounded bg-purple-500 px-2 py-0.5 text-xs text-white transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        복사됨
      </span>
    </div>
  );
}
```

Note: the `mailto:`/`tel:`/url link is preserved as the fallback; the copy button copies `value`. Failure (no Clipboard API / denied permission) is caught and ignored. `aria-live="polite"` announces "복사됨". The Contact container's grid/`Reveal` wrapping from Task 5 Step 6 is unaffected.

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/ContactItem.tsx`
Expected: both clean.

- [ ] **Step 3: Manual verification**

`npm run dev` → `/main` → Contact section:
- ✅ Each contact row lifts slightly on hover
- ✅ Clicking "복사" copies the value; a "복사됨" badge appears for ~1.5s then fades
- ✅ The email/phone link still works (opens mail/dialer in a new tab)

Stop dev server.

- [ ] **Step 4: Checkpoint** — contact copy complete.

---

## Task 16: ThemeToggle icon transition (minor polish)

**Files:**
- Modify: `src/main/components/ThemeToggle.tsx`

- [ ] **Step 1: Smooth the active-state transition**

`ThemeToggle` renders three mode buttons (`light`/`system`/`dark`, icons ☀/◐/☾); the active button already has `transition` plus `bg-white ... shadow-sm`. Make the active-pill/color change smoother by widening the transition. In `src/main/components/ThemeToggle.tsx`, change the button className fragment:

```
className={`flex items-center justify-center rounded-full transition ${btn} ${
```

to:

```
className={`flex items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none ${btn} ${
```

This is the only change — no logic/props change.

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc -b --pretty false` then `npx eslint src/main/components/ThemeToggle.tsx`
Expected: both clean.

- [ ] **Step 3: Manual verification**

`npm run dev` → `/main`. Click the theme toggle:
- ✅ Active-mode indicator/icon transitions smoothly between light/dark/system
- ✅ Theme switching still works exactly as before

Stop dev server.

- [ ] **Step 4: Checkpoint** — tactile micro bundle complete.

---

## Task 17: Final cross-cutting verification

**Files:** No changes — verification only.

- [ ] **Step 1: Full TypeScript build**

Run: `npx tsc -b --pretty false`
Expected: no output (clean).

- [ ] **Step 2: Full ESLint**

Run: `npx eslint src/`
Expected: no output (clean).

- [ ] **Step 3: Production build**

Run: `npx vite build`
Expected: `✓ built in ...ms`, no errors. CSS bundle slightly larger than the gate-only baseline.

- [ ] **Step 4: Manual cross-cutting matrix**

Run `npm run dev`, pass the gate, and run this matrix on `/main`:

| Scenario | Expected |
|---|---|
| Scroll top→bottom (light) | Section headers + cards reveal staggered; progress bar fills; nav highlights track sections |
| Scroll (dark mode) | Same, deeper purple tones |
| Intro on load | Mesh drift + tag→…→CTA stagger; stats count up |
| Skills in view | Level bars fill to ratio |
| Career in view | Lines draw; current dot pulses |
| Hover Project/Skills card (desktop) | Lift + tilt + sheen |
| Contact 복사 | "복사됨" appears then fades; link still works |
| Click nav item | Smooth-scrolls; underline moves |
| Back-to-top | Appears past one viewport; returns to top |
| Mobile viewport (375×667) | No tilt; layout intact; reveals still work |
| `prefers-reduced-motion: reduce` | No rise/draw/tilt/pulse/sheen; smooth-scroll off; count-up shows finals; meters set instantly; all content reachable |

- [ ] **Step 5: Browser console check**

With the dev server running and DevTools Console open, reload `/main`, scroll fully, hover cards, click 복사 and nav items.
Expected: no errors or warnings related to the new code.

- [ ] **Step 6: (Optional) Playwright visual check**

If running automated checks, use the **`msedge` channel** (never install Chrome). Capture screenshots of: Intro, a mid-scroll section reveal, Skills meters, Career timeline, a hovered card, and the reduced-motion variant. Confirm no console errors.

- [ ] **Step 7: Final checkpoint**

All scenarios green. The `/main` interaction layer is complete. Leave this plan checked off for handoff.

---

## Self-Review Notes (applied during writing)

- **Spec coverage:** ① scroll-reveal → Tasks 4–5; ② navigation (scrollspy, progress, smooth-scroll, back-to-top, header shadow) → Tasks 1 (smooth-scroll CSS), 6, 7, 8; ③ hero & data-viz (mesh, stagger, count-up, skill meters, timeline draw) → Tasks 9, 10, 11, 12; ④ tactile (card hover/tilt/sheen, copy, theme toggle, link/tag hovers via existing transitions) → Tasks 13, 14, 15, 16. Accessibility/perf (reduced-motion, once-observers, rAF, aria) baked into each task and Task 1's CSS.
- **No new dependencies** — all browser built-ins (IntersectionObserver, matchMedia, Clipboard, rAF).
- **Lint safety:** every `setState`-in-effect is deferred to rAF / event / observer callbacks (the project enforces `react-hooks/set-state-in-effect`, which already bit the gate work). Ref values copied to locals before cleanup use.
- **Type consistency:** `useInView` returns `{ ref, inView }` everywhere; `useReducedMotion()` returns `boolean`; `useScrollSpy(ids)` returns `string | null`; `usePointerTilt()` returns `{ enabled, ref, handlers }`; `SkillLevel` reused from `../data/skills`. `Reveal` uses `as?: ElementType`. `CountUp` takes `{ value, durationMs? }`.
- **Stable arrays:** `useScrollSpy` and Header use the module-level `NAV_IDS` constant to avoid effect thrash.
- **Reduced motion:** keyframe effects handled by the `@media (prefers-reduced-motion: reduce)` block (Task 1); transition effects use Tailwind `motion-reduce:`; JS effects branch on `useReducedMotion()`.
- **Gate reuse:** `.animate-rise` and `.animate-mesh-1/2/3` are reused from the existing gate CSS — not redefined.
- **ContactItem/ThemeToggle** tasks instruct reading the real file first because their exact current markup wasn't fully captured; replacements preserve props and behavior.
