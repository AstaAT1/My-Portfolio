import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Github, ExternalLink, Info } from "lucide-react";
import { portfolio } from "../data/portfolio";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../components/ui/tooltip";
import { RevealGroup, RevealItem } from "../components/shared/Reveal";

// ── Tilt Card ─────────────────────────────────────────────────────
function TiltCard({ children, className = "" }) {
    const ref = useRef(null);
    const rotX = useMotionValue(0);
    const rotY = useMotionValue(0);
    const spRotX = useSpring(rotX, { stiffness: 260, damping: 30 });
    const spRotY = useSpring(rotY, { stiffness: 260, damping: 30 });
    const z = useMotionValue(0);
    const spZ = useSpring(z, { stiffness: 260, damping: 30 });

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - r.left) / r.width;
        const yPct = (e.clientY - r.top) / r.height;
        rotX.set((yPct - 0.5) * -8);   // -4 … +4 deg
        rotY.set((xPct - 0.5) * 8);
        z.set(6);
    };
    const onLeave = () => { rotX.set(0); rotY.set(0); z.set(0); };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX: spRotX, rotateY: spRotY, z: spZ, transformStyle: "preserve-3d", perspective: 800 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Project Card ──────────────────────────────────────────────────
function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const { github, live } = project.links || {};
    const isComing = !github && !live;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 }}
        >
            <TiltCard>
                <Card
                    className="h-full flex flex-col group relative overflow-hidden transition-all duration-200"
                    style={{ backgroundColor: "var(--card)", borderColor: isComing ? "var(--border-subtle)" : "var(--border)" }}
                >
                    {/* Hover glow overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-xl"
                        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)" }}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />

                    <CardHeader className="pb-3 relative z-10">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            {isComing && (
                                <span className="term-chip" style={{ fontSize: "0.6rem" }}>
                                    <span className="prompt">$</span> <span className="val">in progress</span>
                                </span>
                            )}
                            {project.funFact && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="ml-auto p-1 rounded cursor-pointer transition-opacity hover:opacity-60"
                                            style={{ color: "var(--text-subtle)" }} aria-label="Show fun fact">
                                            <Info size={12} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">{project.funFact}</TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <CardTitle className="t-small" style={{ color: "var(--text)" }}>{project.title}</CardTitle>
                        <CardDescription className="t-small leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>
                            {project.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1 justify-between gap-4 pt-0 relative z-10">
                        <div className="flex flex-wrap gap-1.5">
                            {(project.stack || []).map((tech) => (
                                <Badge key={tech} variant="outline" className="t-mono" style={{ fontSize: "0.6rem" }}>{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            {github ? (
                                <a href={github} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity t-mono"
                                    style={{ color: "var(--text-muted)" }}>
                                    <Github size={11} /> Code
                                </a>
                            ) : null}
                            {live ? (
                                <a href={live} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity t-mono"
                                    style={{ color: "var(--text)" }}>
                                    <ExternalLink size={11} /> Live
                                </a>
                            ) : null}
                            {isComing && (
                                <span className="t-mono" style={{ color: "var(--text-subtle)" }}>// coming soon</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </TiltCard>
        </motion.div>
    );
}

// ── Projects Section ──────────────────────────────────────────────
export default function Projects() {
    return (
        <TooltipProvider delayDuration={300}>
            <section id="projects" className="py-28 px-6" aria-labelledby="projects-heading">
                <div className="max-w-5xl mx-auto">
                    <RevealGroup className="mb-12">
                        <RevealItem><p className="section-label mb-3">03 / Projects</p></RevealItem>
                        <RevealItem>
                            <h2 id="projects-heading" className="t-headline mb-2" style={{ color: "var(--text)" }}>
                                $ git log --oneline
                            </h2>
                        </RevealItem>
                        <RevealItem>
                            <p className="t-small t-mono" style={{ color: "var(--text-subtle)" }}>
                                // Hover the <Info size={10} className="inline" /> for each project&apos;s
                                tiny confession. Tilt your mouse over the cards.
                            </p>
                        </RevealItem>
                    </RevealGroup>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolio.projects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </TooltipProvider>
    );
}
