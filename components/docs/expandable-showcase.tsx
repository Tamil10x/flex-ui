"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";

// ─── Spring config ──────────────────────────────────────────────────────────
const spring = { type: "spring" as const, stiffness: 260, damping: 25, mass: 0.8 };

// ─── Tag color palette ──────────────────────────────────────────────────────
const tagGradients: Record<string, { border: string; glow: string; accent: string }> = {
  Base: { border: "border-zinc-500/20", glow: "rgba(161,161,170,0.08)", accent: "from-zinc-500 to-zinc-400" },
  Props: { border: "border-purple-500/20", glow: "rgba(168,85,247,0.1)", accent: "from-purple-500 to-violet-400" },
  Style: { border: "border-blue-500/20", glow: "rgba(59,130,246,0.1)", accent: "from-blue-500 to-sky-400" },
  Compose: { border: "border-amber-500/20", glow: "rgba(245,158,11,0.1)", accent: "from-amber-500 to-orange-400" },
  Layout: { border: "border-cyan-500/20", glow: "rgba(6,182,212,0.1)", accent: "from-cyan-500 to-teal-400" },
  State: { border: "border-red-500/20", glow: "rgba(239,68,68,0.1)", accent: "from-red-500 to-rose-400" },
};

const defaultGradient = { border: "border-blue-500/20", glow: "rgba(79,143,255,0.1)", accent: "from-blue-500 to-cyan-400" };

// ─── Types ──────────────────────────────────────────────────────────────────
interface ShowcaseItemProps {
  id: string;
  title: string;
  tag?: string;
  tagColor?: string;
  preview: React.ReactNode;
  code: string;
  filename?: string;
  description?: string;
  className?: string;
  span?: "1" | "2";
}

interface ShowcaseGridProps {
  items: ShowcaseItemProps[];
  className?: string;
}

// ─── Card with Preview/Code tabs ────────────────────────────────────────────
function ShowcaseCard({
  item,
  index,
}: {
  item: ShowcaseItemProps;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const tagStyle = tagGradients[item.tag || ""] || defaultGradient;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: index * 0.08 }}
      className={cn(
        "group/card relative",
        item.span === "2" && "sm:col-span-2"
      )}
    >
      {/* Mouse-tracking outer glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: hovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${tagStyle.glow}, transparent 60%)`
            : undefined,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl transition-all duration-500 group-hover/card:border-white/[0.14] group-hover/card:shadow-2xl">
        {/* Top accent line */}
        <div className={cn("h-[2px] bg-gradient-to-r", tagStyle.accent)} />

        {/* Header with title + tag */}
        <div className="border-b border-white/[0.06] px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="pointer-events-none text-[10px] font-mono font-bold text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              {item.tag && (
                <span
                  className={cn(
                    "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    item.tagColor || "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}
                >
                  {item.tag}
                </span>
              )}
            </div>
          </div>
          {item.description && (
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              {item.description}
            </p>
          )}
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-2">
          <div className="relative flex">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium transition-colors duration-200",
                  tab === t ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {t === "preview" ? (
                  <Eye className="h-3 w-3" />
                ) : (
                  <Code2 className="h-3 w-3" />
                )}
                {t === "preview" ? "Preview" : "Code"}
                {tab === t && (
                  <motion.div
                    layoutId={`tab-indicator-${item.id}`}
                    className={cn("absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r", tagStyle.accent)}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>
          {tab === "code" && <CopyButton text={item.code} />}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative flex min-h-[200px] items-center justify-center overflow-hidden p-6"
            >
              {/* Grid bg */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[60px] transition-all duration-700 group-hover/card:h-48 group-hover/card:w-48 group-hover/card:bg-blue-500/[0.06]" />
              <div className="relative z-10 transform-gpu transition-transform duration-700 group-hover/card:scale-[1.03]">
                {item.preview}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.01] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-xs font-medium text-zinc-600">
                  {item.filename || "component.tsx"}
                </span>
              </div>
              <div className="relative max-h-[300px] overflow-auto p-4">
                <SyntaxHighlight code={item.code} showLineNumbers />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Grid ───────────────────────────────────────────────────────────────────
export function ShowcaseGrid({ items, className }: ShowcaseGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-1 sm:grid-cols-2",
        className
      )}
    >
      {items.map((item, index) => (
        <ShowcaseCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
