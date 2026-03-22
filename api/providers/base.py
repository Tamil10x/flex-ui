from abc import ABC, abstractmethod


class AIProvider(ABC):
    """Base class for AI providers."""

    @abstractmethod
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        """Send a prompt and return the response text."""
        pass

    @abstractmethod
    def is_available(self) -> bool:
        """Check if this provider has a valid API key."""
        pass
