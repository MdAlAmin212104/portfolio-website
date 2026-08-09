"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowDown, Download, Sparkles, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";

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
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-8 md:px-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* LEFT COLUMN: Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-5 sm:space-y-6">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-dock text-[11px] sm:text-sm font-medium text-accent border border-accent/20"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent animate-spin-slow shrink-0" />
            <span className="truncate sm:whitespace-normal">Crafting High-Performance Shopify Apps & Stores</span>
          </motion.div>

          {/* Large Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] break-words max-w-full"
          >
            Hi, I'm <br />
            <span className="text-gradient-primary">{PERSONAL_INFO.name}</span>
          </motion.h1>

          {/* Animated Cycling Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-10 sm:h-12 overflow-hidden flex items-center max-w-full"
          >
            <motion.div
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg sm:text-2xl font-bold font-mono text-cyan-400 flex items-center gap-2 truncate"
            >
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
              <span>{PERSONAL_INFO.roles[roleIndex]}</span>
            </motion.div>
          </motion.div>

          {/* Short Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Prominent High-Visibility CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-primary via-secondary to-accent shadow-neon hover:shadow-[0_0_30px_rgba(79,140,255,0.6)] hover:scale-105 transition-all duration-300 border border-white/20"
                data-cursor="pointer"
              >
                <span>Hire Me</span>
                <Sparkles className="w-4 h-4 text-accent" />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <a
                href={PERSONAL_INFO.resume}
                download="Shopify_Developer_resume_of_Al_Amin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold text-white glass-card border border-primary/40 hover:border-accent/80 hover:bg-primary/20 hover:shadow-neon hover:scale-105 transition-all duration-300 shadow-lg"
                data-cursor="pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Resume</span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links Connected */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted/70">Connect:</span>
            <div className="flex items-center gap-2.5 sm:gap-3">
              {[
                { icon: FaGithub, href: PERSONAL_INFO.github, label: "GitHub" },
                { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                { icon: FaFacebook, href: PERSONAL_INFO.facebook, label: "Facebook" },
              ].map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl glass-dock flex items-center justify-center text-white/80 hover:text-accent hover:border-accent/60 hover:bg-accent/15 transition-all duration-300 border border-white/10 shadow-md"
                    aria-label={social.label}
                    data-cursor="pointer"
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Enlarged Professional Hero Image Showcase */}
        <div className="lg:col-span-5 flex justify-center items-center relative z-10 mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[420px] sm:max-w-[460px] h-[380px] sm:h-[500px] flex items-center justify-center"
          >
            {/* Glowing Gradient Ambient Aura */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-35 blur-3xl animate-pulse-glow" />
            <div className="absolute -inset-2 sm:-inset-4 rounded-3xl border border-primary/30 animate-spin-slow" />
            <div className="absolute -inset-5 sm:-inset-8 rounded-3xl border border-secondary/20 animate-spin-slow [animation-direction:reverse]" />

            {/* Glassmorphic Image Container */}
            <div className="relative w-full h-full rounded-3xl p-2.5 sm:p-3.5 glass-card shadow-2xl flex flex-col items-center justify-center overflow-hidden border border-white/20 group hover:border-accent/50 transition-all duration-500">
              <picture className="w-full h-full">
                <source srcSet="/images/Hero-image.webp" type="image/webp" />
                <img
                  src="/images/Hero-image.png"
                  alt={PERSONAL_INFO.name}
                  width={460}
                  height={540}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-top rounded-2xl filter brightness-105 contrast-105 transform group-hover:scale-105 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Tech Stack Badges */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 left-0 sm:-top-5 sm:-left-5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl glass-dock border border-primary/40 text-[10px] sm:text-xs font-mono font-semibold text-white shadow-neon flex items-center gap-2 z-20 backdrop-blur-md"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-ping" />
              <span>Shopify App Developer</span>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 right-0 sm:-bottom-5 sm:-right-5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl glass-dock border border-accent/40 text-[10px] sm:text-xs font-mono font-semibold text-white shadow-neon-cyan flex items-center gap-2 z-20 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
              <span>Shopify Developer</span>
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
