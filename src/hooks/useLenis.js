import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Gracefully does nothing if Lenis isn't installed or user prefers reduced motion.
 */
export function useLenis() {
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        let lenis;
        let rafId;

        const init = async () => {
            try {
                const { default: Lenis } = await import("lenis");
                lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });

                // Sync Lenis with GSAP ScrollTrigger
                lenis.on("scroll", ScrollTrigger.update);
                gsap.ticker.lagSmoothing(0);

                const onFrame = (time) => {
                    lenis.raf(time * 1000);
                };
                gsap.ticker.add(onFrame);

                return () => {
                    gsap.ticker.remove(onFrame);
                    lenis.destroy();
                };
            } catch {
                // Lenis not available — native smooth scroll from CSS handles it
            }
        };

        let cleanup;
        init().then((fn) => { cleanup = fn; });
        return () => { cleanup?.(); };
    }, []);
}
