import Card from "./Card";

type ValueCardProps = {
  index: number;
  title: string;
  points: string[];
};

export default function ValueCard({ index, title, points }: ValueCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-400/50 bg-purple-500/10 text-sm font-semibold text-purple-600 dark:text-purple-300">
          0{index + 1}
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
