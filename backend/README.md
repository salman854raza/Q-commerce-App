---
title: Pizzao Backend
emoji: 🍕
colorFrom: red
colorTo: yellow
sdk: docker
pinned: false
license: mit
---

# Pizzao Q-Commerce Multi-Agent Backend

FastAPI backend with multi-agent AI system for Pizzao pizza restaurant.

## Agents
- **Coordinator Agent** - Routes requests to specialized agents
- **Selling Agent** - Promotions & recommendations
- **Shopping Agent** - Menu browsing
- **Cart Agent** - Cart management
- **Delivery Agent** - Order tracking
- **Finance Agent** - Payments & billing
- **Email Agent** - Email notifications

## Environment Variables
Set in Hugging Face Space secrets:
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase anon key

## API Endpoints
- `GET /` - Health check
- `POST /chat` - Main chat endpoint
- `GET /menu` - Menu data
- `GET /agents` - List all agents
