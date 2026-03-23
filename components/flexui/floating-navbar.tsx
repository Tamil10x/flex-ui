"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  items: NavItem[];
  className?: string;
  /** Logo element */
  logo?: React.ReactNode;
}

export function FloatingNavbar({ items, className, logo }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine if we've scrolled past the threshold
    setScrolled(currentScrollY > 50);

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-center",
          scrolled ? "py-3" : "py-4",
          className
        )}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            "flex items-center gap-1 transition-colors duration-300",
            scrolled
              ? "rounded-full border border-white/[0.08] bg-zinc-950/80 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl"
              : "w-full max-w-7xl px-6 py-2"
          )}
        >
          {/* Logo */}
          {logo && (
            <motion.div
              layout
              className="mr-4 flex shrink-0 items-center"
            >
              {logo}
            </motion.div>
          )}

          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {items.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                layout
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white",
                  scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                )}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {item.icon && (
                  <span className="text-zinc-500">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
