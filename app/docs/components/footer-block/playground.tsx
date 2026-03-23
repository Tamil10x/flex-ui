"use client";

import React from "react";
import { FooterBlock } from "@/components/flexui/footer-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { FooterBlock } from "@/components/flexui/footer-block";

export function Demo() {
  return (
    <FooterBlock
      logo="FlexUI"
      description="Beautiful animated components for modern web apps."
      columns={[
        { title: "Product", links: [{ label: "Components", href: "#" }, { label: "Templates", href: "#" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Blog", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
      ]}
      social={[{ label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }]}
      copyright="© 2026 FlexUI. All rights reserved."
    />
  );
}`;

export function FooterBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">A multi-column footer with brand, navigation, social links, and copyright.</p>
      <PreviewCodeTabs
        preview={
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <FooterBlock logo="FlexUI" description="Beautiful animated components for modern web apps." columns={[{ title: "Product", links: [{ label: "Components", href: "#" }, { label: "Templates", href: "#" }] }, { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Blog", href: "#" }] }, { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] }]} social={[{ label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }]} copyright="© 2026 FlexUI. All rights reserved." />
          </div>
        }
        code={code}
        filename="footer-block-demo.tsx"
      />
    </div>
  );
}
