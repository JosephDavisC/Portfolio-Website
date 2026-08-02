import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Navbar from '@/components/shared/Navbar';


const Portfolio = React.lazy(() => import('@/components/sections/Portfolio'));
const Certification = React.lazy(() => import('@/components/sections/Certifications'));
const Awards = React.lazy(() => import('@/components/sections/Awards'));
const Milestones = React.lazy(() => import('@/components/sections/Milestones'));
const Blog = React.lazy(() => import('@/components/sections/Blog'));
const TennisCoffeeSection = React.lazy(() => import('@/components/sections/TennisCoffeeSection'));
const Testimonials = React.lazy(() => import('@/components/sections/Testimonials'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));
const Footer = React.lazy(() => import('@/components/shared/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <Helmet>
        <title>Joseph Davis Chamdani | Informatics @ UW</title>
      </Helmet>
      <Navbar />
      <Hero />
      <About />

      <Suspense fallback={<div className="text-slate-400 text-center py-10">Loading...</div>}>
        <Milestones />
        <Portfolio />
        <Certification />
        <Awards />
        <Blog />
        <TennisCoffeeSection />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
