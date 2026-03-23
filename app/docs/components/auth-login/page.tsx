import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AuthLoginPlayground } from "./playground";

export const metadata: Metadata = { title: "Auth Login Page — FlexUI", description: "Split-layout authentication page with decorative brand panel and login form." };

export default function AuthLoginDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">Page Template</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Auth Login Page</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A split-layout authentication page with a decorative brand panel and login form with social providers.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview"><AuthLoginPlayground /></DocSection>
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={<div className="space-y-3"><CodeBlock code="npx shadcn@latest add @flexui/page:auth-login" filename="Terminal" /></div>}
          manual={<div className="space-y-2"><p className="text-sm font-medium text-zinc-300">Copy template</p><div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4"><code className="text-xs text-zinc-400">components/flexui/pages/auth-login.tsx</code></div></div>}
        />
      </DocSection>
    </div>
  );
}
