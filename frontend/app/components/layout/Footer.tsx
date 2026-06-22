'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const NAV = [
  {href:'/',          label:'Home'      },
  {href:'/about',     label:'About'     },
  {href:'/menu',      label:'Menu'      },
  {href:'/chefs',     label:'Chefs'     },
  {href:'/franchise', label:'Franchise' },
  {href:'/contact',   label:'Contact'   },
];

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      {/* CTA strip */}
      <div className="bg-[#0a0a0a] py-8 px-4 text-center border-b border-white/5">
        <motion.p className="text-lg md:text-xl font-black uppercase tracking-wide"
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
          UNFORGETTABLE HOME DELIVERY EXPERIENCE{' '}
          <a href="tel:+12345678910" className="text-[#c8102e] hover:underline">+1 234 567 8910</a>
        </motion.p>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#c8102e] rounded-full flex items-center justify-center">
                <span className="text-lg">🍕</span>
              </div>
              <span className="text-xl font-black">Pizzao</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Original Italian Pizza Parlor since 1998. Making the freshest, tastiest pizza around.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[{l:'f',c:'Facebook'},{l:'ig',c:'Instagram'},{l:'𝕏',c:'Twitter'}].map(s=>(
                <motion.button key={s.c} title={s.c}
                  className="w-9 h-9 rounded-full bg-white/8 text-gray-400 hover:bg-[#c8102e] hover:text-white transition-all text-xs font-black"
                  whileHover={{scale:1.15}} whileTap={{scale:.9}}>
                  {s.l}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-5 text-gray-400">Navigation</h4>
            <ul className="space-y-3">
              {NAV.map(l=>(
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 text-sm hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-5 text-gray-400">Find Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#c8102e] mt-0.5 flex-shrink-0"/>
                <p className="text-gray-500 text-sm leading-relaxed">401 Broadway, 24th Floor<br/>New York, NY 10013</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#c8102e] flex-shrink-0"/>
                <a href="tel:+18002220000" className="text-gray-500 text-sm hover:text-white transition-colors">1-800-222-000</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#c8102e] flex-shrink-0"/>
                <a href="mailto:info@pizzao.com" className="text-gray-500 text-sm hover:text-white transition-colors">info@pizzao.com</a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-5 text-gray-400">Opening Hours</h4>
            <div className="space-y-2">
              {[
                {day:'Monday – Friday', hours:'9:00 AM – 11:30 PM'},
                {day:'Saturday',        hours:'10:00 AM – 12:00 AM'},
                {day:'Sunday',          hours:'10:00 AM – 11:00 PM'},
              ].map(h=>(
                <div key={h.day} className="flex justify-between gap-4 text-sm border-b border-white/5 pb-2">
                  <span className="text-gray-500">{h.day}</span>
                  <span className="text-white font-semibold">{h.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-[#c8102e]/10 border border-[#c8102e]/20 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 text-xs font-bold">WE'RE OPEN NOW</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">Order now for fast delivery!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <nav className="flex flex-wrap gap-5 justify-center">
            {NAV.map(l=>(
              <Link key={l.href} href={l.href} className="text-gray-600 text-xs hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
          <p className="text-gray-600 text-xs">© 2026 Pizzao. All rights reserved. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
