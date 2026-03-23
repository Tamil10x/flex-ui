import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ChromaticTextPlayground } from "./playground";
import { ChromaticTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Chromatic Text — FlexUI",
  description:
    "Text with chromatic aberration effect -- RGB channels split on hover or always active with configurable offset and colors.",
};

const chromaticTextSource = `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChromaticTextProps {
  children: string;
  className?: string;
  offset?: number;
  trigger?: "hover" | "always";
  colors?: [string, string, string];
}

export function ChromaticText({
  children,
  className,
  offset = 3,
  trigger = "hover",
  colors = ["#ff0000", "#00ff00", "#0000ff"],
}: ChromaticTextProps) {
  // Renders text 3 times with absolute positioning
  // Each layer has a different color and offset
  // mix-blend-mode: screen merges channels
  // See full source in components/flexui/chromatic-text.tsx
}`;

export default function ChromaticTextDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-green-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS + Framer Motion
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Text Effect
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Chromatic Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Text with chromatic aberration -- RGB channels split apart on hover or
          remain always active. Pure CSS layers with{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
            mix-blend-mode: screen
          </code>{" "}
          and Framer Motion spring transitions for a cinematic glitch aesthetic.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Hover over the text to see the RGB channels split. Each channel
          transitions with a slight stagger for a layered effect.
        </p>
        <ChromaticTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Three variations: hover trigger (default), always active, and custom
          CMYK-inspired colors.
        </p>
        <ChromaticTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/chromatic-text"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
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
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/chromatic-text.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
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
              icon: "R",
              label: "RGB Channel Split",
              desc: "Three text layers (red, green, blue) shift apart with configurable pixel offset.",
            },
            {
              icon: "~",
              label: "Staggered Animation",
              desc: "Each color channel animates with a slight delay for a layered, cinematic reveal.",
            },
            {
              icon: "*",
              label: "Screen Blend Mode",
              desc: "mix-blend-mode: screen merges the channels naturally, creating additive color mixing.",
            },
            {
              icon: "#",
              label: "Custom Colors",
              desc: "Override the default RGB with any three colors -- CMYK, warm tones, or brand colors.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/10 via-green-500/10 to-blue-500/10 text-sm font-bold text-red-400">
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
            code={`import { ChromaticText } from "@/components/flexui/chromatic-text";
import type { ChromaticTextProps } from "@/components/flexui/chromatic-text";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="ChromaticText Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "string",
                default: "\u2014",
                description: "The text content to render with chromatic aberration.",
              },
              {
                name: "offset",
                type: "number",
                default: "3",
                description:
                  "Split distance in pixels. Higher values = more dramatic RGB separation.",
              },
              {
                name: "trigger",
                type: '"hover" | "always"',
                default: '"hover"',
                description:
                  'When set to "hover", the effect activates on mouse enter. "always" keeps it active.',
              },
              {
                name: "colors",
                type: "[string, string, string]",
                default: '["#ff0000", "#00ff00", "#0000ff"]',
                description:
                  "RGB channel colors as [red, green, blue]. Override for custom color schemes.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional Tailwind classes on the wrapper span. Use for font-size, font-weight, etc.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="trigger-modes" title="Trigger Modes">
          <CodeBlock
            code={`{/* Hover trigger (default) */}
<ChromaticText trigger="hover">Hover Me</ChromaticText>

{/* Always active */}
<ChromaticText trigger="always">Always Glitchy</ChromaticText>`}
            filename="Trigger modes"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="offset-sizes" title="Offset Sizes">
          <CodeBlock
            code={`{/* Subtle (1px) */}
<ChromaticText offset={1}>Subtle</ChromaticText>

{/* Default (3px) */}
<ChromaticText>Default</ChromaticText>

{/* Dramatic (8px) */}
<ChromaticText offset={8}>Dramatic</ChromaticText>`}
            filename="Offsets"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="color-schemes" title="Color Schemes">
          <CodeBlock
            code={`{/* Default RGB */}
<ChromaticText>RGB</ChromaticText>

{/* CMYK-inspired */}
<ChromaticText colors={["#ff00ff", "#00ffff", "#ffff00"]}>
  CMYK
</ChromaticText>

{/* Brand colors */}
<ChromaticText colors={["#8b5cf6", "#06b6d4", "#ec4899"]}>
  Brand
</ChromaticText>`}
            filename="Color schemes"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Pure CSS + Framer Motion -- no canvas, no WebGL, no heavy dependencies.",
              "Only 4 DOM elements (base text + 3 color layers) regardless of text length.",
              "mix-blend-mode: screen is GPU-composited in modern browsers.",
              "Spring transitions run on the compositor thread for smooth 60fps animation.",
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

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Color overlay layers are marked aria-hidden -- screen readers see only the base text.",
              "The base text is always white and readable regardless of animation state.",
              "Works with any text content -- just pass a string as children.",
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
