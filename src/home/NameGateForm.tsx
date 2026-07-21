import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { isOwnerName, nameProgress } from "../main/auth/ownerName";

type NameGateFormProps = {
  shake?: boolean;
  igniting?: boolean;
  onMatch: (origin: { x: number; y: number }) => void;
  onWrong: () => void;
};

const RIPPLE_THROTTLE_MS = 50;
const MAGNET_STRENGTH = 0.3; // how strongly the button leans toward the cursor

export default function NameGateForm({
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
  const magnetRafRef = useRef(0);

  const matched = useMemo(() => isOwnerName(value), [value]);
  const progress = useMemo(() => nameProgress(value), [value]);

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

  const handleButtonMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn || igniting) return;
    const rect = btn.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (!magnetRafRef.current) {
      magnetRafRef.current = window.requestAnimationFrame(() => {
        const dx = (mx - rect.width / 2) * MAGNET_STRENGTH;
        const dy = (my - rect.height / 2) * MAGNET_STRENGTH;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
        btn.style.setProperty("--mx", `${mx}px`);
        btn.style.setProperty("--my", `${my}px`);
        btn.style.setProperty("--spot", "1");
        magnetRafRef.current = 0;
      });
    }
  };

  const handleButtonLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (magnetRafRef.current) {
      window.cancelAnimationFrame(magnetRafRef.current);
      magnetRafRef.current = 0;
    }
    btn.style.transform = "";
    btn.style.setProperty("--spot", "0");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 flex flex-col gap-4 ${shake ? "animate-shake" : ""}`}
    >
      <label className="sr-only" htmlFor="owner-name">
        포트폴리오 주인의 이름
      </label>
      <div
        className="relative overflow-hidden rounded-xl transition-shadow duration-300"
        style={{
          boxShadow:
            progress > 0
              ? `0 0 ${8 + progress * 28}px rgba(168,85,247,${0.15 + progress * 0.5})`
              : undefined,
        }}
      >
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
        {/* energy fill that rises from the bottom as the name matches */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 origin-bottom bg-gradient-to-t from-purple-500/25 to-transparent transition-[height] duration-300"
          style={{ height: `${progress * 100}%` }}
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
        onMouseMove={handleButtonMove}
        onMouseLeave={handleButtonLeave}
        className="group btn-spotlight relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition-[background-color,transform] duration-200 hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
      >
        <span className="relative z-10">
          <span
            className={
              matched
                ? "font-semibold text-purple-700 dark:text-purple-300"
                : "text-neutral-600 dark:text-neutral-300"
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
          className="relative z-10 transition-transform group-hover:enabled:translate-x-0.5"
        >
          →
        </span>
      </button>
      {/* Rendered empty rather than transparent so screen readers don't
          announce a failure that hasn't happened yet. */}
      <p
        role="status"
        aria-live="polite"
        className="min-h-5 text-sm text-red-600 dark:text-red-400"
      >
        {error ? "이름이 일치하지 않습니다. 다시 시도해 주세요." : ""}
      </p>
    </form>
  );
}
