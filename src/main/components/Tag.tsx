import type { ReactNode } from "react";

type TagVariant = "default" | "accent" | "subtle";

type TagProps = {
  children: ReactNode;
  variant?: TagVariant;
};

const VARIANT_CLASS: Record<TagVariant, string> = {
  default:
    "border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
  accent:
    "border-purple-400/50 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  subtle:
    "border-transparent bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
};

export default function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </span>
  );
}
