import os
from .base import AIProvider

try:
    from google import genai
    from google.genai import types
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False


class GeminiProvider(AIProvider):
    """Google Gemini AI provider — primary, best free tier."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        if self.api_key and HAS_GEMINI:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None

    def is_available(self) -> bool:
        return bool(self.api_key) and HAS_GEMINI and self.client is not None

    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        if not self.client:
            raise RuntimeError("Gemini not configured")

        response = self.client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents=[
                {"role": "user", "parts": [{"text": system_prompt}]},
                {"role": "model", "parts": [{"text": "Understood. I will generate FlexUI component code following the exact rules and return valid JSON."}]},
                {"role": "user", "parts": [{"text": user_prompt}]},
            ],
            config={
                "temperature": 0.35,
                "max_output_tokens": 4096,
                "response_mime_type": "application/json",
            },
        )
        return response.text
