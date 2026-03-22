"use client";

import React from "react";
import { Badge } from "@/components/flexui/badge";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge variant="success" pulse>
          Online
        </Badge>
        <Badge variant="warning" pulse>
          Syncing
        </Badge>
        <Badge variant="error" pulse>
          Live
        </Badge>
        <Badge variant="info" pulse>
          Streaming
        </Badge>
      </div>
    </div>
  );
}
