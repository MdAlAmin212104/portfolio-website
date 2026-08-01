import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111726",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#4F8CFF",
          glow: "rgba(79, 140, 255, 0.4)",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          glow: "rgba(123, 97, 255, 0.4)",
        },
        accent: {
          DEFAULT: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.4)",
        },
        muted: "#A7A7A7",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        aurora: "aurora 20s ease infinite alternate",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite alternate",
        "spin-slow": "spin 25s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        noise: "noise 0.2s steps(2) infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            backgroundPosition: "0% 50%",
            filter: "hue-rotate(0deg)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            filter: "hue-rotate(30deg)",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            filter: "hue-rotate(0deg)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "100%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "16px",
      },
      boxShadow: {
        neon: "0 0 25px rgba(79, 140, 255, 0.3), 0 0 50px rgba(123, 97, 255, 0.15)",
        "neon-purple": "0 0 25px rgba(123, 97, 255, 0.35)",
        "neon-cyan": "0 0 25px rgba(0, 212, 255, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
} satisfies Config;
