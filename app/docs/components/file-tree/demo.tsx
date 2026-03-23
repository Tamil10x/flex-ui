"use client";

import React from "react";
import { FileTree } from "@/components/flexui/file-tree";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const items = [
  {
    name: "src",
    type: "folder" as const,
    children: [
      {
        name: "components",
        type: "folder" as const,
        children: [
          { name: "Button.tsx", type: "file" as const },
          { name: "Card.tsx", type: "file" as const },
          { name: "Modal.tsx", type: "file" as const },
        ],
      },
      {
        name: "hooks",
        type: "folder" as const,
        children: [
          { name: "useAuth.ts", type: "file" as const },
          { name: "useTheme.ts", type: "file" as const },
        ],
      },
      { name: "App.tsx", type: "file" as const },
      { name: "index.ts", type: "file" as const },
    ],
  },
  { name: "package.json", type: "file" as const },
  { name: "tsconfig.json", type: "file" as const },
];

const code = `import { FileTree } from "@/components/flexui/file-tree";

const items = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.tsx", type: "file" },
          { name: "Card.tsx", type: "file" },
          { name: "Modal.tsx", type: "file" },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "useAuth.ts", type: "file" },
          { name: "useTheme.ts", type: "file" },
        ],
      },
      { name: "App.tsx", type: "file" },
      { name: "index.ts", type: "file" },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
];

export default function Demo() {
  return <FileTree items={items} className="w-72" />;
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center">
          <FileTree items={items} className="w-72" />
        </div>
      }
      code={code}
      filename="file-tree-demo.tsx"
    />
  );
}
