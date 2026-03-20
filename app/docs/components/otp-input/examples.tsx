"use client";

import React from "react";
import { OTPInput } from "@/components/flexui/otp-input";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "otp-default",
    title: "6-Digit Code",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description:
      "Default 6-digit OTP input with blue accent. Auto-focuses to the next box on entry.",
    preview: (
      <OTPInput
        onComplete={(code) => console.log("Code:", code)}
      />
    ),
    code: `<OTPInput
  onComplete={(code) => console.log("Code:", code)}
/>`,
    filename: "default.tsx",
  },
  {
    id: "otp-pin",
    title: "4-Digit PIN",
    tag: "Config",
    tagColor: "bg-green-500/10 text-green-400",
    description:
      "A shorter 4-digit PIN input, useful for banking or two-step verification flows.",
    preview: (
      <OTPInput
        length={4}
        onComplete={(pin) => console.log("PIN:", pin)}
      />
    ),
    code: `<OTPInput
  length={4}
  onComplete={(pin) => console.log("PIN:", pin)}
/>`,
    filename: "pin.tsx",
  },
  {
    id: "otp-custom-color",
    title: "Custom Accent Color",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description:
      "Purple accent color on the active input glow. Any valid CSS color works.",
    preview: (
      <OTPInput
        accentColor="#a855f7"
        onComplete={(code) => console.log("Code:", code)}
      />
    ),
    code: `<OTPInput
  accentColor="#a855f7"
  onComplete={(code) => console.log("Code:", code)}
/>`,
    filename: "custom-color.tsx",
  },
];

export function OTPInputExamples() {
  return <ShowcaseGrid items={examples} />;
}
