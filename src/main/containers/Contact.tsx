import ContactItem from "../components/ContactItem";
import Reveal from "../components/Reveal";
import Section from "../components/Section";
import { profile } from "../data/profile";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="이야기 나눠요"
      description="새로운 프로덕트, 협업 제안, 외주 문의 — 어떤 주제든 환영합니다."
    >
      <address className="not-italic">
        <ul className="grid gap-3 sm:grid-cols-2">
          <Reveal as="li" delay={0}>
            <ContactItem
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              icon={<span className="text-base">@</span>}
            />
          </Reveal>
          <Reveal as="li" delay={80}>
            <ContactItem
              label="Mobile"
              value={profile.phoneDisplay}
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              icon={<span className="text-base">☏</span>}
            />
          </Reveal>
          <Reveal as="li" delay={160}>
            <ContactItem
              label="Notion Resume"
              value="yielding-brick-c96.notion.site"
              subLabel="Dev. YongMin"
              href={profile.resume}
              icon={<span className="text-base">✎</span>}
            />
          </Reveal>
          <Reveal as="li" delay={240}>
            <ContactItem
              label="Portfolio Archive"
              value={profile.portfolio.replace("https://", "")}
              href={profile.portfolio}
              icon={<span className="text-base">◎</span>}
            />
          </Reveal>
        </ul>
      </address>
    </Section>
  );
}
