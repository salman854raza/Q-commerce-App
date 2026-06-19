'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categories = [
  { id: 'starters', label: 'STARTERS', icon: '🥣' },
  { id: 'pizza', label: 'PIZZA', icon: '🍕' },
  { id: 'burgers', label: 'BURGERS', icon: '🍔' },
  { id: 'chicken', label: 'CHICKEN', icon: '🍗' },
  { id: 'drinks', label: 'DRINKS', icon: '🍺' },
];

const menuItems = [
  { name: 'Spring Fling Pizza', desc: 'Lorem ipsum has been the industry.', price: 10, badge: 'NEW', badgeColor: '#16a34a', cat: 'pizza', emoji: '🍕' },
  { name: 'Korma Special Pizza', desc: 'Lorem ipsum has been the industry.', price: 12, cat: 'pizza', emoji: '🍕' },
  { name: 'Farm Villa Pizza', desc: 'Lorem ipsum has been the industry.', price: 18, cat: 'pizza', emoji: '🍕' },
  { name: 'Hot Passion Pizza', desc: 'Lorem ipsum has been the industry.', price: 16, badge: 'HOT', badgeColor: '#c8102e', cat: 'pizza', emoji: '🍕', note: '♡ CHEF LOVE' },
  { name: 'Vegetarian Superme Pizza', desc: 'Lorem ipsum has been the industry.', price: 18, badge: 'HOT', badgeColor: '#c8102e', cat: 'pizza', emoji: '🍕' },
  { name: 'Special Florentine Pizza', desc: 'Lorem ipsum has been the industry.', price: 20, cat: 'pizza', emoji: '🍕', note: '♡ CHEF LOVE' },
  { name: 'Paneer Tikka Pizza', desc: 'Lorem ipsum has been the industry.', price: 22, badge: 'HOT', badgeColor: '#c8102e', cat: 'pizza', emoji: '🍕' },
  { name: 'Mexican Combo Pizza', desc: 'Lorem ipsum has been the industry.', price: 22, cat: 'pizza', emoji: '🍕' },
  { name: 'Classic Beef Burger', desc: 'Juicy beef patty with fresh veggies.', price: 14, cat: 'burgers', emoji: '🍔' },
  { name: 'Chicken Deluxe Burger', desc: 'Crispy fried chicken with special sauce.', price: 12, cat: 'burgers', emoji: '🍔' },
  { name: 'BBQ Chicken Wings', desc: 'Slow-cooked smoky BBQ wings.', price: 16, cat: 'chicken', emoji: '🍗' },
  { name: 'Fresh Lemonade', desc: 'Freshly squeezed lemon juice.', price: 5, cat: 'drinks', emoji: '🍋' },
];

export default function ExclusiveMenuSection() {
  const [activeTab, setActiveTab] = useState('pizza');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const filtered = menuItems.filter(i => i.cat === activeTab);

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">DELICIOUS MEALS</span>
          <div className="w-px h-8 bg-gray-300" />
          <h2 className="text-4xl md:text-5xl font-black">EXCLUSIVE MENU</h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-8 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center gap-2 flex-shrink-0 pb-3 border-b-2 transition-all ${activeTab === cat.id ? 'border-[#c8102e] text-[#1a1a1a]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-bold tracking-widest">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu items */}
        <motion.div className="grid md:grid-cols-2 gap-0" layout>
          {filtered.map((item, i) => (
            <motion.div key={item.name}
              className="flex items-center gap-4 py-4 border-b border-gray-200 hover:bg-white transition-colors px-3 group"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              layout>
              {/* Food image */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -left-1 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: item.badgeColor }}>
                    {item.badge}
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm uppercase tracking-wide">{item.name}</h3>
                  {item.note && <span className="text-[10px] text-gray-500 border border-gray-300 px-1.5 py-0.5 rounded-full">{item.note}</span>}
                </div>
                <p className="text-gray-500 text-xs mt-0.5 truncate">{item.desc}</p>
              </div>
              {/* Price */}
              <div className="flex-shrink-0">
                <span className="font-black text-sm"><sup className="text-xs">$</sup>{item.price}<sup>.00</sup></span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
