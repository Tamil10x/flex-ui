"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";

/* ── Animations ─────────────────────────────────────────────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const } },
};

/* ── Data ───────────────────────────────────────────────────────────────── */
const tools = [
  {
    name: "list_components",
    desc: "Browse all 157+ components with filtering by category and tier.",
    icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    example: '"List all WebGL tier-3 components"',
  },
  {
    name: "get_component",
    desc: "Get full source path, dependencies, docs link, and install command.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    example: '"Get details for holographic-card"',
  },
  {
    name: "search_components",
    desc: "Fuzzy search across names, tags, and descriptions.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    example: '"Search for animated glow effects"',
  },
  {
    name: "add_component",
    desc: "Generate the CLI install command with all dependencies.",
    icon: "M12 4v16m8-8H4",
    example: '"Add shimmer-button to my project"',
  },
];

const configSnippets = {
  claude: {
    label: "Claude Desktop",
    file: "claude_desktop_config.json",
    code: `{
  "mcpServers": {
    "flexui": {
      "command": "npx",
      "args": ["-y", "@flexui/mcp-server"]
    }
  }
}`,
  },
  cursor: {
    label: "Cursor / VS Code",
    file: ".cursor/mcp.json",
    code: `{
  "mcp": {
    "servers": {
      "flexui": {
        "command": "npx",
        "args": ["-y", "@flexui/mcp-server"]
      }
    }
  }
}`,
  },
  windsurf: {
    label: "Windsurf",
    file: ".windsurf/mcp.json",
    code: `{
  "mcpServers": {
    "flexui": {
      "command": "npx",
      "args": ["-y", "@flexui/mcp-server"]
    }
  }
}`,
  },
};

type ConfigKey = keyof typeof configSnippets;

const conversation = [
  { role: "user" as const, text: "Add a magnetic button from FlexUI to my project" },
  {
    role: "ai" as const,
    text: `I found the **MagneticButton** component — it uses Framer Motion for spring-physics cursor tracking.

**Installing:**
\`\`\`
npx shadcn@latest add "magnetic-button"
\`\`\`

Dependencies: \`framer-motion\`
Source: \`components/flexui/magnetic-button.tsx\``,
  },
  { role: "user" as const, text: "Show me all card components with glow effects" },
  {
    role: "ai" as const,
    text: `Found **5 matching components**:

• **NeonGlowCard** — Neon glow border on hover
• **SpotlightCard** — Cursor-tracking spotlight gradient
• **AuroraCard** — Animated aurora gradient border
• **HolographicCard** — Pokemon-style holographic foil (Tier 3)
• **ReflectiveCard** — Light reflection on mouse move`,
  },
];

/* ── Copy Button ────────────────────────────────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="absolute right-3 top-3 rounded-md px-2 py-1 text-[10px] font-medium transition-all duration-200 hover:brightness-125"
      style={{ background: "var(--flexui-surface-hover)", color: "var(--flexui-caption)", border: "1px solid var(--flexui-border)" }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────────── */
