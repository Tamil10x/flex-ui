import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FooterBlockPlayground } from "./playground";
import { FooterBlockExamples } from "./examples";

export const metadata: Metadata = { title: "Footer Block — FlexUI", description: "Multi-column footer with brand, links, social icons, and copyright." };

export default function FooterBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">Page Block</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Footer Block</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A multi-column footer with brand column, link columns, social icons, and copyright section.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><FooterBlockPlayground /></DocSection>
      <DocSection id="examples" title="Examples"><FooterBlockExamples /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/footer-block" filename="Terminal" /><p className="text-sm text-zinc-500">No external dependencies required.</p></div>}
          manual={<div className="space-y-2"><p className="text-sm font-medium text-zinc-300">Copy component</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/footer-block.tsx</code></div></div>}
        />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="FooterBlock Props">
          <ApiTable rows={[
            { name: "logo", type: "ReactNode", default: '"FlexUI"', description: "Brand logo or name." },
            { name: "description", type: "string", default: "—", description: "Brand description text." },
            { name: "columns", type: "FooterColumn[]", default: "[]", description: "Array of { title, links[] } columns." },
            { name: "social", type: "SocialLink[]", default: "[]", description: "Array of { label, href, icon? } social links." },
            { name: "copyright", type: "string", default: "—", description: "Copyright text at the bottom." },
            { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          ]} />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
