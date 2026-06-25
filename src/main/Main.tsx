import Footer from "../components/Footer";
import Header from "../components/Header";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import About from "./containers/About";
import Career from "./containers/Career";
import Contact from "./containers/Contact";
import Intro from "./containers/Intro";
import Projects from "./containers/Projects";
import Skills from "./containers/Skills";
import Strengths from "./containers/Strengths";
import { usePageMeta } from "./hooks/usePageMeta";

export default function Main() {
  usePageMeta({
    title: "장용민 — 4년 10개월 차 Developer 포트폴리오",
    description:
      "장용민의 경력, 프로젝트, 기술 스택, 가치관을 한 자리에 모은 포트폴리오. React·Next.js·React Native 기반 웹·앱 출시 경험과 RAG·파인튜닝 기반 AI 루프 설계, AtoZ 1인 개발 사례를 확인할 수 있습니다.",
    canonicalPath: "/main",
  });

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white text-left animate-fade-in dark:bg-neutral-950">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Intro />
        <About />
        <Strengths />
        <Skills />
        <Career />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
