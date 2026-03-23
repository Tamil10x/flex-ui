"""
FlexUI AI Studio — FastAPI Backend
===================================
Provides AI-powered component generation, URL analysis, and theme creation.

Run locally:
    cd api && pip install -r requirements.txt && uvicorn main:app --reload --port 8000
"""

import json
import os
import re
import time
from collections import defaultdict
from typing import Optional

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from models import (
    AnalyzeRequest,
    AnalyzeResponse,
    ColorInfo,
    GenerateRequest,
    GenerateResponse,
    ThemeRequest,
    ThemeResponse,
)
from prompts.generate import SYSTEM_PROMPT as GENERATE_SYSTEM, USER_PROMPT_TEMPLATE as GENERATE_USER
from prompts.analyze import SYSTEM_PROMPT as ANALYZE_SYSTEM, USER_PROMPT_TEMPLATE as ANALYZE_USER
from prompts.theme import SYSTEM_PROMPT as THEME_SYSTEM, USER_PROMPT_TEMPLATE as THEME_USER
from providers.gemini import GeminiProvider
from providers.groq_provider import GroqProvider

# ── Load environment ─────────────────────────────────────────────────────────
load_dotenv()

# ── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="FlexUI AI Studio API",
    version="1.0.0",
    description="AI-powered component generation for FlexUI",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:3000", "https://flexui.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── AI Providers (try Gemini first, fall back to Groq) ───────────────────────
gemini = GeminiProvider()
groq = GroqProvider()


async def ai_generate(system_prompt: str, user_prompt: str) -> str:
    """Try primary provider, fall back to secondary."""
    errors = []

    if gemini.is_available():
        try:
            return await gemini.generate(system_prompt, user_prompt)
        except Exception as e:
            errors.append(f"Gemini: {e}")

    if groq.is_available():
        try:
            return await groq.generate(system_prompt, user_prompt)
        except Exception as e:
            errors.append(f"Groq: {e}")

    raise HTTPException(
        status_code=503,
        detail=f"No AI provider available. Errors: {'; '.join(errors) or 'No API keys configured. Set GEMINI_API_KEY or GROQ_API_KEY in .env'}",
    )


