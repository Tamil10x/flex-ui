"use client";
import React from "react";
import { ComparisonBlock } from "@/components/flexui/comparison-block";

function FullExample() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <ComparisonBlock
        heading="Choose Your Plan"
        subtitle="Compare features across plans."
        plans={[{ name: "Starter", price: "$0" }, { name: "Pro", price: "$19", period: "mo", featured: true }, { name: "Team", price: "$49", period: "mo" }]}
        features={[
          { name: "Users", category: "Limits", values: ["1", "5", "Unlimited"] },
          { name: "Storage", category: "Limits", values: ["1 GB", "50 GB", "Unlimited"] },
          { name: "API Access", category: "Features", values: [false, true, true] },
          { name: "Analytics", category: "Features", values: [false, true, true] },
          { name: "Email Support", category: "Support", values: [true, true, true] },
          { name: "Priority Support", category: "Support", values: [false, true, true] },
        ]}
      />
    </div>
  );
}

export function ComparisonBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><FullExample /><p className="text-xs text-zinc-500">Full comparison with grouped categories</p></div>
    </div>
  );
}
