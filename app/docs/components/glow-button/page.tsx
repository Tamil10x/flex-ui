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
    </div>
  );
}
