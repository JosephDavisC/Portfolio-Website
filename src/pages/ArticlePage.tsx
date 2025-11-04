import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { articles } from '@/components/sections/Blog';

// Article content components - add full content for each article here
const ArticleContent: React.FC<{ articleId: string }> = ({ articleId }) => {
  switch (articleId) {
    case 'bc-hacks-2024':
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            After helping organize and launch BC Hacks 2024, I was invited to give a lecture at
            Bellevue College about what it actually takes to run a successful hackathon. This session
            was specially arranged for a group of 20+ Korean exchange students visiting from Korea,
            and it became one of my favorite moments of the summer. It was a chance to reflect on everything
            our team built together.
          </p>

          <h2 className="text-3xl font-bold text-red-400 mb-6">What Is BC Hacks?</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            BC Hacks is Bellevue College's annual student-run hackathon, a weekend where students
            from all backgrounds come together to brainstorm, design, and build creative projects in
            just 48 hours. It's completely beginner-friendly and organized by a collaboration of five
            student clubs: BC Tech Club, ACM, Innovators Hub, AI Ethics Club, and Filmmaking Club.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            The goal is simple: create a space that empowers students to innovate, learn new tools,
            and connect with mentors and industry professionals.
          </p>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/Group_Photo.png"
              alt="BC Hacks 2024 participants and organizers"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              BC Hacks 2024 participants and organizers
            </p>
          </div>

          <h2 className="text-3xl font-bold text-red-400 mb-6">Five Months of Planning</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Running a hackathon sounds exciting, but it's really a five-month journey of planning,
            coordination, and teamwork.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 1: Initial Planning</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We formed the organizing team, brainstormed the theme, and reached out to potential judges
            and mentors. Our vision was clear: make BC Hacks open to everyone, not just computer science majors.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 2: Logistics & Budgeting</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We secured Room U301 as our venue, drafted a budget of around $31,000, and set up
            communication platforms for the teams. Every small detail, from tables to name tags,
            needed careful planning.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 3: Outreach & Workshops</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Marketing kicked off, mentors confirmed, and judges finalized. We sent out judging rubrics
            and began preparing workshops like Intro to AI, Intro to API, and Intro to Git with
            guest speakers from Amazon, Google, and Microsoft.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 4: Preparation</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            The website went live, schedules were finalized, and our food vendors were booked. Everything
            was starting to come together.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 5: Execution Prep</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We tested equipment, trained volunteers, and ran a full dry-run of the event. It was a mix
            of nerves and excitement, but we were ready.
          </p>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/Venue.png"
              alt="BC Hacks venue setup in Room U301"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              The venue setup in Room U301, ready for participants
            </p>
          </div>

          <h2 className="text-3xl font-bold text-red-400 mb-6">The Event Weekend</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            <strong className="text-slate-200">Day 1:</strong> Students checked in, grabbed swag bags,
            and joined hands-on workshops. Everyone was excited to learn and build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/Workshops.png"
                alt="Workshop session at BC Hacks"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Workshop sessions with guest speakers
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/Participants.png"
                alt="Students working on their projects"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Students collaborating on their projects
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            <strong className="text-slate-200">Day 2:</strong> Teams pitched their projects to a panel
            of six judges and fourteen mentors from companies like Meta, T-Mobile, and Hiya. Submissions
            were done through DevPost, and each group had to present both slides and a live demo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/Judging_1.png"
                alt="Teams presenting to judges"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Teams presenting their projects to judges
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/Judging_2.png"
                alt="Project demonstrations"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Live project demonstrations and Q&A
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            By the end of the second day, we announced winners for the three tracks:
          </p>
          <ul className="text-slate-300 text-lg leading-relaxed mb-6 list-disc list-inside space-y-2 ml-6">
            <li>Business & Innovation</li>
            <li>Personal Development & Wellness</li>
            <li>Education & Accessibility</li>
          </ul>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/Winners.png"
              alt="BC Hacks 2024 award ceremony"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              Celebrating the winning teams at BC Hacks 2024
            </p>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            But honestly, the best part wasn't the prizes. It was seeing students collaborate, learn
            from mentors, and make something they were proud of.
          </p>

          <h2 className="text-3xl font-bold text-red-400 mb-6">What I Learned</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            BC Hacks taught me that organizing an event like this is just as challenging as building
            a project in it. Coordinating across multiple clubs meant balancing ideas, responsibilities,
            and timelines. It pushed me to lead meetings, manage deadlines, and communicate effectively.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            More importantly, it showed me how powerful community can be. Mentors gave real-world advice,
            judges shared career insights, and students supported each other through every bug and crash.
          </p>

          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-6 my-8">
            <p className="text-blue-300 text-lg italic">
              BC Hacks 2024 wasn't just a weekend of coding. It was a celebration of creativity,
              teamwork, and resilience. Sharing our story with the visiting students reminded me that
              hackathons are more than competitions. They're platforms for growth and connection.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-red-400 mb-6">Closing Thoughts</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            If you're thinking of organizing a hackathon yourself, do it. Start small, stay consistent,
            and keep your team motivated. The impact you create will be bigger than you think.
          </p>
        </div>
      );

    // Add more article content here as you write them
    // case 'my-journey':
    //   return (
    //     <div className="prose prose-invert max-w-none">
    //       <h2>From Jakarta to Seattle</h2>
    //       <p>Your story here...</p>
    //     </div>
    //   );

    default:
      return (
        <div className="text-center py-20">
          <p className="text-slate-400 text-xl">Article content coming soon...</p>
        </div>
      );
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.id === slug);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If article doesn't exist, redirect to home
  if (!article) {
    return <Navigate to="/" replace />;
  }

  // SEO metadata
  const pageTitle = `${article.title} | Joseph Davis Chamdani`;
  const pageDescription = article.preview;
  const pageUrl = `https://joechamdani.com/blog/${article.id}`;
  const imageUrl = article.thumbnail
    ? `https://joechamdani.com/${article.thumbnail}`
    : 'https://joechamdani.com/og-image.png'; // fallback image

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Article specific tags */}
        <meta property="article:author" content="Joseph Davis Chamdani" />
        <meta property="article:published_time" content={article.date} />
        {article.tags && article.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <Navbar />

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-6 px-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            state={{ scrollTo: "blog" }}
            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Metadata */}
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {article.location ? `${article.location} — ${article.date}` : article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            {article.title}
          </h1>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Thumbnail */}
          {article.thumbnail && (
            <a
              href={article.externalLinks?.[0]?.url || article.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 rounded-2xl overflow-hidden shadow-2xl hover:opacity-90 transition-opacity"
            >
              <img
                src={`/${article.thumbnail}`}
                alt={article.title}
                className="w-full object-cover"
              />
            </a>
          )}
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <ArticleContent articleId={article.id} />

          {/* External Links Section */}
          {(article.externalLinks || article.externalLink) && (
            <div className="mt-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Related Resources</h3>
              <div className="flex flex-col gap-3">
                {article.externalLinks ? (
                  article.externalLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {link.text}
                    </a>
                  ))
                ) : (
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {article.externalLinkText || 'View External Resource'}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              state={{ scrollTo: "blog" }}
              className="inline-flex items-center px-6 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50 transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ArticlePage;
