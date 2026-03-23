"use client";

import React from "react";
import { EmptyState } from "@/components/flexui/empty-state";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Inbox, Upload, Search, FolderOpen } from "lucide-react";

const examples = [
  {
    id: "es-default",
    title: "Default with Action",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A standard empty state with icon, text, and a call-to-action button.",
    preview: (
      <EmptyState
        icon={<Upload className="h-12 w-12" />}
        title="No files uploaded"
        description="Drag and drop files here, or click the button below to browse your local files."
        action={{ label: "Upload Files", onClick: () => {} }}
        className="w-full max-w-md"
      />
    ),
    code: `import { Upload } from "lucide-react";

<EmptyState
  icon={<Upload className="h-12 w-12" />}
  title="No files uploaded"
  description="Drag and drop files here, or click the button below to browse."
  action={{ label: "Upload Files", onClick: () => {} }}
/>`,
    filename: "default.tsx",
  },
  {
    id: "es-no-action",
    title: "Without Action",
    tag: "Minimal",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A simpler empty state with just icon and descriptive text.",
    preview: (
      <EmptyState
        icon={<Search className="h-12 w-12" />}
        title="No results found"
        description="Try adjusting your search query or removing some filters to see more results."
        className="w-full max-w-md"
      />
    ),
    code: `import { Search } from "lucide-react";

<EmptyState
  icon={<Search className="h-12 w-12" />}
  title="No results found"
  description="Try adjusting your search query or removing some filters."
/>`,
    filename: "no-action.tsx",
  },
  {
    id: "es-inbox",
    title: "Inbox Empty",
    tag: "Pattern",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Empty inbox pattern for messaging or notification screens.",
    preview: (
      <EmptyState
        icon={<Inbox className="h-12 w-12" />}
        title="No messages yet"
        description="When you receive messages, they will appear here. Start a conversation to get going."
        action={{ label: "Compose Message", onClick: () => {} }}
        className="w-full max-w-md"
      />
    ),
    code: `import { Inbox } from "lucide-react";

<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="No messages yet"
  description="When you receive messages, they will appear here."
  action={{ label: "Compose Message", onClick: () => {} }}
/>`,
    filename: "inbox.tsx",
  },
  {
    id: "es-project",
    title: "New Project",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "An empty state for project dashboards encouraging creation.",
    preview: (
      <EmptyState
        icon={<FolderOpen className="h-14 w-14" />}
        title="No projects yet"
        description="Create your first project to start building something amazing."
        action={{ label: "New Project", onClick: () => {} }}
        className="w-full max-w-md min-h-[280px]"
      />
    ),
    code: `import { FolderOpen } from "lucide-react";

<EmptyState
  icon={<FolderOpen className="h-14 w-14" />}
  title="No projects yet"
  description="Create your first project to start building something amazing."
  action={{ label: "New Project", onClick: () => {} }}
  className="min-h-[280px]"
/>`,
    filename: "new-project.tsx",
  },
];

export function EmptyStateExamples() {
  return <ShowcaseGrid items={examples} />;
}
