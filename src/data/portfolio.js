// src/data/portfolio.js
import images from "../context/image.jsx"

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
        Frontend: ["HTML", "CSS", "Sass", "Bootstrap", "Tailwind CSS", "JavaScript", "React", "Framer Motion" , "(soon) TypeScript" , "(soon) Next.js" , "(soon) React Native"],
        Backend: ["(soon) Node.js", "(soon) Express", "(soon) Databases", "(soon) SQL", "(soon) MongoDB", "(soon) PHP", "(soon) Laravel"],
        Tools: ["C", "Bash", "n8n", "AI tools", "Networking fundamentals" , "Security fundamentals " , "Linux" , "Vim" , "Git" , "GitHub"],
    },

    // ── Projects ────────────────────────────────────────────────────
projects: [
  {
    title: "Yalla Trip",
    description:
      "A Morocco-focused travel web app that blends trip discovery, traveler communities, a gear marketplace, and an AI travel assistant. Built with a clean responsive UI, dark/light mode, and localStorage-based auth & profiles.",
    image: images.Yallatrip,
    stack: ["React", "Tailwind", "Framer Motion"],
    links: {
      github: "https://github.com/AstaAT1/Yalla-Trip",
      live: "https://yallatrip.netlify.app/",
    },
    funFact: "Includes an AI travel chatbot for Morocco itineraries, routes, and packing tips.",
  },
  {
    title: "LeetMovie",
    description:
      "A Netflix-inspired movie & TV discovery platform with a cinematic UI. Browse curated lists, open a details page, and explore content with smooth animations and a modern card-based layout.",
    image: images.Leetmovie,
    stack: ["React", "Tailwind", "Framer Motion"],
    links: {
      github: "https://github.com/AstaAT1/Movies-Site",
      live: "https://leet-movie.netlify.app/",
    },
    funFact: "Focused on UI polish: micro-interactions, hover states, and premium motion transitions.",
  },
  {
    title: "Fashe",
    description:
      "A modern fashion store front-end with product browsing and a clean shopping experience. Built with React + Tailwind, with a focus on reusable components, responsive layout, and a scalable UI foundation.",
    image: images.fashe,
    stack: ["React", "Tailwind"],
    links: { github: "https://github.com/AstaAT1/Fashe", live: "https://fashe-store.netlify.app/" },
    funFact: "Designed to be extended with stock management, filtering, and checkout flows.",
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
        avatarUrl: images.profile,
    },
};