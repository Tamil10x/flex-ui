/**
 * Accessibility utilities for FlexUI components.
 */

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Generate a unique ID for ARIA relationships
let idCounter = 0;
export function generateId(prefix = "flexui"): string {
  return `${prefix}-${++idCounter}`;
}

// Common ARIA props for interactive elements
export const ariaButton = {
  role: "button" as const,
  tabIndex: 0,
};

// Keyboard handler for Enter/Space on non-button elements
export function handleKeyboardClick(callback: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };
}
