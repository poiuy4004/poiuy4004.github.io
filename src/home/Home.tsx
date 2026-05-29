import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { openGate } from "../main/auth/gate";
import ThemeToggle from "../main/components/ThemeToggle";
import { usePageMeta } from "../main/hooks/usePageMeta";

const OWNER_NAME = "장용민";

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const matched = useMemo(() => value.trim() === OWNER_NAME, [value]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (matched) {
      setError(false);
      openGate();
      navigate("/main");
    } else {
      setError(true);
    }
  };

  const rendered = value.trim() === "" ? `{포트폴리오 주인의 이름}` : value;

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="absolute right-6 top-6">
        <ThemeToggle size="sm" />
      </div>
      <div className="w-full max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          정확한 이름을 입력해 주세요
        </h1>
        <p className="text-base text-neutral-500 dark:text-neutral-400">
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <label className="sr-only" htmlFor="owner-name">
            포트폴리오 주인의 이름
          </label>
          <input
            id="owner-name"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder="이름을 입력하세요"
            autoComplete="off"
            className="w-full rounded-xl border border-neutral-300 bg-white/60 px-5 py-3 text-center text-lg text-neutral-900 outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-100"
          />

          <button
            type="submit"
            disabled={!matched}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/50 bg-purple-500/10 px-6 py-3 text-lg font-medium text-purple-700 transition hover:enabled:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:text-purple-300"
          >
            <span>
              <span
                className={
                  matched
                    ? "font-semibold text-purple-700 dark:text-purple-300"
                    : "text-neutral-500 dark:text-neutral-400"
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
            className={`min-h-5 text-sm ${
              error
                ? "text-red-500"
                : "text-transparent"
            }`}
          >
            이름이 일치하지 않습니다. 다시 시도해 주세요.
          </p>
        </form>
      </div>
    </main>
  );
}
