"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { Globe, Rocket, Terminal, ShoppingBag, Palette, Layout, Code2, Cpu, Zap, ShieldCheck } from "lucide-react";

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


const SERVICES_ABOUT = [
  {
    title: "Shopify App Development",
    description: "Building custom, scalable Shopify apps tailored for business needs.",
    icon: ShoppingBag,
    color: "from-primary to-accent",
  },
  {
    title: "Shopify Theme Customization",
    description: "Customize Shopify themes for better UI, UX, and faster performance.",
    icon: Palette,
    color: "from-secondary to-primary",
  },
  {
    title: "Shopify Store Design / Redesign",
    description: "Professional store design or redesign to make your brand stand out.",
    icon: Layout,
    color: "from-accent to-secondary",
  },
  {
    title: "Web Development",
    description: "Frontend & MERN stack development for modern, scalable web solutions.",
    icon: Code2,
    color: "from-primary to-secondary",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="Creative Engineering Journey"
          subtitle="Shopify Developer | Custom Apps, Themes & Integrations"
        />

        {/* Top Story & Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-16">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-5 sm:p-10 rounded-3xl flex flex-col justify-between space-y-5 sm:space-y-6 max-w-full"
          >
            <div className="space-y-4">
              <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] sm:text-xs font-mono text-primary">
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Creative Engineering Journey</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white leading-snug break-words">
                Shopify Developer | Custom Apps, Themes & Integrations
              </h3>
              <p className="text-muted text-xs sm:text-base leading-relaxed">
                {PERSONAL_INFO.longBio}
              </p>
            </div>
          </motion.div>

          {/* Stats Grid Card */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 max-w-full">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-4 sm:p-8 rounded-3xl flex flex-col justify-center items-center text-center group hover:border-primary/40 min-w-0"
              >
                <div className="text-3xl sm:text-5xl font-extrabold text-gradient-primary font-mono mb-1.5 sm:mb-2 truncate max-w-full">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-[10px] sm:text-sm font-medium text-muted uppercase tracking-wider group-hover:text-white transition-colors leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Services / Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_ABOUT.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between space-y-4 group hover:border-accent/40 hover:shadow-neon-cyan transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] shadow-lg`}>
                    <div className="w-full h-full bg-[#0B0F19] rounded-[15px] flex items-center justify-center text-white">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
