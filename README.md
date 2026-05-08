# Abraham Serrano — Portfolio

Personal portfolio website built with Astro, showcasing 5+ years of frontend development experience. The site itself is the proof of craft: WebGL shaders, GSAP animations, and a cinematic design system working together in under 100ms.

**Live:** [abrahamsm.com](https://abrahamsm.com)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (SSG + React islands) |
| Styling | Tailwind CSS 3 |
| Animation | GSAP 3, Framer Motion 12 |
| Background | WebGL with custom GLSL shaders |
| Language | TypeScript |
| Runtime | Bun |
| Linting | Biome, Oxlint, Prettier |
| Analytics | Google Tag Manager |

## Project Structure

```
src/
├── pages/          # index, about, projects, contact
├── layouts/        # Layout.astro (WebGL bg, cursor, header, transitions)
├── components/
│   ├── *.astro     # Intro, Experience, Project, Marquee, Contact, About
│   └── *.tsx       # Header, Navbar, Cursor, ThemeToggle, InitialTransition, WebGLBackground
├── analytics/      # GTM integration
├── styles/         # global.css
└── utilities/      # weekDays helper
```

## Getting Started

```sh
bun install
bun dev          # localhost:4321
bun build        # production build → ./dist/
bun preview      # preview production build
```

## Features

- **WebGL background** — noise shader animated with time, mouse, and scroll uniforms
- **Custom cursor** — pointer-device only, skipped on touch screens
- **View transitions** — Astro's page transition API for smooth navigation
- **Reveal animations** — scroll-triggered via data attributes
- **Theme toggle** — light/dark mode
- **Dynamic greeting** — time-based (morning / afternoon / evening)
- **SEO** — JSON-LD schema, Open Graph, Twitter Card, canonical URLs
- **Accessibility** — `prefers-reduced-motion` fallbacks throughout
