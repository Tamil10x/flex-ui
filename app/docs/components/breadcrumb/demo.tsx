"use client";

import React from "react";
import { Breadcrumb } from "@/components/flexui/breadcrumb";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Docs", href: "#" },
          { label: "Components", href: "#" },
          { label: "Breadcrumb" },
        ]}
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Profile" },
        ]}
        separator=">"
      />
      <Breadcrumb
        items={[
          { label: "Projects", href: "#" },
          { label: "FlexUI", href: "#" },
          { label: "src", href: "#" },
          { label: "components" },
        ]}
        separator={<span className="text-zinc-600">/</span>}
      />
    </div>
  );
}
