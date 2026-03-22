"use client";

import React from "react";
import { Badge } from "@/components/flexui/badge";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Wifi, Rocket, Shield, Star } from "lucide-react";

const examples = [
  {
    id: "badge-default",
    title: "All Variants",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Five built-in color variants: default, success, warning, error, and info.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    ),
    code: `<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
    filename: "default.tsx",
  },
  {
    id: "badge-pulse",
    title: "Pulse Indicators",
    tag: "State",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Animated pulsing dot for live status indicators like online, syncing, or recording.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" pulse>Online</Badge>
        <Badge variant="warning" pulse>Syncing</Badge>
        <Badge variant="error" pulse>Live</Badge>
        <Badge variant="info" pulse>Streaming</Badge>
      </div>
    ),
    code: `<Badge variant="success" pulse>Online</Badge>
<Badge variant="warning" pulse>Syncing</Badge>
<Badge variant="error" pulse>Live</Badge>
<Badge variant="info" pulse>Streaming</Badge>`,
    filename: "pulse.tsx",
  },
  {
    id: "badge-with-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair badges with Lucide icons for richer status or category labels.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success">
          <Wifi className="h-3 w-3" /> Connected
        </Badge>
        <Badge variant="info">
          <Rocket className="h-3 w-3" /> Deployed
        </Badge>
        <Badge variant="warning">
          <Shield className="h-3 w-3" /> Review
        </Badge>
        <Badge variant="default">
          <Star className="h-3 w-3" /> Featured
        </Badge>
      </div>
    ),
    code: `import { Wifi, Rocket, Shield, Star } from "lucide-react";

<Badge variant="success">
  <Wifi className="h-3 w-3" /> Connected
</Badge>
<Badge variant="info">
  <Rocket className="h-3 w-3" /> Deployed
</Badge>
<Badge variant="warning">
  <Shield className="h-3 w-3" /> Review
</Badge>
<Badge variant="default">
  <Star className="h-3 w-3" /> Featured
</Badge>`,
    filename: "with-icons.tsx",
  },
  {
    id: "badge-custom",
    title: "Custom Styled",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Override styles with className for custom sizing, rounding, and colors.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="info" className="rounded-md px-3 py-1 text-sm">v2.0 Beta</Badge>
        <Badge variant="success" className="rounded-md px-3 py-1 text-sm" pulse>Production</Badge>
        <Badge variant="error" className="rounded-none px-3 py-1 text-sm">Deprecated</Badge>
      </div>
    ),
    code: `<Badge variant="info" className="rounded-md px-3 py-1 text-sm">
  v2.0 Beta
</Badge>
<Badge variant="success" className="rounded-md px-3 py-1 text-sm" pulse>
  Production
</Badge>
<Badge variant="error" className="rounded-none px-3 py-1 text-sm">
  Deprecated
</Badge>`,
    filename: "custom.tsx",
  },
];

export function BadgeExamples() {
  return <ShowcaseGrid items={examples} />;
}
