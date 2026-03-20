"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Search } from "lucide-react";

interface SearchItem {
  title: string;
  href: string;
  category: string;
  description: string;
}

const searchItems: SearchItem[] = [
  // Getting Started
  { title: "Introduction", href: "/docs/introduction", category: "Getting Started", description: "Overview of FlexUI" },
  { title: "Installation", href: "/docs/installation", category: "Getting Started", description: "Install components via CLI" },
  { title: "Changelog", href: "/docs/changelog", category: "Getting Started", description: "Version history" },
  // Components
  { title: "Magnetic Button", href: "/docs/components/magnetic-button", category: "Components", description: "Spring-physics cursor-tracking button" },
  { title: "3D Hover Card", href: "/docs/components/three-hover-card", category: "Components", description: "Image card with 3D tilt and glass border" },
  { title: "Floating Panel", href: "/docs/components/floating-panel", category: "Components", description: "Composable floating panel with forms" },
  { title: "Interactive Globe", href: "/docs/components/interactive-globe", category: "Components", description: "WebGL world globe with arcs" },
  { title: "Expandable Card", href: "/docs/components/expandable-card", category: "Components", description: "Click-to-expand card with spring resize" },
  { title: "Reflective Card", href: "/docs/components/reflective-card", category: "Components", description: "Metallic card with webcam backdrop" },
  { title: "Shimmer Button", href: "/docs/components/shimmer-button", category: "Components", description: "Button with shimmer sweep effect" },
  { title: "Text Reveal", href: "/docs/components/text-reveal", category: "Components", description: "Staggered text animation on scroll" },
  { title: "Number Ticker", href: "/docs/components/number-ticker", category: "Components", description: "Animated counting number" },
  { title: "Spotlight Card", href: "/docs/components/spotlight-card", category: "Components", description: "Cursor-following spotlight card" },
];

function groupByCategory(items: SearchItem[]) {
  const groups: Record<string, SearchItem[]> = {};
  for (const item of items) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter items
  const filtered = query.trim()
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  const grouped = groupByCategory(filtered);
  const flatFiltered = Object.values(grouped).flat();

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Cmd+K / Ctrl+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Small delay to let AnimatePresence render
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector("[data-active='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatFiltered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatFiltered.length) % flatFiltered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatFiltered[activeIndex];
        if (item) navigate(item.href);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [flatFiltered, activeIndex, navigate]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/95 shadow-2xl backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components..."
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              />
              <kbd className="flex items-center gap-0.5 rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
              {flatFiltered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-zinc-500">
                  No results found.
                </div>
              ) : (
                Object.entries(grouped).map(([category, items]) => {
                  return (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {category}
                      </div>
                      {items.map((item) => {
                        const globalIndex = flatFiltered.indexOf(item);
                        const isActive = globalIndex === activeIndex;
                        return (
                          <button
                            key={item.href}
                            data-active={isActive}
                            onClick={() => navigate(item.href)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                              isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white">
                                {item.title}
                              </div>
                              <div className="truncate text-xs text-zinc-500">
                                {item.description}
                              </div>
                            </div>
                            {isActive && (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2 text-[11px] text-zinc-600">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">&uarr;</kbd>
                <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">&darr;</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">&crarr;</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">esc</kbd>
                close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
