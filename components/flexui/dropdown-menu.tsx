"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
}

export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, items.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); }
      else if (e.key === "Enter" && focused >= 0) { items[focused]?.onClick?.(); setOpen(false); }
      else if (e.key === "Escape") setOpen(false);
    },
    [open, focused, items]
  );

  return (
    <div ref={ref} className="relative inline-flex" onKeyDown={onKey}>
      <div onClick={() => { setOpen((v) => !v); setFocused(-1); }} tabIndex={0} className="inline-flex cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-white/[0.06] bg-zinc-950 py-1 shadow-xl",
              className
            )}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setOpen(false); }}
                onMouseEnter={() => setFocused(i)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-white/80 transition-colors",
                  focused === i && "bg-white/[0.06] text-white"
                )}
              >
                {item.icon && <span className="text-white/50">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
