import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Milestones from '@/components/sections/Milestones';
import milestonesData from '@/data/milestones.json';

const pageUrl = 'https://joechamdani.com/experience/';
const pageTitle = 'Experience · Joseph Davis Chamdani';
const pageDescription =
  "Every internship, club, and job on Joseph Davis Chamdani's path: AI work at Whitespace, Sector, and Stockbit, game development at Touchten and VR Park.";

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const companyCount = (milestonesData as { companies: unknown[] }).companies.length;

  return (
    <div className="min-h-screen bg-paper">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://joechamdani.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://joechamdani.com/preview.png" />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            state={{ scrollTo: 'milestones' }}
            className="inline-flex items-center text-espresso/60 hover:text-espresso dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-10 group font-mono text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
              Experience &{' '}
              <span className="relative inline-block">
                Milestones
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C30 4 60 10 100 6C140 2 170 9 198 5"
                    className="stroke-court dark:stroke-[#60A5FA] transition-colors duration-300"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-espresso/60 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-mono">
              All {companyCount} places I have worked, built, and led, from Jakarta to Seattle
            </p>
          </m.div>

          <Milestones variant="full" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencePage;
