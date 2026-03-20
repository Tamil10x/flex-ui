import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { TestimonialsBlockPlayground } from "./playground";
import { TestimonialsBlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "Testimonials Block — FlexUI",
  description:
    "An animated testimonial/review section with grid and marquee variants, glassmorphic cards, and staggered entrance animations.",
};

const testimonialsBlockSource = `"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// TestimonialsBlock — animated testimonial section
// Supports "grid" (masonry with staggered fade-in)
// and "marquee" (horizontal CSS scroll) variants.
// Full source: components/flexui/testimonials-block.tsx`;

export default function TestimonialsBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Page Block
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Social Proof
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Testimonials Block
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated testimonial/review section with masonry grid and
          horizontal marquee variants. Each card features star ratings,
          glassmorphic styling, and gradient-avatar fallbacks.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <TestimonialsBlockPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <TestimonialsBlockExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/testimonials-block"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/testimonials-block.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
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
                  code={testimonialsBlockSource}
                  filename="components/flexui/testimonials-block.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "~",
              label: "Masonry Grid",
              desc: "CSS columns-based masonry layout that adapts from 1 to 3 columns across breakpoints.",
            },
            {
              icon: "→",
              label: "Marquee Scroll",
              desc: "Seamless horizontal CSS animation with duplicated items, fade edges, and hover-pause.",
            },
            {
              icon: "★",
              label: "Star Ratings",
              desc: "Built-in 5-star rating display on every testimonial card using inline SVG.",
            },
            {
              icon: "◈",
              label: "Glassmorphic Cards",
              desc: "Translucent cards with backdrop-blur, subtle borders, and smooth hover transitions.",
            },
            {
              icon: "⚡",
              label: "Staggered Entrance",
              desc: "Cards animate in with staggered delays using Framer Motion viewport-triggered animations.",
            },
            {
              icon: "👤",
              label: "Avatar Fallback",
              desc: "Gradient circle with extracted initials when no avatar image is provided.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { TestimonialsBlock } from "@/components/flexui/testimonials-block";`}
            filename="Named exports"
          />
        </DocSubSection>

        <DocSubSection id="testimonials-block-props" title="TestimonialsBlockProps">
          <ApiTable
            rows={[
              {
                name: "testimonials",
                type: "Testimonial[]",
                default: "—",
                description:
                  "Array of testimonial objects with quote, author, role, and optional avatar.",
                required: true,
              },
              {
                name: "variant",
                type: '"grid" | "marquee"',
                default: '"grid"',
                description:
                  'Layout style — "grid" for masonry columns, "marquee" for horizontal scroll.',
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes for the wrapper.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="testimonial-type" title="Testimonial">
          <ApiTable
            rows={[
              {
                name: "quote",
                type: "string",
                default: "—",
                description: "The testimonial text.",
                required: true,
              },
              {
                name: "author",
                type: "string",
                default: "—",
                description: "Author name.",
                required: true,
              },
              {
                name: "role",
                type: "string",
                default: "—",
                description: "Author role/company.",
                required: true,
              },
              {
                name: "avatar",
                type: "string",
                default: "—",
                description:
                  "Avatar image URL. Falls back to gradient circle with initials.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-grid" title="Grid Columns">
          <CodeBlock
            code={`{/* The grid variant uses CSS columns — override with className */}
<TestimonialsBlock
  testimonials={data}
  className="[&>div]:columns-2 [&>div]:lg:columns-4"
/>`}
            filename="Custom columns"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-speed" title="Marquee Speed">
          <CodeBlock
            code={`{/* Override marquee animation duration via className */}
<TestimonialsBlock
  testimonials={data}
  variant="marquee"
  className="[&_div[class*=animate]]:![animation-duration:60s]"
/>`}
            filename="Slower marquee"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Star ratings use decorative SVGs — they do not need alt text for this visual-only context.",
              "Avatar images include alt text with the author name.",
              "Marquee pauses on hover so users can read at their own pace.",
              "Reduced-motion users see static layout — whileInView respects prefers-reduced-motion via Framer.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
