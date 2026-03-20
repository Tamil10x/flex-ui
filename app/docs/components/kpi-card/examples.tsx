"use client";

import React from "react";
import { KPICard } from "@/components/flexui/kpi-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

export function KPICardExamples() {
  return (
    <ShowcaseGrid
      items={[
        {
          id: "basic",
          title: "Basic KPI",
          tag: "Base",
          preview: (
            <div className="flex items-center justify-center py-6">
              <KPICard
                title="Total Revenue"
                value={48250}
                prefix="$"
                change={12.5}
                className="w-72"
              />
            </div>
          ),
          code: `<KPICard
  title="Total Revenue"
  value={48250}
  prefix="$"
  change={12.5}
/>`,
          filename: "basic.tsx",
        },
        {
          id: "with-sparkline",
          title: "With Sparkline",
          tag: "Compose",
          preview: (
            <div className="flex items-center justify-center py-6">
              <KPICard
                title="Active Users"
                value={3842}
                change={8.3}
                sparklineData={[10, 14, 12, 18, 16, 22, 20, 26, 24, 30, 28, 34]}
                className="w-72"
              />
            </div>
          ),
          code: `<KPICard
  title="Active Users"
  value={3842}
  change={8.3}
  sparklineData={[10, 14, 12, 18, 16, 22, 20, 26, 24, 30, 28, 34]}
/>`,
          filename: "with-sparkline.tsx",
        },
        {
          id: "negative-change",
          title: "Negative Change",
          tag: "State",
          preview: (
            <div className="flex items-center justify-center py-6">
              <KPICard
                title="Bounce Rate"
                value={24.6}
                suffix="%"
                change={-3.2}
                sparklineData={[22, 18, 25, 20, 28, 24, 30, 26, 22, 19, 24, 21]}
                className="w-72"
              />
            </div>
          ),
          code: `<KPICard
  title="Bounce Rate"
  value={24.6}
  suffix="%"
  change={-3.2}
  sparklineData={[22, 18, 25, 20, 28, 24, 30, 26, 22, 19, 24, 21]}
/>`,
          filename: "negative-change.tsx",
        },
      ]}
    />
  );
}
