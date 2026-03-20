import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ScrollCounterPlayground } from "./playground";
import { ScrollCounterExamples } from "./examples";

export const metadata: Metadata = {
  title: "Scroll Counter — FlexUI",
  description:
    "An animated counter that counts from one number to another when scrolled into view, using spring physics and direct DOM updates for performance.",
};

export default function ScrollCounterDoc() {
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
          Scroll Counter
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated counter that counts from one number to another when
          scrolled into view. Uses spring physics and direct DOM updates via ref
          for optimal performance -- no React re-renders during animation.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the counting animation.
        </p>
        <ScrollCounterPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Stats dashboards, countdowns, currency, and percentage displays.
        </p>
        <ScrollCounterExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/scroll-counter"
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
                    components/flexui/scroll-counter.tsx
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
        <DocSubSection id="scroll-counter-props" title="ScrollCounter">
          <ApiTable
            rows={[
              {
                name: "to",
                type: "number",
                default: "\u2014",
                description: "The target number to count to.",
                required: true,
              },
              {
                name: "from",
                type: "number",
                default: "0",
                description: "The starting number.",
              },
              {
                name: "prefix",
                type: "string",
                default: '""',
                description: 'Prefix string, e.g. "$" or "#".',
              },
              {
                name: "suffix",
                type: "string",
                default: '""',
                description: 'Suffix string, e.g. "+" or "%".',
              },
              {
                name: "decimals",
                type: "number",
                default: "0",
                description: "Number of decimal places to display.",
              },
              {
                name: "duration",
                type: "number",
                default: "2",
                description:
                  "Approximate animation duration in seconds. Controls spring stiffness.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation only triggers once when entering the viewport.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the span element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="counting-modes" title="Counting Modes">
          <CodeBlock
            code={`{/* Count up from 0 */}
<ScrollCounter to={1000} />

{/* Count down from 1000 */}
<ScrollCounter from={1000} to={0} />

{/* Currency */}
<ScrollCounter to={1299.99} prefix="$" decimals={2} />

{/* Percentage */}
<ScrollCounter to={99.9} suffix="%" decimals={1} />

{/* Slow count */}
<ScrollCounter to={500} duration={4} />

{/* Fast count */}
<ScrollCounter to={500} duration={0.8} />

{/* Re-trigger on every scroll */}
<ScrollCounter to={100} once={false} />`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Counter shows the starting value and never animates",
              a: "The component uses IntersectionObserver via useInView. Ensure framer-motion is installed and the element is scrolled into the viewport.",
            },
            {
              q: "Too many decimal places flickering",
              a: "Set the decimals prop to control formatting. The default is 0 decimal places.",
            },
            {
              q: "How is this different from NumberTicker?",
              a: "ScrollCounter updates the DOM directly via ref instead of using React state, making it more performant for many simultaneous counters. It also supports a custom 'from' value for count-down effects.",
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
