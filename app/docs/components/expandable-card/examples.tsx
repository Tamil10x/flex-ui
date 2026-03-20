"use client";

import React from "react";
import {
  Clock,
  MapPin,
  Users,
  Video,
  MessageSquare,
  Calendar,
  Star,
  ShoppingCart,
  Battery,
  Bluetooth,
  Fingerprint,
  Mic,
  Sun,
  Cloud,
  Wind,
  Droplets,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/flexui/expandable-card";

// ─── Meeting Card ───────────────────────────────────────────────────────────
function MeetingCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            collapsedSize={{ width: 320, height: 250 }}
            expandedSize={{ width: 380, height: 520 }}
          >
            {/* Accent bar */}
            <div className="absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-80" />

            <ExpandableCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <motion.span
                    className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-2.5 py-1 text-[11px] font-bold text-red-400 mb-2.5"
                    animate={{
                      boxShadow: isExpanded
                        ? "0 0 16px -4px rgba(239,68,68,0.4)"
                        : "0 0 0px transparent",
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                    </span>
                    In 15 mins
                  </motion.span>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Design Sync
                  </h3>
                </div>
                <motion.button
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-zinc-400 backdrop-blur-sm transition-colors hover:bg-white/[0.08] hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Calendar className="h-4 w-4" />
                </motion.button>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-zinc-500" />
                  <span>1:30 PM – 2:30 PM</span>
                </div>
                <ExpandableContent preset="blur-sm" keepMounted>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Room A</span>
                  </div>
                </ExpandableContent>
              </div>

              <ExpandableContent preset="blur-md" stagger staggerChildren={0.12}>
                <p className="text-sm text-zinc-400/90 mb-5 leading-relaxed">
                  Weekly design sync to discuss ongoing projects, share updates,
                  and address any design-related challenges.
                </p>

                <div className="mb-5">
                  <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-2.5">
                    <Users className="h-3.5 w-3.5" />
                    Attendees
                  </h4>
                  <div className="flex -space-x-2">
                    {[
                      { letter: "A", color: "from-violet-500 to-purple-600" },
                      { letter: "B", color: "from-cyan-500 to-blue-600" },
                      { letter: "C", color: "from-emerald-500 to-green-600" },
                      { letter: "D", color: "from-amber-500 to-orange-600" },
                    ].map((person, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-950 bg-gradient-to-br ${person.color} text-xs font-bold text-white shadow-lg`}
                      >
                        {person.letter}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.62, type: "spring" }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-400"
                    >
                      +3
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-2">
                  <motion.button
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-6px_rgba(239,68,68,0.5)]"
                    whileHover={{ scale: 1.01, boxShadow: "0 0 30px -6px rgba(239,68,68,0.6)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </motion.button>
                  {isExpanded && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Open Chat
                    </motion.button>
                  )}
                </div>
              </ExpandableContent>
            </ExpandableCardContent>

            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Weekly
                  </span>
                  <span>Next: Mon, 10:00 AM</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}

// ─── Product Card ───────────────────────────────────────────────────────────
function ProductCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            collapsedSize={{ width: 320, height: 230 }}
            expandedSize={{ width: 380, height: 510 }}
          >
            <div className="absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-80" />

            <ExpandableCardHeader>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2.5 py-1 text-[11px] font-bold text-blue-400">
                  <Sparkles className="h-3 w-3" />
                  New Arrival
                </span>
                <motion.span
                  className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-white"
                  animate={{
                    borderColor: isExpanded
                      ? "rgba(59,130,246,0.3)"
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  $129.99
                </motion.span>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-start gap-4 mb-3">
                <motion.div
                  className="shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg"
                  animate={{
                    width: isExpanded ? 100 : 64,
                    height: isExpanded ? 100 : 64,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="flex h-full w-full items-center justify-center text-3xl">
                    🎧
                  </div>
                </motion.div>
                <div>
                  <motion.h3
                    className="font-bold text-white tracking-tight"
                    animate={{ fontSize: isExpanded ? "20px" : "16px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    Sony WH-1000XM5
                  </motion.h3>
                  <div className="mt-1.5 flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isExpanded ? "full" : "short"}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="ml-1.5 overflow-hidden whitespace-nowrap text-xs text-zinc-500"
                      >
                        {isExpanded ? "(128 reviews)" : "(128)"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <ExpandableContent
                preset="blur-md"
                animateIn={{
                  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
                  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                  transition: { type: "spring", stiffness: 240, damping: 22 },
                }}
              >
                <p className="mb-4 text-sm text-zinc-400/90 leading-relaxed">
                  Industry-leading noise cancelling with crystal-clear audio.
                  Perfect for work, travel, or deep focus.
                </p>

                <div className="mb-5 grid grid-cols-2 gap-2">
                  {[
                    { icon: Battery, text: "30h battery", color: "text-emerald-400" },
                    { icon: Bluetooth, text: "BT 5.3", color: "text-blue-400" },
                    { icon: Fingerprint, text: "Touch", color: "text-purple-400" },
                    { icon: Mic, text: "Voice AI", color: "text-cyan-400" },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="flex items-center gap-2 rounded-lg bg-white/[0.02] px-2.5 py-2 text-sm text-zinc-400"
                    >
                      <f.icon className={`h-3.5 w-3.5 ${f.color}`} />
                      <span>{f.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)]"
                  whileHover={{ scale: 1.01, boxShadow: "0 0 30px -6px rgba(59,130,246,0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </motion.button>
              </ExpandableContent>
            </ExpandableCardContent>

            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-emerald-400" /> Free shipping
                  </span>
                  <span>30-day returns</span>
                </div>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}

// ─── Weather Card ───────────────────────────────────────────────────────────
function WeatherCard() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      <ExpandableTrigger>
        <ExpandableCard
          collapsedSize={{ width: 300, height: 230 }}
          expandedSize={{ width: 370, height: 460 }}
        >
          <div className="absolute inset-x-0 top-0 z-20 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-80" />

          <ExpandableCardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <Sun className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                </motion.div>
                <ExpandableContent preset="blur-sm" keepMounted>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-white">
                      Today&apos;s Weather
                    </h3>
                    <span className="rounded-lg bg-yellow-500/10 px-2 py-0.5 text-[11px] font-bold text-yellow-400">
                      72°F
                    </span>
                  </div>
                </ExpandableContent>
              </div>
            </div>
          </ExpandableCardHeader>

          <ExpandableCardContent>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-4xl font-black tracking-tight text-white">
                  72°F
                </p>
                <p className="text-sm text-zinc-500">Feels like 75°F</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">Sunny</p>
                <ExpandableContent preset="blur-sm" keepMounted>
                  <p className="text-sm text-zinc-500">H 78° / L 65°</p>
                </ExpandableContent>
              </div>
            </div>

            <ExpandableContent preset="blur-md" stagger staggerChildren={0.06}>
              <div className="mb-5 space-y-1">
                {[
                  { icon: Cloud, label: "Humidity", value: "45%", color: "text-blue-400" },
                  { icon: Wind, label: "Wind", value: "8 mph", color: "text-cyan-400" },
                  { icon: Droplets, label: "Precip.", value: "0%", color: "text-emerald-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2 text-zinc-400">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className="font-medium text-zinc-200">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div>
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  5-Day Forecast
                </h4>
                <div className="space-y-0.5">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-white/[0.02]"
                    >
                      <span className="text-zinc-400 w-8">{day}</span>
                      <div className="flex-1 mx-4 h-1 rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${50 + i * 10}%` }}
                          transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sun className="h-3 w-3 text-yellow-400" />
                        <span className="text-zinc-200 font-medium w-9 text-right">
                          {70 + i}°F
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ExpandableContent>
          </ExpandableCardContent>

          <ExpandableCardFooter>
            <p className="text-[11px] text-zinc-600">
              Last updated: 5 minutes ago
            </p>
          </ExpandableCardFooter>
        </ExpandableCard>
      </ExpandableTrigger>
    </Expandable>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export function ExpandableCardExamples() {
  return (
    <div className="flex flex-col items-center gap-16 py-8">
      <MeetingCard />
      <ProductCard />
      <WeatherCard />
    </div>
  );
}
