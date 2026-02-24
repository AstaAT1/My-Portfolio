import { useRef } from "react";
import { motion } from "framer-motion";
import { Shield, MapPin, Mail, MessageSquare, Zap } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { RevealGroup, RevealItem } from "../components/shared/Reveal";

// ── Bento card wrapper ────────────────────────────────────────────
function BentoCard({ children, className = "", style = {} }) {
    return (
        <motion.div
            className={`glow-card noise-overlay p-5 ${className}`}
            style={style}
            whileHover={{ borderColor: "var(--border-hover)" }}
        >
            {children}
        </motion.div>
    );
}

// ── About ─────────────────────────────────────────────────────────
export default function About() {
    const ref = useRef(null);

    return (
        <section id="about" className="py-28 px-6" aria-labelledby="about-heading">
            <div className="max-w-5xl mx-auto">
                <RevealGroup className="mb-10">
                    <RevealItem>
                        <p className="section-label mb-3">01 / About</p>
                    </RevealItem>
                    <RevealItem>
                        <h2 id="about-heading" className="t-headline mb-2" style={{ color: "var(--text)" }}>
                            $ cat about.txt
                        </h2>
                    </RevealItem>
                    <RevealItem>
                        <p className="t-small t-mono" style={{ color: "var(--text-subtle)" }}>
                            // Warning: may talk about AI &amp; security longer than socially acceptable.
                        </p>
                    </RevealItem>
                </RevealGroup>

                {/* ── Bento Grid ── */}
                <RevealGroup stagger={0.06}>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

                        {/* Main card — spans 3 cols on md */}
                        <RevealItem className="md:col-span-3">
                            <BentoCard className="h-full">
                                {/* Photo + identity */}
                                {portfolio.extras.avatarUrl && (
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1"
                                            style={{ ringColor: "var(--border)" }}>
                                            <img
                                                src={portfolio.extras.avatarUrl}
                                                alt={`${portfolio.profile.name}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="t-title" style={{ color: "var(--text)" }}>{portfolio.profile.name}</p>
                                            <p className="t-small t-mono" style={{ color: "var(--text-muted)" }}>{portfolio.profile.role}</p>
                                        </div>
                                    </div>
                                )}
                                {/* Bio paragraphs */}
                                <div className="space-y-3">
                                    {portfolio.profile.bio.map((para, i) => (
                                        <p key={i} className="t-body" style={{ color: "var(--text-muted)" }}>{para}</p>
                                    ))}
                                </div>
                                {/* fun fact */}
                                <p className="t-small t-mono mt-5" style={{ color: "var(--text-subtle)" }}>
                                    // {portfolio.extras.funFact}
                                </p>
                            </BentoCard>
                        </RevealItem>

                        {/* Right column — 2 cols */}
                        <RevealItem className="md:col-span-2 flex flex-col gap-3">

                            {/* Location */}
                            <BentoCard>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--surface-2)" }}>
                                        <MapPin size={13} style={{ color: "var(--text-muted)" }} />
                                    </div>
                                    <div>
                                        <p className="section-label mb-0.5">Location</p>
                                        <p className="t-small" style={{ color: "var(--text)" }}>{portfolio.profile.location}</p>
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Email */}
                            <BentoCard>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--surface-2)" }}>
                                        <Mail size={13} style={{ color: "var(--text-muted)" }} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="section-label mb-0.5">Email</p>
                                        <a href={`mailto:${portfolio.contact.email}`}
                                            className="t-small t-mono block truncate hover:opacity-60 transition-opacity"
                                            style={{ color: "var(--text)" }}>
                                            {portfolio.contact.email}
                                        </a>
                                    </div>
                                </div>
                            </BentoCard>

                            {/* Discord */}
                            {portfolio.contact.discord && (
                                <BentoCard>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--surface-2)" }}>
                                            <MessageSquare size={13} style={{ color: "var(--text-muted)" }} />
                                        </div>
                                        <div>
                                            <p className="section-label mb-0.5">Discord</p>
                                            <p className="t-small t-mono" style={{ color: "var(--text)" }}>{portfolio.contact.discord}</p>
                                        </div>
                                    </div>
                                </BentoCard>
                            )}

                            {/* Security pursuit card */}
                            <BentoCard className="flex-1" style={{ borderColor: "var(--border-hover)" }}>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: "var(--surface-2)" }}>
                                        <Shield size={13} style={{ color: "var(--text-muted)" }} />
                                    </div>
                                    <div>
                                        <p className="section-label mb-1">Security Track</p>
                                        <p className="t-small" style={{ color: "var(--text-muted)" }}>
                                            ALX program · Targeting eJPT1.
                                            Learning offensive skills to understand what I&apos;m defending.
                                        </p>
                                    </div>
                                </div>
                            </BentoCard>
                        </RevealItem>

                        {/* Full-width bottom banner */}
                        <RevealItem className="md:col-span-5">
                            <BentoCard className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-3">
                                    <Zap size={14} style={{ color: "var(--text-muted)" }} />
                                    <span className="t-small" style={{ color: "var(--text-muted)" }}>
                                        Currently available for freelance frontend work — landing pages, SPAs, component libraries.
                                    </span>
                                </div>
                                <span className="term-chip">
                                    <span className="prompt">$</span>
                                    <span className="val">{portfolio.profile.statusLine}</span>
                                </span>
                            </BentoCard>
                        </RevealItem>
                    </div>
                </RevealGroup>
            </div>
        </section>
    );
}
