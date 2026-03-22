# FlexUI AI Studio — Python FastAPI Backend Plan

> Researched and compiled: March 2026
> Goal: Connect the FlexUI AI Studio frontend (Next.js) to real AI models via a FastAPI backend, using **free-tier APIs that require NO credit card**.

---

## A) Ranked Free AI APIs (Best to Worst for Code Generation)

### Tier 1 — Best Options (Recommended)

| Rank | Provider | Model(s) | Free Tier Limits | Credit Card? | Code Quality | Speed | Signup |
|------|----------|----------|------------------|--------------|--------------|-------|--------|
| 1 | **Google Gemini** | Gemini 2.5 Flash, 2.5 Flash-Lite, 2.5 Pro | Flash: 10 RPM / 250 req/day / 250K TPM. Flash-Lite: 15 RPM / 1,000 req/day. Pro: 5 RPM / 100 req/day | **No** | Excellent (9/10) | Fast | ai.google.dev — Google account only |
| 2 | **Groq** | Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B | ~30 RPM / ~14,400 req/day (varies by model) / ~6,000 TPM | **No** | Very Good (8/10) | **Ultra-fast** (LPU inference) | console.groq.com — email signup |
| 3 | **OpenRouter** | DeepSeek V3/R1 (free), Llama 3.3 (free), Qwen 2.5 (free) — 24+ free models | ~20 RPM / ~200 req/day per free model | **No** | Good-Excellent (7-9/10 varies) | Moderate (queued behind paid) | openrouter.ai — email/GitHub signup |
| 4 | **Mistral AI** | Codestral, Mistral Large, Mistral Small, Pixtral 12B | 2 RPM / 1 billion tokens/month | **No** | Excellent for code (9/10 Codestral) | Moderate | console.mistral.ai — email signup |

### Tier 2 — Good Alternatives

| Rank | Provider | Model(s) | Free Tier Limits | Credit Card? | Code Quality | Speed | Signup |
|------|----------|----------|------------------|--------------|--------------|-------|--------|
| 5 | **SambaNova** | Llama 3.3 70B, Llama 3.1 405B, Qwen 2.5 72B | 200K tokens/day, 10-30 RPM by model | **No** | Very Good (8/10) | Very Fast | cloud.sambanova.ai |
| 6 | **Hugging Face** | 300+ models (Mixtral, CodeLlama, StarCoder2, etc.) | ~few hundred req/hour, limited GPU time | **No** | Varies (6-8/10) | Slow (serverless cold starts) | huggingface.co — email signup |
| 7 | **DeepSeek** | DeepSeek V3.2, DeepSeek R1 | 5M tokens on signup (one-time) | **No** | Excellent for code (9/10) | Fast | platform.deepseek.com |

### Tier 3 — Local / Self-Hosted (Unlimited, No API)

| Rank | Provider | Model(s) | Limits | Credit Card? | Code Quality | Speed |
|------|----------|----------|--------|--------------|--------------|-------|
| 8 | **Ollama (Local)** | Llama 3.3 8B, CodeGemma 7B, DeepSeek Coder 6.7B, Qwen 2.5 Coder | Unlimited — runs on your machine | **No** | Good (7-8/10 for smaller models) | Depends on hardware (fast on Apple Silicon) |

### Recommended Strategy for FlexUI AI Studio

**Primary: Google Gemini 2.5 Flash** — Best balance of quality, speed, generous free tier (250 req/day), and no credit card.

**Secondary (fallback): Groq** — Ultra-fast inference, great for real-time code generation, generous limits.

**Tertiary (code-specific): Mistral Codestral** — Purpose-built for code generation, though only 2 RPM on free tier.

**Local dev: Ollama** — Zero cost, no rate limits, works offline.

---

## B) FastAPI Backend Architecture

### Project Structure

