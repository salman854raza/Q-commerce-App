'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const CATS = [
  {id:'pizza',    label:'PIZZA',    icon:'🍕'},
  {id:'burgers',  label:'BURGERS',  icon:'🍔'},
  {id:'chicken',  label:'CHICKEN',  icon:'🍗'},
  {id:'starters', label:'STARTERS', icon:'🥗'},
  {id:'drinks',   label:'DRINKS',   icon:'🍹'},
];

const ITEMS = [
  {name:'Spring Fling Pizza',      desc:'Fresh basil, mozzarella, cherry tomatoes',      price:10, badge:'NEW',  badgeType:'new',  cat:'pizza',    emoji:'🍕'},
  {name:'Korma Special Pizza',     desc:'Rich korma sauce, tender chicken, herbs',        price:12, badge:null,  badgeType:null,   cat:'pizza',    emoji:'🍕'},
  {name:'Farm Villa Pizza',        desc:'Garden vegetables, farm-fresh ingredients',      price:18, badge:null,  badgeType:null,   cat:'pizza',    emoji:'🍕'},
  {name:'Hot Passion Pizza',       desc:'Fiery jalapeños, spicy arrabbiata sauce',       price:16, badge:'HOT', badgeType:'hot',  cat:'pizza',    emoji:'🍕', note:'♡ CHEF LOVE'},
  {name:'Vegetarian Superme',      desc:'Premium veggies on crispy thin crust',          price:18, badge:'HOT', badgeType:'hot',  cat:'pizza',    emoji:'🍕'},
  {name:'Special Florentine',      desc:'Spinach, eggs, parmesan, béchamel sauce',       price:20, badge:null,  badgeType:null,   cat:'pizza',    emoji:'🍕', note:'♡ CHEF LOVE'},
  {name:'Paneer Tikka Pizza',      desc:'Spiced paneer, bell peppers, mint chutney',     price:22, badge:'HOT', badgeType:'hot',  cat:'pizza',    emoji:'🍕'},
  {name:'Mexican Combo Pizza',     desc:'Black beans, guacamole, jalapeños, salsa',      price:22, badge:null,  badgeType:null,   cat:'pizza',    emoji:'🍕'},
  {name:'Classic Beef Burger',     desc:'Angus beef, cheddar, lettuce, secret sauce',    price:14, badge:null,  badgeType:null,   cat:'burgers',  emoji:'🍔'},
  {name:'Chicken Deluxe Burger',   desc:'Crispy fried chicken, coleslaw, pickles',       price:12, badge:'NEW', badgeType:'new',  cat:'burgers',  emoji:'🍔'},
  {name:'BBQ Chicken Wings',       desc:'Slow-smoked, glazed in house BBQ sauce',        price:16, badge:'HOT', badgeType:'hot',  cat:'chicken',  emoji:'🍗'},
  {name:'Grilled Chicken Strips',  desc:'Herb-marinated, served with dipping sauce',     price:13, badge:null,  badgeType:null,   cat:'chicken',  emoji:'🍗'},
  {name:'Bruschetta',              desc:'Toasted ciabatta, fresh tomatoes, basil oil',   price:8,  badge:null,  badgeType:null,   cat:'starters', emoji:'🥗'},
  {name:'Mozzarella Sticks',       desc:'Golden fried, served with marinara sauce',      price:9,  badge:'NEW', badgeType:'new',  cat:'starters', emoji:'🧀'},
  {name:'Fresh Lemonade',          desc:'Freshly squeezed, hint of mint',                price:5,  badge:null,  badgeType:null,   cat:'drinks',   emoji:'🍋'},
  {name:'Italian Soda',            desc:'Sparkling water with fruit syrup',              price:4,  badge:null,  badgeType:null,   cat:'drinks',   emoji:'🥤'},
];

export default function ExclusiveMenuSection() {
  const [active, setActive] = useState('pizza');
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const filtered = ITEMS.filter(i => i.cat === active);

  return (
    <section ref={ref} id="exclusive-menu" className="py-24 bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div className="mb-12"
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <p className="label-tag mb-3">DELICIOUS MEALS</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-black">EXCLUSIVE MENU</h2>
            <p className="text-gray-500 text-sm max-w-xs">Fresh ingredients. Bold flavors. Made with passion.</p>
          </div>
          <div className="divider mt-4" />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-8 mb-10 border-b border-gray-200 overflow-x-auto pb-0">
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>setActive(c.id)}
              className={`menu-tab flex items-center gap-2 flex-shrink-0 ${active===c.id?'active':''}`}>
              <span className="text-xl">{c.icon}</span>{c.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="grid md:grid-cols-2 gap-0"
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
            transition={{duration:.3}}>
            {filtered.map((item, i) => (
              <motion.div key={item.name}
                className="flex items-center gap-4 py-4 border-b border-gray-200 px-4 group hover:bg-white transition-colors rounded-sm"
                initial={{opacity:0, x: i%2===0?-20:20}} animate={{opacity:1,x:0}}
                transition={{delay:i*0.06, duration:.35}}>

                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:bg-[#c8102e]/5 transition-colors">
                    <motion.span className="text-3xl" whileHover={{scale:1.2, rotate:10}}>
                      {item.emoji}
                    </motion.span>
                  </div>
                  {item.badge && (
                    <span className={`badge badge-${item.badgeType} absolute -top-1 -left-1`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm uppercase tracking-wide leading-tight">{item.name}</h3>
                    {item.note && (
                      <span className="badge badge-chef">{item.note}</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{item.desc}</p>
                </div>

                {/* Price + cart */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-black text-sm text-[#111]">
                    <sup className="text-[10px]">$</sup>{item.price}<sup className="text-[10px]">.00</sup>
                  </span>
                  <motion.button
                    className="w-8 h-8 bg-[#c8102e] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow"
                    whileHover={{scale:1.15}} whileTap={{scale:.9}}>
                    <ShoppingCart size={12}/>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