export default function McpServerPage() {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];
  const accent = currentTheme?.tokens["--flexui-accent"] ?? "#A78BFA";
  const secondary = currentTheme?.tokens["--flexui-secondary"] ?? "#818CF8";
  const glowPrimary = currentTheme?.tokens["--flexui-glow-primary"] ?? "167,139,250";
  const [activeConfig, setActiveConfig] = useState<ConfigKey>("claude");

  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{ background: `rgba(${glowPrimary}, 0.12)`, color: accent, border: `1px solid rgba(${glowPrimary}, 0.18)` }}
          >
            MCP Server
          </span>
          <motion.span
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(52, 211, 153, 0.12)", color: "#34D399", border: "1px solid rgba(52, 211, 153, 0.2)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </motion.span>
        </div>

        <h1
          className="mt-5 text-4xl font-bold tracking-tight"
          style={{ color: "var(--flexui-heading)" }}
        >
          MCP Server
        </h1>
        <p
          className="mt-3 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--flexui-body)" }}
        >
          FlexUI exposes a{" "}
          <strong style={{ color: "var(--flexui-heading)" }}>Model Context Protocol</strong>{" "}
          server — letting AI assistants like Claude, Cursor, and Windsurf discover,
          search, and add any of our{" "}
          <strong style={{ color: accent }}>157+ components</strong>{" "}
          directly to your codebase.
        </p>
      </div>

      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, opacity: 0.2 }} />

      {/* ── What is MCP ── */}
      <section>
        <h2 className="text-2xl font-bold" style={{ color: "var(--flexui-heading)" }}>What is MCP?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: "var(--flexui-body)" }}>
          The{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{ color: accent }}
          >
            Model Context Protocol
          </a>{" "}
          is an open standard that lets AI assistants interact with external tools and
          data sources. FlexUI&apos;s MCP server gives AI tools direct access to our entire
          component registry — browse, search, and install in natural language.
        </p>

        {/* How it works diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-8 grid gap-3 sm:grid-cols-3"
        >
          {[
            { step: "1", title: "Configure", desc: "Add FlexUI MCP server to your AI tool config" },
            { step: "2", title: "Ask", desc: "Describe what you need in natural language" },
            { step: "3", title: "Install", desc: "AI adds the component with all dependencies" },
          ].map((s) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              className="rounded-xl p-5 transition-all duration-300"
              style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black"
                style={{ background: `rgba(${glowPrimary}, 0.12)`, color: accent }}
              >
                {s.step}
              </div>
              <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Configuration ── */}
      <section>
        <h2 className="text-2xl font-bold" style={{ color: "var(--flexui-heading)" }}>Configuration</h2>
        <p className="mt-3 leading-relaxed" style={{ color: "var(--flexui-body)" }}>
          Add the FlexUI MCP server to your AI tool&apos;s config:
        </p>

        {/* Tab switcher */}
        <div className="mt-6 flex gap-1 rounded-lg p-1" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
          {(Object.keys(configSnippets) as ConfigKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveConfig(key)}
              className="relative rounded-md px-4 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                color: activeConfig === key ? "var(--flexui-heading)" : "var(--flexui-body)",
                background: activeConfig === key ? "var(--flexui-surface-active)" : "transparent",
              }}
            >
              {activeConfig === key && (
                <motion.div
                  layoutId="config-tab"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "var(--flexui-surface-active)", border: "1px solid var(--flexui-border-hover)" }}
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{configSnippets[key].label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeConfig}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative mt-4 overflow-hidden rounded-xl"
            style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
          >
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--flexui-border)" }}>
              <span className="text-[11px] font-medium" style={{ color: "var(--flexui-caption)" }}>
                {configSnippets[activeConfig].file}
              </span>
              <CopyBtn text={configSnippets[activeConfig].code} />
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>
              {configSnippets[activeConfig].code}
            </pre>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Available Tools ── */}
      <section>
        <h2 className="mb-6 text-2xl font-bold" style={{ color: "var(--flexui-heading)" }}>
          Available Tools
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-2"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={fadeUp}
              className="group rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]"
              style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{ background: `rgba(${glowPrimary}, 0.1)`, color: accent }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d={tool.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <code className="text-sm font-bold" style={{ color: accent }}>{tool.name}</code>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>{tool.desc}</p>
              <p className="mt-2.5 rounded-md px-2.5 py-1.5 text-[10px] italic" style={{ background: "var(--flexui-background)", color: "var(--flexui-caption)", border: "1px solid var(--flexui-border)" }}>
                {tool.example}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Example Conversation ── */}
      <section>
        <h2 className="mb-6 text-2xl font-bold" style={{ color: "var(--flexui-heading)" }}>
          Example Conversation
        </h2>
        <div className="space-y-3">
          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-xl p-5"
              style={{
                background: msg.role === "ai" ? `rgba(${glowPrimary}, 0.03)` : "var(--flexui-surface)",
                border: `1px solid ${msg.role === "ai" ? `rgba(${glowPrimary}, 0.1)` : "var(--flexui-border)"}`,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black"
                  style={{
                    background: msg.role === "ai" ? `linear-gradient(135deg, ${accent}, ${secondary})` : "var(--flexui-surface-hover)",
                    color: msg.role === "ai" ? "var(--flexui-accent-foreground)" : "var(--flexui-body)",
                  }}
                >
                  {msg.role === "ai" ? "AI" : "U"}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--flexui-caption)" }}>
                  {msg.role === "ai" ? "AI Assistant" : "You"}
                </span>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: msg.role === "ai" ? "var(--flexui-body)" : "var(--flexui-heading)" }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-4"
        >
          {[
            { label: "Components", value: "157+" },
            { label: "Categories", value: "16" },
            { label: "Tiers", value: "3" },
            { label: "Searchable Tags", value: "500+" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-xl p-5 text-center"
              style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
            >
              <p className="text-2xl font-black" style={{ color: accent }}>{s.value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--flexui-caption)" }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section>
        <div
          className="relative overflow-hidden rounded-xl p-8 text-center"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at center, rgba(${glowPrimary}, 0.2), transparent 70%)` }}
          />
          <h3 className="relative text-xl font-bold" style={{ color: "var(--flexui-heading)" }}>
            Ready to supercharge your workflow?
          </h3>
          <p className="relative mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--flexui-body)" }}>
            Configure the MCP server once and let your AI assistant handle component
            discovery and installation.
          </p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/docs/installation"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-all duration-200 hover:brightness-110"
              style={{ background: accent, color: "var(--flexui-accent-foreground)", boxShadow: "var(--flexui-shadow-glow)" }}
            >
              Get Started
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="/docs/components"
              className="inline-flex items-center rounded-lg px-5 py-2.5 text-xs font-semibold transition-all duration-200"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Browse Components
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
