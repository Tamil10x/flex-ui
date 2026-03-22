"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  /** Tab bar style variant */
  variant?: "underline" | "pill" | "bordered";
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  className,
  variant = "underline",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab bar */}
      <div
        role="tablist"
        className={cn(
          "relative flex",
          variant === "underline" && "border-b border-white/[0.08] gap-1",
          variant === "pill" && "rounded-xl bg-zinc-900/80 p-1 gap-0",
          variant === "bordered" && "gap-1"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative z-10 px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                variant === "underline" &&
                  (isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"),
                variant === "pill" &&
                  (isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"),
                variant === "bordered" &&
                  (isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200")
              )}
            >
              {tab.label}

              {/* Underline indicator */}
              {variant === "underline" && isActive && (
                <motion.div
                  layoutId="animated-tabs-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Pill indicator */}
              {variant === "pill" && isActive && (
                <motion.div
                  layoutId="animated-tabs-pill"
                  className="absolute inset-0 rounded-lg bg-white/[0.1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Bordered indicator */}
              {variant === "bordered" && isActive && (
                <motion.div
                  layoutId="animated-tabs-bordered"
                  className="absolute inset-0 rounded-lg border border-white/[0.15] bg-white/[0.05]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
        className="relative mt-4 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
