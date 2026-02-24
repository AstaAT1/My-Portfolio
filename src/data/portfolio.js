// src/data/portfolio.js
import profileImg from "../assets/images/profile.png";

export const portfolio = {
    // ── Flat convenience fields (used by Navbar, Hero, Footer) ──────
    name: "Mohamed Mobariki",

    profile: {
        name: "Mohamed Mobariki",
        role: "Frontend Developer",
        location: "Morocco",
        bio: [
            "I'm currently studying Full-Stack Web Development — I've just finished the frontend track and I'm getting confident with it.",
           "I'm studying Cyber Security through the ALX program and working toward eJPT-level skills.",
            "I love exploring new AI tools and keeping up with the latest AI & security news.",
        ],
        // Chaos mode version swap
        bioChaos: [
            "By day: writing clean React components. By night: enumerating subnets with nmap.",
            "Current mission: finish eJPT1 before my coffee gets cold. Progress: uncertain.",
            "Fun fact: I absorb AI news like a language model on a deadline. Send help.",
        ],
        statusLine: "Available for freelance & new opportunities (and good coffee).",
        statusLineChaos: "$ sudo ./hire_me --force --no-verify",
        tagline: "I turn curiosity into code.",
    },

    contact: {
        email: "kun443756@gmail.com",
        discord: "asta_at1",
    },

    // ── Socials (icon key for lucide mapping) ───────────────────────
    socials: [
        { label: "GitHub", href: "https://github.com/AstaAT1", icon: "github" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-mobariki-9329b5318/", icon: "linkedin" },
        { label: "Discord", href: "https://discord.com/users/asta_at1", icon: "discord" },
    ],

    // ── Skills (object form) ────────────────────────────────────────
    skills: {
        Frontend: ["HTML", "CSS", "Sass", "Bootstrap", "Tailwind CSS", "JavaScript", "React", "Framer Motion"],
        Backend: ["(soon) Node.js", "(soon) Express", "(soon) Databases", "(soon) SQL", "(soon) MongoDB", "(soon) PHP", "(soon) Laravel"],
        Tools: ["C", "Bash", "n8n", "AI tools", "Networking fundamentals" , "Security fundamentals (ALX)" , "Linux" , "Git" , "GitHub"],
    },

    // ── Projects ────────────────────────────────────────────────────
    projects: [
        {
            title: "Project #1 (Coming soon)",
            description: "I'll add my best work here soon — with live demo and a clean README.",
            stack: ["React", "Tailwind"],
            links: { github: "", live: "" },
            funFact: "Every senior dev's portfolio started with a coming-soon page too.",
        },
        {
            title: "Project #2 (Coming soon)",
            description: "A solid real-world project focusing on UI, performance, and a bit of animation.",
            stack: ["JavaScript", "Framer Motion"],
            links: { github: "", live: "" },
            funFact: "It will have 100% Lighthouse score. (Aspirationally.)",
        },
        {
            title: "Project #3 (Coming soon)",
            description: "Something security/automation related (n8n / scripting) — stay tuned.",
            stack: ["Bash", "n8n"],
            links: { github: "", live: "" },
            funFact: "If it involves automating something tedious, that's basically cybersecurity.",
        },
    ],

    // ── Experience ──────────────────────────────────────────────────
    experience: [
        {
            role: "Freelance (Open to work)",
            company: "Remote",
            dates: "2026 — Present",
            bullets: [
                "Available for freelance frontend work and landing pages.",
                "Focused on clean UI, responsive layouts, and smooth animations.",
                "Always learning and improving code quality.",
            ],
        },
        {
            role: "Server",
            company: "Restaurant",
            dates: "Past experience",
            bullets: [
                "Improved communication and teamwork under pressure.",
                "Learned reliability, discipline, and time management.",
            ],
        },
    ],

    // ── Extras ──────────────────────────────────────────────────────
    extras: {
        funFact: "I follow AI & security news like it's a sports league.",
        avatarUrl: profileImg,
    },
};