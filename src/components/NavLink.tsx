type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  /** `bar` is the desktop underline row, `pill` the scrollable mobile row. */
  variant: "bar" | "pill";
};

export default function NavLink({ href, label, active, variant }: NavLinkProps) {
  if (variant === "pill") {
    return (
      <a
        href={href}
        aria-current={active ? "true" : undefined}
        className={`inline-block whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
          active
            ? "border-purple-400/60 bg-purple-500/10 text-purple-700 dark:text-purple-300"
            : "border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-300"
        }`}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={`relative transition hover:text-purple-600 dark:hover:text-purple-300 ${
        active ? "text-purple-600 dark:text-purple-300" : ""
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-purple-500 transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </a>
  );
}
