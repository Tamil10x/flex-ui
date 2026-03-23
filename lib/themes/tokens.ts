/**
 * FlexUI Design Token Definitions
 *
 * Three-layer architecture:
 * 1. Primitive — raw color values (defined in each preset)
 * 2. Semantic — purpose-based mappings (these token names)
 * 3. Component — component-scoped overrides (via className/props)
 */

/** All semantic token names used by FlexUI themes */
export const THEME_TOKENS = [
  // Core surfaces
  "--flexui-background",
  "--flexui-foreground",
  "--flexui-surface",
  "--flexui-surface-hover",
  "--flexui-surface-active",

  // Borders
  "--flexui-border",
  "--flexui-border-hover",
  "--flexui-border-focus",

  // Accent / brand
  "--flexui-accent",
  "--flexui-accent-foreground",
  "--flexui-accent-hover",
  "--flexui-accent-glow",

  // Secondary accent
  "--flexui-secondary",
  "--flexui-secondary-foreground",

  // Muted / subtle
  "--flexui-muted",
  "--flexui-muted-foreground",

  // Semantic status
  "--flexui-success",
  "--flexui-warning",
  "--flexui-error",
  "--flexui-info",

  // Effects
  "--flexui-glow-primary",
  "--flexui-glow-secondary",
  "--flexui-shimmer",
  "--flexui-spotlight",

  // Typography
  "--flexui-heading",
  "--flexui-body",
  "--flexui-caption",

  // Radii
  "--flexui-radius-sm",
  "--flexui-radius-md",
  "--flexui-radius-lg",
  "--flexui-radius-xl",

  // Shadows
  "--flexui-shadow-sm",
  "--flexui-shadow-md",
  "--flexui-shadow-lg",
  "--flexui-shadow-glow",
] as const;

export type ThemeToken = (typeof THEME_TOKENS)[number];
export type ThemeTokenValues = Record<ThemeToken, string>;