```
flexui/
├── backend/                          # NEW — Python FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI app, CORS, middleware
│   │   ├── config.py                 # Settings / env vars
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── requests.py           # Pydantic request models
│   │   │   └── responses.py          # Pydantic response models
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── generate.py           # POST /api/generate
│   │   │   ├── analyze.py            # POST /api/analyze
│   │   │   └── theme.py              # POST /api/theme
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── ai_provider.py        # Abstract AI provider interface
│   │   │   ├── gemini_provider.py    # Google Gemini implementation
│   │   │   ├── groq_provider.py      # Groq implementation
│   │   │   ├── ollama_provider.py    # Ollama local implementation
│   │   │   └── prompt_templates.py   # System prompts for each endpoint
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   └── rate_limit.py         # In-memory rate limiting
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── code_parser.py        # Extract code blocks from AI responses
│   ├── requirements.txt
│   ├── .env.example                  # Template for API keys
│   ├── .env                          # Actual keys (gitignored)
│   ├── Dockerfile
│   └── README.md
├── app/                              # Existing Next.js frontend
│   └── studio/
│       └── ai-studio.tsx             # Will call the backend
└── ...
```

### Required Python Packages (`requirements.txt`)

```
fastapi==0.115.0
uvicorn[standard]==0.32.0
pydantic==2.10.0
pydantic-settings==2.7.0
python-dotenv==1.0.1
httpx==0.28.0
google-genai==1.5.0
groq==0.15.0
slowapi==0.1.9
aiohttp==3.11.0
```

### Core Files

#### `app/main.py` — Application Entry Point

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware

from app.config import settings
from app.routers import generate, analyze, theme

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="FlexUI AI Studio API",
    version="1.0.0",
    docs_url="/api/docs",
)

# CORS — allow the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # ["http://localhost:3000", "https://flexui.dev"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

# Routers
app.include_router(generate.router, prefix="/api")
app.include_router(analyze.router, prefix="/api")
app.include_router(theme.router, prefix="/api")

@app.get("/api/health")
async def health():
    return {"status": "ok", "provider": settings.AI_PROVIDER}
```

#### `app/config.py` — Configuration

```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # AI Provider: "gemini", "groq", "ollama"
    AI_PROVIDER: str = "gemini"

    # API Keys (only need the one for your chosen provider)
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""

    # Ollama (local)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.3:8b"

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # Rate limiting
    RATE_LIMIT: str = "30/minute"

    class Config:
        env_file = ".env"

settings = Settings()
```

### API Endpoints

#### `POST /api/generate` — Generate Component Code

```python
# app/routers/generate.py
from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.models.requests import GenerateRequest
from app.models.responses import GenerateResponse
from app.services.ai_provider import get_provider

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/generate", response_model=GenerateResponse)
@limiter.limit("20/minute")
async def generate_component(request: Request, body: GenerateRequest):
    """Generate FlexUI component code from a natural language prompt."""
    provider = get_provider()
    result = await provider.generate_code(
        prompt=body.prompt,
        component_type=body.component_type,  # optional: "button", "card", "hero", etc.
        style_preferences=body.style_preferences,  # optional: "dark", "glassmorphic", etc.
    )
    return GenerateResponse(
        code=result.code,
        component_name=result.component_name,
        imports=result.imports,
        explanation=result.explanation,
        provider=provider.name,
    )
```

**Request body:**
```json
{
  "prompt": "Create a glowing call-to-action button with a shimmer effect",
  "component_type": "button",
  "style_preferences": "dark theme, violet accent"
}
```

**Response:**
```json
{
  "code": "import { ShimmerButton } from ...",
  "component_name": "ShimmerButton",
  "imports": ["@/components/flexui/shimmer-button"],
  "explanation": "This uses the ShimmerButton component with...",
  "provider": "gemini"
}
```

#### `POST /api/analyze` — Analyze URL

```python
# app/routers/analyze.py
@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("10/minute")
async def analyze_url(request: Request, body: AnalyzeRequest):
    """Analyze a website URL and suggest matching FlexUI components."""
    provider = get_provider()

    # Fetch the page (just the HTML, not full render)
    async with httpx.AsyncClient() as client:
        resp = await client.get(body.url, timeout=10.0, follow_redirects=True)
        html_snippet = resp.text[:5000]  # First 5KB only

    result = await provider.analyze_page(
        url=body.url,
        html_snippet=html_snippet,
        focus_area=body.focus_area,  # optional: "hero", "navigation", "cards"
    )
    return result
