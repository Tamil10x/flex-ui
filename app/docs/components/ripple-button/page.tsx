import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { RippleButtonPlayground } from "./playground";
import { RippleButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Ripple Button — FlexUI",
  description:
    "A Material-design-style ripple effect button with expanding circle on click.",
};

const rippleButtonSource = `"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

let rippleId = 0;

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.3)",
  onClick,
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      const id = ++rippleId;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      onClick?.();
    },
    [disabled, onClick]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-[ripple-expand_600ms_ease-out_forwards] pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}`;

export default function RippleButtonDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Pure CSS
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Ripple Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A Material-design-style ripple effect button. On click, an expanding
          circle radiates from the click position and fades out. Multiple ripples
          can stack.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <RippleButtonPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <RippleButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/ripple-button"
                filename="Terminal"
              />
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component source
                </p>
                <CodeBlock
                  code={rippleButtonSource}
                  filename="components/flexui/ripple-button.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add ripple-expand keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes ripple-expand {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
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
            code={`import { RippleButton } from "@/components/flexui/ripple-button";`}
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
                name: "rippleColor",
                type: "string",
                default: '"rgba(255,255,255,0.3)"',
                description: "Color of the expanding ripple circle.",
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
                description: "Click handler (fires after ripple starts).",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the button and ripple effect.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
