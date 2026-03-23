import type { FlexUITheme } from "../index";

export const forest: FlexUITheme = {
  name: "forest",
  label: "Emerald Canopy",
  description: "Ancient dark forest floor, firefly emerald glow — mystical and alive.",
  tokens: {
    "--flexui-background": "#060f08",
    "--flexui-foreground": "#e6f5eb",
    "--flexui-surface": "rgba(10, 26, 16, 0.75)",
    "--flexui-surface-hover": "rgba(16, 40, 24, 0.65)",
    "--flexui-surface-active": "rgba(24, 56, 34, 0.55)",

    "--flexui-border": "rgba(52, 211, 153, 0.06)",
    "--flexui-border-hover": "rgba(52, 211, 153, 0.14)",
    "--flexui-border-focus": "rgba(52, 211, 153, 0.55)",

    "--flexui-accent": "#34D399",
    "--flexui-accent-foreground": "#060f08",
    "--flexui-accent-hover": "#6EE7B7",
    "--flexui-accent-glow": "rgba(52, 211, 153, 0.3)",

    "--flexui-secondary": "#BEF264",
    "--flexui-secondary-foreground": "#060f08",

    "--flexui-muted": "rgba(52, 211, 153, 0.04)",
    "--flexui-muted-foreground": "#5a8068",

    "--flexui-success": "#86EFAC",
    "--flexui-warning": "#FDE68A",
    "--flexui-error": "#FCA5A5",
    "--flexui-info": "#67E8F9",

    "--flexui-glow-primary": "52, 211, 153",
    "--flexui-glow-secondary": "190, 242, 100",
    "--flexui-shimmer": "rgba(52, 211, 153, 0.12)",
    "--flexui-spotlight": "rgba(52, 211, 153, 0.06)",

    "--flexui-heading": "#e6f5eb",
    "--flexui-body": "#7faa8e",
    "--flexui-caption": "#3d6b4e",

    "--flexui-radius-sm": "0.5rem",
    "--flexui-radius-md": "0.875rem",
    "--flexui-radius-lg": "1.25rem",
    "--flexui-radius-xl": "1.75rem",

    "--flexui-shadow-sm": "0 1px 3px rgba(6,15,8,0.6), 0 0 1px rgba(52,211,153,0.05)",
    "--flexui-shadow-md": "0 4px 16px rgba(6,15,8,0.5), 0 0 8px rgba(52,211,153,0.04)",
    "--flexui-shadow-lg": "0 16px 48px rgba(6,15,8,0.6), 0 0 24px rgba(52,211,153,0.06)",
    "--flexui-shadow-glow": "0 0 20px rgba(52,211,153,0.18), 0 0 80px rgba(52,211,153,0.08), 0 0 120px rgba(52,211,153,0.04)",
  },
};
