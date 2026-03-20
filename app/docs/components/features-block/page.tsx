import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FeaturesBlockPlayground } from "./playground";
import { FeaturesBlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "Features Block — FlexUI",
  description:
    "An animated features/benefits grid with configurable columns, staggered entrance animations, and glassmorphic card styling.",
};

const featuresBlockSource = `"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// FeaturesBlock — animated features grid section
// Configurable 2/3/4 columns, heading + subtitle,
// staggered card entrance, hover lift + glow.
// Full source: components/flexui/features-block.tsx`;

export default function FeaturesBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Page Block
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Content Section
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Features Block
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated features/benefits grid section with configurable columns,
          optional section heading, staggered viewport-triggered entrance
          animations, and hover effects with icon glow.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <FeaturesBlockPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <FeaturesBlockExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/features-block"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/features-block.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={featuresBlockSource}
                  filename="components/flexui/features-block.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "⊞",
              label: "Responsive Grid",
              desc: "Configurable 2, 3, or 4 column grid that collapses gracefully on smaller screens.",
            },
            {
              icon: "⚡",
              label: "Staggered Entrance",
              desc: "Cards fade in with staggered delays when they enter the viewport, powered by Framer Motion.",
            },
            {
              icon: "↑",
              label: "Hover Lift",
              desc: "Cards lift slightly on hover with brightened border and subtle shadow for depth.",
            },
            {
              icon: "◈",
              label: "Glassmorphic Cards",
              desc: "Translucent cards with backdrop-blur, gradient icon backgrounds, and smooth transitions.",
            },
            {
              icon: "✦",
              label: "Icon Glow",
              desc: "Icon circle intensifies its gradient and gains a glow shadow on card hover.",
            },
            {
              icon: "H",
              label: "Section Header",
              desc: "Optional heading and subtitle with their own fade-in animation, centered above the grid.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { FeaturesBlock } from "@/components/flexui/features-block";`}
            filename="Named exports"
          />
        </DocSubSection>

        <DocSubSection id="features-block-props" title="FeaturesBlockProps">
          <ApiTable
            rows={[
              {
                name: "features",
                type: "Feature[]",
                default: "—",
                description:
                  "Array of feature objects with icon, title, and description.",
                required: true,
              },
              {
                name: "columns",
                type: "2 | 3 | 4",
                default: "3",
                description: "Number of grid columns at large breakpoints.",
              },
              {
                name: "heading",
                type: "string",
                default: "—",
                description: "Optional section heading displayed above the grid.",
              },
              {
                name: "subtitle",
                type: "string",
                default: "—",
                description: "Optional section subtitle below the heading.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes for the wrapper.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="feature-type" title="Feature">
          <ApiTable
            rows={[
              {
                name: "icon",
                type: "React.ReactNode",
                default: "—",
                description: "Icon element displayed in the gradient circle.",
                required: true,
              },
              {
                name: "title",
                type: "string",
                default: "—",
                description: "Feature title.",
                required: true,
              },
              {
                name: "description",
                type: "string",
                default: "—",
                description: "Feature description text.",
                required: true,
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-icon-colors" title="Custom Icon Colors">
          <CodeBlock
            code={`{/* Override the icon circle gradient per-card via className */}
<FeaturesBlock
  features={features}
  className="[&_div[class*=from-blue]]:from-purple-500/20
    [&_div[class*=to-cyan]]:to-pink-500/20"
/>`}
            filename="Purple icon theme"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-gap" title="Custom Gap">
          <CodeBlock
            code={`{/* Override grid gap */}
<FeaturesBlock
  features={features}
  className="[&>div:last-child]:gap-8"
/>`}
            filename="Wider gap"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Icons are decorative — ensure your icon elements have aria-hidden or are purely visual.",
              "Section heading uses semantic h2 for proper document outline.",
              "Staggered animations respect prefers-reduced-motion via Framer Motion defaults.",
              "Card content is fully readable without hover interactions.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
