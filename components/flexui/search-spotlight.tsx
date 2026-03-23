"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
}

interface SearchSpotlightProps {
  items: SearchItem[];
  placeholder?: string;
  className?: string;
  /** Keyboard shortcut to open (display only) */
  shortcut?: string;
}

export function SearchSpotlight({
  items,
  placeholder = "Search...",
  className,
  shortcut = "⌘K",
}: SearchSpotlightProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter items by simple includes matching
  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(query.toLowerCase()))
  );

  // Group filtered results by category
  const grouped = filtered.reduce<Record<string, SearchItem[]>>(
    (acc, item) => {
      const cat = item.category || "Results";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  // Flatten for keyboard navigation (max 8)
  const flatResults = filtered.slice(0, 8);

  // Reset active index on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll active result into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      item.onSelect?.();
      setOpen(false);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[activeIndex]) {
            handleSelect(flatResults[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [flatResults, activeIndex, handleSelect]
  );

  // Track flat index across grouped display
  let flatIndex = -1;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-500 transition-colors hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-zinc-400",
          className
        )}
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">{placeholder}</span>
        {shortcut && (
          <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
            {shortcut}
          </kbd>
        )}
      </button>

      {/* Spotlight dialog */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
            >
              <div role="dialog" aria-modal="true" aria-label="Search" className="overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-zinc-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    aria-label="Search"
                    aria-autocomplete="list"
                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="rounded p-0.5 text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div
                  ref={listRef}
                  role="listbox"
                  className="max-h-[320px] overflow-y-auto overscroll-contain p-2"
                >
                  {flatResults.length === 0 ? (
                    <div className="px-3 py-8 text-center text-sm text-zinc-500">
                      No results found.
                    </div>
                  ) : (
                    Object.entries(grouped).map(([category, categoryItems]) => (
                      <div key={category}>
                        <div className="px-3 pb-1.5 pt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                          {category}
                        </div>
                        {categoryItems.map((item) => {
                          flatIndex++;
                          // Only render up to 8 total
                          if (flatIndex >= 8) return null;
                          const isActive = flatIndex === activeIndex;
                          const currentFlatIndex = flatIndex;
                          return (
                            <button
                              key={item.id}
                              role="option"
                              aria-selected={isActive}
                              data-active={isActive}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() =>
                                setActiveIndex(currentFlatIndex)
                              }
                              className={cn(
                                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                                isActive
                                  ? "bg-white/[0.06]"
                                  : "hover:bg-white/[0.03]"
                              )}
                            >
                              {item.icon && (
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-400">
                                  {item.icon}
                                </span>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-medium text-white">
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="truncate text-xs text-zinc-500">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                              <ArrowRight
                                className={cn(
                                  "h-4 w-4 shrink-0 transition-opacity",
                                  isActive
                                    ? "text-zinc-400 opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer hints */}
                <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5 text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">
                      ↵
                    </kbd>{" "}
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/[0.06] px-1 py-0.5 text-[10px]">
                      esc
                    </kbd>{" "}
                    Close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
