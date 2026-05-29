import type { Project } from "../data/projects";
import { periodToISO } from "../utils/date";
import Card from "./Card";
import Tag from "./Tag";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col">
      <header>
        <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          <time dateTime={periodToISO(project.period)}>{project.period}</time>{" "}
          · {project.role}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-purple-600 dark:text-purple-300">
          @ {project.company}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.summary}
        </p>
      </header>

      <ul className="mt-4 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag variant="subtle">{s}</Tag>
            </li>
          ))}
        </ul>
        {project.links && project.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-3">
            {project.links.map((link) => (
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
      </footer>
    </Card>
  );
}
