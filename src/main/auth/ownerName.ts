import { profile } from "../data/profile.ts";

/**
 * Accepted answers for the gate. The portfolio is shared with people who may
 * know the owner by the Korean name, the given name alone, or the romanised
 * form in either order — all of them should get in.
 */
const ALIASES: string[] = [
  profile.name, // 장용민
  profile.englishName, // Yongmin Jang
  "용민",
  "Jang Yongmin",
];

/** Case-insensitive, whitespace-insensitive so "yong min jang" still matches. */
function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

const NORMALIZED_ALIASES = new Set(ALIASES.map(normalize));

export function isOwnerName(input: string): boolean {
  const normalized = normalize(input);
  return normalized !== "" && NORMALIZED_ALIASES.has(normalized);
}

/**
 * How far `input` matches the primary name as a leading prefix (0–1).
 * Drives the gate's "charging" visual, so it intentionally tracks only the
 * Korean name rather than every alias.
 */
export function nameProgress(input: string): number {
  const value = input.trim();
  if (value === "") return 0;
  const target = profile.name;
  let i = 0;
  while (i < value.length && i < target.length && value[i] === target[i]) {
    i++;
  }
  return Math.min(i / target.length, 1);
}
