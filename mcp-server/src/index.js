#!/usr/bin/env node

/**
 * FlexUI MCP Server
 *
 * Exposes FlexUI's 157+ component registry to AI assistants via
 * the Model Context Protocol (MCP). Works with Claude Desktop,
 * Cursor, Windsurf, and any MCP-compatible client.
 *
 * Tools:
 *   list_components  — List all components (optionally filtered by category/tier)
 *   get_component    — Get full details + source path for a component
 *   search_components — Fuzzy search by keyword across names, tags, descriptions
 *   add_component    — Generate the CLI command to add a component
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ── Load registry ───────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(
  readFileSync(join(__dirname, "..", "registry.json"), "utf-8")
);
const components = registry.components;

// ── Helpers ─────────────────────────────────────────────────────────────────

function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  // simple token match
  const tokens = q.split(/\s+/);
  return tokens.every((tok) => t.includes(tok));
}

function searchComponents(query, category, tier) {
  let results = [...components];

  if (category) {
    results = results.filter(
      (c) => c.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (tier !== undefined && tier !== null) {
    results = results.filter((c) => c.tier === Number(tier));
  }
  if (query) {
    results = results.filter((c) => {
      const searchable = [
        c.name,
        c.label,
        c.description,
        c.category,
        ...c.tags,
      ].join(" ");
      return fuzzyMatch(query, searchable);
    });
  }

  return results;
}

function formatComponent(c) {
  return {
    name: c.name,
    label: c.label,
    tier: c.tier,
    tierLabel: registry.tiers[String(c.tier)],
    category: c.category,
    tags: c.tags,
    description: c.description,
    dependencies: c.dependencies,
    sourcePath: `components/flexui/${c.name}.tsx`,
    docsPath: `/docs/components/${c.name}`,
    installCommand: `npx shadcn@latest add "${c.name}"`,
  };
}

// ── MCP Server ──────────────────────────────────────────────────────────────

const server = new Server(
  {
    name: "flexui",
    version: registry.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ── Tool Definitions ────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_components",
      description:
        "List all FlexUI components. Optionally filter by category (button, card, text, effect, background, etc.) or tier (1=Primitives, 2=Cinematic, 3=WebGL).",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description:
              "Filter by category: animation, background, block, button, card, cursor, data, display, effect, form, layout, navigation, overlay, scroll, text, webgl",
          },
          tier: {
            type: "number",
            description:
              "Filter by tier: 1 (Enhanced Primitives), 2 (Cinematic Blocks), 3 (WebGL Experiences)",
            enum: [1, 2, 3],
          },
        },
      },
    },
    {
      name: "get_component",
      description:
        "Get full details for a specific FlexUI component including description, dependencies, source path, docs link, and install command.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              'Component name (kebab-case), e.g. "shimmer-button", "spotlight-card", "holographic-card"',
          },
        },
        required: ["name"],
      },
    },
    {
      name: "search_components",
      description:
        "Search FlexUI components by keyword. Matches against names, tags, descriptions, and categories. Example queries: 'animated button', '3d card', 'scroll effect', 'glow'.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (e.g. 'glow card', 'text animation', 'webgl 3d')",
          },
          category: {
            type: "string",
            description: "Optional category filter",
          },
          tier: {
            type: "number",
            description: "Optional tier filter (1, 2, or 3)",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "add_component",
      description:
        "Get the install command and setup instructions for adding a FlexUI component to a project.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component name (kebab-case) to add",
          },
        },
        required: ["name"],
      },
    },
  ],
}));

// ── Tool Handlers ───────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_components": {
      let results = [...components];
      if (args?.category) {
        results = results.filter(
          (c) => c.category.toLowerCase() === args.category.toLowerCase()
        );
      }
      if (args?.tier) {
        results = results.filter((c) => c.tier === Number(args.tier));
      }

      const summary = results.map(
        (c) => `${c.label} (${c.name}) — Tier ${c.tier} ${c.category} — ${c.description}`
      );

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} components${args?.category ? ` in category "${args.category}"` : ""}${args?.tier ? ` at tier ${args.tier}` : ""}:\n\n${summary.join("\n")}`,
          },
        ],
      };
    }

    case "get_component": {
      const comp = components.find(
        (c) => c.name === args.name || c.label === args.name
      );
      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${args.name}" not found. Use search_components to find available components.`,
            },
          ],
          isError: true,
        };
      }

      const details = formatComponent(comp);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(details, null, 2),
          },
        ],
      };
    }

    case "search_components": {
      const results = searchComponents(args.query, args?.category, args?.tier);

      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No components found matching "${args.query}". Try broader terms like "button", "card", "text", "effect", or "3d".`,
            },
          ],
        };
      }

      const formatted = results.slice(0, 20).map(
        (c) =>
          `**${c.label}** (\`${c.name}\`) — Tier ${c.tier} · ${c.category}\n  ${c.description}\n  Tags: ${c.tags.join(", ")}`
      );

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} component${results.length === 1 ? "" : "s"} matching "${args.query}"${results.length > 20 ? " (showing first 20)" : ""}:\n\n${formatted.join("\n\n")}`,
          },
        ],
      };
    }

    case "add_component": {
      const comp = components.find(
        (c) => c.name === args.name || c.label === args.name
      );
      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${args.name}" not found.`,
            },
          ],
          isError: true,
        };
      }

      const details = formatComponent(comp);
      const depsInfo =
        comp.dependencies.length > 0
          ? `\n\nRequired dependencies:\n  npm install ${comp.dependencies.join(" ")}`
          : "\n\nNo additional dependencies needed.";

      return {
        content: [
          {
            type: "text",
            text: `To add **${comp.label}** to your project:\n\n1. Install the component:\n   ${details.installCommand}\n\n2. The component will be added to:\n   ${details.sourcePath}${depsInfo}\n\n3. Import in your code:\n   import { ${comp.label} } from "@/components/flexui/${comp.name}";`,
          },
        ],
      };
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

// ── Start ───────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("FlexUI MCP Server running — connected via stdio");
}

main().catch((err) => {
  console.error("Failed to start FlexUI MCP server:", err);
  process.exit(1);
});
