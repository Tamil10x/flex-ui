import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { LiquidButtonPlayground } from "./playground";
import { LiquidButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Liquid Button — FlexUI",
  description:
    "A button whose surface ripples like liquid mercury when hovered and clicked.",
};

const liquidButtonSource = `"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

let liquidRippleId = 0;

export function LiquidButton({
  children,
  className,
  color = "#8B5CF6",
  onClick,
  disabled = false,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++liquidRippleId;
      setRipples((prev) => [...prev, { id, x, y }]);
      onClick?.();
    },
    [disabled, onClick]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={disabled ? undefined : { filter: "hue-rotate(15deg)" }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative overflow-hidden px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900/80 text-white border border-white/[0.08] backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {hovered && !disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          style={{
            background: \\\`radial-gradient(120px circle at \\\${mousePos.x}px \\\${mousePos.y}px, \\\${color}, transparent 70%)\\\`,
          }}
        />
      )}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x, top: ripple.y, x: "-50%", y: "-50%",
              backgroundColor: color,
            }}
            initial={{ scale: 0, opacity: 0.4, width: 20, height: 20 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}`;

export default function LiquidButtonDoc() {
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
          Liquid Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button whose surface ripples like liquid mercury when hovered and
          clicked. Multiple organic ripple waves expand from the cursor position
          with spring physics for a slow, organic feel.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <LiquidButtonPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <LiquidButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/liquid-button"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/liquid-button.tsx
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
                  code={liquidButtonSource}
                  filename="components/flexui/liquid-button.tsx"
                  language="tsx"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { LiquidButton } from "@/components/flexui/liquid-button";`}
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
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description: "Hex color for the ripple effect and hover glow.",
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
                  "Disables the button, hover effects, and ripple animation.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Multi-Wave Ripples", desc: "Primary and secondary ripple waves expand from the click point with spring physics for an organic feel." },
            { icon: "o", label: "Cursor-Tracking Glow", desc: "A radial gradient glow follows the mouse position across the button surface on hover." },
            { icon: "#", label: "Hue-Rotate on Hover", desc: "Framer Motion applies a subtle 15-degree hue rotation on hover for a color-shift effect." },
            { icon: "+", label: "Disabled State", desc: "Full disabled support with reduced opacity, no-cursor, and suppressed hover/ripple effects." },
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
        <DocSubSection id="custom-color" title="Custom Ripple Color">
          <CodeBlock code={`<LiquidButton color="#10B981" onClick={() => alert("Clicked!")}>
  Emerald Ripple
</LiquidButton>`} filename="color.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="full-width-btn" title="Full-Width Button">
          <CodeBlock code={`<LiquidButton className="w-full justify-center" color="#EC4899">
  Full Width Action
</LiquidButton>`} filename="full-width.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a native <button> element with proper disabled and aria-disabled attributes.", "Ripple overlays use pointer-events-none so they never block click events on the button content.", "The button label is wrapped in a z-10 span to ensure text remains above all visual effects.", "Spring tap animation (scale 0.96) provides tactile feedback that reinforces the click action."].map((note, i) => (
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
