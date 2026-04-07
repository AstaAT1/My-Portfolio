// src/data/portfolio.js
import images from "../context/image.jsx"

export const portfolio = {
  // ── Flat convenience fields (used by Navbar, Hero, Footer) ──────
  name: "Mohamed Mobariki",

  profile: {
    name: "Mohamed Mobariki",
    role: "Full-stack Developer",
    location: "Morocco",
    bio: [
      "I'm a Full-Stack Developer with confidence in both frontend and backend development.",
      "I'm also growing my skills in Cyber Security through the ALX program, with a stronger practical foundation while continuing to learn and improve.",
      "I enjoy exploring new AI tools and staying up to date with the latest developments in AI and security.",
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
    Frontend: ["HTML", "CSS", "Sass", "Bootstrap", "Tailwind CSS", "JavaScript", "React", "Framer Motion", "React Native", "(soon) TypeScript", "(soon) Next.js"],
    Backend: ["Node.js", "Databases", "MySQL", "MongoDB","Express.js","Authentication", "PHP", "Laravel", "API"],
    Tools: ["C", "Bash", "n8n", "AI tools","Linux", "Vim", "Git", "GitHub", "GitLab"],
     Cybersecurity: [
      "Linux Fundamentals",
      "Networking Basics",
      "Web Security Fundamentals",
      "OWASP Top 10",
      "XSS",
      "IDOR",
      "Path Traversal",
      "CTF Practice",
    ],
      SoftSkills: [
      "Problem Solving",
      "Time Management",
      "Team Collaboration",
    ],
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
      title: "SafeTech Morocco",
      description:
        "A full-stack cybersecurity platform built with the MERN stack to provide cybersecurity threat intelligence and Morocco-focused security guidance. The platform includes secure authentication, content management, and an admin dashboard for full control over users and site settings.",
      image: images.SafeTechMorocco,
      stack: ["React", "Node.js", "Express.js", "MongoDB", "Vercel", "AI Tools"],
      links: {
        github: "https://github.com/0xm7d",
        live: "https://www.safetech.tech/",
      },
      funFact:
        "Integrated AI-powered services for image generation and news analysis to improve user engagement.",
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
        "A modern fashion store front-end with product browsing and a clean shopping experience. Built with React + Tailwind + TypeScript, with a focus on reusable components, responsive layout, and a scalable UI foundation.",
      image: images.fashe,
      stack: ["React", "Tailwind", "JavaScript"],
      links: { github: "https://github.com/AstaAT1/Fashe", live: "https://fashe-store.netlify.app/" },
      funFact: "Designed to be extended with stock management, filtering, and checkout flows.",
    },
    {
      title: "Best Football Formation",
      description:
        "An interactive football quiz + draft game where every round mixes timed trivia, player choices, and squad strategy. Build your best 4-3-3 formation, handle changement rounds and card penalties, then discover hidden player ratings in a cinematic final showdown.",
      image: images.BestFootballFormatiom,
      stack: ["React", "Tailwind", "Framer Motion", "API"],
      links: {
        github: "https://github.com/AstaAT1/Best-football-formation",
        live: "https://bestfootballformation.vercel.app/",
      },
      funFact:
        "The final result is revealed like a football broadcast, with player-by-player comparisons before showing the full lineup.",
    },
  ],

  // ── Experience ──────────────────────────────────────────────────
  experience: [
    {
      role: "Freelance (Open to work)",
      company: "Remote",
      dates: "2026 — Present",
      bullets: [
        "Available for freelance Full-Stack work and landing pages.",
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