import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

const REDUCED = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

/**
 * MagneticButton — button that subtly follows the cursor (magnetic effect).
 * Falls back to a plain button when prefers-reduced-motion is set.
 */
export function MagneticButton({ children, className, strength = 0.3, ...props }) {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        if (REDUCED || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={REDUCED ? {} : { x: springX, y: springY }}
            className={cn("relative overflow-hidden cursor-pointer", className)}
            whileTap={{ scale: 0.97 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}
