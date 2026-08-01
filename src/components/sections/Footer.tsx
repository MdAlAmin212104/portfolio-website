"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowUp, Heart, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

export function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    setTimeStr(formatTime(new Date()));
    const timer = setInterval(() => {
      setTimeStr(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-12 px-6 sm:px-8 md:px-12 bg-[#080B13] border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Animated Gradient Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        {/* Top Footer Content Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <a href="#hero" onClick={scrollToTop} className="flex items-center gap-2.5" data-cursor="pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-[1px]">
                <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center font-bold text-white font-mono text-xs">
                  AH
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Alamin Hossain
              </span>
            </a>
            <p className="text-xs text-muted max-w-sm">
              Senior Frontend Engineer & Creative Developer crafting award-winning web platforms.
            </p>
          </div>

          {/* Live UTC Clock & Location */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-dock text-xs font-mono text-muted border border-white/10">
            <Clock className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Local Time: {timeStr || "12:00:00 PM"} (UTC+6)</span>
          </div>

          {/* Back to Top Magnetic Button */}
          <MagneticButton strength={0.3}>
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full glass-dock border border-primary/30 flex items-center justify-center text-white hover:text-accent hover:border-accent/60 transition-colors shadow-neon"
              aria-label="Back to top"
              data-cursor="pointer"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </MagneticButton>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted/70 font-mono">
          <p>&copy; {new Date().getFullYear()} Alamin Hossain. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js 15, React 19 & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
