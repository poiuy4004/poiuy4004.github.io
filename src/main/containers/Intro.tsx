import IntroAction from "../components/IntroAction";
import IntroAmbient from "../components/IntroAmbient";
import StatBlock from "../components/StatBlock";
import Tag from "../components/Tag";
import { profile } from "../data/profile";
import { introStats } from "../data/stats";

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative scroll-mt-28 overflow-hidden px-6 pt-20 pb-12 md:scroll-mt-20 md:pt-28 md:pb-16"
    >
      <IntroAmbient />
      <div className="relative mx-auto max-w-5xl text-left">
        <div className="flex flex-col items-start gap-3">
          <div className="animate-rise" style={{ animationDelay: "100ms" }}>
            <Tag variant="accent">
              {profile.yearsOfExperience} · {profile.role}
            </Tag>
          </div>
          <h1
            className="!mt-0 !mb-0 !text-5xl !leading-tight animate-rise md:!text-6xl"
            style={{ animationDelay: "200ms" }}
          >
            안녕하세요, <br />
            <span className="text-purple-500">{profile.name}</span> 입니다.
          </h1>
          <p
            className="mt-2 max-w-2xl text-lg text-neutral-600 animate-rise dark:text-neutral-300"
            style={{ animationDelay: "350ms" }}
          >
            {profile.tagline}
          </p>
          <p
            className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-500 animate-rise dark:text-neutral-400"
            style={{ animationDelay: "500ms" }}
          >
            {profile.summary}
          </p>
        </div>
        <div
          className="mt-10 grid grid-cols-2 gap-3 animate-rise sm:grid-cols-4"
          style={{ animationDelay: "650ms" }}
        >
          {introStats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </div>
        <div
          className="mt-8 flex flex-wrap items-center gap-3 animate-rise"
          style={{ animationDelay: "800ms" }}
        >
          <IntroAction href="#contact" variant="primary" trailing="→">
            연락하기
          </IntroAction>
          <IntroAction href="#projects">프로젝트 보기</IntroAction>
          {/* <IntroAction href={profile.resume} external trailing="↗">
            Notion Resume
          </IntroAction> */}
        </div>
      </div>
    </section>
  );
}
