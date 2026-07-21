import { useRef, useState, type ReactNode } from "react";

type ContactItemProps = {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
  subLabel?: string;
  /** What the copy button writes, when it differs from the shortened `value`. */
  copyValue?: string;
};

export default function ContactItem({
  label,
  value,
  href,
  icon,
  subLabel,
  copyValue,
}: ContactItemProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable or denied — the link remains the fallback.
    }
  };

  const display = subLabel || value;
  // mailto:/tel: hand off to a native handler — opening them in a new tab
  // leaves a blank window behind.
  const isExternal = href?.startsWith("http") ?? false;

  return (
    <div className="group relative flex items-center gap-3 rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-500/5 hover:shadow-md hover:shadow-purple-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-purple-500/40">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            {...(isExternal
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="truncate text-sm font-medium text-neutral-800 hover:text-purple-600 dark:text-neutral-100 dark:hover:text-purple-300"
          >
            {display}
          </a>
        ) : (
          <span className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {display}
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} 복사`}
        className="shrink-0 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-500 transition hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-purple-300"
      >
        복사
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute right-2 top-2 rounded bg-purple-500 px-2 py-0.5 text-xs text-white transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        복사됨
      </span>
    </div>
  );
}
