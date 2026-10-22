<a href="https://joechamdani.com" target="_blank">
  <img src="https://joechamdani.com/Logo_Joseph.PNG" alt="Joseph Davis Chamdani Logo" width="120" align="left"/>
</a>

# Joseph Davis Chamdani · Portfolio v2.3

[![Website](https://img.shields.io/badge/Website-joechamdani.com-6f42c1?style=for-the-badge&logo=vercel&logoColor=white)](https://joechamdani.com)
[![Version](https://img.shields.io/badge/Version-2.3.0-4CBB17?style=for-the-badge)](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.3.0)

---

## About

This is my personal **portfolio website**, where I showcase my background, projects, experience, writing and certifications.

It follows my path as an **Informatics student at the University of Washington**, with personal touches like my love for tennis and coffee.

Live site: **[joechamdani.com](https://joechamdani.com)**

<a href="https://joechamdani.com">
  <picture>
    <source srcset=".github/readme/reel.avif" type="image/avif">
    <img src="public/images/readme/v2.2-home-light.webp" alt="Scrolling through the homepage in light mode, switching to dark mode with a circle reveal from the toggle, and scrolling back up">
  </picture>
</a>

<sub>Recorded frame by frame at 60 fps from a production build.</sub>

---

## What's new in v2.3

- **Mini Joe.** A small 3D version of me in the About section. Click it for a viewer you can drag to rotate, with a few poses. The 3D code loads only on click, so the homepage stays as light as before.
- **A theme switch that feels instant.** The new theme is revealed as a circle growing from the toggle, in one GPU animation. The old fade repainted every element on every frame and ran at about 17 fps on a mid-range phone; the reveal runs at about 55.
- **More motion.** Links slide in an underline on hover, buttons lift further, and the toggle, timeline rows and scroll-to-top button all respond to hover. Project filters animate in place, about five times faster.
- **WCAG AA contrast in both themes.** Every text and chip colour passes, company colours included. Automated contrast failures went from 132 to 0, plus a skip link and a focus trap in the 3D viewer.
- **Lighter photos.** Tennis and team photos resized and re-encoded, and an unused Google Tag Manager container removed.

Full notes: [v2.3.0 release](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.3.0). Changes are made through documented pull requests with before and after screenshots and a measured number, for example [#2](https://github.com/JosephDavisC/Portfolio-Website/pull/2), [#6](https://github.com/JosephDavisC/Portfolio-Website/pull/6) and [#9](https://github.com/JosephDavisC/Portfolio-Website/pull/9).

---

## Design

The v2 redesign moved away from generic dark templates toward a **tactile, paper-textured, neobrutalist** look that reflects who I am.

- **Organic palette.** The colors come from two of my passions: **tennis** (Court Green `#4CBB17`) and **coffee** (Espresso `#3D2B1F`).
- **Custom interactions.** Tennis ball particles, animated coffee steam and hand-built micro-interactions, all purpose-made.
- **Two themes.** A warm light mode with paper textures and offset shadows, and a dark mode with glassmorphism and neon blue accents. Switching reveals the other theme as a circle growing from the toggle.
- **Neobrutalist details.** Cards with offset shadows, hand-drawn scribble underlines and playful hover states that make the interface feel tangible.

![Homepage in dark mode](public/images/readme/v2.2-home-dark.webp)

---

## Features

- **Homepage sections:** hero, about, milestones, portfolio, certifications, awards, blog, tennis and coffee, recommendations, contact
- **Projects page** with category filters (AI, Web, Games, Data), plus case study pages
- **Blog** with article pages, an RSS feed and click-to-enlarge images
- **Experience timeline** with a detail page per role
- **Credential pages** for each certificate
- **Contact form** with a custom PHP backend and an auto-reply
- **SEO:** prerendered pages, Open Graph images for LinkedIn, Facebook, X and WhatsApp, a sitemap with image entries, and JSON-LD
- **Accessibility:** AA contrast in both themes, a skip link, keyboard focus states and reduced-motion support
- **Responsive** on every screen size, with easter eggs hidden throughout

| Case study | Blog |
|---|---|
| ![AI Transfer Evaluation Tool case study](public/images/readme/v2.2-case-study.webp) | ![Blog index in dark mode](public/images/readme/v2.2-blog.webp) |

---

## Tech Stack

- **React + TypeScript**: frontend
- **Vite**: build tool
- **Tailwind CSS**: styling
- **Framer Motion**: animations
- **React Router**: client-side routing
- **React Helmet Async**: per-page meta tags
- **Lucide React**: icons
- **Hostinger**: hosting

---

## Project Structure

```
src/
 ├── components/
 │    ├── sections/        # Homepage sections (Hero, About, Milestones, Portfolio,
 │    │                    #   Certifications, Awards, Blog, TennisCoffee, Testimonials,
 │    │                    #   Contact) and the shared image Lightbox
 │    └── shared/          # Navbar, Footer, ContactForm, ThemeToggle, OptimizedImage, ...
 ├── contexts/             # ThemeContext (light and dark)
 ├── data/                 # Content lives here as JSON
 │    ├── projects.json         # Project cards
 │    ├── projectPages.json     # Case study pages
 │    ├── articles.json         # Blog posts
 │    ├── experiences.json      # Experience detail pages
 │    ├── milestones.json       # Timeline
 │    └── credentials.json      # Certificates
 └── pages/                # Index, ProjectsPage, ProjectPage, BlogPage, ArticlePage,
                           #   ExperiencePage, InternshipPage, CredentialPage, NotFound

public/                    # Images (with .webp twins), article media, logos, sitemap, llms.txt

scripts/
 ├── generate-static-pages.js   # Prerenders pages with real content and meta tags
 ├── generate-blog-meta.js      # Prerenders blog articles, builds RSS
 ├── check-webp-twins.js        # Build guard: every image has a .webp twin
 └── check-content-rules.js     # Build guard: share images, media paths, sitemap images
```

Most content changes are a JSON edit. The build guards fail the build on mistakes that would otherwise only show up in production, such as a share image LinkedIn can't render or a sitemap image that doesn't exist.

---

## Setup

```bash
git clone https://github.com/JosephDavisC/Portfolio-Website.git
cd Portfolio-Website
npm install
npm run dev      # local dev server
npm run build    # production build, prerendering and build guards
```

---

## Version history

- **v2.3** (Oct 2026): Mini Joe in 3D, the circle theme switch, more motion, AA contrast in both themes and lighter photos
- **v2.2** (Oct 2026): case studies, the blog and experience pages, AA contrast, and prerendering for search and AI readers
- **v2.1** (Aug 2026): awards, testimonials, a performance pass and `llms.txt`
- **v2.0** (Jan 2026): the paper-textured neobrutalist redesign
- **v1.0** (Nov 2025): the original dark glassmorphism design

The v1.0 look lives on in today's dark mode.

![v1.0 Design](public/media/preview-website.png)

Walkthrough of the original v1.0 design: [Watch on YouTube](https://youtu.be/PpamoGkq0po)
