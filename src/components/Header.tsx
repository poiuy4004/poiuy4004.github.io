import { useEffect, useRef, useState } from "react";
import { useScrollSpy } from "../main/hooks/useScrollSpy";
import ThemeToggle from "../main/components/ThemeToggle";
import NavLink from "./NavLink";

const NAV_ITEMS = [
  { href: "#intro", id: "intro", label: "Intro" },
  { href: "#about", id: "about", label: "About" },
  { href: "#strengths", id: "strengths", label: "Strengths" },
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
  const mobileNavRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);
      rafRef.current = 0;
    };
    const onScroll = () => {
      if (!rafRef.current)
        rafRef.current = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  // Keep the active pill in view as the page scrolls. `block: "nearest"`
  // confines the scrolling to the nav strip so the page itself never jumps.
  useEffect(() => {
    const list = mobileNavRef.current;
    if (!list || !activeId) return;
    const item = list.querySelector(`[data-nav-id="${activeId}"]`);
    item?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur transition-shadow print:hidden dark:border-neutral-800 dark:bg-neutral-950/70 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <a
          href="#intro"
          className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Code<span className="text-purple-600 dark:text-purple-400">.Min</span>
        </a>

        <div className="flex items-center gap-5">
          <nav aria-label="섹션" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    active={activeId === item.id}
                    variant="bar"
                  />
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile: a scrollable strip instead of a disclosure menu — every
          section stays one tap away and there's no overlay to trap focus in. */}
      <nav aria-label="섹션" className="md:hidden">
        <ul
          ref={mobileNavRef}
          className="flex snap-x gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href} data-nav-id={item.id} className="snap-start">
              <NavLink
                href={item.href}
                label={item.label}
                active={activeId === item.id}
                variant="pill"
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
