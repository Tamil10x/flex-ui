import type { ThemeTokenValues } from "./tokens";
import { midnight } from "./presets/midnight";
import { ocean } from "./presets/ocean";
import { forest } from "./presets/forest";
import { sunset } from "./presets/sunset";
import { neon } from "./presets/neon";
import { corporate } from "./presets/corporate";

export interface FlexUITheme {
  /** Unique identifier (kebab-case) */
  name: string;
  /** Display label */
  label: string;
  /** Short description */
  description: string;
  /** CSS variable values for all semantic tokens */
  tokens: ThemeTokenValues;
}

/** All registered themes */
export const themes: Record<string, FlexUITheme> = {
  midnight,
  ocean,
  forest,
  sunset,
  neon,
  corporate,
};

/** Default theme name */
export const DEFAULT_THEME = "midnight";

/** Get a theme by name, falling back to midnight */
export function getTheme(name: string): FlexUITheme {
  return themes[name] ?? themes[DEFAULT_THEME];
}

/** List all available theme names */
export function getThemeNames(): string[] {
  return Object.keys(themes);
}

export type { ThemeTokenValues, ThemeToken } from "./tokens";
