import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BlogPlayground } from "./playground";

export const metadata: Metadata = { title: "Blog Page — FlexUI", description: "Blog layout template with article cards, category sidebar, and newsletter." };

export default function BlogDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">Page Template</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Blog Page</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A blog layout with article cards, category sidebar, and newsletter subscription.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><BlogPlayground /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/page:blog" filename="Terminal" /></div>}
          manual={<div className="space-y-2"><p className="text-sm font-medium text-zinc-300">Copy template</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/pages/blog.tsx</code></div></div>}
        />
      </DocSection>
    </div>
  );
}
