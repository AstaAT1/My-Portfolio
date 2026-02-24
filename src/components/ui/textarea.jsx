import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            "flex w-full rounded-lg border px-3 py-2.5 text-sm font-mono min-h-[120px] resize-none",
            "bg-[var(--card)] border-[var(--border)] text-[var(--text)]",
            "placeholder:text-[var(--text-subtle)]",
            "outline-none focus:border-[var(--text-muted)] transition-colors duration-150",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    />
));
Textarea.displayName = "Textarea";

export { Textarea };
