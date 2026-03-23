from pydantic import BaseModel
from typing import Optional


class GenerateRequest(BaseModel):
    prompt: str
    category: Optional[str] = None


class GenerateResponse(BaseModel):
    name: str
    code: str
    badge: str
    badge_color: str
    doc_slug: str
    imports: list[str]


class AnalyzeRequest(BaseModel):
    url: str


class ColorInfo(BaseModel):
    name: str
    hex: str


class AnalyzeResponse(BaseModel):
    colors: list[ColorInfo]
    fonts: list[str]
    components: list[str]
    suggestions: list[str]


class ThemeRequest(BaseModel):
    description: str


class ThemeResponse(BaseModel):
    name: str
    primary: str
    accent: str
    bg: str
    css_code: str
    tailwind_code: str
