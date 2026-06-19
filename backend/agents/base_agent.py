import os
import httpx
from typing import List, Dict, Optional

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
MODEL = "openai/gpt-3.5-turbo"


class BaseAgent:
    name: str = "base_agent"
    system_prompt: str = "You are a helpful pizza restaurant AI assistant."

    async def call_llm(self, message: str, history: List[Dict]) -> str:
        if not OPENROUTER_API_KEY:
            return ""

        messages = []
        for h in history[-4:]:
            messages.append({"role": h["role"], "content": h["content"]})
        messages.append({"role": "user", "content": message})

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://pizzao.vercel.app",
            "X-Title": "Pizzao Q-Commerce",
        }

        payload = {
            "model": MODEL,
            "messages": [{"role": "system", "content": self.system_prompt}] + messages,
            "max_tokens": 600,
            "temperature": 0.7,
        }

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers=headers,
                    json=payload,
                )
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"LLM error in {self.name}: {e}")
            return ""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        return {
            "response": response,
            "agent_type": self.name,
            "metadata": {},
        }
