import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GradientBorderButtonPlayground } from "./playground";
import { GradientBorderButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Gradient Border Button — FlexUI",
  description:
    "A button with a continuously rotating conic-gradient border animation.",
};

const gradientBorderButtonSource = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  borderWidth?: number;
  speed?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function GradientBorderButton({
  children,
  className,
  colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#6366f1"],
  borderWidth = 1.5,
  speed = 3,
  onClick,
  disabled = false,
}: GradientBorderButtonProps) {
  const gradient = \\\`conic-gradient(from 0deg, \\\${colors.join(", ")})\\\`;

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 text-sm font-semibold rounded-xl",
        "text-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{ padding: 0 }}
    >
      <span className="absolute inset-0 rounded-xl overflow-hidden" style={{ padding: borderWidth }}>
        <span
          className="absolute inset-[-50%] animate-[border-rotate_linear_infinite]"
          style={{ background: gradient, animationDuration: \\\`\\\${speed}s\\\` }}
        />
      </span>
      <span className="relative z-10 block rounded-xl bg-zinc-950 px-8 py-4" style={{ margin: borderWidth }}>
        {children}
      </span>
    </motion.button>
  );
}`;

export default function GradientBorderButtonDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
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
          Gradient Border Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button with a continuously rotating conic-gradient border. The inner
          background stays solid dark while the border flows with color. Fully
          configurable colors, speed, and border width.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <GradientBorderButtonPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <GradientBorderButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/gradient-border-button"
                filename="Terminal"
              />
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
                  code={gradientBorderButtonSource}
                  filename="components/flexui/gradient-border-button.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add border-rotate keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes border-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`}
                  filename="app/globals.css"
                  language="css"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { GradientBorderButton } from "@/components/flexui/gradient-border-button";`}
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
                description: "Button content.",
                required: true,
              },
              {
                name: "colors",
                type: "string[]",
                default: '["#6366f1","#8b5cf6","#d946ef","#ec4899","#6366f1"]',
                description: "Array of hex colors for the conic-gradient.",
              },
              {
                name: "borderWidth",
                type: "number",
                default: "1.5",
                description: "Width of the gradient border in pixels.",
              },
              {
                name: "speed",
                type: "number",
                default: "3",
                description: "Rotation speed in seconds per full rotation.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes.",
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
                description: "Disables the button and hover effects.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Rotating Gradient", desc: "A conic-gradient border continuously rotates with configurable speed for an eye-catching shimmer." },
            { icon: "o", label: "Custom Color Stops", desc: "Pass an array of hex colors to fully control the gradient palette of the rotating border." },
            { icon: "#", label: "Spring Interactions", desc: "Framer Motion spring scale on hover and tap gives tactile button feedback." },
            { icon: "+", label: "Adjustable Border", desc: "Control border width precisely in pixels while maintaining a solid dark inner background." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="warm-gradient" title="Warm Color Gradient">
          <CodeBlock code={`<GradientBorderButton
  colors={["#f97316", "#ef4444", "#ec4899", "#f97316"]}
  speed={2}
  borderWidth={2}
>
  Subscribe Now
</GradientBorderButton>`} filename="warm.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="slow-border" title="Slow Thick Border">
          <CodeBlock code={`<GradientBorderButton
  colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#06b6d4"]}
  speed={6}
  borderWidth={3}
  className="text-lg"
>
  Explore
</GradientBorderButton>`} filename="slow.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a native <button> with proper disabled and aria-disabled attributes for assistive technologies.", "The rotating gradient border is purely decorative and does not affect the interactive button area.", "Keyboard focus and activation work natively since the component extends the standard button element."].map((note, i) => (
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
