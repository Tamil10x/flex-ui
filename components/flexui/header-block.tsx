"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderBlockProps {
  /** Logo text or element */
  logo?: React.ReactNode;
  /** Navigation links */
  navItems?: NavItem[];
  /** Primary CTA button */
  cta?: { label: string; href: string };
  /** Visual variant */
  variant?: "transparent" | "solid" | "glassmorphic";
  /** Sticky on scroll */
  sticky?: boolean;
  className?: string;
}

export function HeaderBlock({
  logo = "FlexUI",
  navItems = [],
  cta,
  variant = "glassmorphic",
  sticky = true,
  className,
}: HeaderBlockProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  const variantClasses = {
    transparent: "bg-transparent",
    solid: "bg-zinc-950",
    glassmorphic: cn(
      "bg-zinc-950/60 backdrop-blur-xl",
      scrolled && "bg-zinc-950/80 border-b border-white/[0.06] shadow-lg shadow-black/20"
    ),
  };

  return (
    <header
      className={cn(
        "top-0 z-50 w-full px-6 py-4 transition-all duration-300",
        sticky && "sticky",
        variantClasses[variant],
        className
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-bold text-white">{logo}</div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          {cta && (
            <a
              href={cta.href}
              className="inline-flex h-9 items-center rounded-lg bg-white px-4 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
            >
              {cta.label}
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none">
            {mobileOpen ? (
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <>
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden border-t border-white/[0.06] pt-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              {cta && (
                <a
                  href={cta.href}
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-zinc-950"
                >
                  {cta.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
