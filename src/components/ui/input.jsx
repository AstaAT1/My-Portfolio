import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
    <input
        type={type}
        ref={ref}
        className={cn(
            "flex h-10 w-full rounded-lg border px-3 py-2 text-sm font-mono",
            "bg-[var(--card)] border-[var(--border)] text-[var(--text)]",
            "placeholder:text-[var(--text-subtle)]",
            "outline-none focus:border-[var(--text-muted)] transition-colors duration-150",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    />
));
Input.displayName = "Input";

export { Input };
