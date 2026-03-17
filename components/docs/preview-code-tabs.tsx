"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code2, RotateCcw, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";

interface PreviewCodeTabsProps {
  preview: React.ReactNode;
  code: string;
  filename?: string;
  className?: string;
}

export function PreviewCodeTabs({
  preview,
  code,
  filename = "component.tsx",
  className,
}: PreviewCodeTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group relative", className)}
    >
      {/* Gradient border glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: hovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(120,119,198,0.12), rgba(56,189,248,0.06), transparent 50%)`
            : undefined,
        }}
      />

      <div className="relative rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-[0_8px_60px_-12px_rgba(120,119,198,0.1)]">
        {/* Tab bar — glass header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-2">
          <div className="relative flex">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200",
                  tab === t ? "text-white" : "text-zinc-500 hover:text-zinc-300"
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
                    layoutId="active-tab-indicator"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0.5">
            {tab === "preview" && (
              <button
                onClick={() => setKey((k) => k + 1)}
                className="rounded-lg p-2 text-zinc-600 transition-all duration-200 hover:bg-white/[0.04] hover:text-zinc-300"
                aria-label="Reset preview"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            {tab === "code" && <CopyButton text={code} />}
          </div>
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          {tab === "preview" ? (
            <motion.div
              key={`preview-${key}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex min-h-[300px] items-center justify-center overflow-visible p-10"
            >
              {/* Dot grid */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[80px]" />
              <div className="relative z-10">{preview}</div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden rounded-b-2xl"
            >
              {/* Code file header */}
              <div className="flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.01] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-xs font-medium text-zinc-600">
                  {filename}
                </span>
              </div>

              {/* Syntax highlighted code */}
              <div className="max-h-[500px] overflow-auto p-4">
                <SyntaxHighlight code={code} showLineNumbers />
              </div>

              {/* Bottom fade */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
