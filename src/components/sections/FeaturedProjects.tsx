"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import { ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SiShopify } from "react-icons/si";

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

interface CardItemProps {
  project: Project;
  idx: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  onSelectProject: (project: Project) => void;
}

function StackedProjectCard({
  project,
  idx,
  total,
  progress,
  range,
  onSelectProject,
}: CardItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky top offset (staggered 36px for step-by-step top tabs)
  const topOffset = 90 + idx * 36;
  const isEven = idx % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="sticky flex items-center justify-center w-full max-w-6xl mx-auto"
      style={{
        top: `${topOffset}px`,
        zIndex: idx + 1,
      }}
    >
      <motion.div
        className="w-full glass-card p-6 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 group hover:border-primary/40 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl bg-[#0B0F19]/95 relative overflow-hidden transition-colors duration-300"
      >
        {/* Background Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        {/* Image Column */}
        <div
          className={`lg:col-span-7 relative ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div
            onClick={() => onSelectProject(project)}
            className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group/img border border-white/10 shadow-2xl"
            data-cursor="pointer"
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

            {/* Inspect Details Overlay Badge */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
              <span className="px-6 py-3 rounded-full text-xs font-bold text-white bg-primary shadow-neon uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Inspect Details
              </span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div
          className={`lg:col-span-5 space-y-5 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/20 text-accent border border-primary/30">
              {project.category}
            </span>
            {project.metrics && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {project.metrics}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-accent mt-1">
              {project.subtitle}
            </p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-2 pt-1">
            {project.highlights.slice(0, 2).map((h, hIdx) => (
              <li key={hIdx} className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-xl text-xs font-mono text-white glass-dock border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <MagneticButton strength={0.25}>
              <button
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-accent shadow-neon hover:opacity-90 transition-opacity"
                data-cursor="pointer"
              >
                <span>Full Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </MagneticButton>

            {project.githubUrl ? (
              <MagneticButton strength={0.25}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-dock flex items-center justify-center text-muted hover:text-white transition-colors"
                  aria-label="View Source Code"
                  title="View Source Code"
                  data-cursor="pointer"
                >
                  <FaGithub className="w-4 h-4" aria-hidden="true" />
                </a>
              </MagneticButton>
            ) : project.liveUrl ? (
              <MagneticButton strength={0.25}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-dock flex items-center justify-center text-[#95bf47] hover:scale-110 border border-[#95bf47]/30 hover:border-[#95bf47]/80 bg-[#95bf47]/10 transition-all shadow-[0_0_15px_rgba(149,191,71,0.2)]"
                  aria-label="View on Shopify App Store"
                  title="View on Shopify App Store"
                  data-cursor="pointer"
                >
                  <SiShopify className="w-5 h-5 text-[#95bf47]" title="Shopify" aria-label="Shopify" />
                </a>
              </MagneticButton>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const featuredProjects = (() => {
    const featured = PROJECTS.filter((p) => p.featured && p.category !== "Full Stack");
    const groups: Record<string, typeof featured> = {};
    for (const p of featured) {
      if (!groups[p.category]) groups[p.category] = [];
      if (groups[p.category].length < 3) groups[p.category].push(p);
    }
    return Object.values(groups).flat();
  })();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-visible"
    >
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="Featured Projects"
          title="Curated Showcase of Award-Winning Work"
          subtitle="Explore selected web platforms, 3D WebGL experiences, and headless e-commerce storefronts built for scale."
        />

        <div className="relative mt-16 flex flex-col gap-16 md:gap-24 pb-32">
          {featuredProjects.map((project, idx) => {
            const range: [number, number] = [
              idx * (1 / featuredProjects.length),
              1,
            ];

            return (
              <StackedProjectCard
                key={project.id}
                project={project}
                idx={idx}
                total={featuredProjects.length}
                progress={scrollYProgress}
                range={range}
                onSelectProject={onSelectProject}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

