"use client";

import React from "react";
import { FeaturesBlock } from "@/components/flexui/features-block";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import {
  Zap,
  Shield,
  Palette,
  Layers,
  Code2,
  Rocket,
  Lock,
  BarChart3,
} from "lucide-react";

// ─── 3-Column Example ───────────────────────────────────────────────────────

const threeColFeatures = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Setup",
    description: "Get started in under 5 minutes with our CLI installer.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Secure by Default",
    description: "Built-in XSS protection and CSP-compatible components.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Themeable",
    description: "Swap color schemes with a single Tailwind config change.",
  },
];

function ThreeColumnExample() {
  return (
    <div className="w-full p-4">
      <FeaturesBlock
        features={threeColFeatures}
        heading="Core Benefits"
        subtitle="Built for modern web applications."
        columns={3}
      />
    </div>
  );
}

// ─── 2-Column Example ───────────────────────────────────────────────────────

const twoColFeatures = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Developer Experience",
    description:
      "Autocomplete, strict types, and comprehensive docs make building a joy.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Production Ready",
    description:
      "Battle-tested in production by hundreds of teams worldwide.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Enterprise Grade",
    description:
      "SOC 2 compliant patterns with audit logging and access control hooks.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Analytics Built In",
    description:
      "Track component usage and user interactions out of the box.",
  },
];

function TwoColumnExample() {
  return (
    <div className="w-full p-4">
      <FeaturesBlock features={twoColFeatures} columns={2} />
    </div>
  );
}

// ─── No Heading Example ─────────────────────────────────────────────────────

const minimalFeatures = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Composable",
    description: "Build complex UIs from simple building blocks.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast",
    description: "Optimized rendering with minimal re-renders.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Reliable",
    description: "Comprehensive test coverage across all components.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Beautiful",
    description: "Glassmorphic design that works in any dark theme.",
  },
];

function MinimalExample() {
  return (
    <div className="w-full p-4">
      <FeaturesBlock features={minimalFeatures} columns={4} />
    </div>
  );
}

// ─── Showcase items ─────────────────────────────────────────────────────────

const examples = [
  {
    id: "fb-3col",
    title: "3-Column with Heading",
    tag: "Default",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description:
      "Three-column grid with section heading, subtitle, and staggered entrance.",
    preview: <ThreeColumnExample />,
    code: `<FeaturesBlock
  features={features}
  heading="Core Benefits"
  subtitle="Built for modern web applications."
  columns={3}
/>`,
    filename: "three-column.tsx",
  },
  {
    id: "fb-2col",
    title: "2-Column Layout",
    tag: "Compact",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Two-column grid without heading for inline usage.",
    preview: <TwoColumnExample />,
    code: `<FeaturesBlock
  features={features}
  columns={2}
/>`,
    filename: "two-column.tsx",
  },
  {
    id: "fb-4col",
    title: "4-Column Minimal",
    tag: "Dense",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Four-column dense grid without section header.",
    span: "2" as const,
    preview: <MinimalExample />,
    code: `<FeaturesBlock
  features={features}
  columns={4}
/>`,
    filename: "four-column.tsx",
  },
];

export function FeaturesBlockExamples() {
  return <ShowcaseGrid items={examples} />;
}
