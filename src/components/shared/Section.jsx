import { cn } from "../../lib/utils";

/**
 * Full-width section wrapper with consistent vertical padding.
 */
export function Section({ id, className, children, ...props }) {
    return (
        <section
            id={id}
            className={cn("py-24 md:py-32", className)}
            {...props}
        >
            {children}
        </section>
    );
}
