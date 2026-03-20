"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ToastProvider, useToast } from "@/components/flexui/toast";

const code = `import { ToastProvider, useToast } from "@/components/flexui/toast";

function Demo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => toast("File saved successfully!", "success")}>
        Success
      </button>
      <button onClick={() => toast("Something went wrong.", "error")}>
        Error
      </button>
      <button onClick={() => toast("New update available.", "info")}>
        Info
      </button>
      <button onClick={() => toast("Storage almost full.", "warning")}>
        Warning
      </button>
    </div>
  );
}

// Wrap your app (or page) with the provider:
<ToastProvider position="top-right">
  <Demo />
</ToastProvider>`;

function ToastButtons() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => toast("File saved successfully!", "success")}
        className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
      >
        Success
      </button>
      <button
        onClick={() => toast("Something went wrong.", "error")}
        className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
      >
        Error
      </button>
      <button
        onClick={() => toast("New update available.", "info")}
        className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-500/20"
      >
        Info
      </button>
      <button
        onClick={() => toast("Storage almost full.", "warning")}
        className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/20"
      >
        Warning
      </button>
    </div>
  );
}

export function ToastPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center">
            <ToastProvider position="top-right">
              <ToastButtons />
            </ToastProvider>
          </div>
        }
        code={code}
        filename="toast-demo.tsx"
      />
    </div>
  );
}
