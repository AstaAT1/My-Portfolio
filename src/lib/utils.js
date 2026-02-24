import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes, resolving conflicts intelligently.
 * Drop-in equivalent of the shadcn/ui `cn` utility.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
