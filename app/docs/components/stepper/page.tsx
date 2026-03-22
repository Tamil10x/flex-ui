import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
