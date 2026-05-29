import ContactItem from "../components/ContactItem";
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
          <li>
            <ContactItem
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              icon={<span className="text-base">@</span>}
            />
          </li>
          <li>
            <ContactItem
              label="Mobile"
              value={profile.phoneDisplay}
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              icon={<span className="text-base">☏</span>}
            />
          </li>
          <li>
            <ContactItem
              label="Notion Resume"
              value="yielding-brick-c96.notion.site"
              subLabel="Dev. YongMin"
              href={profile.resume}
              icon={<span className="text-base">✎</span>}
            />
          </li>
          <li>
            <ContactItem
              label="Portfolio Archive"
              value={profile.portfolio.replace("https://", "")}
              href={profile.portfolio}
              icon={<span className="text-base">◎</span>}
            />
          </li>
        </ul>
      </address>
    </Section>
  );
}
