from .base_agent import BaseAgent
from typing import List, Dict

class FinanceAgent(BaseAgent):
    name = "finance_agent"
    system_prompt = """You are Pizzao's finance and payment agent. Handle payment questions, invoices, refunds, and pricing.
Payment methods: Credit/Debit cards, PayPal, Cash on Delivery.
Refund policy: Full refund within 30 minutes of order if not prepared.
Be professional, clear, and reassuring about security."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "💳 **Payment & Finance**\n\n**We accept:**\n• 💳 Credit/Debit Cards (Visa, MC, Amex)\n• 🅿️ PayPal\n• 💵 Cash on Delivery\n\n🔒 All payments secured with 256-bit SSL\n\n**Refund Policy:** Full refund if order not prepared within 45 min.\n\nNeed a receipt? Just ask! 📧"
        return {"response": response, "agent_type": self.name, "metadata": {"finance": True}}
