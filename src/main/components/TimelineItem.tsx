import type { CareerItem } from "../data/career";
import { periodToISO } from "../utils/date";
import { useInView } from "../hooks/useInView";
import Tag from "./Tag";

type TimelineItemProps = {
  item: CareerItem;
  isLast?: boolean;
};

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className="relative pl-8">
      <span
        aria-hidden
        className={`absolute left-2.5 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 ${
          item.current
            ? "border-purple-500 bg-purple-500 animate-dot-pulse"
            : "border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900"
        }`}
      />
      {!isLast && (
        <span
          aria-hidden
          className={`absolute left-2.5 top-5 -translate-x-1/2 h-[calc(100%-1rem)] w-px bg-neutral-200 dark:bg-neutral-800 ${
            inView ? "animate-timeline-draw" : "scale-y-0"
          }`}
          style={{ transformOrigin: "top" }}
        />
      )}

      <article className="pb-10">
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {item.company}
          </h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {item.position}
          </span>
          {item.current && <Tag variant="accent">Current</Tag>}
        </header>
        <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          <time dateTime={periodToISO(item.period)}>{item.period}</time>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {item.description}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
          {item.achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
              />
              <span>{a}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <li key={s}>
              <Tag variant="subtle">{s}</Tag>
            </li>
          ))}
        </ul>
        {item.links && item.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {item.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 transition hover:text-purple-500 dark:text-purple-300"
                >
                  {link.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
}
