"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import { Mail, Copy, Check, Send, MapPin, Clock, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaDribbble } from "react-icons/fa6";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-8 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
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
            <div className="glass-dock p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-white truncate">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-primary/30 hover:bg-primary/50 transition-colors flex items-center gap-1.5 shrink-0"
                data-cursor="pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
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
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
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
                  { icon: FaXTwitter, href: PERSONAL_INFO.twitter, label: "Twitter" },
                  { icon: FaDribbble, href: PERSONAL_INFO.dribbble, label: "Dribbble" },
                ].map((social) => (
                  <MagneticButton key={social.label} strength={0.3}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass-dock flex items-center justify-center text-muted hover:text-accent transition-colors"
                      aria-label={social.label}
                      data-cursor="pointer"
                    >
                      <social.icon className="w-4 h-4" />
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
            className="lg:col-span-7 glass-card p-8 rounded-3xl relative"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl glass-dock text-center space-y-4 border border-emerald-500/30"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Delivered!</h4>
                <p className="text-sm text-muted">
                  Thank you for reaching out. I will get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl text-sm glass-input"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl text-sm glass-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Frontend Engineering Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl text-sm glass-input"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project scope, timeline, or goal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl text-sm glass-input resize-none"
                  />
                </div>

                {/* Submit Button */}
                <MagneticButton strength={0.2} className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary via-secondary to-accent shadow-neon hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    data-cursor="pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
