"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { Code2, Sparkles, ShoppingBag, Palette, ArrowRight, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Code2,
  Sparkles,
  ShoppingBag,
  Palette,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          badge="Services Offered"
          title="High-Value Engineering & Creative Services"
          subtitle="Tailored digital solutions designed to elevate brand presence, drive conversions, and deliver benchmark performance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => {
            const IconComponent = ICON_MAP[service.iconName] || Code2;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl space-y-6 flex flex-col justify-between group hover:border-primary/50"
              >
                <div className="space-y-4">
                  {/* Icon & Title Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-2 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                      Includes:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent group-hover:text-white transition-colors pt-4 border-t border-white/5"
                  data-cursor="pointer"
                >
                  <span>Inquire About {service.title.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
