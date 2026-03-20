import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ProgressRingPlayground } from "./playground";
import { ProgressRingExamples } from "./examples";

export const metadata: Metadata = {
  title: "Progress Ring — FlexUI",
  description:
    "An SVG circular progress ring with animated stroke-dashoffset, gradient stroke, and customizable center content.",
};

const progressRingSource = `"use client";
import React, { useRef, useId } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// SVG progress ring with animated stroke-dashoffset,
// gradient stroke, and center content slot.
// Full source: npx shadcn@latest add @flexui/progress-ring`;

export default function ProgressRingDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Data Viz
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Progress Ring
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A circular SVG progress indicator with animated stroke-dashoffset,
          gradient stroke color, rounded line caps, and a center content slot for
          labels or icons. Animates on scroll into view.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ProgressRingPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <ProgressRingExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/progress-ring"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/progress-ring.tsx
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
                  code={progressRingSource}
                  filename="components/flexui/progress-ring.tsx"
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

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="ring-props" title="ProgressRing">
          <ApiTable
            rows={[
              {
                name: "value",
                type: "number",
                default: "—",
                description: "Progress percentage (0-100).",
                required: true,
              },
              {
                name: "size",
                type: "number",
                default: "120",
                description: "Diameter of the ring in pixels.",
              },
              {
                name: "strokeWidth",
                type: "number",
                default: "8",
                description: "Thickness of the ring stroke.",
              },
              {
                name: "color",
                type: "string",
                default: '"#38bdf8"',
                description: "Progress arc stroke color.",
              },
              {
                name: "trackColor",
                type: "string",
                default: '"rgba(255,255,255,0.06)"',
                description: "Background track circle color.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description:
                  "Animate the arc from 0 to target when scrolled into view.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description:
                  "Content rendered in the center of the ring (e.g. percentage text).",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the wrapper div.",
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
              "Pure SVG with a single animated circle — minimal DOM footprint.",
              "Stroke-dashoffset animation is composited on the GPU for smooth 60fps.",
              "useInView triggers animation only when visible — no offscreen work.",
              "SVG linearGradient is defined once per instance for efficient rendering.",
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
