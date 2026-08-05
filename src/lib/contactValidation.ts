/**
 * contactValidation.ts
 * Reusable validation, sanitization, and HTML email template utilities
 * for the portfolio contact form API route.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must be empty to pass bot protection */
  website?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

// ---------------------------------------------------------------------------
// Sanitization
// ---------------------------------------------------------------------------

/**
 * Strips HTML/script tags and trims whitespace to prevent XSS injection.
 */
export function sanitizeInput(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>]/g, "")    // strip any stray angle brackets
    .trim();
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/** RFC 5322-compatible email regex */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates all contact form fields.
 * Returns a ValidationResult with a `valid` boolean and per-field error messages.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  // --- Honeypot bot protection ---
  if (data.website && data.website.trim().length > 0) {
    // Silent rejection — looks like a valid failure to bots
    return { valid: false, errors: { website: "Bot detected." } };
  }

  // --- Name ---
  const name = sanitizeInput(data.name);
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be under 100 characters.";
  }

  // --- Email ---
  const email = sanitizeInput(data.email);
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!validateEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // --- Subject ---
  const subject = sanitizeInput(data.subject);
  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  } else if (subject.length > 150) {
    errors.subject = "Subject must be under 150 characters.";
  }

  // --- Message ---
  const message = sanitizeInput(data.message);
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 20) {
    errors.message = "Message must be at least 20 characters.";
  } else if (message.length > 5000) {
    errors.message = "Message must be under 5,000 characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ---------------------------------------------------------------------------
// HTML Email Template
// ---------------------------------------------------------------------------

/**
 * Generates a clean, branded HTML email body for contact form submissions.
 */
export function generateEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}): string {
  // Escape content for HTML rendering
  const escape = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br/>");

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a0f; font-family: 'Segoe UI', Arial, sans-serif; color: #e2e8f0; }
    .wrapper { max-width: 640px; margin: 0 auto; padding: 32px 16px; }
    .card {
      background: linear-gradient(135deg, #111827 0%, #1a1a2e 100%);
      border: 1px solid rgba(79, 140, 255, 0.25);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0,0,0,0.6);
    }
    /* Header */
    .header {
      background: linear-gradient(135deg, #4f8cff 0%, #a259ff 50%, #00f2fe 100%);
      padding: 36px 40px;
      text-align: center;
    }
    .header-icon {
      display: inline-block;
      width: 56px; height: 56px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      line-height: 56px;
      font-size: 28px;
      margin-bottom: 16px;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .header p {
      font-size: 13px;
      color: rgba(255,255,255,0.75);
      margin-top: 6px;
    }
    /* Body */
    .body { padding: 36px 40px; }
    .intro {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 28px;
      line-height: 1.6;
    }
    /* Field rows */
    .field {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }
    .field-label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #4f8cff;
      margin-bottom: 6px;
      font-family: 'Courier New', monospace;
    }
    .field-value {
      font-size: 15px;
      color: #f1f5f9;
      line-height: 1.6;
      word-break: break-word;
    }
    .field-value a {
      color: #00f2fe;
      text-decoration: none;
    }
    /* Message special styling */
    .message-block {
      background: rgba(79, 140, 255, 0.05);
      border: 1px solid rgba(79, 140, 255, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 14px;
    }
    .message-text {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.8;
      white-space: pre-wrap;
      font-style: italic;
    }
    /* Divider */
    .divider {
      border: none;
      border-top: 1px solid rgba(255,255,255,0.07);
      margin: 28px 0;
    }
    /* Quick reply CTA */
    .cta-section { text-align: center; margin: 24px 0; }
    .cta-btn {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #4f8cff, #a259ff);
      color: #ffffff !important;
      font-weight: 700;
      font-size: 14px;
      border-radius: 50px;
      text-decoration: none;
      letter-spacing: 0.03em;
      box-shadow: 0 8px 20px rgba(79, 140, 255, 0.4);
    }
    /* Footer */
    .footer {
      background: rgba(0,0,0,0.3);
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .footer p {
      font-size: 12px;
      color: #475569;
      line-height: 1.6;
    }
    .footer .timestamp {
      display: inline-block;
      margin-top: 8px;
      font-size: 11px;
      color: #334155;
      font-family: 'Courier New', monospace;
    }
    /* Badge */
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 20px;
      font-size: 11px;
      color: #34d399;
      font-weight: 600;
      margin-left: 8px;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">

      <!-- Header -->
      <div class="header">
        <div class="header-icon">✉️</div>
        <h1>New Contact Form Submission</h1>
        <p>Someone reached out via your portfolio website</p>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="intro">
          You have a new message from your portfolio contact form.
          Review the details below and reply directly to the sender.
        </p>

        <!-- Sender Info -->
        <div class="field">
          <span class="field-label">👤 Full Name</span>
          <div class="field-value">${escape(data.name)}</div>
        </div>

        <div class="field">
          <span class="field-label">📧 Email Address</span>
          <div class="field-value">
            <a href="mailto:${escape(data.email)}">${escape(data.email)}</a>
          </div>
        </div>

        <div class="field">
          <span class="field-label">📌 Subject</span>
          <div class="field-value">${escape(data.subject)}</div>
        </div>

        <hr class="divider" />

        <!-- Message -->
        <span class="field-label" style="display:block; margin-bottom:12px; font-size:10px; letter-spacing:0.12em; color:#4f8cff;">
          💬 Message
        </span>
        <div class="message-block">
          <p class="message-text">${escape(data.message)}</p>
        </div>

        <!-- Quick Reply CTA -->
        <div class="cta-section">
          <a href="mailto:${escape(data.email)}?subject=Re: ${escape(data.subject)}" class="cta-btn">
            Reply to ${escape(data.name)} →
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div class="footer">
        <p>This email was sent automatically from your portfolio contact form.</p>
        <p>Never reply to this system address — use the button above to reply directly.</p>
        <span class="timestamp">⏱ Submitted: ${escape(data.submittedAt)}</span>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates a plain-text fallback for email clients that don't support HTML.
 */
export function generateEmailText(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}): string {
  return `
NEW CONTACT FORM SUBMISSION
===========================

From:     ${data.name}
Email:    ${data.email}
Subject:  ${data.subject}
Submitted: ${data.submittedAt}

MESSAGE:
--------
${data.message}

---
Sent via your portfolio contact form.
  `.trim();
}
