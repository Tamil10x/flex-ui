"use client";
import React from "react";
import { Ecommerce } from "@/components/flexui/pages/ecommerce";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Ecommerce } from "@/components/flexui/pages/ecommerce";

export default function Page() {
  return <Ecommerce />;
}`;

export function EcommercePlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Full e-commerce storefront — scroll to see all sections.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ maxHeight: 600, overflowY: "auto" }}><Ecommerce /></div>}
        code={code}
        filename="app/shop/page.tsx"
      />
    </div>
  );
}
