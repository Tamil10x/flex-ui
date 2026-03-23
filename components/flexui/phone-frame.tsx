"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  showStatusBar?: boolean;
}

export function PhoneFrame({
  children,
  className,
  showStatusBar = true,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[280px] overflow-hidden rounded-[2.5rem] border-[3px] border-zinc-700 bg-zinc-950 shadow-2xl shadow-black/50",
        className
      )}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-2.5 z-20 -translate-x-1/2">
        <div className="h-[22px] w-[90px] rounded-full bg-black" />
      </div>

      {/* Status bar */}
      {showStatusBar && (
        <div className="relative z-10 flex items-center justify-between px-6 pb-1 pt-4">
          {/* Time */}
          <span className="text-xs font-semibold text-white">9:41</span>

          {/* Right icons: signal, wifi, battery */}
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              className="text-white"
            >
              <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
              <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="currentColor" opacity="0.3" />
            </svg>

            {/* WiFi */}
            <svg
              width="14"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" fill="currentColor" />
            </svg>

            {/* Battery */}
            <svg
              width="22"
              height="11"
              viewBox="0 0 27 13"
              fill="none"
              className="text-white"
            >
              <rect
                x="0.5"
                y="0.5"
                width="22"
                height="12"
                rx="3"
                stroke="currentColor"
                strokeWidth="1"
              />
              <rect
                x="2"
                y="2"
                width="17"
                height="9"
                rx="1.5"
                fill="currentColor"
              />
              <rect
                x="23.5"
                y="4"
                width="2.5"
                height="5"
                rx="1"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="relative h-full overflow-hidden">{children}</div>

      {/* Home indicator bar */}
      <div className="absolute bottom-2 left-1/2 z-20 h-1 w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
    </div>
  );
}
