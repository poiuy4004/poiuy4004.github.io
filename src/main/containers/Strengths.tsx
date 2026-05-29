import Reveal from "../components/Reveal";
import Section from "../components/Section";
import TestimonialCard from "../components/TestimonialCard";
import ValueCard from "../components/ValueCard";
import { testimonials, values } from "../data/strengths";

export default function Strengths() {
  return (
    <Section
      id="strengths"
      eyebrow="Strengths"
      title="제가 일을 대하는 태도"
      description="태도가 결국 결과물을 만든다고 믿습니다. 함께 일했던 분들이 남긴 평가도 함께 적어 둡니다."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {values.map((v, idx) => (
          <Reveal as="li" key={v.title} delay={idx * 80}>
            <ValueCard index={idx} title={v.title} points={v.points} />
          </Reveal>
        ))}
      </ul>

      <h3 className="mt-12 mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        주변인 평가
      </h3>
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <Reveal as="li" key={t.quote} delay={idx * 80}>
            <TestimonialCard quote={t.quote} author={t.author} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
