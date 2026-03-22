"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CopyBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CopyBlock({ code, language, filename, className }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && <span className="text-xs text-zinc-400">{filename}</span>}
          {language && !filename && (
            <span className="text-xs text-zinc-500">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="relative rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-emerald-400"
              >
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm leading-relaxed text-zinc-300">{code}</code>
      </pre>
    </div>
  );
}
