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

export default function Main() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white text-left animate-fade-in dark:bg-neutral-950">
      <a
        href="#intro"
        className="sr-only rounded-lg bg-purple-600 px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        본문으로 건너뛰기
      </a>
      <ScrollProgress />
      <Header />
      <main id="content" className="flex-1">
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
