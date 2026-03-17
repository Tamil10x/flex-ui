"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Code2, Sparkles, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";

// ─── Spring config ──────────────────────────────────────────────────────────
const spring = { type: "spring" as const, stiffness: 260, damping: 25, mass: 0.8 };

// ─── Tag color palette for visual variety ───────────────────────────────────
const tagGradients: Record<string, { border: string; glow: string; accent: string }> = {
  Base: { border: "border-zinc-500/20", glow: "rgba(161,161,170,0.08)", accent: "from-zinc-500 to-zinc-400" },
  Props: { border: "border-purple-500/20", glow: "rgba(168,85,247,0.1)", accent: "from-purple-500 to-violet-400" },
  Style: { border: "border-blue-500/20", glow: "rgba(59,130,246,0.1)", accent: "from-blue-500 to-sky-400" },
  Compose: { border: "border-amber-500/20", glow: "rgba(245,158,11,0.1)", accent: "from-amber-500 to-orange-400" },
  Layout: { border: "border-cyan-500/20", glow: "rgba(6,182,212,0.1)", accent: "from-cyan-500 to-teal-400" },
  State: { border: "border-red-500/20", glow: "rgba(239,68,68,0.1)", accent: "from-red-500 to-rose-400" },
};

const defaultGradient = { border: "border-blue-500/20", glow: "rgba(79,143,255,0.1)", accent: "from-blue-500 to-cyan-400" };

// ─── Single showcase item ───────────────────────────────────────────────────
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

// ─── Collapsed card ─────────────────────────────────────────────────────────
function CollapsedCard({
  item,
  onClick,
  index,
}: {
  item: ShowcaseItemProps;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const tagStyle = tagGradients[item.tag || ""] || defaultGradient;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${item.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: index * 0.08 }}
      className={cn(
        "group/card relative cursor-pointer",
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

        {/* Preview area */}
        <motion.div layoutId={`preview-area-${item.id}`} transition={spring}>
          <div className="relative flex h-48 items-center justify-center overflow-hidden p-6">
            {/* Subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Corner number label */}
            <div className="pointer-events-none absolute left-4 top-3 text-[10px] font-mono font-bold text-zinc-700">
              {String(index + 1).padStart(2, "0")}
            </div>
            {/* Center ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[60px] transition-all duration-700 group-hover/card:h-48 group-hover/card:w-48 group-hover/card:bg-blue-500/[0.06]" />
            <div
              className="relative z-10 transform-gpu transition-transform duration-700 group-hover/card:scale-[1.03]"
              onClick={(e) => e.stopPropagation()}
            >
              {item.preview}
            </div>
          </div>
        </motion.div>

        {/* Info bar */}
        <div className="border-t border-white/[0.06] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.h3
                layoutId={`title-${item.id}`}
                transition={spring}
                className="text-sm font-bold text-white"
              >
                {item.title}
              </motion.h3>
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
            {/* Interactive hint */}
            <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1 text-zinc-600 transition-all duration-300 group-hover/card:bg-white/[0.08] group-hover/card:text-zinc-300">
              <Play className="h-2.5 w-2.5" />
              <span className="text-[10px] font-semibold">Expand</span>
            </div>
          </div>
          {item.description && (
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 line-clamp-1">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Expanded overlay ───────────────────────────────────────────────────────
function ExpandedOverlay({
  item,
  onClose,
}: {
  item: ShowcaseItemProps;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const overlayRef = useRef<HTMLDivElement>(null);
  const tagStyle = tagGradients[item.tag || ""] || defaultGradient;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Expanded card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          ref={overlayRef}
          layoutId={`card-${item.id}`}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/[0.1] bg-zinc-950/95 shadow-[0_0_80px_-12px_rgba(79,143,255,0.2)] backdrop-blur-2xl"
          transition={spring}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent */}
          <div className={cn("h-[2px] bg-gradient-to-r", tagStyle.accent)} />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
            className="absolute right-4 top-4 z-30 rounded-xl border border-white/[0.08] bg-zinc-900/80 p-2 text-zinc-400 backdrop-blur-sm transition-all hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </motion.button>

          {/* Header */}
          <div className="border-b border-white/[0.06] px-6 py-4">
            <div className="flex items-center gap-3">
              <motion.h3
                layoutId={`title-${item.id}`}
                transition={spring}
                className="text-lg font-bold text-white"
              >
                {item.title}
              </motion.h3>
              {item.tag && (
                <span
                  className={cn(
                    "rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    item.tagColor || "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}
                >
                  {item.tag}
                </span>
              )}
            </div>
            {item.description && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-1 text-sm text-zinc-500"
              >
                {item.description}
              </motion.p>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-3">
            <div className="relative flex">
              {(["preview", "code"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                    tab === t
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {t === "preview" ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <Code2 className="h-3.5 w-3.5" />
                  )}
                  {t === "preview" ? "Preview" : "Code"}
                  {tab === t && (
                    <motion.div
                      layoutId={`expanded-tab-${item.id}`}
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r",
                        tagStyle.accent
                      )}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
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
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  layoutId={`preview-area-${item.id}`}
                  transition={spring}
                >
                  <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden p-10">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-[80px]" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="relative z-10"
                    >
                      {item.preview}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
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
                <div className="max-h-[400px] overflow-auto p-4">
                  <SyntaxHighlight code={item.code} showLineNumbers />
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

// ─── Grid container ─────────────────────────────────────────────────────────
export function ShowcaseGrid({ items, className }: ShowcaseGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedItem = items.find((i) => i.id === expandedId) || null;

  const handleClose = useCallback(() => setExpandedId(null), []);

  return (
    <>
      <div
        className={cn(
          "grid gap-4 grid-cols-1 sm:grid-cols-2",
          className
        )}
      >
        {items.map((item, index) => (
          <CollapsedCard
            key={item.id}
            item={item}
            index={index}
            onClick={() => setExpandedId(item.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {expandedItem && (
          <ExpandedOverlay
            key={expandedItem.id}
            item={expandedItem}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
