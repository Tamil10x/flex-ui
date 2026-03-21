"use client";

import React from "react";
import { IconCloud } from "@/components/flexui/icon-cloud";
import {
  Globe, Zap, Star, Heart, Cloud, Sun, Moon, Flame,
  Sparkles, Music, Camera, Wifi, Cpu, Shield, Rocket, Diamond,
  Code, Database, Lock, Eye,
} from "lucide-react";

function DefaultExample() {
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
  ];

  return (
    <div className="flex items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-8">
      <IconCloud icons={icons} radius={160} speed={0.5} iconSize={40} />
    </div>
  );
}

function SmallFastExample() {
  const icons = [
    <Code key="code" className="h-6 w-6 text-emerald-400" />,
    <Database key="db" className="h-6 w-6 text-cyan-400" />,
    <Lock key="lock" className="h-6 w-6 text-amber-400" />,
    <Shield key="shield" className="h-6 w-6 text-violet-400" />,
    <Cpu key="cpu" className="h-6 w-6 text-blue-400" />,
    <Eye key="eye" className="h-6 w-6 text-pink-400" />,
    <Rocket key="rocket" className="h-6 w-6 text-red-400" />,
    <Diamond key="diamond" className="h-6 w-6 text-purple-400" />,
  ];

  return (
    <div className="flex items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-8">
      <IconCloud icons={icons} radius={120} speed={1.5} iconSize={30} />
    </div>
  );
}

function LargeCloudExample() {
  const icons = [
    <Globe key="globe" className="h-10 w-10 text-blue-400" />,
    <Zap key="zap" className="h-10 w-10 text-yellow-400" />,
    <Star key="star" className="h-10 w-10 text-amber-400" />,
    <Heart key="heart" className="h-10 w-10 text-pink-400" />,
    <Cloud key="cloud" className="h-10 w-10 text-sky-400" />,
    <Sun key="sun" className="h-10 w-10 text-orange-400" />,
    <Moon key="moon" className="h-10 w-10 text-indigo-400" />,
    <Flame key="flame" className="h-10 w-10 text-red-400" />,
    <Sparkles key="sparkles" className="h-10 w-10 text-violet-400" />,
    <Music key="music" className="h-10 w-10 text-emerald-400" />,
    <Camera key="camera" className="h-10 w-10 text-teal-400" />,
    <Wifi key="wifi" className="h-10 w-10 text-cyan-400" />,
    <Cpu key="cpu" className="h-10 w-10 text-lime-400" />,
    <Shield key="shield" className="h-10 w-10 text-green-400" />,
    <Rocket key="rocket" className="h-10 w-10 text-fuchsia-400" />,
    <Diamond key="diamond" className="h-10 w-10 text-purple-400" />,
    <Code key="code" className="h-10 w-10 text-rose-400" />,
    <Database key="db" className="h-10 w-10 text-slate-400" />,
    <Lock key="lock" className="h-10 w-10 text-yellow-300" />,
    <Eye key="eye" className="h-10 w-10 text-teal-300" />,
  ];

  return (
    <div className="flex items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950 p-8">
      <IconCloud icons={icons} radius={220} speed={0.3} iconSize={48} />
    </div>
  );
}

export function IconCloudExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default Cloud</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Small &amp; Fast</h3>
        <SmallFastExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Large Cloud with Many Icons</h3>
        <LargeCloudExample />
      </div>
    </div>
  );
}
