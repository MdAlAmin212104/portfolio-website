"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { Code, Cpu, Globe, Rocket, Award, ShieldCheck, Terminal } from "lucide-react";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="Bridging High Performance Engineering & Creative Aesthetics"
          subtitle="Passionate about designing digital products that combine lightning-fast performance, accessibility, and unforgettable visual motion."
        />

        {/* Top Story & Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
                <Terminal className="w-3.5 h-3.5" />
                <span>Creative Engineering Journey</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Building Web Solutions that Scale & Inspire
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.longBio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-dock p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                <Globe className="w-8 h-8 text-accent shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Global Reach</h4>
                  <p className="text-xs text-muted">Remote with clients worldwide</p>
                </div>
              </div>
              <div className="glass-dock p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-secondary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Speed First</h4>
                  <p className="text-xs text-muted">Optimized 95+ Lighthouse score</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid Card */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-center items-center text-center group hover:border-primary/40"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-gradient-primary font-mono mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted uppercase tracking-wider group-hover:text-white transition-colors">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
