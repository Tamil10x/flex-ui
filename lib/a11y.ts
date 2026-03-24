/**
 * Accessibility utilities for FlexUI components.
 * WCAG 2.1 AA compliant helpers for keyboard navigation, focus management,
 * ARIA patterns, reduced motion, contrast checking, and screen reader support.
 */

// ── Reduced Motion ──────────────────────────────────────────────────────────

/** Check if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Subscribe to reduced motion changes. Returns cleanup function. */
export function onReducedMotionChange(callback: (prefers: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

// ── ID Generation ───────────────────────────────────────────────────────────

let idCounter = 0;

/** Generate a unique ID for ARIA relationships */
export function generateId(prefix = "flexui"): string {
  return `${prefix}-${++idCounter}`;
}

// ── ARIA Props ──────────────────────────────────────────────────────────────

/** Common ARIA props for interactive elements styled as buttons */
export const ariaButton = {
  role: "button" as const,
  tabIndex: 0,
};

/** ARIA props for a toggle button */
export function ariaToggle(pressed: boolean) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": pressed,
  };
}

/** ARIA props for expandable/collapsible sections */
export function ariaExpanded(expanded: boolean, controlsId: string) {
  return {
    "aria-expanded": expanded,
    "aria-controls": controlsId,
  };
}

/** ARIA props for a tab */
export function ariaTab(selected: boolean, panelId: string) {
  return {
    role: "tab" as const,
    "aria-selected": selected,
    "aria-controls": panelId,
    tabIndex: selected ? 0 : -1,
  };
}

/** ARIA props for a tab panel */
export function ariaTabPanel(labelledById: string) {
  return {
    role: "tabpanel" as const,
    "aria-labelledby": labelledById,
    tabIndex: 0,
  };
}

// ── Keyboard Handlers ───────────────────────────────────────────────────────

/** Keyboard handler for Enter/Space on non-button elements */
export function handleKeyboardClick(callback: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };
}

/** Keyboard handler for arrow key navigation within a group (tabs, menus) */
export function handleArrowNavigation(
  e: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  options: { orientation?: "horizontal" | "vertical"; loop?: boolean } = {}
) {
  const { orientation = "horizontal", loop = true } = options;
  const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
  const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";

  let newIndex = currentIndex;

  if (e.key === nextKey) {
    e.preventDefault();
    newIndex = loop
      ? (currentIndex + 1) % items.length
      : Math.min(currentIndex + 1, items.length - 1);
  } else if (e.key === prevKey) {
    e.preventDefault();
    newIndex = loop
      ? (currentIndex - 1 + items.length) % items.length
      : Math.max(currentIndex - 1, 0);
  } else if (e.key === "Home") {
    e.preventDefault();
    newIndex = 0;
  } else if (e.key === "End") {
    e.preventDefault();
    newIndex = items.length - 1;
  }

  if (newIndex !== currentIndex && items[newIndex]) {
    items[newIndex].focus();
  }

  return newIndex;
}

// ── Focus Management ────────────────────────────────────────────────────────

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(", ");

/** Get all focusable elements within a container */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

/** Create a focus trap within a container. Returns cleanup function. */
export function createFocusTrap(container: HTMLElement): () => void {
  const previouslyFocused = document.activeElement as HTMLElement | null;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== "Tab") return;

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener("keydown", handleKeyDown);

  // Focus first focusable element
  const focusable = getFocusableElements(container);
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  return () => {
    container.removeEventListener("keydown", handleKeyDown);
    previouslyFocused?.focus();
  };
}

// ── Screen Reader Announcements ─────────────────────────────────────────────

let liveRegion: HTMLElement | null = null;

function ensureLiveRegion(): HTMLElement {
  if (liveRegion && document.body.contains(liveRegion)) return liveRegion;

  liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.setAttribute("role", "status");
  Object.assign(liveRegion.style, {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0",
  });
  document.body.appendChild(liveRegion);
  return liveRegion;
}

/** Announce a message to screen readers via aria-live region */
export function announce(message: string, priority: "polite" | "assertive" = "polite") {
  if (typeof document === "undefined") return;
  const region = ensureLiveRegion();
  region.setAttribute("aria-live", priority);
  // Clear then set to trigger announcement
  region.textContent = "";
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

// ── Contrast Checking ───────────────────────────────────────────────────────

/** Parse a hex color to RGB values */
function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return [r, g, b];
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

/** Calculate relative luminance per WCAG 2.1 */
export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Calculate contrast ratio between two hex colors (WCAG 2.1) */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Check if two colors meet WCAG AA contrast requirements */
export function meetsContrastAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = contrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/** Check if two colors meet WCAG AAA contrast requirements */
export function meetsContrastAAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = contrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

// ── Visually Hidden ─────────────────────────────────────────────────────────

/** CSS properties for visually hidden but screen-reader accessible content */
export const visuallyHiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
