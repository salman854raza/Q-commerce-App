import os
import httpx
import json
from typing import List, Dict

from .selling_agent import SellingAgent
from .shopping_agent import ShoppingAgent
from .cart_agent import CartAgent
from .delivery_agent import DeliveryAgent
from .finance_agent import FinanceAgent
from .email_agent import EmailAgent
from .whatsapp_agent import WhatsAppAgent

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
MODEL = "openai/gpt-4o-mini"

# ─── STRICT TOPIC GUARD ────────────────────────────────────────────────
OUT_OF_SCOPE_KEYWORDS = [
    "physics","chemistry","biology","math","history","geography","politics",
    "religion","coding","programming","weather","sports","music","movie",
    "game","news","health advice","medical","doctor","love","relationship",
    "homework","essay","poem","translate","capital of","who is","what is gravity",
    "tell me a joke","stock","crypto","bitcoin","forex",
]

PIZZAO_TOPICS = [
    "pizza","order","menu","delivery","burger","food","price","cart","checkout",
    "track","address","payment","refund","franchise","chef","restaurant","deal",
    "offer","discount","drink","starter","chicken","salad","receipt","invoice",
    "schedule","hours","location","allergen","vegetarian","spicy","combo",
]

def is_on_topic(message: str) -> bool:
    msg = message.lower()
    # If any out-of-scope keyword exists AND no pizzao keyword, block it
    has_oos = any(k in msg for k in OUT_OF_SCOPE_KEYWORDS)
    has_pizzao = any(k in msg for k in PIZZAO_TOPICS)
    if has_oos and not has_pizzao:
        return False
    return True

OUT_OF_SCOPE_REPLY = (
    "🍕 I'm Pizzao's AI assistant and I can only help with:\n\n"
    "• 🛒 **Placing orders** — tell me what you'd like!\n"
    "• 📋 **Our menu** — pizzas, burgers, drinks & more\n"
    "• 🚚 **Order tracking** — share your order ID\n"
    "• 💳 **Payments & refunds**\n"
    "• 🏪 **Restaurant info** — location, hours, franchise\n\n"
    "What can I help you order today? 😊"
)

# ─── ORDER FLOW STATE ──────────────────────────────────────────────────
# Tracks per-session order state
SESSION_STORE: Dict[str, Dict] = {}

def get_session(session_id: str) -> Dict:
    if session_id not in SESSION_STORE:
        SESSION_STORE[session_id] = {
            "stage": "idle",          # idle | browsing | item_selected | awaiting_address | awaiting_payment | confirmed
            "cart": [],
            "address": None,
            "name": None,
            "phone": None,
            "payment": None,
        }
    return SESSION_STORE[session_id]


