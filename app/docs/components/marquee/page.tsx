import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MarqueePlayground } from "./playground";
import { MarqueeExamples } from "./examples";

export const metadata: Metadata = {
  title: "Marquee — FlexUI",
  description:
    "A reusable infinite horizontal scrolling component with configurable speed, direction, and hover pause.",
};

const marqueeSource = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  direction = "left",
  speed = 30,
  pauseOnHover = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        className
      )}
    >
      {/* Left fade mask */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-zinc-950 to-transparent" />

      {/* Right fade mask */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-zinc-950 to-transparent" />

      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-4",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: \\\`marquee-scroll \\\${speed}s linear infinite\\\`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}`;

export default function MarqueeDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS Animation
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Marquee
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A reusable infinite horizontal scrolling component. Pure CSS
          translateX animation for optimal performance with configurable speed,
          direction, and hover-to-pause support.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <MarqueePlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <MarqueeExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/marquee"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/marquee.tsx
                </code>
                . No additional dependencies required.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component source
                </p>
                <CodeBlock
                  code={marqueeSource}
                  filename="components/flexui/marquee.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add marquee keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}`}
                  filename="app/globals.css"
                  language="css"
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
              label: "Pure CSS Animation",
              desc: "translateX keyframe runs on the compositor thread -- zero JavaScript overhead during scroll.",
            },
            {
              icon: "o",
              label: "Seamless Loop",
              desc: "Content is duplicated N times to ensure a gapless infinite scroll effect.",
            },
            {
              icon: "#",
              label: "Fade Masks",
              desc: "Gradient overlays on both edges create a smooth fade-in/out for content entering and leaving view.",
            },
            {
              icon: "+",
              label: "Hover Pause",
              desc: "Optional pauseOnHover uses CSS animation-play-state for instant pause with no JS re-renders.",
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
            code={`import { Marquee } from "@/components/flexui/marquee";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content to scroll. Duplicated repeat times for seamless loop.",
                required: true,
              },
              {
                name: "direction",
                type: '"left" | "right"',
                default: '"left"',
                description: "Scroll direction.",
              },
              {
                name: "speed",
                type: "number",
                default: "30",
                description: "Duration in seconds for one full animation cycle.",
              },
              {
                name: "pauseOnHover",
                type: "boolean",
                default: "false",
                description: "Pauses the animation when the user hovers over the marquee.",
              },
              {
                name: "repeat",
                type: "number",
                default: "4",
                description: "Number of content duplicates for seamless looping.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn().",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="direction-speed" title="Direction & Speed">
          <CodeBlock
            code={`{/* Right-scrolling, fast */}
<Marquee direction="right" speed={15}>
  {items}
</Marquee>

{/* Slow, left (default) */}
<Marquee speed={60}>
  {items}
</Marquee>`}
            filename="Config variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-content" title="Custom Content">
          <CodeBlock
            code={`{/* Logo wall */}
<Marquee pauseOnHover>
  {logos.map((logo) => (
    <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-8" />
  ))}
</Marquee>

{/* Testimonial ticker */}
<Marquee speed={40} direction="right">
  {testimonials.map((t) => (
    <TestimonialCard key={t.id} {...t} />
  ))}
</Marquee>`}
            filename="Content patterns"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Pure CSS translateX animation runs on the GPU compositor thread -- no JavaScript animation loop.",
              "No Framer Motion dependency -- keeps the bundle small.",
              "Pause on hover uses CSS animation-play-state, avoiding React re-renders.",
              "Fade masks use CSS gradients with pointer-events-none so they never block interaction.",
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
              "Content is duplicated in the DOM -- use aria-hidden on duplicate copies if content is meaningful.",
              "pauseOnHover allows users to stop motion and read content.",
              "Consider prefers-reduced-motion media query to disable animation for users who prefer less motion.",
              "Ensure marquee content is not the only way to access important information.",
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
