import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { HandwrittenAnnotationPlayground } from "./playground";
import { HandwrittenAnnotationExamples } from "./examples";

export const metadata: Metadata = {
  title: "Handwritten Annotation — FlexUI",
  description:
    "SVG annotations (circles, underlines, arrows) that animate as if being drawn by hand in real-time.",
};

const componentSource = `"use client";
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type AnnotationType = "circle" | "underline" | "highlight" | "bracket" | "arrow" | "strikethrough";

interface HandwrittenAnnotationProps {
  children: React.ReactNode;
  className?: string;
  type?: AnnotationType;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  once?: boolean;
  animate?: boolean;
  padding?: number;
  bracketSide?: "left" | "right";
}

// ... wobbly path generators for each annotation type
// Full source: npx shadcn@latest add @flexui/handwritten-annotation`;

export default function HandwrittenAnnotationDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Text Effects
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Handwritten Annotation
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          SVG annotations — circles, underlines, highlights, arrows, brackets,
          and strikethroughs — that animate as if being drawn by hand in
          real-time. Triggered on scroll into view.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <HandwrittenAnnotationPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <HandwrittenAnnotationExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/handwritten-annotation"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/handwritten-annotation.tsx
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
                  code={componentSource}
                  filename="components/flexui/handwritten-annotation.tsx"
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
              label: "Hand-Drawn Feel",
              desc: "Slightly irregular, wobbly paths that look natural — not mathematically perfect shapes.",
            },
            {
              icon: "\u2192",
              label: "Draw-On Animation",
              desc: "Stroke-dashoffset animation draws the annotation as if a pen is moving across the page.",
            },
            {
              icon: "\u25CB",
              label: "Six Annotation Types",
              desc: "Circle, underline, highlight, bracket, arrow, and strikethrough — all with a hand-drawn style.",
            },
            {
              icon: "\u21F5",
              label: "Scroll Triggered",
              desc: "Uses useInView to trigger the drawing animation when the element scrolls into the viewport.",
            },
            {
              icon: "\u2630",
              label: "Auto-Measuring",
              desc: "SVG viewBox automatically matches the wrapped content dimensions via ResizeObserver.",
            },
            {
              icon: "\u2699",
              label: "Fully Customizable",
              desc: "Control color, stroke width, animation duration, padding, and annotation type via simple props.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 text-sm font-bold text-red-400">
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
            code={`import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="annotation-props" title="HandwrittenAnnotation Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "The content to annotate.",
                required: true,
              },
              {
                name: "type",
                type: '"circle" | "underline" | "highlight" | "bracket" | "arrow" | "strikethrough"',
                default: '"circle"',
                description: "Style of annotation to draw.",
              },
              {
                name: "color",
                type: "string",
                default: '"#EF4444"',
                description: "Stroke or fill color of the annotation.",
              },
              {
                name: "strokeWidth",
                type: "number",
                default: "2",
                description: "Width of the SVG stroke (not used for highlight).",
              },
              {
                name: "duration",
                type: "number",
                default: "0.8",
                description: "Animation duration in seconds.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description: "If true, the animation triggers only once when scrolled into view.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description: "Enable or disable the drawing animation.",
              },
              {
                name: "padding",
                type: "number",
                default: "6",
                description: "Extra padding around the annotation shape (px).",
              },
              {
                name: "bracketSide",
                type: '"left" | "right"',
                default: '"left"',
                description: "Which side the bracket appears on (only for bracket type).",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the wrapper span.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <DocSubSection id="basic-usage" title="Basic Circle">
          <CodeBlock
            code={`<p className="text-2xl font-bold">
  This is{" "}
  <HandwrittenAnnotation type="circle" color="#EF4444">
    important
  </HandwrittenAnnotation>{" "}
  text
</p>`}
            filename="circle-example.tsx"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="underline-usage" title="Underline">
          <CodeBlock
            code={`<h2>
  <HandwrittenAnnotation type="underline" color="#3B82F6" strokeWidth={2.5}>
    Section Title
  </HandwrittenAnnotation>
</h2>`}
            filename="underline-example.tsx"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="highlight-usage" title="Highlight">
          <CodeBlock
            code={`<p>
  The{" "}
  <HandwrittenAnnotation type="highlight" color="#FBBF24">
    key takeaway
  </HandwrittenAnnotation>{" "}
  is simplicity.
</p>`}
            filename="highlight-example.tsx"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="strikethrough-usage" title="Strikethrough + Replacement">
          <CodeBlock
            code={`<p>
  <HandwrittenAnnotation type="strikethrough" color="#EF4444">
    $99/month
  </HandwrittenAnnotation>{" "}
  <span className="text-emerald-400 font-bold">Now $49/month</span>
</p>`}
            filename="strikethrough-example.tsx"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
