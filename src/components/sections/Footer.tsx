"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { MagneticButton } from "../ui/MagneticButton";
import {
  ArrowUp,
  Clock,
  Mail,
  Phone,
  MapPin,
  Code2,
  Layers,
  Briefcase,
  User,
  BookOpen,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { formatTime } from "@/lib/utils";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Navigation links grouped by column
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  {
    label: "Navigation",
    icon: Layers,
    links: [
      { name: "Home", href: "#hero", icon: User },
      { name: "About", href: "#about", icon: User },
      { name: "Experience", href: "#experience", icon: Briefcase },
      { name: "Skills", href: "#skills", icon: Wrench },
    ],
  },
  {
    label: "Portfolio",
    icon: Code2,
    links: [
      { name: "Featured Projects", href: "#projects", icon: Code2 },
      { name: "All Projects", href: "#all-projects", icon: Layers },
      { name: "Education", href: "#education", icon: BookOpen },
      { name: "Contact Me", href: "#contact", icon: Mail },
    ],
  },
];

const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Framer Motion",
  "Tailwind CSS",
  "Three.js",
  "GSAP",
  "Nodemailer",
];

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: PERSONAL_INFO.github,
    label: "GitHub",
    color: "hover:text-white hover:border-white/40 hover:bg-white/10",
  },
  {
    icon: FaLinkedin,
    href: PERSONAL_INFO.linkedin,
    label: "LinkedIn",
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10",
  },
  {
    icon: FaFacebook,
    href: PERSONAL_INFO.facebook,
    label: "Facebook",
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/8801707691162",
    label: "WhatsApp",
    color: "hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10",
  },
];

// ---------------------------------------------------------------------------
// Footer component
// ---------------------------------------------------------------------------

export function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    setTimeStr(formatTime(new Date()));
    const timer = setInterval(() => {
      setTimeStr(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#060810] border-t border-white/[0.06]">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Top gradient line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-16 pb-10">

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand Column — col-span-4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 group"
              aria-label="Scroll to top"
              data-cursor="pointer"
            >
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px] shadow-[0_0_20px_rgba(79,140,255,0.4)] group-hover:shadow-[0_0_30px_rgba(79,140,255,0.6)] transition-shadow">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/cover-profile.webp"
                    alt="Profile"
                    width={50}
                    height={50}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="text-left">
                <span className="block text-base font-extrabold text-white tracking-tight leading-none">
                  Md Al Amin Islam
                </span>
                <span className="block text-[11px] text-primary font-mono mt-0.5">
                  Shopify Developer
                </span>
              </div>
            </button>

            {/* Short bio */}
            <p className="text-sm text-muted/70 leading-relaxed max-w-xs">
              Building scalable Shopify Apps, high-converting themes, and
              modern eCommerce experiences with cutting-edge web technologies.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {PERSONAL_INFO.availability}
            </div>

            
          </motion.div>

          {/* Nav Link Columns */}
          {NAV_LINKS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (gi + 1) }}
              className="lg:col-span-2 space-y-5"
            >
              <div className="flex items-center gap-2">
                <group.icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/80 font-mono">
                  {group.label}
                </span>
              </div>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="flex items-center gap-2 text-sm text-muted/60 hover:text-primary transition-colors group/nav w-full text-left"
                      data-cursor="pointer"
                    >
                      <span className="w-0 h-[1px] bg-primary transition-all duration-300 group-hover/nav:w-4 rounded-full" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Tech Stack Column — col-span-4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4 space-y-5"
          >

            {/* Open to work callout */}
            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                Open to Opportunities
              </p>
              <p className="text-[11px] text-muted/60 leading-relaxed">
                Available for Shopify app development, theme projects, and
                full-time frontend roles. Let's build something great.
              </p>
              {/* Contact quick-info */}
            <div className="space-y-2.5 pt-1">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2.5 text-xs text-muted/60 hover:text-primary transition-colors group/link"
                data-cursor="pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-primary/10 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono truncate">{PERSONAL_INFO.email}</span>
              </a>
              <a
                href="https://wa.me/8801707691162"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-muted/60 hover:text-[#25D366] transition-colors group/link"
                data-cursor="pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-[#25D366]/10 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-mono">+880 1707-691162</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs text-muted/60">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex mt-4 items-center gap-1.5 text-[11px] font-bold text-primary hover:text-accent transition-colors"
                data-cursor="pointer"
              >
                Hire Me <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <MagneticButton key={social.label} strength={0.25}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor="pointer"
                  className={`w-9 h-9 rounded-xl glass-dock border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              </MagneticButton>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/40 font-mono text-center order-last sm:order-none">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-muted/60">Md Al Amin Islam</span> · All rights reserved
          </p>

          {/* Back to top */}
          <MagneticButton strength={0.3}>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl glass-dock border border-primary/20 flex items-center justify-center text-muted/50 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 shadow-[0_0_15px_rgba(79,140,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.25)]"
              aria-label="Back to top"
              data-cursor="pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </footer>
  );
}
