'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function AboutHeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const personY = useTransform(scrollYProgress,[0,1],[0,  80]);
  const pizzaY  = useTransform(scrollYProgress,[0,1],[0,-70]);
  const leafY   = useTransform(scrollYProgress,[0,1],[0,  50]);
  const inView  = useInView(ref, { once:true });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div initial={{opacity:0,x:-50}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.8}}>
            <p className="label-tag mb-4">BEST ITALIAN FOOD FOR YOUR FAMILY</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              AMAZING AND HYGIENE<br/>PASTA AND PIZZA PARLOR.
            </h1>
            <div className="divider mb-6"/>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest, tastiest pizza for you and your family.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/chefs">
                <motion.button className="btn btn-dark rounded-sm" whileHover={{scale:1.03}} whileTap={{scale:.97}}>
                  PROFESSIONAL CHEF <ArrowRight size={14}/>
                </motion.button>
              </Link>
              <a href="tel:+18002220000" className="flex items-center gap-2 font-semibold text-sm hover:text-[#c8102e] transition-colors">
                <div className="w-8 h-8 bg-[#c8102e]/10 rounded-full flex items-center justify-center">
                  <Phone size={13} className="text-[#c8102e]"/>
                </div>
                1 800 222 000
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['👩','👨','👩‍🦳'].map((e,i)=>(
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-lg">{e}</div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">5-star reviews from our satisfied customers</p>
            </div>
          </motion.div>

          {/* RIGHT — parallax images */}
          <div className="relative h-[480px]">
            {/* Pizza top-right MOVES UP */}
            <motion.div className="absolute top-0 right-0 w-52 h-52" style={{y:pizzaY}}>
              <motion.div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden card-shadow"
                initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.3,duration:.7}}>
                <span className="text-[100px] anim-float">🍕</span>
              </motion.div>
              <div className="absolute -bottom-3 -left-3 bg-[#c8102e] text-white text-xs font-black px-3 py-1.5 rounded-full shadow">Authentic Italian</div>
            </motion.div>

            {/* Chef image bottom-left MOVES DOWN */}
            <motion.div className="absolute bottom-0 left-0 w-56 h-72" style={{y:personY}}>
              <motion.div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-2xl card-shadow"
                initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.15,duration:.7}}>
                <span className="text-[110px]">👨‍🍳</span>
              </motion.div>
              <div className="absolute -top-3 -right-3 bg-[#d4a017] text-white text-xs font-black px-3 py-1.5 rounded-full shadow">Head Chef</div>
            </motion.div>

            {/* Floating leaf */}
            <motion.div className="absolute top-1/3 left-1/4 pointer-events-none" style={{y:leafY}}>
              <span className="text-5xl anim-float block opacity-70">🌿</span>
            </motion.div>

            {/* Stats overlay */}
            <motion.div className="absolute top-1/2 right-12 bg-white rounded-2xl p-5 shadow-2xl card-shadow"
              initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.5,duration:.6}}>
              <div className="text-center">
                <p className="stat-num">16+</p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
