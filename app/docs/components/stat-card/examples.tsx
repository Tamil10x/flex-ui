"use client";

import React from "react";
import { StatCard } from "@/components/flexui/stat-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { DollarSign, Users, Activity, TrendingDown, ShoppingCart, Eye } from "lucide-react";

const examples = [
  {
    id: "sc-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A simple stat card with label, value, and positive change indicator.",
    preview: (
      <StatCard label="Revenue" value="$48.2k" change={12.5} />
    ),
    code: `<StatCard label="Revenue" value="$48.2k" change={12.5} />`,
    filename: "default.tsx",
  },
  {
    id: "sc-with-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Stat cards with contextual Lucide icons in the top-right corner.",
    preview: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <StatCard
          label="Revenue"
          value="$48.2k"
          change={12.5}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Users"
          value="12,847"
          change={8.3}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Active Now"
          value="1,024"
          change={23.1}
          icon={<Activity className="h-5 w-5" />}
        />
      </div>
    ),
    code: `import { DollarSign, Users, Activity } from "lucide-react";

<StatCard
  label="Revenue"
  value="$48.2k"
  change={12.5}
  icon={<DollarSign className="h-5 w-5" />}
/>
<StatCard
  label="Users"
  value="12,847"
  change={8.3}
  icon={<Users className="h-5 w-5" />}
/>
<StatCard
  label="Active Now"
  value="1,024"
  change={23.1}
  icon={<Activity className="h-5 w-5" />}
/>`,
    filename: "with-icons.tsx",
  },
  {
    id: "sc-negative",
    title: "Negative Changes",
    tag: "State",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Cards showing declining metrics with red change indicators.",
    preview: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <StatCard
          label="Bounce Rate"
          value="34.2%"
          change={-5.1}
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <StatCard
          label="Cart Abandonment"
          value="67.8%"
          change={-12.3}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
      </div>
    ),
    code: `import { TrendingDown, ShoppingCart } from "lucide-react";

<StatCard
  label="Bounce Rate"
  value="34.2%"
  change={-5.1}
  icon={<TrendingDown className="h-5 w-5" />}
/>
<StatCard
  label="Cart Abandonment"
  value="67.8%"
  change={-12.3}
  icon={<ShoppingCart className="h-5 w-5" />}
/>`,
    filename: "negative.tsx",
  },
  {
    id: "sc-dashboard",
    title: "Dashboard Row",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "A full dashboard metrics row with mixed positive and negative changes.",
    preview: (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        <StatCard
          label="Revenue"
          value="$128k"
          change={18.2}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Orders"
          value="3,421"
          change={7.5}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <StatCard
          label="Views"
          value="89.2k"
          change={-2.4}
          icon={<Eye className="h-5 w-5" />}
        />
        <StatCard
          label="Users"
          value="24.1k"
          change={14.8}
          icon={<Users className="h-5 w-5" />}
        />
      </div>
    ),
    code: `import { DollarSign, ShoppingCart, Eye, Users } from "lucide-react";

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  <StatCard label="Revenue" value="$128k" change={18.2}
    icon={<DollarSign className="h-5 w-5" />} />
  <StatCard label="Orders" value="3,421" change={7.5}
    icon={<ShoppingCart className="h-5 w-5" />} />
  <StatCard label="Views" value="89.2k" change={-2.4}
    icon={<Eye className="h-5 w-5" />} />
  <StatCard label="Users" value="24.1k" change={14.8}
    icon={<Users className="h-5 w-5" />} />
</div>`,
    filename: "dashboard.tsx",
  },
];

export function StatCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
