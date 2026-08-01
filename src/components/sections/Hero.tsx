"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowDown, Download, Sparkles, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaDribbble } from "react-icons/fa6";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 md:px-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN: Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-6">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dock text-xs sm:text-sm font-medium text-accent border border-accent/20"
          >
            <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
            <span>Crafting High-Performance Web Experiences</span>
          </motion.div>

          {/* Large Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            Hi, I'm <br />
            <span className="text-gradient-primary">{PERSONAL_INFO.name}</span>
          </motion.h1>

          {/* Animated Cycling Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 overflow-hidden flex items-center"
          >
            <motion.div
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 flex items-center gap-2"
            >
              <Code2 className="w-6 h-6 text-primary" />
              <span>{PERSONAL_INFO.roles[roleIndex]}</span>
            </motion.div>
          </motion.div>

          {/* Short Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary via-secondary to-accent shadow-neon hover:opacity-95 transition-opacity"
                data-cursor="pointer"
              >
                <span>Hire Me</span>
                <Sparkles className="w-4 h-4" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold text-white glass-card hover:bg-white/10 transition-colors"
                data-cursor="pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Resume</span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 pt-4"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted/70">Connect:</span>
            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: PERSONAL_INFO.github, label: "GitHub" },
                { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                { icon: FaXTwitter, href: PERSONAL_INFO.twitter, label: "Twitter" },
                { icon: FaDribbble, href: PERSONAL_INFO.dribbble, label: "Dribbble" },
              ].map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-dock flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-colors"
                    aria-label={social.label}
                    data-cursor="pointer"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Animated Hero Avatar & Floating Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative z-10 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
          >
            {/* Glowing Gradient Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-2xl animate-pulse-glow" />
            <div className="absolute -inset-4 rounded-full border border-primary/30 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-full border border-secondary/20 animate-spin-slow [animation-direction:reverse]" />

            {/* Avatar Card Container with Glassmorphism */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-3 glass-card shadow-2xl flex flex-col items-center justify-center overflow-hidden border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover rounded-2xl shadow-inner filter brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Tech Stack Badges */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 px-4 py-2 rounded-2xl glass-dock border border-primary/30 text-xs font-mono font-semibold text-white shadow-neon flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Next.js 15 + React 19</span>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl glass-dock border border-accent/30 text-xs font-mono font-semibold text-white shadow-neon-cyan flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>WebGL & GSAP 3D</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/60 text-xs font-mono uppercase tracking-widest pointer-events-none"
      >
        <span>Scroll to Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
