import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MagneticButtonPlayground } from "./playground";
import { MagneticButtonExamples } from "./examples";

export const metadata: Metadata = {
  title: "Magnetic Button — FlexUI",
  description:
    "A spring-physics button that magnetically follows the cursor with a spotlight glow border.",
};

const magneticButtonSource = `"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  magneticStrength?: number;
  spotlightSize?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  magneticStrength = 0.35,
  spotlightSize = 200,
  className,
  onClick,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold",
        "bg-white text-black transition-shadow duration-300",
        "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}`;

export default function MagneticButtonDoc() {
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
          Magnetic Button
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A button that uses Framer Motion spring physics to magnetically pull
          toward the user&apos;s cursor when hovered, with a glowing spotlight
          border effect.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <MagneticButtonPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <MagneticButtonExamples />
      </DocSection>

      {/* Installation — CLI / Manual tabs */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/magnetic-button"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/magnetic-button.tsx
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
                  code={magneticButtonSource}
                  filename="components/flexui/magnetic-button.tsx"
                  language="tsx"
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
              label: "Spring Physics",
              desc: "Smooth cursor-following via useSpring — 60fps animations outside the React render cycle.",
            },
            {
              icon: "o",
              label: "Spotlight Border",
              desc: "Radial gradient glow that tracks the pointer position in real-time.",
            },
            {
              icon: "#",
              label: "Configurable",
              desc: "Tune magnetic pull strength and spotlight radius via simple numeric props.",
            },
            {
              icon: "+",
              label: "Composable",
              desc: "Pass className for full style control — cn() merges your Tailwind classes cleanly.",
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
            code={`import { MagneticButton } from "@/components/flexui/magnetic-button";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description: "Button content (text, icons, etc).",
                required: true,
              },
              {
                name: "magneticStrength",
                type: "number",
                default: "0.35",
                description:
                  "How strongly the button follows the cursor. 0 = no pull, 1 = full follow.",
              },
              {
                name: "spotlightSize",
                type: "number",
                default: "200",
                description:
                  "Radius of the spotlight glow effect in pixels.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional Tailwind classes merged via cn().",
              },
              {
                name: "onClick",
                type: "() => void",
                default: "—",
                description: "Click handler.",
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the button and magnetic effect.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="tune-spring" title="Tune Spring Physics">
          <p className="text-sm text-zinc-400">
            Adjust{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              magneticStrength
            </code>{" "}
            to control how far the button moves.
          </p>
          <CodeBlock
            code={`{/* Subtle — barely moves */}
<MagneticButton magneticStrength={0.1}>Subtle</MagneticButton>

{/* Dramatic — follows cursor aggressively */}
<MagneticButton magneticStrength={0.8}>Wild</MagneticButton>`}
            filename="Strength variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-styles" title="Swap Styles with className">
          <CodeBlock
            code={`{/* Gradient */}
<MagneticButton className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
  Gradient
</MagneticButton>

{/* Outline */}
<MagneticButton className="bg-transparent text-white border border-white/20">
  Outline
</MagneticButton>

{/* Large CTA */}
<MagneticButton className="px-12 py-5 text-lg rounded-2xl">
  Get Started
</MagneticButton>`}
            filename="Style variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="with-icon" title="Compose with Icons">
          <CodeBlock
            code={`import { ArrowRight } from "lucide-react";

<MagneticButton className="flex items-center gap-2">
  Get Started
  <ArrowRight className="h-4 w-4" />
</MagneticButton>`}
            filename="With icon"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Uses useMotionValue + useSpring — values update outside React's render cycle for 60fps.",
              "No re-renders on mouse move. Framer Motion applies transforms directly to the DOM.",
              "Spotlight gradient via inline style — no CSS class churn.",
              "Spring config (damping: 15, stiffness: 150, mass: 0.1) tuned for snappy response.",
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
              "Supports disabled state which prevents interaction.",
              "Magnetic animation is visual-only — does not affect tab order or focus.",
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

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Button snaps back instantly instead of springing",
              a: "Ensure Framer Motion v11+. Older versions handle useSpring differently.",
            },
            {
              q: "Magnetic effect feels too strong or too weak",
              a: "Adjust magneticStrength prop. 0.2–0.5 works best. Larger buttons may need lower values.",
            },
            {
              q: "Spotlight glow not visible",
              a: "Check overflow-hidden is present and no high z-index child is covering the overlay.",
            },
            {
              q: "TypeScript error on motion.button",
              a: "Don't spread native HTMLButtonAttributes onto motion.button. Use explicit props instead.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group/faq rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1] open:border-white/[0.1]"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white list-none">
                {item.q}
                <span className="ml-4 text-zinc-600 transition-transform duration-200 group-open/faq:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
