"use client";

import React, { useState } from "react";
import { Preloader, PreloaderTrigger } from "@/components/flexui/preloader";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const portraitImages = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop&q=90", alt: "Portrait 1" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=90", alt: "Portrait 2" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop&q=90", alt: "Portrait 3" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop&q=90", alt: "Portrait 4" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop&q=90", alt: "Portrait 5" },
];

const architectureImages = [
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1000&fit=crop&q=90", alt: "Building 1" },
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=1000&fit=crop&q=90", alt: "Building 2" },
  { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=1000&fit=crop&q=90", alt: "Building 3" },
  { src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=1000&fit=crop&q=90", alt: "Building 4" },
  { src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&h=1000&fit=crop&q=90", alt: "Building 5" },
];

const minimalImages = [
  { src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1000&fit=crop&q=90", alt: "Gradient 1" },
  { src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=1000&fit=crop&q=90", alt: "Gradient 2" },
  { src: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=1000&fit=crop&q=90", alt: "Gradient 3" },
];

function PreloaderDemo({
  images,
  sweepDuration,
  scaleDuration,
  showProgress,
  label,
}: {
  images: { src: string; alt?: string }[];
  sweepDuration?: number;
  scaleDuration?: number;
  showProgress?: boolean;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center justify-center py-10">
      <PreloaderTrigger onClick={() => setShow(true)} label={label ?? "Launch"} />
      {show && (
        <Preloader
          images={images}
          sweepDuration={sweepDuration}
          scaleDuration={scaleDuration}
          showProgress={showProgress}
          onComplete={() => setShow(false)}
        />
      )}
    </div>
  );
}

const examples = [
  {
    id: "preloader-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard preloader with portrait images and default timing.",
    preview: <PreloaderDemo images={portraitImages} label="Launch Default" />,
    code: `const [show, setShow] = useState(false);

<PreloaderTrigger onClick={() => setShow(true)} />
{show && (
  <Preloader
    images={images}
    onComplete={() => setShow(false)}
  />
)}`,
    filename: "default.tsx",
  },
  {
    id: "preloader-fast",
    title: "Fast Sequence",
    tag: "Speed",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Faster timing for snappy page transitions.",
    preview: (
      <PreloaderDemo
        images={architectureImages}
        sweepDuration={1.5}
        scaleDuration={1.0}
        label="Fast Launch"
      />
    ),
    code: `<Preloader
  images={images}
  sweepDuration={1.5}
  scaleDuration={1.0}
  onComplete={() => setShow(false)}
/>`,
    filename: "fast-sequence.tsx",
  },
  {
    id: "preloader-cinematic",
    title: "Cinematic Slow",
    tag: "Cinematic",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Slower, dramatic timing for maximum visual impact.",
    preview: (
      <PreloaderDemo
        images={portraitImages}
        sweepDuration={3.5}
        scaleDuration={2.5}
        label="Cinematic Launch"
      />
    ),
    code: `<Preloader
  images={images}
  sweepDuration={3.5}
  scaleDuration={2.5}
  onComplete={() => setShow(false)}
/>`,
    filename: "cinematic-slow.tsx",
  },
  {
    id: "preloader-minimal",
    title: "Minimal (3 Images)",
    tag: "Minimal",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Works with fewer images. No progress bar for a cleaner look.",
    preview: (
      <PreloaderDemo
        images={minimalImages}
        showProgress={false}
        label="Minimal Launch"
      />
    ),
    code: `<Preloader
  images={threeImages}
  showProgress={false}
  onComplete={() => setShow(false)}
/>`,
    filename: "minimal.tsx",
  },
];

export function PreloaderExamples() {
  return <ShowcaseGrid items={examples} />;
}
