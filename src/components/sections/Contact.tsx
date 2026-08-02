import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Youtube, Download } from 'lucide-react';
import ContactForm from '@/components/shared/ContactForm';

// Brand marks lucide doesn't ship (fill = currentColor so they inherit text color)
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const MediumIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42S20.96 8.46 20.96 12zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);
const DevpostIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 bg-paper-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-espresso">
            Let's{" "}
            <span className="relative inline-block">
              Connect
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
          </h2>
          <p className="text-espresso/60 text-xl max-w-3xl mx-auto leading-relaxed font-mono px-2">
            Always excited to discuss AI, startups, or collaborate on interesting projects.
            Let's connect and create something amazing together.
          </p>
        </motion.div>

        <div className="mb-12">
          <ContactForm />
          <p className="mt-5 text-center text-sm font-mono text-espresso/60 dark:text-slate-400 px-2">
            Working with me comes with a live client portal.{" "}
            <a
              href="https://freelance.joechamdani.com/dashboard?demo=1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-court-dark dark:text-[#60A5FA] hover:underline"
            >
              See the demo →
            </a>
          </p>
        </div>

        <motion.div
          className="card-brutal p-6 sm:p-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center text-espresso dark:text-slate-100">
            Or connect with me on social
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 mb-10 px-2 sm:px-0">
            <motion.a
              href="mailto:jchamd@uw.edu"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <Mail className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">Email</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">jchamd@uw.edu</p>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/joseph-chamdani"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <Linkedin className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">LinkedIn</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">Let's connect</p>
            </motion.a>

            <motion.a
              href="https://github.com/JosephDavisC"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-espresso dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-espresso/10 dark:bg-slate-700 border-2 border-espresso dark:border-slate-500 flex items-center justify-center mb-3">
                <Github className="h-6 w-6 text-espresso dark:text-slate-300" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">GitHub</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">View my code</p>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/josephdavisc/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <Instagram className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">Instagram</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">@josephdavisc</p>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@JosephDavisC"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <Youtube className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">YouTube</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">@JosephDavisC</p>
            </motion.a>

            <motion.a
              href="https://x.com/chamdani_davis"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <XIcon className="h-5 w-5 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">X</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">@chamdani_davis</p>
            </motion.a>

            <motion.a
              href="https://devpost.com/joseph-chamdani"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <DevpostIcon className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">Devpost</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">Hackathons</p>
            </motion.a>

            <motion.a
              href="https://medium.com/@joseph.chamdani"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center px-4 py-6 bg-paper dark:bg-slate-800/50 rounded-xl border-2 border-espresso/20 dark:border-slate-600 hover:border-court dark:hover:border-[#60A5FA] hover:shadow-brutal-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-court/20 dark:bg-[#60A5FA]/20 border-2 border-court dark:border-[#60A5FA] flex items-center justify-center mb-3">
                <MediumIcon className="h-6 w-6 text-court-dark dark:text-[#60A5FA]" />
              </div>
              <h4 className="font-heading font-semibold text-espresso dark:text-slate-100 mb-1">Medium</h4>
              <p className="text-espresso/60 dark:text-slate-400 text-sm font-mono">Writing</p>
            </motion.a>
          </div>

          <div className="text-center">
            <motion.a
              href="media/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal inline-flex items-center gap-2"
              whileHover={{ scale: 1.02, x: -2, y: -2 }}
              whileTap={{ scale: 0.98, x: 2, y: 2 }}
            >
              <Download className="h-5 w-5" />
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
