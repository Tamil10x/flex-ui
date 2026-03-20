"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";

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

// ─── Single example — full-width, no constraining container ─────────────────
function ShowcaseExample({
  item,
  index,
}: {
  item: ShowcaseItemProps;
  index: number;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="space-y-4"
    >
      {/* Title row */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono font-bold text-zinc-600">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-base font-semibold text-white">{item.title}</h3>
        {item.tag && (
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              item.tagColor ||
                "bg-blue-500/10 text-blue-400 border-blue-500/20"
            )}
          >
            {item.tag}
          </span>
        )}
      </div>

      {item.description && (
        <p className="text-sm text-zinc-500 -mt-2">{item.description}</p>
      )}

      {/* Preview — component rendered directly, no box constraint */}
      <div className="relative rounded-xl border border-white/[0.06] bg-zinc-950/50 p-6 overflow-visible">
        {item.preview}
      </div>

      {/* Code toggle */}
      <button
        onClick={() => setShowCode((v) => !v)}
        className="flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <Code2 className="h-3.5 w-3.5" />
        {showCode ? "Hide Code" : "View Code"}
        <motion.div
          animate={{ rotate: showCode ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3 w-3" />
        </motion.div>
      </button>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-white/[0.06] bg-zinc-950/80">
              <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-xs font-medium text-zinc-600">
                    {item.filename || "example.tsx"}
                  </span>
                </div>
                <CopyButton text={item.code} />
              </div>
              <div className="relative max-h-[400px] overflow-auto p-4">
                <SyntaxHighlight code={item.code} showLineNumbers />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="h-px bg-white/[0.04]" />
    </motion.div>
  );
}

// ─── Grid — single column, each example at full width ───────────────────────
export function ShowcaseGrid({ items, className }: ShowcaseGridProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <ShowcaseExample key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
