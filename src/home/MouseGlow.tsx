import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return supportsHover && !reduced;
  });

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
            // Revealed on the first move so the glow never flashes at 0,0.
            ref.current.style.visibility = "visible";
          }
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-96 w-96 rounded-full print:hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
        mixBlendMode: "screen",
        visibility: "hidden",
        willChange: "transform",
      }}
    />
  );
}
