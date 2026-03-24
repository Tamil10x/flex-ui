"use client";

import React from "react";
import { Avatar } from "@/components/flexui/avatar";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const avatarImages = [
  { name: "Sarah Chen", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Marcus Johnson", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Aisha Patel", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "David Kim", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Elena Rodriguez", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&q=80" },
];

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-10 p-8">
          {/* Sizes with images */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Sizes
            </p>
            <div className="flex items-end gap-5">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <Avatar
                    name={avatarImages[i % avatarImages.length].name}
                    src={avatarImages[i % avatarImages.length].src}
                    size={s}
                  />
                  <span className="text-[10px] text-zinc-600">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* With status */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Status indicators
            </p>
            <div className="flex items-center gap-5">
              <Avatar name="Sarah Chen" src={avatarImages[0].src} size="lg" status="online" />
              <Avatar name="Marcus Johnson" src={avatarImages[1].src} size="lg" status="away" />
              <Avatar name="Aisha Patel" src={avatarImages[2].src} size="lg" status="busy" />
              <Avatar name="David Kim" src={avatarImages[3].src} size="lg" status="offline" />
            </div>
          </div>

          {/* Initials fallback */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Initials fallback
            </p>
            <div className="flex items-center gap-3">
              <Avatar name="Design Team" size="md" />
              <Avatar name="Engineering" size="md" />
              <Avatar name="Marketing" size="md" />
              <Avatar name="Product" size="md" />
              <Avatar name="Analytics" size="md" />
            </div>
          </div>
        </div>
      }
      code={`import { Avatar } from "@/components/flexui/avatar";

export function Demo() {
  return (
    <>
      {/* With images — all sizes */}
      <Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="xs" />
      <Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="sm" />
      <Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="md" />
      <Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="lg" />
      <Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="xl" />

      {/* With status indicators */}
      <Avatar name="Sarah" src="/avatars/sarah.jpg" size="lg" status="online" />
      <Avatar name="Marcus" src="/avatars/marcus.jpg" size="lg" status="away" />
      <Avatar name="Aisha" src="/avatars/aisha.jpg" size="lg" status="busy" />
      <Avatar name="David" src="/avatars/david.jpg" size="lg" status="offline" />

      {/* Initials fallback (no src) */}
      <Avatar name="Design Team" size="md" />
      <Avatar name="Engineering" size="md" />
    </>
  );
}`}
      filename="avatar-demo.tsx"
    />
  );
}
