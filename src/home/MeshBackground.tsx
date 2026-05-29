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
