'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, RotateCcw, ChevronDown, ShoppingCart, Truck, Utensils, Tag } from 'lucide-react';

interface Msg { id:string; role:'user'|'assistant'; content:string; ts:Date; agent?:string; }

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://salman854raza-pizza-chat-bot.hf.space';

const AGENT_META: Record<string,{label:string;color:string;emoji:string}> = {
  selling_agent:  { label:'Sales Agent',    color:'#c8102e', emoji:'🛒' },
  shopping_agent: { label:'Menu Agent',     color:'#d4a017', emoji:'📋' },
  cart_agent:     { label:'Cart Agent',     color:'#2563eb', emoji:'🛒' },
  delivery_agent: { label:'Delivery Agent', color:'#16a34a', emoji:'🚚' },
  finance_agent:  { label:'Payment Agent',  color:'#7c3aed', emoji:'💳' },
  email_agent:    { label:'Email Agent',    color:'#0891b2', emoji:'📧' },
  whatsapp_agent: { label:'WhatsApp Agent', color:'#25d366', emoji:'💬' },
  coordinator:    { label:'AI Assistant',   color:'#c8102e', emoji:'🤖' },
};

const QUICK: {label:string;msg:string;icon:React.ReactNode}[] = [
  { label:'View Menu',     msg:'Show me your full menu',          icon:<Utensils size={13}/> },
  { label:'Order Pizza',   msg:'I want to order a pizza',         icon:<ShoppingCart size={13}/> },
  { label:'Track Order',   msg:'Track my order',                  icon:<Truck size={13}/> },
  { label:"Today's Deals", msg:"What are today's special deals?", icon:<Tag size={13}/> },
];

