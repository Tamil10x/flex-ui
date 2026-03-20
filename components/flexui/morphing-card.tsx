"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface MorphingCardProps {
  /** Content shown in collapsed state */
  collapsed: React.ReactNode;
  /** Content shown in expanded state */
  expanded: React.ReactNode;
  className?: string;
  collapsedClassName?: string;
  expandedClassName?: string;
}

// ─── Spring transition config ───────────────────────────────────────────────

const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 24,
  mass: 1,
};

const contentVariants = {
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(6px)" },
};

// ─── MorphingCard ───────────────────────────────────────────────────────────

export function MorphingCard({
  collapsed,
  expanded,
  className,
  collapsedClassName,
  expandedClassName,
}: MorphingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueId = useId();
  const layoutId = `morphing-card-${uniqueId}`;

  return (
    <motion.div
      layoutId={layoutId}
      onClick={() => setIsExpanded((prev) => !prev)}
      className={cn(
        "relative cursor-pointer overflow-hidden",
        "rounded-2xl",
        "bg-zinc-950/90 backdrop-blur-2xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.06)]",
        "transition-shadow duration-500",
        isExpanded &&
          "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,0,0,0.5)]",
        className,
        isExpanded ? expandedClassName : collapsedClassName
      )}
      style={{ borderRadius: 16 }}
      transition={springTransition}
      layout
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((prev) => !prev);
        }
      }}
    >
      {/* Glass top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 rounded-t-2xl bg-gradient-to-b from-white/[0.04] to-transparent" />

      {/* Content with crossfade */}
      <AnimatePresence mode="wait" initial={false}>
        {isExpanded ? (
          <motion.div
            key="expanded"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="relative z-[1] p-5"
          >
            {expanded}
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="relative z-[1] p-5"
          >
            {collapsed}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
