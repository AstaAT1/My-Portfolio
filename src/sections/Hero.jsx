import { lazy, Suspense, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Github, Linkedin, MessageSquare, ArrowDown } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

const ICON_MAP = { github: Github, linkedin: Linkedin, discord: MessageSquare };

// ── Magnetic CTA ─────────────────────────────────────────────────
function MagneticBtn({ children, onClick, filled = false }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const spX = useSpring(x, { stiffness: 280, damping: 22 });
    const spY = useSpring(y, { stiffness: 280, damping: 22 });

    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
    };
    const leave = () => { x.set(0); y.set(0); };

    return (
        <motion.button
            ref={ref} style={{
                x: spX, y: spY,
                ...(filled
                    ? { backgroundColor: "var(--accent)", color: "var(--accent-fg)" }
                    : { border: "1px solid var(--border)", color: "var(--text)", backgroundColor: "transparent" }
                )
            }}
            onMouseMove={move} onMouseLeave={leave}
            onClick={onClick} whileTap={{ scale: 0.96 }}
            className="hero-cta px-7 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80"
        >
            {children}
        </motion.button>
    );
}

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
    const { easterEgg } = useTheme();
    const heroRef = useRef(null);

    // Cinematic GSAP intro timeline
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ctx = gsap.context(() => {
            if (prefersReduced) {
                gsap.set(".hero-cin", { opacity: 1, y: 0, x: 0, skewX: 0 });
                return;
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Phase 1 — badge drops in
            tl.from(".hero-cin-badge", { opacity: 0, y: -16, duration: 0.45 });

            // Phase 2 — photo scales in with spring bounce
            tl.from(".hero-cin-photo", { opacity: 0, scale: 0.75, duration: 0.55 }, "-=0.1");

            // Phase 3 — first name stomps in
            tl.from(".hero-cin-name-0", { opacity: 0, y: 80, skewX: 8, duration: 0.7 }, "-=0.25");

            // Phase 4 — last name slides up lighter
            tl.from(".hero-cin-name-1", { opacity: 0, y: 50, duration: 0.6 }, "-=0.5");

            // Phase 5 — role + bio
            tl.from(".hero-cin-role", { opacity: 0, y: 18, duration: 0.45 }, "-=0.3");
            tl.from(".hero-cin-bio", { opacity: 0, y: 12, stagger: 0.08, duration: 0.4 }, "-=0.2");

            // Phase 6 — terminal chips
            tl.from(".hero-cin-term", { opacity: 0, x: -10, stagger: 0.07, duration: 0.35 }, "-=0.1");

            // Phase 7 — CTAs
            tl.from(".hero-cta", { opacity: 0, y: 8, stagger: 0.07, duration: 0.35 }, "-=0.05");

            // Phase 8 — socials
            tl.from(".hero-cin-social", { opacity: 0, scale: 0.8, stagger: 0.05, duration: 0.3 }, "-=0.1");

            // Post-load: subtle glitch on first name
            tl.to(".hero-cin-name-0", {
                duration: 0.06, skewX: -3, x: -2,
                yoyo: true, repeat: 3,
                ease: "none",
                delay: 0.8,
            });

        }, heroRef);
        return () => ctx.revert();
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    const nameParts = portfolio.profile.name.split(" ");
    const bios = easterEgg ? portfolio.profile.bioChaos : portfolio.profile.bio;
    const status = easterEgg ? portfolio.profile.statusLineChaos : portfolio.profile.statusLine;

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-dvh flex items-center justify-center overflow-hidden px-6 cyber-grid"
            aria-label="Hero"
        >
            {/* 3D canvas */}
            <Suspense fallback={null}>
                <HeroScene />
            </Suspense>

            {/* Radial vignette over the grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 20%, var(--surface) 100%)",
            }} aria-hidden="true" />

            <div className="relative z-10 max-w-3xl mx-auto text-center pt-24 pb-16">

                {/* Status badge */}
                <div className="hero-cin hero-cin-badge mb-7 flex justify-center">
                    <span className="term-chip">
                        <span className="prompt">$</span>
                        <span className="val">{status}</span>
                        <span className="cursor-blink opacity-60">▋</span>
                    </span>
                </div>

                {/* Profile photo */}
                {portfolio.extras.avatarUrl && (
                    <div className="hero-cin hero-cin-photo mx-auto mb-7 w-[88px] h-[88px] rounded-full overflow-hidden ring-1"
                        style={{ boxShadow: "var(--shadow-md)", outlineColor: "var(--border)" }}>
                        <img
                            src={portfolio.extras.avatarUrl}
                            alt={`${portfolio.profile.name} profile photo`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Name — each word is a separate GSAP target */}
                <h1 className="t-display mb-5" aria-label={portfolio.profile.name}>
                    {nameParts.map((part, i) => (
                        <span
                            key={i}
                            className={`hero-cin hero-cin-name-${i} block`}
                            style={{
                                color: i === 0 ? "var(--text)" : "var(--text-muted)",
                                fontWeight: i === 0 ? 700 : 300,
                                lineHeight: 0.95,
                            }}
                        >
                            {part}
                        </span>
                    ))}
                </h1>

                {/* Role */}
                <p className="hero-cin hero-cin-role t-label mb-8" style={{ color: "var(--text-muted)" }}>
                    {portfolio.profile.role}
                    <span style={{ opacity: 0.4 }}> · Morocco</span>
                </p>

                {/* Bio — changes with easter egg */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={easterEgg ? "chaos" : "normal"}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                        className="mb-8 max-w-lg mx-auto space-y-2"
                    >
                        {bios.map((line, i) => (
                            <p key={i} className="hero-cin hero-cin-bio t-body"
                                style={{ color: "var(--text-muted)" }}>
                                {line}
                            </p>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Terminal chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-9">
                    {[
                        { cmd: "whoami", val: portfolio.profile.name },
                        { cmd: "pwd", val: portfolio.profile.location },
                        { cmd: "ls skills", val: Object.keys(portfolio.skills).join("  ") },
                    ].map(({ cmd, val }) => (
                        <span key={cmd} className="hero-cin hero-cin-term term-chip">
                            <span className="prompt">$</span>
                            {cmd}
                            <span style={{ color: "var(--text-subtle)" }}>→</span>
                            <span className="val">{val}</span>
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-9">
                    <MagneticBtn onClick={() => scrollTo("projects")} filled>View Projects</MagneticBtn>
                    <MagneticBtn onClick={() => scrollTo("contact")}>Get in Touch</MagneticBtn>
                </div>

                {/* Social icons */}
                <div className="flex items-center justify-center gap-2">
                    {portfolio.socials.map(({ label, href, icon }) => {
                        const Icon = ICON_MAP[icon];
                        if (!Icon) return null;
                        return (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                aria-label={label}
                                className="hero-cin hero-cin-social p-2.5 rounded-xl border transition-all hover:opacity-60"
                                style={{ color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--surface-2)" }}>
                                <Icon size={15} />
                            </a>
                        );
                    })}
                </div>

                {/* Scroll cue */}
                <motion.button
                    onClick={() => scrollTo("about")}
                    className="flex flex-col items-center gap-1.5 mx-auto mt-12 cursor-pointer"
                    style={{ color: "var(--text-subtle)" }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    aria-label="Scroll to About" tabIndex={-1}
                >
                    <span className="t-label">scroll</span>
                    <ArrowDown size={12} />
                </motion.button>
            </div>
        </section>
    );
}