function parseMarkdown(text:string) {
  return text
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/`([^`]+)`/g,'<code class="bg-black/10 px-1 rounded text-xs">$1</code>')
    .replace(/\n/g,'<br/>');
}

export default function ChatbotWidget() {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<Msg[]>([{
    id:'0', role:'assistant', ts:new Date(), agent:'coordinator',
    content:'👋 Welcome to **Pizzao**! I\'m your AI food assistant.\n\nI can help you:\n• 🍕 **Order food** — tell me what you want!\n• 📋 **Browse our menu**\n• 🚚 **Track your delivery**\n• 💰 **Check deals & offers**\n\nWhat would you like today?',
  }]);
  const [input, setInput]   = useState('');
  const [loading, setLoad]  = useState(false);
  const [agent, setAgent]   = useState('coordinator');
  const [sid]               = useState(()=>`s_${Date.now()}`);
  const endRef              = useRef<HTMLDivElement>(null);
  const inputRef            = useRef<HTMLInputElement>(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:'smooth' }); },[msgs]);
  useEffect(()=>{ if(open) setTimeout(()=>inputRef.current?.focus(),150); },[open]);

  const send = useCallback(async (text?: string) => {
    const txt = (text || input).trim();
    if (!txt || loading) return;
    setInput('');
    const userMsg: Msg = { id:Date.now().toString(), role:'user', content:txt, ts:new Date() };
    setMsgs(p=>[...p,userMsg]);
    setLoad(true);
    try {
      const res = await fetch(`${BACKEND}/chat`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          message: txt,
          session_id: sid,
          history: msgs.slice(-6).map(m=>({role:m.role,content:m.content})),
        }),
      });
      if (res.ok) {
        const d = await res.json();
        setAgent(d.agent_type || 'coordinator');
        setMsgs(p=>[...p,{ id:(Date.now()+1).toString(), role:'assistant', content:d.response, ts:new Date(), agent:d.agent_type }]);
      } else throw new Error('api');
    } catch {
      // Smart fallback by keyword
      const low = txt.toLowerCase();
      let resp = '🍕 I\'m here to help with your Pizzao order! Try asking about our menu, placing an order, or tracking a delivery.';
      let ag = 'coordinator';
      if (low.includes('menu') || low.includes('show') || low.includes('what')) {
        resp = '📋 **Our Menu Highlights:**\n\n🍕 Spring Fling Pizza — $10 ⭐NEW\n🍕 Korma Special — $12\n🍕 Hot Passion Pizza — $16 🔥\n🍕 Farm Villa Pizza — $18\n🍕 Paneer Tikka — $22\n🍔 Classic Beef Burger — $14\n🍗 BBQ Wings — $16\n\nJust say *"I want a [item name]"* to order!'; ag='shopping_agent';
      } else if (low.includes('order') || low.includes('want') || low.includes('pizza')) {
        resp = '🍕 **What would you like to order?**\n\nOur bestsellers:\n• Hot Passion Pizza — $16 🔥\n• Paneer Tikka Pizza — $22\n• Korma Special Pizza — $12\n\nJust say *"I want a Hot Passion Pizza"* and I\'ll add it to your cart!'; ag='selling_agent';
      } else if (low.includes('deal') || low.includes('offer') || low.includes('discount')) {
        resp = '🎉 **Today\'s Deals:**\n\n🔥 Buy 1 Get 1 Free on Large Pizzas!\n⚡ Free delivery on orders over $30\n🌟 First order: 15% OFF — use code **PIZZA15**\n\nValid today only! Want to order? 😊'; ag='selling_agent';
      } else if (low.includes('track') || low.includes('delivery') || low.includes('where')) {
        resp = '🚚 To track your order, please share your **Order ID** (format: PZO-XXXXXX).\n\nYou received it in your order confirmation message.'; ag='delivery_agent';
      }
      setAgent(ag);
      setMsgs(p=>[...p,{ id:(Date.now()+1).toString(), role:'assistant', content:resp, ts:new Date(), agent:ag }]);
    } finally { setLoad(false); }
  }, [input, loading, msgs, sid]);

  const reset = () => setMsgs([{
    id:'0', role:'assistant', ts:new Date(), agent:'coordinator',
    content:'Chat cleared! 🍕 How can I help you today?',
  }]);

  const agMeta = AGENT_META[agent] || AGENT_META.coordinator;

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={()=>setOpen(o=>!o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#c8102e] text-white rounded-full shadow-2xl flex items-center justify-center anim-pulse"
        whileHover={{ scale:1.1 }} whileTap={{ scale:.9 }} aria-label="Chat with Pizzao AI">
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"   initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.18}}><X size={22}/></motion.div>
            : <motion.div key="msg" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.18}}><MessageCircle size={22}/></motion.div>
          }
        </AnimatePresence>
        {!open && (
          <motion.span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4a017] rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white"
            animate={{scale:[1,1.25,1]}} transition={{duration:2,repeat:Infinity}}>AI</motion.span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,.22)] overflow-hidden flex flex-col"
            style={{ height:580 }}
            initial={{opacity:0,scale:.85,y:24}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.85,y:24}}
            transition={{type:'spring',damping:24,stiffness:300}}>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#c8102e] to-[#a00d24] p-4 flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">{agMeta.emoji}</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm">Pizzao AI Assistant</h3>
                <p className="text-white/70 text-xs flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                  {agMeta.emoji} {agMeta.label} • Online
                </p>
              </div>
              <button onClick={reset} className="text-white/60 hover:text-white transition-colors p-1" title="Clear"><RotateCcw size={15}/></button>
              <button onClick={()=>setOpen(false)} className="text-white/60 hover:text-white transition-colors p-1"><ChevronDown size={18}/></button>
            </div>

            {/* Agent status bar */}
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex items-center gap-2 overflow-x-auto flex-shrink-0">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex-shrink-0">Active:</span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0"
                style={{ background:`${agMeta.color}15`, borderColor:`${agMeta.color}30`, color:agMeta.color }}>
                {agMeta.emoji} {agMeta.label}
              </span>
              <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">🔒 Pizza topics only</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {msgs.map(m => (
                <motion.div key={m.id} className={`flex gap-2.5 ${m.role==='user'?'flex-row-reverse':''}`}
                  initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.25}}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs`}
                    style={{ background: m.role==='user'?'#111':(AGENT_META[m.agent||'coordinator']?.color||'#c8102e') }}>
                    {m.role==='user'?<User size={13}/>:<Bot size={13}/>}
                  </div>
                  <div className={`max-w-[78%] flex flex-col gap-1 ${m.role==='user'?'items-end':''}`}>
                    {m.role==='assistant' && m.agent && m.agent!=='coordinator' && (
                      <span className="text-[10px] text-gray-400 px-1">{AGENT_META[m.agent]?.emoji} {AGENT_META[m.agent]?.label}</span>
                    )}
                    <div className={`px-3.5 py-2.5 text-sm leading-relaxed ${m.role==='user'?'chat-user':'chat-bot'}`}
                      dangerouslySetInnerHTML={{ __html:parseMarkdown(m.content) }} />
                    <span className="text-[10px] text-gray-400 px-1">
                      {m.ts.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing */}
              {loading && (
                <motion.div className="flex gap-2.5" initial={{opacity:0}} animate={{opacity:1}}>
                  <div className="w-7 h-7 rounded-full bg-[#c8102e] flex items-center justify-center"><Bot size={13} className="text-white"/></div>
                  <div className="chat-bot px-3.5 py-2.5 flex items-center gap-1">
                    {[0,1,2].map(i=>(
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-gray-400"
                        animate={{y:[0,-6,0]}} transition={{duration:.5,delay:i*.12,repeat:Infinity}}/>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={endRef}/>
            </div>

            {/* Quick actions - only show at start */}
            {msgs.length <= 2 && (
              <div className="px-4 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
                {QUICK.map(q=>(
                  <motion.button key={q.label} onClick={()=>send(q.msg)}
                    className="flex items-center gap-2 text-[11px] font-semibold border border-gray-200 rounded-xl px-3 py-2.5 hover:border-[#c8102e] hover:text-[#c8102e] transition-all text-gray-600 bg-white text-left"
                    whileHover={{scale:1.02}} whileTap={{scale:.97}}>
                    <span className="text-[#c8102e]">{q.icon}</span>{q.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3.5 py-2 border border-gray-200 focus-within:border-[#c8102e] transition-colors">
                <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
                  placeholder="Ask about our menu, deals, orders..." disabled={loading}
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400" />
                <motion.button onClick={()=>send()} disabled={!input.trim()||loading}
                  className="w-8 h-8 bg-[#c8102e] rounded-lg flex items-center justify-center text-white disabled:opacity-40"
                  whileHover={{scale:1.1}} whileTap={{scale:.9}}>
                  <Send size={13}/>
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                🤖 Powered by Pizzao Multi-Agent AI • Pizza topics only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
