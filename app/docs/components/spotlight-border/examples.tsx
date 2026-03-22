"use client";

import React from "react";
import { SpotlightBorder } from "@/components/flexui/spotlight-border";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Zap, Shield, BarChart3 } from "lucide-react";

const examples = [
  {
    id: "sb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Hover to see the cyan spotlight glow track your mouse along the border.",
    preview: (
      <SpotlightBorder className="w-80">
        <h3 className="text-lg font-semibold text-white">Hover me</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Move your mouse around to see the spotlight border follow your cursor.
        </p>
      </SpotlightBorder>
    ),
    code: `<SpotlightBorder>
  <h3 className="text-lg font-semibold text-white">Hover me</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Move your mouse around to see the spotlight border follow your cursor.
  </p>
</SpotlightBorder>`,
    filename: "default.tsx",
  },
  {
    id: "sb-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different spotlight colors for visual variety across cards.",
    preview: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <SpotlightBorder color="56,189,248">
          <p className="text-sm font-semibold text-cyan-400">Cyan</p>
          <p className="mt-1 text-xs text-zinc-500">Default color</p>
        </SpotlightBorder>
        <SpotlightBorder color="139,92,246">
          <p className="text-sm font-semibold text-purple-400">Purple</p>
          <p className="mt-1 text-xs text-zinc-500">Brand accent</p>
        </SpotlightBorder>
        <SpotlightBorder color="16,185,129">
          <p className="text-sm font-semibold text-emerald-400">Emerald</p>
          <p className="mt-1 text-xs text-zinc-500">Success state</p>
        </SpotlightBorder>
      </div>
    ),
    code: `<SpotlightBorder color="56,189,248">
  <p className="text-sm font-semibold text-cyan-400">Cyan</p>
</SpotlightBorder>

<SpotlightBorder color="139,92,246">
  <p className="text-sm font-semibold text-purple-400">Purple</p>
</SpotlightBorder>

<SpotlightBorder color="16,185,129">
  <p className="text-sm font-semibold text-emerald-400">Emerald</p>
</SpotlightBorder>`,
    filename: "colors.tsx",
  },
  {
    id: "sb-feature-cards",
    title: "Feature Cards",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Spotlight border cards with icons for a feature showcase section.",
    preview: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <SpotlightBorder color="250,204,21">
          <Zap className="h-6 w-6 text-yellow-400 mb-3" />
          <h4 className="font-semibold text-white">Lightning Fast</h4>
          <p className="mt-1.5 text-xs text-zinc-400">
            Sub-50ms response times with edge-first deployment.
          </p>
        </SpotlightBorder>
        <SpotlightBorder color="139,92,246">
          <Shield className="h-6 w-6 text-purple-400 mb-3" />
          <h4 className="font-semibold text-white">Secure by Default</h4>
          <p className="mt-1.5 text-xs text-zinc-400">
            Enterprise-grade encryption and SOC 2 compliance.
          </p>
        </SpotlightBorder>
        <SpotlightBorder color="59,130,246">
          <BarChart3 className="h-6 w-6 text-blue-400 mb-3" />
          <h4 className="font-semibold text-white">Rich Analytics</h4>
          <p className="mt-1.5 text-xs text-zinc-400">
            Real-time dashboards and custom metric tracking.
          </p>
        </SpotlightBorder>
      </div>
    ),
    code: `import { Zap, Shield, BarChart3 } from "lucide-react";

<SpotlightBorder color="250,204,21">
  <Zap className="h-6 w-6 text-yellow-400 mb-3" />
  <h4 className="font-semibold text-white">Lightning Fast</h4>
  <p className="mt-1.5 text-xs text-zinc-400">Sub-50ms response times.</p>
</SpotlightBorder>

<SpotlightBorder color="139,92,246">
  <Shield className="h-6 w-6 text-purple-400 mb-3" />
  <h4 className="font-semibold text-white">Secure by Default</h4>
  <p className="mt-1.5 text-xs text-zinc-400">Enterprise-grade encryption.</p>
</SpotlightBorder>

<SpotlightBorder color="59,130,246">
  <BarChart3 className="h-6 w-6 text-blue-400 mb-3" />
  <h4 className="font-semibold text-white">Rich Analytics</h4>
  <p className="mt-1.5 text-xs text-zinc-400">Real-time dashboards.</p>
</SpotlightBorder>`,
    filename: "feature-cards.tsx",
  },
  {
    id: "sb-nested",
    title: "Interactive Content",
    tag: "Compose",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Spotlight border wrapping interactive elements like buttons and inputs.",
    preview: (
      <SpotlightBorder color="236,72,153" className="w-full max-w-sm">
        <h3 className="text-lg font-semibold text-white">Subscribe</h3>
        <p className="mt-1 text-sm text-zinc-400">Get notified when we launch new features.</p>
        <div className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-pink-500/50"
          />
          <button className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500 transition-colors">
            Join
          </button>
        </div>
      </SpotlightBorder>
    ),
    code: `<SpotlightBorder color="236,72,153">
  <h3 className="text-lg font-semibold text-white">Subscribe</h3>
  <p className="mt-1 text-sm text-zinc-400">
    Get notified when we launch new features.
  </p>
  <div className="mt-4 flex gap-2">
    <input
      type="email"
      placeholder="you@example.com"
      className="flex-1 rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-white"
    />
    <button className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white">
      Join
    </button>
  </div>
</SpotlightBorder>`,
    filename: "interactive.tsx",
  },
];

export function SpotlightBorderExamples() {
  return <ShowcaseGrid items={examples} />;
}
