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
      style={
        useTilt
          ? { willChange: "transform", transformStyle: "preserve-3d" }
          : undefined
      }
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
