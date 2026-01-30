import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";

// Table of contents data
const tocItems = [
  { id: 'tech-stack', label: 'Tech Stack', number: 1, group: 'Architecture' },
  { id: 'project-structure', label: 'Project Structure', number: 2, group: 'Architecture' },
  { id: 'routing', label: 'Routing System', number: 3, group: 'Architecture' },
  { id: 'components', label: 'Component Architecture', number: 4, group: 'Architecture' },
  { id: 'data-management', label: 'Data Management', number: 5, group: 'SEO & Deployment' },
  { id: 'seo-problem', label: 'SEO Challenge', number: 6, group: 'SEO & Deployment' },
  { id: 'seo-solution', label: 'SEO Solution', number: 7, group: 'SEO & Deployment' },
  { id: 'build-deploy', label: 'Build & Deployment', number: 8, group: 'SEO & Deployment' },
];

export default function SeoDocs() {
  const [activeSection, setActiveSection] = useState('tech-stack');

  // Track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper portion of viewport
        threshold: 0
      }
    );

    // Observe all sections
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>SEO & Technical Documentation | Joseph Davis Chamdani</title>
        <meta name="description" content="How I solved React SPA SEO challenges with static page generation. Complete technical documentation for joechamdani.com — custom SEO optimization, Open Graph meta tags, and modern web architecture." />
        <link rel="canonical" href="https://joechamdani.com/seo-docs" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://joechamdani.com/seo-docs" />
        <meta property="og:title" content="SEO & Technical Documentation | Joseph Davis Chamdani" />
        <meta property="og:description" content="How I solved React SPA SEO challenges with static page generation. Custom SEO optimization, Open Graph meta tags, and modern web architecture." />
        <meta property="og:image" content="https://joechamdani.com/Logo_Joseph.PNG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://joechamdani.com/seo-docs" />
        <meta name="twitter:title" content="SEO & Technical Documentation | Joseph Davis Chamdani" />
        <meta name="twitter:description" content="How I solved React SPA SEO challenges with static page generation. Custom SEO optimization, Open Graph meta tags, and modern web architecture." />
        <meta name="twitter:image" content="https://joechamdani.com/Logo_Joseph.PNG" />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-20">
        <div className="flex">
          {/* Sticky Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-72 shrink-0">
            <nav className="fixed top-20 left-0 w-72 h-[calc(100vh-5rem)] overflow-y-auto border-r border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-6 pt-8">
              {/* Logo/Title */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px]">docs</span>
                </div>
                <h2 className="text-lg font-bold text-white">SEO Docs</h2>
                <p className="text-xs text-slate-500 mt-1">joechamdani.com</p>
              </div>

              {/* Architecture Group */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Architecture</h3>
                <ul className="space-y-1">
                  {tocItems.filter(item => item.group === 'Architecture').map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400 -ml-[2px]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                          activeSection === item.id ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {item.number}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SEO & Deployment Group */}
              <div className="mb-6">
                <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">SEO & Deployment</h3>
                <ul className="space-y-1">
                  {tocItems.filter(item => item.group === 'SEO & Deployment').map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400 -ml-[2px]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                          activeSection === item.id ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {item.number}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress indicator */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-xs text-slate-500 mb-2">Progress</div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                    style={{
                      width: `${((tocItems.findIndex(i => i.id === activeSection) + 1) / tocItems.length) * 100}%`
                    }}
                  />
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  {tocItems.findIndex(i => i.id === activeSection) + 1} of {tocItems.length}
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="max-w-4xl mx-auto py-12 px-6 lg:py-16 lg:px-12">
              {/* Header */}
              <header className="mb-12 border-b border-slate-700 pb-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 lg:hidden">
                  <span className="px-2 py-0.5 bg-slate-800 rounded">docs</span>
                  <span>/</span>
                  <span>technical-overview</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  SEO & Technical Documentation
                </h1>
                <p className="text-slate-400 text-lg">
                  How I solved React SPA SEO challenges with static page generation — complete documentation for joechamdani.com.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">React 18</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">TypeScript</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Vite</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Tailwind CSS</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Framer Motion</span>
                </div>
              </header>

              {/* Mobile Table of Contents */}
              <nav className="lg:hidden mb-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Table of Contents</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase mb-2">Architecture</h3>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      {tocItems.filter(item => item.group === 'Architecture').map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="hover:text-blue-400 transition-colors">
                            {item.number}. {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-slate-500 uppercase mb-2">SEO & Deployment</h3>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      {tocItems.filter(item => item.group === 'SEO & Deployment').map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} className="hover:text-blue-400 transition-colors">
                            {item.number}. {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>

              {/* Tech Stack */}
              <section id="tech-stack" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center text-sm">1</span>
              Tech Stack
            </h2>
            <div className="pl-11 space-y-6">
              <p className="text-slate-300">
                This portfolio is built as a modern Single Page Application (SPA) optimized for performance and developer experience.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Core Framework
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex justify-between"><span>React</span><span className="text-slate-500">v18.3</span></li>
                    <li className="flex justify-between"><span>TypeScript</span><span className="text-slate-500">v5.5</span></li>
                    <li className="flex justify-between"><span>Vite</span><span className="text-slate-500">v5.4</span></li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Styling & UI
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex justify-between"><span>Tailwind CSS</span><span className="text-slate-500">v3.4</span></li>
                    <li className="flex justify-between"><span>Framer Motion</span><span className="text-slate-500">v12</span></li>
                    <li className="flex justify-between"><span>Radix UI</span><span className="text-slate-500">shadcn/ui</span></li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Routing & State
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex justify-between"><span>React Router</span><span className="text-slate-500">v6</span></li>
                    <li className="flex justify-between"><span>TanStack Query</span><span className="text-slate-500">v5</span></li>
                    <li className="flex justify-between"><span>React Hook Form</span><span className="text-slate-500">v7</span></li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    SEO & Analytics
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex justify-between"><span>react-helmet-async</span><span className="text-slate-500">Meta tags</span></li>
                    <li className="flex justify-between"><span>Google Tag Manager</span><span className="text-slate-500">GTM</span></li>
                    <li className="flex justify-between"><span>Google Analytics 4</span><span className="text-slate-500">GA4</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Project Structure */}
          <section id="project-structure" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center text-sm">2</span>
              Project Structure
            </h2>
            <div className="pl-11 space-y-6">
              <p className="text-slate-300">
                The codebase follows a modular architecture with clear separation of concerns.
              </p>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  Project Root
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`src/
├── pages/                    # Route-level components
│   ├── Index.tsx             # Homepage (/)
│   ├── ProjectsPage.tsx      # Projects listing (/projects)
│   ├── ArticlePage.tsx       # Blog posts (/blog/:slug)
│   ├── CredentialPage.tsx    # Credentials (/credential/:slug)
│   └── NotFound.tsx          # 404 page
│
├── components/
│   ├── sections/             # Page sections
│   │   ├── Hero.tsx          # Landing hero
│   │   ├── About.tsx         # About me
│   │   ├── Milestones.tsx    # Timeline
│   │   ├── Portfolio.tsx     # Featured projects
│   │   ├── Certifications.tsx
│   │   ├── Blog.tsx          # Blog preview
│   │   ├── TennisCoffeeSection.tsx
│   │   ├── RacketCard.tsx    # Tennis racket display
│   │   ├── Contact.tsx       # Contact form
│   │   └── Lightbox.tsx      # Image modal
│   │
│   ├── shared/               # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── ScrollUpButton.tsx
│   │
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       └── ...
│
├── data/                     # Static JSON data
│   ├── projects.json
│   ├── articles.json
│   ├── credentials.json
│   └── milestones.json
│
├── lib/                      # Utilities
│   └── utils.ts
│
└── App.tsx                   # Root component & routing`}</code></pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  Build & Config Files
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`root/
├── scripts/
│   ├── generate-static-pages.js   # SEO static page generator
│   ├── generate-blog-meta.js      # Blog meta generator
│   └── deploy-ftp.js              # FTP deployment script
│
├── public/
│   ├── images/                    # Static images
│   │   ├── portfolio/
│   │   ├── rackets/
│   │   ├── moments/
│   │   └── chibis/
│   ├── sitemap.xml
│   └── robots.txt
│
├── index.html                     # Entry HTML (with GTM/GA4)
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration`}</code></pre>
              </div>
            </div>
          </section>

          {/* Routing */}
          <section id="routing" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center text-sm">3</span>
              Routing System
            </h2>
            <div className="pl-11 space-y-6">
              <p className="text-slate-300">
                Client-side routing is handled by React Router v6 with the following route structure:
              </p>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  src/App.tsx
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/credential/:slug" element={<CredentialPage />} />
  <Route path="/blog/:slug" element={<ArticlePage />} />
  <Route path="*" element={<NotFound />} />
