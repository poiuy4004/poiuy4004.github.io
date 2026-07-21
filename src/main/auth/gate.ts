import { useSyncExternalStore } from "react";

const STORAGE_KEY = "gate-open";

const listeners = new Set<() => void>();

function readStored(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private mode / blocked storage — fall back to the in-memory flag.
    return false;
  }
}

let opened = typeof window === "undefined" ? false : readStored();

export function openGate(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable: the visitor still gets in for this page view,
    // they just have to pass the gate again on the next one.
  }
  opened = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): boolean {
  return opened;
}

export function useGateOpen(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
