import { cn } from "../../lib/utils";

/**
 * Max-width container with responsive horizontal padding.
 */
export function Container({ className, children, ...props }) {
    return (
        <div
            className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
            {...props}
        >
            {children}
        </div>
    );
}
