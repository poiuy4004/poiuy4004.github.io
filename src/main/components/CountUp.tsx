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