def parse_json_response(text: str) -> dict:
    """Extract JSON from AI response, handling markdown code blocks."""
    # Try direct parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Try extracting from markdown code block
    match = re.search(r"```(?:json)?\s*\n?(.*?)\n?```", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass

    # Try finding first { to last }
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1:
        try:
            return json.loads(text[start : end + 1])
        except json.JSONDecodeError:
            pass

    raise HTTPException(status_code=500, detail="Failed to parse AI response as JSON")


# ── Rate limiter (simple in-memory) ──────────────────────────────────────────
rate_limits: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 20  # requests per minute per IP
RATE_WINDOW = 60  # seconds


def check_rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    # Clean old entries
    rate_limits[ip] = [t for t in rate_limits[ip] if now - t < RATE_WINDOW]
    if len(rate_limits[ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again in a minute.")
    rate_limits[ip].append(now)


# ── Health check ─────────────────────────────────────────────────────────────
@app.get("/")
async def health():
    return {
        "status": "ok",
        "service": "FlexUI AI Studio API",
        "providers": {
            "gemini": gemini.is_available(),
            "groq": groq.is_available(),
        },
    }


# ── POST /api/generate ───────────────────────────────────────────────────────
@app.post("/api/generate", response_model=GenerateResponse)
async def generate_component(req: GenerateRequest, request: Request):
    check_rate_limit(request)

    category_hint = f"Category focus: {req.category}" if req.category and req.category != "All" else ""
    user_prompt = GENERATE_USER.format(prompt=req.prompt, category_hint=category_hint)

    raw = await ai_generate(GENERATE_SYSTEM, user_prompt)
    data = parse_json_response(raw)

    # Validate code quality
    code = data.get("code", "")
    if not code or len(code) < 30 or "export" not in code:
        # Retry once
        raw = await ai_generate(GENERATE_SYSTEM, user_prompt + "\n\nIMPORTANT: Return complete, valid TSX code with export default.")
        data = parse_json_response(raw)

    # Fix common AI mistakes in imports
    code = data.get("code", "// AI could not generate code")
    # Fix bare imports like: from '@/components/flexui/'
    code = re.sub(
        r"from ['\"]@/components/flexui/['\"]",
        lambda m: m.group(0),  # keep as-is if already correct
        code,
    )

    return GenerateResponse(
        name=data.get("name", "Component"),
        code=code,
        badge=data.get("badge", "Component"),
        badge_color=_badge_color(data.get("badge", "")),
        doc_slug=data.get("doc_slug", ""),
        imports=data.get("imports", []),
    )


def _badge_color(badge: str) -> str:
    colors = {
        "Button": "bg-violet-500/15 text-violet-400",
        "Card": "bg-cyan-500/15 text-cyan-400",
        "Text": "bg-amber-500/15 text-amber-400",
        "Background": "bg-emerald-500/15 text-emerald-400",
        "Effect": "bg-rose-500/15 text-rose-400",
        "Layout": "bg-blue-500/15 text-blue-400",
        "Scroll": "bg-orange-500/15 text-orange-400",
        "WebGL": "bg-purple-500/15 text-purple-400",
    }
    return colors.get(badge, "bg-zinc-500/15 text-zinc-400")


# ── POST /api/analyze ────────────────────────────────────────────────────────
@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_url(req: AnalyzeRequest, request: Request):
    check_rate_limit(request)

    # Fetch the URL
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
            resp = await client.get(req.url, headers={"User-Agent": "FlexUI-Analyzer/1.0"})
            html = resp.text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not fetch URL: {e}")

    # Parse HTML
    soup = BeautifulSoup(html, "html.parser")

    # Extract CSS info
    css_info = []
    for style_tag in soup.find_all("style"):
        text = style_tag.get_text()
        # Find CSS custom properties
        props = re.findall(r"(--[\w-]+)\s*:\s*([^;]+)", text)
        for name, value in props[:20]:
            css_info.append(f"{name}: {value.strip()}")

    # Find colors in inline styles
    colors_found = set()
    for el in soup.find_all(attrs={"style": True}):
        style = el.get("style", "")
        hex_colors = re.findall(r"#[0-9a-fA-F]{3,8}", style)
        colors_found.update(hex_colors[:10])

    # Extract fonts from link tags
    fonts = set()
    for link in soup.find_all("link", href=True):
        href = link["href"]
        if "fonts.googleapis.com" in href:
            font_match = re.findall(r"family=([^&:]+)", href)
            for f in font_match:
                fonts.add(f.replace("+", " "))

    html_snippet = soup.get_text()[:3000]
    css_info_str = "\n".join(css_info[:15]) if css_info else "No CSS variables found"

    user_prompt = ANALYZE_USER.format(
        url=req.url,
        html_snippet=html_snippet,
        css_info=css_info_str,
    )

    raw = await ai_generate(ANALYZE_SYSTEM, user_prompt)
    data = parse_json_response(raw)

    return AnalyzeResponse(
        colors=[ColorInfo(**c) for c in data.get("colors", [])[:6]],
        fonts=data.get("fonts", list(fonts))[:5],
        components=data.get("components", [])[:8],
        suggestions=data.get("suggestions", [])[:6],
    )


# ── POST /api/theme ──────────────────────────────────────────────────────────
@app.post("/api/theme", response_model=ThemeResponse)
async def generate_theme(req: ThemeRequest, request: Request):
    check_rate_limit(request)

    user_prompt = THEME_USER.format(description=req.description)
    raw = await ai_generate(THEME_SYSTEM, user_prompt)
    data = parse_json_response(raw)

    name = data.get("name", "Custom")
    primary = data.get("primary", "#8B5CF6")
    accent = data.get("accent", "#389CFD")
    bg = data.get("bg", "#0B0B18")

    css_code = f"""/* FlexUI Theme: {name} */
:root {{
  --flexui-primary: {primary};
  --flexui-accent: {accent};
  --flexui-bg: {bg};
  --flexui-text: #E4E4E7;
  --flexui-border: rgba(255, 255, 255, 0.06);
  --flexui-glass: rgba(255, 255, 255, 0.03);
}}"""

    tailwind_code = f"""// tailwind.config.ts
theme: {{
  extend: {{
    colors: {{
      flexui: {{
        primary: "{primary}",
        accent: "{accent}",
        bg: "{bg}",
      }}
    }}
  }}
}}"""

    return ThemeResponse(
        name=name,
        primary=primary,
        accent=accent,
        bg=bg,
        css_code=css_code,
        tailwind_code=tailwind_code,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
