import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AmbientTiltPlayground } from "./playground";
import { AmbientTiltExamples } from "./examples";

export const metadata: Metadata = {
  title: "Ambient Tilt — FlexUI",
  description:
    "A wrapper that adds subtle 3D tilt to children based on cursor position or device gyroscope.",
};

const ambientTiltSource = `"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientTiltProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
  useGyroscope?: boolean;
}

export function AmbientTilt({
  children, className,
  maxAngle = 8, perspective = 1000,
  stiffness = 100, damping = 20,
  useGyroscope = true,
}: AmbientTiltProps) {
  // ... see source for full implementation
}`;

export default function AmbientTiltDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            framer-motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Ambient Tilt
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A wrapper that adds subtle 3D tilt to its children based on cursor
          position (desktop) or device gyroscope (mobile). Uses
          spring-animated transforms for a smooth, natural feel.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <AmbientTiltPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AmbientTiltExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/ambient-tilt"
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
                <CodeBlock code={ambientTiltSource} filename="components/flexui/ambient-tilt.tsx" language="tsx" />
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
              icon: "3D",
              label: "Cursor-Aware 3D Tilt",
              desc: "Tracks mouse position relative to the viewport and tilts the wrapper toward the cursor.",
            },
            {
              icon: "G",
              label: "Gyroscope Support",
              desc: "On mobile devices, uses DeviceOrientationEvent beta/gamma for native tilt tracking.",
            },
            {
              icon: "~",
              label: "Spring Physics",
              desc: "useSpring for smooth interpolation — configurable stiffness and damping for different feels.",
            },
            {
              icon: "P",
              label: "Preserve-3D",
              desc: "Children participate in the 3D space via transform-style: preserve-3d for layered depth effects.",
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
        <DocSubSection id="props" title="AmbientTilt Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "-",
                description: "Content to apply 3D tilt to.",
              },
              {
                name: "className",
                type: "string",
                default: "-",
                description: "Additional CSS classes on the wrapper.",
              },
              {
                name: "maxAngle",
                type: "number",
                default: "8",
                description:
                  "Maximum tilt angle in degrees. Higher = more dramatic.",
              },
              {
                name: "perspective",
                type: "number",
                default: "1000",
                description:
                  "CSS perspective distance in px. Lower = more extreme 3D.",
              },
              {
                name: "stiffness",
                type: "number",
                default: "100",
                description:
                  "Spring stiffness. Higher = snappier response.",
              },
              {
                name: "damping",
                type: "number",
                default: "20",
                description:
                  "Spring damping. Higher = less oscillation.",
              },
              {
                name: "useGyroscope",
                type: "boolean",
                default: "true",
                description:
                  "Enable device gyroscope input on mobile devices.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="dramatic" title="Dramatic Tilt">
          <CodeBlock
            code={`<AmbientTilt maxAngle={16} perspective={600}>
  <img src="/card.png" className="rounded-2xl" />
</AmbientTilt>`}
            filename="Dramatic tilt"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="lazy-spring" title="Lazy Spring Follow">
          <CodeBlock
            code={`<AmbientTilt stiffness={30} damping={40} maxAngle={5}>
  <div className="glass-card p-8">
    Smooth, trailing motion
  </div>
</AmbientTilt>`}
            filename="Lazy spring"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="no-gyro" title="Desktop Only (No Gyroscope)">
          <CodeBlock
            code={`<AmbientTilt useGyroscope={false}>
  <HeroSection />
</AmbientTilt>`}
            filename="Desktop only"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Uses Framer Motion useMotionValue — zero React re-renders during mouse movement.",
              "useSpring handles interpolation on the GPU-accelerated transform pipeline.",
              "Window-level mouse listener is shared — no per-element event handlers.",
              "Gyroscope listener is passive and only added when useGyroscope is true.",
              "Returns to neutral on mouse leave with natural spring deceleration.",
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
              "Tilt is purely decorative — content remains fully readable at all angles.",
              "No content is hidden or displaced by the 3D transform.",
              "Consider disabling for prefers-reduced-motion users by setting maxAngle={0}.",
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
