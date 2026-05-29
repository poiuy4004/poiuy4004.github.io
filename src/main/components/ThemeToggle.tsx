import { useTheme, type ThemePreference } from "../hooks/useTheme";

const OPTIONS: { value: ThemePreference; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀" },
  { value: "system", label: "System", icon: "◐" },
  { value: "dark", label: "Dark", icon: "☾" },
];

type ThemeToggleProps = {
  size?: "sm" | "md";
};

export default function ThemeToggle({ size = "md" }: ThemeToggleProps) {
  const { preference, setPreference } = useTheme();
  const btn = size === "sm" ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs";

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-0.5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      {OPTIONS.map((opt) => {
        const active = preference === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPreference(opt.value)}
            aria-pressed={active}
            title={opt.label}
            className={`flex items-center justify-center rounded-full transition ${btn} ${
              active
                ? "bg-white text-purple-600 shadow-sm dark:bg-neutral-700 dark:text-purple-300"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
            }`}
          >
            <span aria-hidden>{opt.icon}</span>
            <span className="sr-only">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
