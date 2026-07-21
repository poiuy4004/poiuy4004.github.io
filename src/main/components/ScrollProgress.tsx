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
      rafRef.current = 0;
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 print:hidden"
    >
      <div
        className="h-full origin-left bg-purple-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
