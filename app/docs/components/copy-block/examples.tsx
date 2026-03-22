"use client";

import React from "react";
import { CopyBlock } from "@/components/flexui/copy-block";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "cb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A code block with filename header and one-click copy.",
    preview: (
      <div className="w-full max-w-lg">
        <CopyBlock
          code={`import { CopyBlock } from "@/components/flexui/copy-block";

export default function App() {
  return <CopyBlock code="hello world" filename="app.tsx" />;
}`}
          filename="App.tsx"
          language="tsx"
        />
      </div>
    ),
    code: `<CopyBlock
  code={\`import { CopyBlock } from "@/components/flexui/copy-block";

export default function App() {
  return <CopyBlock code="hello world" filename="app.tsx" />;
}\`}
  filename="App.tsx"
  language="tsx"
/>`,
    filename: "default.tsx",
  },
  {
    id: "cb-terminal",
    title: "Terminal Command",
    tag: "Style",
    tagColor: "bg-green-500/10 text-green-400",
    description: "A terminal-style block for CLI installation commands.",
    preview: (
      <div className="w-full max-w-lg">
        <CopyBlock
          code="npx create-next-app@latest my-app --typescript --tailwind --eslint"
          filename="Terminal"
        />
      </div>
    ),
    code: `<CopyBlock
  code="npx create-next-app@latest my-app --typescript --tailwind --eslint"
  filename="Terminal"
/>`,
    filename: "terminal.tsx",
  },
  {
    id: "cb-language",
    title: "Language Label",
    tag: "Variant",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Using the language prop instead of filename for the header label.",
    preview: (
      <div className="w-full max-w-lg">
        <CopyBlock
          code={`const greeting = "Hello, FlexUI!";
console.log(greeting);

function add(a: number, b: number) {
  return a + b;
}`}
          language="typescript"
        />
      </div>
    ),
    code: `<CopyBlock
  code={\`const greeting = "Hello, FlexUI!";
console.log(greeting);

function add(a: number, b: number) {
  return a + b;
}\`}
  language="typescript"
/>`,
    filename: "language-label.tsx",
  },
  {
    id: "cb-multifile",
    title: "Multi-line Config",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A longer code block showing a configuration file.",
    preview: (
      <div className="w-full max-w-lg">
        <CopyBlock
          code={`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#8b5cf6",
      },
    },
  },
  plugins: [],
};`}
          filename="tailwind.config.js"
          language="javascript"
        />
      </div>
    ),
    code: `<CopyBlock
  code={\`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { brand: "#8b5cf6" } } },
  plugins: [],
};\`}
  filename="tailwind.config.js"
  language="javascript"
/>`,
    filename: "config.tsx",
  },
];

export function CopyBlockExamples() {
  return <ShowcaseGrid items={examples} />;
}
