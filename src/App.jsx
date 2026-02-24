import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useLenis } from "./hooks/useLenis";

function AppInner() {
  useLenis(); // Smooth scroll (Lenis + GSAP ticker, respects reduced motion)

  return (
    // pt-14 = height of Navbar (56px)
    <div className="flex pt-14 min-h-dvh" style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}>

      {/* ── Sticky left sidebar — desktop lg+ only ── */}
      <aside
        className="hidden lg:block flex-shrink-0 border-r"
        style={{ width: "17rem", borderColor: "var(--border)" }}
        aria-label="Profile sidebar"
      >
        <div
          className="sticky"
          style={{ top: "56px", height: "calc(100dvh - 56px)" }}
        >
          <Sidebar />
        </div>
      </aside>

      {/* ── Main scrollable content ── */}
      <main id="main-content" className="flex-1 min-w-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {/* Preloader blocks content until boot sequence finishes */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Navbar stays fixed on top for all screen sizes */}
      <Navbar />

      {/* Main content — hidden until loaded, prevents layout shift */}
      <div style={{ visibility: loaded ? "visible" : "hidden", opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <AppInner />
      </div>
    </ThemeProvider>
  );
}