import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { DockMenuPlayground } from "./playground";
import { DockMenuExamples } from "./examples";

export const metadata: Metadata = {
  title: "Dock Menu — FlexUI",
  description:
    "A macOS-style dock with smooth magnification effect powered by Framer Motion spring physics.",
};

const dockMenuSource = `"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface DockMenuProps {
  items: DockItem[];
  className?: string;
  iconSize?: number;
  magnification?: number;
  distance?: number;
}

function DockIcon({
  item,
  mouseX,
  iconSize,
  magnification,
  distance,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  iconSize: number;
  magnification: number;
  distance: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = React.useState(false);

  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return distance + 1;
    const rect = el.getBoundingClientRect();
    return val - rect.left - rect.width / 2;
  });

  const sizeTransform = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [iconSize, magnification, iconSize]
  );

  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 whitespace-nowrap rounded-lg border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={item.onClick}
        whileTap={{ scale: 0.85 }}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-white/[0.06] text-zinc-300 transition-colors hover:bg-white/[0.1]"
      >
        <div className="flex h-1/2 w-1/2 items-center justify-center">
          {item.icon}
        </div>
      </motion.button>
    </div>
  );
}

export function DockMenu({
  items,
  className,
  iconSize = 48,
  magnification = 72,
  distance = 150,
}: DockMenuProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 backdrop-blur-xl",
        className
      )}
    >
      {items.map((item, i) => (
        <DockIcon
          key={item.label + i}
          item={item}
          mouseX={mouseX}
          iconSize={iconSize}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </motion.div>
  );
}`;

export default function DockMenuDoc() {
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
          Dock Menu
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A macOS-style dock bar with smooth icon magnification. Cursor
          proximity triggers spring-physics scaling via Framer Motion — zero
          re-renders thanks to motion values.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <DockMenuPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <DockMenuExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/dock-menu"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/dock-menu.tsx
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
                  code={dockMenuSource}
                  filename="components/flexui/dock-menu.tsx"
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
              label: "Spring Magnification",
              desc: "Each icon scales based on cursor proximity using useTransform + useSpring — smooth, physics-based animation with zero re-renders.",
            },
            {
              icon: "o",
              label: "Motion Values",
              desc: "Mouse position tracked via useMotionValue, keeping all size calculations off the React render cycle.",
            },
            {
              icon: "#",
              label: "Configurable",
              desc: "Control base icon size, max magnification, and effect distance via simple number props.",
            },
            {
              icon: "+",
              label: "Tooltips & Bounce",
              desc: "Labels appear above hovered icons with spring animation. Icons bounce on click via whileTap.",
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
            code={`import { DockMenu } from "@/components/flexui/dock-menu";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="DockMenu Props">
          <ApiTable
            rows={[
              {
                name: "items",
                type: "DockItem[]",
                default: "\u2014",
                description:
                  "Array of dock items, each with icon (ReactNode), label (string), and optional onClick.",
                required: true,
              },
              {
                name: "iconSize",
                type: "number",
                default: "48",
                description: "Base icon size in pixels.",
              },
              {
                name: "magnification",
                type: "number",
                default: "72",
                description:
                  "Maximum magnified icon size in pixels when cursor is directly over the icon.",
              },
              {
                name: "distance",
                type: "number",
                default: "150",
                description:
                  "Pixel radius of the magnification effect from cursor position.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional Tailwind classes for the dock container, merged via cn().",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="dock-item-type" title="DockItem Type">
          <ApiTable
            rows={[
              {
                name: "icon",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Icon element rendered inside the dock slot.",
                required: true,
              },
              {
                name: "label",
                type: "string",
                default: "\u2014",
                description: "Tooltip text shown above the icon on hover.",
                required: true,
              },
              {
                name: "onClick",
                type: "() => void",
                default: "\u2014",
                description: "Click handler for the dock item.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-sizing" title="Custom Sizing">
          <CodeBlock
            code={`{/* Compact dock */}
<DockMenu items={items} iconSize={36} magnification={56} distance={100} />

{/* Large dock */}
<DockMenu items={items} iconSize={64} magnification={96} distance={200} />`}
            filename="Size variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-styles" title="Custom Container Styles">
          <CodeBlock
            code={`{/* Fixed bottom dock */}
<DockMenu
  items={items}
  className="fixed bottom-4 left-1/2 -translate-x-1/2"
/>

{/* Custom background */}
<DockMenu
  items={items}
  className="bg-zinc-900/95 border-zinc-700/30"
/>`}
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
              "Mouse position tracked via useMotionValue — updates bypass React\u2019s render cycle entirely.",
              "Each icon\u2019s size is derived via useTransform + useSpring — no useState, no re-renders.",
              "Spring physics (mass: 0.1, stiffness: 150, damping: 12) give responsive yet smooth scaling.",
              "AnimatePresence on tooltips ensures clean mount/unmount transitions without layout shift.",
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
              "Each dock item renders as a native <button> element for full keyboard accessibility.",
              "Tooltip labels provide visual context on hover for icon-only items.",
              "Consider adding aria-label to each item\u2019s icon for screen reader support.",
              "Magnification animation is purely visual and does not affect content accessibility.",
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
