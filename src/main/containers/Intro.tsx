import StatBlock from "../components/StatBlock";
import Tag from "../components/Tag";
import { profile } from "../data/profile";

export default function Intro() {
  return (
    <section
      id="intro"
      className="scroll-mt-20 px-6 pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="mx-auto max-w-5xl text-left">
        <div className="flex flex-col items-start gap-3">
          <Tag variant="accent">
            {profile.yearsOfExperience} · {profile.role}
          </Tag>
          <h1 className="!mt-0 !mb-0 !text-5xl !leading-tight md:!text-6xl">
            안녕하세요, <br />
            <span className="text-purple-500">{profile.name}</span> 입니다.
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
            {profile.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
            {profile.summary}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatBlock value={profile.yearsOfExperience} label="실무 경력" />
          <StatBlock value="5+" label="소속·계약 회사" />
          <StatBlock value="8+" label="배포까지 완수한 프로젝트" />
          <StatBlock value="3" label="App Store 출시 앱" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-purple-600"
          >
            연락하기 <span aria-hidden>→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-200"
          >
            프로젝트 보기
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-purple-300 hover:text-purple-600 dark:border-neutral-700 dark:text-neutral-200"
          >
            Notion Resume <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
