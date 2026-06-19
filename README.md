# 🍕 Pizzao Q-Commerce Website

A professional, fully-animated pizza restaurant website with AI-powered multi-agent chatbot.

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS 4**
- **Framer Motion** — Parallax, card-flip, 3D, smooth scroll animations
- **TypeScript**

### Backend
- **FastAPI** — REST API
- **Multi-Agent System** — 7 specialized AI agents
- **OpenRouter API** — LLM integration (GPT-3.5-turbo)
- **Docker** — Containerized for Hugging Face Spaces

### Data
- **Sanity CMS** — Content & image management
- **Supabase** — User data & orders database

## 📄 Pages

| Page | Features |
|------|----------|
| **Home** | Full-screen hero, Popular Pizza, Exclusive Menu tabs, Testimonials |
| **About** | Parallax images, Card-flip specialities, 3D spinning tomato, Timeline |
| **Menu** | Rotating delivery badge, Category tabs, Menu items |
| **Chefs** | Masterchef rotating badge, Chef grid with hover reveal |
| **Franchise** | Steps timeline, Dual parallax images, Application form |
| **Contact** | Typewriter effect (Hello/Assalam Alikum), Animated form, Map |

## 🤖 AI Agents

- **Coordinator Agent** — Routes to specialized agents
- **Selling Agent** — Deals, promotions, upselling
- **Shopping Agent** — Menu browsing, search
- **Cart Agent** — Add/remove items, checkout
- **Delivery Agent** — Order tracking, ETA
- **Finance Agent** — Payments, invoices, refunds
- **Email Agent** — Confirmations, receipts
- **WhatsApp Agent** — SMS/WhatsApp notifications

## 🚀 Deployment

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Set Root Directory: `frontend`
3. Add environment variables from `.env.example`

### Backend → Hugging Face Spaces
1. Create Space with Docker SDK
2. Upload `backend/` folder contents
3. Add secrets: `OPENROUTER_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`

## 🎨 Animations (from client screenshots)

- ✅ Hero pizza parallax scroll
- ✅ Chef image moves DOWN, pizza moves UP on scroll
- ✅ Spinning tomato (3D, continuous rotation on scroll)
- ✅ Card-flip specialities on scroll
- ✅ `< >` navigation for journey timeline
- ✅ Two franchise images animate separately (up/down)
- ✅ Typewriter: "SAY Hello / Assalam Alikum / Hella / Shalve"
- ✅ All smooth scroll effects

## 📁 Project Structure

```
Q-commerce-App/
├── frontend/          # Next.js app
│   ├── app/
│   │   ├── page.tsx           # Home
│   │   ├── about/page.tsx     # About
│   │   ├── menu/page.tsx      # Menu
│   │   ├── chefs/page.tsx     # Chefs
│   │   ├── franchise/page.tsx # Franchise
│   │   ├── contact/page.tsx   # Contact
│   │   └── components/        # All components
│   └── package.json
├── backend/           # FastAPI
│   ├── main.py
│   ├── agents/        # 7 AI agents
│   ├── requirements.txt
│   └── Dockerfile
└── vercel.json
```
