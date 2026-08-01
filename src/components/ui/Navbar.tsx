"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
        <nav
          className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-full pointer-events-auto transition-all duration-500 ${
            isScrolled
              ? "glass-dock py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10"
              : "bg-transparent border-transparent py-4"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group"
            data-cursor="pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-[1px] shadow-[0_0_15px_rgba(79,140,255,0.3)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center font-bold text-white font-mono text-sm">
                AH
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                Alamin H.
              </span>
              <span className="text-[10px] text-muted flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1 glass-dock px-3 py-1.5 rounded-full border border-white/5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-xs font-medium tracking-wider transition-colors uppercase ${
                      isActive ? "text-white" : "text-muted hover:text-white"
                    }`}
                    data-cursor="pointer"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton strength={0.25}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(79,140,255,0.3)]"
                data-cursor="pointer"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white glass-dock hover:border-primary/50 transition-colors"
            aria-label="Toggle Navigation Menu"
            data-cursor="pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B0F19]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-16 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-2xl font-bold text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="pt-8 flex flex-col items-center gap-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-accent shadow-neon text-center"
                >
                  Let's Work Together
                </a>
                <p className="text-xs text-muted font-mono">{PERSONAL_INFO.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
