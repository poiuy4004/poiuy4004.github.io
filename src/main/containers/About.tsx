import Card from "../components/Card";
import Section from "../components/Section";
import { about } from "../data/profile";
import { competencies } from "../data/strengths";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="제가 일하는 방식"
      description="단순한 인터페이스 뒤에는 분명한 의도가 있어야 한다고 믿습니다."
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {about.map((line, idx) => (
          <li
            key={line}
            className="rounded-2xl border border-neutral-200 bg-white/60 p-6 text-sm leading-relaxed text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-200"
          >
            <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/50 text-xs font-semibold text-purple-600 dark:text-purple-300">
              0{idx + 1}
            </span>
            <p>{line}</p>
          </li>
        ))}
      </ul>

      <Card className="mt-8">
        <h3 className="mb-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          핵심 역량
        </h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {competencies.map((c) => (
            <li
              key={c}
              className="flex gap-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
            >
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
              />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
