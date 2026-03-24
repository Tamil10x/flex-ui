import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PreloaderPlayground } from "./playground";
import { PreloaderExamples } from "./examples";
import { Film, Zap, Eye, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Preloader — FlexUI",
  description:
    "A kinetic loading sequence that decelerates an image strip before scaling the hero asset to full screen.",
};

const preloaderSource = `"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

// Full source at components/flexui/preloader.tsx`;

export default function PreloaderDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Cinematic
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            useAnimate
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Preloader
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A kinetic loading sequence that sweeps an image strip across the screen with
          deceleration physics, converges non-hero images down, then scales the
          center hero asset to full screen with a border-radius morph. Features
          an edge-masked strip, ambient accent glow, and a subtle progress bar.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <PreloaderPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <PreloaderExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock code="npx shadcn@latest add @flexui/preloader" filename="Terminal" />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">components/flexui/preloader.tsx</code>.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">1. Install dependency</p>
                <CodeBlock code="npm install framer-motion" filename="Terminal" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">2. Copy component source</p>
                <CodeBlock code={preloaderSource} filename="components/flexui/preloader.tsx" language="tsx" />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Film className="h-4 w-4 text-blue-400" />, label: "Kinetic Strip Sweep", desc: "Images fly in from the right with staggered timing and deceleration physics, creating a cinematic reveal sequence." },
            { icon: <Eye className="h-4 w-4 text-blue-400" />, label: "Hero Scale-Up", desc: "The center image scales to full viewport with a smooth border-radius morph while non-hero images blur and fade away." },
            { icon: <Layers className="h-4 w-4 text-blue-400" />, label: "Edge-Masked Strip", desc: "A CSS mask gradient fades the strip edges to transparent, giving a clean horizontal portal effect." },
            { icon: <Zap className="h-4 w-4 text-blue-400" />, label: "Progress & Glow", desc: "An optional progress bar tracks the animation phases. Ambient accent glow adds depth behind the image strip." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock code={`import { Preloader, PreloaderTrigger } from "@/components/flexui/preloader";`} filename="Named exports" />
        </DocSubSection>

        <DocSubSection id="preloader-props" title="Preloader Props">
          <ApiTable
            rows={[
              { name: "images", type: "PreloaderImage[]", default: "—", description: "Array of { src, alt? } objects for the image strip.", required: true },
              { name: "onComplete", type: "() => void", default: "—", description: "Callback fired when the entire animation sequence finishes." },
              { name: "sweepDuration", type: "number", default: "2.2", description: "Duration of the strip sweep phase in seconds." },
              { name: "scaleDuration", type: "number", default: "1.6", description: "Duration of the hero scale-up phase in seconds." },
              { name: "accentColor", type: "string", default: "var(--flexui-accent)", description: "CSS color for the progress bar and ambient glow." },
              { name: "showProgress", type: "boolean", default: "true", description: "Show the progress bar at the bottom of the overlay." },
              { name: "className", type: "string", default: "—", description: "Additional Tailwind classes for the overlay container." },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="trigger-props" title="PreloaderTrigger Props">
          <ApiTable
            rows={[
              { name: "onClick", type: "() => void", default: "—", description: "Click handler — typically sets state to show the Preloader." },
              { name: "label", type: "string", default: '"Launch Preloader"', description: "Button label text." },
              { name: "accentColor", type: "string", default: "var(--flexui-accent)", description: "Accent color for hover glow." },
              { name: "className", type: "string", default: "—", description: "Additional Tailwind classes." },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="image-type" title="PreloaderImage Type">
          <CodeBlock
            code={`interface PreloaderImage {
  src: string;
  alt?: string;
}`}
            filename="types.ts"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="animation-phases" title="Animation Phases">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <div className="space-y-4">
            {[
              { phase: "1", title: "Kinetic Sweep", desc: "Images enter from the right with stagger delay (0.06s each). Deceleration easing creates the kinetic feel." },
              { phase: "2", title: "Converge", desc: "Non-hero images scale down to 60% and blur-fade out. The hero image centers itself." },
              { phase: "3", title: "Hero Expand", desc: "The hero image scales from its card size to 100vw × 100dvh. Border radius morphs from 0.75rem to 0." },
              { phase: "4", title: "Fade Out", desc: "The entire overlay fades to transparent. onComplete fires. Overlay is removed from DOM." },
            ].map((item) => (
              <div key={item.phase} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-[10px] font-bold text-purple-400">
                  {item.phase}
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Overlay uses fixed positioning with z-index 9999 to cover all content.",
              "Images have alt attributes for screen readers.",
              "Animation completes automatically — no user interaction required to dismiss.",
              "Progress bar provides visual feedback on loading state.",
              "Respects prefers-reduced-motion when used with the a11y utilities.",
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
