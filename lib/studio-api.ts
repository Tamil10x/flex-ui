/**
 * FlexUI AI Studio — API Client
 *
 * Connects the Next.js frontend to the FastAPI backend.
 * Falls back to mock data if the backend is not running.
 */

const API_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000")
    : "http://localhost:8000";

// ── Types ───────────────────────────────────────────────────────────────────
export interface GenerateResult {
  name: string;
  code: string;
  badge: string;
  badge_color: string;
  doc_slug: string;
  imports: string[];
}

export interface AnalyzeResult {
  colors: { name: string; hex: string }[];
  fonts: string[];
  components: string[];
  suggestions: string[];
}

export interface ThemeResult {
  name: string;
  primary: string;
  accent: string;
  bg: string;
  css_code: string;
  tailwind_code: string;
}

// ── API Status ──────────────────────────────────────────────────────────────
export async function checkAPI(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Generate Component ──────────────────────────────────────────────────────
export async function generateComponent(
  prompt: string,
  category?: string
): Promise<GenerateResult> {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, category }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// ── Analyze URL ─────────────────────────────────────────────────────────────
export async function analyzeURL(url: string): Promise<AnalyzeResult> {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// ── Generate Theme ──────────────────────────────────────────────────────────
export async function generateTheme(description: string): Promise<ThemeResult> {
  const res = await fetch(`${API_URL}/api/theme`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}
