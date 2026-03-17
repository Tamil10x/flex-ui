"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

interface ApiTableProps {
  rows: PropRow[];
  className?: string;
}

export function ApiTable({ rows, className }: ApiTableProps) {
  return (
    <div
      className={cn(
        "group relative overflow-x-auto rounded-2xl",
        className
      )}
    >
      {/* Subtle border glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.06] via-transparent to-white/[0.03] pointer-events-none" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Prop
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Type
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Default
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((row) => (
              <tr
                key={row.name}
                className="transition-colors duration-150 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3.5">
                  <code className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[13px] font-medium text-purple-400">
                    {row.name}
                  </code>
                  {row.required && (
                    <span className="ml-1.5 text-[10px] font-bold text-red-400">
                      REQ
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <code className="rounded-md bg-cyan-500/5 px-2 py-0.5 text-[12px] text-cyan-400/80">
                    {row.type}
                  </code>
                </td>
                <td className="px-5 py-3.5">
                  <code className="text-[12px] text-zinc-500">
                    {row.default}
                  </code>
                </td>
                <td className="px-5 py-3.5 text-zinc-400">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
