"use client";
import React from "react";
import { Dashboard } from "@/components/flexui/pages/dashboard";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { Dashboard } from "@/components/flexui/pages/dashboard";

export default function Page() {
  return <Dashboard />;
}`;

export function DashboardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Full dashboard layout with sidebar, KPIs, and charts.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ height: 600, overflowY: "auto" }}><Dashboard /></div>}
        code={code}
        filename="app/dashboard/page.tsx"
      />
    </div>
  );
}
