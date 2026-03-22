"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Popover({ trigger, children, side = "bottom", className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const m: Record<string, { top: number; left: number }> = {
      bottom: { top: r.bottom + 8, left: r.left + r.width / 2 },
      top: { top: r.top - 8, left: r.left + r.width / 2 },
      left: { top: r.top + r.height / 2, left: r.left - 8 },
      right: { top: r.top + r.height / 2, left: r.right + 8 },
    };
    setPos(m[side]);
  }, [open, side]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const translate = { bottom: "-translate-x-1/2", top: "-translate-x-1/2 -translate-y-full", left: "-translate-x-full -translate-y-1/2", right: "-translate-y-1/2" };

  return (
    <>
      <div ref={triggerRef} onClick={() => setOpen((v) => !v)} className="inline-flex">
        {trigger}
      </div>
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ position: "fixed", top: pos.top, left: pos.left }}
                className={cn("z-50 rounded-lg border border-white/[0.06] bg-zinc-950 p-4 text-sm text-white shadow-xl", translate[side], className)}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
