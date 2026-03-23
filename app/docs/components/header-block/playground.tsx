"use client";

import React from "react";
import { HeaderBlock } from "@/components/flexui/header-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { HeaderBlock } from "@/components/flexui/header-block";

export function Demo() {
  return (
    <HeaderBlock
      logo="FlexUI"
      navItems={[
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
      ]}
      cta={{ label: "Get Started", href: "#" }}
      variant="glassmorphic"
    />
  );
}`;

export function HeaderBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">A responsive header with glassmorphic styling, nav links, and a CTA button.</p>
      <PreviewCodeTabs
        preview={
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
            <HeaderBlock
              logo="FlexUI"
              navItems={[
                { label: "Features", href: "#" },
                { label: "Pricing", href: "#" },
                { label: "Docs", href: "#" },
              ]}
              cta={{ label: "Get Started", href: "#" }}
              variant="glassmorphic"
              sticky={false}
            />
          </div>
        }
        code={code}
        filename="header-block-demo.tsx"
      />
    </div>
  );
}
