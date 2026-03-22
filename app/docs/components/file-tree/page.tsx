import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

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
    </div>
  );
}
