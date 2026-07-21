import assert from "node:assert/strict";
import { test } from "node:test";
import { periodToISO } from "./date.ts";

test("periodToISO: 시작 연월을 ISO 형태로 변환한다", () => {
  assert.equal(periodToISO("2024.05 — 2024.07"), "2024-05");
});

test("periodToISO: 한 자리 월을 0으로 채운다", () => {
  assert.equal(periodToISO("2026.6"), "2026-06");
});

test("periodToISO: 진행 중인 기간도 시작 연월을 반환한다", () => {
  assert.equal(periodToISO("2026.06 — 재직 중"), "2026-06");
});

test("periodToISO: 연월이 없으면 undefined", () => {
  assert.equal(periodToISO("재직 중"), undefined);
});
