import { CodeBlock } from "@/components/ui/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server — FlexUI",
  description: "Use FlexUI components through the Model Context Protocol for AI-assisted development.",
};

export default function McpServerPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-purple-400">Getting Started</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          MCP Server
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          FlexUI exposes a{" "}
          <span className="text-white">Model Context Protocol (MCP)</span>{" "}
          server, allowing AI coding assistants like Claude, Cursor, and
          Windsurf to discover and add components to your project.
        </p>
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* What is MCP */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">What is MCP?</h2>
        <p className="leading-relaxed text-zinc-400">
          The{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline underline-offset-4 hover:text-purple-300"
          >
            Model Context Protocol
          </a>{" "}
          is an open standard that lets AI assistants interact with external
          tools and data sources. FlexUI&apos;s MCP server gives AI tools direct
          access to our component registry — so they can browse, search, and add
          components to your codebase.
        </p>
      </section>

      {/* Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Configuration</h2>
        <p className="leading-relaxed text-zinc-400">
          Add the FlexUI MCP server to your AI tool&apos;s configuration:
        </p>

        <h3 className="text-lg font-medium text-white">Claude Desktop</h3>
        <CodeBlock
          code={`{
  "mcpServers": {
    "flexui": {
      "command": "npx",
      "args": ["-y", "@flexui/mcp-server"]
    }
  }
}`}
          filename="claude_desktop_config.json"
          language="json"
        />

        <h3 className="text-lg font-medium text-white">Cursor / VS Code</h3>
        <CodeBlock
          code={`{
  "mcp": {
    "servers": {
      "flexui": {
        "command": "npx",
        "args": ["-y", "@flexui/mcp-server"]
      }
    }
  }
}`}
          filename=".cursor/mcp.json"
          language="json"
        />
      </section>

      {/* Available tools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Available MCP Tools
        </h2>
        <p className="leading-relaxed text-zinc-400">
          Once connected, the MCP server exposes these tools to your AI
          assistant:
        </p>

        <div className="space-y-3">
          {[
            {
              name: "list_components",
              desc: "Returns all available FlexUI components with their names, descriptions, and dependency info.",
            },
            {
              name: "get_component",
              desc: "Fetches the full source code and metadata for a specific component.",
            },
            {
              name: "add_component",
              desc: "Runs the shadcn CLI to add a FlexUI component to the user's project, installing all dependencies.",
            },
            {
              name: "search_components",
              desc: "Searches the registry by keyword, tag, or tier (e.g., 'animation', 'webgl', 'tier-3').",
            },
          ].map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5"
            >
              <code className="text-sm font-semibold text-purple-400">
                {tool.name}
              </code>
              <p className="mt-1.5 text-sm text-zinc-500">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example conversation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Example AI Conversation
        </h2>
        <p className="leading-relaxed text-zinc-400">
          With the MCP server configured, you can ask your AI assistant:
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5">
            <p className="text-sm text-zinc-500">You:</p>
            <p className="mt-1 text-sm text-white">
              &quot;Add a magnetic button component from FlexUI to my project&quot;
            </p>
          </div>
          <div className="rounded-xl border border-purple-500/10 bg-purple-500/[0.02] p-5">
            <p className="text-sm text-zinc-500">AI Assistant:</p>
            <p className="mt-1 text-sm text-zinc-300">
              I found the <code className="text-purple-400">magnetic-button</code>{" "}
              component from FlexUI. It uses Framer Motion for spring-physics
              cursor tracking. Let me add it to your project...
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Running: <code className="text-green-400">npx shadcn@latest add @flexui/magnetic-button</code>
            </p>
          </div>
        </div>
      </section>

      {/* Status badge */}
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">
            COMING SOON
          </span>
          <p className="text-sm text-zinc-400">
            The FlexUI MCP server is currently in development. The registry API
            is live and can be consumed directly. Star the repo to get notified
            when the MCP server ships.
          </p>
        </div>
      </div>

      {/* Next step */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.04] p-6">
        <p className="text-sm text-zinc-400">
          See what&apos;s new in FlexUI.{" "}
          <a
            href="/docs/changelog"
            className="font-medium text-purple-400 underline underline-offset-4 hover:text-purple-300"
          >
            View the changelog →
          </a>
        </p>
      </div>
    </div>
  );
}
