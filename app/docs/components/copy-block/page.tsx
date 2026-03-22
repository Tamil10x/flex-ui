import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CopyBlockExamples } from "./examples";
import { ClipboardCopy, CheckCircle, FileCode, Sparkles } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <CopyBlockExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ClipboardCopy className="h-4 w-4" />, label: "One-Click Copy", desc: "Copies code to clipboard with a single click using the Clipboard API." },
            { icon: <CheckCircle className="h-4 w-4" />, label: "Animated Feedback", desc: "Copy button transitions to a green \"Copied!\" state with smooth AnimatePresence animation." },
            { icon: <FileCode className="h-4 w-4" />, label: "File Header", desc: "Optional filename or language label in a styled header bar above the code." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Glassmorphic Design", desc: "Dark backdrop blur with hover glow for a premium code display appearance." },
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
        <DocSubSection id="with-filename" title="With Filename Header">
          <CodeBlock code={`<CopyBlock
  code="export default function App() { return <h1>Hello</h1>; }"
  filename="App.tsx"
  language="tsx"
/>`} filename="filename.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="terminal-block" title="Terminal Command Block">
          <CodeBlock code={`<CopyBlock
  code="npx create-next-app@latest my-app"
  filename="Terminal"
  className="font-mono"
/>`} filename="terminal.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Code is rendered in a semantic pre > code structure for proper screen reader identification.", "The copy button is a standard button element, fully keyboard-accessible.", "The \"Copied!\" confirmation is visually animated but the text change also announces the state to screen readers.", "Consider adding aria-label=\"Copy code to clipboard\" to the copy button for additional context."].map((note, i) => (
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
