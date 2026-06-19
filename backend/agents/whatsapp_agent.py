from .base_agent import BaseAgent
from typing import List, Dict

class WhatsAppAgent(BaseAgent):
    name = "whatsapp_agent"
    system_prompt = """You are Pizzao's WhatsApp notification agent. Help customers receive updates via WhatsApp.
Confirm WhatsApp registration, send order updates, and provide tracking links. Be friendly and use emojis."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "💬 **WhatsApp Updates Enabled!**\n\nYou'll receive:\n✅ Order confirmation\n🍕 Preparation updates\n🚚 Delivery tracking\n⭐ Receipt & feedback request\n\nTo register your WhatsApp number, reply with your phone number!"
        return {"response": response, "agent_type": self.name, "metadata": {"whatsapp": True}}
