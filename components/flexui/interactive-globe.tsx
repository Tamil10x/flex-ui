"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeConfig } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

/** A single arc connecting two lat/lng points on the globe */
export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeTheme = "ocean" | "nebula" | "forest" | "sunset" | "custom";

interface ThemeValues {
  globeColor: string;
  emissive: string;
  atmosphereColor: string;
  arcColors: string[];
  polygonColor: string;
  ambientLight: string;
}

const THEMES: Record<GlobeTheme, ThemeValues> = {
  ocean: {
    globeColor: "#062056",
    emissive: "#062056",
    atmosphereColor: "#38bdf8",
    arcColors: ["#06b6d4", "#3b82f6", "#6366f1"],
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
  },
  nebula: {
    globeColor: "#1a0530",
    emissive: "#2d0a52",
    atmosphereColor: "#c084fc",
    arcColors: ["#e879f9", "#a855f7", "#ec4899"],
    polygonColor: "rgba(232,194,255,0.6)",
    ambientLight: "#c084fc",
  },
  forest: {
    globeColor: "#032213",
    emissive: "#042a18",
    atmosphereColor: "#4ade80",
    arcColors: ["#22c55e", "#16a34a", "#4ade80"],
    polygonColor: "rgba(134,239,172,0.6)",
    ambientLight: "#4ade80",
  },
  sunset: {
    globeColor: "#1c0a00",
    emissive: "#2d1000",
    atmosphereColor: "#fb923c",
    arcColors: ["#f97316", "#ef4444", "#fbbf24"],
    polygonColor: "rgba(253,186,116,0.6)",
    ambientLight: "#fb923c",
  },
  custom: {
    globeColor: "#062056",
    emissive: "#062056",
    atmosphereColor: "#ffffff",
    arcColors: ["#06b6d4", "#3b82f6", "#6366f1"],
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
  },
};

/** Default sample arcs (major world-city connections) */
function buildArcs(colors: string[]): GlobeArc[] {
  const c = (i: number) => colors[i % colors.length];
  return [
    // Order 1
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: c(0) },
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: c(1) },
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: c(2) },
    // Order 2
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: c(0) },
    { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: c(1) },
    { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: c(2) },
    // Order 3
    { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: c(0) },
    { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: c(1) },
    { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: c(2) },
    // Order 4
    { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: c(0) },
    { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: c(1) },
    { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: c(2) },
    // Order 5
    { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: c(0) },
    { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: c(1) },
    { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: c(2) },
    // Order 6
    { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: c(0) },
    { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: c(1) },
    { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: c(2) },
    // Order 7
    { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: c(0) },
    { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: c(1) },
    { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: c(2) },
    // Order 8
    { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: c(0) },
    { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: c(1) },
    { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: c(2) },
    // Order 9
    { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: c(0) },
    { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: c(1) },
    { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: c(2) },
    // Order 10
    { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: c(0) },
    { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: c(1) },
    { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: c(2) },
  ];
}

export interface InteractiveGlobeProps {
  /** Pre-built color theme  */
  theme?: GlobeTheme;
  /** Override globe body color (hex) */
  globeColor?: string;
  /** Override atmosphere color (hex) */
  atmosphereColor?: string;
  /** Atmosphere glow height — 0–1 */
  atmosphereAltitude?: number;
  /** Override arc colors (array of hex strings) */
  arcColors?: string[];
  /** Custom arc data — uses default world-city arcs when omitted */
  data?: GlobeArc[];
  /** Duration of each arc animation in ms */
  arcTime?: number;
  /** Auto-rotate speed (0 = stopped) */
  autoRotateSpeed?: number;
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Container className */
  className?: string;
  /** Show heading/subtitle */
  showLabel?: boolean;
  /** Custom heading text */
  heading?: string;
  /** Custom subtitle text */
  subtitle?: string;
}

export function InteractiveGlobe({
  theme = "ocean",
  globeColor,
  atmosphereColor,
  atmosphereAltitude = 0.1,
  arcColors,
  data,
  arcTime = 1000,
  autoRotateSpeed = 0.5,
  autoRotate = true,
  className,
  showLabel = true,
  heading = "Connected Worldwide",
  subtitle = "Real-time data flows across the globe with live animated arcs.",
}: InteractiveGlobeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const themeValues = THEMES[theme];

  const resolvedGlobeColor = globeColor ?? themeValues.globeColor;
  const resolvedAtmosphereColor = atmosphereColor ?? themeValues.atmosphereColor;
  const resolvedArcColors = arcColors ?? themeValues.arcColors;

  const sampleArcs = useMemo(
    () => buildArcs(resolvedArcColors),
    [resolvedArcColors.join(",")]
  );
  const arcs = data ?? sampleArcs;

  const globeConfig: GlobeConfig = useMemo(
    () => ({
      pointSize: 4,
      globeColor: resolvedGlobeColor,
      showAtmosphere: true,
      atmosphereColor: resolvedAtmosphereColor,
      atmosphereAltitude,
      emissive: themeValues.emissive,
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: themeValues.polygonColor,
      ambientLight: themeValues.ambientLight,
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      initialPosition: { lat: 22.3193, lng: 114.1694 },
      autoRotate,
      autoRotateSpeed,
    }),
    [
      resolvedGlobeColor,
      resolvedAtmosphereColor,
      atmosphereAltitude,
      themeValues,
      arcTime,
      autoRotate,
      autoRotateSpeed,
    ]
  );

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full overflow-hidden",
        "transition-opacity duration-700 ease-out",
        mounted ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {showLabel && (
        <div className="relative z-20 mb-2 text-center">
          <h3
            className={cn(
              "text-xl font-bold text-white md:text-3xl",
              "transition-all duration-700 ease-out delay-200",
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
          >
            {heading}
          </h3>
          <p
            className={cn(
              "mt-1 text-sm text-zinc-400 max-w-xs mx-auto",
              "transition-all duration-700 ease-out delay-400",
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
          >
            {subtitle}
          </p>
        </div>
      )}

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none" />

      {/* Globe canvas — touch-action:none prevents scroll hijack on mobile */}
      <div
        className="relative z-0 w-full"
        style={{ height: 380, touchAction: "none" }}
      >
        <World data={arcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
}
