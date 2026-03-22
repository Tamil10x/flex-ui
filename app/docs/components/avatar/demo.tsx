"use client";

import React from "react";
import { Avatar } from "@/components/flexui/avatar";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      {/* Sizes */}
      <div className="flex items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Alice Martin" size="sm" />
          <span className="text-xs text-zinc-500">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Bob Taylor" size="md" />
          <span className="text-xs text-zinc-500">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Clara Jones" size="lg" />
          <span className="text-xs text-zinc-500">lg</span>
        </div>
      </div>

      {/* Initials-only row */}
      <div className="flex items-center gap-3">
        <Avatar name="Design Team" size="md" />
        <Avatar name="Engineering" size="md" />
        <Avatar name="Marketing" size="md" />
        <Avatar name="Product" size="md" />
      </div>
    </div>
  );
}
