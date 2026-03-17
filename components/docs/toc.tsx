"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
  depth?: number;
}

interface TocProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TocProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-24 hidden w-48 shrink-0 xl:block">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        On This Page
      </h4>
      <ul className="space-y-1 border-l border-white/[0.06]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1 text-sm transition-colors",
                item.depth === 2 ? "pl-4" : "pl-7",
                activeId === item.id
                  ? "border-purple-400 text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
