"use client";

import React, { useState } from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PortalTransition } from "@/components/flexui/portal-transition";

const code = `import { PortalTransition } from "@/components/flexui/portal-transition";
import { useState } from "react";

export function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
      >
        {open ? "Close Portal" : "Open Portal"}
      </button>
      <PortalTransition isOpen={open} className="min-h-[400px]">
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-950 to-black p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome</h1>
            <p className="mt-2 text-zinc-400">You have entered the portal.</p>
          </div>
        </div>
      </PortalTransition>
    </div>
  );
}`;

function PlaygroundInner() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
      >
        {open ? "Close Portal" : "Open Portal"}
      </button>
      <PortalTransition isOpen={open} className="min-h-[400px]">
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-950 to-black p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Welcome</h1>
            <p className="mt-2 text-zinc-400">
              You have entered the portal.
            </p>
          </div>
        </div>
      </PortalTransition>
    </div>
  );
}

export function PortalTransitionPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={<PlaygroundInner />}
        code={code}
        filename="portal-transition-demo.tsx"
      />
    </div>
  );
}
