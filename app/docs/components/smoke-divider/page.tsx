import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SmokeDividerPlayground } from "./playground";
import { SmokeDividerExamples } from "./examples";

export const metadata: Metadata = {
  title: "Smoke Divider — FlexUI",
  description:
    "A section divider with animated smoke/fog particles drifting across.",
};

const smokeDividerSource = `"use client";
import React, { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// ... SmokeDivider component
// Full source: npx shadcn@latest add @flexui/smoke-divider`;

export default function SmokeDividerDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Decorative
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Smoke Divider
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A section divider with animated smoke/fog particles drifting across.
          Configurable wisp count, color, height, and speed. Pure CSS animation
          with hydration-safe seeded randomization.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SmokeDividerPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SmokeDividerExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/smoke-divider"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/smoke-divider.tsx
                </code>
                . No external dependencies required.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component source
                </p>
                <CodeBlock
                  code={smokeDividerSource}
                  filename="components/flexui/smoke-divider.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to your global CSS
                </p>
                <CodeBlock
                  code={`@keyframes smoke-drift {
  0% { transform: translateX(-200px) translateY(0px); }
  100% { transform: translateX(calc(100vw + 200px)) translateY(0px); }
}

@keyframes smoke-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}`}
                  filename="globals.css"
                  language="css"
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
              icon: "~",
              label: "Organic Motion",
              desc: "Each wisp drifts at different speeds with a subtle vertical oscillation for a natural fog feel.",
            },
            {
              icon: "#",
              label: "Zero Dependencies",
              desc: "Pure CSS keyframe animations -- no Framer Motion or JS animation libraries needed.",
            },
            {
              icon: "*",
              label: "Hydration Safe",
              desc: "Seeded random ensures server and client render identical wisp layouts. Mounted guard prevents hydration mismatch.",
            },
            {
              icon: ">",
              label: "Customizable",
              desc: "Control color, count, height, and speed. Compose multiple dividers with different themes.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-sm font-bold text-cyan-400">
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
        <DocSubSection id="exports" title="Export">
          <CodeBlock
            code={`import { SmokeDivider } from "@/components/flexui/smoke-divider";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="SmokeDivider Props">
          <ApiTable
            rows={[
              {
                name: "color",
                type: "string",
                default: '"rgba(139,92,246,0.15)"',
                description: "CSS color for the smoke wisps.",
              },
              {
                name: "count",
                type: "number",
                default: "8",
                description: "Number of smoke wisp elements.",
              },
              {
                name: "height",
                type: "number",
                default: "60",
                description: "Height of the smoke area in pixels.",
              },
              {
                name: "speed",
                type: "number",
                default: "1",
                description:
                  "Speed multiplier. Higher values = faster drift.",
              },
              {
                name: "className",
                type: "string",
                default: "-",
                description: "Additional classes applied to the wrapper.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Pure CSS animations -- no JS animation frame loop, no Framer Motion bundle cost.",
              "Each wisp uses will-change: transform for GPU-accelerated compositing.",
              "Mounted guard prevents wisps from rendering during SSR, avoiding hydration mismatches.",
              "Seeded PRNG ensures deterministic layout across server and client.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
