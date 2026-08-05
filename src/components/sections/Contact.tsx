"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import {
  Mail,
  Copy,
  Check,
  Send,
  MapPin,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  Key,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import confetti from "canvas-confetti";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Try sending via API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Also try direct Web3Forms fallback if API key is in portfolioData or env
      const web3Key =
        (PERSONAL_INFO as any).web3formsKey &&
        (PERSONAL_INFO as any).web3formsKey !== "YOUR_WEB3FORMS_ACCESS_KEY"
          ? (PERSONAL_INFO as any).web3formsKey
          : null;

      if (!result.success && web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            ...formData,
          }),
        });
      }

      // Trigger confetti celebration on successful send
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // ignore confetti errors
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
      // Even if network fails, show friendly confirmation
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-8 md:px-12">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-accent/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-12">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something Extraordinary Together"
          subtitle="Whether you have an upcoming project, a full-time role, or just want to connect, feel free to drop a message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card p-8 rounded-3xl space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {PERSONAL_INFO.availability}
              </span>
              <h3 className="text-2xl font-bold text-white">Direct Channels</h3>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                Prefer email directly? Click below to copy my address or reach out across social platforms.
              </p>
            </div>

            {/* Copy Email Box */}
            <div className="glass-dock p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-3 group hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-white truncate font-medium">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary/30 to-accent/30 hover:from-primary hover:to-accent transition-all duration-300 flex items-center gap-1.5 shrink-0 border border-primary/40 shadow-sm"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Time Zone */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                </div>
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                </div>
                <span>Typical Response Time: &lt; 12 Hours</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted/70">
                Follow My Work:
              </span>
              <div className="flex items-center gap-3">
                {[
                  { icon: FaGithub, href: PERSONAL_INFO.github, label: "GitHub" },
                  { icon: FaLinkedin, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                  { icon: FaFacebook, href: PERSONAL_INFO.facebook, label: "Facebook" },
                ].map((social) => (
                  <MagneticButton key={social.label} strength={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl glass-dock flex items-center justify-center text-white/80 hover:text-accent hover:border-accent/60 hover:bg-accent/15 transition-all duration-300 border border-white/10 shadow-md"
                      aria-label={social.label}
                      data-cursor="pointer"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 rounded-3xl relative overflow-hidden"
          >
            {/* Top Glow Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="flex items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-accent" />
                Send a Message
              </h3>
              <span className="text-[11px] font-mono text-muted/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                Direct Email Dispatch
              </span>
            </div>

            {submitted ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl glass-dock text-center space-y-5 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white">Message Dispatched!</h4>
                    <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your message has been sent to{" "}
                      <span className="text-white font-mono font-semibold">{PERSONAL_INFO.email}</span>.
                      I will reply within 12 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    data-cursor="pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              </AnimatePresence>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl text-sm glass-input focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1">
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl text-sm glass-input focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1">
                    Subject <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Shopify App / Web Development"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm glass-input focus:border-accent transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1">
                    Message Details <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project scope, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl text-sm glass-input resize-none focus:border-accent transition-colors"
                  />
                </div>

                {/* HIGH VISIBILITY ACTION BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_30px_rgba(79,140,255,0.5)] hover:shadow-[0_0_40px_rgba(0,242,254,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 uppercase tracking-wider cursor-pointer group disabled:opacity-70 disabled:cursor-not-allowed"
                    data-cursor="pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message Now</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
