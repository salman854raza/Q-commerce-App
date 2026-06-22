'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const REVIEWS = [
  {name:'Larry Wightman', rating:5, text:'Talking about this branch — the staff, quality of food & most importantly the speed of service is just great! Highly recommended. Must try take away services.',    avatar:'👨',    loc:'New York'},
  {name:'Mamma Garcia',   rating:5, text:'Excellent, delicious and tasty pizza. Staff is highly attentive, excellent place to have pizza. They also have home delivery and away services. Will visit again!', avatar:'👩',    loc:'London'},
  {name:'William Smith',  rating:5, text:'Tasty pizza, staff is very attentive. An excellent place to have pizza. They also have home delivery and away services. Best pizza I have ever had in my life.',    avatar:'👨‍🦱', loc:'Sydney'},
  {name:'Matthew Taylor', rating:5, text:'Talking about this branch — the staff, quality of food, most importantly the speed of service is just great! Highly recommended restaurant. Must try.',              avatar:'🧔',    loc:'Dubai'},
];

export default function TestimonialsSection() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true });
  const prev = () => setCur(c=>(c-1+REVIEWS.length)%REVIEWS.length);
  const next = () => setCur(c=>(c+1)%REVIEWS.length);

  return (
    <section ref={ref} className="py-24 bg-[#f7f7f7] relative overflow-hidden">
      {/* BG watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[180px] font-black text-gray-200/60 select-none leading-none tracking-tighter">SATISFIED</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">

          {/* Left */}
          <motion.div initial={{opacity:0,x:-40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.7}}>
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-[#c8102e] fill-[#c8102e]"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#c8102e]">FOOD LOVERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              SATISFIED<br/>CUSTOMERS
            </h2>
            <div className="flex gap-3">
              <motion.button onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all"
                whileHover={{scale:1.1}} whileTap={{scale:.9}}>
                <ChevronLeft size={18}/>
              </motion.button>
              <motion.button onClick={next}
                className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all"
                whileHover={{scale:1.1}} whileTap={{scale:.9}}>
                <ChevronRight size={18}/>
              </motion.button>
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-5">
              {REVIEWS.map((_,i)=>(
                <button key={i} onClick={()=>setCur(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i===cur?'bg-[#c8102e] w-6':'bg-gray-300 w-1.5'}`}/>
              ))}
            </div>
          </motion.div>

          {/* Center — stacked polaroid cards */}
          <motion.div className="flex justify-center"
            initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.2,duration:.7}}>
            <div className="relative w-48 h-60">
              {REVIEWS.map((r,i)=>{
                const offset = (i-cur+REVIEWS.length)%REVIEWS.length;
                const rot = offset===0?0:offset===1?8:offset===2?-5:-10;
                const z = offset===0?20:10-offset;
                const sc = offset===0?1:0.93;
                return (
                  <motion.div key={r.name}
                    className="absolute inset-0 bg-white shadow-xl flex flex-col items-center justify-center p-4 rounded-sm"
                    animate={{rotate:rot, scale:sc, zIndex:z}}
                    transition={{duration:.4}}>
                    <span className="text-5xl mb-3">{r.avatar}</span>
                    <p className="font-black text-sm">{r.name.split(' ')[0]}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{r.loc}</p>
                    <div className="mt-3 bg-[#d4a017] text-white text-[10px] font-black px-3 py-1 rounded tracking-wider">Excellent</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — review text */}
          <AnimatePresence mode="wait">
            <motion.div key={cur}
              initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}
              transition={{duration:.35}}>
              <div className="mb-4">
                <p className="font-black text-sm uppercase tracking-widest">{REVIEWS[cur].name}</p>
                <p className="text-gray-400 text-xs mb-2">{REVIEWS[cur].loc}</p>
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,i)=>(
                    <Star key={i} size={13} className="fill-[#d4a017] text-[#d4a017]"/>
                  ))}
                  <span className="text-xs font-bold text-[#d4a017] ml-1">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{REVIEWS[cur].text}"</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
