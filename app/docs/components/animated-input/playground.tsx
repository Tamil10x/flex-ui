"use client";

import React from "react";
import { AnimatedInput } from "@/components/flexui/animated-input";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { AnimatedInput } from "@/components/flexui/animated-input";

export default function Demo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <AnimatedInput label="Email" type="email" />
      <AnimatedInput label="Password" type="password" accentColor="#8b5cf6" />
      <AnimatedInput label="Full Name" accentColor="#10b981" />
    </div>
  );
}`;

export function AnimatedInputPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6 p-8">
            <h2 className="text-3xl font-bold text-white">
              AnimatedInput Demo
            </h2>
            <div className="flex w-full max-w-sm flex-col gap-6">
              <AnimatedInput label="Email" type="email" />
              <AnimatedInput
                label="Password"
                type="password"
                accentColor="#8b5cf6"
              />
              <AnimatedInput label="Full Name" accentColor="#10b981" />
            </div>
          </div>
        }
        code={code}
        filename="animated-input-demo.tsx"
      />
    </div>
  );
}
