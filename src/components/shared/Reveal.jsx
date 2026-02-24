import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Reveal — wraps children in a Framer Motion reveal animation.
 * Respects prefers-reduced-motion via the Tailwind/CSS global rule.
 */
export function Reveal({
    children,
    delay = 0,
    duration = 0.65,
    direction = "up",   // "up" | "left" | "right" | "down" | "none"
    className = "",
    once = true,
    margin = "-80px",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin });

    const offsets = {
        up: { y: 32, x: 0 },
        down: { y: -20, x: 0 },
        left: { y: 0, x: -24 },
        right: { y: 0, x: 24 },
        none: { y: 0, x: 0 },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...offsets[direction] }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

/**
 * RevealGroup — staggers children `Reveal` animations.
 * Use alongside `staggerChildren` variant or just compose multiple Reveal with incremental delays.
 */
export function RevealGroup({ children, className = "", stagger = 0.08, baseDelay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: {
                    transition: { staggerChildren: stagger, delayChildren: baseDelay },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * RevealItem — used inside a RevealGroup, responds to parent variants.
 */
export function RevealItem({ children, direction = "up", className = "" }) {
    const offsets = { up: { y: 28 }, left: { x: -18 }, right: { x: 18 }, none: {} };
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, ...offsets[direction] },
                visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
        >
            {children}
        </motion.div>
    );
}
