"use client";
import React from "react";
import { LogoCloudBlock } from "@/components/flexui/logo-cloud-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const logos = [{ name: "Vercel" }, { name: "Stripe" }, { name: "Shopify" }, { name: "Linear" }, { name: "Notion" }, { name: "Figma" }];
const code = `import { LogoCloudBlock } from "@/components/flexui/logo-cloud-block";

export function Demo() {
  return <LogoCloudBlock logos={[{ name: "Vercel" }, { name: "Stripe" }, { name: "Shopify" }]} />;
}`;

export function LogoCloudBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Infinite scrolling logo marquee with edge fade masks.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><LogoCloudBlock logos={logos} /></div>}
        code={code}
        filename="logo-cloud-block-demo.tsx"
      />
    </div>
  );
}
