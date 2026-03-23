"use client";

import React, { useState } from "react";
import { PortalTransition } from "@/components/flexui/portal-transition";

function DefaultExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
      >
        {open ? "Close" : "Open"} Default Portal
      </button>
      <PortalTransition isOpen={open} className="min-h-[300px]">
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-950 to-black">
          <h2 className="text-3xl font-bold text-white">Default Portal</h2>
        </div>
      </PortalTransition>
    </div>
  );
}

function CyanPortalExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
      >
        {open ? "Close" : "Open"} Cyan Portal
      </button>
      <PortalTransition
        isOpen={open}
        color="#06B6D4"
        duration={1.2}
        className="min-h-[300px]"
      >
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-950 to-black">
          <h2 className="text-3xl font-bold text-white">Cyan Portal</h2>
        </div>
      </PortalTransition>
    </div>
  );
}

function FastPortalExample() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
      >
        {open ? "Close" : "Open"} Fast Portal
      </button>
      <PortalTransition
        isOpen={open}
        color="#F43F5E"
        duration={0.4}
        className="min-h-[300px]"
      >
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-gradient-to-br from-rose-950 to-black">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Fast Portal</h2>
            <p className="mt-2 text-zinc-400">0.4s duration for snappy transitions.</p>
          </div>
        </div>
      </PortalTransition>
    </div>
  );
}

export function PortalTransitionExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Cyan Portal (Slow)</h3>
        <CyanPortalExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fast Portal</h3>
        <FastPortalExample />
      </div>
    </div>
  );
}
