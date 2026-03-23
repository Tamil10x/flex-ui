"use client";
import React from "react";
import { SignupBlock } from "@/components/flexui/signup-block";

function DefaultExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><SignupBlock className="min-h-[500px]" /></div>);
}
function CustomExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 p-8"><SignupBlock heading="Join the Beta" subtitle="Sign up to get early access." steps={["Email", "Details", "Complete"]} className="min-h-0" /></div>);
}

export function SignupBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><DefaultExample /><p className="text-xs text-zinc-500">Default 3-step signup flow</p></div>
      <div className="flex flex-col gap-3"><CustomExample /><p className="text-xs text-zinc-500">Custom step labels and heading</p></div>
    </div>
  );
}
