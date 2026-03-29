"use client";

import React from "react";
import {
  Clock,
  MapPin,
  Users,
  Video,
  Calendar,
} from "lucide-react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/flexui/expandable-card";

const code = `import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/flexui/expandable-card";

export function Demo() {
  return (
    <Expandable expandDirection="both" expandBehavior="replace">
      {({ isExpanded: _isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            collapsedSize={{ width: 320, height: 240 }}
            expandedSize={{ width: 380, height: 440 }}
          >
            <ExpandableCardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <span className="badge">In 15 mins</span>
                  <h3>Design Sync</h3>
                </div>
                <button><Calendar /></button>
              </div>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <div className="flex items-center gap-4">
                <Clock /> 1:30 PM – 2:30 PM
              </div>

              <ExpandableContent preset="blur-md">
                <p>Weekly design sync to discuss projects...</p>
                <button>Join Meeting</button>
              </ExpandableContent>
            </ExpandableCardContent>

            <ExpandableContent preset="slide-up">
              <ExpandableCardFooter>
                <span>Weekly</span>
                <span>Next: Mon, 10:00 AM</span>
              </ExpandableCardFooter>
            </ExpandableContent>
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  );
}`;

export function ExpandableCardPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full items-center justify-center">
            <Expandable expandDirection="both" expandBehavior="replace">
              {({ isExpanded: _isExpanded }) => (
                <ExpandableTrigger>
                  <ExpandableCard
                    collapsedSize={{ width: 320, height: 220 }}
                    expandedSize={{ width: 420, height: 400 }}
                  >
                    <ExpandableCardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-400 mb-2">
                            In 15 mins
                          </span>
                          <h3 className="text-lg font-semibold text-white">
                            Design Sync
                          </h3>
                        </div>
                        <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-zinc-400 transition-colors hover:bg-white/[0.08]">
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </ExpandableCardHeader>

                    <ExpandableCardContent>
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>1:30 PM – 2:30 PM</span>
                        </div>
                        <ExpandableContent preset="blur-sm" keepMounted>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>Room A</span>
                          </div>
                        </ExpandableContent>
                      </div>

                      <ExpandableContent preset="blur-md" stagger>
                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                          Weekly design sync to discuss ongoing projects and
                          address design challenges.
                        </p>
                        <div className="mb-4">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                            <Users className="h-3.5 w-3.5" /> Attendees
                          </h4>
                          <div className="flex -space-x-2">
                            {["A", "B", "C", "D"].map((l, i) => (
                              <div
                                key={i}
                                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-xs font-semibold text-zinc-300"
                              >
                                {l}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600">
                          <Video className="h-4 w-4" /> Join Meeting
                        </button>
                      </ExpandableContent>
                    </ExpandableCardContent>

                    <ExpandableContent preset="slide-up">
                      <ExpandableCardFooter>
                        <div className="flex items-center justify-between text-xs text-zinc-500 w-full">
                          <span>Weekly</span>
                          <span>Next: Mon, 10:00 AM</span>
                        </div>
                      </ExpandableCardFooter>
                    </ExpandableContent>
                  </ExpandableCard>
                </ExpandableTrigger>
              )}
            </Expandable>
          </div>
        }
        code={code}
        filename="expandable-card-demo.tsx"
      />
    </div>
  );
}
