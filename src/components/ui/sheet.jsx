import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef(
    ({ side = "right", className, children, ...props }, ref) => (
        <SheetPortal>
            <SheetOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed z-50 flex flex-col bg-[var(--surface)] shadow-2xl transition ease-in-out",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:duration-200 data-[state=open]:duration-300",
                    side === "right" &&
                    "inset-y-0 right-0 h-full w-72 border-l border-[var(--border)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
                    className
                )}
                {...props}
            >
                {children}
                <SheetClose
                    className="absolute right-4 top-4 rounded-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)]"
                    aria-label="Close menu"
                >
                    <X size={18} />
                </SheetClose>
            </DialogPrimitive.Content>
        </SheetPortal>
    )
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />
);

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-base font-semibold text-[var(--text)]", className)}
        {...props}
    />
));
SheetTitle.displayName = "SheetTitle";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
