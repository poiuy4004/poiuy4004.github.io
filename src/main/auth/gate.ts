const STORAGE_KEY = "gate-open";

export function isGateOpen(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function openGate(): void {
  window.sessionStorage.setItem(STORAGE_KEY, "1");
}
