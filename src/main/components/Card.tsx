import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70 ${className}`}
    >
      {children}
    </Tag>
  );
}
