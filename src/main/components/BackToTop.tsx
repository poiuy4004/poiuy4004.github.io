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
      rafRef.current = 0;
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
      // Hidden means hidden: without this the invisible button still takes a tab stop.
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/50 bg-white/80 text-lg text-purple-600 shadow-md backdrop-blur transition-opacity duration-300 hover:bg-purple-500/10 print:hidden dark:bg-neutral-900/80 dark:text-purple-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
