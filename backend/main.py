from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import httpx
import json
import asyncio
from agents.coordinator import CoordinatorAgent

app = FastAPI(
    title="Pizzao Multi-Agent Backend",
    description="Q-Commerce AI Backend with Multi-Agent System",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

coordinator = CoordinatorAgent()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str
    agent_type: str
    session_id: str
    metadata: Optional[dict] = {}

@app.get("/")
async def root():
    return {
        "status": "🍕 Pizzao Multi-Agent Backend is Live!",
        "version": "1.0.0",
        "agents": [
            "coordinator", "selling_agent", "shopping_agent",
            "cart_agent", "delivery_agent", "finance_agent",
            "email_agent", "whatsapp_agent"
        ]
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "pizzao-backend"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        history = [{"role": m.role, "content": m.content} for m in (request.history or [])]
        result = await coordinator.process(
            message=request.message,
            session_id=request.session_id,
            history=history
        )
        return ChatResponse(
            response=result["response"],
            agent_type=result["agent_type"],
            session_id=request.session_id,
            metadata=result.get("metadata", {}),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/agents")
async def list_agents():
    return {
        "agents": {
            "coordinator": "Routes requests to appropriate specialized agents",
            "selling_agent": "Handles product recommendations and upselling",
            "shopping_agent": "Manages product browsing and search",
            "cart_agent": "Handles cart operations: add, remove, update",
            "delivery_agent": "Tracks orders and manages delivery",
            "finance_agent": "Handles payments, invoices, and finance",
            "email_agent": "Sends order confirmations and updates via email",
            "whatsapp_agent": "Sends WhatsApp notifications and updates",
        }
    }

@app.get("/menu")
async def get_menu():
    return {
        "categories": ["starters", "pizza", "burgers", "chicken", "drinks"],
        "items": [
            {"id": 1, "name": "Spring Fling Pizza", "price": 10.00, "category": "pizza", "badge": "NEW"},
            {"id": 2, "name": "Korma Special Pizza", "price": 12.00, "category": "pizza"},
            {"id": 3, "name": "Farm Villa Pizza", "price": 18.00, "category": "pizza"},
            {"id": 4, "name": "Hot Passion Pizza", "price": 16.00, "category": "pizza", "badge": "HOT"},
            {"id": 5, "name": "Vegetarian Superme Pizza", "price": 18.00, "category": "pizza"},
            {"id": 6, "name": "Special Florentine Pizza", "price": 20.00, "category": "pizza"},
            {"id": 7, "name": "Paneer Tikka Pizza", "price": 22.00, "category": "pizza", "badge": "HOT"},
            {"id": 8, "name": "Mexican Combo Pizza", "price": 22.00, "category": "pizza"},
        ]
    }
