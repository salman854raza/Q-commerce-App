'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const features = [
  {icon:'🍎', title:'Always Fresh Ingredients',   desc:'Perfectly portioned, sourced daily from local farms.'},
  {icon:'👍', title:'Uncompromising Quality',      desc:'Standardized recipes ensuring every bite is perfect.'},
  {icon:'👨‍🍳', title:'World-Class Masterchefs',   desc:'Our chefs trained in Italy & around the world.'},
  {icon:'🎵', title:'Best Dining Ambience',        desc:'Live music, beautiful interiors, serene atmosphere.'},
  {icon:'🍕', title:'Signature Pizza Recipes',     desc:'Secret crust recipe perfected over 16 years.'},
  {icon:'🚀', title:'Wonderful Dining Experience', desc:'Every visit is a memorable culinary journey.'},
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div className="mb-14"
          initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <p className="label-tag mb-3">WHY CHOOSE US?</p>
          <div className="flex items-end gap-6 flex-wrap">
            <h2 className="text-4xl md:text-5xl font-black">WE ARE KNOWN</h2>
            <span className="text-[60px] font-black text-gray-100 leading-none select-none">FOR</span>
          </div>
          <div className="divider mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 mb-16">
          {features.map((f,i)=>(
            <motion.div key={f.title}
              className="flex items-start gap-5 py-5 border-b border-gray-100 group"
              initial={{opacity:0, x:i%2===0?-30:30}}
              animate={inView?{opacity:1,x:0}:{}}
              transition={{delay:i*0.1, duration:.55}}>
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#c8102e]/8 transition-colors">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wide mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Offer banners */}
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {tag:'MOST POPULAR', title:'SPECIAL\nDELICIOUS', sub:'Free Drinks with every order over $25', cta:'Order Now', emoji:'🍕', badge:'FREE\nDRINKS', bg:'#111'},
            {tag:'ORDER $50+',   title:'FASTEST\nDELIVERY',  sub:'Guaranteed delivery in 30 minutes or free', cta:'Order Now', emoji:'🛵', badge:null, bg:'#c8102e'},
          ].map((b,i)=>(
            <motion.div key={b.title}
              className="relative overflow-hidden rounded-2xl p-8 flex items-center justify-between"
              style={{ background:b.bg }}
              initial={{opacity:0, y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:.5+i*.15}}
              whileHover={{scale:1.02}} whileTap={{scale:.99}}>

              <div className="relative z-10">
                <p className="text-[#d4a017] text-[10px] font-black uppercase tracking-widest mb-2">{b.tag}</p>
                <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2" style={{whiteSpace:'pre-line'}}>{b.title}</h3>
                <p className="text-white/60 text-xs mb-5 max-w-[180px]">{b.sub}</p>
                <Link href="/menu">
                  <button className="btn btn-red text-xs py-2.5 px-5 rounded-sm" style={i===1?{background:'#fff',color:'#c8102e'}:{}}>
                    {b.cta}
                  </button>
                </Link>
              </div>

              <div className="relative flex-shrink-0">
                <motion.span className="text-7xl block leading-none"
                  animate={{y:[0,-10,0]}} transition={{duration:3, repeat:Infinity, ease:'easeInOut'}}>
                  {b.emoji}
                </motion.span>
                {b.badge && (
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#d4a017] rounded-full flex items-center justify-center text-white text-[10px] font-black text-center leading-tight shadow-xl">
                    {b.badge}
                  </div>
                )}
              </div>

              {/* BG decoration */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-10" style={{background:'#fff'}}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
