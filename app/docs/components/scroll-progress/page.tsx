import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ScrollProgressPlayground } from "./playground";
import { ScrollProgressExamples } from "./examples";

export const metadata: Metadata = {
  title: "Scroll Progress — FlexUI",
  description:
    "A fixed progress bar that shows how far the user has scrolled on the page.",
};

export default function ScrollProgressDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Scroll Progress
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A fixed progress bar that animates its width from 0% to 100% based on
          how far the user has scrolled. Uses spring physics for smooth,
          natural-feeling motion.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll the page to see the progress bar at the top of the viewport.
        </p>
        <ScrollProgressPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Different color schemes, positions, and thicknesses.
        </p>
        <ScrollProgressExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/scroll-progress"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/scroll-progress.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="scroll-progress-props" title="ScrollProgress">
          <ApiTable
            rows={[
              {
                name: "color",
                type: "string",
                default: '"linear-gradient(to right, #3b82f6, #06b6d4)"',
                description:
                  "CSS background value — gradient or solid color.",
              },
              {
                name: "height",
                type: "number",
                default: "3",
                description: "Height of the progress bar in pixels.",
              },
              {
                name: "position",
                type: '"top" | "bottom"',
                default: '"top"',
                description:
                  "Whether the bar sits at the top or bottom of the viewport.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="color-variants" title="Color Variants">
          <CodeBlock
            code={`{/* Default blue-to-cyan gradient */}
<ScrollProgress />

{/* Purple-to-pink gradient */}
<ScrollProgress color="linear-gradient(to right, #a855f7, #ec4899)" />

{/* Solid emerald */}
<ScrollProgress color="#10b981" />

{/* Bottom position, thicker */}
<ScrollProgress position="bottom" height={5} />

{/* Bottom with warm gradient */}
<ScrollProgress
  position="bottom"
  height={4}
  color="linear-gradient(to right, #f59e0b, #ef4444)"
/>`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Spring-Smoothed", desc: "Scroll position is smoothed with spring physics for natural, jitter-free motion." },
            { icon: "o", label: "Gradient Support", desc: "Pass any CSS background value including linear gradients for colorful progress bars." },
            { icon: "#", label: "Top or Bottom", desc: "Position the bar at the top or bottom of the viewport with a single prop." },
            { icon: "+", label: "Fixed Position", desc: "Stays visible as a fixed overlay while scrolling, with z-50 stacking." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses role=\"progressbar\" with aria-label to communicate scroll progress to screen readers.", "The bar is purely informational and does not interfere with page interactivity.", "Spring-smoothed scaleX transform is GPU-accelerated and does not cause layout recalculations."].map((note, i) => (
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
              q: "Progress bar doesn't appear",
              a: "The bar only shows when the page is scrollable. Make sure the page content is taller than the viewport. Also verify framer-motion is installed.",
            },
            {
              q: "Bar jumps instead of smooth animation",
              a: "The useSpring hook smooths the progress value. If you see jumps, ensure you haven't overridden the transition with a className that sets CSS transitions.",
            },
            {
              q: "Bar hidden behind other fixed elements",
              a: "The bar uses z-50 by default. If your navbar is also z-50, add a higher z-index via the className prop.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
