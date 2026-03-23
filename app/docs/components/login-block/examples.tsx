"use client";
import React from "react";
import { LoginBlock } from "@/components/flexui/login-block";

function CenteredExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950"><LoginBlock variant="centered" className="min-h-[500px]" /></div>);
}
function NoSocialExample() {
  return (<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 p-8"><LoginBlock showSocial={false} heading="Sign In" subtitle="Enter your credentials." className="min-h-0" /></div>);
}

export function LoginBlockExamples() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3"><CenteredExample /><p className="text-xs text-zinc-500">Centered with social providers</p></div>
      <div className="flex flex-col gap-3"><NoSocialExample /><p className="text-xs text-zinc-500">Without social providers</p></div>
    </div>
  );
}
