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
