import type { ReactNode } from "react";

type ContactItemProps = {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
  subLabel?: string;
};

export default function ContactItem({
  label,
  value,
  href,
  icon,
  subLabel,
}: ContactItemProps) {
  const inner = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        {icon}
      </span>
      <span className="flex flex-col text-left">
        <span className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {label}
        </span>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
          {subLabel || value}
        </span>
      </span>
    </>
  );

  const base =
    "flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 transition hover:border-purple-300 hover:bg-purple-500/5 dark:border-neutral-800 dark:bg-neutral-900/60";

  return href ? (
    <a href={href} className={base} target="_blank" rel="noreferrer noopener">
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}
