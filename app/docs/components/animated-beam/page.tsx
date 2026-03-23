import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AnimatedBeamPlayground } from "./playground";
import { AnimatedBeamExamples } from "./examples";

export const metadata: Metadata = {
  title: "Animated Beam — FlexUI",
  description:
    "An animated light beam that travels along an SVG path — used for integration diagrams showing data flow.",
};

const animatedBeamSource = `"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

// Animated SVG light beam that travels along a path.
// Full source: npx shadcn@latest add @flexui/animated-beam`;

export default function AnimatedBeamDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS Animation
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Animated Beam
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated light beam that travels along an SVG path. Perfect for
          integration diagrams, data flow visualizations, and connection
          illustrations.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <AnimatedBeamPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <AnimatedBeamExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/animated-beam"
                filename="Terminal"
              />
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy the component file
                </p>
                <CodeBlock code={animatedBeamSource} filename="components/flexui/animated-beam.tsx" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add the keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes beam-travel {
  0% { stroke-dashoffset: 2060; }
  100% { stroke-dashoffset: 0; }
}

@utility animate-beam-travel {
  animation: beam-travel 3s linear infinite;
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
              label: "SVG Path Animation",
              desc: "Beam travels along any SVG path data string using stroke-dashoffset animation.",
            },
            {
              icon: "*",
              label: "Glow Effect",
              desc: "Built-in SVG feGaussianBlur filter creates a soft neon glow around the beam.",
            },
            {
              icon: "#",
              label: "Staggered Delays",
              desc: "Stack multiple beams with different delays for data flow diagrams.",
            },
            {
              icon: ">",
              label: "Zero Dependencies",
              desc: "Pure CSS keyframe animation with no runtime JS overhead.",
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
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { AnimatedBeam } from "@/components/flexui/animated-beam";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="AnimatedBeam Props">
          <ApiTable
            rows={[
              {
                name: "pathData",
                type: "string",
                default: "required",
                description: "SVG path data string (d attribute) for the beam to follow.",
              },
              {
                name: "color",
                type: "string",
                default: '"#389CFD"',
                description: "Color of the beam.",
              },
              {
                name: "width",
                type: "number",
                default: "2",
                description: "Stroke width of the beam and track.",
              },
              {
                name: "speed",
                type: "number",
                default: "3",
                description: "Duration in seconds for one full traversal.",
              },
              {
                name: "trackColor",
                type: "string",
                default: '"rgba(255,255,255,0.06)"',
                description: "Color of the dim track line showing the route.",
              },
              {
                name: "delay",
                type: "number",
                default: "0",
                description: "Delay in seconds before the animation starts.",
              },
              {
                name: "className",
                type: "string",
                default: '""',
                description: "Additional classes on the SVG element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="integration-diagram" title="Integration Diagram">
          <CodeBlock
            code={`{/* Stack multiple beams with staggered delays */}
<div className="relative w-full h-40">
  <AnimatedBeam
    pathData="M 50,20 C 150,20 250,80 350,80"
    color="#389CFD" delay={0}
  />
  <AnimatedBeam
    pathData="M 50,80 C 150,80 250,20 350,20"
    color="#a78bfa" delay={1.5}
  />
</div>`}
            filename="Integration diagram"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-path" title="Custom Path Shapes">
          <CodeBlock
            code={`{/* S-curve beam */}
<AnimatedBeam
  pathData="M 0,50 C 100,0 200,100 300,50 C 400,0 500,100 600,50"
  color="#34d399"
  speed={4}
/>

{/* Arc beam */}
<AnimatedBeam
  pathData="M 50,100 Q 300,0 550,100"
  color="#f97316"
  width={3}
/>`}
            filename="Custom paths"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "SVG beams are purely decorative — add aria-hidden='true' when used alongside meaningful content.",
              "The track line provides a static visual reference for users with reduced motion preferences.",
              "Consider adding @media (prefers-reduced-motion: reduce) to pause the animation.",
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
