import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../main/components/ThemeToggle";
import { openGate } from "../main/auth/gate";
import { usePointerTilt } from "../main/hooks/usePointerTilt";
import ConstellationCanvas from "./ConstellationCanvas";
import IgniteOverlay from "./IgniteOverlay";
import MeshBackground from "./MeshBackground";
import MouseGlow from "./MouseGlow";
import NameGateForm from "./NameGateForm";

type Phase = "entering" | "idle" | "error" | "igniting" | "transitioning";

const ERROR_RESET_MS = 1200;
const IGNITE_TO_OPEN_MS = 1000;
const TITLE = "누굴 만나러 오셨나요?";
const TITLE_BASE_DELAY = 350;
const TITLE_CHAR_STEP = 45;

/**
 * Full-screen gate overlay. The portfolio itself stays mounted underneath so
 * that crawlers (and anyone with JS disabled) still see the real content —
 * this layer is a presentation choice, not an access control.
 */
export default function NameGate() {
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

  // Lock the page behind the overlay so it can't be scrolled while gated.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
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
    setIgniteOrigin(origin);
    setPhase("igniting");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wait = reduced ? 250 : IGNITE_TO_OPEN_MS;
    const t = window.setTimeout(() => {
      setPhase("transitioning");
      // openGate() unmounts this overlay, so it runs only once the bloom has
      // covered the viewport.
      const t2 = window.setTimeout(() => openGate(), 200);
      igniteTimeoutsRef.current.push(t2);
    }, wait);
    igniteTimeoutsRef.current.push(t);
  };

  const igniting = phase === "igniting" || phase === "transitioning";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white px-6 py-20 print:hidden dark:bg-neutral-950"
    >
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
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500 animate-rise dark:text-neutral-400"
          style={{ animationDelay: "200ms" }}
        >
          Welcome
        </p>
        <h1
          id="gate-title"
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
          className="text-base text-neutral-600 animate-rise dark:text-neutral-300"
          style={{ animationDelay: "600ms" }}
        >
          포트폴리오 주인의 이름을 알아맞히면 입장할 수 있어요.
        </p>
        <div className="animate-rise" style={{ animationDelay: "800ms" }}>
          <NameGateForm
            shake={phase === "error"}
            igniting={igniting}
            onMatch={handleMatch}
            onWrong={handleWrong}
          />
        </div>
      </div>
    </div>
  );
}
