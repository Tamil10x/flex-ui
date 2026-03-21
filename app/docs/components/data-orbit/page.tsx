import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { DataOrbitPlayground } from "./playground";
import { DataOrbitExamples } from "./examples";

export const metadata: Metadata = {
  title: "Data Orbit — FlexUI",
  description:
    "Icons and elements orbiting in concentric rings around a center element, with counter-rotation to stay upright.",
};

const dataOrbitSource = `"use client";
import React from "react";
import { cn } from "@/lib/utils";

// Concentric orbiting rings with counter-rotation.
// Full source: npx shadcn@latest add @flexui/data-orbit`;

export default function DataOrbitDoc() {
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
          Data Orbit
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Icons and elements orbiting in concentric elliptical rings around a
          center element. Each item counter-rotates to stay upright while the
          ring spins. Great for showing tech stacks, integrations, or
          interconnected services.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <DataOrbitPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <DataOrbitExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/data-orbit"
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
                <CodeBlock code={dataOrbitSource} filename="components/flexui/data-orbit.tsx" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add the keyframes to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes orbit-cw {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes orbit-ccw {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@utility animate-orbit-cw {
  animation: orbit-cw 20s linear infinite;
}

@utility animate-orbit-ccw {
  animation: orbit-ccw 20s linear infinite;
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
              icon: "o",
              label: "Concentric Rings",
              desc: "Multiple rings at different radii orbit independently around a shared center.",
            },
            {
              icon: "<>",
              label: "Counter-Rotation",
              desc: "Each icon counter-rotates to stay upright while the ring spins.",
            },
            {
              icon: "~",
              label: "CW & CCW Directions",
              desc: "Mix clockwise and counter-clockwise rings for a dynamic layered effect.",
            },
            {
              icon: ">",
              label: "Zero Dependencies",
              desc: "Pure CSS animation with no runtime JS. Items positioned via transform chains.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-sm font-bold text-purple-400">
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
            code={`import { DataOrbit } from "@/components/flexui/data-orbit";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="DataOrbit Props">
          <ApiTable
            rows={[
              {
                name: "rings",
                type: "OrbitRing[]",
                default: "required",
                description: "Array of orbit ring configurations.",
              },
              {
                name: "center",
                type: "React.ReactNode",
                default: "undefined",
                description: "Element rendered at the center of the orbit.",
              },
              {
                name: "className",
                type: "string",
                default: '""',
                description: "Additional classes on the outer container.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="orbit-ring-type" title="OrbitRing Type">
          <CodeBlock
            code={`interface OrbitRing {
  items: OrbitItem[];        // icons/elements in the ring
  radius: number;            // distance from center in px
  speed?: number;            // seconds per revolution (default 20)
  direction?: "cw" | "ccw";  // clockwise or counter-clockwise (default "cw")
}

interface OrbitItem {
  icon: React.ReactNode;     // the element to render
  label?: string;            // optional text label below the icon
}`}
            filename="types"
            language="typescript"
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="speed-direction" title="Speed & Direction">
          <CodeBlock
            code={`{/* Fast inner ring CW, slow outer ring CCW */}
<DataOrbit
  rings={[
    { radius: 80, speed: 10, direction: "cw", items: [...] },
    { radius: 150, speed: 40, direction: "ccw", items: [...] },
  ]}
/>`}
            filename="Speed & direction"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-center" title="Custom Center">
          <CodeBlock
            code={`<DataOrbit
  center={
    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
      <span className="text-2xl font-bold text-white">AI</span>
    </div>
  }
  rings={[...]}
/>`}
            filename="Custom center"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Orbit animations are purely decorative — add aria-hidden='true' on the container if nearby text describes the content.",
              "Labels are real DOM text and will be read by screen readers.",
              "Consider pausing animation on prefers-reduced-motion for accessibility compliance.",
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
