import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Countdown — FlexUI",
  description: "An animated countdown timer displaying days, hours, minutes, and seconds.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Countdown</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated countdown timer that displays days, hours, minutes, and seconds with smooth digit transitions.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add countdown`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Countdown } from "@/components/flexui/countdown";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`// Using a Date object
<Countdown
  targetDate={new Date("2026-12-31T23:59:59")}
  onComplete={() => console.log("Happy New Year!")}
/>

// Using an ISO string
<Countdown targetDate="2026-12-31T23:59:59" />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "targetDate", type: "Date | string", default: "-", description: "The target date to count down to. Accepts a Date object or ISO string.", required: true },
          { name: "onComplete", type: "() => void", default: "-", description: "Callback fired when the countdown reaches zero." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>
    </div>
  );
}
