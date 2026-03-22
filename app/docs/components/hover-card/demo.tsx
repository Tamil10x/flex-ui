"use client";

import React from "react";
import { HoverCard } from "@/components/flexui/hover-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Star } from "lucide-react";

const code = `import { HoverCard } from "@/components/flexui/hover-card";
import { Star } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex items-center gap-6">
      <HoverCard className="w-72">
        <h3 className="text-lg font-semibold text-white">Hover me</h3>
        <p className="mt-2 text-sm text-zinc-400">
          This card lifts up and scales slightly on hover
          with a smooth spring animation.
        </p>
      </HoverCard>
      <HoverCard className="w-72">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
          <Star className="h-5 w-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Featured</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Combine with icons and rich content.
        </p>
      </HoverCard>
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center gap-6">
          <HoverCard className="w-72">
            <h3 className="text-lg font-semibold text-white">Hover me</h3>
            <p className="mt-2 text-sm text-zinc-400">
              This card lifts up and scales slightly on hover with a smooth spring
              animation. Great for interactive cards and feature highlights.
            </p>
          </HoverCard>
          <HoverCard className="w-72">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Star className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Featured</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Combine with icons and rich content for engaging feature cards.
            </p>
          </HoverCard>
        </div>
      }
      code={code}
      filename="hover-card-demo.tsx"
    />
  );
}
