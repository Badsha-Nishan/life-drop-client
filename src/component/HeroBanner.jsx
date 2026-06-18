"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Magnifier } from "@gravity-ui/icons";

export default function HeroBanner() {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-brand-light to-white py-16 px-4 sm:px-6 lg:px-8">
      {/* 🔮 Premium Abstract Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            Every Drop Counts
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-dark tracking-tight leading-none"
          >
            Bridging Hearts, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#B91C1C]">
              Saving Lives
            </span>{" "}
            Together
          </motion.h1>

          {/* Paragraph / Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-gray-500 font-normal leading-relaxed"
          >
            Your small act of kindness can ignite the light of life for someone
            in need. Join our modern network to find blood donors instantly or
            become a proud donor today.
          </motion.p>

          {/* 🎯 Required Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
          >
            {/* Button 1: Join as a donor */}
            <Link
              href="/register"
              className="group flex items-center justify-center gap-2.5 bg-brand-primary text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/30 active:scale-95 transition-all w-full sm:w-56"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Join as a donor
            </Link>

            {/* Button 2: Search Donors */}
            <Link
              href="/search"
              className="group flex items-center justify-center gap-2.5 bg-white text-brand-dark border-2 border-gray-200/80 font-semibold text-base px-8 py-4 rounded-2xl hover:border-brand-primary hover:text-brand-primary active:scale-95 transition-all w-full sm:w-56"
            >
              <Magnifier className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
              Search Donors
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
