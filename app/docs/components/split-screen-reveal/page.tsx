import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SplitScreenRevealPlayground } from "./playground";
import { SplitScreenRevealExamples } from "./examples";

export const metadata: Metadata = {
  title: "Split Screen Reveal — FlexUI",
  description:
    "Two panels that split apart on click to reveal content underneath with spring-physics animation.",
};

const splitScreenSource = `"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ... SplitScreenReveal component
// Full source: npx shadcn@latest add @flexui/split-screen-reveal`;

export default function SplitScreenRevealDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Layout &amp; Reveal
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Split Screen Reveal
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Two glassmorphic panels that split apart on click to reveal content
          underneath. Supports horizontal and vertical directions with
          spring-physics animation and a glowing center seam.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SplitScreenRevealPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SplitScreenRevealExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/split-screen-reveal"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/split-screen-reveal.tsx
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
                  code={splitScreenSource}
                  filename="components/flexui/split-screen-reveal.tsx"
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
              icon: "~",
              label: "Spring Physics",
              desc: "Panels slide apart with Framer Motion spring animation for a natural, bouncy feel.",
            },
            {
              icon: "||",
              label: "Two Directions",
              desc: "Split horizontally (left/right) or vertically (top/bottom) with a single prop.",
            },
            {
              icon: "||",
              label: "Glassmorphic Panels",
              desc: "Frosted glass panels with backdrop-blur, gradient accents, and a glowing center seam.",
            },
            {
              icon: "^",
              label: "Controlled & Uncontrolled",
              desc: "Works as uncontrolled (click to toggle) or controlled via isOpen and onToggle props.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/10 to-cyan-500/10 text-sm font-bold text-violet-400">
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
            code={`import { SplitScreenReveal } from "@/components/flexui/split-screen-reveal";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="SplitScreenReveal Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "-",
                description: "Content revealed underneath the split panels.",
                required: true,
              },
              {
                name: "leftContent",
                type: "React.ReactNode",
                default: "-",
                description:
                  "Content displayed on the left (or top) panel.",
              },
              {
                name: "rightContent",
                type: "React.ReactNode",
                default: "-",
                description:
                  "Content displayed on the right (or bottom) panel.",
              },
              {
                name: "direction",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Split direction.",
              },
              {
                name: "isOpen",
                type: "boolean",
                default: "-",
                description:
                  "Controlled open state. When provided, the component becomes controlled.",
              },
              {
                name: "onToggle",
                type: "() => void",
                default: "-",
                description: "Callback fired when the panels are toggled.",
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
              "Uses GPU-accelerated transform animations only (translateX/translateY) for smooth 60fps.",
              "Panels use backdrop-filter for glassmorphic blur -- GPU-composited, no JS paint overhead.",
              "AnimatePresence handles the glow line mount/unmount cleanly.",
              "Spring transition physics provide natural motion without manual easing curves.",
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
