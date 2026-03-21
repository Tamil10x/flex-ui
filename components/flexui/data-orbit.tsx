"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OrbitItem {
  icon: React.ReactNode;
  label?: string;
}

interface OrbitRing {
  items: OrbitItem[];
  radius: number;
  speed?: number;
  direction?: "cw" | "ccw";
}

interface DataOrbitProps {
  rings: OrbitRing[];
  center?: React.ReactNode;
  className?: string;
}

export function DataOrbit({ rings, center, className }: DataOrbitProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{
        width: (Math.max(...rings.map((r) => r.radius)) + 40) * 2,
        height: (Math.max(...rings.map((r) => r.radius)) + 40) * 2,
      }}
    >
      {/* Center element */}
      {center && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          {center}
        </div>
      )}

      {/* Orbit rings */}
      {rings.map((ring, ringIdx) => {
        const speed = ring.speed ?? 20;
        const direction = ring.direction ?? "cw";
        const animationClass =
          direction === "cw" ? "animate-orbit-cw" : "animate-orbit-ccw";
        const counterClass =
          direction === "cw" ? "animate-orbit-ccw" : "animate-orbit-cw";
        const angleStep = 360 / ring.items.length;

        return (
          <div
            key={ringIdx}
            className="absolute left-1/2 top-1/2"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginLeft: -ring.radius,
              marginTop: -ring.radius,
            }}
          >
            {/* Orbit track circle */}
            <div
              className="absolute inset-0 rounded-full border border-white/[0.06]"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
              }}
            />

            {/* Rotating container */}
            <div
              className={cn("absolute inset-0", animationClass)}
              style={{
                animationDuration: `${speed}s`,
              }}
            >
              {ring.items.map((item, itemIdx) => {
                const angle = angleStep * itemIdx;
                return (
                  <div
                    key={itemIdx}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateX(${ring.radius}px)`,
                    }}
                  >
                    {/* Counter-rotate to keep icon upright */}
                    <div
                      className={cn(
                        "flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1",
                        counterClass
                      )}
                      style={{
                        animationDuration: `${speed}s`,
                        transform: `translate(-50%, -50%) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-zinc-900/80 shadow-lg shadow-black/20 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                        {item.icon}
                      </div>
                      {item.label && (
                        <span className="whitespace-nowrap text-[10px] font-medium text-zinc-500">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