</Routes>`}</code></pre>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Route</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Component</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><code className="text-blue-400">/</code></td>
                      <td className="py-3 px-4">Index.tsx</td>
                      <td className="py-3 px-4">Homepage with all sections (Hero, About, Portfolio, etc.)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><code className="text-blue-400">/projects</code></td>
                      <td className="py-3 px-4">ProjectsPage.tsx</td>
                      <td className="py-3 px-4">All projects with category filtering</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><code className="text-blue-400">/blog/:slug</code></td>
                      <td className="py-3 px-4">ArticlePage.tsx</td>
                      <td className="py-3 px-4">Individual blog post (dynamic route)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4"><code className="text-blue-400">/credential/:slug</code></td>
                      <td className="py-3 px-4">CredentialPage.tsx</td>
                      <td className="py-3 px-4">Certification details with PDF viewer</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4"><code className="text-blue-400">/*</code></td>
                      <td className="py-3 px-4">NotFound.tsx</td>
                      <td className="py-3 px-4">404 error page</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center text-sm">4</span>
              Component Architecture
            </h2>
            <div className="pl-11 space-y-6">
              <p className="text-slate-300">
                Components are organized into three categories based on their scope and reusability.
              </p>

              <div className="grid gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-cyan-400 mb-3">Page Components</h3>
                  <p className="text-slate-400 text-sm mb-3">Top-level components that correspond to routes. Each page manages its own SEO meta tags using react-helmet-async.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Index', 'ProjectsPage', 'ArticlePage', 'CredentialPage', 'NotFound'].map((c) => (
                      <code key={c} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{c}.tsx</code>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-purple-400 mb-3">Section Components</h3>
                  <p className="text-slate-400 text-sm mb-3">Large content blocks used within pages. Each section is self-contained with its own animations and state.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Hero', 'About', 'Milestones', 'Portfolio', 'Certifications', 'Blog', 'TennisCoffeeSection', 'Contact'].map((c) => (
                      <code key={c} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{c}.tsx</code>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-green-400 mb-3">Shared Components</h3>
                  <p className="text-slate-400 text-sm mb-3">Reusable UI elements used across multiple pages. These handle common functionality like navigation and scroll behavior.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Navbar', 'Footer', 'ScrollProgress', 'ScrollUpButton', 'Lightbox'].map((c) => (
                      <code key={c} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{c}.tsx</code>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-amber-400 mb-3">UI Components (shadcn/ui)</h3>
                  <p className="text-slate-400 text-sm mb-3">Low-level UI primitives built on Radix UI. These provide accessible, unstyled components that are customized with Tailwind.</p>
                  <div className="flex flex-wrap gap-2">
                    {['Button', 'Dialog', 'Tooltip', 'Tabs', 'Card', 'Badge'].map((c) => (
                      <code key={c} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">{c.toLowerCase()}.tsx</code>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section id="data-management" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center text-sm">5</span>
              Data Management
            </h2>
            <div className="pl-11 space-y-6">
              <p className="text-slate-300">
                Content is stored in JSON files within the <code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm">src/data/</code> directory and imported directly into components.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                    projects.json
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto"><code className="text-slate-300">{`{
  "title": "Project Name",
  "category": "AI | Web | Games",
  "featured": true,
  "image": "/images/portfolio/...",
  "imageStyle": "cover-purple",
  "tech": ["React", "Python"],
  "description": "...",
  "github": "https://...",
  "demo": "https://..."
}`}</code></pre>
                </div>

                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                    articles.json
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto"><code className="text-slate-300">{`{
  "slug": "my-journey",
  "title": "Article Title",
  "date": "2024-01-15",
  "readTime": "5 min read",
  "tags": ["Career", "Tech"],
  "image": "/images/blog/...",
  "content": "Markdown content..."
}`}</code></pre>
                </div>

                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                    credentials.json
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto"><code className="text-slate-300">{`{
  "slug": "google-data-analytics",
  "title": "Certification Name",
  "issuer": "Google",
  "date": "2024",
  "pdfPath": "/credentials/...",
  "credentialUrl": "https://..."
}`}</code></pre>
                </div>

                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                    milestones.json
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto"><code className="text-slate-300">{`{
  "year": "2024",
  "title": "Event Title",
  "description": "...",
  "type": "education | work",
  "icon": "graduation-cap"
}`}</code></pre>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Problem */}
          <section id="seo-problem" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center text-sm">6</span>
              SEO Challenge
            </h2>
            <div className="pl-11 space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="font-medium text-red-400 mb-3">The SPA Problem</h3>
                <p className="text-slate-300 mb-4">
                  Single Page Applications have a fundamental SEO limitation: there's only one HTML file. All navigation happens client-side via JavaScript.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-slate-500 mb-2"># What social media crawlers see:</div>
                  <div className="text-slate-300">URL: joechamdani.com/projects</div>
                  <div className="text-slate-300">HTML: index.html</div>
                  <div className="text-red-400">Meta: "Joseph Davis Chamdani | Informatics @ UW" ← Wrong!</div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <h3 className="font-medium text-amber-400 mb-3">Why This Matters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Social Media Previews</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Discord, WhatsApp, Twitter don't run JavaScript</li>
                      <li>• They read only the raw HTML meta tags</li>
                      <li>• Link previews show incorrect information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Search Engines</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Google can execute JS (but prefers static HTML)</li>
                      <li>• Other search engines may not</li>
                      <li>• Slower indexing with JS-rendered content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Solution */}
          <section id="seo-solution" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center text-sm">7</span>
              SEO Solution
            </h2>
            <div className="pl-11 space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="font-medium text-green-400 mb-3">Static Page Generation</h3>
                <p className="text-slate-300">
                  A Node.js build script generates route-specific HTML files with correct meta tags. Each file loads the same React app but has customized {'<head>'} content.
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-400 ml-2">Build Pipeline</span>
                </div>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 w-48">vite build</span>
                    <span className="text-slate-500">→ Compile React app to dist/</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 w-48">generate-blog-meta.js</span>
                    <span className="text-slate-500">→ Create /blog/*/index.html</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 w-48">generate-static-pages.js</span>
                    <span className="text-slate-500">→ Create /projects/index.html</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 w-48">deploy-ftp.js</span>
                    <span className="text-slate-500">→ Upload to server</span>
                  </div>
                </div>
              </div>

              {/* Script Comparison */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                <h3 className="font-medium text-blue-400 mb-4">Two Scripts, Two Approaches</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">generate-static-pages.js</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      <strong>Template-based replacement.</strong> Uses the compiled index.html as a base and replaces meta tags via regex.
                    </p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• Inherits GTM, GA4, Schema.org from index.html</li>
                      <li>• Best for pages similar to homepage</li>
                      <li>• Keeps all existing head content</li>
                      <li>• Used for: /projects, /seo-docs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">generate-blog-meta.js</h4>
                    <p className="text-slate-300 text-sm mb-3">
                      <strong>Fresh HTML generation.</strong> Creates entirely new HTML files with only essential tags and asset references.
                    </p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      <li>• Minimal, clean HTML output</li>
                      <li>• Extracts JS/CSS hashes from index.html</li>
                      <li>• Best for content with unique images</li>
                      <li>• Used for: /blog/* articles</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  scripts/generate-static-pages.js — Template Replacement
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

// Define pages with their SEO metadata
const pages = [
  {
    path: 'projects',
    title: "Projects | Joseph's Portfolio",
    description: "Explore Joseph Chamdani's portfolio of AI, web, and game projects.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/projects'
  },
  {
    path: 'seo-docs',
    title: "SEO & Technical Documentation | Joseph Davis Chamdani",
    description: "How I solved React SPA SEO challenges with static page generation.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',
    url: 'https://joechamdani.com/seo-docs'
  }
];

// Read the compiled index.html as template (contains GTM, GA4, Schema.org, etc.)
const baseHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');

for (const page of pages) {
  let html = baseHtml;

  // Replace primary meta tags
  html = html.replace(/<title>.*?<\\/title>/, \`<title>\${page.title}</title>\`);
  html = html.replace(/<meta name="description" content=".*?" \\/>/,
    \`<meta name="description" content="\${page.description}" />\`);
  html = html.replace(/<link rel="canonical" href=".*?" \\/>/,
    \`<link rel="canonical" href="\${page.url}" />\`);

  // Replace Open Graph tags
  html = html.replace(/<meta property="og:url" content=".*?" \\/>/,
    \`<meta property="og:url" content="\${page.url}" />\`);
  html = html.replace(/<meta property="og:title" content=".*?" \\/>/,
    \`<meta property="og:title" content="\${page.title}" />\`);
  html = html.replace(/<meta property="og:description" content=".*?" \\/>/,
    \`<meta property="og:description" content="\${page.description}" />\`);
  html = html.replace(/<meta property="og:image" content=".*?" \\/>/,
    \`<meta property="og:image" content="\${page.image}" />\`);

  // Replace Twitter tags (note: uses name= not property=)
  html = html.replace(/<meta name="twitter:url" content=".*?" \\/>/,
    \`<meta name="twitter:url" content="\${page.url}" />\`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \\/>/,
    \`<meta name="twitter:title" content="\${page.title}" />\`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \\/>/,
    \`<meta name="twitter:description" content="\${page.description}" />\`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \\/>/,
    \`<meta name="twitter:image" content="\${page.image}" />\`);

  // Create directory and write file
  const pageDir = path.join(distPath, page.path);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'index.html'), html);
  console.log(\`[+] Generated: \${page.path}/index.html\`);
}`}</code></pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden mt-6 border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  scripts/generate-blog-meta.js — Fresh Generation
                </div>
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  scripts/generate-blog-meta.js
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');

