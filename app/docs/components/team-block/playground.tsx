"use client";

import React from "react";
import { TeamBlock } from "@/components/flexui/team-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const members = [
  { name: "Sarah Chen", role: "CEO & Founder", social: [{ label: "Twitter", href: "#" }] },
  { name: "Marcus Rivera", role: "Lead Engineer", social: [{ label: "GitHub", href: "#" }] },
  { name: "Emma Watson", role: "Design Lead", social: [{ label: "Dribbble", href: "#" }] },
];

const code = `import { TeamBlock } from "@/components/flexui/team-block";

export function Demo() {
  return (
    <TeamBlock
      members={[
        { name: "Sarah Chen", role: "CEO & Founder" },
        { name: "Marcus Rivera", role: "Lead Engineer" },
        { name: "Emma Watson", role: "Design Lead" },
      ]}
    />
  );
}`;

export function TeamBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">A team grid with avatars, names, roles, and social links.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><TeamBlock members={members} /></div>}
        code={code}
        filename="team-block-demo.tsx"
      />
    </div>
  );
}
