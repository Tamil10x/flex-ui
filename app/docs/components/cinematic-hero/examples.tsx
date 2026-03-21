"use client";

import React from "react";
import { CinematicHero } from "@/components/flexui/cinematic-hero";

function ParticlesExample() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
      <CinematicHero
        headline="Ship Faster Than Ever"
        subtitle="Beautiful components, zero config. Just import and go."
        background="particles"
        badge="New Release"
        primaryCta={{ label: "Start Building", href: "#" }}
        className="min-h-[500px]"
      />
    </div>
  );
}

function StarsExample() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
      <CinematicHero
        headline="Explore the Universe"
        subtitle="A cosmic experience built with React and Framer Motion."
        background="stars"
        badge="Coming Soon"
        primaryCta={{ label: "Join Waitlist", href: "#" }}
        secondaryCta={{ label: "Learn More", href: "#" }}
        className="min-h-[500px]"
      />
    </div>
  );
}

function AuroraExample() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
      <CinematicHero
        headline="Design Without Limits"
        subtitle="Cinematic hero sections that captivate your audience from the first pixel."
        background="aurora"
        primaryCta={{ label: "Get Started", href: "#" }}
        className="min-h-[500px]"
      />
    </div>
  );
}

export function CinematicHeroExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Particles Background
        </h3>
        <ParticlesExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Stars Background
        </h3>
        <StarsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Aurora Background
        </h3>
        <AuroraExample />
      </div>
    </div>
  );
}
