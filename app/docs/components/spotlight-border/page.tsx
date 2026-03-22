import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "Spotlight Border — FlexUI",
  description: "A container with a glowing border spotlight that follows the mouse cursor.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Spotlight Border</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A container with a radial-gradient border glow that smoothly follows the mouse cursor using spring physics. Perfect for feature cards and highlighted sections.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add spotlight-border`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { SpotlightBorder } from "@/components/flexui/spotlight-border";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<SpotlightBorder color="139,92,246">
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Card description content goes here.
  </p>
</SpotlightBorder>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "children", type: "React.ReactNode", default: "—", description: "Content inside the bordered container.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the outer wrapper." },
          { name: "color", type: "string", default: '"56,189,248"', description: "RGB values for the spotlight color (comma-separated, no spaces)." },
        ]} />
      </DocSection>
    </div>
  );
}
