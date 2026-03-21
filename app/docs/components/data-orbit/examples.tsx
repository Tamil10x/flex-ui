"use client";

import React from "react";
import { DataOrbit } from "@/components/flexui/data-orbit";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import {
  Cloud,
  Database,
  Globe,
  Lock,
  Server,
  Cpu,
  Zap,
  Shield,
  Wifi,
} from "lucide-react";

export function DataOrbitExamples() {
  return (
    <ShowcaseGrid
      items={[
        {
          id: "single-ring",
          title: "Single Ring",
          tag: "Base",
          preview: (
            <div className="flex items-center justify-center py-8">
              <DataOrbit
                center={
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                }
                rings={[
                  {
                    radius: 80,
                    speed: 15,
                    direction: "cw",
                    items: [
                      { icon: <Cloud className="h-4 w-4 text-blue-400" /> },
                      { icon: <Database className="h-4 w-4 text-emerald-400" /> },
                      { icon: <Lock className="h-4 w-4 text-amber-400" /> },
                      { icon: <Server className="h-4 w-4 text-purple-400" /> },
                    ],
                  },
                ]}
              />
            </div>
          ),
          code: `<DataOrbit
  center={<CenterIcon />}
  rings={[{
    radius: 80,
    speed: 15,
    direction: "cw",
    items: [
      { icon: <Cloud className="h-4 w-4 text-blue-400" /> },
      { icon: <Database className="h-4 w-4 text-emerald-400" /> },
      { icon: <Lock className="h-4 w-4 text-amber-400" /> },
      { icon: <Server className="h-4 w-4 text-purple-400" /> },
    ],
  }]}
/>`,
          filename: "single-ring.tsx",
        },
        {
          id: "triple-ring",
          title: "Triple Ring",
          tag: "Compose",
          preview: (
            <div className="flex items-center justify-center py-4">
              <DataOrbit
                center={
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                }
                rings={[
                  {
                    radius: 60,
                    speed: 12,
                    direction: "cw",
                    items: [
                      { icon: <Shield className="h-3.5 w-3.5 text-emerald-400" /> },
                      { icon: <Lock className="h-3.5 w-3.5 text-amber-400" /> },
                    ],
                  },
                  {
                    radius: 100,
                    speed: 20,
                    direction: "ccw",
                    items: [
                      { icon: <Cloud className="h-4 w-4 text-blue-400" /> },
                      { icon: <Server className="h-4 w-4 text-purple-400" /> },
                      { icon: <Wifi className="h-4 w-4 text-cyan-400" /> },
                    ],
                  },
                  {
                    radius: 145,
                    speed: 35,
                    direction: "cw",
                    items: [
                      { icon: <Database className="h-4 w-4 text-orange-400" /> },
                      { icon: <Cpu className="h-4 w-4 text-rose-400" /> },
                      { icon: <Zap className="h-4 w-4 text-yellow-400" /> },
                      { icon: <Globe className="h-4 w-4 text-teal-400" /> },
                    ],
                  },
                ]}
              />
            </div>
          ),
          code: `<DataOrbit
  center={<CenterIcon />}
  rings={[
    { radius: 60, speed: 12, direction: "cw", items: [...] },
    { radius: 100, speed: 20, direction: "ccw", items: [...] },
    { radius: 145, speed: 35, direction: "cw", items: [...] },
  ]}
/>`,
          filename: "triple-ring.tsx",
        },
        {
          id: "with-labels",
          title: "With Labels",
          tag: "Content",
          preview: (
            <div className="flex items-center justify-center py-8">
              <DataOrbit
                center={
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500">
                    <Cpu className="h-6 w-6 text-white" />
                  </div>
                }
                rings={[
                  {
                    radius: 90,
                    speed: 22,
                    direction: "ccw",
                    items: [
                      { icon: <Cloud className="h-4 w-4 text-blue-400" />, label: "AWS" },
                      { icon: <Database className="h-4 w-4 text-emerald-400" />, label: "Postgres" },
                      { icon: <Lock className="h-4 w-4 text-amber-400" />, label: "OAuth" },
                    ],
                  },
                ]}
              />
            </div>
          ),
          code: `<DataOrbit
  center={<CenterIcon />}
  rings={[{
    radius: 90,
    speed: 22,
    direction: "ccw",
    items: [
      { icon: <Cloud />, label: "AWS" },
      { icon: <Database />, label: "Postgres" },
      { icon: <Lock />, label: "OAuth" },
    ],
  }]}
/>`,
          filename: "with-labels.tsx",
        },
      ]}
    />
  );
}
