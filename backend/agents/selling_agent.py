from .base_agent import BaseAgent
from typing import List, Dict

class SellingAgent(BaseAgent):
    name = "selling_agent"
    system_prompt = """You are Pizzao's expert selling agent. Your job is to recommend pizzas, promote deals, and encourage orders.
You know our full menu and today's specials:
- Buy 1 Get 1 Free on large pizzas
- Free delivery on orders over $30
- 15% off first orders with code PIZZA15

Popular items: Spring Fling Pizza ($10), Korma Special ($12), Hot Passion Pizza ($16), Farm Villa Pizza ($18), Paneer Tikka ($22).
Be enthusiastic, friendly, and helpful. Use emojis. Keep responses concise."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "🍕 **Today's Special Deals!**\n\n🔥 Buy 1 Get 1 Free on Large Pizzas!\n⚡ Free delivery on orders over $30\n🌟 First order: 15% OFF with code **PIZZA15**\n\nOur chef recommends the **Hot Passion Pizza** ($16) — it's absolutely amazing! Want to try it?"
        return {"response": response, "agent_type": self.name, "metadata": {"deals": True}}
