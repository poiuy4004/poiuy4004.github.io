import CountUp from "./CountUp";

type StatBlockProps = {
  value: string;
  label: string;
};

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/60 px-5 py-4 text-left dark:border-neutral-800 dark:bg-neutral-900/60">
      <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        <CountUp value={value} />
      </p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
    </div>
  );
}
