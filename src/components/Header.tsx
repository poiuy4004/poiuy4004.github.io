import ThemeToggle from "../main/components/ThemeToggle";

const NAV_ITEMS = [
  { href: "#intro", label: "Intro" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#career", label: "Career" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <a
          href="#intro"
          className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          ymjang<span className="text-purple-500">.dev</span>
        </a>

        <div className="flex items-center gap-5">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition hover:text-purple-500 dark:hover:text-purple-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
