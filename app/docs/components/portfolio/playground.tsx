"use client";
import React from "react";
import { Portfolio } from "@/components/flexui/pages/portfolio";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Portfolio } from "@/components/flexui/pages/portfolio";

export default function Page() {
  return <Portfolio name="Jane Smith" role="Full-Stack Developer" />;
}`;

export function PortfolioPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Full portfolio page — scroll to see all sections.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ maxHeight: 600, overflowY: "auto" }}><Portfolio /></div>}
        code={code}
        filename="app/page.tsx"
      />
    </div>
  );
}
