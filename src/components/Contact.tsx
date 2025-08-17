import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, Youtube, Download } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Let's Build Something
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Always excited to discuss AI, startups, or collaborate on interesting projects.
            Let's connect and create something amazing together.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-10 px-2 sm:px-0">
            {/* Email */}
            <a
              href="mailto:jchamd@uw.edu"
              className="flex flex-col items-center px-6 py-6 sm:p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-blue-400/30 hover:scale-105"
            >
              <Mail className="h-10 w-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">Email</h3>
              <p className="text-slate-400 whitespace-nowrap">jchamd@uw.edu</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/joseph-chamdani"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center px-6 py-6 sm:p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-blue-400/30 hover:scale-105"
            >
              <Linkedin className="h-10 w-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">LinkedIn</h3>
              <p className="text-slate-400 whitespace-nowrap">Let’s connect</p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/JosephDavisC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center px-6 py-6 sm:p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-blue-400/30 hover:scale-105"
            >
              <Github className="h-10 w-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">GitHub</h3>
              <p className="text-slate-400 whitespace-nowrap">View my code</p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/josephdavisc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center px-6 py-6 sm:p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-blue-400/30 hover:scale-105"
            >
              <Instagram className="h-10 w-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">Instagram</h3>
              <p className="text-slate-400 whitespace-nowrap">@josephdavisc</p>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@JosephDavisC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center px-6 py-6 sm:p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-red-400/30 hover:scale-105"
            >
              <Youtube className="h-10 w-10 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">YouTube</h3>
              <p className="text-slate-400 whitespace-nowrap">@JosephDavisC</p>
            </a>
          </div>

          {/* Resume Download */}
          <div className="text-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-full hover:from-blue-700 hover:to-red-700 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Download className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
