import os
import httpx
import json
from typing import List, Dict, Optional

from .selling_agent import SellingAgent
from .shopping_agent import ShoppingAgent
from .cart_agent import CartAgent
from .delivery_agent import DeliveryAgent
from .finance_agent import FinanceAgent
from .email_agent import EmailAgent
from .whatsapp_agent import WhatsAppAgent

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
MODEL = "openai/gpt-3.5-turbo"


class CoordinatorAgent:
    """Master coordinator that routes requests to specialized agents."""

    def __init__(self):
        self.agents = {
            "selling_agent": SellingAgent(),
            "shopping_agent": ShoppingAgent(),
            "cart_agent": CartAgent(),
            "delivery_agent": DeliveryAgent(),
            "finance_agent": FinanceAgent(),
            "email_agent": EmailAgent(),
            "whatsapp_agent": WhatsAppAgent(),
        }

        self.routing_prompt = """You are the coordinator of a pizza restaurant Q-commerce multi-agent system.
Analyze the user message and respond with ONLY a JSON object: {"agent": "agent_name"}

Available agents:
- selling_agent: deals, promotions, recommendations, orders, buy
- shopping_agent: menu, browse, show items, list, search food
- cart_agent: add/remove items, view cart, checkout, basket
- delivery_agent: track order, delivery status, ETA, where is my order
- finance_agent: payment, bill, invoice, refund, price, cost
- email_agent: email, confirmation, receipt
- whatsapp_agent: whatsapp, sms, notification, text message
"""

    async def _call_openrouter(self, messages: List[Dict], system: str = "") -> str:
        if not OPENROUTER_API_KEY:
            return ""
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://pizzao.vercel.app",
            "X-Title": "Pizzao Q-Commerce",
        }
        payload = {
            "model": MODEL,
            "messages": ([{"role": "system", "content": system}] if system else []) + messages,
            "max_tokens": 100,
            "temperature": 0.3,
        }
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(f"{OPENROUTER_BASE_URL}/chat/completions", headers=headers, json=payload)
                data = resp.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"OpenRouter error: {e}")
            return ""

    async def _route_to_agent(self, message: str) -> str:
        if OPENROUTER_API_KEY:
            resp = await self._call_openrouter([{"role": "user", "content": message}], self.routing_prompt)
            try:
                data = json.loads(resp.strip().split('\n')[0])
                agent = data.get("agent", "selling_agent")
                if agent in self.agents:
                    return agent
            except Exception:
                pass

        # Rule-based fallback
        msg = message.lower()
        if any(w in msg for w in ["track", "where", "delivery", "arrived", "eta", "when will"]):
            return "delivery_agent"
        elif any(w in msg for w in ["cart", "add to", "remove", "checkout", "basket", "bag"]):
            return "cart_agent"
        elif any(w in msg for w in ["pay", "invoice", "bill", "refund", "credit card", "cash"]):
            return "finance_agent"
        elif any(w in msg for w in ["email", "receipt", "confirmation mail"]):
            return "email_agent"
        elif any(w in msg for w in ["whatsapp", "sms", "text me", "notify"]):
            return "whatsapp_agent"
        elif any(w in msg for w in ["menu", "show", "list", "what", "browse", "options", "available"]):
            return "shopping_agent"
        else:
            return "selling_agent"

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        agent_name = await self._route_to_agent(message)
        agent = self.agents.get(agent_name, self.agents["selling_agent"])
        result = await agent.process(message=message, session_id=session_id, history=history)
        result["agent_type"] = agent_name
        return result
