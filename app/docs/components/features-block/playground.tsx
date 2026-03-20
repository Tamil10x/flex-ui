"use client";

import React, { useState } from "react";
import { FeaturesBlock } from "@/components/flexui/features-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import {
  Zap,
  Shield,
  Palette,
  Layers,
  Globe,
  Sparkles,
} from "lucide-react";

const sampleFeatures = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description:
      "Optimized for performance with zero-config lazy loading and tree-shaking support.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Type Safe",
    description:
      "Full TypeScript support with strict types, generics, and autocomplete for every prop.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Customizable",
    description:
      "Override any style with Tailwind classes. Every component accepts className.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Composable",
    description:
      "Mix and match sub-components to build complex UIs from simple building blocks.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Accessible",
    description:
      "ARIA-compliant with keyboard navigation, focus management, and screen reader support.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Animated",
    description:
      "Spring-physics animations powered by Framer Motion with viewport-triggered entrances.",
  },
];

const code = `"use client";
import { FeaturesBlock } from "@/components/flexui/features-block";
import { Zap, Shield, Palette, Layers, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description: "Optimized for performance with zero-config lazy loading.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Type Safe",
    description: "Full TypeScript support with strict types.",
  },
  // ...more features
];

<FeaturesBlock
  features={features}
  heading="Why FlexUI?"
  subtitle="Everything you need to build modern interfaces."
  columns={3}
/>`;

export function FeaturesBlockPlayground() {
  const [columns, setColumns] = useState<2 | 3 | 4>(3);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([2, 3, 4] as const).map((col) => (
          <button
            key={col}
            onClick={() => setColumns(col)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              columns === col
                ? "bg-white/10 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {col} Columns
          </button>
        ))}
      </div>
      <PreviewCodeTabs
        preview={
          <div className="w-full p-4">
            <FeaturesBlock
              features={sampleFeatures}
              heading="Why FlexUI?"
              subtitle="Everything you need to build beautiful, animated interfaces."
              columns={columns}
            />
          </div>
        }
        code={code}
        filename="features-block-demo.tsx"
      />
    </div>
  );
}