// Define blog posts with their SEO metadata
const blogMeta = {
  'my-journey': {
    title: 'My Journey: From Jakarta to UW | Joseph Davis Chamdani',
    description: 'How I moved from Indonesia to Seattle...',
    image: 'https://joechamdani.com/article_media/journey/Graduation_Peace.png',
    url: 'https://joechamdani.com/blog/my-journey'
  },
  'bc-hacks-2024': {
    title: 'BC Hacks 2024 Lecture | Joseph Davis Chamdani',
    description: 'After helping organize and launch BC Hacks 2024...',
    image: 'https://joechamdani.com/article_media/bc-hacks-2024/Group_Photo.png',
    url: 'https://joechamdani.com/blog/bc-hacks-2024'
  }
};

// Read the main index.html to get the asset file names
function getAssetReferences() {
  const indexPath = path.join(distPath, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // Extract CSS and JS references (with cache-busting hashes)
  const cssMatch = indexHtml.match(/href="(\\/assets\\/index-[^"]+\\.css)"/);
  const jsMatch = indexHtml.match(/src="(\\/assets\\/index-[^"]+\\.js)"/);

  return {
    css: cssMatch ? cssMatch[1] : '',
    js: jsMatch ? jsMatch[1] : ''
  };
}

function generateHTML(slug, meta, assets) {
  return \`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>\${meta.title}</title>
    <meta name="description" content="\${meta.description}" />

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="\${meta.url}" />
    <meta property="og:title" content="\${meta.title}" />
    <meta property="og:description" content="\${meta.description}" />
    <meta property="og:image" content="\${meta.image}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="\${meta.url}" />
    <meta property="twitter:title" content="\${meta.title}" />
    <meta property="twitter:description" content="\${meta.description}" />
    <meta property="twitter:image" content="\${meta.image}" />

    <!-- Load the main app's CSS and JS -->
    <script type="module" crossorigin src="\${assets.js}"></script>
    <link rel="stylesheet" crossorigin href="\${assets.css}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>\`;
}

// Get asset references from main index.html
const assets = getAssetReferences();

// Create blog directory and generate HTML for each post
const blogPath = path.join(distPath, 'blog');
fs.mkdirSync(blogPath, { recursive: true });

Object.entries(blogMeta).forEach(([slug, meta]) => {
  const postPath = path.join(blogPath, slug);
  fs.mkdirSync(postPath, { recursive: true });

  const htmlPath = path.join(postPath, 'index.html');
  const html = generateHTML(slug, meta, assets);
  fs.writeFileSync(htmlPath, html);
  console.log(\`✓ Generated \${htmlPath}\`);
});

console.log('Blog meta pages generated successfully!');`}</code></pre>
              </div>

              <h3 className="text-lg font-medium text-white mt-8 mb-4">Output Structure</h3>
              <div className="bg-slate-800 rounded-xl p-6 font-mono text-xs border border-slate-700 overflow-x-auto">
                <pre className="text-slate-300">{`dist/
├── index.html           # Homepage (original)
├── projects/
│   └── index.html       # static-pages.js
├── seo-docs/
│   └── index.html       # static-pages.js
├── blog/
│   ├── my-journey/
│   │   └── index.html   # blog-meta.js
│   └── bc-hacks-2024/
│       └── index.html   # blog-meta.js
└── assets/
    ├── index-[hash].js  # React bundle
    └── index-[hash].css # Styles`}</pre>
              </div>

              {/* When to use which */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mt-6">
                <h3 className="font-medium text-amber-400 mb-4">When to Use Which Script?</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-500/30">
                        <th className="text-left py-2 px-3 text-slate-300 font-medium">Use Case</th>
                        <th className="text-left py-2 px-3 text-slate-300 font-medium">Script</th>
                        <th className="text-left py-2 px-3 text-slate-300 font-medium">Why</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-400">
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 px-3">New static page (e.g., /about)</td>
                        <td className="py-2 px-3"><code className="text-green-400">generate-static-pages.js</code></td>
                        <td className="py-2 px-3">Keeps analytics, schema, existing head tags</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 px-3">New blog article</td>
                        <td className="py-2 px-3"><code className="text-purple-400">generate-blog-meta.js</code></td>
                        <td className="py-2 px-3">Each article has unique thumbnail image</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-2 px-3">Page with same logo/image</td>
                        <td className="py-2 px-3"><code className="text-green-400">generate-static-pages.js</code></td>
                        <td className="py-2 px-3">Simpler - just add to pages array</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Content with unique preview image</td>
                        <td className="py-2 px-3"><code className="text-purple-400">generate-blog-meta.js</code></td>
                        <td className="py-2 px-3">Clean HTML, full control over meta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mt-6">
                <h3 className="font-medium text-white mb-3">Meta Tags Generated</h3>
                <div className="grid gap-2">
                  {[
                    { tag: '<title>', desc: 'Browser tab & search results' },
                    { tag: '<meta name="description">', desc: 'Search result snippet' },
                    { tag: '<link rel="canonical">', desc: 'Prevents duplicate content' },
                    { tag: '<meta property="og:title">', desc: 'Social media title' },
                    { tag: '<meta property="og:description">', desc: 'Social media description' },
                    { tag: '<meta property="og:image">', desc: 'Social media preview image' },
                    { tag: '<meta property="og:url">', desc: 'Social media URL' },
                    { tag: '<meta name="twitter:card">', desc: 'Twitter card type' },
                    { tag: '<meta name="twitter:title">', desc: 'Twitter title' },
                    { tag: '<meta name="twitter:image">', desc: 'Twitter preview image' },
                  ].map((item) => (
                    <div key={item.tag} className="flex items-center justify-between py-2 px-3 bg-slate-800 rounded-lg">
                      <code className="text-blue-400 text-xs">{item.tag}</code>
                      <span className="text-slate-400 text-xs">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Flow Example */}
              <h3 className="text-lg font-medium text-white mt-8 mb-4">Article Data Flow</h3>
              <p className="text-slate-300 mb-4">
                The blog system uses a centralized data file that feeds both the React components and the build-time SEO scripts.
              </p>

              <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-400 ml-2">Data Flow Diagram</span>
                </div>
                <pre className="text-slate-300">{`src/data/articles.json          ← Single source of truth
        │
        ├──→ Blog.tsx               → Homepage blog preview cards
        │
        ├──→ ArticlePage.tsx        → Full article + client-side meta
        │
        └──→ generate-blog-meta.js  → Static HTML with server-side meta`}</pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  src/data/articles.json
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`[
  {
    "id": "my-journey",
    "title": "My Journey: From Jakarta to UW",
    "date": "November 2025",
    "location": "Seattle, WA",
    "preview": "How I moved from Indonesia to Seattle at 15...",
    "thumbnail": "article_media/journey/Graduation_Peace.png",
    "tags": ["Personal", "Education", "Journey"],
    "hasFullArticle": true
  },
  {
    "id": "bc-hacks-2024",
    "title": "BC Hacks 2024 Lecture",
    "date": "July 2024",
    "preview": "After helping organize and launch BC Hacks 2024...",
    "thumbnail": "media/BCHACKS_Thumbnail.png",
    "externalLinks": [...],
    "tags": ["Talks", "Hackathon", "Education"]
  }
]`}</code></pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  src/pages/ArticlePage.tsx — SEO Meta Tags
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`import { Helmet } from 'react-helmet-async';
import { articles } from '@/components/sections/Blog';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.id === slug);

  // Build SEO metadata from article data
  const pageTitle = \`\${article.title} | Joseph Davis Chamdani\`;
  const pageDescription = article.preview;
  const pageUrl = \`https://joechamdani.com/blog/\${article.id}\`;
  const imageUrl = article.thumbnail
    ? \`https://joechamdani.com/\${article.thumbnail}\`
    : 'https://joechamdani.com/og-image.png';

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Article specific */}
        <meta property="article:author" content="Joseph Davis Chamdani" />
        <meta property="article:published_time" content={article.date} />
      </Helmet>
      {/* ... article content ... */}
    </>
  );
};`}</code></pre>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mt-6">
                <h4 className="font-medium text-blue-400 mb-2">Why Both Client & Server Meta?</h4>
                <p className="text-slate-300 text-sm">
                  <strong>ArticlePage.tsx</strong> uses react-helmet-async for users who navigate within the app (client-side routing).
                  <strong> generate-blog-meta.js</strong> creates static HTML files for social media crawlers and search engines that don't execute JavaScript.
                  Both use the same article data, ensuring consistency.
                </p>
              </div>

              {/* Projects Data Flow */}
              <h3 className="text-lg font-medium text-white mt-10 mb-4">Projects Data Flow</h3>
              <p className="text-slate-300 mb-4">
                The projects page follows a similar pattern, using centralized JSON data that feeds both React components and the build-time static page generator.
              </p>

              <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm mb-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-400 ml-2">Projects Data Flow</span>
                </div>
                <pre className="text-slate-300">{`src/data/projects.json            ← Single source of truth
        │
        ├──→ Portfolio.tsx              → Homepage featured projects
        │
        ├──→ ProjectsPage.tsx           → All projects + client-side meta
        │
        └──→ generate-static-pages.js   → Static HTML for /projects`}</pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden mb-6 border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  src/data/projects.json
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`[
  {
    "title": "IShowStream",
    "category": "AI",
    "featured": true,
    "image": "/images/portfolio/IShowStream_Logo.png",
    "tech": ["React", "Python", "Go", "Gemini AI"],
    "description": "A real-time AI streaming assistant...",
    "github": "https://github.com/...",
    "demo": "https://..."
  },
  {
    "title": "Portfolio Website",
    "category": "Web",
    "featured": true,
    "image": "/images/portfolio/Logo_Joseph.PNG",
    "tech": ["React", "TypeScript", "Tailwind"],
    "description": "The site you're looking at...",
    "github": "https://github.com/..."
  }
]`}</code></pre>
              </div>

              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  src/pages/ProjectsPage.tsx — Client-side SEO
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`import { Helmet } from 'react-helmet-async';
import projectsData from '@/data/projects.json';

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const projects = projectsData as Project[];

  // Filter by category
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Projects | Joseph's Portfolio</title>
        <meta name="description" content="Explore Joseph Chamdani's portfolio..." />
        <link rel="canonical" href="https://joechamdani.com/projects" />

        {/* Open Graph */}
        <meta property="og:title" content="Projects | Joseph's Portfolio" />
        <meta property="og:description" content="Explore Joseph Chamdani's portfolio..." />
        <meta property="og:url" content="https://joechamdani.com/projects" />
        <meta property="og:image" content="https://joechamdani.com/Logo_Joseph.PNG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Joseph's Portfolio" />
        <meta name="twitter:image" content="https://joechamdani.com/Logo_Joseph.PNG" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects | Joseph's Portfolio",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": projectsData.map((project, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "CreativeWork",
                  "name": project.title,
                  "description": project.description
                }
              }))
            }
          })}
        </script>
      </Helmet>

      {/* Category filter tabs + project grid */}
      {filteredProjects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </>
  );
};`}</code></pre>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mt-6">
                <h4 className="font-medium text-green-400 mb-2">Static Page Generation for /projects</h4>
                <p className="text-slate-300 text-sm mb-3">
                  The <code className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">generate-static-pages.js</code> script creates a static HTML file for the projects page. Unlike blog posts, it uses the same Logo image and inherits analytics from the base index.html.
                </p>
                <pre className="bg-slate-900 rounded-lg p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`// In generate-static-pages.js
