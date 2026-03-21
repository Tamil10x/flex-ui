"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { IconCloud } from "@/components/flexui/icon-cloud";
import {
  Globe, Zap, Star, Heart, Cloud, Sun, Moon, Flame, Sparkles,
  Music, Camera, Wifi, Cpu, Shield, Rocket, Diamond,
} from "lucide-react";

const demoIcons = [
  <Globe key="globe" className="h-8 w-8 text-blue-400" />,
  <Zap key="zap" className="h-8 w-8 text-yellow-400" />,
  <Star key="star" className="h-8 w-8 text-amber-400" />,
  <Heart key="heart" className="h-8 w-8 text-pink-400" />,
  <Cloud key="cloud" className="h-8 w-8 text-sky-400" />,
  <Sun key="sun" className="h-8 w-8 text-orange-400" />,
  <Moon key="moon" className="h-8 w-8 text-indigo-400" />,
  <Flame key="flame" className="h-8 w-8 text-red-400" />,
  <Sparkles key="sparkles" className="h-8 w-8 text-violet-400" />,
  <Music key="music" className="h-8 w-8 text-emerald-400" />,
  <Camera key="camera" className="h-8 w-8 text-teal-400" />,
  <Wifi key="wifi" className="h-8 w-8 text-cyan-400" />,
  <Cpu key="cpu" className="h-8 w-8 text-lime-400" />,
  <Shield key="shield" className="h-8 w-8 text-green-400" />,
  <Rocket key="rocket" className="h-8 w-8 text-fuchsia-400" />,
  <Diamond key="diamond" className="h-8 w-8 text-purple-400" />,
];

const code = `import { IconCloud } from "@/components/flexui/icon-cloud";
import {
  Globe, Zap, Star, Heart, Cloud, Sun, Moon, Flame,
  Sparkles, Music, Camera, Wifi, Cpu, Shield, Rocket, Diamond,
} from "lucide-react";

const icons = [
  <Globe key="globe" className="h-8 w-8 text-blue-400" />,
  <Zap key="zap" className="h-8 w-8 text-yellow-400" />,
  <Star key="star" className="h-8 w-8 text-amber-400" />,
  <Heart key="heart" className="h-8 w-8 text-pink-400" />,
  <Cloud key="cloud" className="h-8 w-8 text-sky-400" />,
  <Sun key="sun" className="h-8 w-8 text-orange-400" />,
  <Moon key="moon" className="h-8 w-8 text-indigo-400" />,
  <Flame key="flame" className="h-8 w-8 text-red-400" />,
  <Sparkles key="sparkles" className="h-8 w-8 text-violet-400" />,
  <Music key="music" className="h-8 w-8 text-emerald-400" />,
  <Camera key="camera" className="h-8 w-8 text-teal-400" />,
  <Wifi key="wifi" className="h-8 w-8 text-cyan-400" />,
  <Cpu key="cpu" className="h-8 w-8 text-lime-400" />,
  <Shield key="shield" className="h-8 w-8 text-green-400" />,
  <Rocket key="rocket" className="h-8 w-8 text-fuchsia-400" />,
  <Diamond key="diamond" className="h-8 w-8 text-purple-400" />,
];

export function Demo() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-8">
      <IconCloud icons={icons} radius={180} speed={0.5} iconSize={40} />
    </div>
  );
}`;

export function IconCloudPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[450px] items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-8">
            <IconCloud icons={demoIcons} radius={180} speed={0.5} iconSize={40} />
          </div>
        }
        code={code}
        filename="icon-cloud-demo.tsx"
      />
    </div>
  );
}
