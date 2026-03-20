"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Scan the page for h2/h3 elements with IDs
  useEffect(() => {
    const elements = document.querySelectorAll("h2[id], h3[id]");
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20 hidden xl:block w-48 shrink-0 self-start">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-white/[0.06]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-2 py-1 text-xs transition-all duration-150",
                h.level === 3 ? "pl-6" : "pl-3",
                activeId === h.id
                  ? "border-blue-400 text-white font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
