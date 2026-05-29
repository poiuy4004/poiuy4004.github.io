import { useSyncExternalStore } from "react";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme-preference";

const listeners = new Set<() => void>();

function readStored(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : "system";
}

function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(pref: ThemePreference) {
  if (typeof document === "undefined") return;
  const isDark = pref === "dark" || (pref === "system" && prefersDark());
  document.documentElement.classList.toggle("dark", isDark);
}

function setThemePreference(pref: ThemePreference) {
  window.localStorage.setItem(STORAGE_KEY, pref);
  applyTheme(pref);
  listeners.forEach((l) => l());
}

export function initTheme() {
  if (typeof window === "undefined") return;
  applyTheme(readStored());
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (readStored() === "system") applyTheme("system");
    });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useTheme() {
  const preference = useSyncExternalStore(
    subscribe,
    readStored,
    () => "system" as ThemePreference,
  );
  return { preference, setPreference: setThemePreference };
}
