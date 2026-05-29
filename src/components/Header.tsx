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
          Code<span className="text-purple-500">.Min</span>
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
                        active ? "text-purple-600 dark:text-purple-300" : ""
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
