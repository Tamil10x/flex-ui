"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
  showNav?: boolean;
}

export function BrowserFrame({
  children,
  className,
  url = "https://flexui.dev",
  showNav = true,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/90 backdrop-blur-xl",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-zinc-900/50 px-4 py-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>

        {/* Navigation buttons */}
        {showNav && (
          <div className="flex items-center gap-1 text-zinc-500">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              aria-label="Back"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              aria-label="Forward"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              aria-label="Refresh"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
            </button>
          </div>
        )}

        {/* URL bar */}
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-zinc-600"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate text-xs text-zinc-500">{url}</span>
        </div>
      </div>

      {/* Content area */}
      <div className="relative">{children}</div>
    </div>
  );
}
