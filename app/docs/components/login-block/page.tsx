import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { LoginBlockPlayground } from "./playground";
import { LoginBlockExamples } from "./examples";

export const metadata: Metadata = { title: "Login Block — FlexUI", description: "Login form with social providers and centered/split layout variants." };

export default function LoginBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">Page Block</span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">Framer Motion</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Login Block</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A login form section with social provider buttons, centered or split layout variants, and forgot/signup links.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><LoginBlockPlayground /></DocSection>
      <DocSection id="examples" title="Examples"><LoginBlockExamples /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/login-block" filename="Terminal" /><p className="text-sm text-zinc-500">Requires <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>.</p></div>}
          manual={<div className="space-y-4"><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">1. Install dependencies</p><CodeBlock code="npm install framer-motion" filename="Terminal" /></div><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">2. Copy component</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/login-block.tsx</code></div></div></div>}
        />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="LoginBlock Props">
          <ApiTable rows={[
            { name: "heading", type: "string", default: '"Welcome back"', description: "Form heading." },
            { name: "subtitle", type: "string", default: '"Sign in to your account..."', description: "Subtitle text." },
            { name: "showSocial", type: "boolean", default: "true", description: "Show social login buttons." },
            { name: "variant", type: '"centered" | "split"', default: '"centered"', description: "Layout variant." },
            { name: "onSubmit", type: "(data) => void | Promise", default: "—", description: "Form submit callback." },
            { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          ]} />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
