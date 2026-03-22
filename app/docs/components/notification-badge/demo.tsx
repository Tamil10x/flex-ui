"use client";

import React, { useState } from "react";
import { NotificationBadge } from "@/components/flexui/notification-badge";

export function ComponentDemo() {
  const [count, setCount] = useState(5);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex items-center gap-8">
        {/* Bell icon with badge */}
        <div className="relative inline-flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-300">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={count} />
          </span>
        </div>

        {/* Inbox icon with badge */}
        <div className="relative inline-flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-300">
            <path d="M22 12h-6l-2 3h-4l-2-3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={142} maxCount={99} color="bg-purple-500" />
          </span>
        </div>

        {/* Zero count (hidden) */}
        <div className="relative inline-flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-300">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={0} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          Decrease
        </button>
        <span className="text-sm text-zinc-500">Count: {count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          Increase
        </button>
      </div>
    </div>
  );
}
