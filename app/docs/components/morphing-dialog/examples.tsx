"use client";

import React from "react";
import {
  Image as ImageIcon,
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Mail,
  Phone,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { MorphingDialog } from "@/components/flexui/morphing-dialog";

// ─── Profile Card Dialog ────────────────────────────────────────────────────

function ProfileCardDialog() {
  return (
    <MorphingDialog
      trigger={
        <div className="w-64 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Jane Doe</p>
              <p className="text-xs text-zinc-500">Product Designer</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-xl font-bold text-white shadow-lg">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Jane Doe</h2>
            <p className="text-sm text-zinc-400">Senior Product Designer</p>
            <div className="mt-1 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1 text-xs text-zinc-500">5.0</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2.5">
          {[
            { icon: Mail, text: "jane@example.com", color: "text-blue-400" },
            { icon: Phone, text: "+1 (555) 123-4567", color: "text-emerald-400" },
            { icon: MapPin, text: "San Francisco, CA", color: "text-orange-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-400">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <motion.button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-6px_rgba(139,92,246,0.5)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="h-4 w-4" />
            View Profile
          </motion.button>
          <motion.button
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </MorphingDialog>
  );
}

// ─── Image Preview Dialog ───────────────────────────────────────────────────

function ImagePreviewDialog() {
  return (
    <MorphingDialog
      trigger={
        <div className="w-56 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06]">
          <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
            <ImageIcon className="h-8 w-8 text-cyan-400/60" />
          </div>
          <p className="mt-2.5 text-sm font-medium text-white">
            Aurora Landscape
          </p>
          <p className="text-xs text-zinc-500">Click to preview</p>
        </div>
      }
      className="max-w-xl"
    >
      <div className="space-y-4">
        <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-cyan-400/40" />
            <p className="mt-2 text-sm text-zinc-500">
              Image preview placeholder
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Aurora Landscape</h2>
          <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
            A stunning aurora borealis captured over the Arctic landscape.
            Vibrant green and purple lights dance across the night sky.
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
          <span className="text-xs text-zinc-500">4032 x 2268 px</span>
          <motion.button
            className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download
            <ArrowRight className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </MorphingDialog>
  );
}

// ─── Settings Dialog ────────────────────────────────────────────────────────

function SettingsDialog() {
  return (
    <MorphingDialog
      trigger={
        <div className="flex w-48 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Settings</p>
            <p className="text-[11px] text-zinc-500">Configure</p>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>

        <div className="space-y-1">
          {[
            {
              icon: Bell,
              label: "Notifications",
              desc: "Push & email alerts",
              color: "text-blue-400",
            },
            {
              icon: Shield,
              label: "Privacy",
              desc: "Data & permissions",
              color: "text-emerald-400",
            },
            {
              icon: Palette,
              label: "Appearance",
              desc: "Theme & layout",
              color: "text-purple-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
              whileHover={{ x: 2 }}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </MorphingDialog>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function MorphingDialogExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <ProfileCardDialog />
      <ImagePreviewDialog />
      <SettingsDialog />
    </div>
  );
}
