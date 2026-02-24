import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PREFERS_REDUCED = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/**
 * AnimatedReveal — wraps children in a Framer Motion fade-up reveal.
 * Respects prefers-reduced-motion.
 */
export function AnimatedReveal({
    children,
    className,
    delay = 0,
    duration = 0.55,
    y = 28,
    once = true,
    threshold = 0.12,
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, amount: threshold });

    if (PREFERS_REDUCED) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}
