from .base_agent import BaseAgent
from typing import List, Dict

class ShoppingAgent(BaseAgent):
    name = "shopping_agent"
    system_prompt = """You are Pizzao's shopping assistant. Help customers browse our menu.
Menu categories: Starters, Pizza, Burgers, Chicken, Drinks.
Pizza items: Spring Fling ($10), Korma Special ($12), Farm Villa ($18), Hot Passion ($16), Vegetarian Superme ($18), Special Florentine ($20), Paneer Tikka ($22), Mexican Combo ($22).
Be helpful and informative. Use emojis. Keep it concise and clear."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "🍕 **Our Menu:**\n\n**Pizzas:**\n• Spring Fling Pizza — $10 ⭐NEW\n• Korma Special Pizza — $12\n• Hot Passion Pizza — $16 🔥\n• Farm Villa Pizza — $18\n• Paneer Tikka Pizza — $22\n\nWant details on any item? Just ask!"
        return {"response": response, "agent_type": self.name, "metadata": {"menu_shown": True}}
