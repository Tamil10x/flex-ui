import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PortfolioPlayground } from "./playground";

export const metadata: Metadata = { title: "Portfolio Page — FlexUI", description: "Developer portfolio template with project grid, timeline, and contact." };

export default function PortfolioDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">Page Template</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Portfolio Page</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A developer portfolio with hero, project showcase grid, timeline experience section, and contact CTA.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><PortfolioPlayground /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/page:portfolio" filename="Terminal" /></div>}
          manual={<div className="space-y-2"><p className="text-sm font-medium text-zinc-300">Copy template</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/pages/portfolio.tsx</code></div></div>}
        />
      </DocSection>
      <DocSection id="sections" title="Included Sections">
        <div className="grid gap-3 sm:grid-cols-2">
          {[{ label: "Header", desc: "Glassmorphic nav with contact CTA" }, { label: "Hero", desc: "Minimal hero with name and bio" }, { label: "Projects", desc: "2-column project cards with tags" }, { label: "Timeline", desc: "Vertical timeline with experience" }, { label: "Contact", desc: "Newsletter-style contact section" }, { label: "Footer", desc: "Minimal footer with social links" }].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><p className="text-sm font-semibold text-white">{s.label}</p><p className="mt-1 text-xs text-zinc-500">{s.desc}</p></div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
