import { periodToISO } from "../utils/date";
import { careers } from "./career";
import { profile } from "./profile";
import { projects } from "./projects";
import { skillGroups } from "./skills";

export const SITE_URL = "https://poiuy4004.github.io";

const OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * JSON-LD is derived from the same data the page renders, and injected into
 * index.html at build time (see the `structured-data` plugin in vite.config.ts).
 * That keeps the markup in sync with the portfolio without duplicating it by
 * hand, and keeps it in the served HTML rather than behind JS.
 */
export function buildStructuredData(): object[] {
  const skillNames = skillGroups.flatMap((group) =>
    group.skills.map((skill) => skill.name),
  );

  const current = careers.find((career) => career.current);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.englishName,
    jobTitle: profile.role,
    description: profile.summary,
    url: `${SITE_URL}/`,
    image: OG_IMAGE,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
    sameAs: [profile.github, profile.resume],
    knowsAbout: skillNames,
    knowsLanguage: [
      { "@type": "Language", name: "Korean", alternateName: "ko" },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: profile.role,
      occupationalCategory: "15-1252.00", // O*NET: Software Developers
      skills: skillNames.join(", "),
    },
    ...(current
      ? {
          worksFor: {
            "@type": "Organization",
            name: current.company,
          },
        }
      : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name}의 포트폴리오`,
    alternateName: `${profile.englishName} Portfolio`,
    url: `${SITE_URL}/`,
    inLanguage: "ko-KR",
    author: { "@type": "Person", name: profile.name },
  };

  const projectList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${profile.name}의 프로젝트`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        dateCreated: periodToISO(project.period),
        creator: { "@type": "Person", name: profile.name },
        keywords: project.stack.join(", "),
        ...(project.links?.[0] ? { url: project.links[0].href } : {}),
      },
    })),
  };

  return [person, website, projectList];
}
