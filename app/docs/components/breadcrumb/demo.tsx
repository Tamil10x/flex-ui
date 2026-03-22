"use client";

import React from "react";
import { Breadcrumb } from "@/components/flexui/breadcrumb";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
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
      }
      code={`import { Breadcrumb } from "@/components/flexui/breadcrumb";

export function Demo() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Docs", href: "/docs" },
          { label: "Components", href: "/docs/components" },
          { label: "Breadcrumb" },
        ]}
      />

      {/* Custom separator */}
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]}
        separator=">"
      />
    </>
  );
}`}
      filename="breadcrumb-demo.tsx"
    />
  );
}
