import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Coffee } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-blue-600/10 to-red-600/5 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Text */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent">
                  Joseph Davis Chamdani
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
                Informatics & Business Student @{" "}
                <a
                  href="https://www.washington.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent hover:underline"
                >
                  University of Washington
                </a>
              </p>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed mb-6">
                International student from Indonesia
              </p>
              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-2">
                  <Coffee className="h-4 w-4" />
                  Coffee Lover
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🎾</span>
                  Tennis player
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="https://github.com/JosephDavisC" target="_blank" 
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 group hover:scale-105"
              >
                <Github className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                View GitHub
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-full hover:from-blue-700 hover:to-red-700 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Let's Connect
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* UW Logo */}
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                <img
                  src="/UW_Logo.png"
                  alt="University of Washington"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

              <Avatar className="w-80 h-80 md:w-96 md:h-96 border-4 border-white/20 shadow-2xl relative z-10">
                <AvatarImage 
                  src="/Joseph.JPEG"
                  alt="Joseph Chamdani"
                  className="object-cover object-top"
                />
                <AvatarFallback className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-red-600 text-white">
                  JC
                </AvatarFallback>
              </Avatar>

              {/* Tennis Icon */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-3xl">🎾</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
