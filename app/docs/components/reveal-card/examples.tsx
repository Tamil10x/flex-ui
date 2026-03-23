"use client";

import React from "react";
import { RevealCard } from "@/components/flexui/reveal-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Zap, Shield, Globe, Cpu } from "lucide-react";

const examples = [
  {
    id: "rc-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Hover the card to reveal its hidden content with a spring-powered slide.",
    preview: (
      <RevealCard title="Performance" className="w-64 h-40">
        Built for speed with zero-config optimizations and edge-first architecture.
      </RevealCard>
    ),
    code: `<RevealCard title="Performance" className="w-64 h-40">
  Built for speed with zero-config optimizations
  and edge-first architecture.
</RevealCard>`,
    filename: "default.tsx",
  },
  {
    id: "rc-grid",
    title: "Feature Grid",
    tag: "Layout",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Multiple reveal cards arranged in a responsive grid for feature showcases.",
    preview: (
      <div className="grid grid-cols-2 gap-4">
        <RevealCard
          title={
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" /> Fast
            </div>
          }
          className="h-32"
        >
          Sub-50ms response times with edge-first architecture.
        </RevealCard>
        <RevealCard
          title={
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" /> Secure
            </div>
          }
          className="h-32"
        >
          Enterprise-grade encryption and SOC 2 compliance.
        </RevealCard>
        <RevealCard
          title={
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" /> Global
            </div>
          }
          className="h-32"
        >
          Deployed across 30+ regions worldwide for low latency.
        </RevealCard>
        <RevealCard
          title={
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" /> Smart
            </div>
          }
          className="h-32"
        >
          AI-powered insights and auto-scaling built in.
        </RevealCard>
      </div>
    ),
    code: `import { Zap, Shield, Globe, Cpu } from "lucide-react";

<div className="grid grid-cols-2 gap-4">
  <RevealCard
    title={<div className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-400" /> Fast</div>}
    className="h-32"
  >
    Sub-50ms response times with edge-first architecture.
  </RevealCard>
  <RevealCard
    title={<div className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" /> Secure</div>}
    className="h-32"
  >
    Enterprise-grade encryption and SOC 2 compliance.
  </RevealCard>
  <RevealCard
    title={<div className="flex items-center gap-2"><Globe className="h-4 w-4 text-blue-400" /> Global</div>}
    className="h-32"
  >
    Deployed across 30+ regions worldwide for low latency.
  </RevealCard>
  <RevealCard
    title={<div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-purple-400" /> Smart</div>}
    className="h-32"
  >
    AI-powered insights and auto-scaling built in.
  </RevealCard>
</div>`,
    filename: "grid.tsx",
  },
  {
    id: "rc-rich-title",
    title: "Rich Title Content",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Use ReactNode titles with status indicators and badges.",
    preview: (
      <RevealCard
        title={
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Status</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              Online
            </span>
          </div>
        }
        className="w-72 h-40"
      >
        All systems operational. Last incident: 32 days ago. Uptime: 99.99%.
      </RevealCard>
    ),
    code: `<RevealCard
  title={
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      <span>Live Status</span>
      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
        Online
      </span>
    </div>
  }
  className="w-72 h-40"
>
  All systems operational. Last incident: 32 days ago. Uptime: 99.99%.
</RevealCard>`,
    filename: "rich-title.tsx",
  },
  {
    id: "rc-wide",
    title: "Wide Card",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Full-width reveal card for hero sections and callouts.",
    preview: (
      <RevealCard title="Introducing FlexUI v2.0" className="w-full h-36">
        <div className="text-center">
          <p className="text-base font-semibold text-white">50+ new components</p>
          <p className="mt-1 text-sm text-zinc-400">
            Redesigned from the ground up with Framer Motion animations.
          </p>
        </div>
      </RevealCard>
    ),
    code: `<RevealCard title="Introducing FlexUI v2.0" className="w-full h-36">
  <div className="text-center">
    <p className="text-base font-semibold text-white">50+ new components</p>
    <p className="mt-1 text-sm text-zinc-400">
      Redesigned from the ground up with Framer Motion animations.
    </p>
  </div>
</RevealCard>`,
    filename: "wide.tsx",
  },
];

export function RevealCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
