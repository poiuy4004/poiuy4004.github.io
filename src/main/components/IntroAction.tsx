import type { ReactNode } from "react";

type IntroActionProps = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
};

const VARIANT_CLASS: Record<NonNullable<IntroActionProps["variant"]>, string> = {
  primary:
    "bg-purple-500 text-white shadow-sm hover:bg-purple-600",
  secondary:
    "border border-neutral-300 text-neutral-700 hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-200",
};

export default function IntroAction({
  href,
  variant = "secondary",
  external,
  trailing,
  children,
}: IntroActionProps) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noreferrer noopener" }
    : {};
  return (
    <a
      href={href}
      {...externalProps}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${VARIANT_CLASS[variant]}`}
    >
      <span>{children}</span>
      {trailing && <span aria-hidden>{trailing}</span>}
    </a>
  );
}