```

#### `POST /api/theme` — Generate Theme

```python
# app/routers/theme.py
@router.post("/theme", response_model=ThemeResponse)
@limiter.limit("15/minute")
async def generate_theme(request: Request, body: ThemeRequest):
    """Generate a Tailwind CSS theme from a text description."""
    provider = get_provider()
    result = await provider.generate_theme(
        description=body.description,
        base_preset=body.base_preset,  # optional: "midnight", "sunset", etc.
    )
    return result
```

### Pydantic Models

```python
# app/models/requests.py
from pydantic import BaseModel, HttpUrl
from typing import Optional

class GenerateRequest(BaseModel):
    prompt: str
    component_type: Optional[str] = None
    style_preferences: Optional[str] = None

class AnalyzeRequest(BaseModel):
    url: HttpUrl
    focus_area: Optional[str] = None

class ThemeRequest(BaseModel):
    description: str
    base_preset: Optional[str] = None
```

```python
# app/models/responses.py
from pydantic import BaseModel
from typing import List, Optional

class GenerateResponse(BaseModel):
    code: str
    component_name: str
    imports: List[str]
    explanation: str
    provider: str

class ComponentSuggestion(BaseModel):
    name: str
    reason: str
    code: str
    doc_slug: str

class AnalyzeResponse(BaseModel):
    suggestions: List[ComponentSuggestion]
    summary: str
    provider: str

class ThemeResponse(BaseModel):
    css_variables: dict
    tailwind_config: str
    preview_classes: dict
    explanation: str
    provider: str
```

### AI Provider Service (Multi-Provider Support)

```python
# app/services/ai_provider.py
from abc import ABC, abstractmethod
from app.config import settings

class AIProvider(ABC):
    name: str

    @abstractmethod
    async def generate_code(self, prompt: str, component_type: str = None, style_preferences: str = None):
        ...

    @abstractmethod
    async def analyze_page(self, url: str, html_snippet: str, focus_area: str = None):
        ...

    @abstractmethod
    async def generate_theme(self, description: str, base_preset: str = None):
        ...

def get_provider() -> AIProvider:
    match settings.AI_PROVIDER:
        case "gemini":
            from app.services.gemini_provider import GeminiProvider
            return GeminiProvider()
        case "groq":
            from app.services.groq_provider import GroqProvider
            return GroqProvider()
        case "ollama":
            from app.services.ollama_provider import OllamaProvider
            return OllamaProvider()
        case _:
            raise ValueError(f"Unknown provider: {settings.AI_PROVIDER}")
```

### Gemini Provider (Primary)

```python
# app/services/gemini_provider.py
from google import genai
from app.config import settings
from app.services.ai_provider import AIProvider
from app.services.prompt_templates import GENERATE_SYSTEM_PROMPT, ANALYZE_SYSTEM_PROMPT, THEME_SYSTEM_PROMPT
from app.utils.code_parser import extract_code_block

class GeminiProvider(AIProvider):
    name = "gemini"

    def __init__(self):
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model = "gemini-2.5-flash"

    async def generate_code(self, prompt, component_type=None, style_preferences=None):
        user_msg = f"Component request: {prompt}"
        if component_type:
            user_msg += f"\nComponent type: {component_type}"
        if style_preferences:
            user_msg += f"\nStyle: {style_preferences}"

        response = self.client.models.generate_content(
            model=self.model,
            contents=[
                {"role": "user", "parts": [{"text": GENERATE_SYSTEM_PROMPT + "\n\n" + user_msg}]}
            ],
        )
        return extract_code_block(response.text)
```

### Prompt Templates (Critical for Quality)

```python
# app/services/prompt_templates.py

FLEXUI_COMPONENT_LIST = """
Available FlexUI components (import from @/components/flexui/):
- ShimmerButton: Animated button with shimmer effect. Props: shimmerColor, className, children
- GlowButton: Button with glow hover effect. Props: color, className, children
- SpotlightCard: Card with mouse-tracking spotlight. Props: className, children
- NeonGlowCard: Card with neon border glow. Props: color, intensity, pulse, children
- GradientText: Animated gradient text. Props: colors, animationSpeed, className, children
- TypewriterText: Typewriter animation. Props: text, speed, cursor, className
- TextReveal: Text reveal on scroll. Props: text, mode, className
- NumberTicker: Animated number counter. Props: value, direction, className
- RotatingText: Rotating text carousel. Props: texts, interval, className
- MorphingBlob: Animated SVG blob. Props: colors, size, speed
- HandwrittenAnnotation: SVG annotation effects. Props: text, type, color
- CinematicHero: Full hero section. Props: headline, subtitle, background, badge, primaryCta, secondaryCta
- FloatingPanel: Floating glassmorphic panel. Props: position, blur, className, children
- InteractiveGlobe: 3D globe component. Props: markers, autoRotate, className
"""

