import { motion } from "framer-motion";
import { portfolio } from "../data/portfolio";
import { Badge } from "../components/ui/badge";
import { RevealGroup, RevealItem } from "../components/shared/Reveal";

function BentoCard({ children, className = "", style = {} }) {
    return (
        <motion.div className={`glow-card noise-overlay p-5 ${className}`} style={style}
            whileHover={{ borderColor: "var(--border-hover)" }}>
            {children}
        </motion.div>
    );
}

export default function Skills() {
    const categories = Object.entries(portfolio.skills); // [["Frontend", [...]], ...]

    return (
        <section
            id="skills"
            className="py-28 px-6"
            style={{ backgroundColor: "var(--surface-2)" }}
            aria-labelledby="skills-heading"
        >
            <div className="max-w-5xl mx-auto">
                <RevealGroup className="mb-10">
                    <RevealItem><p className="section-label mb-3">02 / Skills</p></RevealItem>
                    <RevealItem>
                        <h2 id="skills-heading" className="t-headline mb-2" style={{ color: "var(--text)" }}>
                            $ ls -la skills/
                        </h2>
                    </RevealItem>
                    <RevealItem>
                        <p className="t-small t-mono" style={{ color: "var(--text-subtle)" }}>
                            // Backend is "(soon)" — I&apos;m honest like that.
                        </p>
                    </RevealItem>
                </RevealGroup>

                {/* Bento-style skill grid */}
                <RevealGroup stagger={0.07}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {categories.map(([category, items], catIdx) => {
                            // Frontend gets extra-tall treatment (most skills)
                            const isFeatured = catIdx === 0;
                            return (
                                <RevealItem key={category} className={isFeatured ? "md:row-span-1" : ""}>
                                    <BentoCard className="h-full">
                                        {/* Terminal-style dir header */}
                                        <h3 className="t-mono t-small font-semibold mb-4 flex items-center gap-1"
                                            style={{ color: "var(--text-muted)" }}>
                                            <span style={{ color: "var(--text-subtle)" }}>~/</span>
                                            {category.toLowerCase()}
                                            <span style={{ color: "var(--text-subtle)" }}>/</span>
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${category} skills`}>
                                            {items.map((skill, si) => (
                                                <motion.div
                                                    key={skill}
                                                    role="listitem"
                                                    initial={{ opacity: 0, scale: 0.85 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: catIdx * 0.08 + si * 0.025, duration: 0.25 }}
                                                >
                                                    <Badge
                                                        variant={skill.startsWith("(soon)") ? "default" : "outline"}
                                                        className="t-mono"
                                                        style={{
                                                            fontSize: "0.62rem",
                                                            opacity: skill.startsWith("(soon)") ? 0.45 : 1,
                                                        }}
                                                    >
                                                        {skill}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </BentoCard>
                                </RevealItem>
                            );
                        })}
                    </div>
                </RevealGroup>
            </div>
        </section>
    );
}
