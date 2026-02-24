import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, Sun, Moon, ShieldCheck, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useScrollspy } from "../hooks/useScrollspy";
import { portfolio } from "../data/portfolio";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "./ui/sheet";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const { dark, setDark, easterEgg, toggleEasterEgg } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollspy(NAV_LINKS.map((l) => l.id));

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const [first, last] = portfolio.profile.name.split(" ");

  return (
    <>
      {/* Progress bar — fixed at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, backgroundColor: "var(--text)" }}
        aria-hidden="true"
      />

      <header
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--surface) 80%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14"
          aria-label="Main navigation"
        >
          {/* Wordmark — easter egg trigger */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggleEasterEgg}
              whileTap={{ scale: 0.9, rotate: easterEgg ? -4 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="t-small t-mono font-semibold cursor-pointer select-none"
              style={{ color: "var(--text)" }}
              aria-label="Toggle easter egg / chaos mode"
              title={easterEgg ? "Back to secure mode" : "Try clicking..."}
            >
              {first?.toLowerCase()}
              <span style={{ opacity: 0.3 }}>.</span>
              {last?.toLowerCase()}
            </motion.button>

            {/* Secure / Chaos mode indicator */}
            <motion.div
              key={easterEgg ? "chaos" : "secure"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="term-chip"
              style={{ fontSize: "0.58rem", padding: "0.18rem 0.5rem" }}
            >
              {easterEgg
                ? <><Zap size={9} className="inline-block mr-1" />chaos</>
                : <><ShieldCheck size={9} className="inline-block mr-1" />secured</>
              }
            </motion.div>
          </div>

          {/* Desktop nav — hidden on lg+ because sidebar takes over */}
          <ul className="hidden md:flex lg:hidden items-center gap-0.5" role="list">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  <button
                    onClick={() => scrollTo(id)}
                    aria-current={isActive ? "page" : undefined}
                    className="relative px-3 py-1.5 t-small cursor-pointer transition-colors duration-150"
                    style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-px"
                        style={{ backgroundColor: "var(--text)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="t-mono t-small text-left">
                    {first?.toLowerCase()}.{last?.toLowerCase()}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-0.5 px-6 pt-4" aria-label="Mobile navigation">
                  {NAV_LINKS.map(({ label, id }) => (
                    <SheetClose key={id} asChild>
                      <button
                        onClick={() => scrollTo(id)}
                        className="text-left t-small py-3 border-b cursor-pointer transition-colors"
                        style={{
                          color: active === id ? "var(--text)" : "var(--text-muted)",
                          borderColor: "var(--border-subtle)",
                          fontWeight: active === id ? 600 : 400,
                        }}
                      >
                        {label}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}