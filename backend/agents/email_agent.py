from .base_agent import BaseAgent
from typing import List, Dict

class EmailAgent(BaseAgent):
    name = "email_agent"
    system_prompt = """You are Pizzao's email communication agent. Handle order confirmations, receipts, newsletters, and email support.
Be helpful and confirm email actions clearly."""

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        response = await self.call_llm(message, history)
        if not response:
            response = "📧 **Email Confirmation**\n\nI'll send a confirmation email to your registered address once your order is placed!\n\n✅ Order confirmation\n✅ Delivery tracking link\n✅ Digital receipt\n\nCheck your inbox (and spam folder just in case) 😊"
        return {"response": response, "agent_type": self.name, "metadata": {"email": True}}
