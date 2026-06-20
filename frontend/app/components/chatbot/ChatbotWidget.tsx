'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Bot, User, ShoppingCart,
  Pizza, Truck, CreditCard, Mail, Phone, Sparkles,
  ChevronDown, RotateCcw, Mic
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: string;
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  message: string;
  color: string;
}

const quickActions: QuickAction[] = [
  { label: 'Order Pizza', icon: <Pizza size={14} />, message: 'I want to order a pizza', color: '#c8102e' },
  { label: 'Track Order', icon: <Truck size={14} />, message: 'Track my delivery order', color: '#d4a017' },
  { label: 'View Menu', icon: <ShoppingCart size={14} />, message: 'Show me your menu', color: '#1a1a1a' },
  { label: 'Special Offers', icon: <Sparkles size={14} />, message: 'What are today\'s special offers?', color: '#c8102e' },
];

const agentColors: Record<string, string> = {
  selling_agent: '#c8102e',
  shopping_agent: '#d4a017',
  cart_agent: '#2563eb',
  delivery_agent: '#16a34a',
  finance_agent: '#7c3aed',
  email_agent: '#0891b2',
  whatsapp_agent: '#25d366',
  coordinator: '#1a1a1a',
};

const agentLabels: Record<string, string> = {
  selling_agent: '🛒 Sales Agent',
  shopping_agent: '🛍️ Shopping Agent',
  cart_agent: '🛒 Cart Agent',
  delivery_agent: '🚚 Delivery Agent',
  finance_agent: '💳 Finance Agent',
  email_agent: '📧 Email Agent',
  whatsapp_agent: '💬 WhatsApp Agent',
  coordinator: '🤖 AI Coordinator',
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://salman854raza-pizza-chat-bot.hf.space';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '🍕 Welcome to **Pizzao AI**! I\'m your intelligent food assistant powered by multiple specialized agents.\n\nI can help you:\n• Order delicious pizzas 🍕\n• Track your delivery 🚚\n• Find the best deals 💰\n• Answer any questions about our menu\n\nHow can I help you today?',
      timestamp: new Date(),
      agentType: 'coordinator',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('coordinator');
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId,
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || data.message || 'I understand your request. Let me help you with that!',
          timestamp: new Date(),
          agentType: data.agent_type || 'coordinator',
        };
        setActiveAgent(data.agent_type || 'coordinator');
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('API error');
      }
    } catch {
      // Fallback response when backend not available
      const fallbackResponses: Record<string, { response: string; agent: string }> = {
        order: { response: '🍕 I\'d love to help you order! Our most popular pizzas are:\n\n• **Margherita** - $12.00\n• **Pepperoni Supreme** - $16.00\n• **BBQ Chicken** - $18.00\n\nWhich one would you like to add to your cart? 🛒', agent: 'selling_agent' },
        menu: { response: '📋 Here\'s a quick overview of our menu categories:\n\n🍕 **Pizzas** - Starting from $10\n🍔 **Burgers** - Starting from $8\n🥗 **Starters** - Starting from $6\n🍗 **Chicken** - Starting from $12\n🍺 **Drinks** - Starting from $3\n\nVisit our [Menu page](/menu) for full details!', agent: 'shopping_agent' },
        track: { response: '🚚 **Order Tracking**\n\nTo track your order, I\'ll need your:\n• Order ID (e.g., #PZO-2024-001)\n• Phone number used for the order\n\nAlternatively, you should have received a tracking link via SMS/email. Check your inbox! 📱', agent: 'delivery_agent' },
        offer: { response: '🎉 **Today\'s Special Offers:**\n\n🔥 **Buy 1 Get 1 Free** on all large pizzas!\n⚡ **Free Delivery** on orders above $30\n🌟 **15% OFF** for first-time orders - Use code: **PIZZA15**\n\nOffer valid until midnight! 🕛', agent: 'selling_agent' },
        default: { response: '🤖 I\'m your Pizzao AI Assistant! I can help you with:\n\n• **Ordering** delicious pizzas 🍕\n• **Tracking** your delivery 🚚\n• **Finding** the best deals 💰\n• **Answering** questions about our menu\n\nOur backend AI system is currently warming up. Please try again in a moment, or ask me anything! 😊', agent: 'coordinator' },
      };

      const lower = messageText.toLowerCase();
      let fallback = fallbackResponses.default;
      if (lower.includes('order') || lower.includes('pizza') || lower.includes('buy')) fallback = fallbackResponses.order;
      else if (lower.includes('menu') || lower.includes('food') || lower.includes('price')) fallback = fallbackResponses.menu;
      else if (lower.includes('track') || lower.includes('delivery') || lower.includes('where')) fallback = fallbackResponses.track;
      else if (lower.includes('offer') || lower.includes('deal') || lower.includes('discount')) fallback = fallbackResponses.offer;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallback.response,
        timestamp: new Date(),
        agentType: fallback.agent,
      }]);
      setActiveAgent(fallback.agent);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: '🍕 Chat cleared! How can I help you today?',
      timestamp: new Date(),
      agentType: 'coordinator',
    }]);
  };

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c8102e] underline hover:no-underline">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#c8102e] text-white rounded-full shadow-2xl flex items-center justify-center animate-pulse-glow"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Notification dot */}
        {!open && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4a017] rounded-full text-[9px] font-bold flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AI
          </motion.span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col"
            style={{ height: '580px' }}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#c8102e] to-[#a00d24] p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">Pizzao AI Assistant</h3>
                <p className="text-white/70 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  {agentLabels[activeAgent] || '🤖 AI Coordinator'} • Online
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="text-white/70 hover:text-white transition-colors" title="Clear chat">
                  <RotateCcw size={16} />
                </button>
                <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Agent pills */}
            <div className="bg-gray-50 px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {Object.entries(agentLabels).slice(0, 4).map(([key, label]) => (
                <span
                  key={key}
                  className={`flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full border transition-all ${
                    activeAgent === key
                      ? 'bg-[#c8102e] text-white border-[#c8102e]'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {label.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      msg.role === 'user' ? 'bg-[#1a1a1a]' : 'bg-[#c8102e]'
                    }`}
                    style={msg.agentType ? { background: agentColors[msg.agentType] || '#c8102e' } : {}}
                  >
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {/* Agent label */}
                    {msg.role === 'assistant' && msg.agentType && (
                      <span className="text-[10px] font-semibold text-gray-400 px-2">
                        {agentLabels[msg.agentType] || 'AI'}
                      </span>
                    )}
                    {/* Bubble */}
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'chat-message-user'
                          : 'chat-message-bot'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    <span className="text-[10px] text-gray-400 px-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#c8102e] flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="chat-message-bot px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    className="flex items-center gap-2 text-xs font-semibold border border-gray-200 rounded-xl px-3 py-2 hover:border-[#c8102e] hover:text-[#c8102e] transition-all text-gray-600 bg-white"
                    onClick={() => sendMessage(action.message)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span style={{ color: action.color }}>{action.icon}</span>
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-[#c8102e] transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything about Pizzao..."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                  disabled={loading}
                />
                <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Voice input">
                  <Mic size={16} />
                </button>
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 bg-[#c8102e] rounded-lg flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={13} />
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Powered by Pizzao Multi-Agent AI System 🤖
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
