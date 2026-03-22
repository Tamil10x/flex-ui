import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { FileTreeExamples } from "./examples";
import { ChevronDownCircle, FolderTree, Layers, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "FileTree — FlexUI",
  description:
    "A collapsible file and folder tree view with animated expand/collapse, file and folder icons, and indentation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          FileTree
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A collapsible file and folder tree view with smooth animated
          expand/collapse, file and folder icons, and depth-based indentation.
          Perfect for code editors, documentation, and project explorers.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <FileTreeExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add file-tree`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { FileTree } from "@/components/flexui/file-tree";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`const items = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "App.tsx", type: "file" },
      { name: "index.ts", type: "file" },
    ],
  },
  { name: "package.json", type: "file" },
];

<FileTree items={items} />`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "items",
              type: "FileTreeItem[]",
              default: "\u2014",
              description:
                "Array of tree nodes. Each node has name, type ('file' | 'folder'), and optional children.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the tree container.",
            },
          ]}
        />
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-medium text-zinc-200">
            FileTreeItem
          </h3>
          <ApiTable
            rows={[
              {
                name: "name",
                type: "string",
                default: "\u2014",
                description: "Display name for the file or folder.",
                required: true,
              },
              {
                name: "type",
                type: '"file" | "folder"',
                default: "\u2014",
                description:
                  "Whether the node is a file or a folder. Folders can be expanded.",
                required: true,
              },
              {
                name: "children",
                type: "FileTreeItem[]",
                default: "\u2014",
                description:
                  "Nested items shown when a folder is expanded.",
              },
            ]}
          />
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <ChevronDownCircle className="h-4 w-4 text-blue-400" />, label: "Animated Expand/Collapse", desc: "Folders open and close with spring-based height animations for a smooth, natural feel." },
            { icon: <FolderTree className="h-4 w-4 text-blue-400" />, label: "File & Folder Icons", desc: "Built-in SVG icons differentiate files from folders with distinct visual styles." },
            { icon: <Layers className="h-4 w-4 text-blue-400" />, label: "Recursive Nesting", desc: "Supports deeply nested folder structures with automatic depth-based indentation." },
            { icon: <Eye className="h-4 w-4 text-blue-400" />, label: "Scroll-Triggered Entry", desc: "Each node fades and slides in when it enters the viewport with a depth-staggered delay." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="project-structure" title="Project Structure Display">
          <CodeBlock code={`<FileTree items={[
  {
    name: "components",
    type: "folder",
    children: [
      { name: "Button.tsx", type: "file" },
      { name: "Card.tsx", type: "file" },
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "dialog.tsx", type: "file" },
          { name: "tooltip.tsx", type: "file" },
        ],
      },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "tsconfig.json", type: "file" },
]} />`} filename="project.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-tree" title="Custom Width and Background">
          <CodeBlock code={`<FileTree
  items={items}
  className="max-w-sm bg-zinc-900/60 border-zinc-800"
/>`} filename="styled.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Folder nodes use <button> elements, making them keyboard-focusable and activatable via Enter or Space.", "File nodes use cursor-default styling to indicate they are not interactive.", "Consider adding aria-expanded on folder buttons for screen readers to convey open/closed state."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