GENERATE_SYSTEM_PROMPT = f"""You are an expert React/Next.js developer specializing in the FlexUI component library.
Your task: generate a complete, ready-to-use React component using FlexUI components.

{FLEXUI_COMPONENT_LIST}

Rules:
1. ONLY use components from the FlexUI library listed above.
2. Use TypeScript with "use client" directive when needed.
3. Use Tailwind CSS for styling (v4, dark theme, zinc-based colors).
4. Return a single code block with the complete component file.
5. Include all necessary imports.
6. The component should be self-contained and copy-pasteable.
7. After the code block, provide a brief explanation.

Response format:
```tsx
// your code here
```

Component name: ComponentName
Explanation: Brief description of what was built and which FlexUI components were used.
"""

ANALYZE_SYSTEM_PROMPT = f"""You are a UI analyst. Given a website URL and its HTML snippet, suggest FlexUI components that could recreate or enhance similar UI patterns.

{FLEXUI_COMPONENT_LIST}

For each suggestion, provide:
1. Component name
2. Why it matches a pattern on the page
3. Example code using that component
4. The doc slug (kebab-case component name)

Return as JSON array.
"""

THEME_SYSTEM_PROMPT = """You are a design system expert. Generate a Tailwind CSS theme based on the user's description.

Return a JSON object with:
1. css_variables: CSS custom properties for colors, spacing, etc.
2. tailwind_config: Tailwind config extend block as a string
3. preview_classes: Example class combinations to preview the theme
4. explanation: Brief description of the theme

Focus on dark themes with accent colors. Use modern design patterns (glassmorphism, gradients, subtle glows).
"""
```

### Error Handling

```python
# In each router, wrap AI calls:
from fastapi import HTTPException

@router.post("/generate")
async def generate_component(request: Request, body: GenerateRequest):
    try:
        provider = get_provider()
        result = await provider.generate_code(...)
        return result
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="AI provider timed out")
    except Exception as e:
        # Fallback: return a mock/template response
        raise HTTPException(status_code=502, detail=f"AI provider error: {str(e)}")
```

### `.env.example`

```env
# Choose provider: gemini, groq, ollama
AI_PROVIDER=gemini

# Google Gemini (get key at https://ai.google.dev)
GEMINI_API_KEY=

# Groq (get key at https://console.groq.com)
GROQ_API_KEY=

# Ollama (local — no key needed)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.3:8b

# CORS origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Rate limit
RATE_LIMIT=30/minute
```

---

## C) Frontend Integration Plan

### Environment Variables (Next.js)

Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```
NEXT_PUBLIC_API_URL=https://flexui-api.onrender.com
```

### API Client Utility

Create `lib/api.ts`:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface GenerateRequest {
  prompt: string;
  component_type?: string;
  style_preferences?: string;
}

interface GenerateResponse {
  code: string;
  component_name: string;
  imports: string[];
  explanation: string;
  provider: string;
}

interface AnalyzeRequest {
  url: string;
  focus_area?: string;
}

interface ThemeRequest {
  description: string;
  base_preset?: string;
}

export async function generateComponent(req: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || `API error: ${res.status}`);
  }
  return res.json();
}

export async function analyzeUrl(req: AnalyzeRequest) {
  const res = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || `API error: ${res.status}`);
  }
  return res.json();
}

export async function generateTheme(req: ThemeRequest) {
  const res = await fetch(`${API_URL}/api/theme`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || `API error: ${res.status}`);
  }
  return res.json();
}
```

### Changes to `ai-studio.tsx`

The current `ai-studio.tsx` uses a `componentMap` with mock responses. Replace the mock logic with real API calls:

