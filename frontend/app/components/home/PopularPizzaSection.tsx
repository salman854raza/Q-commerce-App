'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pizzas = [
  { name:'Mexican Green Wave',    oldPrice:25, price:19, rating:5.0, stars:5, emoji:'🍕', tag:'BESTSELLER' },
  { name:'Indi Tandoori Paneer',  oldPrice:24, price:18, rating:4.9, stars:5, emoji:'🍕', tag:'POPULAR'    },
  { name:'Double Chicken Sausage',oldPrice:22, price:20, rating:5.0, stars:5, emoji:'🍕', tag:'NEW'        },
  { name:'Grilled Veal Cooked',   oldPrice:20, price:16, rating:4.3, stars:4, emoji:'🍕', tag:null         },
];

export default function PopularPizzaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div>
            <p className="label-tag mb-3">OUR SIGNATURE</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">POPULAR<br/>PIZZA</h2>
            <div className="divider mt-4" />
          </div>
          <Link href="/menu">
            <motion.button className="btn btn-outline rounded-sm flex items-center gap-2"
              whileHover={{scale:1.03}} whileTap={{scale:.97}}>
              View Full Menu <ArrowRight size={15}/>
            </motion.button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzas.map((p, i) => (
            <motion.div key={p.name}
              className="group relative bg-white rounded-2xl p-6 card-shadow card-hover cursor-pointer"
              initial={{opacity:0, y:40}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:i*0.1, duration:.6}}>

              {/* Tag */}
              {p.tag && (
                <span className="absolute top-4 left-4 text-[9px] font-black px-2 py-1 rounded-full bg-[#c8102e] text-white tracking-wider">
                  {p.tag}
                </span>
              )}

              {/* Cart button */}
              <motion.button
                className="absolute top-4 right-4 w-8 h-8 bg-[#c8102e] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                whileHover={{scale:1.2}} whileTap={{scale:.9}}>
                <ShoppingCart size={13}/>
              </motion.button>

              {/* Pizza image */}
              <motion.div className="relative w-32 h-32 mx-auto mb-5"
                whileHover={{rotate:[-5,5,-5,0], scale:1.1}} transition={{duration:.5}}>
                <div className="absolute inset-0 bg-[#c8102e]/8 rounded-full" />
                <span className="text-[90px] leading-none block text-center">{p.emoji}</span>
              </motion.div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-0.5 mb-2">
                {Array.from({length:5}).map((_,j)=>(
                  <Star key={j} size={11}
                    className={j < p.stars ? 'fill-[#d4a017] text-[#d4a017]' : 'fill-gray-200 text-gray-200'}/>
                ))}
                <span className="text-[11px] font-bold text-[#d4a017] ml-1">{p.rating}</span>
              </div>

              <h3 className="font-bold text-xs uppercase tracking-wide text-center leading-snug mb-2">{p.name}</h3>

              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-400 text-xs line-through">${p.oldPrice}</span>
                <span className="text-[#c8102e] font-black text-lg">${p.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore button */}
        <div className="text-center mt-16">
          <Link href="/menu">
            <motion.div
              className="inline-flex w-28 h-28 bg-[#111] text-white rounded-full flex-col items-center justify-center font-black text-xs uppercase tracking-wide leading-tight cursor-pointer"
              whileHover={{scale:1.08, rotate:5}} whileTap={{scale:.96}}>
              EXPLORE<br/>MENU
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
