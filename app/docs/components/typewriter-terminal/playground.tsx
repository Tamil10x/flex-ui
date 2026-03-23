"use client";

import React from "react";
import { TypewriterTerminal } from "@/components/flexui/typewriter-terminal";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { TypewriterTerminal } from "@/components/flexui/typewriter-terminal";

const commands = [
  {
    input: "npx create-next-app@latest my-app",
    output: "Creating a new Next.js app in ./my-app...\\n\\nInstalling dependencies:\\n- react\\n- react-dom\\n- next\\n\\nSuccess! Created my-app",
    delay: 500,
  },
  {
    input: "cd my-app && npm run dev",
    output: "  ▲ Next.js 15.1.0\\n  - Local:   http://localhost:3000\\n  - Ready in 1.2s",
    delay: 800,
  },
];

export default function Demo() {
  return (
    <TypewriterTerminal
      commands={commands}
      title="terminal"
      theme="dark"
      typingSpeed={40}
    />
  );
}`;

const commands = [
  {
    input: "npx create-next-app@latest my-app",
    output:
      "Creating a new Next.js app in ./my-app...\n\nInstalling dependencies:\n- react\n- react-dom\n- next\n\nSuccess! Created my-app",
    delay: 500,
  },
  {
    input: "cd my-app && npm run dev",
    output:
      "  \u25B2 Next.js 15.1.0\n  - Local:   http://localhost:3000\n  - Ready in 1.2s",
    delay: 800,
  },
];

export function TypewriterTerminalPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full items-center justify-center p-6">
            <div className="w-full max-w-xl">
              <TypewriterTerminal
                commands={commands}
                title="terminal"
                theme="dark"
                typingSpeed={40}
              />
            </div>
          </div>
        }
        code={code}
        filename="typewriter-terminal-demo.tsx"
      />
    </div>
  );
}
