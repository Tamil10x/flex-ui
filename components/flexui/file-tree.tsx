"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FileTreeItem {
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
}

interface FileTreeProps {
  items: FileTreeItem[];
  className?: string;
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-zinc-500">
      <path d="M4 1h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-cyan-400">
      {open ? (
        <path d="M2 4h4l1.5-2H14a1 1 0 011 1v9a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
      ) : (
        <path d="M2 3h4l1.5 2H14a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
      )}
    </svg>
  );
}

function Node({ item, depth }: { item: FileTreeItem; depth: number }) {
  const [open, setOpen] = useState(false);
  const isFolder = item.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-white/[0.06]",
          isFolder ? "text-zinc-200 cursor-pointer" : "text-zinc-400 cursor-default"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isFolder ? <FolderIcon open={open} /> : <FileIcon />}
        {item.name}
      </button>
      <AnimatePresence initial={false}>
        {isFolder && open && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <Node key={child.name} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FileTree({ items, className }: FileTreeProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-zinc-950/80 p-3 backdrop-blur-xl",
        className
      )}
    >
      {items.map((item) => (
        <Node key={item.name} item={item} depth={0} />
      ))}
    </div>
  );
}
