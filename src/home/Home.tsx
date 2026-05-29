import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../main/components/ThemeToggle";
import { openGate } from "../main/auth/gate";
import { profile } from "../main/data/profile";
import { usePageMeta } from "../main/hooks/usePageMeta";
import IgniteOverlay from "./IgniteOverlay";
import MeshBackground from "./MeshBackground";
import MouseGlow from "./MouseGlow";
import NameGateForm from "./NameGateForm";

type Phase = "entering" | "idle" | "error" | "igniting" | "transitioning";

const ERROR_RESET_MS = 1200;
const IGNITE_TO_NAVIGATE_MS = 1000;

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

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      <MeshBackground />
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

      {(phase === "igniting" || phase === "transitioning") && igniteOrigin && (
        <IgniteOverlay originX={igniteOrigin.x} originY={igniteOrigin.y} />
      )}

      <div className="relative z-20 w-full max-w-xl text-center">
        <p
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400 animate-rise dark:text-neutral-500"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1 className="!mt-0 !mb-2 !text-4xl md:!text-5xl">
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.15em" }}
          >
            <span
              className="inline-block animate-mask-reveal"
              style={{ animationDelay: "350ms", transform: "translateY(100%)" }}
            >
              누굴 만나러 오셨나요?
            </span>
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
            igniting={phase === "igniting" || phase === "transitioning"}
            onMatch={handleMatch}
            onWrong={handleWrong}
          />
        </div>
      </div>
    </main>
  );
}
