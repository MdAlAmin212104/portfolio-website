"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EDUCATION_DATA,
  CERTIFICATION_DATA,
} from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa6";

type TabType = "all" | "education" | "certifications";

export function EducationCertifications() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const tabs: { id: TabType; label: string; count: number }[] = [
    {
      id: "all",
      label: "All Credentials",
      count: EDUCATION_DATA.length + CERTIFICATION_DATA.length,
    },
    {
      id: "education",
      label: "Education",
      count: EDUCATION_DATA.length,
    },
    {
      id: "certifications",
      label: "Certifications & Training",
      count: CERTIFICATION_DATA.length,
    },
  ];

  return (
    <section id="education" className="relative py-24 px-6 sm:px-8 md:px-12">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-12">
        <SectionHeader
          badge="Academic & Credentials"
          title="Education & Certifications"
          subtitle="Formal academic background, government skill qualifications, and professional engineering training."
        />

        {/* Tab Filters */}
        <div className="flex justify-center items-center">
          <div className="inline-flex p-1.5 rounded-2xl glass-dock border border-white/10 gap-2 flex-wrap justify-center shadow-lg">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive ? "text-white shadow-neon" : "text-muted hover:text-white"
                  }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEduTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-xl border border-primary/50"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white/5 text-muted"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid with Animated Tab Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Academic Education Section */}
            {(activeTab === "all" || activeTab === "education") && (
              <div className="space-y-6">
                {activeTab === "all" && (
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="p-2 rounded-xl bg-primary/20 text-accent">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                      Academic Education
                    </h3>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {EDUCATION_DATA.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Top Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="space-y-5">
                        {/* Header & Degree Title */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300 shadow-md">
                              <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-[11px] font-mono uppercase text-accent font-semibold tracking-wider">
                                {item.type}
                              </span>
                              <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                                {item.degree}
                              </h4>
                            </div>
                          </div>
                        </div>

                        {/* Details Badges */}
                        <div className="flex items-center gap-2.5 text-xs font-mono text-muted flex-wrap pt-1">
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-white font-medium">
                            <Building2 className="w-3.5 h-3.5 text-primary" />
                            {item.institution}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            <Calendar className="w-3.5 h-3.5 text-secondary" />
                            {item.period}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            {item.location}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                              item.status === "Running"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse"
                                : "bg-primary/10 text-primary border-primary/30"
                            }`}
                          >
                            ● {item.status}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted leading-relaxed">
                          {item.description}
                        </p>

                        {/* Key Focus & Highlights */}
                        <div className="space-y-2.5 pt-3 border-t border-white/5">
                          <h5 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-accent" />
                            Academic Highlights & Focus
                          </h5>
                          <ul className="space-y-2">
                            {item.highlights.map((highlight, hIdx) => (
                              <li
                                key={hIdx}
                                className="flex items-start gap-2.5 text-xs text-muted"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="leading-normal">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications & Professional Training Section */}
            {(activeTab === "all" || activeTab === "certifications") && (
              <div className="space-y-6">
                {activeTab === "all" && (
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 pt-4">
                    <div className="p-2 rounded-xl bg-accent/20 text-accent">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                      Certifications & Professional Training
                    </h3>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CERTIFICATION_DATA.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="glass-card p-7 rounded-3xl space-y-6 flex flex-col justify-between group hover:border-accent/50 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Ambient corner glow */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent/10 blur-2xl rounded-full group-hover:bg-accent/20 transition-colors pointer-events-none" />

                      <div className="space-y-4">
                        {/* Header & Icon */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
                            {item.type === "Government Certification" ? (
                              <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Award className="w-6 h-6 text-accent" />
                            )}
                          </div>
                          <div>
                            <span className="text-[11px] font-mono text-accent font-semibold uppercase tracking-wider block">
                              {item.issuer}
                            </span>
                            <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        {/* Date & Type Badge */}
                        <div className="flex items-center gap-2 text-xs font-mono text-muted flex-wrap">
                          <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                            <Calendar className="w-3 h-3 text-secondary" />
                            {item.issueDate}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-bold uppercase tracking-wider">
                            {item.type}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted leading-relaxed">
                          {item.description}
                        </p>

                        {/* Skills Certified Tags */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <h5 className="text-[11px] font-semibold uppercase tracking-wider text-white/80 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-accent" />
                            Skills Certified:
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {item.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-muted hover:text-white hover:border-primary/40 transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Drive Link Button ONLY on Certifications */}
                      {item.driveUrl && (
                        <div className="pt-4 border-t border-white/10">
                          <a
                            href={item.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 border border-accent/40 hover:border-accent hover:shadow-[0_0_25px_rgba(79,140,255,0.4)] transition-all duration-300 group/btn"
                            data-cursor="pointer"
                          >
                            <FaGoogleDrive className="w-4 h-4 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                            <span>View Certificate (Drive Link)</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
