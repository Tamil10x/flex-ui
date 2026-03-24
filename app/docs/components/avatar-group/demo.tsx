"use client";

import React from "react";
import { AvatarGroup } from "@/components/flexui/avatar-group";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const teamMembers = [
  { name: "Sarah Chen", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Marcus Johnson", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Aisha Patel", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "David Kim", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Elena Rodriguez", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "James Wright", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Priya Sharma", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80" },
];

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-10 p-8">
          {/* Sizes */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Sizes
            </p>
            <div className="flex flex-col items-center gap-6">
              {(["sm", "md", "lg"] as const).map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <AvatarGroup avatars={teamMembers} max={5} size={s} />
                  <span className="text-[10px] text-zinc-600">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Hover +N to expand
            </p>
            <AvatarGroup avatars={teamMembers} max={3} size="lg" expandable />
          </div>
        </div>
      }
      code={`import { AvatarGroup } from "@/components/flexui/avatar-group";

const teamMembers = [
  { name: "Sarah Chen", src: "/avatars/sarah.jpg" },
  { name: "Marcus Johnson", src: "/avatars/marcus.jpg" },
  { name: "Aisha Patel", src: "/avatars/aisha.jpg" },
  { name: "David Kim", src: "/avatars/david.jpg" },
  { name: "Elena Rodriguez", src: "/avatars/elena.jpg" },
  { name: "James Wright", src: "/avatars/james.jpg" },
  { name: "Priya Sharma", src: "/avatars/priya.jpg" },
];

export function Demo() {
  return (
    <>
      <AvatarGroup avatars={teamMembers} max={5} size="sm" />
      <AvatarGroup avatars={teamMembers} max={5} size="md" />
      <AvatarGroup avatars={teamMembers} max={5} size="lg" />

      {/* Expandable — hover +N to reveal all */}
      <AvatarGroup avatars={teamMembers} max={3} size="lg" expandable />
    </>
  );
}`}
      filename="avatar-group-demo.tsx"
    />
  );
}
