import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MorphingBlobPlayground } from "./playground";
import { MorphingBlobExamples } from "./examples";

export const metadata: Metadata = {
  title: "Morphing Blob — FlexUI",
  description:
    "An SVG blob that continuously morphs between organic shapes with a gradient fill.",
};

const morphingBlobSource = `"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingBlobProps {
  className?: string;
  color?: string;
  accentColor?: string;
  speed?: number;
  size?: number;
  children?: React.ReactNode;
}

const BLOB_SHAPES = [
  "M44.5,22.2C51.4,29.5,57.2,40.5,53.9,48.8C50.6,57.1,38.2,62.7,27.5,60.8C16.8,58.9,7.8,49.5,3.6,38.8C-0.6,28.1,0,16.1,6.3,9.2C12.6,2.3,24.6,-0.5,34.2,3.3C43.8,7.1,37.6,14.9,44.5,22.2Z",
  "M48.2,26.5C53.1,35.2,55.8,47.6,50.4,54.5C45,61.4,31.5,62.8,21.2,58.6C10.9,54.4,3.8,44.6,1.6,34.1C-0.6,23.6,2.1,12.4,9.4,6.3C16.7,0.2,28.6,-0.8,37.5,3.4C46.4,7.6,43.3,17.8,48.2,26.5Z",
  "M46.8,19.5C54.9,26.8,62.3,37.1,59.2,46.2C56.1,55.3,42.5,63.2,30.8,62.4C19.1,61.6,9.3,52.1,4.2,41.3C-0.9,30.5,-1.3,18.4,4.6,10.7C10.5,3,22.7,-0.3,32.6,1.2C42.5,2.7,38.7,12.2,46.8,19.5Z",
  "M50.1,24.8C55.8,33.9,56.4,46.8,50.1,54.1C43.8,61.4,30.6,63.1,20.4,58.2C10.2,53.3,3,41.8,1.2,30.8C-0.6,19.8,3,9.3,10.6,4C18.2,-1.3,29.8,-1.4,38.8,2.8C47.8,7,44.4,15.7,50.1,24.8Z",
  "M47.5,21.8C54.5,29.5,59.8,40.2,56,48.6C52.2,57,39.3,63.1,28.1,61.5C16.9,59.9,7.4,50.6,2.8,39.8C-1.8,29,-1.5,16.7,4.5,9.3C10.5,1.9,22.2,-0.6,32.2,1.8C42.2,4.2,40.5,14.1,47.5,21.8Z",
];

function parsePath(d: string): number[] {
  const nums: number[] = [];
  const regex = /-?[\\d.]+/g;
  let match;
  while ((match = regex.exec(d)) !== null) nums.push(parseFloat(match[0]));
  return nums;
}

function interpolateNumbers(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t);
}

function numbersToPath(template: string, nums: number[]): string {
  let idx = 0;
  return template.replace(/-?[\\d.]+/g, () => (nums[idx++] ?? 0).toFixed(1));
}

export function MorphingBlob({
  className, color = "#8B5CF6", accentColor = "#389CFD",
  speed = 4, size = 200, children,
}: MorphingBlobProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !pathRef.current) return;
    const parsedShapes = BLOB_SHAPES.map(parsePath);
    const template = BLOB_SHAPES[0];
    const segmentDuration = speed * 1000;
    let startTime: number | null = null;

    function animate(ts: number) {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const total = segmentDuration * parsedShapes.length;
      const progress = (elapsed % total) / segmentDuration;
      const ci = Math.floor(progress) % parsedShapes.length;
      const ni = (ci + 1) % parsedShapes.length;
      const t = progress - Math.floor(progress);
      const eased = t * t * (3 - 2 * t);
      const interp = interpolateNumbers(parsedShapes[ci], parsedShapes[ni], eased);
      pathRef.current?.setAttribute("d", numbersToPath(template, interp));
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, speed]);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}>
      <svg viewBox="-5 -5 70 70" width={size} height={size} className="absolute inset-0">
        <defs>
          <linearGradient id="blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>
        <path ref={pathRef} d={BLOB_SHAPES[0]} fill="url(#blob-grad)" />
      </svg>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}`;

export default function MorphingBlobDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            SVG + rAF
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Morphing Blob
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An SVG blob that continuously morphs between organic shapes using
          requestAnimationFrame interpolation. Gradient fill with configurable
          colors, speed, and size. Render children centered on top.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <MorphingBlobPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <MorphingBlobExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/morphing-blob"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Zero external dependencies. Writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/morphing-blob.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  Copy component source
                </p>
                <CodeBlock
                  code={morphingBlobSource}
                  filename="components/flexui/morphing-blob.tsx"
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
            code={`import { MorphingBlob } from "@/components/flexui/morphing-blob";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description: "Gradient start color.",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#389CFD"',
                description: "Gradient end color.",
              },
              {
                name: "speed",
                type: "number",
                default: "4",
                description:
                  "Duration in seconds for each shape transition.",
              },
              {
                name: "size",
                type: "number",
                default: "200",
                description: "Blob size in pixels.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered centered on top of the blob.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn().",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Organic Shape Morphing", desc: "SVG path interpolates between 5 pre-defined organic blob shapes with smooth easing." },
            { icon: "o", label: "Gradient Fill", desc: "Linear gradient from color to accentColor fills the blob with customizable start and end colors." },
            { icon: "#", label: "rAF-Driven Animation", desc: "requestAnimationFrame loop with smoothstep easing for buttery 60fps shape transitions." },
            { icon: "+", label: "Centered Children", desc: "Render icons, text, or images centered on top of the blob as an overlay." },
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
        <DocSubSection id="warm-blob" title="Warm Color Blob">
          <CodeBlock code={`<MorphingBlob color="#F97316" accentColor="#EC4899" size={250} speed={3}>
  <span className="text-2xl">🔥</span>
</MorphingBlob>`} filename="warm.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="slow-large" title="Large Slow Background Blob">
          <CodeBlock code={`<MorphingBlob
  size={400}
  speed={8}
  color="rgba(139, 92, 246, 0.4)"
  accentColor="rgba(6, 182, 212, 0.4)"
  className="absolute -z-10"
/>`} filename="background.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The SVG blob is purely decorative; children rendered via the z-10 layer carry the semantic content.", "A mounted guard prevents hydration mismatches between server and client rendering.", "The animation runs entirely via direct DOM manipulation (setAttribute), avoiding unnecessary React re-renders."].map((note, i) => (
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
