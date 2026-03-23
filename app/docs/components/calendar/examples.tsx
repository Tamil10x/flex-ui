"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/flexui/calendar";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function DefaultCalendar() {
  const [selected, setSelected] = useState<Date>(new Date());
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar selected={selected} onChange={setSelected} />
      <p className="text-xs text-zinc-500">
        Selected: <span className="text-white">{selected.toLocaleDateString()}</span>
      </p>
    </div>
  );
}

function StyledCalendar() {
  const [selected, setSelected] = useState<Date>(new Date());
  return (
    <Calendar
      selected={selected}
      onChange={setSelected}
      className="border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.2)]"
    />
  );
}

function WideCalendar() {
  const [selected, setSelected] = useState<Date>(new Date());
  return (
    <Calendar
      selected={selected}
      onChange={setSelected}
      className="w-80"
    />
  );
}

function FormCalendar() {
  const [selected, setSelected] = useState<Date>(new Date());
  return (
    <div className="w-72 space-y-3 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
      <div>
        <label className="text-xs font-medium text-zinc-400">Select a date</label>
        <p className="mt-0.5 text-[10px] text-zinc-600">Choose your preferred meeting date</p>
      </div>
      <Calendar selected={selected} onChange={setSelected} className="w-full border-0 bg-transparent p-0" />
      <div className="border-t border-white/[0.06] pt-3">
        <p className="text-xs text-zinc-500">
          Booking for: <span className="font-medium text-white">{selected.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
        </p>
      </div>
    </div>
  );
}

const examples = [
  {
    id: "calendar-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Interactive calendar with month navigation, today highlighting, and date selection.",
    preview: <DefaultCalendar />,
    code: `const [selected, setSelected] = useState<Date>(new Date());

<Calendar selected={selected} onChange={setSelected} />`,
    filename: "default.tsx",
  },
  {
    id: "calendar-styled",
    title: "Purple Accent",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom border color and hover glow for a themed calendar.",
    preview: <StyledCalendar />,
    code: `<Calendar
  selected={selected}
  onChange={setSelected}
  className="border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.2)]"
/>`,
    filename: "styled.tsx",
  },
  {
    id: "calendar-form",
    title: "Embedded in Form",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Calendar embedded within a form card with label and booking summary.",
    preview: <FormCalendar />,
    code: `<div className="space-y-3 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
  <label className="text-xs font-medium text-zinc-400">Select a date</label>
  <Calendar
    selected={selected}
    onChange={setSelected}
    className="w-full border-0 bg-transparent p-0"
  />
  <p className="text-xs text-zinc-500">
    Booking for: <span className="font-medium text-white">
      {selected.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
    </span>
  </p>
</div>`,
    filename: "form.tsx",
  },
  {
    id: "calendar-wide",
    title: "Wide Layout",
    tag: "Layout",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Wider calendar variant for layouts with more horizontal space.",
    preview: <WideCalendar />,
    code: `<Calendar
  selected={selected}
  onChange={setSelected}
  className="w-80"
/>`,
    filename: "wide.tsx",
  },
];

export function CalendarExamples() {
  return <ShowcaseGrid items={examples} />;
}
