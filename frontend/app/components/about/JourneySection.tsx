'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MILESTONES = [
  {year:'1998', title:'The Beginning',    desc:'Founded in the heart of NYC with one oven and a dream.',        emoji:'🏙️', color:'#1a1a1a'},
  {year:'2005', title:'First Expansion',  desc:'Opened 10 new locations across 5 states in the US.',           emoji:'🌆', color:'#555'},
  {year:'2014', title:'Premium Dining',   desc:'Launched our premium dine-in experience with live music.',      emoji:'🍽️', color:'#333'},
  {year:'2026', title:'AI-Powered Future',desc:'Launched smart AI ordering system & Q-commerce platform.',     emoji:'🚀', color:'#c8102e'},
];

export default function JourneySection() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const pepY  = useTransform(scrollYProgress,[0,1],[-60,120]);
  const pepR  = useTransform(scrollYProgress,[0,1],[0,360]);
  const inView = useInView(ref, { once:true });
  const prev = () => setCur(c=>(c-1+MILESTONES.length)%MILESTONES.length);
  const next = () => setCur(c=>(c+1)%MILESTONES.length);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* 3D Spinning Pepper */}
      <motion.div className="absolute left-6 top-20 pointer-events-none z-10" style={{y:pepY, rotate:pepR}}>
        <span className="text-7xl food-3d block">🫑</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14"
          initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <p className="label-tag justify-center mb-3">OUR LAST 16 YEARS JOURNEY</p>
          <h2 className="text-3xl md:text-4xl font-black max-w-3xl mx-auto leading-tight">
            WE ARE A YOUNG AND BEAUTIFUL TEAM WITH A PASSION FOR TASTY AND TRADITIONAL FOOD REDISCOVERING ROMANIAN DELICACIES.
          </h2>
        </motion.div>

        {/* Timeline cards with < > nav */}
        <div className="relative">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gray-200 hidden md:block"/>

          <div className="flex items-center gap-4">
            <motion.button onClick={prev}
              className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all z-10"
              whileHover={{scale:1.1}} whileTap={{scale:.9}}>
              <ChevronLeft size={18}/>
            </motion.button>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={cur} className="grid grid-cols-1 md:grid-cols-3 gap-5"
                  initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}
                  transition={{duration:.35}}>
                  {[-1,0,1].map(offset=>{
                    const idx = (cur+offset+MILESTONES.length)%MILESTONES.length;
                    const m = MILESTONES[idx];
                    const isActive = offset===0;
                    return (
                      <motion.div key={idx}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all ${isActive?'ring-2 ring-[#c8102e] shadow-2xl':'opacity-70'}`}
                        whileHover={isActive?{}:{scale:1.02}}>
                        <div className={`aspect-video flex items-center justify-center relative ${isActive?'bg-gray-900':'bg-gray-200'}`}
                          style={!isActive?{filter:'grayscale(1)'}:{}}>
                          <span className="text-7xl">{m.emoji}</span>
                          <div className="absolute bottom-3 left-4">
                            <span className="text-white font-black text-2xl drop-shadow-lg">{m.year}</span>
                          </div>
                          {isActive && (
                            <div className="absolute top-3 right-3 bg-[#c8102e] text-white text-[10px] font-black px-2 py-1 rounded">
                              CURRENT VIEW
                            </div>
                          )}
                        </div>
                        {isActive && (
                          <div className="bg-white p-4">
                            <h3 className="font-black text-sm mb-1">{m.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button onClick={next}
              className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all z-10"
              whileHover={{scale:1.1}} whileTap={{scale:.9}}>
              <ChevronRight size={18}/>
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {MILESTONES.map((_,i)=>(
              <button key={i} onClick={()=>setCur(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i===cur?'bg-[#c8102e] w-6':'bg-gray-300 w-1.5'}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
