"use client";

import React from "react";
import { Badge } from "@/components/flexui/badge";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Wifi, Rocket, Shield, Star, Zap, Check } from "lucide-react";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-8 p-8">
          {/* All variants */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Variants
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="gradient">Gradient</Badge>
            </div>
          </div>

          {/* With pulse + glow */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Pulse + Glow
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="success" pulse glow>Online</Badge>
              <Badge variant="warning" pulse glow>Syncing</Badge>
              <Badge variant="error" pulse glow>Live</Badge>
              <Badge variant="info" pulse glow>Streaming</Badge>
            </div>
          </div>

          {/* With icons */}
          <div>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              With Icons
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="success" icon={<Check className="h-3 w-3" />}>Verified</Badge>
              <Badge variant="info" icon={<Rocket className="h-3 w-3" />}>Deployed</Badge>
              <Badge variant="purple" icon={<Zap className="h-3 w-3" />} glow>Pro</Badge>
              <Badge variant="gradient" icon={<Star className="h-3 w-3" />} glow>Featured</Badge>
            </div>
          </div>
        </div>
      }
      code={`import { Badge } from "@/components/flexui/badge";
import { Check, Rocket, Zap, Star } from "lucide-react";

export function Demo() {
  return (
    <>
      {/* All variants */}
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="gradient">Gradient</Badge>

      {/* Pulse + glow */}
      <Badge variant="success" pulse glow>Online</Badge>
      <Badge variant="error" pulse glow>Live</Badge>

      {/* With icons */}
      <Badge variant="success" icon={<Check className="h-3 w-3" />}>Verified</Badge>
      <Badge variant="purple" icon={<Zap className="h-3 w-3" />} glow>Pro</Badge>
    </>
  );
}`}
      filename="badge-demo.tsx"
    />
  );
}
