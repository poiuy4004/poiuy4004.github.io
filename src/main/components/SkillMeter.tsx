import { useInView } from "../hooks/useInView";
import type { SkillLevel } from "../data/skills";

const LEVEL_RATIO: Record<SkillLevel, number> = {
  expert: 1,
  advanced: 0.75,
  intermediate: 0.5,
  familiar: 0.25,
};

const LEVEL_BAR: Record<SkillLevel, string> = {
  expert: "bg-purple-500",
  advanced: "bg-purple-400",
  intermediate: "bg-purple-300",
  familiar: "bg-neutral-400",
};

type SkillMeterProps = {
  level: SkillLevel;
};

export default function SkillMeter({ level }: SkillMeterProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden
      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700"
    >
      <div
        className={`h-full origin-left rounded-full transition-transform duration-700 ease-out motion-reduce:transition-none ${LEVEL_BAR[level]}`}
        style={{ transform: `scaleX(${inView ? LEVEL_RATIO[level] : 0})` }}
      />
    </div>
  );
}
