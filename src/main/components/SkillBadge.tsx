import type { SkillLevel } from "../data/skills";

type SkillBadgeProps = {
  name: string;
  level: SkillLevel;
};

const LEVEL_STYLE: Record<SkillLevel, { dot: string; label: string }> = {
  expert: { dot: "bg-purple-500", label: "Expert" },
  advanced: { dot: "bg-purple-400", label: "Advanced" },
  intermediate: { dot: "bg-purple-300", label: "Intermediate" },
  familiar: { dot: "bg-neutral-400", label: "Familiar" },
};

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const meta = LEVEL_STYLE[level];
  return (
    <li className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white/60 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900/60">
      <span className="text-neutral-800 dark:text-neutral-200">{name}</span>
      <span className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden />
        {meta.label}
      </span>
    </li>
  );
}
