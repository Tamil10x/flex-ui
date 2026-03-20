"use client";

import React, { useState, useId, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface MorphingDialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
}

// ─── Spring transition config ───────────────────────────────────────────────

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 24,
  mass: 1,
};

// ─── MorphingDialog ─────────────────────────────────────────────────────────

export function MorphingDialog({
  trigger,
  children,
  className,
  triggerClassName,
}: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const uniqueId = useId();
  const layoutId = `morphing-dialog-${uniqueId}`;

  // SSR guard for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────────────── */}
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className={cn("cursor-pointer", triggerClassName)}
        style={{ borderRadius: 16 }}
        transition={springTransition}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        {trigger}
      </motion.div>

      {/* ── Dialog (portal) ─────────────────────────────────────────── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-[100] bg-black/60"
                  onClick={() => setIsOpen(false)}
                />

                {/* Dialog */}
                <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                  <motion.div
                    layoutId={layoutId}
                    className={cn(
                      "pointer-events-auto relative w-full max-w-lg overflow-hidden",
                      "rounded-2xl",
                      "bg-zinc-950/90 backdrop-blur-2xl",
                      "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,0,0,0.5)]",
                      className
                    )}
                    style={{ borderRadius: 16 }}
                    transition={springTransition}
                  >
                    {/* Glass top highlight */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 rounded-t-2xl bg-gradient-to-b from-white/[0.04] to-transparent" />

                    {/* Close button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.15, ...springTransition }}
                      onClick={() => setIsOpen(false)}
                      className="absolute right-3 top-3 z-10 rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ delay: 0.1, duration: 0.25 }}
                      className="relative z-[1] p-6"
                    >
                      {children}
                    </motion.div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
