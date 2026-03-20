"use client";

import dynamic from "next/dynamic";

export const LazyThreeHoverCard = dynamic(
  () =>
    import("@/components/flexui/three-hover-card").then((m) => ({
      default: m.ThreeHoverCard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-900" />
    ),
  }
);

export const LazyInteractiveGlobe = dynamic(
  () =>
    import("@/components/flexui/interactive-globe").then((m) => ({
      default: m.InteractiveGlobe,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] w-full animate-pulse rounded-2xl bg-zinc-900" />
    ),
  }
);
