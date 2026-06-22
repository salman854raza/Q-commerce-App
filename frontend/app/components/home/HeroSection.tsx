'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Star, Truck } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const pizzaY   = useTransform(scrollYProgress, [0,1], [0, -80]);
  const pepperY  = useTransform(scrollYProgress, [0,1], [0,  120]);
  const tomatoY  = useTransform(scrollYProgress, [0,1], [0,  90]);
  const textY    = useTransform(scrollYProgress, [0,1], [0, -40]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#c8102e] overflow-hidden flex items-center">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'32px 32px' }} />

      {/* Floating decoratives */}
      <motion.div className="absolute top-28 right-12 z-20 pointer-events-none" style={{ y: pepperY }}>
        <motion.span className="text-6xl food-3d block anim-spin" style={{ fontSize:72 }}>🫑</motion.span>
      </motion.div>
      <motion.div className="absolute top-48 left-8 z-20 pointer-events-none" style={{ y: tomatoY }}>
        <span className="text-5xl food-3d block anim-float">🍅</span>
      </motion.div>
      <motion.div className="absolute bottom-32 left-16 pointer-events-none z-20">
        <span className="text-4xl food-3d block anim-float2">🌿</span>
      </motion.div>
      <motion.div className="absolute bottom-24 right-20 pointer-events-none z-20">
        <span className="text-5xl food-3d block anim-float">🌶️</span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — text */}
          <motion.div style={{ y: textY }}>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
              <p className="text-[#d4a017] font-black italic text-2xl mb-2" style={{ fontFamily:'Georgia,serif' }}>Original</p>
              <h1 className="text-white font-black leading-none mb-4"
                style={{ fontSize:'clamp(3.5rem,11vw,7.5rem)', letterSpacing:'-.02em', textShadow:'0 4px 32px rgba(0,0,0,.25)' }}>
                ITALIAN<br/>PIZZA
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-md">
                Handcrafted with love, baked to perfection. The 3rd largest pizza chain with one mission — making the freshest, tastiest pizza you've ever had.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { icon:<Clock size={13}/>,  text:'30 Min Delivery' },
                  { icon:<Star size={13}/>,   text:'5-Star Reviews'  },
                  { icon:<Truck size={13}/>,  text:'Free Delivery'   },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full">
                    {b.icon}{b.text}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/menu">
                  <motion.button className="btn btn-dark rounded-sm flex items-center gap-2"
                    whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                    Order Now <ArrowRight size={15}/>
                  </motion.button>
                </Link>
                <Link href="/menu">
                  <motion.button className="btn btn-outline rounded-sm border-white text-white hover:bg-white hover:text-[#c8102e]"
                    whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                    View Menu
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — pizza */}
          <div className="relative flex items-center justify-center">
            <motion.div style={{ y: pizzaY }}
              initial={{ scale:.7, opacity:0, rotate:-15 }}
              animate={{ scale:1, opacity:1, rotate:0 }}
              transition={{ duration:1, ease:[.175,.885,.32,1.275] }}>

              {/* Glow circle */}
              <div className="absolute inset-0 rounded-full bg-[#a00d24] blur-3xl opacity-60 scale-75" />

              {/* Pizza emoji */}
              <motion.span
                className="text-[200px] md:text-[260px] block leading-none food-3d relative z-10 anim-float"
                style={{ lineHeight:1 }}>
                🍕
              </motion.span>

              {/* TODAY OFFER badge */}
              <motion.div
                className="absolute top-6 right-4 bg-[#d4a017] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center font-black text-xs uppercase shadow-2xl text-center leading-tight"
                animate={{ rotate:[0,6,-6,0] }} transition={{ duration:4, repeat:Infinity }}>
                TODAY<br/>OFFER
              </motion.div>

              {/* Order button */}
              <Link href="/menu" className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <motion.div
                  className="w-24 h-24 bg-[#d4a017] rounded-full flex flex-col items-center justify-center text-white font-black text-xs uppercase shadow-2xl text-center border-4 border-white anim-pulse cursor-pointer"
                  whileHover={{ scale:1.12 }} whileTap={{ scale:.95 }}>
                  <ArrowRight size={16} className="mb-1"/>
                  ORDER<br/>PIZZA
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom white curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{ clipPath:'polygon(0 100%,5% 30%,15% 85%,25% 15%,35% 75%,45% 10%,55% 70%,65% 20%,75% 80%,85% 25%,95% 65%,100% 5%,100% 100%)' }} />
    </section>
  );
}
