import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Stat Card — FlexUI",
  description: "An animated statistics card with value, label, optional change indicator, and icon.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Stat Card</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated statistics card that fades in on scroll. Displays a label, large value, optional percentage change indicator, and an icon slot.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add stat-card`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { StatCard } from "@/components/flexui/stat-card";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<StatCard
  label="Revenue"
  value="$48.2k"
  change={12.5}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "label", type: "string", default: "—", description: "Descriptive label displayed above the value.", required: true },
          { name: "value", type: "string | number", default: "—", description: "The primary statistic value to display.", required: true },
          { name: "change", type: "number", default: "—", description: "Percentage change from last period. Positive values are green, negative are red." },
          { name: "icon", type: "React.ReactNode", default: "—", description: "Optional icon displayed in the top-right corner." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the card." },
        ]} />
      </DocSection>
    </div>
  );
}
