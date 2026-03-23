import type { FlexUITheme } from "../index";

export const ocean: FlexUITheme = {
  name: "ocean",
  label: "Deep Pacific",
  description: "Abyssal navy, bioluminescent teal — cold beauty from 10,000 leagues under.",
  tokens: {
    "--flexui-background": "#020a18",
    "--flexui-foreground": "#e8f4ff",
    "--flexui-surface": "rgba(8, 22, 48, 0.75)",
    "--flexui-surface-hover": "rgba(14, 34, 68, 0.65)",
    "--flexui-surface-active": "rgba(22, 48, 90, 0.55)",

    "--flexui-border": "rgba(34, 211, 238, 0.06)",
    "--flexui-border-hover": "rgba(34, 211, 238, 0.14)",
    "--flexui-border-focus": "rgba(34, 211, 238, 0.55)",

    "--flexui-accent": "#22D3EE",
    "--flexui-accent-foreground": "#020a18",
    "--flexui-accent-hover": "#67E8F9",
    "--flexui-accent-glow": "rgba(34, 211, 238, 0.3)",

    "--flexui-secondary": "#818CF8",
    "--flexui-secondary-foreground": "#020a18",

    "--flexui-muted": "rgba(34, 211, 238, 0.04)",
    "--flexui-muted-foreground": "#5a7a8f",

    "--flexui-success": "#5EEAD4",
    "--flexui-warning": "#FDE68A",
    "--flexui-error": "#FDA4AF",
    "--flexui-info": "#7DD3FC",

    "--flexui-glow-primary": "34, 211, 238",
    "--flexui-glow-secondary": "129, 140, 248",
    "--flexui-shimmer": "rgba(34, 211, 238, 0.12)",
    "--flexui-spotlight": "rgba(34, 211, 238, 0.06)",

    "--flexui-heading": "#e8f4ff",
    "--flexui-body": "#7fa8c4",
    "--flexui-caption": "#3d6080",

    "--flexui-radius-sm": "0.5rem",
    "--flexui-radius-md": "0.75rem",
    "--flexui-radius-lg": "1rem",
    "--flexui-radius-xl": "1.5rem",

    "--flexui-shadow-sm": "0 1px 3px rgba(2,10,24,0.6), 0 0 1px rgba(34,211,238,0.05)",
    "--flexui-shadow-md": "0 4px 16px rgba(2,10,24,0.5), 0 0 8px rgba(34,211,238,0.04)",
    "--flexui-shadow-lg": "0 16px 48px rgba(2,10,24,0.6), 0 0 24px rgba(34,211,238,0.06)",
    "--flexui-shadow-glow": "0 0 20px rgba(34,211,238,0.18), 0 0 80px rgba(34,211,238,0.08), 0 0 120px rgba(34,211,238,0.04)",
  },
};
