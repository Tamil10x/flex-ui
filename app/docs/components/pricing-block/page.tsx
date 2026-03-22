import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PricingBlockPlayground } from "./playground";
import { PricingBlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "Pricing Block — FlexUI",
  description:
    "A pricing section with animated cards, monthly/yearly toggle, and glassmorphic styling.",
};

export default function PricingBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Page Block
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion + Lucide
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Pricing Block
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A full pricing section with an animated monthly/yearly billing toggle,
          glassmorphic cards, gradient-border highlighted tier, animated price
          counter, and staggered card entrance. Drop it in as a complete pricing
          page section.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <PricingBlockPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <PricingBlockExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/pricing-block"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  lucide-react
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
                  code="npm install framer-motion lucide-react"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/pricing-block.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="pricing-block-props" title="PricingBlock Props">
          <ApiTable
            rows={[
              {
                name: "tiers",
                type: "PricingTier[]",
                default: "—",
                description:
                  "Array of pricing tier objects to display as cards.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional classes on the outer section element.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="pricing-tier" title="PricingTier">
          <ApiTable
            rows={[
              {
                name: "name",
                type: "string",
                default: "—",
                description: "Tier name displayed as the card heading.",
              },
              {
                name: "price",
                type: "{ monthly: number; yearly: number }",
                default: "—",
                description:
                  "Price values for monthly and yearly billing. Animates on toggle.",
              },
              {
                name: "description",
                type: "string",
                default: "—",
                description: "Short description below the tier name.",
              },
              {
                name: "features",
                type: "string[]",
                default: "—",
                description:
                  "List of feature strings, each rendered with a check icon.",
              },
              {
                name: "highlighted",
                type: "boolean",
                default: "false",
                description:
                  'Adds a gradient border and "Popular" badge to the card.',
              },
              {
                name: "cta",
                type: "string",
                default: '"Get Started"',
                description: "Call-to-action button label.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Billing Toggle", desc: "Animated monthly/yearly switch with a spring-physics sliding pill indicator." },
            { icon: "o", label: "Animated Prices", desc: "Price values cross-fade with blur and slide transitions when billing period changes." },
            { icon: "#", label: "Highlighted Tier", desc: "Gradient border and Popular badge for the featured plan using CSS mask-composite." },
            { icon: "+", label: "Staggered Entrance", desc: "Cards fade in with staggered delays for a polished page-load experience." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="two-tier-layout" title="Two-Tier Layout">
          <CodeBlock code={`<PricingBlock
  tiers={[
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals",
      features: ["1 project", "Basic analytics"],
    },
    {
      name: "Pro",
      price: { monthly: 29, yearly: 249 },
      description: "For teams",
      features: ["Unlimited projects", "Advanced analytics"],
      highlighted: true,
      cta: "Upgrade Now",
    },
  ]}
/>`} filename="two-tier.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-styling" title="Custom Section Styling">
          <CodeBlock code={`<PricingBlock
  className="bg-zinc-950 px-8 py-16"
  tiers={tiers}
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Billing toggle buttons are standard button elements with clear text labels.", "Feature lists use semantic list markup with check icons for visual clarity.", "CTA links use anchor elements with sufficient color contrast for both highlighted and default states."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "The billing toggle uses a spring-animated layoutId pill that slides between Monthly and Yearly positions.",
              "Prices animate between values using AnimatePresence with popLayout mode for smooth cross-fade transitions.",
              "Cards enter with staggered fade-up animation, each delayed by 100ms after the previous.",
              "The highlighted tier gets a gradient border using a CSS mask-composite technique for a true gradient outline.",
              'A "Popular" badge is absolutely positioned with a gradient background and shadow glow.',
              "Feature lists use the Check icon from lucide-react with emerald coloring for visual clarity.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
