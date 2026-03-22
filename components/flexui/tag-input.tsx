"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  tags,
  onAdd,
  onRemove,
  placeholder = "Add tag…",
  className,
}: TagInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value.trim()) {
        e.preventDefault();
        if (!tags.includes(value.trim())) onAdd(value.trim());
        setValue("");
      } else if (e.key === "Backspace" && !value && tags.length > 0) {
        onRemove(tags[tags.length - 1]);
      }
    },
    [value, tags, onAdd, onRemove]
  );

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-zinc-950/80 px-3 py-2 backdrop-blur-xl focus-within:border-white/20",
        className
      )}
    >
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1 rounded-md bg-white/[0.08] px-2 py-0.5 text-xs text-zinc-300"
          >
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(tag); }}
              aria-label={`Remove ${tag}`}
              className="ml-0.5 text-zinc-500 hover:text-white"
            >
              &times;
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        aria-label="Add tag"
        className="min-w-[80px] flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      />
    </div>
  );
}
