"use client";

import React, { useState } from "react";
import { NotificationBadge } from "@/components/flexui/notification-badge";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Bell, Mail, MessageSquare, ShoppingCart } from "lucide-react";

function InteractiveBadge() {
  const [count, setCount] = useState(5);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative inline-flex">
        <Bell className="h-7 w-7 text-zinc-300" />
        <span className="absolute -top-2 -right-2">
          <NotificationBadge count={count} />
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          -
        </button>
        <span className="min-w-[40px] text-center text-sm text-zinc-500">{count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          +
        </button>
      </div>
    </div>
  );
}

const examples = [
  {
    id: "nb-default",
    title: "Interactive Counter",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Increase or decrease the count to see the badge animate in and out.",
    preview: <InteractiveBadge />,
    code: `const [count, setCount] = useState(5);

<div className="relative inline-flex">
  <Bell className="h-7 w-7 text-zinc-300" />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={count} />
  </span>
</div>

<button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
<button onClick={() => setCount(c => c + 1)}>+</button>`,
    filename: "interactive.tsx",
  },
  {
    id: "nb-icons",
    title: "On Different Icons",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Attach notification badges to various icon types for app navigation.",
    preview: (
      <div className="flex items-center gap-10">
        <div className="relative inline-flex">
          <Bell className="h-6 w-6 text-zinc-400" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={3} />
          </span>
        </div>
        <div className="relative inline-flex">
          <Mail className="h-6 w-6 text-zinc-400" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={12} color="bg-blue-500" />
          </span>
        </div>
        <div className="relative inline-flex">
          <MessageSquare className="h-6 w-6 text-zinc-400" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={99} color="bg-emerald-500" />
          </span>
        </div>
        <div className="relative inline-flex">
          <ShoppingCart className="h-6 w-6 text-zinc-400" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={2} color="bg-amber-500" />
          </span>
        </div>
      </div>
    ),
    code: `import { Bell, Mail, MessageSquare, ShoppingCart } from "lucide-react";

<div className="relative inline-flex">
  <Bell className="h-6 w-6 text-zinc-400" />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={3} />
  </span>
</div>

<div className="relative inline-flex">
  <Mail className="h-6 w-6 text-zinc-400" />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={12} color="bg-blue-500" />
  </span>
</div>

<div className="relative inline-flex">
  <MessageSquare className="h-6 w-6 text-zinc-400" />
  <span className="absolute -top-2 -right-2">
    <NotificationBadge count={99} color="bg-emerald-500" />
  </span>
</div>`,
    filename: "on-icons.tsx",
  },
  {
    id: "nb-overflow",
    title: "Max Count Overflow",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "When count exceeds maxCount, the badge shows overflow text like '9+' or '99+'.",
    preview: (
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={5} maxCount={9} />
          <span className="text-[10px] text-zinc-600">5 of 9</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={15} maxCount={9} />
          <span className="text-[10px] text-zinc-600">15 (9+)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={42} maxCount={99} />
          <span className="text-[10px] text-zinc-600">42 of 99</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={150} maxCount={99} />
          <span className="text-[10px] text-zinc-600">150 (99+)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={999} maxCount={99} />
          <span className="text-[10px] text-zinc-600">999 (99+)</span>
        </div>
      </div>
    ),
    code: `<NotificationBadge count={5} maxCount={9} />
<NotificationBadge count={15} maxCount={9} />   {/* Shows "9+" */}
<NotificationBadge count={42} maxCount={99} />
<NotificationBadge count={150} maxCount={99} /> {/* Shows "99+" */}
<NotificationBadge count={999} maxCount={99} /> {/* Shows "99+" */}`,
    filename: "overflow.tsx",
  },
  {
    id: "nb-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Customize the badge color using Tailwind background classes.",
    preview: (
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={3} color="bg-red-500" />
          <span className="text-[10px] text-zinc-600">Red</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={7} color="bg-blue-500" />
          <span className="text-[10px] text-zinc-600">Blue</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={5} color="bg-emerald-500" />
          <span className="text-[10px] text-zinc-600">Emerald</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={2} color="bg-purple-500" />
          <span className="text-[10px] text-zinc-600">Purple</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={9} color="bg-amber-500" />
          <span className="text-[10px] text-zinc-600">Amber</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NotificationBadge count={1} color="bg-pink-500" />
          <span className="text-[10px] text-zinc-600">Pink</span>
        </div>
      </div>
    ),
    code: `<NotificationBadge count={3} color="bg-red-500" />
<NotificationBadge count={7} color="bg-blue-500" />
<NotificationBadge count={5} color="bg-emerald-500" />
<NotificationBadge count={2} color="bg-purple-500" />
<NotificationBadge count={9} color="bg-amber-500" />
<NotificationBadge count={1} color="bg-pink-500" />`,
    filename: "colors.tsx",
  },
];

export function NotificationBadgeExamples() {
  return <ShowcaseGrid items={examples} />;
}
