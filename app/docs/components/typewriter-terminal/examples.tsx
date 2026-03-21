"use client";

import React from "react";
import { TypewriterTerminal } from "@/components/flexui/typewriter-terminal";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Dark theme demo ────────────────────────────────────────────────────────
function DarkThemeDemo() {
  return (
    <TypewriterTerminal
      commands={[
        {
          input: "git status",
          output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
          delay: 300,
        },
        {
          input: "git log --oneline -3",
          output: "a1b2c3d feat: add typewriter terminal\ne4f5g6h fix: resolve hydration mismatch\ni7j8k9l docs: update installation guide",
          delay: 500,
        },
      ]}
      title="git-status"
      theme="dark"
      typingSpeed={35}
    />
  );
}

// ─── Matrix theme demo ──────────────────────────────────────────────────────
function MatrixThemeDemo() {
  return (
    <TypewriterTerminal
      commands={[
        { input: "access --mainframe", output: "Connecting to mainframe...\nAccess granted.", delay: 400 },
        { input: "decrypt payload.enc", output: "Decrypting...\n[##########] 100%\nPayload decrypted successfully.", delay: 600 },
        { input: "cat secret.txt", output: "The Matrix has you...", delay: 500 },
      ]}
      title="matrix-terminal"
      theme="matrix"
      typingSpeed={30}
      loop
    />
  );
}

// ─── Looping install demo ───────────────────────────────────────────────────
function LoopingInstallDemo() {
  return (
    <TypewriterTerminal
      commands={[
        {
          input: "npm install @flexui/core",
          output: "added 42 packages in 2.1s\n\n3 packages are looking for funding\n  run `npm fund` for details",
          delay: 300,
        },
        {
          input: "npx flexui init",
          output: "Initializing FlexUI...\nConfig written to flexui.config.ts\nDone!",
          delay: 600,
        },
      ]}
      title="install-demo"
      theme="dark"
      typingSpeed={45}
      loop
    />
  );
}

const examples = [
  {
    id: "tt-dark",
    title: "Dark Theme",
    tag: "Theme",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Default dark terminal with git commands.",
    preview: <DarkThemeDemo />,
    code: `<TypewriterTerminal
  commands={[
    {
      input: "git status",
      output: "On branch main\\nnothing to commit, working tree clean",
      delay: 300,
    },
    {
      input: "git log --oneline -3",
      output: "a1b2c3d feat: add typewriter terminal\\ne4f5g6h fix: resolve hydration mismatch",
      delay: 500,
    },
  ]}
  title="git-status"
  theme="dark"
  typingSpeed={35}
/>`,
    filename: "dark-theme.tsx",
  },
  {
    id: "tt-matrix",
    title: "Matrix Theme",
    tag: "Theme",
    tagColor: "bg-green-500/10 text-green-400 border-green-500/20",
    description: "Green-on-black matrix style with loop enabled.",
    preview: <MatrixThemeDemo />,
    code: `<TypewriterTerminal
  commands={[
    { input: "access --mainframe", output: "Access granted.", delay: 400 },
    { input: "decrypt payload.enc", output: "Decrypting...\\n[##########] 100%", delay: 600 },
    { input: "cat secret.txt", output: "The Matrix has you...", delay: 500 },
  ]}
  title="matrix-terminal"
  theme="matrix"
  typingSpeed={30}
  loop
/>`,
    filename: "matrix-theme.tsx",
  },
  {
    id: "tt-loop",
    title: "Looping Install",
    tag: "Loop",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Auto-looping install sequence for marketing pages.",
    preview: <LoopingInstallDemo />,
    code: `<TypewriterTerminal
  commands={[
    {
      input: "npm install @flexui/core",
      output: "added 42 packages in 2.1s",
      delay: 300,
    },
    {
      input: "npx flexui init",
      output: "Initializing FlexUI...\\nDone!",
      delay: 600,
    },
  ]}
  title="install-demo"
  theme="dark"
  typingSpeed={45}
  loop
/>`,
    filename: "looping-install.tsx",
  },
];

export function TypewriterTerminalExamples() {
  return <ShowcaseGrid items={examples} />;
}
