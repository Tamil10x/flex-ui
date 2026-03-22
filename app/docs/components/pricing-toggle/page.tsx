import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { PricingToggleExamples } from "./examples";
import { Activity, BadgePercent, Sliders, Accessibility } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing Toggle — FlexUI",
  description: "An animated toggle switch for switching between monthly and yearly pricing plans with a savings badge.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Pricing Toggle</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated toggle switch for switching between monthly and yearly pricing plans. Displays a &quot;Save 20%&quot; badge when yearly is selected.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <PricingToggleExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add pricing-toggle`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { PricingToggle } from "@/components/flexui/pricing-toggle";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const [isYearly, setIsYearly] = useState(false);

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "isYearly", type: "boolean", default: "—", description: "Whether the yearly plan is selected.", required: true },
          { name: "onChange", type: "(yearly: boolean) => void", default: "—", description: "Callback fired when the toggle changes.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the wrapper." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Activity className="h-4 w-4" />, label: "Spring-Animated Thumb", desc: "The toggle thumb slides with Framer Motion spring physics for a natural feel." },
            { icon: <BadgePercent className="h-4 w-4" />, label: "Savings Badge", desc: "A Save 20% badge animates in when yearly billing is selected." },
            { icon: <Sliders className="h-4 w-4" />, label: "Controlled Component", desc: "Fully controlled via isYearly and onChange props for easy state management." },
            { icon: <Accessibility className="h-4 w-4" />, label: "ARIA Switch", desc: "Uses role=\"switch\" and aria-checked for proper screen reader semantics." },
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
        <DocSubSection id="with-pricing" title="With Pricing Display">
          <CodeBlock code={`const [isYearly, setIsYearly] = useState(false);
const price = isYearly ? "$99/yr" : "$9/mo";

<PricingToggle isYearly={isYearly} onChange={setIsYearly} />
<p className="mt-4 text-2xl font-bold text-white">{price}</p>`} filename="pricing.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-class" title="Custom Styling">
          <CodeBlock code={`<PricingToggle
  isYearly={isYearly}
  onChange={setIsYearly}
  className="gap-4 rounded-full border border-white/10 bg-zinc-900 px-4 py-2"
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Toggle uses role=\"switch\" with aria-checked reflecting the current billing state.", "Descriptive aria-label explains the toggle purpose to screen readers.", "Monthly and Yearly labels have visual state changes for clear indication of the active option."].map((note, i) => (
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
