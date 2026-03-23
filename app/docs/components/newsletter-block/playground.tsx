"use client";

import React from "react";
import { NewsletterBlock } from "@/components/flexui/newsletter-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { NewsletterBlock } from "@/components/flexui/newsletter-block";

export function Demo() {
  return (
    <NewsletterBlock
      heading="Stay Updated"
      subtitle="Get the latest updates on new components."
      onSubmit={async (email) => console.log("Subscribed:", email)}
    />
  );
}`;

export function NewsletterBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Email capture with loading and success states.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><NewsletterBlock heading="Stay Updated" subtitle="Get the latest updates on new components and features." /></div>}
        code={code}
        filename="newsletter-block-demo.tsx"
      />
    </div>
  );
}
