"use client";

import React from "react";
import { SparklineChart } from "@/components/flexui/sparkline-chart";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const revenueData = [12, 18, 14, 22, 19, 28, 25, 32, 30, 38, 35, 42];
const cpuData = [60, 72, 55, 80, 65, 90, 45, 70, 85, 50, 75, 68];
const stockData = [100, 95, 102, 88, 96, 91, 85, 92, 89, 94, 97, 101];

export function SparklineChartExamples() {
  return (
    <ShowcaseGrid
      items={[
        {
          id: "basic",
          title: "Basic Sparkline",
          tag: "Base",
          preview: (
            <div className="flex items-center justify-center py-8">
              <SparklineChart
                data={revenueData}
                width={240}
                height={50}
                animate
              />
            </div>
          ),
          code: `<SparklineChart
  data={[12, 18, 14, 22, 19, 28, 25, 32, 30, 38, 35, 42]}
  width={240}
  height={50}
  animate
/>`,
          filename: "basic.tsx",
        },
        {
          id: "area",
          title: "With Area Fill",
          tag: "Style",
          preview: (
            <div className="flex items-center justify-center py-8">
              <SparklineChart
                data={cpuData}
                width={240}
                height={50}
                showArea
                animate
                color="#a78bfa"
              />
            </div>
          ),
          code: `<SparklineChart
  data={[60, 72, 55, 80, 65, 90, 45, 70, 85, 50, 75, 68]}
  width={240}
  height={50}
  showArea
  animate
  color="#a78bfa"
/>`,
          filename: "area.tsx",
        },
        {
          id: "custom-color",
          title: "Custom Color",
          tag: "Props",
          preview: (
            <div className="flex items-center justify-center py-8">
              <SparklineChart
                data={stockData}
                width={240}
                height={50}
                showArea
                animate
                color="#f97316"
              />
            </div>
          ),
          code: `<SparklineChart
  data={[100, 95, 102, 88, 96, 91, 85, 92, 89, 94, 97, 101]}
  width={240}
  height={50}
  showArea
  animate
  color="#f97316"
/>`,
          filename: "custom-color.tsx",
        },
      ]}
    />
  );
}
