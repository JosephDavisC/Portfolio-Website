import React, { Suspense } from 'react';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Navbar from '@/components/Navbar';
import ScrollFromState from "@/components/ScrollToTop";


const Portfolio = React.lazy(() => import('@/components/Portfolio'));
const Certification = React.lazy(() => import('@/components/Certifications'));
const Milestones = React.lazy(() => import('@/components/Milestones'));
const Talks = React.lazy(() => import('@/components/Talks'));
const TennisCoffeeSection = React.lazy(() => import('@/components/TennisCoffeeSection'));
const Contact = React.lazy(() => import('@/components/Contact'));
const Footer = React.lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />

      <Suspense fallback={<div className="text-slate-400 text-center py-10">Loading portfolio...</div>}>
        <Portfolio />
        <Certification />
        <Milestones />
        <Talks />
        <TennisCoffeeSection />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