```typescript
// In the Generate tab's submit handler, replace the mock lookup with:
import { generateComponent, analyzeUrl, generateTheme } from "@/lib/api";

const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

async function handleGenerate() {
  setLoading(true);
  setError(null);
  try {
    const result = await generateComponent({
      prompt: inputValue,
      component_type: selectedType,
      style_preferences: stylePrefs,
    });
    setGeneratedCode(result.code);
    setComponentName(result.component_name);
    setExplanation(result.explanation);
  } catch (e) {
    setError(e instanceof Error ? e.message : "Generation failed");
  } finally {
    setLoading(false);
  }
}
```

### Loading & Error States

Add to the UI:
```tsx
{loading && (
  <div className="flex items-center gap-2 text-zinc-400">
    <Zap className="h-4 w-4 animate-pulse text-violet-400" />
    <span>Generating with AI...</span>
  </div>
)}

{error && (
  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm">
    {error}
  </div>
)}
```

---

## D) Deployment Options (Free Tier)

| Platform | Free Tier | Sleep? | Deploy Method | Best For |
|----------|-----------|--------|---------------|----------|
| **Render** | 750 hrs/month, 100 GB bandwidth | Yes (spins down after 15 min idle, ~30s cold start) | Git push or Docker | **Recommended** — simplest setup |
| **Railway** | $5/month credit (~500 hrs) | No (always on until credit runs out) | Git push | Fast deploys, nice dashboard |
| **Fly.io** | 3 free VMs, 160 GB bandwidth | No | CLI + Dockerfile | Global edge, low latency |
| **Koyeb** | 1 free nano instance | No | Git or Docker | Always-on free tier |
| **Vercel** (Python) | Serverless functions, 100 GB bandwidth | Yes (serverless cold starts) | Git push | If you want everything on Vercel |

### Recommended: Render

```yaml
# render.yaml (Infrastructure as Code)
services:
  - type: web
    name: flexui-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: AI_PROVIDER
        value: gemini
      - key: GEMINI_API_KEY
        sync: false  # set manually in dashboard
      - key: ALLOWED_ORIGINS
        value: https://flexui.dev,http://localhost:3000
```

### Dockerfile (for Railway / Fly.io / any Docker host)

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## E) Step-by-Step Implementation

### Phase 1: Setup (30 minutes)

1. **Get API keys (no credit card needed):**
   - Go to https://ai.google.dev — sign in with Google, create API key
   - Go to https://console.groq.com — sign up with email, create API key
   - (Optional) Install Ollama: `brew install ollama && ollama pull llama3.3:8b`

2. **Create the backend directory:**
   ```bash
   cd /Users/tamil/flexui
   mkdir -p backend/app/{models,routers,services,middleware,utils}
   touch backend/app/__init__.py
   touch backend/app/models/__init__.py
   touch backend/app/routers/__init__.py
   touch backend/app/services/__init__.py
   touch backend/app/middleware/__init__.py
   touch backend/app/utils/__init__.py
   ```

3. **Create requirements.txt:**
   ```bash
   cat > backend/requirements.txt << 'EOF'
   fastapi==0.115.0
   uvicorn[standard]==0.32.0
   pydantic==2.10.0
   pydantic-settings==2.7.0
   python-dotenv==1.0.1
   httpx==0.28.0
   google-genai==1.5.0
   groq==0.15.0
   slowapi==0.1.9
   EOF
   ```

4. **Setup virtual environment:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

5. **Create `.env`:**
   ```bash
   cp .env.example .env
   # Edit .env and paste your Gemini API key
   ```

### Phase 2: Build Core Backend (2 hours)

Create files in this order:
1. `backend/app/config.py` — settings
2. `backend/app/models/requests.py` — request schemas
3. `backend/app/models/responses.py` — response schemas
4. `backend/app/services/prompt_templates.py` — system prompts
5. `backend/app/utils/code_parser.py` — extract code from AI response
6. `backend/app/services/ai_provider.py` — abstract base
7. `backend/app/services/gemini_provider.py` — Gemini implementation
8. `backend/app/services/groq_provider.py` — Groq implementation
9. `backend/app/routers/generate.py` — generate endpoint
10. `backend/app/routers/analyze.py` — analyze endpoint
11. `backend/app/routers/theme.py` — theme endpoint
12. `backend/app/main.py` — app assembly

### Phase 3: Test Locally (30 minutes)

