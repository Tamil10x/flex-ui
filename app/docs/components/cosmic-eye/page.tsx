import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { CosmicEyePlayground } from "./playground";
import { CosmicEyeExamples } from "./examples";

export const metadata: Metadata = {
  title: "Cosmic Eye — FlexUI",
  description:
    "A WebGL shader-based animated eye effect with cosmic nebula colors, mouse-tracking pupil, and organic noise textures.",
};

const cosmicEyeSource = `"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CosmicEyeProps {
  color?: string;
  accentColor?: string;
  intensity?: number;
  pupilSize?: number;
  irisWidth?: number;
  glowIntensity?: number;
  scale?: number;
  noiseScale?: number;
  pupilFollow?: number;
  speed?: number;
  className?: string;
}

export function CosmicEye({
  color = "#8b5cf6",
  accentColor = "#22d3ee",
  intensity = 1.5,
  pupilSize = 0.55,
  irisWidth = 0.25,
  glowIntensity = 0.4,
  scale = 0.85,
  noiseScale = 1.0,
  pupilFollow = 1.0,
  speed = 1.0,
  className,
}: CosmicEyeProps) {
  // Uses OGL for WebGL rendering with a fullscreen triangle
  // Fragment shader creates animated iris, pupil, and corona
  // Mouse tracking with smooth lerp for pupil movement
  // See full source in components/flexui/cosmic-eye.tsx
}`;

export default function CosmicEyeDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Tier 3
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            WebGL Shader
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            OGL
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Cosmic Eye
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A WebGL shader-based animated eye with a cosmic nebula aesthetic.
          Features a two-tone iris (violet/cyan), mouse-tracking pupil,
          swirling noise tendrils, and a pulsing corona glow -- all rendered in
          a single fragment shader via OGL.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Move your cursor over the eye to see the pupil follow. The iris
          swirls with animated noise bands in violet and cyan.
        </p>
        <CosmicEyePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples — Color Variants">
        <p className="mb-4 text-sm text-zinc-500">
          Three color presets: Nebula (default), Fire, and Frost.
        </p>
        <CosmicEyeExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/cosmic-eye"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Auto-installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  ogl
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
                  code="npm install ogl"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/cosmic-eye.tsx
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
              icon: "~",
              label: "Two-Tone Iris",
              desc: "Violet inner edge fading to cyan outer edge with chromatic fringe at the boundary.",
            },
            {
              icon: "o",
              label: "Mouse-Tracking Pupil",
              desc: "Pupil follows the cursor with smooth lerp interpolation for a lifelike feel.",
            },
            {
              icon: "*",
              label: "Noise Tendrils",
              desc: "FBM noise generates organic, nebula-like swirling patterns across the iris.",
            },
            {
              icon: "#",
              label: "Pulsing Corona",
              desc: "Outer glow halo pulses subtly, creating a breathing cosmic aura effect.",
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
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { CosmicEye } from "@/components/flexui/cosmic-eye";
import type { CosmicEyeProps } from "@/components/flexui/cosmic-eye";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="CosmicEye Props">
          <ApiTable
            rows={[
              {
                name: "color",
                type: "string",
                default: '"#8b5cf6"',
                description:
                  "Primary iris color (hex). Appears on the inner edge of the iris ring.",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#22d3ee"',
                description:
                  "Secondary accent color (hex). Appears on the outer edge of the iris and corona.",
              },
              {
                name: "intensity",
                type: "number",
                default: "1.5",
                description:
                  "Overall brightness/intensity of the iris and glow effects (0.5-3).",
              },
              {
                name: "pupilSize",
                type: "number",
                default: "0.55",
                description: "Size of the pupil relative to the eye (0.2-1.0).",
              },
              {
                name: "irisWidth",
                type: "number",
                default: "0.25",
                description:
                  "Width of the iris ring around the pupil (0.1-0.5).",
              },
              {
                name: "glowIntensity",
                type: "number",
                default: "0.4",
                description:
                  "Intensity of the outer corona glow effect (0-1).",
              },
              {
                name: "scale",
                type: "number",
                default: "0.85",
                description:
                  "Overall scale of the eye within the container (0.5-2).",
              },
              {
                name: "noiseScale",
                type: "number",
                default: "1.0",
                description:
                  "Scale of the noise pattern used for iris texturing (0.5-3).",
              },
              {
                name: "pupilFollow",
                type: "number",
                default: "1.0",
                description:
                  "How much the pupil follows the cursor (0 = fixed, 2 = exaggerated).",
              },
              {
                name: "speed",
                type: "number",
                default: "1.0",
                description:
                  "Animation speed multiplier. Lower values = slower, cinematic feel.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional Tailwind classes on the container div.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="color-variants" title="Color Variants">
          <CodeBlock
            code={`{/* Default cosmic nebula */}
<CosmicEye />

{/* Fire eye */}
<CosmicEye color="#ef4444" accentColor="#fbbf24" intensity={2.0} />

{/* Frost eye */}
<CosmicEye color="#38bdf8" accentColor="#e2e8f0" speed={0.6} />

{/* Emerald eye */}
<CosmicEye color="#10b981" accentColor="#a7f3d0" />`}
            filename="Color variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="sizing" title="Sizing & Layout">
          <CodeBlock
            code={`{/* Fixed height container */}
<div className="h-[400px] w-full rounded-2xl overflow-hidden">
  <CosmicEye />
</div>

{/* Card-sized eye */}
<div className="h-48 w-48 rounded-full overflow-hidden">
  <CosmicEye scale={1.2} pupilSize={0.4} />
</div>`}
            filename="Sizing"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="tuning" title="Fine-Tuning">
          <CodeBlock
            code={`{/* Large pupil, narrow iris */}
<CosmicEye pupilSize={0.8} irisWidth={0.15} />

{/* Strong glow, slow animation */}
<CosmicEye glowIntensity={0.8} speed={0.4} />

{/* No pupil tracking */}
<CosmicEye pupilFollow={0} />`}
            filename="Fine-tuning"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "OGL is dynamically imported on mount -- no server-side WebGL execution.",
              "Uses a single fullscreen triangle (3 vertices) -- minimal geometry overhead.",
              "Noise texture is generated once at 256x256 using a deterministic seed -- no Math.random.",
              "DPR is capped at 2 to prevent excessive fragment shader load on high-DPI screens.",
              "WebGL context is explicitly lost on unmount to free GPU memory.",
              "Mouse lerp runs at 0.05 factor for smooth, low-jitter tracking without extra RAF calls.",
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
              "<canvas> is purely decorative -- no meaningful content for screen readers.",
              "Add aria-label='Animated cosmic eye' to the container if used as a focal element.",
              "The component renders a static placeholder until mounted to avoid hydration mismatch.",
              "Animation respects the container's visibility -- hidden containers don't run the render loop.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Eye renders as a black rectangle",
              a: "Make sure the container has a non-zero height. CosmicEye fills its parent -- use h-[500px] or similar on the wrapper.",
            },
            {
              q: "WebGL context lost warnings in console",
              a: "This is normal during hot module replacement (HMR). The component recreates the context on remount.",
            },
            {
              q: "Pupil doesn't follow cursor",
              a: "Check that pupilFollow is not set to 0. Also ensure the container receives mouse events (no pointer-events-none overlay).",
            },
            {
              q: "Module not found: ogl",
              a: 'Run npm install ogl. The component dynamically imports ogl at runtime.',
            },
            {
              q: "Shader compilation error on older devices",
              a: "The fragment shader uses highp precision. Some older mobile GPUs may not support this -- try mediump as a fallback.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
