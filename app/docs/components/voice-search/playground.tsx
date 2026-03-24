"use client";

import React, { useState } from "react";
import { VoiceSearch } from "@/components/flexui/voice-search";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Sparkles, Layout, Type, MousePointer, Zap, Layers, Waves } from "lucide-react";

const demoItems = [
  { id: "1", title: "Shimmer Button", description: "Button with animated shimmer sweep", category: "Buttons", icon: <Sparkles className="h-4 w-4 text-purple-400" />, onSelect: () => {} },
  { id: "2", title: "Glow Button", description: "Button with ambient glow effect", category: "Buttons", icon: <Zap className="h-4 w-4 text-blue-400" />, onSelect: () => {} },
  { id: "3", title: "Spotlight Card", description: "Card with mouse-following spotlight", category: "Cards", icon: <Layout className="h-4 w-4 text-emerald-400" />, onSelect: () => {} },
  { id: "4", title: "Holographic Card", description: "Card with holographic tilt effect", category: "Cards", icon: <Layers className="h-4 w-4 text-cyan-400" />, onSelect: () => {} },
  { id: "5", title: "Text Reveal", description: "Scroll-triggered text animation", category: "Text", icon: <Type className="h-4 w-4 text-amber-400" />, onSelect: () => {} },
  { id: "6", title: "Gradient Text", description: "Text with animated gradient colors", category: "Text", icon: <Type className="h-4 w-4 text-pink-400" />, onSelect: () => {} },
  { id: "7", title: "Follow Cursor", description: "Element that follows cursor movement", category: "Cursor", icon: <MousePointer className="h-4 w-4 text-violet-400" />, onSelect: () => {} },
  { id: "8", title: "Wavy Text", description: "Text with per-character wave animation", category: "Text", icon: <Waves className="h-4 w-4 text-teal-400" />, onSelect: () => {} },
];

const code = `import { VoiceSearch } from "@/components/flexui/voice-search";

const items = [
  { id: "1", title: "Shimmer Button", description: "Animated shimmer sweep", category: "Buttons", onSelect: () => navigate("/docs/components/shimmer-button") },
  { id: "2", title: "Spotlight Card", description: "Cursor-following spotlight", category: "Cards", onSelect: () => navigate("/docs/components/spotlight-card") },
  { id: "3", title: "Text Reveal", description: "Scroll-triggered animation", category: "Text", onSelect: () => navigate("/docs/components/text-reveal") },
];

export function Demo() {
  return (
    <VoiceSearch
      items={items}
      placeholder="Search components or speak…"
      shortcut="⌘K"
    />
  );
}`;

export function VoiceSearchPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Click the search trigger or press ⌘K. Inside the spotlight, click the mic
        button and speak — your query filters results in real time.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full max-w-sm mx-auto items-center justify-center">
            <VoiceSearch
              items={demoItems}
              placeholder="Search components or speak…"
            />
          </div>
        }
        code={code}
        filename="voice-search-demo.tsx"
      />
    </div>
  );
}
