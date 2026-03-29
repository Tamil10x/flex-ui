"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ─── Types ──────────────────────────────────────────────────────────────────
type ExpandDirection = "vertical" | "horizontal" | "both";
type ExpandBehavior = "replace" | "push";
type ContentPreset =
  | "fade"
  | "blur-sm"
  | "blur-md"
  | "slide-up"
  | "slide-down"
  | "scale";

interface ExpandableContextType {
  isExpanded: boolean;
  toggle: () => void;
  expandDirection: ExpandDirection;
  expandBehavior: ExpandBehavior;
}

const ExpandableContext = createContext<ExpandableContextType | null>(null);

function useExpandable() {
  const ctx = useContext(ExpandableContext);
  if (!ctx) throw new Error("useExpandable must be used within <Expandable>");
  return ctx;
}

// ─── Preset animation configs ───────────────────────────────────────────────
const presetVariants: Record<
  ContentPreset,
  {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  }
> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "blur-sm": {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  "blur-md": {
    initial: { opacity: 0, filter: "blur(12px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(12px)", y: 8 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.97 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.97 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  },
};

// ─── Root ───────────────────────────────────────────────────────────────────
interface ExpandableProps {
  children:
    | React.ReactNode
    | ((ctx: { isExpanded: boolean }) => React.ReactNode);
  expandDirection?: ExpandDirection;
  expandBehavior?: ExpandBehavior;
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
  className?: string;
}

export function Expandable({
  children,
  expandDirection = "both",
  expandBehavior = "replace",
  onExpandStart,
  onExpandEnd,
  className,
}: ExpandableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = useCallback(() => {
    if (!isExpanded) onExpandStart?.();
    setIsExpanded((prev) => !prev);
  }, [isExpanded, onExpandStart]);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => onExpandEnd?.(), 500);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, onExpandEnd]);

  return (
    <ExpandableContext.Provider
      value={{ isExpanded, toggle, expandDirection, expandBehavior }}
    >
      <div className={cn("relative", className)}>
        {typeof children === "function" ? children({ isExpanded }) : children}
      </div>
    </ExpandableContext.Provider>
  );
}

// ─── Trigger ────────────────────────────────────────────────────────────────
interface ExpandableTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function ExpandableTrigger({
  children,
  className,
}: ExpandableTriggerProps) {
  const { toggle, isExpanded } = useExpandable();

  return (
    <div
      className={cn("cursor-pointer", className)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      {children}
    </div>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────
interface ExpandableCardProps {
  children: React.ReactNode;
  className?: string;
  collapsedSize?: { width: number; height: number };
  expandedSize?: { width: number; height: number };
  hoverToExpand?: boolean;
  expandDelay?: number;
  collapseDelay?: number;
}

export function ExpandableCard({
  children,
  className,
  collapsedSize = { width: 320, height: 240 },
  expandedSize = { width: 420, height: 480 },
  hoverToExpand = false,
  expandDelay = 200,
  collapseDelay = 500,
}: ExpandableCardProps) {
  const { isExpanded, toggle, expandDirection } = useExpandable();
  const reducedMotion = useReducedMotion();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);

  const width =
    expandDirection === "vertical"
      ? collapsedSize.width
      : isExpanded
        ? expandedSize.width
        : collapsedSize.width;

  const height =
    expandDirection === "horizontal"
      ? collapsedSize.height
      : isExpanded
        ? expandedSize.height
        : collapsedSize.height;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (hoverToExpand) {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (isExpanded) {
        hoverTimer.current = setTimeout(toggle, collapseDelay);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!hoverToExpand || isExpanded) return;
    hoverTimer.current = setTimeout(toggle, expandDelay);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <div className="group/card relative" style={{ perspective: 800 }}>
      {/* ── Cursor-tracking glow behind card ──────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x + 12}px ${mousePos.y + 12}px, rgba(56,189,248,0.08), rgba(139,92,246,0.05), transparent 60%)`,
        }}
      />

      {/* ── Animated border gradient ─────────────────────────────────── */}
      <motion.div
        className="absolute -inset-[1px] rounded-[18px] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.3), rgba(139,92,246,0.15), transparent 50%)`,
        }}
      />

      <motion.div
        ref={cardRef}
        layout
        className={cn(
          "relative overflow-hidden rounded-[17px]",
          "bg-zinc-950/90 backdrop-blur-2xl",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.06)]",
          "transition-shadow duration-500",
          isExpanded &&
            "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,0,0,0.5)]",
          className
        )}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ width, height }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 170,
                damping: 26,
                mass: 1,
              }
        }
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Glass top highlight ─────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 rounded-t-[17px] bg-gradient-to-b from-white/[0.04] to-transparent" />

        {/* ── Cursor spotlight inside the card ────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56,189,248,0.04), transparent 50%)`,
          }}
        />

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex h-full flex-col p-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Card Header ────────────────────────────────────────────────────────────
interface ExpandableCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function ExpandableCardHeader({
  children,
  className,
}: ExpandableCardHeaderProps) {
  return <div className={cn("mb-3 shrink-0", className)}>{children}</div>;
}

// ─── Card Content ───────────────────────────────────────────────────────────
interface ExpandableCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ExpandableCardContent({
  children,
  className,
}: ExpandableCardContentProps) {
  return <div className={cn("flex-1 min-h-0", className)}>{children}</div>;
}

// ─── Card Footer ────────────────────────────────────────────────────────────
interface ExpandableCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ExpandableCardFooter({
  children,
  className,
}: ExpandableCardFooterProps) {
  return (
    <div
      className={cn(
        "mt-3 shrink-0 border-t border-white/[0.06] pt-3",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Expandable Content — animates in/out based on expanded state ───────────
interface ExpandableContentProps {
  children: React.ReactNode;
  preset?: ContentPreset;
  className?: string;
  stagger?: boolean;
  staggerChildren?: number;
  keepMounted?: boolean;
  animateIn?: {
    initial?: TargetAndTransition;
    animate?: TargetAndTransition;
    transition?: Transition;
  };
}

export function ExpandableContent({
  children,
  preset = "fade",
  className,
  stagger = false,
  staggerChildren = 0.1,
  keepMounted = false,
  animateIn,
}: ExpandableContentProps) {
  const { isExpanded } = useExpandable();

  const variants = animateIn
    ? {
        initial: animateIn.initial || presetVariants[preset].initial,
        animate: animateIn.animate || presetVariants[preset].animate,
        exit: presetVariants[preset].exit,
      }
    : presetVariants[preset];

  const transition: Transition = animateIn?.transition || {
    type: "spring",
    stiffness: 180,
    damping: 24,
    mass: 1,
    ...(stagger && {
      staggerChildren,
    }),
  };

  if (keepMounted) {
    return (
      <motion.div
        className={className}
        initial={false}
        animate={isExpanded ? variants.animate : variants.initial}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isExpanded && (
        <motion.div
          className={className}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
