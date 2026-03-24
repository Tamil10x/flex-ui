"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  ring?: boolean;
  ringColor?: string;
  className?: string;
}

/* ── Constants ────────────────────────────────────────────────────────────── */

const sizeMap = {
  xs: { box: "h-7 w-7", text: "text-[10px]", status: "h-2 w-2 ring-[1.5px]", ring: "ring-[1.5px]" },
  sm: { box: "h-9 w-9", text: "text-xs", status: "h-2.5 w-2.5 ring-[1.5px]", ring: "ring-2" },
  md: { box: "h-11 w-11", text: "text-sm", status: "h-3 w-3 ring-2", ring: "ring-2" },
  lg: { box: "h-14 w-14", text: "text-base", status: "h-3.5 w-3.5 ring-2", ring: "ring-2" },
  xl: { box: "h-20 w-20", text: "text-lg", status: "h-4 w-4 ring-[3px]", ring: "ring-[3px]" },
};

const statusColors = {
  online: "bg-emerald-400",
  offline: "bg-zinc-500",
  away: "bg-amber-400",
  busy: "bg-red-400",
};

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 55%, 38%), hsl(${(hue + 45) % 360}, 65%, 48%))`;
}

/* ── Component ────────────────────────────────────────────────────────────── */

export function Avatar({
  src,
  name,
  size = "md",
  status,
  ring = false,
  ringColor,
  className,
}: AvatarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const s = sizeMap[size];

  // 3D tilt on hover
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative inline-flex shrink-0 cursor-pointer perspective-[400px]",
        className
      )}
    >
      {/* Glow behind on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
        style={{ background: src ? "rgba(167,139,250,0.3)" : hashColor(name) }}
      />

      {/* Avatar circle */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden rounded-full border border-white/[0.08] font-semibold text-white shadow-lg shadow-black/20",
          s.box,
          s.text,
          ring && s.ring,
          ring && "ring-offset-1 ring-offset-zinc-950"
        )}
        style={{
          background: src ? undefined : hashColor(name),
          ...(ring ? { ringColor: ringColor || "rgba(167,139,250,0.5)" } : {}),
          ...(ring ? { boxShadow: `0 0 0 2px var(--tw-ring-offset-color, #09090b), 0 0 0 4px ${ringColor || "rgba(167,139,250,0.4)"}` } : {}),
        }}
      >
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              draggable={false}
            />
            {/* Sheen overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <span className="relative select-none drop-shadow-sm">{getInitials(name)}</span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-zinc-950",
            s.status,
            statusColors[status]
          )}
        >
          {(status === "online" || status === "busy") && (
            <span
              className={cn(
                "absolute inset-0 animate-ping rounded-full opacity-40",
                statusColors[status]
              )}
            />
          )}
        </motion.span>
      )}
    </motion.div>
  );
}
