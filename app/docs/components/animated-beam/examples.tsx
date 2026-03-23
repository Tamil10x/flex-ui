"use client";

import React from "react";
import { AnimatedBeam } from "@/components/flexui/animated-beam";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

export function AnimatedBeamExamples() {
  return (
    <ShowcaseGrid
      items={[
        {
          id: "basic-curve",
          title: "Basic Curve",
          tag: "Base",
          preview: (
            <div className="relative w-full h-28">
              <AnimatedBeam
                pathData="M 30,60 C 120,10 280,110 570,60"
                color="#389CFD"
                speed={3}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ),
          code: `<AnimatedBeam
  pathData="M 30,60 C 120,10 280,110 570,60"
  color="#389CFD"
  speed={3}
/>`,
          filename: "basic-curve.tsx",
        },
        {
          id: "multi-beam",
          title: "Staggered Beams",
          tag: "Compose",
          preview: (
            <div className="relative w-full h-32">
              <AnimatedBeam
                pathData="M 30,30 C 150,10 350,50 570,30"
                color="#a78bfa"
                speed={4}
                delay={0}
                className="absolute inset-0 w-full h-full"
              />
              <AnimatedBeam
                pathData="M 30,65 C 200,45 300,85 570,65"
                color="#389CFD"
                speed={3}
                delay={1}
                className="absolute inset-0 w-full h-full"
              />
              <AnimatedBeam
                pathData="M 30,100 C 150,120 400,80 570,100"
                color="#34d399"
                speed={3.5}
                delay={0.5}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ),
          code: `<div className="relative w-full h-32">
  <AnimatedBeam
    pathData="M 30,30 C 150,10 350,50 570,30"
    color="#a78bfa" speed={4} delay={0}
    className="absolute inset-0 w-full h-full"
  />
  <AnimatedBeam
    pathData="M 30,65 C 200,45 300,85 570,65"
    color="#389CFD" speed={3} delay={1}
    className="absolute inset-0 w-full h-full"
  />
  <AnimatedBeam
    pathData="M 30,100 C 150,120 400,80 570,100"
    color="#34d399" speed={3.5} delay={0.5}
    className="absolute inset-0 w-full h-full"
  />
</div>`,
          filename: "multi-beam.tsx",
        },
        {
          id: "wide-glow",
          title: "Wide Glow Beam",
          tag: "Style",
          preview: (
            <div className="relative w-full h-28">
              <AnimatedBeam
                pathData="M 30,60 Q 300,10 570,60"
                color="#f97316"
                width={4}
                speed={2}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ),
          code: `<AnimatedBeam
  pathData="M 30,60 Q 300,10 570,60"
  color="#f97316"
  width={4}
  speed={2}
/>`,
          filename: "wide-glow.tsx",
        },
      ]}
    />
  );
}
