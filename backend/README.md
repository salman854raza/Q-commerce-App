---
title: Pizzao Backend
emoji: 🍕
colorFrom: red
colorTo: yellow
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# 🍕 Pizzao Q-Commerce Multi-Agent Backend

FastAPI backend with 7 specialized AI agents for the Pizzao pizza restaurant Q-commerce platform.

## 🤖 Agent System

| Agent | Responsibility |
|-------|---------------|
| **Coordinator** | Routes requests to the right agent |
| **Selling Agent** | Deals, promotions, upselling |
| **Shopping Agent** | Menu browsing, product search |
| **Cart Agent** | Add/remove items, checkout |
| **Delivery Agent** | Order tracking, ETA |
| **Finance Agent** | Payments, invoices, refunds |
| **Email Agent** | Confirmations, receipts |
| **WhatsApp Agent** | SMS/WhatsApp notifications |

## 🚀 API Endpoints

- `GET /` — Health check + agent list
- `GET /health` — Health status
- `POST /chat` — Main chat endpoint (routes to agents)
- `GET /menu` — Full menu data
- `GET /agents` — List all agents

## ⚙️ Environment Variables (Secrets)

Set these in Space Settings → Secrets:
- `OPENROUTER_API_KEY` — Your OpenRouter API key (free at openrouter.ai)
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_KEY` — Supabase anon key

## 📡 Usage

```bash
curl -X POST https://salman854raza-pizza-chat-bot.hf.space/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me your menu", "session_id": "user123"}'
```
