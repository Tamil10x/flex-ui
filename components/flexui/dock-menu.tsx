"use client";

import React, { useRef, Children, cloneElement, isValidElement } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface DockMenuProps {
  items: DockItem[];
  className?: string;
  /** Base icon size in px @default 48 */
  iconSize?: number;
  /** Max magnified size in px @default 72 */
  magnification?: number;
  /** Distance of magnification effect in px @default 150 */
  distance?: number;
}

/* ─── Single Dock Icon ───────────────────────────────────────────────────── */

function DockIcon({
  item,
  mouseX,
  iconSize,
  magnification,
  distance,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  iconSize: number;
  magnification: number;
  distance: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = React.useState(false);

  // Distance from mouse to icon center
  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return distance + 1;
    const rect = el.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  // Map distance → size: 0 distance = magnification, far = iconSize
  const sizeTransform = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [iconSize, magnification, iconSize]
  );

  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="absolute -top-10 whitespace-nowrap rounded-lg border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        aria-label={item.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={item.onClick}
        whileTap={{ scale: 0.85 }}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-white/[0.06] text-zinc-300 transition-colors hover:bg-white/[0.1]"
      >
        <div className="flex h-1/2 w-1/2 items-center justify-center">
          {item.icon}
        </div>
      </motion.button>
    </div>
  );
}

/* ─── Dock Menu ──────────────────────────────────────────────────────────── */

export function DockMenu({
  items,
  className,
  iconSize = 48,
  magnification = 72,
  distance = 150,
}: DockMenuProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      role="navigation"
      aria-label="Dock menu"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 backdrop-blur-xl",
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon
          key={item.label + i}
          item={item}
          mouseX={mouseX}
          iconSize={iconSize}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </motion.div>
  );
}