const pages = [
  {
    path: 'projects',
    title: "Projects | Joseph's Portfolio",
    description: "Explore Joseph Chamdani's portfolio of AI, web, and game projects.",
    image: 'https://joechamdani.com/Logo_Joseph.PNG',  // Same logo for all
    url: 'https://joechamdani.com/projects'
  },
  // ... other static pages like /seo-docs
];`}</code></pre>
              </div>

              {/* SEO Preview Examples */}
              <h3 className="text-lg font-medium text-white mt-10 mb-4">Social Media Preview Results</h3>
              <p className="text-slate-300 mb-4">
                These screenshots show how the blog posts appear when shared on social media platforms like Discord, WhatsApp, and Twitter.
                The previews are stored in <code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm">public/docs/</code> for reference.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    my-journey-seo.png
                  </div>
                  <div className="p-4">
                    <img
                      src="/docs/my-journey-seo.webp"
                      alt="My Journey blog post social media preview"
                      className="w-full rounded-lg border border-slate-600"
                    />
                    <p className="text-slate-400 text-xs mt-3 text-center">
                      /blog/my-journey preview card
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    bchacks-seo.png
                  </div>
                  <div className="p-4">
                    <img
                      src="/docs/bchacks-seo.webp"
                      alt="BC Hacks 2024 blog post social media preview"
                      className="w-full rounded-lg border border-slate-600"
                    />
                    <p className="text-slate-400 text-xs mt-3 text-center">
                      /blog/bc-hacks-2024 preview card
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm mt-6">
                <div className="text-slate-400 text-xs mb-3">public/docs/ structure</div>
                <pre className="text-slate-300">{`public/docs/
