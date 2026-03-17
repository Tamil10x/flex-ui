"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallTabsProps {
  cli: React.ReactNode;
  manual: React.ReactNode;
  className?: string;
}

export function InstallTabs({ cli, manual, className }: InstallTabsProps) {
  const [tab, setTab] = useState<"cli" | "manual">("cli");

  return (
    <div className={cn("space-y-4", className)}>
      {/* Pill toggle */}
      <div className="inline-flex rounded-xl border border-white/[0.08] bg-zinc-900/50 p-1 backdrop-blur-sm">
        {(["cli", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
              tab === t ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab === t && (
              <motion.div
                layoutId="install-tab-bg"
                className="absolute inset-0 rounded-lg bg-white/[0.08]"
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {t === "cli" ? (
                <Terminal className="h-3.5 w-3.5" />
              ) : (
                <FileCode className="h-3.5 w-3.5" />
              )}
              {t === "cli" ? "CLI" : "Manual"}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {tab === "cli" ? cli : manual}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
