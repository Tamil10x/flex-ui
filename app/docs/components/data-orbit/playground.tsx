"use client";

import React, { useState } from "react";
import { DataOrbit } from "@/components/flexui/data-orbit";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import {
  Cloud,
  Database,
  Globe,
  Lock,
  Server,
  Cpu,
  Zap,
} from "lucide-react";

const code = `"use client";

import { DataOrbit } from "@/components/flexui/data-orbit";
import { Cloud, Database, Globe, Lock, Server, Cpu } from "lucide-react";

export default function DataOrbitDemo() {
  return (
    <DataOrbit
      center={
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
          <Zap className="h-7 w-7 text-white" />
        </div>
      }
      rings={[
        {
          radius: 90,
          speed: 18,
          direction: "cw",
          items: [
            { icon: <Cloud className="h-4 w-4 text-blue-400" />, label: "Cloud" },
            { icon: <Database className="h-4 w-4 text-emerald-400" />, label: "DB" },
            { icon: <Lock className="h-4 w-4 text-amber-400" />, label: "Auth" },
          ],
        },
        {
          radius: 160,
          speed: 30,
          direction: "ccw",
          items: [
            { icon: <Server className="h-4 w-4 text-purple-400" />, label: "API" },
            { icon: <Globe className="h-4 w-4 text-cyan-400" />, label: "CDN" },
            { icon: <Cpu className="h-4 w-4 text-rose-400" />, label: "Edge" },
            { icon: <Database className="h-4 w-4 text-orange-400" />, label: "Cache" },
          ],
        },
      ]}
    />
  );
}`;

export function DataOrbitPlayground() {
  const [innerSpeed, setInnerSpeed] = useState(18);
  const [outerSpeed, setOuterSpeed] = useState(30);

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6 py-8">
          <DataOrbit
            center={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                <Zap className="h-7 w-7 text-white" />
              </div>
            }
            rings={[
              {
                radius: 90,
                speed: innerSpeed,
                direction: "cw",
                items: [
                  { icon: <Cloud className="h-4 w-4 text-blue-400" />, label: "Cloud" },
                  { icon: <Database className="h-4 w-4 text-emerald-400" />, label: "DB" },
                  { icon: <Lock className="h-4 w-4 text-amber-400" />, label: "Auth" },
                ],
              },
              {
                radius: 160,
                speed: outerSpeed,
                direction: "ccw",
                items: [
                  { icon: <Server className="h-4 w-4 text-purple-400" />, label: "API" },
                  { icon: <Globe className="h-4 w-4 text-cyan-400" />, label: "CDN" },
                  { icon: <Cpu className="h-4 w-4 text-rose-400" />, label: "Edge" },
                  { icon: <Database className="h-4 w-4 text-orange-400" />, label: "Cache" },
                ],
              },
            ]}
          />
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Inner Speed
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={innerSpeed}
                onChange={(e) => setInnerSpeed(Number(e.target.value))}
                className="w-24"
              />
              <span className="w-8 text-right font-mono text-xs text-zinc-500">
                {innerSpeed}s
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Outer Speed
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={outerSpeed}
                onChange={(e) => setOuterSpeed(Number(e.target.value))}
                className="w-24"
              />
              <span className="w-8 text-right font-mono text-xs text-zinc-500">
                {outerSpeed}s
              </span>
            </label>
          </div>
        </div>
      }
      code={code}
      filename="data-orbit-demo.tsx"
    />
  );
}