├── my-journey-seo.png      # Screenshot of My Journey social preview
└── bchacks-seo.png         # Screenshot of BC Hacks social preview`}</pre>
              </div>
            </div>
          </section>

          {/* Build & Deploy */}
          <section id="build-deploy" className="mb-16 scroll-mt-28">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center text-sm">8</span>
              Build & Deployment
            </h2>
            <div className="pl-11 space-y-6">
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <div className="bg-slate-700/50 px-4 py-2 text-sm text-slate-400 border-b border-slate-700">
                  package.json scripts
                </div>
                <pre className="p-4 text-sm overflow-x-auto"><code className="text-slate-300">{`{
  "scripts": {
    "dev": "vite",
    "build": "vite build && node scripts/generate-blog-meta.js && node scripts/generate-static-pages.js",
    "preview": "vite preview",
    "deploy": "npm run build && node scripts/deploy-ftp.js"
  }
}`}</code></pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-green-400 mb-2">Development</h3>
                  <code className="text-lg">npm run dev</code>
                  <p className="text-slate-400 text-sm mt-2">Starts Vite dev server on port 8080 with HMR</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-blue-400 mb-2">Production Build</h3>
                  <code className="text-lg">npm run build</code>
                  <p className="text-slate-400 text-sm mt-2">Compiles app + generates static HTML pages</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-purple-400 mb-2">Preview</h3>
                  <code className="text-lg">npm run preview</code>
                  <p className="text-slate-400 text-sm mt-2">Preview production build locally</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                  <h3 className="font-medium text-amber-400 mb-2">Deploy</h3>
                  <code className="text-lg">npm run deploy</code>
                  <p className="text-slate-400 text-sm mt-2">Build + upload to server via FTP</p>
                </div>
              </div>

            </div>
          </section>

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-slate-700">
                <div className="flex items-center justify-between text-slate-500 text-sm">
                  <span>Last updated: January 2025</span>
                  <span>joechamdani.com/seo-docs</span>
                </div>
              </footer>
            </article>
          </main>
        </div>
      </div>
    </>
  );
}
