import Section from "../components/Section";
import TimelineItem from "../components/TimelineItem";
import { careers } from "../data/career";

export default function Career() {
  return (
    <Section
      id="career"
      eyebrow="Career"
      title="지나온 자리"
      description="각 자리에서 어떤 문제를 풀어 왔는지 정리했습니다."
    >
      <ol className="relative">
        {careers.map((item, idx) => (
          <TimelineItem
            key={item.company}
            item={item}
            isLast={idx === careers.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}
