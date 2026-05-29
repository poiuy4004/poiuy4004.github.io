import Card from "../components/Card";
import Section from "../components/Section";
import SkillBadge from "../components/SkillBadge";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="다뤄 본 도구들"
      description="도구는 목적이 아니라 수단이라고 생각합니다. 그래도 충분히 익숙해진 도구들이 있어요."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <li key={group.title}>
            <Card className="h-full">
              <header className="mb-4">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {group.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {group.description}
                </p>
              </header>
              <ul className="grid gap-2 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
