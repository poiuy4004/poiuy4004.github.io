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
