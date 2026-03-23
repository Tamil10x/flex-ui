import type { FlexUITheme } from "../index";

export const sunset: FlexUITheme = {
  name: "sunset",
  label: "Solar Ember",
  description: "Molten gold, volcanic amber — forged in the heart of a dying star.",
  tokens: {
    "--flexui-background": "#0c0806",
    "--flexui-foreground": "#fef5e7",
    "--flexui-surface": "rgba(22, 14, 10, 0.75)",
    "--flexui-surface-hover": "rgba(36, 22, 14, 0.65)",
    "--flexui-surface-active": "rgba(52, 32, 18, 0.55)",

    "--flexui-border": "rgba(251, 191, 36, 0.06)",
    "--flexui-border-hover": "rgba(251, 191, 36, 0.14)",
    "--flexui-border-focus": "rgba(251, 191, 36, 0.55)",

    "--flexui-accent": "#FBBF24",
    "--flexui-accent-foreground": "#0c0806",
    "--flexui-accent-hover": "#FDE68A",
    "--flexui-accent-glow": "rgba(251, 191, 36, 0.3)",

    "--flexui-secondary": "#FB923C",
    "--flexui-secondary-foreground": "#0c0806",

    "--flexui-muted": "rgba(251, 191, 36, 0.04)",
    "--flexui-muted-foreground": "#8a7060",

    "--flexui-success": "#86EFAC",
    "--flexui-warning": "#FDE68A",
    "--flexui-error": "#FCA5A5",
    "--flexui-info": "#7DD3FC",

    "--flexui-glow-primary": "251, 191, 36",
    "--flexui-glow-secondary": "251, 146, 60",
    "--flexui-shimmer": "rgba(251, 191, 36, 0.12)",
    "--flexui-spotlight": "rgba(251, 191, 36, 0.06)",

    "--flexui-heading": "#fef5e7",
    "--flexui-body": "#b0998a",
    "--flexui-caption": "#6b5a4e",

    "--flexui-radius-sm": "0.5rem",
    "--flexui-radius-md": "0.75rem",
    "--flexui-radius-lg": "1rem",
    "--flexui-radius-xl": "1.5rem",

    "--flexui-shadow-sm": "0 1px 3px rgba(12,8,6,0.6), 0 0 1px rgba(251,191,36,0.05)",
    "--flexui-shadow-md": "0 4px 16px rgba(12,8,6,0.5), 0 0 8px rgba(251,191,36,0.04)",
    "--flexui-shadow-lg": "0 16px 48px rgba(12,8,6,0.6), 0 0 24px rgba(251,191,36,0.06)",
    "--flexui-shadow-glow": "0 0 20px rgba(251,191,36,0.18), 0 0 80px rgba(251,191,36,0.08), 0 0 120px rgba(251,191,36,0.04)",
  },
};
