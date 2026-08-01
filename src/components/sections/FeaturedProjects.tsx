"use client";

import { motion } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import { ExternalLink, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="Featured Projects"
          title="Curated Showcase of Award-Winning Work"
          subtitle="Explore selected web platforms, 3D WebGL experiences, and headless e-commerce storefronts built for scale."
        />

        <div className="space-y-16">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="glass-card p-6 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 group hover:border-primary/40"
              >
                {/* Image Mockup Column */}
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
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                    {/* View Details Overlay Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                      <span className="px-6 py-3 rounded-full text-xs font-bold text-white bg-primary shadow-neon uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Inspect Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Details Column */}
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

                  {/* Highlights Bullet points */}
                  <ul className="space-y-2 pt-1">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
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

                    <MagneticButton strength={0.25}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glass-dock flex items-center justify-center text-muted hover:text-white transition-colors"
                        aria-label="View Source Code"
                        data-cursor="pointer"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
