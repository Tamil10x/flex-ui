import type { FlexUITheme } from "../index";

export const neon: FlexUITheme = {
  name: "neon",
  label: "Neon Noir",
  description: "Pure black void, electric green scanlines, hot pink bleed — cyberpunk 2077.",
  tokens: {
    "--flexui-background": "#000000",
    "--flexui-foreground": "#d4ffd4",
    "--flexui-surface": "rgba(6, 6, 6, 0.9)",
    "--flexui-surface-hover": "rgba(14, 14, 14, 0.85)",
    "--flexui-surface-active": "rgba(22, 22, 22, 0.8)",

    "--flexui-border": "rgba(74, 222, 128, 0.08)",
    "--flexui-border-hover": "rgba(74, 222, 128, 0.2)",
    "--flexui-border-focus": "rgba(74, 222, 128, 0.6)",

    "--flexui-accent": "#4ADE80",
    "--flexui-accent-foreground": "#000000",
    "--flexui-accent-hover": "#86EFAC",
    "--flexui-accent-glow": "rgba(74, 222, 128, 0.4)",

    "--flexui-secondary": "#F472B6",
    "--flexui-secondary-foreground": "#000000",

    "--flexui-muted": "rgba(74, 222, 128, 0.04)",
    "--flexui-muted-foreground": "#2a7a40",

    "--flexui-success": "#4ADE80",
    "--flexui-warning": "#FACC15",
    "--flexui-error": "#FB7185",
    "--flexui-info": "#22D3EE",

    "--flexui-glow-primary": "74, 222, 128",
    "--flexui-glow-secondary": "244, 114, 182",
    "--flexui-shimmer": "rgba(74, 222, 128, 0.18)",
    "--flexui-spotlight": "rgba(74, 222, 128, 0.1)",

    "--flexui-heading": "#d4ffd4",
    "--flexui-body": "#4ade80",
    "--flexui-caption": "#1a6b32",

    "--flexui-radius-sm": "0.125rem",
    "--flexui-radius-md": "0.25rem",
    "--flexui-radius-lg": "0.375rem",
    "--flexui-radius-xl": "0.5rem",

    "--flexui-shadow-sm": "0 0 2px rgba(74,222,128,0.1), 0 1px 2px rgba(0,0,0,0.8)",
    "--flexui-shadow-md": "0 0 8px rgba(74,222,128,0.08), 0 4px 12px rgba(0,0,0,0.7)",
    "--flexui-shadow-lg": "0 0 20px rgba(74,222,128,0.08), 0 16px 40px rgba(0,0,0,0.8)",
    "--flexui-shadow-glow": "0 0 15px rgba(74,222,128,0.25), 0 0 60px rgba(74,222,128,0.12), 0 0 120px rgba(244,114,182,0.06)",
  },
};
