"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CommandItem {
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

interface CommandMenuProps {
  items: CommandItem[];
  placeholder?: string;
  className?: string;
}

export function CommandMenu({ items, placeholder = "Type a command…", className }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) { setQuery(""); setActive(0); inputRef.current?.focus(); }
  }, [open]);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      else if (e.key === "Enter" && filtered[active]) { filtered[active].onSelect(); setOpen(false); }
      else if (e.key === "Escape") setOpen(false);
    },
    [filtered, active]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/90 shadow-2xl backdrop-blur-xl",
              className
            )}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActive(0); }}
              onKeyDown={onKey}
              placeholder={placeholder}
              className="w-full border-b border-white/[0.08] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <div className="max-h-64 overflow-y-auto p-1">
              {filtered.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => { item.onSelect(); setOpen(false); }}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors",
                    i === active && "bg-white/[0.08] text-white"
                  )}
                >
                  {item.icon && <span className="text-zinc-500">{item.icon}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="rounded border border-white/[0.08] px-1.5 py-0.5 text-[10px] text-zinc-500">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-center text-sm text-zinc-500">No results</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
