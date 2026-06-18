# 🍕 Pizzao - Q-Commerce Pizza App

A **full-stack Q-Commerce restaurant website** built with Next.js 14, Tailwind CSS, Framer Motion, FastAPI, and a Multi-Agent AI System.

---

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations & 3D effects
- **TypeScript** - Type safety
- **Sanity CMS** - Content management & images

### Backend
- **FastAPI** - REST API
- **OpenAI Agents SDK** - Multi-agent system
- **OpenRouter API** - Free LLM access
- **Supabase** - Database & user management

### Deployment
- **Vercel** - Frontend hosting
- **Hugging Face Spaces** - Backend API hosting
- **GitHub** - Version control

---

## 🤖 Multi-Agent AI System

The chatbot is powered by a **coordinated multi-agent system**:

| Agent | Responsibility |
|-------|---------------|
| 🛒 **Shopping Agent** | Browse menu, find items, recommendations |
| 💰 **Selling Agent** | Promotions, deals, upselling |
| 💳 **Finance Agent** | Pricing, payments, invoices |
| 🛍️ **Cart Agent** | Add/remove items, cart management |
| 🚚 **Delivery Agent** | Order tracking, delivery ETA |
| 📧 **Email Agent** | Order confirmations, receipts |
| 📱 **WhatsApp Agent** | WhatsApp notifications |
| 🎯 **Coordinator Agent** | Orchestrates all agents |

---

## 📄 Pages

| Page | Description |
|------|-------------|
| 🏠 **Home** | Hero section, popular pizzas, menu preview |
| ℹ️ **About** | Restaurant story, specialities, timeline |
| 🍕 **Menu** | Full menu with categories & filters |
| 👨‍🍳 **Chefs** | Meet our master chefs |
| 🏢 **Franchise** | Business opportunities |
| 📞 **Contact** | Contact form with typewriter effect |

---

## ✨ Key Animations & Features

- **Parallax Scroll** - Food images float on scroll
- **3D Card Flips** - Speciality cards flip on scroll
- **Spinning 3D Vegetables** - Continuous rotation animations
- **Typewriter Effect** - Contact form "SAY Hello / Assalam Alikum..."
- **Smooth Parallax** - Chef & pizza images move independently
- **Timeline Slider** - Journey section with < > navigation
- **AI Chatbot** - Floating chat UI connected to multi-agent backend
- **Counter Animations** - Stats count up on scroll

---

## 🛠️ Setup & Installation

### Prerequisites
```bash
node >= 18.0.0
python >= 3.10
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

### Environment Variables

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=your_huggingface_api_url
```

#### Backend (`.env`)
```env
OPENROUTER_API_KEY=your_openrouter_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

---

## 📁 Project Structure

```
Q-commerce-App/
├── frontend/                 # Next.js 14 App
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── about/
│   │   │   ├── menu/
│   │   │   ├── chefs/
│   │   │   ├── franchise/
│   │   │   └── contact/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── home/         # Hero, PopularPizza, etc.
│   │   │   ├── about/        # About sections
│   │   │   ├── chatbot/      # AI Chatbot UI
│   │   │   └── ui/           # Reusable components
│   │   ├── lib/              # Utilities, Sanity client
│   │   └── styles/
│   ├── sanity/               # Sanity schema & config
│   └── public/
├── backend/                  # FastAPI + Multi-Agent System
│   ├── agents/
│   │   ├── coordinator.py
│   │   ├── shopping_agent.py
│   │   ├── selling_agent.py
│   │   ├── finance_agent.py
│   │   ├── cart_agent.py
│   │   ├── delivery_agent.py
│   │   ├── email_agent.py
│   │   └── whatsapp_agent.py
│   ├── main.py               # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile            # For Hugging Face deployment
└── README.md
```

---

## 🚀 Deployment

### Frontend → Vercel
```bash
vercel --prod
```

### Backend → Hugging Face Spaces
```bash
# Docker-based deployment
# Push to HF Space repository
```

---

## 📸 Screenshots

See `/screenshots` folder for design references and animation specifications.

---

## 📝 License

MIT License - Built with ❤️ by Salman Raza

---

## 🔗 Live Links

- **Frontend**: [Coming Soon - Vercel]
- **Backend API**: [Coming Soon - Hugging Face]
- **GitHub**: https://github.com/salman854raza/Q-commerce-App
