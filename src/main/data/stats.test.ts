import assert from "node:assert/strict";
import { test } from "node:test";
import type { CareerItem } from "./career.ts";
import type { Project } from "./projects.ts";
import { countCompanies, countStoreApps, introStats, isStoreLink } from "./stats.ts";

function career(company: string): CareerItem {
  return {
    company,
    position: "Developer",
    employmentType: "정규직",
    period: "2025.01 — 2025.02",
    description: "",
    achievements: [],
    stack: [],
  };
}

function project(links?: { label: string; href: string }[]): Project {
  return {
    title: `p-${links?.length ?? 0}-${Math.random()}`,
    company: "c",
    period: "2025.01",
    role: "r",
    summary: "s",
    highlights: [],
    stack: [],
    links,
  };
}

test("isStoreLink: 앱 스토어 링크만 인정한다", () => {
  assert.equal(isStoreLink("https://apps.apple.com/kr/app/x/id1"), true);
  assert.equal(isStoreLink("https://play.google.com/store/apps/details?id=x"), true);
  assert.equal(isStoreLink("https://example.com/"), false);
});

test("countCompanies: 중복 회사를 한 번만 센다", () => {
  const items = [career("A"), career("B"), career("A")];
  assert.equal(countCompanies(items), 2);
});

test("countStoreApps: 스토어 링크가 있는 프로젝트만 센다", () => {
  const items = [
    project([{ label: "iOS", href: "https://apps.apple.com/kr/app/x/id1" }]),
    project([{ label: "Web", href: "https://example.com/" }]),
    project(),
  ];
  assert.equal(countStoreApps(items), 1);
});

test("countStoreApps: 한 프로젝트의 양대 마켓 링크는 하나로 센다", () => {
  const items = [
    project([
      { label: "iOS", href: "https://apps.apple.com/kr/app/x/id1" },
      { label: "Android", href: "https://play.google.com/store/apps/details?id=x" },
    ]),
  ];
  assert.equal(countStoreApps(items), 1);
});

test("introStats: 실제 데이터에서 4개 지표가 모두 채워진다", () => {
  assert.equal(introStats.length, 4);
  for (const stat of introStats) {
    assert.ok(stat.value.length > 0, `${stat.label} 값이 비어 있음`);
    assert.ok(stat.label.length > 0);
  }
});
