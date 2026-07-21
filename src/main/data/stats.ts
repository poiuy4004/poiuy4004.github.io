import { careers, type CareerItem } from "./career.ts";
import { profile } from "./profile.ts";
import { projects, type Project } from "./projects.ts";

const STORE_HOSTS = ["apps.apple.com", "play.google.com"];

export function isStoreLink(href: string): boolean {
  return STORE_HOSTS.some((host) => href.includes(host));
}

/** The same company appearing twice in the timeline counts once. */
export function countCompanies(items: CareerItem[]): number {
  return new Set(items.map((item) => item.company)).size;
}

/** Projects that actually shipped to Google Play or the App Store. */
export function countStoreApps(items: Project[]): number {
  return items.filter((project) =>
    project.links?.some((link) => isStoreLink(link.href)),
  ).length;
}

export type Stat = {
  value: string;
  label: string;
};

/**
 * Derived from the career and project data rather than hand-written, so the
 * headline numbers can't drift as entries are added.
 */
export const introStats: Stat[] = [
  { value: profile.yearsOfExperience, label: "실무 경력" },
  { value: String(countCompanies(careers)), label: "소속·계약 회사" },
  { value: String(projects.length), label: "배포까지 완수한 프로젝트" },
  { value: String(countStoreApps(projects)), label: "스토어 출시 앱" },
];
