"use client";
import React from "react";
import { Pricing } from "@/components/flexui/pages/pricing";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Pricing } from "@/components/flexui/pages/pricing";

export default function Page() {
  return <Pricing />;
}`;

export function PricingPagePlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Full pricing page with tiers, FAQ, and logo cloud.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ maxHeight: 600, overflowY: "auto" }}><Pricing /></div>}
        code={code}
        filename="app/pricing/page.tsx"
      />
    </div>
  );
}
