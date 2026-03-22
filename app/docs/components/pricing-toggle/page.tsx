import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
