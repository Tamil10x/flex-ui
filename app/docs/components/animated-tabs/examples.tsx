"use client";

import React from "react";
import { AnimatedTabs } from "@/components/flexui/animated-tabs";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const sampleTabs = [
  {
    id: "tab1",
    label: "Overview",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 text-sm text-zinc-300">
        This is the overview tab content with smooth fade-slide transitions.
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Features",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 text-sm text-zinc-300">
        Feature list with animated indicator tracking your selection.
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Code",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 font-mono text-sm text-zinc-300">
        {"const hello = 'world';"}
      </div>
    ),
  },
];

const examples = [
  {
    id: "at-underline",
    title: "Underline Variant",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Default underline style with a gradient indicator that slides under the active tab.",
    preview: <AnimatedTabs tabs={sampleTabs} variant="underline" />,
    code: `<AnimatedTabs
  tabs={[
    { id: "tab1", label: "Overview", content: <p>Overview content</p> },
    { id: "tab2", label: "Features", content: <p>Features content</p> },
    { id: "tab3", label: "Code", content: <p>Code content</p> },
  ]}
  variant="underline"
/>`,
    filename: "underline.tsx",
  },
  {
    id: "at-pill",
    title: "Pill Variant",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Background highlight slides behind the active tab for a contained look.",
    preview: <AnimatedTabs tabs={sampleTabs} variant="pill" />,
    code: `<AnimatedTabs
  tabs={tabs}
  variant="pill"
/>`,
    filename: "pill.tsx",
  },
  {
    id: "at-bordered",
    title: "Bordered Variant",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Active tab gets a subtle border box indicator with spring physics.",
    preview: <AnimatedTabs tabs={sampleTabs} variant="bordered" />,
    code: `<AnimatedTabs
  tabs={tabs}
  variant="bordered"
/>`,
    filename: "bordered.tsx",
  },
  {
    id: "at-default-tab",
    title: "Custom Default Tab",
    tag: "Config",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Set a specific tab as the initially active tab using the defaultTab prop.",
    preview: <AnimatedTabs tabs={sampleTabs} defaultTab="tab2" variant="underline" />,
    code: `<AnimatedTabs
  tabs={tabs}
  defaultTab="tab2"
  variant="underline"
/>`,
    filename: "default-tab.tsx",
  },
];

export function AnimatedTabsExamples() {
  return <ShowcaseGrid items={examples} />;
}
