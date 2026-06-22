'use client';
import { motion } from 'framer-motion';

export default function PageHero({ title, subtitle }: { title:string; subtitle:string }) {
  return (
    <div className="page-hero">
      {/* Floating food decor */}
      <motion.span className="absolute top-8 left-8 text-4xl pointer-events-none anim-float opacity-40">🌿</motion.span>
      <motion.span className="absolute top-6 right-12 text-3xl pointer-events-none anim-spin opacity-30">🌿</motion.span>

      <div className="relative z-10 text-center px-4">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <h1 className="text-white font-black text-5xl md:text-6xl uppercase tracking-tight">{title}</h1>
            <div className="w-px h-10 bg-white/30 hidden sm:block"/>
            <span className="text-[#d4a017] font-bold text-sm uppercase tracking-widest">{subtitle}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
