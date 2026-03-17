"use client";

import React, { useRef, useState } from "react";
import { CopyButton } from "./copy-button";
import { SyntaxHighlight } from "./syntax-highlight";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  filename,
  className,
  showLineNumbers,
}: CodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isMultiLine = code.includes("\n");
  const shouldShowLines = showLineNumbers ?? isMultiLine;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("group relative", className)}
    >
      {/* Animated gradient border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: hovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(120,119,198,0.15), rgba(56,189,248,0.08), transparent 60%)`
            : undefined,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 group-hover:border-white/[0.12] group-hover:shadow-[0_0_40px_-12px_rgba(120,119,198,0.15)]">
        {/* Header bar */}
        {(filename || language) && (
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-zinc-800 transition-colors group-hover:bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-zinc-800 transition-colors group-hover:bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-zinc-800 transition-colors group-hover:bg-[#28c840]" />
              </div>
              {filename && (
                <span className="text-xs font-medium text-zinc-500">
                  {filename}
                </span>
              )}
            </div>
            <CopyButton text={code} />
          </div>
        )}

        {/* Code content */}
        <div className="relative">
          {!filename && !language && (
            <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <CopyButton text={code} />
            </div>
          )}
          <div className="p-4">
            <SyntaxHighlight code={code} showLineNumbers={shouldShowLines} />
          </div>
        </div>
      </div>
    </div>
  );
}
