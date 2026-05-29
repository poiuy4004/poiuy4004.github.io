import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../main/components/ThemeToggle";
import { openGate } from "../main/auth/gate";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import { usePointerTilt } from "../main/hooks/usePointerTilt";
import ConstellationCanvas from "./ConstellationCanvas";
import IgniteOverlay from "./IgniteOverlay";
import MeshBackground from "./MeshBackground";
import MouseGlow from "./MouseGlow";
import NameGateForm from "./NameGateForm";

type Phase = "entering" | "idle" | "error" | "igniting" | "transitioning";

const ERROR_RESET_MS = 1200;
const IGNITE_TO_NAVIGATE_MS = 1000;
const TITLE = "누굴 만나러 오셨나요?";
const TITLE_BASE_DELAY = 350;
const TITLE_CHAR_STEP = 45;

export default function Home() {
  usePageMeta({
    title: "장용민의 포트폴리오 | Developer",
    description:
      "4년 10개월 차 개발자 장용민의 포트폴리오. 기획·디자인·프론트엔드·백엔드·배포·SEO까지 AtoZ로 다뤄 온 경험과 React, Next.js, React Native 기반 프로젝트를 소개합니다.",
    canonicalPath: "/",
  });

  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("entering");
  const [errorVersion, setErrorVersion] = useState(0);
  const [igniteOrigin, setIgniteOrigin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const igniteTimeoutsRef = useRef<number[]>([]);
  const { enabled: tiltEnabled, ref: tiltRef, handlers: tiltHandlers } =
    usePointerTilt(5);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("idle"), 1000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const igniteTimeouts = igniteTimeoutsRef.current;
    return () => {
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
      igniteTimeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleWrong = () => {
    setPhase("error");
    setErrorVersion((v) => v + 1);
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setPhase("idle");
      errorTimeoutRef.current = null;
    }, ERROR_RESET_MS);
  };

  const handleMatch = (origin: { x: number; y: number }) => {
    openGate();
    setIgniteOrigin(origin);
    setPhase("igniting");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wait = reduced ? 250 : IGNITE_TO_NAVIGATE_MS;
    const t = window.setTimeout(() => {
      setPhase("transitioning");
      const t2 = window.setTimeout(() => navigate("/main"), 200);
      igniteTimeoutsRef.current.push(t2);
    }, wait);
    igniteTimeoutsRef.current.push(t);
  };

  const igniting = phase === "igniting" || phase === "transitioning";

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
      <ConstellationCanvas />
      <MouseGlow />
      <div className="absolute right-6 top-6 z-40">
        <ThemeToggle size="sm" />
      </div>

      {phase === "error" && (
        <div
          key={errorVersion}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-20 animate-vignette-flash"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(239,68,68,0.15) 100%)",
          }}
        />
      )}

      {igniting && igniteOrigin && (
        <>
          <IgniteOverlay originX={igniteOrigin.x} originY={igniteOrigin.y} />
          <span
            aria-hidden
            className="pointer-events-none fixed z-40 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-300 animate-shockwave"
            style={{ left: igniteOrigin.x, top: igniteOrigin.y }}
          />
        </>
      )}

      <div
        ref={tiltEnabled ? (tiltRef as React.Ref<HTMLDivElement & HTMLElement>) : undefined}
        {...(tiltEnabled ? tiltHandlers : {})}
        className="relative z-20 w-full max-w-xl text-center [transform-style:preserve-3d] [transition:transform_400ms_cubic-bezier(0.25,0.4,0.25,1)]"
      >
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 animate-rise dark:text-neutral-500"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1
          className={`!mt-0 !mb-2 !text-4xl md:!text-5xl ${phase === "error" ? "animate-glitch" : ""}`}
        >
          <span className="inline-block align-bottom" style={{ paddingBottom: "0.15em" }}>
            {TITLE.split("").map((ch, i) => (
              <span
                key={i}
                className="aurora-char inline-block"
                style={{
                  animationDelay: `${TITLE_BASE_DELAY + i * TITLE_CHAR_STEP}ms`,
                  whiteSpace: ch === " " ? "pre" : undefined,
                }}
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>
        <p
          className="text-base text-neutral-500 animate-rise dark:text-neutral-400"
          style={{ animationDelay: "600ms" }}
        >
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <div className="animate-rise" style={{ animationDelay: "800ms" }}>
          <NameGateForm
            expectedName={profile.name}
            shake={phase === "error"}
            igniting={igniting}
            onMatch={handleMatch}
            onWrong={handleWrong}
          />
        </div>
      </div>
    </main>
  );
}
