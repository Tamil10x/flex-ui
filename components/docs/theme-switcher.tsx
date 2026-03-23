"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const themeList = Object.values(themes);
  const currentTheme = themes[themeName];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
          "border text-zinc-400 hover:text-zinc-200",
          isOpen
            ? "border-white/[0.12] bg-white/[0.06]"
            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
        )}
      >
        {/* Accent + secondary dots */}
        <div className="flex -space-x-1">
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/30 transition-colors duration-500"
            style={{ backgroundColor: currentTheme?.tokens["--flexui-accent"] }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/30 transition-colors duration-500"
            style={{ backgroundColor: currentTheme?.tokens["--flexui-secondary"] }}
          />
        </div>
        <span className="capitalize">{currentTheme?.label || themeName}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="p-1.5">
              <p className="px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Select Theme
              </p>
              {themeList.map((t) => {
                const isActive = themeName === t.name;
                return (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-all duration-150",
                      isActive
                        ? "bg-white/[0.06] text-white"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    )}
                  >
                    {/* Color preview dots */}
                    <div className="flex -space-x-0.5">
                      <span
                        className="h-3 w-3 rounded-full ring-1 ring-black/20"
                        style={{ backgroundColor: t.tokens["--flexui-accent"] }}
                      />
                      <span
                        className="h-3 w-3 rounded-full ring-1 ring-black/20"
                        style={{ backgroundColor: t.tokens["--flexui-secondary"] }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="truncate text-[10px] text-zinc-500">
                        {t.description}
                      </p>
                    </div>
                    {isActive && (
                      <div
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{ background: t.tokens["--flexui-accent"] }}
                      >
                        <svg
                          className="h-2.5 w-2.5"
                          viewBox="0 0 10 10"
                          fill="none"
                          style={{ color: t.tokens["--flexui-accent-foreground"] }}
                        >
                          <path
                            d="M2 5l2 2 4-4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Gradient accent bar at bottom */}
            <div
              className="h-0.5 transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentTheme?.tokens["--flexui-accent"]}, transparent)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
