import { portfolio } from "../data/portfolio";
import { Github, Linkedin, MessageSquare } from "lucide-react";

const NAV_LINKS = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
];

const ICON_MAP = { github: Github, linkedin: Linkedin, discord: MessageSquare };

export default function Footer() {
    const year = new Date().getFullYear();
    const [first, last] = portfolio.profile.name.split(" ");

    return (
        <footer
            className="py-10 px-6 border-t"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            role="contentinfo"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <span className="t-small font-semibold t-mono" style={{ color: "var(--text)" }}>
                        {first?.toLowerCase()}
                        <span style={{ opacity: 0.3 }}>.</span>
                        {last?.toLowerCase()}
                    </span>
                    <p className="t-small" style={{ color: "var(--text-subtle)" }}>
                        &copy; {year} {portfolio.profile.name} · Built with React + Vite
                    </p>
                </div>

                {/* Quick links */}
                <nav aria-label="Footer navigation">
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
                        {NAV_LINKS.map(({ label, id }) => (
                            <li key={id}>
                                <button
                                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                                    className="t-small transition-opacity hover:opacity-60 cursor-pointer"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Socials */}
                <div className="flex gap-2">
                    {portfolio.socials.map(({ label, href, icon }) => {
                        const Icon = ICON_MAP[icon];
                        if (!Icon) return null;
                        return (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-lg transition-opacity hover:opacity-60"
                                style={{ color: "var(--text-muted)" }}>
                                <Icon size={14} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
