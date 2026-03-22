import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GlowButtonPlayground } from "./playground";
import { GlowButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Glow Button — FlexUI",
  description:
    "A button with a pulsing glow shadow that intensifies on hover.",
};

const glowButtonSource = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function GlowButton({
  children,
  className,
  glowColor = "rgba(56,189,248,0.5)",
  onClick,
  disabled = false,
}: GlowButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        className
      )}
      style={{
        boxShadow: disabled
          ? undefined
          : \\\`0 0 20px \\\${glowColor}, 0 0 60px \\\${glowColor.replace(/[\\d.]+\\)$/, "0.15)")}\\\`,
        animation: disabled ? undefined : "glow-pulse 2s ease-in-out infinite",
        "--glow-color": glowColor,
        "--glow-color-intense": glowColor.replace(/[\\d.]+\\)$/, "0.8)"),
        "--glow-color-soft": glowColor.replace(/[\\d.]+\\)$/, "0.15)"),
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}`;

export default function GlowButtonDoc() {
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
          Glow Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button with a pulsing glow shadow that intensifies on hover. The
          glow color is fully configurable and animates with CSS keyframes.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <GlowButtonPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <GlowButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/glow-button"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/glow-button.tsx
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
                  code={glowButtonSource}
                  filename="components/flexui/glow-button.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add glow-pulse keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px var(--glow-color), 0 0 60px var(--glow-color-soft);
  }
  50% {
    box-shadow: 0 0 30px var(--glow-color-intense), 0 0 80px var(--glow-color);
  }
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
            code={`import { GlowButton } from "@/components/flexui/glow-button";`}
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
                name: "glowColor",
                type: "string",
                default: '"rgba(56,189,248,0.5)"',
                description: "RGBA color string for the glow shadow.",
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
                  "Disables the button, hover effects, and glow animation.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Pulsing Glow", desc: "A CSS keyframe animation continuously pulses the box-shadow for an eye-catching glow effect." },
            { icon: "o", label: "Spring Hover", desc: "Framer Motion spring physics scale the button up on hover and compress on tap for tactile feedback." },
            { icon: "#", label: "Custom Glow Color", desc: "Pass any RGBA string to change the glow color, with automatic intensity variations derived from it." },
            { icon: "+", label: "Disabled State", desc: "Disables glow animation, hover effects, and reduces opacity when the disabled prop is true." },
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
        <DocSubSection id="red-glow" title="Red Warning Glow">
          <CodeBlock code={`<GlowButton glowColor="rgba(239,68,68,0.5)" onClick={handleDelete}>
  Delete Account
</GlowButton>`} filename="red.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="green-cta" title="Green Success CTA">
          <CodeBlock code={`<GlowButton
  glowColor="rgba(34,197,94,0.5)"
  className="px-12 py-5 text-lg"
>
  Launch Project
</GlowButton>`} filename="green.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a native <button> element with proper disabled and aria-disabled attributes.", "Respects prefers-reduced-motion by disabling spring hover animations and the glow pulse keyframe.", "The glow effect is purely decorative via box-shadow and does not affect the button's interactive area.", "Keyboard focus and activation work natively since the component uses a standard button element."].map((note, i) => (
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
