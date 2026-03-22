"use client";

import React from "react";
import { CodeInline } from "@/components/flexui/code-inline";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "code-inline-default",
    title: "Default in Text",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Inline code snippets embedded within paragraph text.",
    preview: (
      <div className="max-w-md space-y-3 text-sm text-zinc-300">
        <p>
          Install the package with <CodeInline>npm install flexui</CodeInline> and import your component.
        </p>
        <p>
          Set <CodeInline>NODE_ENV=production</CodeInline> before running <CodeInline>next build</CodeInline>.
        </p>
      </div>
    ),
    code: `<p>
  Install the package with <CodeInline>npm install flexui</CodeInline> and import your component.
</p>
<p>
  Set <CodeInline>NODE_ENV=production</CodeInline> before running <CodeInline>next build</CodeInline>.
</p>`,
    filename: "default.tsx",
  },
  {
    id: "code-inline-types",
    title: "Type Labels",
    tag: "Compose",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Display TypeScript types and keywords as inline code chips.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <CodeInline>string</CodeInline>
        <CodeInline>number</CodeInline>
        <CodeInline>boolean</CodeInline>
        <CodeInline>ReactNode</CodeInline>
        <CodeInline>undefined</CodeInline>
        <CodeInline>{"Record<string, any>"}</CodeInline>
      </div>
    ),
    code: `<CodeInline>string</CodeInline>
<CodeInline>number</CodeInline>
<CodeInline>boolean</CodeInline>
<CodeInline>ReactNode</CodeInline>
<CodeInline>undefined</CodeInline>
<CodeInline>{"Record<string, any>"}</CodeInline>`,
    filename: "types.tsx",
  },
  {
    id: "code-inline-colored",
    title: "Colored Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Override border and background colors with className for themed code chips.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CodeInline className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">npm install</CodeInline>
        <CodeInline className="text-blue-400 border-blue-500/20 bg-blue-500/10">import</CodeInline>
        <CodeInline className="text-amber-400 border-amber-500/20 bg-amber-500/10">export default</CodeInline>
        <CodeInline className="text-red-400 border-red-500/20 bg-red-500/10">throw new Error</CodeInline>
      </div>
    ),
    code: `<CodeInline className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
  npm install
</CodeInline>
<CodeInline className="text-blue-400 border-blue-500/20 bg-blue-500/10">
  import
</CodeInline>
<CodeInline className="text-amber-400 border-amber-500/20 bg-amber-500/10">
  export default
</CodeInline>
<CodeInline className="text-red-400 border-red-500/20 bg-red-500/10">
  throw new Error
</CodeInline>`,
    filename: "colored.tsx",
  },
  {
    id: "code-inline-sizes",
    title: "Custom Sizes",
    tag: "Layout",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Adjust padding and font size for different contexts.",
    preview: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Small:</span>
          <CodeInline className="text-[11px] px-1 py-0">config</CodeInline>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Default:</span>
          <CodeInline>console.log()</CodeInline>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">Large:</span>
          <CodeInline className="text-base px-2.5 py-1">npx flexui add button</CodeInline>
        </div>
      </div>
    ),
    code: `{/* Small */}
<CodeInline className="text-[11px] px-1 py-0">config</CodeInline>

{/* Default */}
<CodeInline>console.log()</CodeInline>

{/* Large */}
<CodeInline className="text-base px-2.5 py-1">npx flexui add button</CodeInline>`,
    filename: "sizes.tsx",
  },
];

export function CodeInlineExamples() {
  return <ShowcaseGrid items={examples} />;
}
