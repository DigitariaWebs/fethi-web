import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,md,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Brand (static — same hue in light/dark)
        primary: {
          DEFAULT: "#C8553D",
          hover: "#B14732",
          pressed: "#9A3C2B",
          soft: "#FBE9E2",
          ink: "#5C2419",
        },
        accent: {
          DEFAULT: "#2F6B5E",
          soft: "#E4EDE9",
        },

        // Surfaces — driven by CSS variables in globals.css.
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",

        // Neutrals (warm) — variables, scale inverts in dark mode
        n: {
          50: "rgb(var(--color-n-50) / <alpha-value>)",
          100: "rgb(var(--color-n-100) / <alpha-value>)",
          200: "rgb(var(--color-n-200) / <alpha-value>)",
          300: "rgb(var(--color-n-300) / <alpha-value>)",
          400: "rgb(var(--color-n-400) / <alpha-value>)",
          500: "rgb(var(--color-n-500) / <alpha-value>)",
          600: "rgb(var(--color-n-600) / <alpha-value>)",
          700: "rgb(var(--color-n-700) / <alpha-value>)",
          800: "rgb(var(--color-n-800) / <alpha-value>)",
        },

        // Status (static)
        success: { DEFAULT: "#3F7D5C", soft: "#E2EFE7" },
        warning: { DEFAULT: "#C68A2E", soft: "#F7ECD6" },
        danger: { DEFAULT: "#B23A2A", soft: "#F7E1DC" },
        info: { DEFAULT: "#3A6BA3", soft: "#E1EAF4" },

        // Derived from mode-aware ink so they flip automatically
        overlay: "rgb(var(--color-ink) / 0.45)",
        divider: "rgb(var(--color-ink) / 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        // exact scale from brand DNA
        "display-xl": ["3.5rem", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        display: ["2.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h1: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h2: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em" }],
        "body-lg": ["1.0625rem", { lineHeight: "1.55" }],
        body: ["0.9375rem", { lineHeight: "1.55" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
        label: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.01em" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        // warm-toned, never pure black
        subtle: "0 1px 2px rgba(31, 36, 33, 0.04), 0 1px 1px rgba(31, 36, 33, 0.03)",
        medium: "0 4px 12px -2px rgba(31, 36, 33, 0.06), 0 2px 4px -1px rgba(31, 36, 33, 0.04)",
        strong: "0 16px 32px -8px rgba(31, 36, 33, 0.12), 0 4px 8px -2px rgba(31, 36, 33, 0.06)",
        glass: "0 24px 48px -16px rgba(92, 36, 25, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        // mobile-design parity for the pill button system
        "btn-shine":
          "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.10), 0 1px 2px rgba(31,36,33,0.10), 0 6px 14px rgba(200,85,61,0.22)",
        "btn-shine-hover":
          "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.10), 0 2px 4px rgba(31,36,33,0.10), 0 8px 18px rgba(200,85,61,0.28)",
        "btn-shine-danger":
          "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.10), 0 1px 2px rgba(31,36,33,0.10), 0 6px 14px rgba(178,58,42,0.22)",
        "btn-glass":
          "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(31,36,33,0.04), 0 1px 2px rgba(31,36,33,0.04), 0 4px 12px rgba(31,36,33,0.08)",
        "btn-glass-hover":
          "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(31,36,33,0.06), 0 2px 4px rgba(31,36,33,0.06), 0 6px 16px rgba(31,36,33,0.10)",
        "input-glass":
          "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(31,36,33,0.04)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        shimmer: "shimmer 2s infinite linear",
        marquee: "marquee 60s linear infinite",
        "marquee-slow": "marquee 90s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
