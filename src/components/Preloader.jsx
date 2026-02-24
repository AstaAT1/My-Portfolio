import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { portfolio } from "../data/portfolio";

const [fn, ln] = portfolio.profile.name.toLowerCase().split(" ");
const WORDMARK = `${fn}.${ln}`;

const BOOT_LINES = [
    "[  OK  ] Initializing portfolio kernel         v1.0",
    `[  OK  ] Loading identity: ${portfolio.profile.name}`,
    "[  OK  ] Mounting skill_tree...",
    "[  OK  ] Starting animation_daemon...",
    "[  OK  ] Scanning attack surface... (none found)",
    "[  OK  ] All systems operational. Welcome.",
];

/**
 * Preloader — cinematic boot sequence.
 * Calls onComplete() when animation finishes.
 * Skips immediately if user prefers reduced motion.
 */
export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState([]);
    const [done, setDone] = useState(false);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) { onComplete(); return; }

        // GSAP drives the progress number for smooth counting
        const prog = { val: 0 };
        gsap.to(prog, {
            val: 100,
            duration: 2.4,
            ease: "power1.inOut",
            onUpdate: () => setProgress(Math.round(prog.val)),
            onComplete: () => {
                setDone(true);
                setTimeout(() => setExit(true), 500);
                setTimeout(() => onComplete(), 1200);
            },
        });

        // Boot lines appear during the load
        BOOT_LINES.forEach((line, i) => {
            setTimeout(() => setVisibleLines((prev) => [...prev, line]), i * 340 + 150);
        });

        return () => gsap.killTweensOf(prog);
    }, []);

    return (
        <AnimatePresence>
            {!exit && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cyber-grid overflow-hidden"
                    style={{ backgroundColor: "var(--surface)" }}
                    exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Radial vignette — keeps focus on center */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 30%, var(--surface) 100%)",
                    }} aria-hidden="true" />

                    <div className="relative z-10 w-full max-w-sm px-6">
                        {/* Wordmark */}
                        <motion.p
                            animate={done ? { x: [0, -3, 3, -1, 1, 0], transition: { duration: 0.3 } } : {}}
                            className="t-mono font-bold text-center mb-1"
                            style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)", color: "var(--text)" }}
                        >
                            {WORDMARK.split(".").map((part, i) => (
                                <span key={i}>
                                    {i > 0 && <span style={{ opacity: 0.3 }}>.</span>}
                                    {part}
                                </span>
                            ))}
                        </motion.p>

                        <p className="t-mono text-center mb-8" style={{ fontSize: "0.62rem", color: "var(--text-subtle)" }}>
                            {portfolio.profile.role}
                        </p>

                        {/* Progress track */}
                        <div className="relative w-full mb-1" style={{ height: "1px", backgroundColor: "var(--border)" }}>
                            <div
                                className="absolute top-0 left-0 h-full transition-none"
                                style={{ width: `${progress}%`, backgroundColor: "var(--text)" }}
                            />
                        </div>

                        {/* Progress number */}
                        <div className="flex justify-between mb-6">
                            <span className="t-mono" style={{ fontSize: "0.6rem", color: "var(--text-subtle)" }}>loading</span>
                            <span className="t-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
                                {String(progress).padStart(3, "0")}%
                            </span>
                        </div>

                        {/* Boot log */}
                        <div className="space-y-1.5 min-h-[120px]">
                            {visibleLines.map((line, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="t-mono"
                                    style={{
                                        fontSize: "0.65rem",
                                        color: i === visibleLines.length - 1 ? "var(--text-muted)" : "var(--text-subtle)",
                                    }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                            {done && (
                                <span className="t-mono cursor-blink" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                                    ▋
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
