"use client";

import React from "react";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { ToastProvider, useToast } from "@/components/flexui/toast";

// ─── Individual toast type demos ─────────────────────────────────────────────

function SuccessToastDemo() {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast("Changes saved successfully!", "success")}
      className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
    >
      Trigger Success
    </button>
  );
}

function ErrorToastDemo() {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast("Failed to upload file. Please try again.", "error")}
      className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
    >
      Trigger Error
    </button>
  );
}

function InfoToastDemo() {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast("A new version is available. Refresh to update.", "info")}
      className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-400 transition-colors hover:bg-blue-500/20"
    >
      Trigger Info
    </button>
  );
}

function WarningToastDemo() {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast("You are running low on storage space.", "warning")}
      className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/20"
    >
      Trigger Warning
    </button>
  );
}

// ─── Wrapped demos ───────────────────────────────────────────────────────────

function WrappedSuccessDemo() {
  return (
    <ToastProvider position="top-right">
      <SuccessToastDemo />
    </ToastProvider>
  );
}

function WrappedErrorDemo() {
  return (
    <ToastProvider position="top-right">
      <ErrorToastDemo />
    </ToastProvider>
  );
}

function WrappedInfoDemo() {
  return (
    <ToastProvider position="top-right">
      <InfoToastDemo />
    </ToastProvider>
  );
}

function WrappedWarningDemo() {
  return (
    <ToastProvider position="top-right">
      <WarningToastDemo />
    </ToastProvider>
  );
}

const examples = [
  {
    id: "toast-success",
    title: "Success Toast",
    tag: "Base",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Green check icon for successful operations.",
    preview: <WrappedSuccessDemo />,
    code: `const { toast } = useToast();
toast("Changes saved successfully!", "success");`,
    filename: "success.tsx",
  },
  {
    id: "toast-error",
    title: "Error Toast",
    tag: "Base",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Red alert icon for error states.",
    preview: <WrappedErrorDemo />,
    code: `const { toast } = useToast();
toast("Failed to upload file. Please try again.", "error");`,
    filename: "error.tsx",
  },
  {
    id: "toast-info",
    title: "Info Toast",
    tag: "Base",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Blue info icon for informational messages.",
    preview: <WrappedInfoDemo />,
    code: `const { toast } = useToast();
toast("A new version is available.", "info");`,
    filename: "info.tsx",
  },
  {
    id: "toast-warning",
    title: "Warning Toast",
    tag: "Base",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Amber triangle icon for warning messages.",
    preview: <WrappedWarningDemo />,
    code: `const { toast } = useToast();
toast("You are running low on storage space.", "warning");`,
    filename: "warning.tsx",
  },
];

export function ToastExamples() {
  return <ShowcaseGrid items={examples} />;
}
