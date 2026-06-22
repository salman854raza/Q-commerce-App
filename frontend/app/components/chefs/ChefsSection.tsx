'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHEFS = [
  {name:'JOHN RICHARDS', cuisine:'Indian Cuisine',   emoji:'👨‍🍳'},
  {name:'MARTA WARNER',  cuisine:'Mexico Cuisine',   emoji:'👩‍🍳'},
  {name:'QUEEN FERRARI', cuisine:'French Cuisine',   emoji:'👩‍🍳'},
  {name:'ANTONY TAYLOR', cuisine:'Thai Cuisine',     emoji:'👨‍🍳'},
  {name:'LUCKY GREEN',   cuisine:'Japanese Cuisine', emoji:'👨‍🍳'},
  {name:'TAYLOR HABBANT',cuisine:'Greek Cuisine',    emoji:'👨‍🍳'},
  {name:'SARA WELCH',    cuisine:'Indian Cuisine',   emoji:'👩‍🍳'},
  {name:'JEMMY SMITH',   cuisine:'Head Chef',        emoji:'👴'},
];

export default function ChefsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true});

  return (
    <div ref={ref}>
      {/* Masterchef */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div className="relative" initial={{opacity:0,x:-50}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.8}}>
              <div className="relative w-80 h-80 mx-auto">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[140px] leading-none">👨‍🍳</span>
                </div>
                <motion.div className="absolute inset-0 rounded-full border-2 border-dashed border-[#c8102e]/30"
                  animate={{rotate:360}} transition={{duration:20,repeat:Infinity,ease:'linear'}}>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap shadow-md border border-gray-100">
                    THE ORIGINAL FOOD TABLE · ITALY ·
                  </div>
                </motion.div>
                <motion.div className="absolute bottom-8 right-4 text-4xl anim-float">🌶️</motion.div>
                <motion.div className="absolute top-8 left-0 text-3xl anim-float2">🌿</motion.div>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:50}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.8,delay:.2}}>
              <p className="label-tag mb-4">MASTERCHEF'S MESSAGE</p>
              <h2 className="text-5xl font-black mb-2">HERMAN MILER</h2>
              <div className="divider mb-5"/>
              <p className="font-semibold text-gray-700 mb-3">Unique and delicious dishes from the world's best masterchefs.</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Lorem ipsum dolor amet consectetur pellentesque blandit ultrices purus suspendisse iaculis ultrices sagittis. Proin vulputate eleifend cras lacinia iaculis feugiat egestas neque sodales.
              </p>
              <p className="text-3xl text-gray-600 border-b-2 border-[#c8102e] pb-2 inline-block" style={{fontFamily:'Georgia,serif',fontStyle:'italic'}}>
                Herman miller
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12" initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}>
            <p className="label-tag mb-3">MEET OUR CHEF</p>
            <h2 className="text-4xl md:text-5xl font-black">WORLD'S BEST CHEFS</h2>
            <div className="divider mt-4"/>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {CHEFS.map((chef,i)=>(
              <motion.div key={chef.name} className="group text-center cursor-pointer"
                initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
                transition={{delay:i*.07,duration:.5}}>
                <div className="relative overflow-hidden bg-gray-100 rounded-xl mb-3 aspect-square flex items-center justify-center card-hover">
                  <motion.span className="text-[90px] leading-none group-hover:scale-110 transition-transform duration-300">{chef.emoji}</motion.span>
                  <div className="absolute inset-0 bg-[#c8102e]/85 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                    <p className="text-white font-black text-xs">{chef.name}</p>
                    <p className="text-white/70 text-[10px] mt-1">{chef.cuisine}</p>
                  </div>
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wide">{chef.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{chef.cuisine}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
