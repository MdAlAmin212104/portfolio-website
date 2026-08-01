"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // ms
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-[#0B0F19] px-8 py-12 select-none overflow-hidden"
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top Brand Name */}
          <div className="w-full max-w-7xl flex justify-between items-center text-xs tracking-widest text-muted/70 uppercase">
            <span>Md Al Amin Islam</span>
            <span>Portfolio &copy; 2026</span>
          </div>

          {/* Center Counter & Tagline */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            {/* Animated Logo Trace SVG */}
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 100 100"
              className="mb-8 text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="300"
                strokeDashoffset={300 - (progress / 100) * 300}
                className="transition-all duration-100 ease-out"
              />
              <path
                d="M35 65 L50 35 L65 65 M40 55 L60 55"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* Percentage Number */}
            <div className="text-7xl md:text-9xl font-bold tracking-tighter text-white font-mono flex items-baseline">
              <span>{Math.floor(progress)}</span>
              <span className="text-3xl md:text-5xl text-accent font-sans ml-2">%</span>
            </div>

            {/* Dynamic Status Text */}
            <p className="mt-4 text-sm md:text-base text-muted tracking-wider uppercase font-medium">
              {progress < 40 && "Loading Creative System..."}
              {progress >= 40 && progress < 80 && "Initializing WebGL Canvas..."}
              {progress >= 80 && "Welcome to the Experience"}
            </p>
          </div>

          {/* Bottom Loading Bar */}
          <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
