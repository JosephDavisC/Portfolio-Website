# Changelog

The history of joechamdani.com, newest first. Each version links its GitHub Release, which has the full notes. All dates are Pacific time (America/Los_Angeles). A version's date is the day its GitHub Release was published. PR numbers link to the pull request.

## Next

- **Build tooling.** Vite 5 to 6.4.5, sharp 0.34 to 0.35.5, basic-ftp 5.0.5 to 5.3.1, plus in range updates to PostCSS, Rollup and their dependencies. The unused `@tailwindcss/typography` package is removed. npm audit goes from 24 findings to 4, none critical. Pages render pixel identical; Rollup now splits the vendor chunks differently at the same total size.

## v2.5.2: resume refresh (25 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.5.2)

- **Resume.** The PDF adds SWECC Labs maintainer and mentor work under the SWECC Technical Officer role.

## v2.5.1: Joe Builds Things Ep 4 (25 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.5.1)

- **Joe Builds Things Ep 4.** "Order For Me" (25 Oct 2026) is on the episodes page, featured as the latest episode, and the /projects Watch button now plays it.

## v2.5.0: Joe Builds Things episodes page (23 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.5.0)

- **Joe Builds Things episodes page.** A new page at `/projects/joe-builds-things/` lists every published episode newest first, features the latest one with a Watch button, and explains how the shorts are made. Each episode plays in the shared vertical player, so nothing loads from YouTube until someone clicks. The /projects card links to it, and its Watch button now always plays the newest episode. ([#13](https://github.com/JosephDavisC/Portfolio-Website/pull/13))
- **Lightbox focus.** Opening the lightbox moves focus to Close, Tab stays inside it, and closing returns focus to where it was. ([#13](https://github.com/JosephDavisC/Portfolio-Website/pull/13))
- **Episode build check.** The build fails if the newest episode is missing from the crawler fallback, `llms.txt` or the sitemap. ([#13](https://github.com/JosephDavisC/Portfolio-Website/pull/13))

## v2.4.0: circle theme switch and Joe Builds Things (23 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.4.0)

- **Circle reveal theme switch.** Switching between light and dark now runs as one View Transition: the new theme grows as a circle from the toggle instead of every element fading its colours, which stuttered on phones. Browsers without View Transitions, and visitors with reduced motion on, get an instant switch. ([#10](https://github.com/JosephDavisC/Portfolio-Website/pull/10))
- **README reel.** The README opens with a 12 second, 60 fps reel of the homepage, stored in `.github/` so it never ships with a deploy. ([#10](https://github.com/JosephDavisC/Portfolio-Website/pull/10))
- **Joe Builds Things on /projects.** A new card for the short comedy series, with Instagram, YouTube and TikTok links and a Watch Ep 2 button that opens the YouTube Short in a vertical player. The shared lightbox gained a video mode, and nothing loads from YouTube until someone clicks. ([#11](https://github.com/JosephDavisC/Portfolio-Website/pull/11))
- **Mono font fix.** The JetBrains Mono file held the Greek subset instead of Latin. It was replaced with the Latin file under a new name so cached copies cannot stick. (49767fc, 23 Oct 2026)
- **Analytics page speed.** The self-hosted Umami snippet now also measures page speed. Automatic pageviews stay off so the manual pageview tracking does not double count. (ebc3a3b, 23 Oct 2026)
- **Analytics ignores URL hashes.** The Umami snippet sets `data-exclude-hash`, so the events Umami records on its own drop the `#` part of the URL, matching the manual pageviews, which already send only the path and query. (23 Oct 2026)
- **This changelog** and a build check that runs on every pull request and every push to main.

## v2.3.0: mini Joe, motion and full AA contrast (21 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.3.0)

- **Mini Joe.** A small 3D version of Joseph in the About section's Journey card, with a drag to rotate viewer that only loads its 3D code on click. ([#6](https://github.com/JosephDavisC/Portfolio-Website/pull/6))
- **Motion.** Underlines slide in on nav and text links, buttons lift further, and the theme toggle, timeline rows and scroll to top button respond to hover. ([#8](https://github.com/JosephDavisC/Portfolio-Website/pull/8)) Project filters animate in place, about five times faster. ([#5](https://github.com/JosephDavisC/Portfolio-Website/pull/5))
- **Accessibility.** Every text and chip colour meets WCAG AA contrast in both themes, automated contrast failures went from 132 to 0, and a skip to content link was added. ([#9](https://github.com/JosephDavisC/Portfolio-Website/pull/9))
- **Performance.** Tennis and team photos resized and re-encoded, and the timeline lightbox opens the WebP version. ([#7](https://github.com/JosephDavisC/Portfolio-Website/pull/7)) The empty Google Tag Manager container was removed.
- **Case study.** The Transfer Tool case study got a designed share image ([#4](https://github.com/JosephDavisC/Portfolio-Website/pull/4)), a neutral voice, and images that open full size.
- **Contact.** The X link was swapped for the Joe Builds Things Instagram.

## v2.2.0: case studies, a blog, and AA contrast (19 Oct 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.2.0)

- **Project case studies.** `/projects/transfer-tool/` walks through the AI Transfer Evaluation Tool, built data driven so the next case study is a JSON entry. ([#3](https://github.com/JosephDavisC/Portfolio-Website/pull/3))
- **Blog.** A `/blog` index with an RSS feed, editorial cards, inline images that open full size, and new posts including the Personal Dashboard write up.
- **Experience page** at `/experience` with the full timeline. Whitespace closed out with photos and recommendations, and SWECC added.
- **Light mode contrast.** Text meets WCAG AA, with contrast failures down from 247 to 84 across 7 pages. ([#2](https://github.com/JosephDavisC/Portfolio-Website/pull/2)) Dark mode retired its last purple and pink accents.
- **Reliability.** WebP served everywhere, build guards for mistakes that only show up in production, and deploys that upload every new file before removing any old one.
- **Search and AI readers.** Crawler visible content on every page, consistent canonicals, richer structured data, a real 404, an accurate `llms.txt`, and self-hosted Umami analytics.
- **Content.** Open ended role durations recompute automatically, the resume was refreshed, and StarCamp Asia's name and logo were restored.

## v2.1.0: awards, testimonials, performance pass, and llms.txt (12 Aug 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.1.0)

- **New sections.** Awards and Honors, Testimonials, the garak (NVIDIA) project, and Google Project Management and Google Data Analytics credentials with detail pages.
- **Experience pages.** Per internship pages at `/experience/:slug` with company theme colours, a View Details button on the timeline, and an enhanced Sector page with a self-hosted video demo (Jan to Feb 2026). Whitespace and ICG added in Jul 2026.
- **Contact form** moved from EmailJS to a PHP backend with styled emails (Feb 2026), later made multi profile.
- **Security headers.** HSTS, CSP, X-Frame-Options and Permissions-Policy in `.htaccess` (Feb 2026).
- **Hero and About.** The hero leads with what Joseph builds and points its CTA at the work; skills are grouped.
- **Performance pass.** LazyMotion, analytics deferred to first interaction, preloaded fonts and hero image, and lighter assets. Mobile score 71 to 82, mobile LCP 6.7s to 3.3s.
- **Discoverability.** `llms.txt`, WebSite and SiteNavigationElement structured data, indexable images in the static HTML, and an expanded sitemap.

## v2.0.0: the redesign (28 Jan 2026)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v2.0.0)

- **New design system.** A paper textured neobrutalist look with Court Green and Espresso in light mode, and glassmorphism with neon blue accents in dark mode, with smooth theme transitions.
- **Projects page** at `/projects` with category filtering (AI, Web, Games, Data), added 6 Jan 2026.
- **Easter eggs.** UW Husky mode (type "UW" or "INFO"), tennis ball rain, and an Academic mode link on the profile picture.
- **Tennis.** Rackets merged into the Tennis and Coffee section, with head sizes.
- **Also in this period.** The AI Transfer Tool replaced the Coffee Shop project, a Medium article was added, an SEO documentation page and analytics were added, and dependency vulnerabilities were fixed.

## v1.0.0: official launch (17 Nov 2025)

[Release notes](https://github.com/JosephDavisC/Portfolio-Website/releases/tag/v1.0.0)

- **Main site.** A responsive React, TypeScript and Tailwind site with Framer Motion effects and a dark theme.
- **Blog.** BC Hacks 2024 and My Journey From Jakarta to UW. Talks and Events became a Blog section on 3 Nov 2025.
- **Projects.** IShowStream, JAM AI, Coffee Shop and Dino Marine VR.
- **SEO.** React Helmet, static meta tag generation, and Open Graph and Twitter Card previews.

## Before v1.0.0 (16 Aug to 17 Nov 2025)

No releases were tagged in this period. From the git history:

- **16 Aug 2025.** First commit.
- **22 Aug 2025.** Certifications back navigation without a hash, Tennis and Coffee tabs with a carousel and lightbox, and the rackets embed.
- **31 Aug to 5 Sep 2025.** The site was pushed to this repo, with a favicon, project pictures, certification logos, a custom cursor and README work. [#1](https://github.com/JosephDavisC/Portfolio-Website/pull/1) was a test PR.
- **Sep to Oct 2025.** A Show more on GitHub button, SEO fixes, UW and Sector added to the Milestones section, a footer warning about browser extensions, and a contact form using EmailJS (17 Oct 2025).
- **Nov 2025.** Folder restructure, hover effects and a new certifications UI, chibis, a fixed 404, the Journey article, and the IShowStream project.
