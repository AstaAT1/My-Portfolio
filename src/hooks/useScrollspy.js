import { useEffect, useState } from "react";

/**
 * Returns the id of whichever section is currently most visible.
 * @param {string[]} ids - Array of section IDs to watch
 * @param {number} offset - Top-offset threshold in pixels
 */
export function useScrollspy(ids, offset = 80) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const handleScroll = () => {
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top - offset <= 0) current = id;
            }
            setActive(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ids, offset]);

    return active;
}
