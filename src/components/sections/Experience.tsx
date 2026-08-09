"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EXPERIENCES, ExperienceItem } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { Briefcase, Laptop, Code, Smartphone, MapPin, Building2, Calendar, CheckCircle2 } from "lucide-react";

{/* REUSABLE SUBCOMPONENT: TIMELINE NODE */ }
export function TimelineNode() {
  return (
    <div className="relative flex items-center justify-center pointer-events-none z-20">
      <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent animate-ping absolute" />
      <div className="w-5 h-5 rounded-full glass-dock border-2 border-accent flex items-center justify-center shadow-neon">
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_var(--accent)]" />
      </div>
    </div>
  );
}

{/* REUSABLE SUBCOMPONENT: STATISTICS ROW */ }
export function StatisticsRow({ metrics }: { metrics: { label: string; value: string }[] }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-4 p-4 rounded-2xl glass-dock border border-white/10 grid grid-cols-3 divide-x divide-white/10 text-center shadow-inner">
      {metrics.map((m, mIdx) => (
        <div key={mIdx} className="px-2">
          <div className="text-xl sm:text-2xl font-black text-accent tracking-tight">
            {m.value}
          </div>
          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mt-0.5">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

{/* REUSABLE SUBCOMPONENT: TECHNOLOGY TAGS */ }
export function TechnologyTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {tags.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 rounded-xl text-xs font-mono text-white/90 glass-dock border border-white/10 group-hover:border-primary/30 transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

{/* REUSABLE SUBCOMPONENT: EXPERIENCE CARD */ }
export function ExperienceCard({
  exp,
  getIcon,
}: {
  exp: ExperienceItem;
  getIcon: (icon?: string) => React.ReactNode;
}) {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10 group hover:border-accent/40 transition-all duration-300 relative shadow-2xl backdrop-blur-xl">
      {/* Top Header: Company Icon Badge (Left) & Duration Pill (Right) */}
      <div className="flex items-center justify-between gap-4">
        <div className="w-12 h-12 rounded-2xl glass-dock border border-white/15 text-accent flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-accent/40 transition-all duration-300">
          {getIcon(exp.icon)}
        </div>
        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-dock text-xs font-mono font-semibold text-accent border border-accent/30 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          <span>{exp.period}</span>
        </div>
      </div>

      {/* Main Heading: Job Title & Company */}
      <div>
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-secondary/20 text-accent border border-secondary/30 mb-2">
          {exp.type}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium mt-1">
          <span className="flex items-center gap-1 text-white/90 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-accent" />
            {exp.company}
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Description Paragraph */}
      <p className="text-xs sm:text-sm text-gray-300/90 leading-relaxed">
        {exp.description}
      </p>

      {/* List of Responsibilities / Achievements */}
      <ul className="space-y-2 pt-1">
        {exp.achievements.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Statistics Row Component */}
      {exp.metrics && <StatisticsRow metrics={exp.metrics} />}

      {/* Technology Tags Wrap Component */}
      <TechnologyTags tags={exp.techStack} />
    </div>
  );
}

{/* MAIN EXPERIENCE SECTION COMPONENT */ }
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State for dynamic SVG path and timeline node coordinates
  const [pathData, setPathData] = useState<{
    d: string;
    nodes: { x: number; y: number }[];
    svgWidth: number;
    svgHeight: number;
  }>({ d: "", nodes: [], svgWidth: 1000, svgHeight: 3200 });

  // Single scroll-driven progress controlling line illumination
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 85%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Dynamic layout calculator: 50px side spacing from cards & 40px top/bottom gap spacing
  const updateTimelinePath = useCallback(() => {
    if (!desktopContainerRef.current) return;
    const containerRect = desktopContainerRef.current.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) return;

    const cardRects = EXPERIENCES.map((_, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
        width: rect.width,
        height: rect.height,
      };
    });

    if (cardRects.some((r) => r === null)) return;

    const validRects = cardRects as {
      left: number;
      right: number;
      top: number;
      bottom: number;
      width: number;
      height: number;
    }[];

    const svgWidth = containerRect.width;
    const svgHeight = containerRect.height;
    const r = 24; // Corner radius for rounded turns

    let d = "";
    const nodes: { x: number; y: number }[] = [];

    for (let i = 0; i < validRects.length; i++) {
      const isEven = i % 2 === 0;
      const currentCard = validRects[i];
      // 50px spacing from card sides (50px right of 1st card, 50px left of 2nd card, etc.)
      const sideX = isEven ? currentCard.right + 100 : currentCard.left - 100;

      if (i === 0) {
        // Start 40px above first card
        const startY = Math.max(10, currentCard.top - 40);
        d = `M ${sideX} ${startY}`;
        nodes.push({ x: sideX, y: startY });
      }

      if (i < validRects.length - 1) {
        const nextCard = validRects[i + 1];
        const nextSideX = (i + 1) % 2 === 0 ? nextCard.right + 100 : nextCard.left - 100;

        // Gap midpoint between bottom of current card and top of next card
        const gapMid = (currentCard.bottom + nextCard.top) / 2;
        const yCross = Math.max(
          currentCard.bottom + 40,
          Math.min(nextCard.top - 40, gapMid)
        );

        if (isEven) {
          // Card 1 (Even, Left): Down right side (+50px), turn left to card 2 left side (-50px)
          d += ` L ${sideX} ${yCross - r}`;
          d += ` Q ${sideX} ${yCross} ${sideX - r} ${yCross}`;
          d += ` L ${nextSideX + r} ${yCross}`;
          d += ` Q ${nextSideX} ${yCross} ${nextSideX} ${yCross + r}`;
          nodes.push({ x: sideX, y: yCross });
        } else {
          // Card 2 (Odd, Right): Down left side (-50px), turn right to card 3 right side (+50px)
          d += ` L ${sideX} ${yCross - r}`;
          d += ` Q ${sideX} ${yCross} ${sideX + r} ${yCross}`;
          d += ` L ${nextSideX - r} ${yCross}`;
          d += ` Q ${nextSideX} ${yCross} ${nextSideX} ${yCross + r}`;
          nodes.push({ x: sideX, y: yCross });
        }
      } else {
        // Last card: extends line 40px below card bottom
        const endY = currentCard.bottom + 40;
        d += ` L ${sideX} ${endY}`;
        nodes.push({ x: sideX, y: endY });
      }
    }

    setPathData({ d, nodes, svgWidth, svgHeight });
  }, []);

  useEffect(() => {
    updateTimelinePath();

    const observers: ResizeObserver[] = [];
    if (typeof ResizeObserver !== "undefined") {
      const mainObserver = new ResizeObserver(() => {
        updateTimelinePath();
      });

      if (desktopContainerRef.current) {
        mainObserver.observe(desktopContainerRef.current);
      }

      cardRefs.current.forEach((el) => {
        if (el) mainObserver.observe(el);
      });

      observers.push(mainObserver);
    }

    window.addEventListener("resize", updateTimelinePath);
    const timer = setTimeout(updateTimelinePath, 200);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("resize", updateTimelinePath);
      clearTimeout(timer);
    };
  }, [updateTimelinePath]);

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case "briefcase":
        return <Briefcase className="w-5 h-5 text-accent" />;
      case "laptop":
        return <Laptop className="w-5 h-5 text-accent" />;
      case "code":
        return <Code className="w-5 h-5 text-accent" />;
      case "smartphone":
        return <Smartphone className="w-5 h-5 text-accent" />;
      default:
        return <Briefcase className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Background Ambient Aurora Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-primary/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <SectionHeader
          badge="Work History"
          title="Professional Journey"
          subtitle="Developing custom Shopify apps, high-converting Shopify themes, and scalable eCommerce solutions."
        />

        {/* DESKTOP CARDS & DYNAMIC CARDS-BASED SERPENTINE TIMELINE */}
        <div ref={desktopContainerRef} className="hidden md:block relative mt-24 pb-20">
          {/* DYNAMIC SVG SERPENTINE CIRCUIT PATH (Layered BEHIND cards at z-0) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            viewBox={`0 0 ${pathData.svgWidth || 1000} ${pathData.svgHeight || 3200}`}
            aria-hidden="true"
          >
            <defs>
              <filter id="siteNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* WEBSITE NATIVE THEME GRADIENT */}
              <linearGradient id="siteLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
                <stop offset="50%" stopColor="#4f8cff" stopOpacity="1" />
                <stop offset="100%" stopColor="#7b61ff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Background Trace Guide Line */}
            {pathData.d && (
              <path
                d={pathData.d}
                fill="none"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Foreground Scroll-Animated Glowing Line */}
            {pathData.d && (
              <motion.path
                d={pathData.d}
                fill="none"
                stroke="url(#siteLineGradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#siteNeonGlow)"
                style={{ pathLength }}
              />
            )}
          </svg>

          {/* Staggered Experience Cards Layout */}
          <div className="space-y-[120px] relative z-10">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`flex items-center w-full ${
                    isEven ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="w-full md:w-[75%] max-w-[750px]"
                  >
                    <ExperienceCard exp={exp} getIcon={getIcon} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC GLOWING SERPENTINE LINE (BEHIND CARDS) */}
        </div>

        {/* MOBILE RESPONSIVE TIMELINE (below md screens) */}
        <div className="block md:hidden relative mt-12 pl-6 space-y-12">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[3px] bg-white/10 rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-primary to-secondary shadow-neon rounded-full origin-top"
              style={{ scaleY: smoothProgress }}
            />
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-6">
              <ExperienceCard exp={exp} getIcon={getIcon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

