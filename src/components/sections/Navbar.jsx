import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useScrollspy } from "../../hooks/useScrollspy";
import { Container } from "../shared/Container";
import { Button } from "../ui/button";
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from "../ui/sheet";
import { cn } from "../../lib/utils";
import { portfolio } from "../../data/portfolio";

const NAV_LINKS = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
];

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
    const { dark, setDark } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const active = useScrollspy(["home", ...NAV_LINKS.map((l) => l.id)]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 48);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            role="banner"
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]"
                    : "bg-transparent"
            )}
        >
            <Container>
                <nav
                    aria-label="Main navigation"
                    className="flex items-center justify-between h-16"
                >
                    {/* Wordmark */}
                    <button
                        onClick={() => scrollTo("home")}
                        className="text-sm font-semibold tracking-tight text-[var(--text)] hover:text-[var(--text-muted)] transition-colors cursor-pointer"
                        aria-label="Back to top"
                    >
                        {portfolio.profile.name.split(" ")[0].toLowerCase()}
                        <span className="opacity-40">.</span>
                        {portfolio.profile.name.split(" ")[1].toLowerCase()}
                    </button>

                    {/* Desktop links */}
                    <ul className="hidden md:flex items-center gap-1" role="list">
                        {NAV_LINKS.map(({ label, id }) => (
                            <li key={id}>
                                <button
                                    onClick={() => scrollTo(id)}
                                    aria-current={active === id ? "page" : undefined}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-sm transition-colors duration-150 cursor-pointer",
                                        active === id
                                            ? "text-[var(--text)] font-medium"
                                            : "text-[var(--text-muted)] hover:text-[var(--text)]"
                                    )}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right controls */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDark((d) => !d)}
                            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {dark ? <Sun size={16} /> : <Moon size={16} />}
                        </Button>

                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    aria-label="Open navigation menu"
                                >
                                    <Menu size={18} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Navigation</SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-1 px-6 pt-4">
                                    {NAV_LINKS.map(({ label, id }) => (
                                        <SheetClose key={id} asChild>
                                            <button
                                                onClick={() => scrollTo(id)}
                                                className="text-left text-sm py-2.5 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                                            >
                                                {label}
                                            </button>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </Container>
        </header>
    );
}
