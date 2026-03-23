import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SparklineChartPlayground } from "./playground";
import { SparklineChartExamples } from "./examples";

export const metadata: Metadata = {
  title: "Sparkline Chart — FlexUI",
  description:
    "A minimal SVG sparkline chart with smooth cubic bezier curves, optional area fill, and animated line drawing.",
};

const sparklineSource = `"use client";
import React, { useMemo, useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Pure SVG sparkline with cubic bezier curves,
// optional gradient area fill, and stroke-dashoffset animation.
// Full source: npx shadcn@latest add @flexui/sparkline-chart`;

export default function SparklineChartDoc() {
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
          Sparkline Chart
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A minimal, pure-SVG sparkline with smooth cubic bezier curves, optional
          gradient area fill, and animated line drawing via stroke-dashoffset. No
          charting library required.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SparklineChartPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SparklineChartExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/sparkline-chart"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/sparkline-chart.tsx
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
                  code={sparklineSource}
                  filename="components/flexui/sparkline-chart.tsx"
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
        <DocSubSection id="sparkline-props" title="SparklineChart">
          <ApiTable
            rows={[
              {
                name: "data",
                type: "number[]",
                default: "—",
                description: "Array of numeric values to plot.",
                required: true,
              },
              {
                name: "width",
                type: "number",
                default: "200",
                description: "SVG viewport width in pixels.",
              },
              {
                name: "height",
                type: "number",
                default: "60",
                description: "SVG viewport height in pixels.",
              },
              {
                name: "color",
                type: "string",
                default: '"#38bdf8"',
                description: "Stroke color for the line and area gradient.",
              },
              {
                name: "showArea",
                type: "boolean",
                default: "false",
                description:
                  "Render a gradient-filled area under the line.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description:
                  "Animate line drawing from left to right on mount.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the SVG element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Smooth Bezier Curves", desc: "Cubic bezier path interpolation for organic, non-jagged line rendering." },
            { icon: "o", label: "Line Draw Animation", desc: "Stroke-dashoffset animation draws the line from left to right on mount." },
            { icon: "#", label: "Gradient Area Fill", desc: "Optional gradient-filled area below the line for visual depth and emphasis." },
            { icon: "+", label: "No Chart Library", desc: "Pure SVG with zero external charting dependencies -- just framer-motion." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="area-chart" title="Area Chart with Custom Color">
          <CodeBlock code={`<SparklineChart
  data={[10, 25, 15, 40, 30, 55, 45]}
  color="#10b981"
  showArea
  width={300}
  height={80}
/>`} filename="area.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="static-sparkline" title="Static (No Animation)">
          <CodeBlock code={`<SparklineChart
  data={[5, 12, 8, 20, 15, 25]}
  animate={false}
  color="#f59e0b"
/>`} filename="static.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["SVG element is decorative by default -- add an aria-label or title element for meaningful charts.", "Gradient definitions use unique IDs per instance to prevent conflicts in multi-chart layouts.", "Consider pairing with visible labels or tooltips to convey the data values to all users."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Pure SVG — no canvas, no WebGL, no charting library overhead.",
              "Path computation is memoized — only recalculates when data/dimensions change.",
              "Stroke-dashoffset animation is GPU-accelerated via transform compositing.",
              "Area gradient uses a single linearGradient def — minimal DOM footprint.",
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
