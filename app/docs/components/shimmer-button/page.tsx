import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ShimmerButtonPlayground } from "./playground";
import { ShimmerButtonExamples } from "./examples";
import { Sparkles, MousePointerClick, Settings2, Blocks } from "lucide-react";

export const metadata: Metadata = {
  title: "Shimmer Button — FlexUI",
  description:
    "A button with an animated shimmer sweep effect that continuously runs across the surface.",
};

const shimmerButtonSource = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "200px",
  borderRadius = "12px",
  disabled = false,
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden px-8 py-4 text-sm font-semibold",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:shadow-none",
        className
      )}
      style={{ borderRadius }}
    >
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: \\\`linear-gradient(105deg, transparent 40%, \\\${shimmerColor}10 45%, \\\${shimmerColor}20 50%, \\\${shimmerColor}10 55%, transparent 60%)\\\`,
            backgroundSize: shimmerSize,
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}`;

export default function ShimmerButtonDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Shimmer Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button with an animated shimmer sweep effect that continuously runs
          across the surface. Dark theme with configurable shimmer color and
          size.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ShimmerButtonPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <ShimmerButtonExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/shimmer-button"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/shimmer-button.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependency
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
                  code={shimmerButtonSource}
                  filename="components/flexui/shimmer-button.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add shimmer keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@utility animate-shimmer {
  animation: shimmer 2s linear infinite;
}`}
                  filename="app/globals.css"
                  language="css"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  4. Requires{" "}
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
              icon: <Sparkles className="h-4 w-4 text-blue-400" />,
              label: "CSS Shimmer",
              desc: "Continuous shimmer sweep using CSS keyframes for optimal performance — no JS animation overhead.",
            },
            {
              icon: <MousePointerClick className="h-4 w-4 text-blue-400" />,
              label: "Spring Interactions",
              desc: "Framer Motion whileHover/whileTap scale for satisfying press feedback.",
            },
            {
              icon: <Settings2 className="h-4 w-4 text-blue-400" />,
              label: "Configurable",
              desc: "Customize shimmer color, size, and border radius via simple string props.",
            },
            {
              icon: <Blocks className="h-4 w-4 text-blue-400" />,
              label: "Composable",
              desc: "Pass className for full style control — cn() merges your Tailwind classes cleanly.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
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
            code={`import { ShimmerButton } from "@/components/flexui/shimmer-button";`}
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
                description: "Button content (text, icons, etc).",
                required: true,
              },
              {
                name: "shimmerColor",
                type: "string",
                default: '"#ffffff"',
                description:
                  "Hex color for the shimmer sweep gradient.",
              },
              {
                name: "shimmerSize",
                type: "string",
                default: '"200px"',
                description:
                  "CSS background-size for the shimmer gradient.",
              },
              {
                name: "borderRadius",
                type: "string",
                default: '"12px"',
                description:
                  "CSS border-radius applied to the button and shimmer layer.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn().",
              },
              {
                name: "onClick",
                type: "() => void",
                default: "\u2014",
                description: "Click handler.",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description:
                  "Disables the button, hover effects, and reduces opacity.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="shimmer-colors" title="Custom Shimmer Colors">
          <CodeBlock
            code={`{/* Purple shimmer */}
<ShimmerButton shimmerColor="#c084fc">Purple Glow</ShimmerButton>

{/* Gold shimmer */}
<ShimmerButton shimmerColor="#fbbf24">Gold Glow</ShimmerButton>

{/* Cyan shimmer */}
<ShimmerButton shimmerColor="#22d3ee">Cyan Glow</ShimmerButton>`}
            filename="Color variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-styles" title="Swap Styles with className">
          <CodeBlock
            code={`{/* Gradient background */}
<ShimmerButton className="bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/20">
  Gradient
</ShimmerButton>

{/* Pill shape */}
<ShimmerButton borderRadius="9999px">
  Pill Button
</ShimmerButton>

{/* Large CTA */}
<ShimmerButton className="px-12 py-5 text-lg">
  Get Started
</ShimmerButton>`}
            filename="Style variants"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Shimmer uses CSS @keyframes — runs on the compositor thread, zero JS overhead.",
              "Framer Motion only handles hover/tap scale — minimal React re-renders.",
              "Pseudo-element approach via wrapper div with overflow-hidden keeps shimmer contained.",
              "No layout shifts — shimmer layer is position: absolute with inset-0.",
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
              "Renders as a native <button> element — fully keyboard accessible.",
              "Supports disabled state which prevents interaction and reduces opacity.",
              "Shimmer animation is purely decorative — does not affect content readability.",
              "Add aria-label when using icon-only buttons.",
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
