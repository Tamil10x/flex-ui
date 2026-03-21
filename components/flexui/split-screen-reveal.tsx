"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitScreenRevealProps {
  /** Content shown on the left panel (or top panel in vertical mode) */
  leftContent?: React.ReactNode;
  /** Content shown on the right panel (or bottom panel in vertical mode) */
  rightContent?: React.ReactNode;
  /** Content revealed underneath */
  children: React.ReactNode;
  className?: string;
  /** Split direction */
  direction?: "horizontal" | "vertical";
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when toggled */
  onToggle?: () => void;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export function SplitScreenReveal({
  leftContent,
  rightContent,
  children,
  className,
  direction = "horizontal",
  isOpen: controlledOpen,
  onToggle,
}: SplitScreenRevealProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalOpen((prev) => !prev);
    }
  }, [onToggle, isControlled]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ isolation: "isolate" }}
    >
      {/* Revealed content underneath */}
      <div className="relative z-0">{children}</div>

      {/* Panels overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left / Top panel */}
        <motion.div
          className="pointer-events-auto absolute cursor-pointer"
          style={
            isHorizontal
              ? { top: 0, left: 0, width: "50%", height: "100%" }
              : { top: 0, left: 0, width: "100%", height: "50%" }
          }
          animate={
            isOpen
              ? isHorizontal
                ? { x: "-100%" }
                : { y: "-100%" }
              : isHorizontal
                ? { x: 0 }
                : { y: 0 }
          }
          transition={springTransition}
          onClick={handleToggle}
        >
          <div
            className={cn(
              "h-full w-full",
              "bg-zinc-900/80 backdrop-blur-xl",
              "border-white/[0.06]",
              isHorizontal ? "border-r" : "border-b"
            )}
          >
            {/* Glassmorphic inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              {leftContent}
            </div>
          </div>
        </motion.div>

        {/* Right / Bottom panel */}
        <motion.div
          className="pointer-events-auto absolute cursor-pointer"
          style={
            isHorizontal
              ? { top: 0, right: 0, width: "50%", height: "100%" }
              : { bottom: 0, left: 0, width: "100%", height: "50%" }
          }
          animate={
            isOpen
              ? isHorizontal
                ? { x: "100%" }
                : { y: "100%" }
              : isHorizontal
                ? { x: 0 }
                : { y: 0 }
          }
          transition={springTransition}
          onClick={handleToggle}
        >
          <div
            className={cn(
              "h-full w-full",
              "bg-zinc-900/80 backdrop-blur-xl",
              "border-white/[0.06]",
              isHorizontal ? "border-l" : "border-t"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.03] to-transparent" />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              {rightContent}
            </div>
          </div>
        </motion.div>

        {/* Center glow line — visible when panels are closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className={cn(
                "pointer-events-none absolute z-20",
                isHorizontal
                  ? "top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
                  : "left-0 right-0 top-1/2 h-px -translate-y-1/2"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "h-full w-full",
                  isHorizontal
                    ? "bg-gradient-to-b from-transparent via-violet-500/40 to-transparent"
                    : "bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
                )}
              />
              {/* Glow bloom */}
              <div
                className={cn(
                  "absolute",
                  isHorizontal
                    ? "top-0 bottom-0 left-1/2 w-8 -translate-x-1/2"
                    : "left-0 right-0 top-1/2 h-8 -translate-y-1/2"
                )}
                style={{
                  background: isHorizontal
                    ? "radial-gradient(ellipse at center, rgba(139,92,246,0.15), transparent 70%)"
                    : "radial-gradient(ellipse at center, rgba(139,92,246,0.15), transparent 70%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
