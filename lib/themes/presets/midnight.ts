import type { FlexUITheme } from "../index";

export const midnight: FlexUITheme = {
  name: "midnight",
  label: "Midnight Aurora",
  description: "Obsidian void with electric violet aurora — the signature FlexUI experience.",
  tokens: {
    "--flexui-background": "#09090b",
    "--flexui-foreground": "#fafafa",
    "--flexui-surface": "rgba(17, 17, 21, 0.75)",
    "--flexui-surface-hover": "rgba(28, 28, 35, 0.65)",
    "--flexui-surface-active": "rgba(40, 40, 50, 0.6)",

    "--flexui-border": "rgba(139, 92, 246, 0.06)",
    "--flexui-border-hover": "rgba(139, 92, 246, 0.14)",
    "--flexui-border-focus": "rgba(167, 139, 250, 0.6)",

    "--flexui-accent": "#A78BFA",
    "--flexui-accent-foreground": "#09090b",
    "--flexui-accent-hover": "#C4B5FD",
    "--flexui-accent-glow": "rgba(167, 139, 250, 0.35)",

    "--flexui-secondary": "#818CF8",
    "--flexui-secondary-foreground": "#09090b",

    "--flexui-muted": "rgba(139, 92, 246, 0.04)",
    "--flexui-muted-foreground": "#6b6b80",

    "--flexui-success": "#6EE7B7",
    "--flexui-warning": "#FDE68A",
    "--flexui-error": "#FCA5A5",
    "--flexui-info": "#93C5FD",

    "--flexui-glow-primary": "167, 139, 250",
    "--flexui-glow-secondary": "129, 140, 248",
    "--flexui-shimmer": "rgba(167, 139, 250, 0.15)",
    "--flexui-spotlight": "rgba(167, 139, 250, 0.08)",

    "--flexui-heading": "#fafafa",
    "--flexui-body": "#a1a1aa",
    "--flexui-caption": "#52525b",

    "--flexui-radius-sm": "0.5rem",
    "--flexui-radius-md": "0.75rem",
    "--flexui-radius-lg": "1rem",
    "--flexui-radius-xl": "1.5rem",

    "--flexui-shadow-sm": "0 1px 3px rgba(0,0,0,0.5), 0 0 1px rgba(139,92,246,0.05)",
    "--flexui-shadow-md": "0 4px 16px rgba(0,0,0,0.4), 0 0 8px rgba(139,92,246,0.04)",
    "--flexui-shadow-lg": "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(139,92,246,0.06)",
    "--flexui-shadow-glow": "0 0 20px rgba(167,139,250,0.2), 0 0 80px rgba(139,92,246,0.1), 0 0 120px rgba(139,92,246,0.05)",
  },
};
