/**
 * app/api/contact/route.ts
 *
 * Gmail SMTP contact form API route using Nodemailer.
 * Implements: validation, sanitization, rate limiting, bot protection.
 *
 * Required environment variables:
 *   SMTP_HOST   - e.g. smtp.gmail.com
 *   SMTP_PORT   - e.g. 587
 *   SMTP_USER   - your Gmail address
 *   SMTP_PASS   - Gmail App Password (NOT your login password)
 */

import nodemailer from "nodemailer";
import {
  validateContactForm,
  sanitizeInput,
  generateEmailHtml,
  generateEmailText,
  type ContactFormData,
} from "@/lib/contactValidation";

// ---------------------------------------------------------------------------
// Route segment config — forces Node.js runtime (required for Nodemailer)
// ---------------------------------------------------------------------------
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// In-memory rate limiter
// Stores: IP → { count, resetAt }
// Limit: 5 submissions per 15 minutes per IP
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    // First request or window expired — reset
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

// Clean up expired entries periodically to prevent memory leaks
function pruneRateLimitStore() {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) rateLimitStore.delete(ip);
  }
}

// ---------------------------------------------------------------------------
// Nodemailer transporter factory
// ---------------------------------------------------------------------------
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP environment variables. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
    tls: {
      // Required for Gmail SMTP to work reliably
      rejectUnauthorized: true,
    },
  });
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: Request): Promise<Response> {
  // --- 1. Extract IP for rate limiting ---
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  // --- 2. Rate limit check ---
  pruneRateLimitStore();
  const { allowed, retryAfterSeconds } = checkRateLimit(ip);

  if (!allowed) {
    return Response.json(
      {
        success: false,
        error: `Too many requests. Please wait ${Math.ceil(retryAfterSeconds / 60)} minutes before trying again.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      }
    );
  }

  // --- 3. Parse request body ---
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // --- 4. Extract & sanitize fields ---
  const formData: ContactFormData = {
    name: sanitizeInput(body.name),
    email: sanitizeInput(body.email),
    subject: sanitizeInput(body.subject),
    message: sanitizeInput(body.message),
    website: sanitizeInput(body.website), // honeypot field
  };

  // --- 5. Validate ---
  const { valid, errors } = validateContactForm(formData);

  if (!valid) {
    // Honeypot triggered — silent 200 to fool bots
    if (errors.website) {
      return Response.json({ success: true, message: "Message sent." });
    }

    return Response.json(
      {
        success: false,
        error: "Validation failed. Please check your inputs.",
        errors,
      },
      { status: 400 }
    );
  }

  // --- 6. Build email content ---
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "long",
  }) + " (UTC)";

  const emailData = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    submittedAt,
  };

  const htmlBody = generateEmailHtml(emailData);
  const textBody = generateEmailText(emailData);

  // --- 7. Send via Gmail SMTP ---
  try {
    const transporter = createTransporter();

    // Verify SMTP connection before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to yourself
      replyTo: formData.email,   // replies go directly to the sender
      subject: "New Contact Form Submission",
      text: textBody,
      html: htmlBody,
    });

    return Response.json(
      {
        success: true,
        message: "Your message has been sent successfully! I'll reply within 12 hours.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Contact API] Failed to send email:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    // Don't expose internal SMTP details to the client
    return Response.json(
      {
        success: false,
        error:
          "Failed to send your message. Please try again or contact me directly via email.",
      },
      { status: 500 }
    );
  }
}
