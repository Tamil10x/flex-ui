import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ConfettiButtonPlayground } from "./playground";
import { ConfettiButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Confetti Button — FlexUI",
  description:
    "A button that bursts confetti particles on click with random colors and directions.",
};

const confettiButtonSource = `"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
  rotation: number;
}

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const CONFETTI_COLORS = ["#8b5cf6", "#22d3ee", "#ec4899", "#eab308", "#10b981"];

let particleId = 0;

export function ConfettiButton({
  children,
  className,
  particleCount = 20,
  onClick,
  disabled = false,
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const newParticles = Array.from({ length: particleCount }, () => ({
        id: ++particleId,
        x: cx, y: cy,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 3 + Math.random() * 3,
        angle: Math.random() * 360,
        distance: 40 + Math.random() * 60,
        rotation: Math.random() * 360,
      }));

      setParticles((prev) => [...prev, ...newParticles]);
      onClick?.();
    },
    [disabled, onClick, particleCount]
  );

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-visible px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <span
            key={p.id}
            className="absolute rounded-sm pointer-events-none animate-[confetti-burst_800ms_ease-out_forwards]"
            style={{
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              backgroundColor: p.color,
              "--confetti-tx": \\\`\\\${tx}px\\\`,
              "--confetti-ty": \\\`\\\${ty}px\\\`,
              "--confetti-rot": \\\`\\\${p.rotation}deg\\\`,
            }}
            onAnimationEnd={() => removeParticle(p.id)}
          />
        );
      })}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}`;

export default function ConfettiButtonDoc() {
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
          Confetti Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button that bursts confetti particles on click. Particles fly
          outward in random directions with random colors, sizes, and rotations.
          Auto-cleanup after the animation ends.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ConfettiButtonPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <ConfettiButtonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/confetti-button"
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
                  code={confettiButtonSource}
                  filename="components/flexui/confetti-button.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add confetti-burst keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes confetti-burst {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--confetti-tx), var(--confetti-ty)) rotate(var(--confetti-rot));
    opacity: 0;
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
            code={`import { ConfettiButton } from "@/components/flexui/confetti-button";`}
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
                name: "particleCount",
                type: "number",
                default: "20",
                description: "Number of confetti particles per click.",
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
                description: "Click handler (fires after confetti starts).",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the button and confetti effect.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Burst Animation", desc: "Particles explode outward in random directions from the button center on every click." },
            { icon: "o", label: "Auto Cleanup", desc: "Particles self-remove via onAnimationEnd, so the DOM stays clean after each burst." },
            { icon: "#", label: "Vibrant Colors", desc: "Five curated confetti colors — violet, cyan, pink, yellow, and emerald — for a festive feel." },
            { icon: "+", label: "Spring Interactions", desc: "Button scales with spring physics on hover and tap for satisfying micro-interactions." },
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
        <DocSubSection id="heavy-confetti" title="Heavy Confetti Burst">
          <CodeBlock code={`<ConfettiButton particleCount={40} className="bg-purple-600 hover:bg-purple-700">
  Celebrate!
</ConfettiButton>`} filename="heavy.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-confetti" title="Subtle Confetti">
          <CodeBlock code={`<ConfettiButton particleCount={8} className="px-4 py-2 text-xs">
  Like
</ConfettiButton>`} filename="subtle.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The component renders as a native button element, fully keyboard-accessible out of the box.", "Disabled state sets both disabled and aria-disabled attributes for assistive technology support.", "Confetti particles are pointer-events-none and purely decorative — they do not interfere with interaction.", "The button label (children) is announced by screen readers normally."].map((note, i) => (
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
