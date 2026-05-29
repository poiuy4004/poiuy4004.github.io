import { useMemo, useRef, useState, type FormEvent } from "react";

type NameGateFormProps = {
  expectedName: string;
  shake?: boolean;
  igniting?: boolean;
  onMatch: (origin: { x: number; y: number }) => void;
  onWrong: () => void;
};

const RIPPLE_THROTTLE_MS = 50;

export default function NameGateForm({
  expectedName,
  shake,
  igniting,
  onMatch,
  onWrong,
}: NameGateFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [rippleId, setRippleId] = useState(0);
  const lastRippleAtRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const matched = useMemo(
    () => value.trim() === expectedName,
    [value, expectedName],
  );
  const rendered = value.trim() === "" ? `OOO` : value;

  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError(false);
    const now = Date.now();
    if (now - lastRippleAtRef.current >= RIPPLE_THROTTLE_MS) {
      lastRippleAtRef.current = now;
      setRippleId((id) => id + 1);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matched) {
      setError(false);
      const rect = buttonRef.current?.getBoundingClientRect();
      const origin = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      onMatch(origin);
    } else {
      setError(true);
      onWrong();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 flex flex-col gap-4 ${shake ? "animate-shake" : ""}`}
    >
      <label className="sr-only" htmlFor="owner-name">
        포트폴리오 주인의 이름
      </label>
      <div className="relative overflow-hidden rounded-xl">
        <input
          id="owner-name"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="이름을 입력하세요"
          autoComplete="off"
          disabled={igniting}
          className="w-full rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-center text-lg text-neutral-900 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
        />
        {rippleId > 0 && (
          <span
            key={rippleId}
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-purple-400/40 animate-ripple"
          />
        )}
      </div>
      <button
        ref={buttonRef}
        type="submit"
        disabled={igniting || value.trim() === ""}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
      >
        <span>
          <span
            className={
              matched
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-neutral-500 dark:text-neutral-400"
            }
            style={
              igniting
                ? {
                    textShadow: "0 0 24px rgb(168 85 247 / 0.9)",
                    transition: "text-shadow 200ms ease-out",
                  }
                : undefined
            }
          >
            {rendered}
          </span>
          <span>의 포트폴리오 보러가기</span>
        </span>
        <span
          aria-hidden
          className="transition-transform group-hover:enabled:translate-x-0.5"
        >
          →
        </span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${error ? "text-red-500" : "text-transparent"}`}
      >
        이름이 일치하지 않습니다. 다시 시도해 주세요.
      </p>
    </form>
  );
}