```bash
# Terminal 1: Start FastAPI backend
cd /Users/tamil/flexui/backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Terminal 2: Test endpoints
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a glowing CTA button with shimmer effect"}'

curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://stripe.com"}'

curl -X POST http://localhost:8000/api/theme \
  -H "Content-Type: application/json" \
  -d '{"description": "Cyberpunk theme with neon pink and electric blue"}'

# Health check
curl http://localhost:8000/api/health

# API docs (auto-generated)
open http://localhost:8000/api/docs
```

### Phase 4: Connect Frontend (1 hour)

1. Create `lib/api.ts` (as shown in Section C)
2. Add `NEXT_PUBLIC_API_URL=http://localhost:8000` to `.env.local`
3. Update `ai-studio.tsx`:
   - Replace mock `componentMap` lookups with `generateComponent()` calls
   - Add loading/error state handling
   - Keep mock responses as offline fallback

### Phase 5: Deploy (30 minutes)

1. Push backend to a separate GitHub repo or subdirectory
2. Connect to Render:
   - New Web Service > Connect repo
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add env vars: `GEMINI_API_KEY`, `AI_PROVIDER=gemini`, `ALLOWED_ORIGINS=https://flexui.dev`
3. Update frontend `NEXT_PUBLIC_API_URL` to the Render URL
4. Deploy frontend

### Phase 6: Add Provider Fallback (Optional, 1 hour)

Implement automatic failover: if Gemini hits rate limit, fall back to Groq, then to mock responses:

```python
async def generate_with_fallback(prompt, ...):
    providers = ["gemini", "groq"]
    for provider_name in providers:
        try:
            provider = get_provider(provider_name)
            return await provider.generate_code(prompt, ...)
        except RateLimitError:
            continue
    # All providers exhausted — return template response
    return get_mock_response(prompt)
```

---

## Summary of Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Primary AI | Google Gemini 2.5 Flash | 250 req/day free, no credit card, excellent code quality |
| Fallback AI | Groq (Llama 3.3 70B) | Ultra-fast, generous free tier, no credit card |
| Backend framework | FastAPI | Async, auto-docs, Pydantic validation, Python AI SDKs |
| Hosting | Render free tier | Simple git deploy, 750 free hours/month |
| Rate limiting | slowapi | Built for FastAPI, in-memory, no external deps |
| Provider pattern | Strategy pattern | Swap providers without changing endpoints |

**Total cost: $0.** No credit card required at any step.

---

## Sources

- [Best Free AI APIs 2026 — No Credit Card](https://crazyburst.com/best-free-ai-apis-2026/)
- [Free AI API Credits 2026: Every Provider Compared](https://www.getaiperks.com/en/blogs/27-ai-api-free-tier-credits-2026)
- [Every Free AI API in 2026](https://awesomeagents.ai/tools/free-ai-inference-providers-2026/)
- [Google Gemini API Free Tier — March 2026](https://www.aifreeapi.com/en/posts/google-gemini-api-free-tier)
- [Gemini Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Gemini Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Groq Rate Limits](https://console.groq.com/docs/rate-limits)
- [Groq Pricing](https://groq.com/pricing)
- [OpenRouter Free Models (March 2026)](https://costgoat.com/pricing/openrouter-free-models)
- [OpenRouter Free Models Collection](https://openrouter.ai/collections/free-models)
- [Mistral AI Free Tier / Rate Limits](https://docs.mistral.ai/deployment/ai-studio/tier)
- [SambaNova Rate Limits](https://docs.sambanova.ai/docs/en/models/rate-limits)
- [Hugging Face Pricing](https://huggingface.co/pricing)
- [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing)
- [Ollama API Docs](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [FastAPI CORS Documentation](https://fastapi.tiangolo.com/tutorial/cors/)
- [Mastering CORS: FastAPI and Next.js](https://medium.com/@vaibhavtiwari.945/mastering-cors-configuring-cross-origin-resource-sharing-in-fastapi-and-next-js-28c61272084b)
- [Best Hosting for FastAPI 2026](https://www.stackpicker.dev/guides/fastapi/hosting/)
- [Render FastAPI Deployment](https://render.com/articles/fastapi-deployment-options)
- [Railway vs Render vs Fly.io 2026](https://www.pkgpulse.com/blog/railway-vs-render-vs-fly-io-app-hosting-platforms-nodejs-2026)
