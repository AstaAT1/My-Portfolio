import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible] — attaches ref to an element and uses
 * IntersectionObserver to detect when it enters the viewport.
 */
export function useReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}
