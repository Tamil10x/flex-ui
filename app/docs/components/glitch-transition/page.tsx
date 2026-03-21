import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GlitchTransitionPlayground } from "./playground";
import { GlitchTransitionExamples } from "./examples";

export const metadata: Metadata = {
  title: "Glitch Transition — FlexUI",
  description:
    "A CRT TV glitch effect with RGB split, scanlines, block displacement, and flicker that can wrap any content.",
};

const glitchTransitionSource = `"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTransitionProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  intensity?: number;
  duration?: number;
  trigger?: "hover" | "click" | "always" | "manual";
}

export function GlitchTransition({
  children, className,
  active: manualActive = false,
  intensity = 0.5,
  duration = 300,
  trigger = "hover",
}: GlitchTransitionProps) {
  // ... see source for full implementation
}`;

export default function GlitchTransitionDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            framer-motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Glitch Transition
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A CRT TV glitch effect that wraps any content or serves as a
          transition. Features RGB channel splitting, scanline overlays, random
          block displacement, and rapid flicker — all driven by lightweight CSS
          animations.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <GlitchTransitionPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <GlitchTransitionExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/glitch-transition"
                filename="Terminal"
              />
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
                  2. Copy the component
                </p>
                <CodeBlock code={glitchTransitionSource} filename="components/flexui/glitch-transition.tsx" language="tsx" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add the keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes glitch-flicker {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}`}
                  filename="globals.css"
                  language="css"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  4. Requires{" "}
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
              desc: "Three offset copies of content with red/blue tinting and mix-blend-mode: screen for authentic chromatic aberration.",
            },
            {
              icon: "=",
              label: "Scanline Overlay",
              desc: "Fine horizontal lines via repeating-linear-gradient mimicking a CRT monitor.",
            },
            {
              icon: "#",
              label: "Block Displacement",
              desc: "Random horizontal slices of content shift left/right with clip-path for a data-corruption look.",
            },
            {
              icon: "*",
              label: "Rapid Flicker",
              desc: "CSS keyframe opacity flicker for the characteristic CRT instability effect.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/10 to-rose-500/10 text-sm font-bold text-red-400">
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
        <DocSubSection id="props" title="GlitchTransition Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "-",
                description: "Content to apply the glitch effect to.",
              },
              {
                name: "className",
                type: "string",
                default: "-",
                description: "Additional CSS classes on the wrapper.",
              },
              {
                name: "active",
                type: "boolean",
                default: "false",
                description:
                  'Controls glitch state when trigger is "manual".',
              },
              {
                name: "intensity",
                type: "number",
                default: "0.5",
                description:
                  "Glitch intensity from 0 (none) to 1 (maximum). Controls RGB offset, slice count, and overlay opacity.",
              },
              {
                name: "duration",
                type: "number",
                default: "300",
                description:
                  'Duration of glitch burst in ms. Only used with trigger="click".',
              },
              {
                name: "trigger",
                type: '"hover" | "click" | "always" | "manual"',
                default: '"hover"',
                description:
                  "How the glitch is activated. Hover on mouseenter, click for burst, always for continuous, manual for prop-controlled.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="intense-glitch" title="High Intensity Burst">
          <CodeBlock
            code={`<GlitchTransition trigger="click" intensity={1} duration={500}>
  <img src="/hero.png" alt="Hero" />
</GlitchTransition>`}
            filename="Intense burst"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="subtle-always" title="Subtle Background Glitch">
          <CodeBlock
            code={`<GlitchTransition trigger="always" intensity={0.2}>
  <div className="bg-zinc-950 p-12">
    <h1 className="text-4xl font-bold text-white">Cyberpunk Heading</h1>
  </div>
</GlitchTransition>`}
            filename="Subtle ambient"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="manual-control" title="Manual State Control">
          <CodeBlock
            code={`const [isGlitching, setIsGlitching] = useState(false);

<GlitchTransition trigger="manual" active={isGlitching} intensity={0.7}>
  <VideoPlayer />
</GlitchTransition>

<button onClick={() => setIsGlitching(!isGlitching)}>
  Toggle Glitch
</button>`}
            filename="Manual control"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "All visual effects use CSS animations and transforms — no per-frame JS calculations.",
              "SVG filters for RGB tinting are defined once and reused across all instances.",
              "Block displacement slices are generated from intensity, not animated frame-by-frame.",
              "Scanline overlay uses repeating-linear-gradient — zero extra DOM nodes.",
              "Click burst uses a single setTimeout with cleanup on unmount — no memory leaks.",
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
              "All decorative layers use aria-hidden — screen readers only see the base content.",
              "Consider prefers-reduced-motion: disable or reduce intensity for users who prefer less motion.",
              "Avoid high-intensity continuous glitch on large content areas as rapid flicker can be disorienting.",
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
