"use client";
import React from "react";
import { ComparisonBlock } from "@/components/flexui/comparison-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const plans = [{ name: "Free", price: "$0" }, { name: "Pro", price: "$29", period: "mo", featured: true }, { name: "Enterprise", price: "Custom" }];
const features = [
  { name: "Components", category: "Features", values: ["50+" as string | boolean, "140+" as string | boolean, "140+" as string | boolean] },
  { name: "Themes", category: "Features", values: ["1" as string | boolean, "6" as string | boolean, "Unlimited" as string | boolean] },
  { name: "Page Templates", category: "Features", values: [false as string | boolean, true as string | boolean, true as string | boolean] },
  { name: "Priority Support", category: "Support", values: [false as string | boolean, true as string | boolean, true as string | boolean] },
];

const code = `import { ComparisonBlock } from "@/components/flexui/comparison-block";

export function Demo() {
  return (
    <ComparisonBlock
      plans={[{ name: "Free" }, { name: "Pro", featured: true }, { name: "Enterprise" }]}
      features={[
        { name: "Components", values: ["50+", "140+", "140+"] },
        { name: "Support", values: [false, true, true] },
      ]}
    />
  );
}`;

export function ComparisonBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Feature comparison table with boolean and string values.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><ComparisonBlock plans={plans} features={features} /></div>}
        code={code}
        filename="comparison-block-demo.tsx"
      />
    </div>
  );
}
