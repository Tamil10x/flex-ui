"use client";

import React from "react";
import { Badge } from "@/components/flexui/badge";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Wifi, Rocket, Shield, Star, Zap, Check, Clock, AlertTriangle } from "lucide-react";

const examples = [
  {
    id: "badge-variants",
    title: "All Variants",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Seven built-in variants including purple and gradient styles.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="purple">Purple</Badge>
        <Badge variant="gradient">Gradient</Badge>
      </div>
    ),
    code: `<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="purple">Purple</Badge>
<Badge variant="gradient">Gradient</Badge>`,
    filename: "variants.tsx",
  },
  {
    id: "badge-pulse-glow",
    title: "Pulse + Glow",
    tag: "Effect",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Animated pulsing dot with optional glow shadow for live status indicators.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" pulse glow>Online</Badge>
        <Badge variant="warning" pulse glow>Syncing</Badge>
        <Badge variant="error" pulse glow>Live</Badge>
        <Badge variant="info" pulse glow>Streaming</Badge>
        <Badge variant="purple" pulse glow>Active</Badge>
      </div>
    ),
    code: `<Badge variant="success" pulse glow>Online</Badge>
<Badge variant="warning" pulse glow>Syncing</Badge>
<Badge variant="error" pulse glow>Live</Badge>
<Badge variant="info" pulse glow>Streaming</Badge>
<Badge variant="purple" pulse glow>Active</Badge>`,
    filename: "pulse-glow.tsx",
  },
  {
    id: "badge-with-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair badges with Lucide icons using the icon prop for richer labels.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" icon={<Check className="h-3 w-3" />}>Verified</Badge>
        <Badge variant="info" icon={<Rocket className="h-3 w-3" />}>Deployed</Badge>
        <Badge variant="warning" icon={<AlertTriangle className="h-3 w-3" />}>Review</Badge>
        <Badge variant="purple" icon={<Zap className="h-3 w-3" />} glow>Pro</Badge>
        <Badge variant="gradient" icon={<Star className="h-3 w-3" />} glow>Featured</Badge>
      </div>
    ),
    code: `import { Check, Rocket, AlertTriangle, Zap, Star } from "lucide-react";

<Badge variant="success" icon={<Check className="h-3 w-3" />}>Verified</Badge>
<Badge variant="info" icon={<Rocket className="h-3 w-3" />}>Deployed</Badge>
<Badge variant="warning" icon={<AlertTriangle className="h-3 w-3" />}>Review</Badge>
<Badge variant="purple" icon={<Zap className="h-3 w-3" />} glow>Pro</Badge>
<Badge variant="gradient" icon={<Star className="h-3 w-3" />} glow>Featured</Badge>`,
    filename: "with-icons.tsx",
  },
  {
    id: "badge-sizes",
    title: "All Sizes",
    tag: "Size",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Small, medium, and large badge sizes for different contexts.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="purple" size="sm" glow>Small</Badge>
        <Badge variant="purple" size="md" glow>Medium</Badge>
        <Badge variant="purple" size="lg" glow>Large</Badge>
      </div>
    ),
    code: `<Badge variant="purple" size="sm" glow>Small</Badge>
<Badge variant="purple" size="md" glow>Medium</Badge>
<Badge variant="purple" size="lg" glow>Large</Badge>`,
    filename: "sizes.tsx",
  },
  {
    id: "badge-composition",
    title: "Real-World Composition",
    tag: "Pattern",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description: "Combine badges with avatars and cards for real UI patterns.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <Wifi className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">API Server</p>
            <p className="text-[11px] text-zinc-500">us-east-1</p>
          </div>
          <Badge variant="success" pulse size="sm">Healthy</Badge>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Build Pipeline</p>
            <p className="text-[11px] text-zinc-500">main branch</p>
          </div>
          <Badge variant="warning" pulse size="sm">Building</Badge>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Shield className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Security Scan</p>
            <p className="text-[11px] text-zinc-500">v2.1.0</p>
          </div>
          <Badge variant="purple" icon={<Check className="h-3 w-3" />} size="sm">Passed</Badge>
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-3 rounded-xl border px-4 py-3">
  <WifiIcon />
  <div className="flex-1">
    <p className="text-sm font-medium">API Server</p>
    <p className="text-xs text-zinc-500">us-east-1</p>
  </div>
  <Badge variant="success" pulse size="sm">Healthy</Badge>
</div>`,
    filename: "composition.tsx",
  },
];

export function BadgeExamples() {
  return <ShowcaseGrid items={examples} />;
}
