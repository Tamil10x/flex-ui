import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CountdownExamples } from "./examples";
import { ToggleLeft, Accessibility, Bell, Calendar } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <CountdownExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ToggleLeft className="h-4 w-4" />, label: "Per-Digit Animation", desc: "Each digit slides in with spring physics using AnimatePresence for smooth transitions." },
            { icon: <Accessibility className="h-4 w-4" />, label: "Reduced Motion Support", desc: "Respects prefers-reduced-motion via Framer Motion useReducedMotion hook." },
            { icon: <Bell className="h-4 w-4" />, label: "Completion Callback", desc: "Fires an onComplete callback when the countdown reaches zero." },
            { icon: <Calendar className="h-4 w-4" />, label: "Flexible Input", desc: "Accepts both Date objects and ISO date strings for the target date." },
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
        <DocSubSection id="styled-countdown" title="Styled Countdown">
          <CodeBlock code={`<Countdown
  targetDate="2027-01-01T00:00:00"
  className="text-purple-400 gap-4"
  onComplete={() => alert("Time is up!")}
/>`} filename="styled.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="compact-countdown" title="Compact Inline Countdown">
          <CodeBlock code={`<p className="text-zinc-400">
  Sale ends in{" "}
  <Countdown
    targetDate={saleEndDate}
    className="inline-flex text-white"
  />
</p>`} filename="inline.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Digit values are always visible as text content, so screen readers can announce the countdown.", "Respects prefers-reduced-motion — digit animations are disabled when the user prefers reduced motion.", "The onComplete callback can be used to trigger an aria-live announcement when the countdown finishes.", "Labels (Days, Hours, Min, Sec) provide context for each digit group."].map((note, i) => (
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
