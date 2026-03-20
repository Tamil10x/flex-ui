"use client";

import React, { useState } from "react";
import { AnimatedInput } from "@/components/flexui/animated-input";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Basic Input ────────────────────────────────────────────────────────────
function BasicInputPreview() {
  return (
    <div className="w-full max-w-xs">
      <AnimatedInput label="Username" />
    </div>
  );
}

// ─── Colored Accents ────────────────────────────────────────────────────────
function ColoredInputsPreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <AnimatedInput label="Purple accent" accentColor="#8b5cf6" />
      <AnimatedInput label="Emerald accent" accentColor="#10b981" />
      <AnimatedInput label="Rose accent" accentColor="#f43f5e" />
    </div>
  );
}

// ─── Login Form ─────────────────────────────────────────────────────────────
function LoginFormPreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <AnimatedInput label="Email" type="email" accentColor="#3b82f6" />
      <AnimatedInput label="Password" type="password" accentColor="#3b82f6" />
      <button className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
        Sign In
      </button>
    </div>
  );
}

const examples = [
  {
    id: "ai-basic",
    title: "Basic Input",
    tag: "Default",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Simple input with animated floating label.",
    preview: <BasicInputPreview />,
    code: `<AnimatedInput label="Username" />`,
    filename: "basic.tsx",
  },
  {
    id: "ai-colored",
    title: "Custom Accent Colors",
    tag: "Themed",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Different accent colors for focus state.",
    preview: <ColoredInputsPreview />,
    code: `<AnimatedInput label="Purple accent" accentColor="#8b5cf6" />
<AnimatedInput label="Emerald accent" accentColor="#10b981" />
<AnimatedInput label="Rose accent" accentColor="#f43f5e" />`,
    filename: "colored.tsx",
  },
  {
    id: "ai-login",
    title: "Login Form",
    tag: "Form",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Email + password inputs composed into a login form.",
    preview: <LoginFormPreview />,
    code: `<div className="flex flex-col gap-4 w-full max-w-xs">
  <AnimatedInput label="Email" type="email" accentColor="#3b82f6" />
  <AnimatedInput label="Password" type="password" accentColor="#3b82f6" />
  <button className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white">
    Sign In
  </button>
</div>`,
    filename: "login-form.tsx",
  },
];

export function AnimatedInputExamples() {
  return <ShowcaseGrid items={examples} />;
}
