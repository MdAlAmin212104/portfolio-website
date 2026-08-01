"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-5xl mx-auto">
        <SectionHeader
          badge="Work History"
          title="Career Journey & Key Accomplishments"
          subtitle="A track record of driving engineering excellence across agency projects, headless e-commerce, and high-growth SaaS applications."
        />

        <div className="relative pl-6 sm:pl-10 space-y-12 border-l border-primary/30">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0B0F19] border-2 border-primary group-hover:border-accent group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-neon">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>

              {/* Glass Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
                {/* Role Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/20 text-accent border border-secondary/30 mb-2">
                      {exp.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted mt-1 font-medium">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span>{exp.company}</span>
                      <span>•</span>
                      <MapPin className="w-4 h-4 text-muted" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dock text-xs font-mono text-white border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {exp.description}
                </p>

                {/* Accomplishments */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                    Key Impact & Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl text-xs font-mono text-white/90 glass-dock border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
