import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="기억에 남는 프로젝트"
      description="작업하면서 가장 많이 배웠다고 느끼는 프로젝트들을 모았습니다."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
