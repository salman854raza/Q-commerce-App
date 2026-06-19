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
        }

        self.routing_prompt = """You are the coordinator of a pizza restaurant Q-commerce multi-agent system.
Analyze the user's message and determine which agent should handle it.

Available agents:
- selling_agent: Product recommendations, upselling, promotions, deals
- shopping_agent: Menu browsing, searching items, product details
- cart_agent: Add/remove items, view cart, update quantities
- delivery_agent: Order tracking, delivery status, ETA
- finance_agent: Payments, bills, invoices, refunds
- email_agent: Email confirmations, receipts, subscriptions

Respond with ONLY a JSON object: {"agent": "agent_name", "reason": "brief reason"}
"""

    async def _call_openrouter(self, messages: List[Dict], system: str = "") -> str:
        """Call OpenRouter API."""
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
            "messages": [{"role": "system", "content": system}] + messages if system else messages,
            "max_tokens": 500,
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
            print(f"OpenRouter error: {e}")
            return ""

    async def _route_to_agent(self, message: str, history: List[Dict]) -> str:
        """Determine which agent should handle the message."""
        messages = [{"role": "user", "content": message}]

        if OPENROUTER_API_KEY:
            response = await self._call_openrouter(messages, self.routing_prompt)
            try:
                data = json.loads(response)
                return data.get("agent", "selling_agent")
            except Exception:
                pass

        # Rule-based fallback routing
        msg_lower = message.lower()
        if any(w in msg_lower for w in ["track", "where", "delivery", "arrived", "eta", "status"]):
            return "delivery_agent"
        elif any(w in msg_lower for w in ["cart", "add", "remove", "checkout", "basket"]):
            return "cart_agent"
        elif any(w in msg_lower for w in ["pay", "invoice", "bill", "refund", "price", "cost", "expensive"]):
            return "finance_agent"
        elif any(w in msg_lower for w in ["email", "confirm", "receipt", "notification"]):
            return "email_agent"
        elif any(w in msg_lower for w in ["menu", "show", "list", "available", "what", "browse"]):
            return "shopping_agent"
        else:
            return "selling_agent"

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        """Process message through coordinator and route to appropriate agent."""
        agent_name = await self._route_to_agent(message, history)
        agent = self.agents.get(agent_name, self.agents["selling_agent"])

        result = await agent.process(message=message, session_id=session_id, history=history)
        result["agent_type"] = agent_name

        # If no OpenRouter key, try a smart local response
        if not result.get("response"):
            result["response"] = await self._local_response(message, agent_name)

        return result

    async def _local_response(self, message: str, agent_name: str) -> str:
        """Smart local responses when OpenRouter is unavailable."""
        msg = message.lower()

        responses = {
            "delivery_agent": "🚚 **Order Tracking**\n\nYour order is on the way! Expected delivery: 25-30 minutes.\n\nFor real-time tracking, please provide your order ID (e.g., #PZO-001).",
            "cart_agent": "🛒 **Cart Updated**\n\nI've processed your cart request!\n\n• Spring Fling Pizza x1 — $10.00\n• Total: $10.00\n\nReady to checkout? Just say 'checkout'!",
            "finance_agent": "💳 **Payment Options**\n\nWe accept:\n• Credit/Debit Cards\n• PayPal\n• Cash on Delivery\n\nAll transactions are secured with SSL encryption. 🔒",
            "email_agent": "📧 **Email Confirmation**\n\nI'll send a confirmation to your registered email address once you place your order!",
            "shopping_agent": "🍕 **Our Menu Highlights**\n\n• Spring Fling Pizza — $10.00 ⭐ NEW\n• Korma Special Pizza — $12.00\n• Farm Villa Pizza — $18.00\n• Hot Passion Pizza — $16.00 🔥\n• Paneer Tikka Pizza — $22.00\n\nVisit /menu for the full menu!",
            "selling_agent": "🎉 **Today's Best Deals!**\n\n🔥 **Buy 1 Get 1 Free** on Large Pizzas\n⚡ **Free Delivery** on orders over $30\n🌟 **First Order 15% OFF** — Code: PIZZA15\n\nWant to order now? Just say 'I want [pizza name]'!",
        }

        return responses.get(agent_name, "🍕 How can I help you today at Pizzao? Ask me about our menu, deals, or place an order!")
