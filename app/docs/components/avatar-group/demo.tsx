"use client";

import React from "react";
import { AvatarGroup } from "@/components/flexui/avatar-group";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const teamMembers = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
  { name: "James Wright" },
  { name: "Priya Sharma" },
];

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Small</span>
            <AvatarGroup avatars={teamMembers} max={4} size="sm" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Medium</span>
            <AvatarGroup avatars={teamMembers} max={5} size="md" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Large</span>
            <AvatarGroup avatars={teamMembers} max={3} size="lg" />
          </div>
        </div>
      }
      code={`import { AvatarGroup } from "@/components/flexui/avatar-group";

const teamMembers = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
  { name: "James Wright" },
  { name: "Priya Sharma" },
];

export function Demo() {
  return (
    <>
      <AvatarGroup avatars={teamMembers} max={4} size="sm" />
      <AvatarGroup avatars={teamMembers} max={5} size="md" />
      <AvatarGroup avatars={teamMembers} max={3} size="lg" />
    </>
  );
}`}
      filename="avatar-group-demo.tsx"
    />
  );
}
