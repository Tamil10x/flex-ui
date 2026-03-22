"use client";

import React from "react";
import { EmptyState } from "@/components/flexui/empty-state";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <EmptyState
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        }
        title="No files uploaded"
        description="Drag and drop files here, or click the button below to browse your local files."
        action={{ label: "Upload Files", onClick: () => {} }}
        className="w-full max-w-md"
      />
    </div>
  );
}
