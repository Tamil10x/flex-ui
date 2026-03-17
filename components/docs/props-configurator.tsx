"use client";

import React from "react";
import { cn } from "@/lib/utils";

type PropControl =
  | { type: "range"; min: number; max: number; step: number }
  | { type: "select"; options: string[] }
  | { type: "text" }
  | { type: "boolean" }
  | { type: "color" };

interface PropDef {
  name: string;
  label: string;
  control: PropControl;
  defaultValue: string | number | boolean;
}

interface PropsConfiguratorProps {
  propDefs: PropDef[];
  values: Record<string, string | number | boolean>;
  onChange: (name: string, value: string | number | boolean) => void;
  className?: string;
}

export function PropsConfigurator({
  propDefs,
  values,
  onChange,
  className,
}: PropsConfiguratorProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-zinc-950 p-5",
        className
      )}
    >
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Configure Props
      </h4>
      <div className="space-y-4">
        {propDefs.map((prop) => (
          <div key={prop.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300">
                {prop.label}
              </label>
              {prop.control.type === "range" && (
                <span className="text-xs tabular-nums text-zinc-500">
                  {values[prop.name]}
                </span>
              )}
            </div>

            {prop.control.type === "range" && (
              <input
                type="range"
                min={prop.control.min}
                max={prop.control.max}
                step={prop.control.step}
                value={values[prop.name] as number}
                onChange={(e) =>
                  onChange(prop.name, parseFloat(e.target.value))
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-purple-500 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400"
              />
            )}

            {prop.control.type === "select" && (
              <select
                value={values[prop.name] as string}
                onChange={(e) => onChange(prop.name, e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-purple-500/50"
              >
                {prop.control.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {prop.control.type === "text" && (
              <input
                type="text"
                value={values[prop.name] as string}
                onChange={(e) => onChange(prop.name, e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-purple-500/50"
              />
            )}

            {prop.control.type === "boolean" && (
              <button
                onClick={() =>
                  onChange(prop.name, !(values[prop.name] as boolean))
                }
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors duration-200",
                  values[prop.name] ? "bg-purple-500" : "bg-zinc-700"
                )}
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
                    values[prop.name] && "translate-x-5"
                  )}
                />
              </button>
            )}

            {prop.control.type === "color" && (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={values[prop.name] as string}
                  onChange={(e) => onChange(prop.name, e.target.value)}
                  className="h-8 w-8 cursor-pointer appearance-none rounded-lg border border-white/[0.08] bg-transparent"
                />
                <span className="text-xs text-zinc-500">
                  {values[prop.name] as string}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
