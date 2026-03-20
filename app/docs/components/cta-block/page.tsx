import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { CTABlockPlayground } from "./playground";
import { CTABlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "CTA Block — FlexUI",
  description:
    "A call-to-action section with animated gradient borders, radial glow background, and staggered entrance animation.",
};

const ctaBlockSource = `"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTABlockProps {
  heading: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function CTABlock({
  heading,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CTABlockProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-b border-white/[0.06] px-6 py-24",
        className
      )}
    >
      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-500/15 blur-[100px]" />
      </div>

      {/* Animated gradient border line (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated gradient border line (bottom) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-white">
          {heading}
        </motion.h2>

        {description && (
          <motion.p variants={fadeUp} className="mt-4 max-w-lg text-lg leading-relaxed text-zinc-400">
            {description}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            {primaryCta && (
              <a href={primaryCta.href} className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all duration-200 hover:bg-zinc-200 hover:shadow-white/20">
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryCta.href} className="inline-flex h-11 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white">
                {secondaryCta.label}
              </a>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}`;

export default function CTABlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          CTA Block
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A call-to-action section with animated gradient borders, radial glow
          background, centered content, and staggered entrance animation.
          Matching HeroBlock CTA button styles.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <CTABlockPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <CTABlockExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/cta-block"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/cta-block.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependency
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={ctaBlockSource}
                  filename="components/flexui/cta-block.tsx"
                  language="tsx"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { CTABlock } from "@/components/flexui/cta-block";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "heading",
                type: "string",
                default: "\u2014",
                description: "The main heading text for the CTA section.",
                required: true,
              },
              {
                name: "description",
                type: "string",
                default: "\u2014",
                description: "Optional description text below the heading.",
              },
              {
                name: "primaryCta",
                type: "{ label: string; href: string }",
                default: "\u2014",
                description:
                  "Primary button with solid white background. Matches HeroBlock style.",
              },
              {
                name: "secondaryCta",
                type: "{ label: string; href: string }",
                default: "\u2014",
                description:
                  "Secondary button with ghost/outline style. Matches HeroBlock style.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn().",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>
    </div>
  );
}
