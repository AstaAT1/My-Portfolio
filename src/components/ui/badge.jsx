import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[var(--surface-2)] text-[var(--text-muted)]",
                outline:
                    "border-[var(--border)] text-[var(--text-muted)] bg-transparent",
                accent:
                    "border-transparent bg-[var(--accent)] text-[var(--accent-fg)]",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
