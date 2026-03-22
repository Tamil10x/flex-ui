import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { NumberTickerPlayground } from "./playground";
import { NumberTickerExamples } from "./examples";

export const metadata: Metadata = {
  title: "Number Ticker — FlexUI",
  description:
    "An animated number counter that springs to a target value when it enters the viewport.",
};

export default function NumberTickerDoc() {
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
          Number Ticker
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated number counter that springs to a target value when it
          enters the viewport. Supports prefix, suffix, decimal formatting, and
          configurable spring physics.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll down or refresh to see the counting animation.
        </p>
        <NumberTickerPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Stats dashboards, pricing displays, and performance metrics.
        </p>
        <NumberTickerExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/number-ticker"
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
                    components/flexui/number-ticker.tsx
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
        <DocSubSection id="number-ticker-props" title="NumberTicker">
          <ApiTable
            rows={[
              {
                name: "value",
                type: "number",
                default: "\u2014",
                description: "The target number to animate to.",
                required: true,
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
                name: "stiffness",
                type: "number",
                default: "100",
                description: "Spring stiffness — higher values animate faster.",
              },
              {
                name: "damping",
                type: "number",
                default: "30",
                description:
                  "Spring damping — lower values create more bounce.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the span element.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation only triggers once when it enters the viewport.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="spring-physics" title="Spring Physics">
          <CodeBlock
            code={`{/* Snappy counter */}
<NumberTicker value={100} stiffness={200} damping={20} />

{/* Slow, smooth counter */}
<NumberTicker value={100} stiffness={50} damping={40} />

{/* Bouncy counter */}
<NumberTicker value={100} stiffness={150} damping={10} />

{/* Currency */}
<NumberTicker value={1299.99} prefix="$" decimals={2} />

{/* Percentage */}
<NumberTicker value={99.9} suffix="%" decimals={1} />`}
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
              q: "Number shows 0 and doesn't animate",
              a: "The component uses IntersectionObserver. Make sure framer-motion is installed and the element is scrolled into view.",
            },
            {
              q: "Too many decimal places flickering",
              a: "Set the decimals prop to control how many decimal places are shown. The default is 0.",
            },
            {
              q: "Animation feels too slow or too bouncy",
              a: "Adjust the stiffness (higher = faster) and damping (higher = less bounce) props to tune the spring physics.",
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Spring Physics Counter", desc: "Number animates to target with configurable stiffness and damping for natural motion." },
            { icon: "o", label: "Viewport Trigger", desc: "Counter starts counting only when scrolled into view via IntersectionObserver." },
            { icon: "#", label: "Prefix & Suffix", desc: "Support for currency symbols, percentage signs, and other text around the number." },
            { icon: "+", label: "Decimal Formatting", desc: "Control the number of decimal places displayed during and after the animation." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get-customization" title="Customization Patterns">
        <DocSubSection id="currency-ticker" title="Currency Ticker">
          <CodeBlock code={`<NumberTicker value={1299.99} prefix="$" decimals={2} className="text-3xl font-bold text-white" />`} filename="currency.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="bouncy-ticker" title="Bouncy Counter">
          <CodeBlock code={`<NumberTicker value={500} suffix="+" stiffness={150} damping={10} className="text-4xl font-bold text-emerald-400" />`} filename="bouncy.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses tabular-nums font feature for stable character width, preventing layout jitter during counting.", "The animation uses useMotionValue which updates outside React render cycle for smooth performance.", "The final value is always displayed as readable text content for screen readers.", "Setting once={false} allows re-triggering but should be used sparingly to avoid distracting motion."].map((note, i) => (
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
