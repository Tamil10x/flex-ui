import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { DisintegrationEffectPlayground } from "./playground";
import { DisintegrationEffectExamples } from "./examples";

export const metadata: Metadata = {
  title: "Disintegration Effect — FlexUI",
  description:
    "A Thanos-snap style particle dissolve that can wrap any element. Trigger disintegration and reassembly with a boolean prop.",
};

const disintegrationEffectSource = `"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DisintegrationEffectProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  duration?: number;
  colors?: string[];
  trigger?: boolean;
  onComplete?: () => void;
}

const DEFAULT_COLORS = ["#8B5CF6", "#389CFD", "#EC4899", "#22D3EE", "#F59E0B"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
}

export function DisintegrationEffect({
  children,
  className,
  particleCount = 50,
  duration = 1500,
  colors = DEFAULT_COLORS,
  trigger = false,
  onComplete,
}: DisintegrationEffectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateParticles = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return [];
    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const rand = seededRandom(42);
    const newParticles: ParticleData[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = rand() * Math.PI * 2;
      const spread = 50 + rand() * 100;
      newParticles.push({
        id: i, x: rand() * w, y: rand() * h,
        size: 3 + rand() * 3,
        color: colors[Math.floor(rand() * colors.length)],
        dx: Math.cos(angle) * spread,
        dy: Math.sin(angle) * spread,
        rot: rand() * 360,
        delay: rand() * (duration * 0.3),
      });
    }
    return newParticles;
  }, [particleCount, duration, colors]);

  useEffect(() => {
    if (trigger) {
      setParticles(generateParticles());
      timerRef.current = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration + 100);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setParticles([]);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [trigger, generateParticles, duration, onComplete]);

  const particleDurationSec = (duration * 0.7) / 1000;

  return (
    <div ref={wrapperRef} className={cn("relative inline-block", className)}>
      <motion.div
        animate={{ opacity: trigger ? 0 : 1 }}
        transition={{ duration: trigger ? duration / 2000 : 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      {particles.length > 0 && (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-sm"
              style={{
                left: p.x, top: p.y, width: p.size, height: p.size,
                backgroundColor: p.color,
                "--dx": \\\`\\\${p.dx}px\\\`,
                "--dy": \\\`\\\${p.dy}px\\\`,
                "--rot": \\\`\\\${p.rot}deg\\\`,
                animation: \\\`disintegrate-particle \\\${particleDurationSec}s ease-out \\\${p.delay}ms forwards\\\`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}`;

export default function DisintegrationEffectDoc() {
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
          Disintegration Effect
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A Thanos-snap style particle dissolve that wraps any element. Toggle a
          boolean to disintegrate children into colored particles that fly
          outward, then reassemble them by toggling back.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <DisintegrationEffectPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <DisintegrationEffectExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/disintegration-effect"
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
                  code={disintegrationEffectSource}
                  filename="components/flexui/disintegration-effect.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Add disintegrate-particle keyframe to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes disintegrate-particle {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0);
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
            code={`import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";`}
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
                description: "Content to wrap with the disintegration effect.",
                required: true,
              },
              {
                name: "trigger",
                type: "boolean",
                default: "false",
                description:
                  "When true, disintegrates children. When false, reassembles.",
              },
              {
                name: "particleCount",
                type: "number",
                default: "50",
                description: "Number of particles spawned during disintegration.",
              },
              {
                name: "duration",
                type: "number",
                default: "1500",
                description: "Total duration of the effect in milliseconds.",
              },
              {
                name: "colors",
                type: "string[]",
                default:
                  '["#8B5CF6", "#389CFD", "#EC4899", "#22D3EE", "#F59E0B"]',
                description: "Array of hex colors for the particles.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes for the wrapper.",
              },
              {
                name: "onComplete",
                type: "() => void",
                default: "\u2014",
                description:
                  "Callback fired when the disintegration animation finishes.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
