// src/pages/NotFound.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const messages = [
  "Game, set, mismatch!",
  "You hit it out — no page here!",
  "Net error! Try again?",
  "Let’s rally back to the homepage.",
  "Ace not found.",
  "New balls please! This page is missing."
];

const NotFound = () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 text-white px-4 text-center">
      <motion.h1
        className="text-8xl font-extrabold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-xl text-white mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {randomMessage}
      </motion.h2>

      <p className="text-slate-300 text-md mb-6 max-w-sm">
        This court doesn’t exist. Let’s get you back in play.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-yellow-500 text-green-900 font-semibold rounded-full hover:bg-yellow-400 transition"
      >
        ← Back to Home Court
      </Link>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-4xl mt-8"
      >
        🎾
      </motion.div>
    </div>
  );
};

export default NotFound;
