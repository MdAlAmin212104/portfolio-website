"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      const scrollY = window.scrollY;
      document.body.setAttribute("data-scroll-y", String(scrollY));
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      window.addEventListener("keydown", handleKeyDown);
      if (scrollBodyRef.current) scrollBodyRef.current.scrollTop = 0;
    }

    return () => {
      const scrollY = parseInt(document.body.getAttribute("data-scroll-y") || "0");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.removeAttribute("data-scroll-y");
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {/* ① Fixed overlay — NEVER scrolls, just centers the card */}
      <div
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 lg:p-10"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#0B0F19]/85 backdrop-blur-xl"
        />

        {/* ② Modal card — explicit height so children can scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl mx-2 sm:mx-0 rounded-3xl border border-white/15 bg-[#0B0F19] shadow-2xl"
          style={{
            /* Explicit fixed height — CRITICAL for inner overflow-y:auto to work */
            height: "min(90vh, 820px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",   /* clip children, NOT scroll */
          }}
        >
          {/* ── Header (never scrolls) ── */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#0f1525]"
            style={{ flexShrink: 0 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-primary/20 text-accent border border-primary/30">
                {project.category}
              </span>
              {project.metrics && (
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {project.metrics}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-muted hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Scrollable body ──
               Rules that MUST all be true for overflow-y:auto to work:
               1. flex: 1          → take remaining height from parent
               2. minHeight: 0     → allow shrinking below content size
               3. overflowY: auto  → show scrollbar when content > box
               4. NO display:flex  → block container so children stack normally
          ── */}
          <div
            ref={scrollBodyRef}
            className="modal-scroll-body"
            data-lenis-prevent
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {/* Inner wrapper for padding — keeps padding from breaking the scroll calculation */}
            <div className="p-4 sm:p-8 flex flex-col gap-4 sm:gap-6">

              {/* Image Banner */}
              <div
                className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-48 sm:h-64"
                style={{ flexShrink: 0 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-6 right-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-accent font-medium mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Project Overview &amp; Architecture
                </h4>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Technical Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Technical Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-muted p-3 rounded-xl border border-white/8 bg-white/3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="space-y-2.5 pb-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono text-white/80 border border-white/10 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── Footer (never scrolls) ── */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-[#0f1525]"
            style={{ flexShrink: 0 }}
          >
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-neon"
                >
                  <span>
                    {project.liveUrl.includes("apps.shopify.com")
                      ? "View on Shopify App Store"
                      : "View Live Site"}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-white/15 hover:bg-white/10 transition-colors"
                >
                  <FaGithub className="w-4 h-4" aria-hidden="true" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
            <span className="text-xs text-muted">Press ESC or click outside to close</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
