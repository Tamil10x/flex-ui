import type { FlexUITheme } from "../index";

export const corporate: FlexUITheme = {
  name: "corporate",
  label: "Executive Suite",
  description: "Refined deep slate, royal indigo — boardroom authority, Swiss precision.",
  tokens: {
    "--flexui-background": "#0a0e1a",
    "--flexui-foreground": "#eaecf5",
    "--flexui-surface": "rgba(16, 22, 40, 0.75)",
    "--flexui-surface-hover": "rgba(26, 34, 58, 0.65)",
    "--flexui-surface-active": "rgba(38, 48, 78, 0.55)",

    "--flexui-border": "rgba(99, 102, 241, 0.06)",
    "--flexui-border-hover": "rgba(99, 102, 241, 0.14)",
    "--flexui-border-focus": "rgba(129, 140, 248, 0.55)",

    "--flexui-accent": "#818CF8",
    "--flexui-accent-foreground": "#0a0e1a",
    "--flexui-accent-hover": "#A5B4FC",
    "--flexui-accent-glow": "rgba(129, 140, 248, 0.25)",

    "--flexui-secondary": "#C084FC",
    "--flexui-secondary-foreground": "#0a0e1a",

    "--flexui-muted": "rgba(99, 102, 241, 0.04)",
    "--flexui-muted-foreground": "#6070a0",

    "--flexui-success": "#6EE7B7",
    "--flexui-warning": "#FDE68A",
    "--flexui-error": "#FCA5A5",
    "--flexui-info": "#93C5FD",

    "--flexui-glow-primary": "129, 140, 248",
    "--flexui-glow-secondary": "192, 132, 252",
    "--flexui-shimmer": "rgba(129, 140, 248, 0.1)",
    "--flexui-spotlight": "rgba(129, 140, 248, 0.05)",

    "--flexui-heading": "#eaecf5",
    "--flexui-body": "#8892b8",
    "--flexui-caption": "#4e5880",

    "--flexui-radius-sm": "0.375rem",
    "--flexui-radius-md": "0.625rem",
    "--flexui-radius-lg": "0.875rem",
    "--flexui-radius-xl": "1.25rem",

    "--flexui-shadow-sm": "0 1px 3px rgba(10,14,26,0.5), 0 0 1px rgba(99,102,241,0.05)",
    "--flexui-shadow-md": "0 4px 16px rgba(10,14,26,0.4), 0 0 8px rgba(99,102,241,0.04)",
    "--flexui-shadow-lg": "0 16px 48px rgba(10,14,26,0.5), 0 0 24px rgba(99,102,241,0.06)",
    "--flexui-shadow-glow": "0 0 20px rgba(129,140,248,0.15), 0 0 80px rgba(99,102,241,0.07), 0 0 120px rgba(192,132,252,0.04)",
  },
};
