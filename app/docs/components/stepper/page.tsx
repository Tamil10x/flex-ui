import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { StepperExamples } from "./examples";
import { Activity, CircleDot, EyeOff, List } from "lucide-react";

export const metadata: Metadata = {
  title: "Stepper — FlexUI",
  description:
    "A multi-step progress indicator for wizards and multi-page forms.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Stepper
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A multi-step progress indicator for wizards and multi-page forms.
          Displays numbered steps with labels, descriptions, and animated
          connecting lines.
        </p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <StepperExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add stepper`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Stepper } from "@/components/flexui/stepper";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Complete", description: "All done!" },
];

<Stepper steps={steps} currentStep={1} />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "steps",
              type: "Step[]",
              default: "\u2014",
              description:
                "Array of step objects with label (string) and optional description (string).",
              required: true,
            },
            {
              name: "currentStep",
              type: "number",
              default: "\u2014",
              description:
                "Zero-based index of the currently active step.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the wrapper element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Activity className="h-4 w-4" />, label: "Animated Progress Lines", desc: "Connecting lines between steps animate with spring physics as the current step advances." },
            { icon: <CircleDot className="h-4 w-4" />, label: "Step State Indicators", desc: "Completed steps show a checkmark, the current step scales up, and future steps remain dimmed." },
            { icon: <EyeOff className="h-4 w-4" />, label: "Reduced Motion Support", desc: "Uses useReducedMotion to disable animations for users who prefer reduced motion." },
            { icon: <List className="h-4 w-4" />, label: "Labels & Descriptions", desc: "Each step supports a label and optional description for clear multi-step navigation." },
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
        <DocSubSection id="simple-steps" title="Simple Steps">
          <CodeBlock code={`<Stepper
  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Done" },
  ]}
  currentStep={2}
/>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="with-descriptions" title="With Descriptions">
          <CodeBlock code={`<Stepper
  steps={[
    { label: "Sign Up", description: "Create your account" },
    { label: "Verify", description: "Confirm your email" },
    { label: "Complete", description: "Start using the app" },
  ]}
  currentStep={1}
/>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The stepper uses role=\"navigation\" with aria-label=\"Progress steps\" for screen reader context.", "Each step circle has an aria-label indicating its number, label, and state (completed, current, or upcoming).", "Animations are automatically disabled when the user has enabled prefers-reduced-motion in their OS settings.", "Step states are communicated through both visual cues (color, checkmark) and semantic labels."].map((note, i) => (
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
