import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { KPICardPlayground } from "./playground";
import { KPICardExamples } from "./examples";

export const metadata: Metadata = {
  title: "KPI Card — FlexUI",
  description:
    "A glassmorphic KPI dashboard card with spring-animated number counter, change indicator, and optional sparkline.",
};

const kpiCardSource = `"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklineChart } from "./sparkline-chart";

// Glassmorphic KPI card with animated counter,
// change indicator, and embedded sparkline.
// Full source: npx shadcn@latest add @flexui/kpi-card`;

export default function KPICardDoc() {
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
          KPI Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A glassmorphic dashboard card with a spring-animated number counter that
          ticks up on scroll, a color-coded change indicator with arrow, and an
          optional embedded sparkline. Perfect for dashboard layouts.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <KPICardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <KPICardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/kpi-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/kpi-card.tsx
                </code>
                . Also requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  sparkline-chart.tsx
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
                  code={kpiCardSource}
                  filename="components/flexui/kpi-card.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    sparkline-chart.tsx
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="kpi-props" title="KPICard">
          <ApiTable
            rows={[
              {
                name: "title",
                type: "string",
                default: "—",
                description: "Label displayed above the value.",
                required: true,
              },
              {
                name: "value",
                type: "number",
                default: "—",
                description: "The numeric value to display and animate.",
                required: true,
              },
              {
                name: "prefix",
                type: "string",
                default: "—",
                description: 'Text before the number (e.g. "$").',
              },
              {
                name: "suffix",
                type: "string",
                default: "—",
                description: 'Text after the number (e.g. "%").',
              },
              {
                name: "change",
                type: "number",
                default: "—",
                description:
                  "Percentage change. Positive = green up arrow, negative = red down arrow.",
              },
              {
                name: "sparklineData",
                type: "number[]",
                default: "—",
                description:
                  "Optional data array for an embedded sparkline below the value.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the card wrapper.",
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
              "Number animation uses useMotionValue + useSpring — updates happen outside the React render cycle.",
              "The counter only starts when scrolled into view via useInView, preventing offscreen work.",
              "Sparkline rendering is memoized — only recalculates when data changes.",
              "Glassmorphic backdrop-blur is GPU-accelerated via CSS compositing.",
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