class CoordinatorAgent:
    def __init__(self):
        self.agents = {
            "selling_agent":   SellingAgent(),
            "shopping_agent":  ShoppingAgent(),
            "cart_agent":      CartAgent(),
            "delivery_agent":  DeliveryAgent(),
            "finance_agent":   FinanceAgent(),
            "email_agent":     EmailAgent(),
            "whatsapp_agent":  WhatsAppAgent(),
        }

    async def _llm(self, system: str, user: str, max_tokens: int = 500) -> str:
        if not OPENROUTER_API_KEY:
            return ""
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://pizzao.vercel.app",
            "X-Title": "Pizzao",
        }
        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user",   "content": user},
            ],
            "max_tokens": max_tokens,
            "temperature": 0.4,
        }
        try:
            async with httpx.AsyncClient(timeout=20.0) as c:
                r = await c.post(f"{OPENROUTER_BASE_URL}/chat/completions", headers=headers, json=payload)
                return r.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"LLM error: {e}")
            return ""

    async def _route(self, msg: str) -> str:
        m = msg.lower()
        if any(w in m for w in ["track","where is my","status of","arrived","eta","when will"]):
            return "delivery_agent"
        if any(w in m for w in ["cart","checkout","remove from","my cart","total","bag"]):
            return "cart_agent"
        if any(w in m for w in ["pay","invoice","bill","refund","receipt","credit card","cash on"]):
            return "finance_agent"
        if any(w in m for w in ["email","whatsapp","notify","notification","sms"]):
            return "email_agent"
        if any(w in m for w in ["menu","show me","what do you have","browse","list","available","categories"]):
            return "shopping_agent"
        return "selling_agent"

    async def _handle_order_flow(self, message: str, session: Dict) -> Dict | None:
        """Strictly guides user through: item → address → payment → confirm"""
        msg = message.lower()
        stage = session["stage"]

        # ── Stage: awaiting address after item added ──
        if stage == "awaiting_address":
            # Check if message looks like an address
            address_clues = ["street","road","avenue","lane","block","house","flat","floor",
                             "city","karachi","lahore","islamabad","sector","phase","dha","clifton",
                             "no.","#",","]
            if any(c in msg for c in address_clues) or len(message.split()) >= 4:
                session["address"] = message
                session["stage"] = "awaiting_payment"
                items = ", ".join([f"{i['name']} x{i['qty']}" for i in session["cart"]])
                total = sum(i["price"] * i["qty"] for i in session["cart"])
                return {
                    "response": (
                        f"✅ **Delivery address saved!**\n📍 {message}\n\n"
                        f"**Your Order:**\n{chr(10).join([f'• {i[\"name\"]} x{i[\"qty\"]} — ${i[\"price\"]*i[\"qty\"]:.2f}' for i in session['cart']])}\n"
                        f"**Total: ${total:.2f}** (incl. free delivery)\n\n"
                        f"💳 **How would you like to pay?**\n"
                        f"1️⃣ Cash on Delivery\n2️⃣ Card (Visa/Mastercard)\n3️⃣ PayPal\n\n"
                        f"Reply with 1, 2, or 3."
                    ),
                    "agent_type": "cart_agent",
                }
            else:
                return {
                    "response": (
                        "📍 I need your **full delivery address** to proceed.\n\n"
                        "Please share something like:\n"
                        "*House 12, Street 4, Block B, DHA Phase 2, Karachi*"
                    ),
                    "agent_type": "cart_agent",
                }

        # ── Stage: awaiting payment choice ──
        if stage == "awaiting_payment":
            payment_map = {"1": "Cash on Delivery", "2": "Card", "3": "PayPal",
                           "cash": "Cash on Delivery", "card": "Card", "paypal": "PayPal"}
            chosen = None
            for key, val in payment_map.items():
                if key in msg:
                    chosen = val
                    break
            if chosen:
                session["payment"] = chosen
                session["stage"] = "confirmed"
                total = sum(i["price"] * i["qty"] for i in session["cart"])
                import random, string
                order_id = "PZO-" + "".join(random.choices(string.digits, k=6))
                session["order_id"] = order_id
                return {
                    "response": (
                        f"🎉 **Order Confirmed!**\n\n"
                        f"📦 **Order ID:** `{order_id}`\n"
                        f"📍 **Deliver to:** {session['address']}\n"
                        f"💳 **Payment:** {chosen}\n"
                        f"⏱️ **Estimated arrival:** 25–35 minutes\n\n"
                        f"**Order Summary:**\n"
                        + "\n".join([f"• {i['name']} x{i['qty']} — ${i['price']*i['qty']:.2f}" for i in session["cart"]])
                        + f"\n\n**Total: ${total:.2f}**\n\n"
                        f"🔔 You'll receive SMS updates. Track your order anytime with ID `{order_id}`.\n\n"
                        f"Thank you for choosing Pizzao! 🍕"
                    ),
                    "agent_type": "delivery_agent",
                    "metadata": {"order_id": order_id, "stage": "confirmed"},
                }
            else:
                return {
                    "response": "Please choose a payment method:\n1️⃣ Cash on Delivery\n2️⃣ Card\n3️⃣ PayPal",
                    "agent_type": "finance_agent",
                }

        # ── Stage: confirmed — handle follow-up ──
        if stage == "confirmed":
            if any(w in msg for w in ["track","where","status"]):
                oid = session.get("order_id","your order")
                return {
                    "response": f"🚚 Order `{oid}` is **out for delivery**!\n⏱️ Arriving in ~20 minutes.\n📍 Heading to: {session['address']}",
                    "agent_type": "delivery_agent",
                }

        return None  # Let normal routing handle it

    async def _detect_add_to_cart(self, message: str, session: Dict) -> Dict | None:
        """Detect when user wants to order something and add to cart."""
        MENU = [
            {"name": "Spring Fling Pizza",     "price": 10.00, "keywords": ["spring fling","spring"]},
            {"name": "Korma Special Pizza",    "price": 12.00, "keywords": ["korma","korma special"]},
            {"name": "Farm Villa Pizza",       "price": 18.00, "keywords": ["farm villa","farm"]},
            {"name": "Hot Passion Pizza",      "price": 16.00, "keywords": ["hot passion","passion"]},
            {"name": "Vegetarian Pizza",       "price": 18.00, "keywords": ["vegetarian","veg pizza","veg"]},
            {"name": "Special Florentine",     "price": 20.00, "keywords": ["florentine","special florentine"]},
            {"name": "Paneer Tikka Pizza",     "price": 22.00, "keywords": ["paneer","tikka","paneer tikka"]},
            {"name": "Mexican Combo Pizza",    "price": 22.00, "keywords": ["mexican","combo","mexican combo"]},
            {"name": "Classic Beef Burger",    "price": 14.00, "keywords": ["beef burger","beef","classic burger"]},
            {"name": "Chicken Deluxe Burger",  "price": 12.00, "keywords": ["chicken burger","chicken deluxe"]},
            {"name": "BBQ Chicken Wings",      "price": 16.00, "keywords": ["wings","bbq wings","chicken wings"]},
            {"name": "Fresh Lemonade",         "price":  5.00, "keywords": ["lemonade","lemon drink"]},
        ]

        ORDER_TRIGGERS = ["i want","i'd like","order","give me","add","get me","can i have","one","two","three"]
        msg = message.lower()

        if not any(t in msg for t in ORDER_TRIGGERS):
            return None

        matched_item = None
        for item in MENU:
            if any(kw in msg for kw in item["keywords"]):
                matched_item = item
                break

        # Detect quantity
        qty = 1
        for word, num in [("two",2),("three",3),("four",4),("five",5),("2",2),("3",3),("4",4),("5",5)]:
            if word in msg:
                qty = num
                break

        if matched_item:
            # Check if already in cart
            existing = next((i for i in session["cart"] if i["name"] == matched_item["name"]), None)
            if existing:
                existing["qty"] += qty
            else:
                session["cart"].append({"name": matched_item["name"], "price": matched_item["price"], "qty": qty})

            session["stage"] = "awaiting_address"
            total = sum(i["price"] * i["qty"] for i in session["cart"])

            return {
                "response": (
                    f"✅ **Added to cart!**\n"
                    f"🍕 {matched_item['name']} x{qty} — ${matched_item['price']*qty:.2f}\n\n"
                    f"🛒 **Cart Total: ${total:.2f}**\n\n"
                    f"📍 **What's your delivery address?**\n"
                    f"_(e.g. House 5, Street 3, Gulshan-e-Iqbal, Karachi)_"
                ),
                "agent_type": "cart_agent",
                "metadata": {"cart": session["cart"]},
            }

        # User wants to order but didn't specify item
        if any(t in msg for t in ["order","i want","give me"]) and not matched_item:
            return {
                "response": (
                    "🍕 **What would you like to order?**\n\n"
                    "**Our Pizzas:**\n"
                    "• Spring Fling Pizza — $10\n• Korma Special — $12\n• Hot Passion Pizza — $16 🔥\n"
                    "• Farm Villa Pizza — $18\n• Vegetarian Pizza — $18\n• Paneer Tikka — $22\n• Mexican Combo — $22\n\n"
                    "**Also available:** Burgers, Chicken Wings, Drinks\n\n"
                    "Just tell me what you want! (e.g. *'I want a Hot Passion Pizza'*)"
                ),
                "agent_type": "shopping_agent",
            }

        return None

    async def process(self, message: str, session_id: str, history: List[Dict]) -> Dict:
        session = get_session(session_id)

        # ── 1. Guardrail: out-of-scope check ──
        if not is_on_topic(message):
            return {"response": OUT_OF_SCOPE_REPLY, "agent_type": "coordinator", "metadata": {}}

        # ── 2. Order flow (address / payment stages) ──
        flow_result = await self._handle_order_flow(message, session)
        if flow_result:
            return flow_result

        # ── 3. Add-to-cart detection ──
        cart_result = await self._detect_add_to_cart(message, session)
        if cart_result:
            return cart_result

        # ── 4. Normal routing to specialized agent ──
        agent_name = await self._route(message)
        agent = self.agents[agent_name]
        result = await agent.process(message=message, session_id=session_id, history=history)
        result["agent_type"] = agent_name

        if not result.get("response"):
            result["response"] = "🍕 How can I help you with your Pizzao order today?"

        return result
