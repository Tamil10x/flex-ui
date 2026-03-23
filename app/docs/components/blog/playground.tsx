"use client";
import React from "react";
import { Blog } from "@/components/flexui/pages/blog";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Blog } from "@/components/flexui/pages/blog";

export default function Page() {
  return <Blog />;
}`;

export function BlogPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Blog layout with articles, sidebar, and newsletter.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ maxHeight: 600, overflowY: "auto" }}><Blog /></div>}
        code={code}
        filename="app/blog/page.tsx"
      />
    </div>
  );
}
