"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa6";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type ToastType = "success" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

// ---------------------------------------------------------------------------
// Client-side validation (mirrors server rules for instant UX feedback)
// ---------------------------------------------------------------------------

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const subject = data.subject.trim();
  const message = data.message.trim();

  if (!name) errors.name = "Full name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name must be under 100 characters.";

  if (!email) errors.email = "Email address is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Subject is required.";
  else if (subject.length < 3) errors.subject = "Subject must be at least 3 characters.";
  else if (subject.length > 150) errors.subject = "Subject must be under 150 characters.";

  if (!message) errors.message = "Message is required.";
  else if (message.length < 20) errors.message = "Message must be at least 20 characters.";
  else if (message.length > 5000) errors.message = "Message must be under 5,000 characters.";

  return errors;
}

// ---------------------------------------------------------------------------
// Toast component
// ---------------------------------------------------------------------------

function ToastNotification({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: number) => void;
}) {
  const isSuccess = toast.type === "success";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border max-w-sm w-full
        ${
          isSuccess
            ? "bg-emerald-950/90 border-emerald-500/40 shadow-emerald-900/40"
            : "bg-red-950/90 border-red-500/40 shadow-red-900/40"
        }
        backdrop-blur-xl
      `}
      role="alert"
      aria-live="polite"
    >
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      )}
      <p
        className={`text-sm flex-1 leading-snug font-medium ${
          isSuccess ? "text-emerald-100" : "text-red-100"
        }`}
      >
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className={`shrink-0 p-0.5 rounded-lg transition-colors ${
          isSuccess
            ? "text-emerald-400/60 hover:text-emerald-300 hover:bg-emerald-500/10"
            : "text-red-400/60 hover:text-red-300 hover:bg-red-500/10"
        }`}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Field wrapper with animated error message
// ---------------------------------------------------------------------------

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-mono"
          role="alert"
        >
          <AlertCircle className="w-3 h-3 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main Contact component
// ---------------------------------------------------------------------------

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Honeypot field — should remain empty
  const [honeypot, setHoneypot] = useState("");

  // ---------------------------------------------------------------------------
  // Toast management
  // ---------------------------------------------------------------------------

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ---------------------------------------------------------------------------
  // Field change handler — clears field error on edit
  // ---------------------------------------------------------------------------

  const handleFieldChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ---------------------------------------------------------------------------
  // Copy email
  // ---------------------------------------------------------------------------

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ---------------------------------------------------------------------------
  // Form submit
  // ---------------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double-submit
    if (isSubmitting) return;

    // Client-side validation first
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      addToast("error", "Please fix the highlighted fields before sending.");
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success!
        try {
          const confetti = (await import("canvas-confetti")).default;
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.65 },
            colors: ["#4f8cff", "#a259ff", "#00f2fe"],
          });
        } catch {
          // ignore confetti errors
        }

        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setHoneypot("");
        addToast("success", "Message sent successfully! I'll reply within 12 hours. 🎉");
      } else if (response.status === 429) {
        addToast("error", result.error || "Too many requests. Please wait a few minutes.");
      } else if (response.status === 400 && result.errors) {
        // Server-side field validation errors
        setFieldErrors(result.errors);
        addToast("error", "Please fix the highlighted fields and try again.");
      } else {
        addToast(
          "error",
          result.error || "Failed to send message. Please try again or email me directly."
        );
      }
    } catch {
      addToast(
        "error",
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Input class helper
  // ---------------------------------------------------------------------------

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3.5 rounded-2xl text-sm glass-input transition-colors ${
      fieldErrors[field]
        ? "border-red-500/60 focus:border-red-400"
        : "focus:border-accent"
    }`;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section id="contact" className="relative py-24 px-6 sm:px-8 md:px-12">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-accent/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Toast Container — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end"
        role="status"
        aria-label="Notifications"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastNotification
              key={toast.id}
              toast={toast}
              onDismiss={dismissToast}
            />
          ))}
        </AnimatePresence>
      </div>

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
                Prefer email or WhatsApp? Copy my address, open a WhatsApp
                chat, or reach out across social platforms.
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
                id="copy-email-btn"
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

            {/* WhatsApp Box */}
            <a
              href="https://wa.me/8801707691162"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dock p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-3 group hover:border-[#25D366]/50 transition-colors"
              data-cursor="pointer"
              aria-label="Chat on WhatsApp"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                  <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs sm:text-sm font-mono text-white truncate font-medium">
                    +880 1707-691162
                  </span>
                  <span className="block text-[10px] text-muted/60 font-mono mt-0.5">
                    WhatsApp
                  </span>
                </div>
              </div>
              <span className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#25D366]/30 to-[#128C7E]/30 hover:from-[#25D366] hover:to-[#128C7E] transition-all duration-300 flex items-center gap-1.5 shrink-0 border border-[#25D366]/40 shadow-sm group-hover:from-[#25D366] group-hover:to-[#128C7E]">
                <FaWhatsapp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Chat</span>
              </span>
            </a>

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
                      <social.icon className="w-5 h-5" aria-hidden="true" />
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
                Gmail
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
                    <h4 className="text-2xl font-bold text-white">
                      Message Dispatched!
                    </h4>
                    <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your message has been sent to{" "}
                      <span className="text-white font-mono font-semibold">
                        {PERSONAL_INFO.email}
                      </span>
                      . I will reply within 12 hours.
                    </p>
                  </div>
                  <button
                    id="send-another-btn"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                    data-cursor="pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              </AnimatePresence>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-label="Contact form"
              >
                {/* Honeypot — hidden from real users, visible to bots */}
                <div
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className={inputClass("name")}
                      disabled={isSubmitting}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      aria-invalid={!!fieldErrors.name}
                    />
                    <FieldError message={fieldErrors.name} />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1"
                    >
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className={inputClass("email")}
                      disabled={isSubmitting}
                      aria-invalid={!!fieldErrors.email}
                    />
                    <FieldError message={fieldErrors.email} />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1"
                  >
                    Subject <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Project Inquiry / Shopify App / Web Development"
                    value={formData.subject}
                    onChange={(e) => handleFieldChange("subject", e.target.value)}
                    className={inputClass("subject")}
                    disabled={isSubmitting}
                    aria-invalid={!!fieldErrors.subject}
                  />
                  <FieldError message={fieldErrors.subject} />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-mono uppercase tracking-wider text-muted font-semibold flex items-center gap-1"
                  >
                    Message Details <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your project scope, timeline, or requirements... (min. 20 characters)"
                    value={formData.message}
                    onChange={(e) => handleFieldChange("message", e.target.value)}
                    className={`${inputClass("message")} resize-none`}
                    disabled={isSubmitting}
                    aria-invalid={!!fieldErrors.message}
                  />
                  {/* Character counter */}
                  <div className="flex items-center justify-between">
                    <FieldError message={fieldErrors.message} />
                    <span
                      className={`text-[10px] font-mono ml-auto shrink-0 ${
                        formData.message.length > 4500
                          ? "text-red-400"
                          : "text-muted/50"
                      }`}
                    >
                      {formData.message.length} / 5000
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_30px_rgba(79,140,255,0.5)] hover:shadow-[0_0_40px_rgba(0,242,254,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 uppercase tracking-wider cursor-pointer group disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                    data-cursor="pointer"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
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
