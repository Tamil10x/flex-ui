import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { HeaderBlockPlayground } from "./playground";
import { HeaderBlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "Header Block — FlexUI",
  description: "Responsive navigation header with glassmorphic, solid, and transparent variants.",
};

export default function HeaderBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">Page Block</span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">Framer Motion</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Header Block</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A responsive navigation header with three visual variants, sticky scroll behavior, and an animated mobile hamburger menu.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><HeaderBlockPlayground /></DocSection>
      <DocSection id="examples" title="Examples"><HeaderBlockExamples /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/header-block" filename="Terminal" /><p className="text-sm text-zinc-500">Requires <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code>.</p></div>}
          manual={<div className="space-y-4"><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">1. Install dependencies</p><CodeBlock code="npm install framer-motion" filename="Terminal" /></div><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">2. Copy component</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/header-block.tsx</code></div></div></div>}
        />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="HeaderBlock Props">
          <ApiTable rows={[
            { name: "logo", type: "ReactNode", default: '"FlexUI"', description: "Brand logo or name displayed on the left." },
            { name: "navItems", type: "NavItem[]", default: "[]", description: "Array of { label, href } navigation links." },
            { name: "cta", type: "{ label: string; href: string }", default: "—", description: "Primary call-to-action button on the right." },
            { name: "variant", type: '"transparent" | "solid" | "glassmorphic"', default: '"glassmorphic"', description: "Visual style of the header background." },
            { name: "sticky", type: "boolean", default: "true", description: "Whether the header sticks to the top on scroll." },
            { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          ]} />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
