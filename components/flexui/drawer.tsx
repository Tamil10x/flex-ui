"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Which side the drawer opens from */
  side?: "bottom" | "right" | "left";
  /** Show backdrop overlay */
  showOverlay?: boolean;
}

const slideVariants = {
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

const positionClasses: Record<string, string> = {
  bottom: "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl",
  right: "inset-y-0 right-0 w-full max-w-md rounded-l-2xl",
  left: "inset-y-0 left-0 w-full max-w-md rounded-r-2xl",
};

export function Drawer({
  open,
  onClose,
  children,
  className,
  side = "bottom",
  showOverlay = true,
}: DrawerProps) {
  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Body scroll lock + ESC listener
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, handleKeyDown]);

  // SSR guard
  if (typeof document === "undefined") return null;

  const variant = slideVariants[side];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay */}
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
          )}

          {/* Drawer panel */}
          <motion.div
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={springTransition}
            className={cn(
              "absolute z-10 flex flex-col border-white/[0.08] bg-zinc-950/95 backdrop-blur-2xl",
              side === "bottom" && "border-t",
              side === "right" && "border-l",
              side === "left" && "border-r",
              positionClasses[side],
              className
            )}
          >
            {/* Drag handle for bottom drawer */}
            {side === "bottom" && (
              <div className="flex justify-center py-3">
                <div className="h-1 w-10 rounded-full bg-white/[0.15]" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-auto px-6 pb-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
