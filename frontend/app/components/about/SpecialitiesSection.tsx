'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const ITEMS = [
  {front:'👩',   icon:'🍷', title:'FREE COLD DRINKS',    desc:'Complimentary cold drinks with every large pizza order.'},
  {front:'🍕',   icon:'🌿', title:'QUALITY FOODS',       desc:'Premium ingredients sourced from certified suppliers daily.'},
  {front:'👨‍🍳', icon:'👨‍🍳', title:'POPULAR MASTERCHEF', desc:'Our chefs trained at top culinary institutes worldwide.'},
  {front:'🥘',   icon:'🍽️', title:'DELICIOUS RECIPES',   desc:'Secret family recipes perfected over 16 years of excellence.'},
];

const STATS = [
  {num:'45+', label:'Workers'},
  {num:'58',  label:'Menu Items'},
  {num:'16',  label:'Years Exp.'},
  {num:'95+', label:'Chefs'},
];

function FlipCard({ item, index }: { item:typeof ITEMS[0]; index:number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <motion.div ref={ref} className="perspective h-56 cursor-pointer"
      initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
      transition={{delay:index*.12, duration:.6}}>
      <div className="flip-card w-full h-full">
        <div className="flip-inner">
          {/* Front */}
          <div className="flip-front bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-[90px] leading-none">{item.front}</span>
          </div>
          {/* Back */}
          <div className="flip-back bg-white rounded-xl border border-gray-100 card-shadow p-6 flex flex-col justify-center">
            <span className="text-3xl mb-3">{item.icon}</span>
            <h3 className="font-black text-xs uppercase tracking-wider mb-2">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpecialitiesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const tomY  = useTransform(scrollYProgress,[0,1],[-40,100]);
  const tomR  = useTransform(scrollYProgress,[0,1],[0,360]);
  const inView = useInView(ref, { once:true });

  return (
    <section ref={ref} className="py-24 bg-[#f7f7f7] relative overflow-hidden">
      {/* Delivery banner */}
      <motion.div className="bg-white border-y border-gray-100 py-5 mb-16"
        initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:.6}}>
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="text-2xl">🛵</span>
          <p className="text-sm font-semibold text-gray-700">
            GET FREE DELIVERY YOUR FOOD OF HAPPINESS IN{' '}
            <span className="text-[#c8102e] font-black">WITHIN 30 MINUTES.</span>
          </p>
        </div>
      </motion.div>

      {/* 3D spinning tomato */}
      <motion.div className="absolute left-4 top-40 pointer-events-none z-10" style={{y:tomY, rotate:tomR}}>
        <span className="text-6xl food-3d block">🍅</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12"
          initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.6}}>
          <p className="label-tag mb-3">HEART OF KITCHEN</p>
          <h2 className="text-4xl md:text-5xl font-black">OUR SPECIALITIES</h2>
          <div className="divider mt-4"/>
        </motion.div>

        {/* Flip cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {ITEMS.map((item,i) => <FlipCard key={item.title} item={item} index={i}/>)}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 border-t border-gray-200 pt-12">
          {STATS.map((s,i)=>(
            <motion.div key={s.label} className="text-center"
              initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:.3+i*.1, duration:.6}}>
              <div className="stat-num">{s.num}</div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
