import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "DirectionHover — FlexUI",
  description: "A direction-aware hover card that reveals an overlay based on cursor entry direction.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">DirectionHover</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A direction-aware hover card that reveals an overlay sliding in from the direction the cursor enters.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add direction-hover`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { DirectionHover } from "@/components/flexui/direction-hover";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<DirectionHover
  className="h-64 w-48"
  overlay={
    <div className="text-center text-white">
      <p className="text-lg font-semibold">Title</p>
      <p className="text-sm text-zinc-300">Description</p>
    </div>
  }
>
  <img src="/image.jpg" alt="Card" className="h-full w-full object-cover" />
</DirectionHover>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "children", type: "React.ReactNode", default: "-", description: "The base content displayed inside the card.", required: true },
          { name: "overlay", type: "React.ReactNode", default: "-", description: "Content displayed in the direction-aware hover overlay." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>
    </div>
  );
}
