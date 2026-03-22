"use client";

import React, { useState } from "react";
import { NotificationBadge } from "@/components/flexui/notification-badge";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Bell, Inbox, Mail } from "lucide-react";

const code = `import { useState } from "react";
import { NotificationBadge } from "@/components/flexui/notification-badge";
import { Bell, Inbox, Mail } from "lucide-react";

export default function Demo() {
  const [count, setCount] = useState(5);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-8">
        <div className="relative inline-flex">
          <Bell className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={count} />
          </span>
        </div>
        <div className="relative inline-flex">
          <Inbox className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={142} maxCount={99} color="bg-purple-500" />
          </span>
        </div>
        <div className="relative inline-flex">
          <Mail className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={0} />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setCount(c => Math.max(0, c - 1))}>
          Decrease
        </button>
        <span>Count: {count}</span>
        <button onClick={() => setCount(c => c + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
}`;

function DemoContent() {
  const [count, setCount] = useState(5);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-8">
        <div className="relative inline-flex">
          <Bell className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={count} />
          </span>
        </div>
        <div className="relative inline-flex">
          <Inbox className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={142} maxCount={99} color="bg-purple-500" />
          </span>
        </div>
        <div className="relative inline-flex">
          <Mail className="h-6 w-6 text-zinc-300" />
          <span className="absolute -top-2 -right-2">
            <NotificationBadge count={0} />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          Decrease
        </button>
        <span className="text-sm text-zinc-500">Count: {count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]"
        >
          Increase
        </button>
      </div>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<DemoContent />}
      code={code}
      filename="notification-badge-demo.tsx"
    />
  );
}
