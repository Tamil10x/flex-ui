import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — FlexUI",
  description: "Track all updates, new components, and improvements to FlexUI.",
};

interface ChangelogEntry {
  version: string;
  date: string;
  tag: "latest" | "stable" | "beta";
  changes: { type: "added" | "fixed" | "improved" | "breaking"; text: string }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2026-03-16",
    tag: "latest",
    changes: [
      { type: "added", text: "Initial release of FlexUI registry architecture." },
      { type: "added", text: "MagneticButton — Framer Motion spring-physics cursor tracking with spotlight glow border." },
      { type: "added", text: "ThreeHoverCard — Lazy-loaded WebGL card with rotating Icosahedron using React Three Fiber." },
      { type: "added", text: "Registry build script (scripts/build-registry.ts) for compiling component JSON." },
      { type: "added", text: "Documentation site with Introduction, Installation, MCP Server, and Changelog pages." },
      { type: "added", text: "Landing page with cinematic hero, bento grid showcase, and copy-to-clipboard code blocks." },
    ],
  },
];

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  added: { bg: "bg-green-500/10", text: "text-green-400", label: "Added" },
  fixed: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Fixed" },
  improved: { bg: "bg-purple-500/10", text: "text-purple-400", label: "Improved" },
  breaking: { bg: "bg-red-500/10", text: "text-red-400", label: "Breaking" },
};

const tagColors: Record<string, string> = {
  latest: "bg-green-500/20 text-green-400",
  stable: "bg-blue-500/20 text-blue-400",
  beta: "bg-yellow-500/20 text-yellow-400",
};

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-purple-400">Getting Started</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Changelog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          Track every update, new component, and improvement to FlexUI.
        </p>
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Timeline */}
      <div className="space-y-10">
        {changelog.map((entry) => (
          <section key={entry.version} className="relative">
            {/* Version header */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                v{entry.version}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${tagColors[entry.tag]}`}
              >
                {entry.tag}
              </span>
              <span className="text-sm text-zinc-600">{entry.date}</span>
            </div>

            {/* Changes list */}
            <div className="mt-4 space-y-2">
              {entry.changes.map((change, i) => {
                const colors = typeColors[change.type];
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-1 py-1.5"
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}
                    >
                      {colors.label}
                    </span>
                    <p className="text-sm text-zinc-400">{change.text}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Empty state for future */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-950 p-8 text-center">
        <p className="text-sm text-zinc-500">
          More updates coming soon. Star the repo to stay in the loop.
        </p>
      </div>
    </div>
  );
}
