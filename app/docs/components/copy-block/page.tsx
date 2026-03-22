import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "CopyBlock — FlexUI",
  description: "A code display block with one-click copy-to-clipboard functionality.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">CopyBlock</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A code display block with one-click copy-to-clipboard and animated feedback.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add copy-block`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { CopyBlock } from "@/components/flexui/copy-block";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<CopyBlock
  code={\`const greeting = "Hello, world!";\nconsole.log(greeting);\`}
  filename="example.ts"
  language="typescript"
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "code", type: "string", default: "-", description: "The code string to display and copy.", required: true },
          { name: "language", type: "string", default: "-", description: "Programming language label shown in the header." },
          { name: "filename", type: "string", default: "-", description: "Filename label shown in the header. Takes precedence over language." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>
    </div>
  );
}
