/**
 * FlexUI Component Usage Analytics Tracker
 *
 * Client-side tracker that records component renders, interactions, and
 * performance metrics. Data is stored in localStorage and can be exported
 * or displayed in the Analytics Dashboard.
 *
 * Usage:
 *   import { tracker } from "@/lib/analytics/tracker";
 *   tracker.trackRender("shimmer-button");
 *   tracker.trackInteraction("shimmer-button", "click");
 */

// ── Types ───────────────────────────────────────────────────────────────────

export interface ComponentEvent {
  component: string;
  event: "render" | "interaction" | "error";
  detail?: string;
  timestamp: number;
}

export interface ComponentStats {
  component: string;
  renders: number;
  interactions: number;
  errors: number;
  firstSeen: number;
  lastSeen: number;
  avgRenderMs?: number;
  interactionTypes: Record<string, number>;
}

export interface AnalyticsSnapshot {
  version: number;
  capturedAt: number;
  totalRenders: number;
  totalInteractions: number;
  totalErrors: number;
  uniqueComponents: number;
  topByRenders: ComponentStats[];
  topByInteractions: ComponentStats[];
  recentErrors: ComponentEvent[];
  timeline: { hour: string; renders: number; interactions: number }[];
  componentStats: Record<string, ComponentStats>;
}

// ── Storage Key ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "flexui-analytics";
const MAX_EVENTS = 5000;

// ── Tracker Class ───────────────────────────────────────────────────────────

class AnalyticsTracker {
  private events: ComponentEvent[] = [];
  private stats: Record<string, ComponentStats> = {};
  private initialized = false;

  /** Initialize the tracker — loads existing data from localStorage */
  init() {
    if (this.initialized) return;
    if (typeof window === "undefined") return;
    this.initialized = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        this.events = data.events || [];
        this.stats = data.stats || {};
      }
    } catch {
      // Fresh start on corrupt data
      this.events = [];
      this.stats = {};
    }
  }

  /** Track a component render */
  trackRender(component: string, renderMs?: number) {
    this.init();
    const now = Date.now();

    this.events.push({ component, event: "render", timestamp: now });
    this.trimEvents();

    const s = this.ensureStats(component);
    s.renders++;
    s.lastSeen = now;
    if (renderMs !== undefined) {
      s.avgRenderMs = s.avgRenderMs
        ? (s.avgRenderMs * (s.renders - 1) + renderMs) / s.renders
        : renderMs;
    }

    this.persist();
  }

  /** Track a user interaction with a component */
  trackInteraction(component: string, type: string = "click") {
    this.init();
    const now = Date.now();

    this.events.push({ component, event: "interaction", detail: type, timestamp: now });
    this.trimEvents();

    const s = this.ensureStats(component);
    s.interactions++;
    s.lastSeen = now;
    s.interactionTypes[type] = (s.interactionTypes[type] || 0) + 1;

    this.persist();
  }

  /** Track a component error */
  trackError(component: string, detail: string) {
    this.init();
    const now = Date.now();

    this.events.push({ component, event: "error", detail, timestamp: now });
    this.trimEvents();

    const s = this.ensureStats(component);
    s.errors++;
    s.lastSeen = now;

    this.persist();
  }

  /** Get a full analytics snapshot for the dashboard */
  getSnapshot(): AnalyticsSnapshot {
    this.init();

    const allStats = Object.values(this.stats);
    const totalRenders = allStats.reduce((s, c) => s + c.renders, 0);
    const totalInteractions = allStats.reduce((s, c) => s + c.interactions, 0);
    const totalErrors = allStats.reduce((s, c) => s + c.errors, 0);

    // Top components
    const topByRenders = [...allStats].sort((a, b) => b.renders - a.renders).slice(0, 10);
    const topByInteractions = [...allStats].sort((a, b) => b.interactions - a.interactions).slice(0, 10);

    // Recent errors
    const recentErrors = this.events
      .filter((e) => e.event === "error")
      .slice(-10)
      .reverse();

    // Hourly timeline (last 24h)
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const hourly: Record<string, { renders: number; interactions: number }> = {};

    for (let h = 0; h < 24; h++) {
      const hour = new Date(dayAgo + h * 60 * 60 * 1000);
      const key = `${hour.getHours().toString().padStart(2, "0")}:00`;
      hourly[key] = { renders: 0, interactions: 0 };
    }

    for (const evt of this.events) {
      if (evt.timestamp < dayAgo) continue;
      const hour = new Date(evt.timestamp);
      const key = `${hour.getHours().toString().padStart(2, "0")}:00`;
      if (hourly[key]) {
        if (evt.event === "render") hourly[key].renders++;
        if (evt.event === "interaction") hourly[key].interactions++;
      }
    }

    const timeline = Object.entries(hourly).map(([hour, data]) => ({
      hour,
      ...data,
    }));

    return {
      version: 1,
      capturedAt: now,
      totalRenders,
      totalInteractions,
      totalErrors,
      uniqueComponents: allStats.length,
      topByRenders,
      topByInteractions,
      recentErrors,
      timeline,
      componentStats: this.stats,
    };
  }

  /** Get stats for a single component */
  getComponentStats(component: string): ComponentStats | null {
    this.init();
    return this.stats[component] || null;
  }

  /** Export all data as JSON string */
  export(): string {
    this.init();
    return JSON.stringify({ events: this.events, stats: this.stats }, null, 2);
  }

  /** Clear all analytics data */
  clear() {
    this.events = [];
    this.stats = {};
    this.persist();
  }

  // ── Private ─────────────────────────────────────────────────────────────

  private ensureStats(component: string): ComponentStats {
    if (!this.stats[component]) {
      this.stats[component] = {
        component,
        renders: 0,
        interactions: 0,
        errors: 0,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
        interactionTypes: {},
      };
    }
    return this.stats[component];
  }

  private trimEvents() {
    if (this.events.length > MAX_EVENTS) {
      this.events = this.events.slice(-MAX_EVENTS);
    }
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ events: this.events, stats: this.stats })
      );
    } catch {
      // localStorage full — trim aggressively
      this.events = this.events.slice(-1000);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ events: this.events, stats: this.stats })
        );
      } catch {
        // Give up silently
      }
    }
  }
}

// ── Singleton ───────────────────────────────────────────────────────────────

export const tracker = new AnalyticsTracker();
