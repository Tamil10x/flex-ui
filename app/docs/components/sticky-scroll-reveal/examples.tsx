"use client";

import React from "react";
import { StickyScrollReveal } from "@/components/flexui/sticky-scroll-reveal";

const featureSections = [
  {
    title: "Built for Speed",
    description:
      "Every component is optimized for performance with minimal re-renders and lightweight animations powered by Framer Motion.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20">
        <span className="text-2xl font-bold text-violet-400">60fps</span>
      </div>
    ),
  },
  {
    title: "Fully Composable",
    description:
      "Mix and match components freely. Each piece is designed to work independently or together as part of a larger composition.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
        <span className="text-2xl font-bold text-cyan-400">Compose</span>
      </div>
    ),
  },
  {
    title: "Dark Mode Native",
    description:
      "Designed from the ground up with dark interfaces in mind. Glassmorphic panels, subtle borders, and muted color palettes.",
    content: (
      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
        <span className="text-2xl font-bold text-emerald-400">Dark</span>
      </div>
    ),
  },
];

function FeatureSectionsExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <StickyScrollReveal sections={featureSections} />
    </div>
  );
}

const timelineSections = [
  {
    title: "Phase 1: Research",
    description: "Deep dive into user needs, competitive analysis, and technical feasibility studies.",
  },
  {
    title: "Phase 2: Design",
    description: "Wireframing, prototyping, and iterating on the visual design system with the team.",
  },
  {
    title: "Phase 3: Build",
    description: "Engineering sprints with continuous integration, code reviews, and testing.",
  },
];

function TimelineExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <StickyScrollReveal sections={timelineSections} />
    </div>
  );
}

const pricingSections = [
  {
    title: "Free Tier",
    description: "Get started with core components, community support, and basic documentation.",
    content: (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-zinc-500/10 to-zinc-600/10 border border-zinc-500/20">
        <span className="text-3xl font-bold text-white">$0</span>
        <span className="mt-1 text-sm text-zinc-500">Forever free</span>
      </div>
    ),
  },
  {
    title: "Pro Tier",
    description: "Unlock premium components, priority support, and access to the full source code.",
    content: (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20">
        <span className="text-3xl font-bold text-amber-400">$29</span>
        <span className="mt-1 text-sm text-zinc-500">per month</span>
      </div>
    ),
  },
  {
    title: "Enterprise",
    description: "Custom licensing, dedicated support, and white-label options for large teams.",
    content: (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20">
        <span className="text-3xl font-bold text-violet-400">Custom</span>
        <span className="mt-1 text-sm text-zinc-500">Contact us</span>
      </div>
    ),
  },
];

function PricingExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <StickyScrollReveal sections={pricingSections} />
    </div>
  );
}

export function StickyScrollRevealExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Feature Sections</h3>
        <FeatureSectionsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Timeline / Process</h3>
        <TimelineExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Pricing Tiers</h3>
        <PricingExample />
      </div>
    </div>
  );
}
