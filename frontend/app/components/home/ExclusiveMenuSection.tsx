'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const categories = [
  { id: 'starters', label: 'Starters', icon: '🍜' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'burgers', label: 'Burgers', icon: '🍔' },
  { id: 'chicken', label: 'Chicken', icon: '🍗' },
  { id: 'drinks', label: 'Drinks', icon: '🍺' },
];

const menuItems = {
  starters: [
    { name: 'Spring Fling Pizza', desc: 'Lorem ipsum has been the industry.', price: '$10.00', badge: 'NEW', emoji: '🥗' },
    { name: 'Korma Special Pizza', desc: 'Lorem ipsum has been the industry.', price: '$12.00', emoji: '🍱' },
    { name: 'Farm Villa Pizza', desc: 'Lorem ipsum has been the industry.', price: '$18.00', emoji: '🌾' },
    { name: 'Hot Passion Pizza', desc: 'Lorem ipsum has been the industry.', price: '$16.00', badge: 'HOT', badgeColor: 'red', emoji: '🌶️' },
    { name: 'Vegetarian Superme Pizza', desc: 'Lorem ipsum has been the industry.', price: '$18.00', emoji: '🥦' },
    { name: 'Special Florentine Pizza', desc: 'Lorem ipsum has been the industry.', price: '$20.00', emoji: '🍃' },
    { name: 'Paneer Tikka Pizza', desc: 'Lorem ipsum has been the industry.', price: '$22.00', badge: 'HOT', badgeColor: 'red', emoji: '🧀' },
    { name: 'Mexican Combo Pizza', desc: 'Lorem ipsum has been the industry.', price: '$22.00', emoji: '🫔' },
  ],
  pizza: [
    { name: 'Margherita Classic', desc: 'Fresh tomato, mozzarella, basil.', price: '$14.00', emoji: '🍕' },
    { name: 'BBQ Chicken', desc: 'Smoky BBQ sauce, grilled chicken.', price: '$16.00', emoji: '🍕' },
    { name: 'Pepperoni Feast', desc: 'Double pepperoni, cheese blend.', price: '$15.00', badge: 'HOT', badgeColor: 'red', emoji: '🍕' },
    { name: 'Veggie Supreme', desc: 'Fresh garden vegetables.', price: '$13.00', emoji: '🍕' },
  ],
  burgers: [
    { name: 'Classic Beef Burger', desc: 'Juicy beef patty with fresh veggies.', price: '$12.00', emoji: '🍔' },
    { name: 'Crispy Chicken', desc: 'Crispy fried chicken fillet.', price: '$11.00', emoji: '🍔' },
  ],
  chicken: [
    { name: 'Grilled Chicken', desc: 'Herb-marinated grilled chicken.', price: '$14.00', emoji: '🍗' },
    { name: 'Chicken Wings', desc: 'Spicy buffalo wings.', price: '$10.00', badge: 'HOT', badgeColor: 'red', emoji: '🍗' },
  ],
  drinks: [
    { name: 'Fresh Lemonade', desc: 'Freshly squeezed lemons.', price: '$4.00', emoji: '🍋' },
    { name: 'Iced Coffee', desc: 'Cold brew with cream.', price: '$5.00', emoji: '☕' },
  ],
};

export default function ExclusiveMenuSection() {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const items = menuItems[activeCategory as keyof typeof menuItems] || [];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#c8102e] text-sm font-semibold uppercase tracking-widest"
          >
            DELICIOUS MEALS
          </motion.p>
          <span className="w-px h-8 bg-gray-200" />
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-gray-900 uppercase"
          >
            EXCLUSIVE MENU
          </motion.h2>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-8 mb-10 border-b border-gray-100 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center gap-2 pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeCategory === cat.id
                  ? 'border-[#c8102e] text-[#c8102e]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: '#fafafa' }}
                className="flex items-center gap-4 py-4 px-2 border-b border-gray-100 cursor-pointer transition-colors"
              >
                <div className="relative flex-shrink-0">
                  {item.badge && (
                    <span className={`absolute -top-1 -left-1 text-xs font-bold text-white px-1.5 py-0.5 rounded z-10 ${
                      item.badgeColor === 'red' ? 'bg-[#c8102e]' : 'bg-green-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                    {item.emoji}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.name}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                </div>
                <span className="font-bold text-gray-800 text-sm flex-shrink-0">
                  <sup className="text-xs">$</sup>{item.price.replace('$', '')}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
