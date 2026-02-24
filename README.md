$ cat README.md
NAME
  portfolio — one-page scrolling portfolio (monochrome + cyber vibe + motion)

LINKS
  Live Demo: <PUT_YOUR_DEPLOYED_URL_HERE>
  GitHub:    https://github.com/AstaAT1
  LinkedIn:  https://www.linkedin.com/in/mohamed-mobariki-9329b5318/

REQUIREMENTS
  Node.js >= 18
  npm

SYNOPSIS
  npm install
  npm run dev
  npm run build
  npm run preview

DESCRIPTION
  A Vite + React portfolio with:
    - monochrome UI (black/grey/white)
    - smooth scroll + scrollspy navigation
    - animations (Framer Motion, GSAP/ScrollTrigger)
    - lightweight 3D hero background (Three.js via R3F/Drei)
    - shadcn/ui components + Tailwind styling
    - content driven by a single data file

FILES
  src/data/portfolio.js
    Single source of truth for:
      name, bio, socials, skills, projects, experience, avatar.

  src/assets/images/profile.png
    Profile image used in hero/sidebar.

USAGE
  $ npm install
    Install dependencies.

  $ npm run dev
    Start local dev server.

  $ npm run build
    Create production build in ./dist.

  $ npm run preview
    Preview production build locally.

CUSTOMIZE
  $ nano src/data/portfolio.js
    Edit content (no need to touch components).

TROUBLESHOOTING
  $ npm i lenis
    Fix: Rollup failed to resolve import "lenis"

AUTHOR
  Mohamed Mobariki (asta_at1)
