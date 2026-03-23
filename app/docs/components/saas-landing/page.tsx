import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SaasLandingPlayground } from "./playground";

export const metadata: Metadata = { title: "SaaS Landing Page — FlexUI", description: "Complete SaaS landing page template with header, hero, features, testimonials, FAQ, and footer." };

export default function SaasLandingDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">Page Template</span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">Full Page</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">SaaS Landing Page</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A complete SaaS landing page with header, hero, features grid, stats, testimonials, FAQ, newsletter, and footer — all composed from FlexUI blocks.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><SaasLandingPlayground /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/page:saas-landing" filename="Terminal" /><p className="text-sm text-zinc-500">Installs the template and all block dependencies.</p></div>}
          manual={<div className="space-y-4"><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">1. Install all blocks</p><CodeBlock code="npx flexui add header-block hero-block features-block stats-block testimonials-block faq-block newsletter-block footer-block" filename="Terminal" /></div><div className="space-y-2"><p className="text-sm font-medium text-zinc-300">2. Copy template</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/pages/saas-landing.tsx</code></div></div></div>}
        />
      </DocSection>
      <DocSection id="sections" title="Included Sections">
        <div className="grid gap-3 sm:grid-cols-2">
          {[{ label: "Header", desc: "Glassmorphic navigation with CTA" }, { label: "Hero", desc: "Centered hero with badge and dual CTAs" }, { label: "Features", desc: "3-column animated feature grid" }, { label: "Stats", desc: "4-card statistics section" }, { label: "Testimonials", desc: "3-column testimonial grid" }, { label: "FAQ", desc: "Animated accordion" }, { label: "Newsletter", desc: "Email capture with success state" }, { label: "Footer", desc: "Multi-column footer with social links" }].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><p className="text-sm font-semibold text-white">{s.label}</p><p className="mt-1 text-xs text-zinc-500">{s.desc}</p></div>
          ))}
        </div>
      </DocSection>
    </div>
  );
}
