"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Search,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AllProjectsProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ["All", "Shopify App", "E-commerce", "Full Stack"];
const PAGE_SIZE = 6;

export function AllProjects({ onSelectProject }: AllProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Smooth scroll to section top
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Build visible page numbers with ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  return (
    <section
      id="all-projects"
      ref={sectionRef}
      className="relative py-20 px-6 sm:px-8 md:px-12 bg-white/[0.01]"
    >
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="Complete Gallery"
          title="All Projects & Open Source Experiments"
          subtitle="Filter through my entire repository of interactive applications, design systems, and client solutions."
        />

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-neon"
                      : "glass-dock text-muted hover:text-white border-white/5"
                  }`}
                  data-cursor="pointer"
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs glass-input focus:border-primary"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${currentPage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pageProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                onClick={() => onSelectProject(project)}
                className="glass-card p-5 rounded-3xl space-y-4 cursor-pointer group hover:border-accent/40 flex flex-col justify-between"
                data-cursor="pointer"
              >
                <div className="space-y-4">
                  {/* Image */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-[#0B0F19]/80 text-accent border border-accent/20 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted mt-1.5 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack + Footer */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-white/80 glass-dock"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-muted glass-dock">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-accent font-semibold pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      View Details
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-muted font-mono">
            No projects matched your search criteria.
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14 flex flex-col items-center gap-5"
          >
            {/* Page count label */}
            <p className="text-xs font-mono text-muted">
              Page{" "}
              <span className="text-white font-bold">{currentPage}</span>
              {" "}of{" "}
              <span className="text-accent font-bold">{totalPages}</span>
              {" "}·{" "}
              <span className="text-white/60">{filteredProjects.length} projects</span>
            </p>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold glass-dock border border-white/5 text-muted hover:text-white hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                data-cursor="pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1.5">
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-9 h-9 flex items-center justify-center text-xs text-muted font-mono"
                    >
                      ···
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page as number)}
                      data-cursor="pointer"
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`relative w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 ${
                        currentPage === page
                          ? "text-white shadow-[0_0_15px_rgba(79,140,255,0.5)]"
                          : "glass-dock text-muted hover:text-white hover:border-white/20 border border-white/5"
                      }`}
                    >
                      {/* Active page glowing background */}
                      {currentPage === page && (
                        <motion.span
                          layoutId="active-page"
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{page}</span>
                    </button>
                  )
                )}
              </div>

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold glass-dock border border-white/5 text-muted hover:text-white hover:border-primary/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                data-cursor="pointer"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
