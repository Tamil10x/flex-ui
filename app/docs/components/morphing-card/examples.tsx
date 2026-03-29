"use client";

import React from "react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  Heart,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ShoppingCart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { MorphingCard } from "@/components/flexui/morphing-card";

// ─── Music Player Card ──────────────────────────────────────────────────────

function MusicPlayerCard() {
  return (
    <MorphingCard
      collapsedClassName="w-72"
      expandedClassName="w-80"
      collapsed={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
            <Music className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Midnight City
            </p>
            <p className="text-xs text-zinc-500">M83</p>
          </div>
          <Play className="h-5 w-5 text-zinc-400" />
        </div>
      }
      expanded={
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
              <Music className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Midnight City</p>
              <p className="text-sm text-zinc-400">M83</p>
              <p className="text-xs text-zinc-500">Hurry Up, We&apos;re Dreaming</p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
              <span>2:47</span>
              <span>4:03</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <Heart className="h-4 w-4 text-zinc-500 hover:text-pink-400 transition-colors cursor-pointer" />
            <SkipForward className="h-4 w-4 rotate-180 text-zinc-400 cursor-pointer" />
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Pause className="h-4 w-4" />
            </motion.button>
            <SkipForward className="h-4 w-4 text-zinc-400 cursor-pointer" />
            <Clock className="h-4 w-4 text-zinc-500 cursor-pointer" />
          </div>

          <p className="text-center text-[11px] text-zinc-600">
            Click to collapse
          </p>
        </div>
      }
    />
  );
}

// ─── Task Card ──────────────────────────────────────────────────────────────

function TaskCard() {
  return (
    <MorphingCard
      collapsedClassName="w-64"
      expandedClassName="w-80"
      collapsed={
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2.5 py-1 text-[11px] font-bold text-blue-400">
              <AlertCircle className="h-3 w-3" />
              3 Pending
            </span>
            <span className="text-xs text-zinc-500">Today</span>
          </div>
          <h3 className="text-sm font-semibold text-white">Sprint Tasks</h3>
          <p className="mt-1 text-xs text-zinc-500">Click to view details</p>
        </div>
      }
      expanded={
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Sprint Tasks</h3>
            <span className="rounded-lg bg-blue-500/10 px-2 py-0.5 text-[11px] font-bold text-blue-400">
              Sprint 24
            </span>
          </div>

          <div className="space-y-1.5">
            {[
              { text: "Update design tokens", done: true },
              { text: "Review pull request #342", done: true },
              { text: "Fix dialog animation", done: false },
              { text: "Write component tests", done: false },
              { text: "Update documentation", done: false },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] px-3 py-2 text-sm"
              >
                {task.done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Circle className="h-4 w-4 text-zinc-600" />
                )}
                <span
                  className={
                    task.done
                      ? "text-zinc-500 line-through"
                      : "text-zinc-300"
                  }
                >
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-zinc-500">
            <span>2 of 5 completed</span>
            <span>Click to collapse</span>
          </div>
        </div>
      }
    />
  );
}

// ─── Product Card ───────────────────────────────────────────────────────────

function ProductCard() {
  return (
    <MorphingCard
      collapsedClassName="w-56"
      expandedClassName="w-80"
      collapsed={
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <Sparkles className="h-7 w-7 text-amber-400" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-white">Pro Plan</h3>
          <p className="text-xl font-bold text-white">
            $29<span className="text-sm font-normal text-zinc-500">/mo</span>
          </p>
        </div>
      }
      expanded={
        <div className="space-y-4">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">Pro Plan</h3>
            <p className="text-2xl font-bold text-white">
              $29<span className="text-sm font-normal text-zinc-500">/mo</span>
            </p>
          </div>

          <div className="space-y-2">
            {[
              "Unlimited components",
              "Priority support",
              "Custom themes",
              "Team collaboration",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                <span className="text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-6px_rgba(245,158,11,0.5)]"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px -6px rgba(245,158,11,0.6)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart className="h-4 w-4" />
            Get Started
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.button>

          <p className="text-center text-[11px] text-zinc-600">
            Click card to collapse
          </p>
        </div>
      }
    />
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function MorphingCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <MusicPlayerCard />
      <TaskCard />
      <ProductCard />
    </div>
  );
}
