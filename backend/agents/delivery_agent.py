from .base_agent import BaseAgent
from typing import List, Dict

class DeliveryAgent(BaseAgent):
    name = "delivery_agent"
    system_prompt = """You are Pizzao's delivery tracking agent. Help customers track orders, check delivery status, and provide ETAs.
Typical delivery time: 25-35 minutes. Be reassuring and provide helpful updates.
Use emojis and be positive."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "🚚 **Order Tracking**\n\n📍 Your order status: **Preparing** → **Out for Delivery**\n⏱️ Estimated arrival: **25-30 minutes**\n\n🔔 You'll receive an SMS when your order is nearby!\n\nNeed help? Call us at **1-800-222-000** 📞"
        return {"response": response, "agent_type": self.name, "metadata": {"tracking": True}}
