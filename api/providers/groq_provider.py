import os
from .base import AIProvider

try:
    from groq import Groq
    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False


class GroqProvider(AIProvider):
    """Groq AI provider — fallback, ultra-fast inference."""

    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY", "")
        if self.api_key and HAS_GROQ:
            self.client = Groq(api_key=self.api_key)
        else:
            self.client = None

    def is_available(self) -> bool:
        return bool(self.api_key) and HAS_GROQ and self.client is not None

    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        if not self.client:
            raise RuntimeError("Groq not configured")

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
            max_tokens=2048,
            response_format={"type": "json_object"},
        )
        return response.choices[0].message.content or "{}"
