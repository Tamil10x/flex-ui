"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GradientBorderButton } from "@/components/flexui/gradient-border-button";
import { ConfettiButton } from "@/components/flexui/confetti-button";
import { RotatingText } from "@/components/flexui/rotating-text";
import { TypewriterText } from "@/components/flexui/typewriter-text";
import { CopyButton } from "@/components/ui/copy-button";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function Hero() {
  const installCmd = "npx flexui init";

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Badge */}
      <motion.div {...fadeUp(0.2)} className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-[13px] font-medium text-zinc-400 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8B5CF6]" />
          </span>
          FlexUI v0.2 — 57+ Components
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.4)}
        className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.08] tracking-tight text-white"
      >
        Build{" "}
        <RotatingText
          words={["Cinematic", "Beautiful", "Magnetic", "Stunning"]}
          duration={2500}
          direction="up"
          className="h-[1.15em] bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#389CFD] bg-clip-text text-transparent"
        />
        <br />
        Interfaces 
      </motion.h1>

      {/* Typewriter */}
      <motion.div {...fadeUp(0.7)} className="mt-5 flex h-8 items-center">
        <span className="text-[clamp(1rem,2.5vw,1.4rem)] font-medium text-zinc-500">
          <TypewriterText
            words={[
              "Zero npm bloat.",
              "Copy. Paste. Ship.",
              "Spring physics everywhere.",
              "57+ animated components.",
            ]}
            typingSpeed={55}
            deletingSpeed={30}
            pauseDuration={2000}
          />
        </span>
      </motion.div>

      {/* Description */}
      <motion.p {...fadeUp(1.0)} className="mt-6 max-w-lg text-[15px] leading-relaxed text-zinc-400">
        Premium animated React components with{" "}
        <span className="text-zinc-200">spring physics</span>,{" "}
        <span className="text-zinc-200">3D effects</span>, and{" "}
        <span className="text-zinc-200">WebGL shaders</span>.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(1.3)} className="mt-10 flex flex-wrap items-center justify-center gap-12">
        <Link href="/docs/components">
          <GradientBorderButton
            colors={["#8B5CF6", "#389CFD", "#EC4899", "#8B5CF6"]}
            speed={4}
            className="px-10 py-4 text-[15px] font-bold text-white"
          >
            Browse Components
          </GradientBorderButton>
        </Link>
        <Link href="/docs/installation">
          <ConfettiButton className="px-8 py-4 text-[15px] font-semibold">
            Get Started →
          </ConfettiButton>
        </Link>
      </motion.div>

      {/* Install card */}
      <motion.div {...fadeUp(1.6)} className="mt-12">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-zinc-950/40 px-6 py-3.5 backdrop-blur-xl">
            <span className="text-[#8B5CF6]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </span>
            <code className="font-mono text-sm text-zinc-300">{installCmd}</code>
            <CopyButton text={installCmd} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
