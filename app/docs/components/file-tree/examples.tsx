"use client";

import React from "react";
import { FileTree } from "@/components/flexui/file-tree";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const reactProjectItems = [
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
      { name: "App.tsx", type: "file" as const },
      { name: "index.ts", type: "file" as const },
    ],
  },
  { name: "package.json", type: "file" as const },
  { name: "tsconfig.json", type: "file" as const },
];

const nextjsItems = [
  {
    name: "app",
    type: "folder" as const,
    children: [
      { name: "layout.tsx", type: "file" as const },
      { name: "page.tsx", type: "file" as const },
      {
        name: "dashboard",
        type: "folder" as const,
        children: [
          { name: "page.tsx", type: "file" as const },
          {
            name: "settings",
            type: "folder" as const,
            children: [
              { name: "page.tsx", type: "file" as const },
              { name: "loading.tsx", type: "file" as const },
            ],
          },
        ],
      },
      {
        name: "api",
        type: "folder" as const,
        children: [
          { name: "route.ts", type: "file" as const },
        ],
      },
    ],
  },
  { name: "next.config.js", type: "file" as const },
  { name: ".env.local", type: "file" as const },
];

const monorepoItems = [
  {
    name: "packages",
    type: "folder" as const,
    children: [
      {
        name: "ui",
        type: "folder" as const,
        children: [
          { name: "button.tsx", type: "file" as const },
          { name: "dialog.tsx", type: "file" as const },
          { name: "index.ts", type: "file" as const },
        ],
      },
      {
        name: "utils",
        type: "folder" as const,
        children: [
          { name: "cn.ts", type: "file" as const },
          { name: "hooks.ts", type: "file" as const },
        ],
      },
    ],
  },
  {
    name: "apps",
    type: "folder" as const,
    children: [
      {
        name: "web",
        type: "folder" as const,
        children: [
          { name: "page.tsx", type: "file" as const },
          { name: "layout.tsx", type: "file" as const },
        ],
      },
    ],
  },
  { name: "turbo.json", type: "file" as const },
  { name: "pnpm-workspace.yaml", type: "file" as const },
];

const flatItems = [
  { name: "index.html", type: "file" as const },
  { name: "styles.css", type: "file" as const },
  { name: "script.js", type: "file" as const },
  { name: "README.md", type: "file" as const },
];

const examples = [
  {
    id: "ft-default",
    title: "React Project",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A typical React project structure with components and hooks folders.",
    preview: (
      <FileTree items={reactProjectItems} className="w-72" />
    ),
    code: `const items = [
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
      { name: "App.tsx", type: "file" },
      { name: "index.ts", type: "file" },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
];

<FileTree items={items} className="w-72" />`,
    filename: "react-project.tsx",
  },
  {
    id: "ft-nextjs",
    title: "Next.js App Router",
    tag: "Deep Nesting",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A deeply nested Next.js App Router structure with route groups and API routes.",
    preview: (
      <FileTree items={nextjsItems} className="w-72" />
    ),
    code: `const items = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "layout.tsx", type: "file" },
      { name: "page.tsx", type: "file" },
      {
        name: "dashboard",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          {
            name: "settings",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file" },
              { name: "loading.tsx", type: "file" },
            ],
          },
        ],
      },
      {
        name: "api",
        type: "folder",
        children: [{ name: "route.ts", type: "file" }],
      },
    ],
  },
  { name: "next.config.js", type: "file" },
  { name: ".env.local", type: "file" },
];

<FileTree items={items} className="w-72" />`,
    filename: "nextjs-app.tsx",
  },
  {
    id: "ft-monorepo",
    title: "Monorepo Structure",
    tag: "Advanced",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Turborepo-style monorepo with packages and apps workspaces.",
    preview: (
      <FileTree items={monorepoItems} className="w-80" />
    ),
    code: `const items = [
  {
    name: "packages",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "button.tsx", type: "file" },
          { name: "dialog.tsx", type: "file" },
          { name: "index.ts", type: "file" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "cn.ts", type: "file" },
          { name: "hooks.ts", type: "file" },
        ],
      },
    ],
  },
  {
    name: "apps",
    type: "folder",
    children: [
      {
        name: "web",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file" },
          { name: "layout.tsx", type: "file" },
        ],
      },
    ],
  },
  { name: "turbo.json", type: "file" },
  { name: "pnpm-workspace.yaml", type: "file" },
];

<FileTree items={items} className="w-80" />`,
    filename: "monorepo.tsx",
  },
  {
    id: "ft-styled",
    title: "Custom Styled",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A flat file list with custom width and background styling.",
    preview: (
      <FileTree
        items={flatItems}
        className="w-64 bg-zinc-900/60 border-zinc-800"
      />
    ),
    code: `<FileTree
  items={[
    { name: "index.html", type: "file" },
    { name: "styles.css", type: "file" },
    { name: "script.js", type: "file" },
    { name: "README.md", type: "file" },
  ]}
  className="w-64 bg-zinc-900/60 border-zinc-800"
/>`,
    filename: "custom-styled.tsx",
  },
];

export function FileTreeExamples() {
  return <ShowcaseGrid items={examples} />;
}
