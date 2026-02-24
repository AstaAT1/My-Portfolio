import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ item, index, total }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const isLast = index === total - 1;

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
            className="timeline-item relative flex gap-6"
        >
            {/* Spine */}
            <div className="flex flex-col items-center flex-shrink-0" aria-hidden="true">
                <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 z-10 flex-shrink-0 outline outline-[3px] outline-offset-1"
                    style={{ backgroundColor: "var(--text)", outlineColor: "var(--surface-2)" }}
                />
                {!isLast && <div className="w-px flex-1 mt-1.5 timeline-line" style={{ backgroundColor: "var(--border)" }} />}
            </div>

            {/* Content */}
            <div className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                        <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{item.role}</h3>
                        <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{item.company}</p>
                    </div>
                    <span
                        className="text-xs px-2 py-0.5 rounded border font-mono"
                        style={{ color: "var(--text-muted)", borderColor: "var(--border)", backgroundColor: "var(--card)" }}
                    >
                        {item.dates}
                    </span>
                </div>

                {/* Bullets array */}
                <ul className="space-y-1.5 mt-2">
                    {(item.bullets || []).map((bullet, bi) => (
                        <li key={bi} className="flex gap-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            <span style={{ color: "var(--text-subtle)", fontFamily: "monospace" }}>›</span>
                            {bullet}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.li>
    );
}

export default function Experience() {
    const sectionRef = useRef(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    // GSAP ScrollTrigger — animate the timeline vertical line growing
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".timeline-line", {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="py-28 px-6"
            aria-labelledby="experience-heading"
            style={{ backgroundColor: "var(--surface-2)" }}
        >
            <div className="max-w-3xl mx-auto">
                <div ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12"
                    >
                        <p className="section-label mb-3">Career</p>
                        <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
                            $ git log --author=&quot;me&quot;
                        </h2>
                        <p className="text-sm font-mono" style={{ color: "var(--text-subtle)" }}>
                            // Titles change; the learning doesn&apos;t stop.
                        </p>
                    </motion.div>
                </div>

                <ol className="timeline-container space-y-0" aria-label="Experience timeline">
                    {portfolio.experience.map((item, i) => (
                        <TimelineItem
                            key={`${item.company}-${item.role}`}
                            item={item} index={i}
                            total={portfolio.experience.length}
                        />
                    ))}
                </ol>
            </div>
        </section>
    );
}
