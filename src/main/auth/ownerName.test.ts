import assert from "node:assert/strict";
import { test } from "node:test";
import { isOwnerName, nameProgress } from "./ownerName.ts";

test("isOwnerName: 한글 본명을 허용한다", () => {
  assert.equal(isOwnerName("장용민"), true);
});

test("isOwnerName: 앞뒤 공백을 무시한다", () => {
  assert.equal(isOwnerName("  장용민  "), true);
});

test("isOwnerName: 이름만 입력해도 허용한다", () => {
  assert.equal(isOwnerName("용민"), true);
});

test("isOwnerName: 로마자 표기를 대소문자·공백 무관하게 허용한다", () => {
  assert.equal(isOwnerName("Yongmin Jang"), true);
  assert.equal(isOwnerName("yongminjang"), true);
  assert.equal(isOwnerName("JANG YONGMIN"), true);
});

test("isOwnerName: 빈 문자열과 오답은 거부한다", () => {
  assert.equal(isOwnerName(""), false);
  assert.equal(isOwnerName("   "), false);
  assert.equal(isOwnerName("홍길동"), false);
});

test("nameProgress: 접두사가 일치하는 만큼 0~1로 반환한다", () => {
  assert.equal(nameProgress(""), 0);
  assert.equal(nameProgress("장"), 1 / 3);
  assert.equal(nameProgress("장용"), 2 / 3);
  assert.equal(nameProgress("장용민"), 1);
});

test("nameProgress: 첫 글자가 다르면 0", () => {
  assert.equal(nameProgress("홍길동"), 0);
});

test("nameProgress: 정답보다 길어도 1을 넘지 않는다", () => {
  assert.equal(nameProgress("장용민입니다"), 1);
});
