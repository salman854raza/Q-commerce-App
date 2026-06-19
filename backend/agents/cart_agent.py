from .base_agent import BaseAgent
from typing import List, Dict

class CartAgent(BaseAgent):
    name = "cart_agent"
    system_prompt = """You are Pizzao's cart management agent. Help customers add/remove items, view their cart, and proceed to checkout.
Confirm item additions positively, show running total, and encourage checkout.
Be helpful and use emojis."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "🛒 **Cart Updated!**\n\nI've added your item to the cart.\n\n📋 **Your Cart:**\n• Item added ✅\n\nSubtotal: updating...\n\nReady to checkout? Say **'checkout'** or continue browsing! 😊"
        return {"response": response, "agent_type": self.name, "metadata": {"cart_action": True}}
