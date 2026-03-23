"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { themes, getTheme, getThemeNames, DEFAULT_THEME } from "@/lib/themes";
import type { FlexUITheme } from "@/lib/themes";
import { THEME_TOKENS } from "@/lib/themes/tokens";

interface ThemeContextValue {
  /** Current active theme */
  theme: FlexUITheme;
  /** Current theme name */
  themeName: string;
  /** Switch to a different theme */
  setTheme: (name: string) => void;
  /** List of all available theme names */
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "flexui-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme name (falls back to "midnight") */
  defaultTheme?: string;
  /** Force a specific theme (ignores localStorage) */
  forcedTheme?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  forcedTheme,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState(defaultTheme);

  // Read persisted theme on mount
  useEffect(() => {
    if (forcedTheme) {
      setThemeName(forcedTheme);
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && themes[stored]) {
        setThemeName(stored);
      }
    } catch {
      // localStorage unavailable (SSR, private browsing, etc.)
    }
  }, [forcedTheme]);

  // Apply CSS variables to document root
  useEffect(() => {
    const theme = getTheme(themeName);
    const root = document.documentElement;

    for (const token of THEME_TOKENS) {
      const value = theme.tokens[token];
      if (value) {
        root.style.setProperty(token, value);
      }
    }

    // Set data attribute for CSS selectors
    root.setAttribute("data-flexui-theme", themeName);
  }, [themeName]);

  const setTheme = useCallback(
    (name: string) => {
      if (forcedTheme) return;
      const resolved = themes[name] ? name : DEFAULT_THEME;
      setThemeName(resolved);
      try {
        localStorage.setItem(STORAGE_KEY, resolved);
      } catch {
        // localStorage unavailable
      }
    },
    [forcedTheme]
  );

  const theme = getTheme(themeName);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme,
        availableThemes: getThemeNames(),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
