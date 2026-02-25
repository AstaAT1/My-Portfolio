import { motion } from "framer-motion";
import { ShieldCheck, Zap, MapPin, Github, Linkedin, MessageSquare } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useScrollspy } from "../hooks/useScrollspy";
import { portfolio } from "../data/portfolio";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const ICON_MAP = { github: Github, linkedin: Linkedin, discord: MessageSquare };

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const formatIndex = (i) => String(i).padStart(2, "0");

export default function Sidebar() {
  const { easterEgg, toggleEasterEgg } = useTheme();
  const active = useScrollspy(NAV_LINKS.map((l) => l.id));
  const [first, last] = portfolio.profile.name.split(" ");

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ padding: "1.75rem 1.5rem" }}>
      {/* Profile photo */}
      {portfolio.extras.avatarUrl && (
        <div className="mb-5 flex justify-center">
          <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
            <img
              src={portfolio.extras.avatarUrl}
              alt={`${portfolio.profile.name} profile photo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Name — clicking toggles easter egg */}
      <div className="text-center mb-1">
        <motion.button
          onClick={toggleEasterEgg}
          whileTap={{ scale: 0.93, rotate: easterEgg ? -3 : 3 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="t-mono font-bold cursor-pointer select-none text-center"
          style={{ fontSize: "0.95rem", color: "var(--text)" }}
          aria-label="Toggle easter egg / chaos mode"
          title={easterEgg ? "Back to secure mode" : "Try clicking..."}
        >
          {first?.toLowerCase()}
          <span style={{ opacity: 0.3 }}>.</span>
          {last?.toLowerCase()}
        </motion.button>
      </div>

      {/* Role */}
      <p className="t-label text-center mb-1" style={{ color: "var(--text-muted)" }}>
        {portfolio.profile.role}
      </p>

      {/* Location */}
      <p
        className="t-small flex items-center justify-center gap-1 mb-4"
        style={{ color: "var(--text-subtle)", fontFamily: "monospace" }}
      >
        <MapPin size={11} /> {portfolio.profile.location}
      </p>

      {/* Secure / Chaos mode indicator */}
      <div className="flex justify-center mb-5">
        <motion.div
          key={easterEgg ? "chaos" : "secure"}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="term-chip"
          style={{ fontSize: "0.58rem" }}
        >
          {easterEgg ? (
            <>
              <Zap size={9} className="inline-block mr-1" />
              chaos mode
            </>
          ) : (
            <>
              <ShieldCheck size={9} className="inline-block mr-1" />
              secured
            </>
          )}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mb-5" style={{ height: "1px", backgroundColor: "var(--border)" }} />

      {/* Nav links */}
      <nav aria-label="Sidebar navigation" className="flex-1">
        <ul className="space-y-0.5">
          {NAV_LINKS.map(({ label, id }, i) => {
            const isActive = active === id;

            return (
              <li key={id} className="relative">
                <button
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer text-sm"
                  style={{
                    color: isActive ? "var(--text)" : "var(--text-muted)",
                    backgroundColor: isActive ? "var(--surface-2)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-indicator"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                      style={{ backgroundColor: "var(--text)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    className="t-mono text-[10px]"
                    style={{ color: isActive ? "var(--text)" : "var(--text-subtle)" }}
                  >
                    {formatIndex(i)}/
                  </span>

                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="mt-5 mb-5" style={{ height: "1px", backgroundColor: "var(--border)" }} />

      {/* Socials */}
      <div className="flex justify-center gap-2 mb-5">
        {portfolio.socials.map(({ label, href, icon }) => {
          const Icon = ICON_MAP[icon];
          if (!Icon) return null;

          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg border transition-opacity hover:opacity-60"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              <Icon size={14} />
            </a>
          );
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => scrollTo("projects")}
          className="w-full py-2.5 rounded-xl text-xs font-semibold t-mono transition-opacity hover:opacity-80 cursor-pointer"
          style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
        >
          View Projects
        </button>

        <button
          onClick={() => scrollTo("contact")}
          className="w-full py-2.5 rounded-xl text-xs font-semibold t-mono border transition-opacity hover:opacity-70 cursor-pointer"
          style={{
            color: "var(--text)",
            borderColor: "var(--border)",
            backgroundColor: "transparent",
          }}
        >
          Get in Touch
        </button>
      </div>

      {/* Available status */}
      <p className="t-label text-center mt-4" style={{ color: "var(--text-subtle)" }}>
        {easterEgg ? portfolio.profile.statusLineChaos : portfolio.profile.statusLine}
      </p>
    </div>
  );
}
