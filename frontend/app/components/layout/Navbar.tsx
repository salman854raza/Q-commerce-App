'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';

const links = [
  { href:'/',          label:'Home'      },
  { href:'/about',     label:'About'     },
  { href:'/menu',      label:'Menu'      },
  { href:'/chefs',     label:'Chefs'     },
  { href:'/franchise', label:'Franchise' },
  { href:'/contact',   label:'Contact'   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,.10)]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Phone */}
          <a href="tel:+18002220000" className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#c8102e] transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#c8102e]/10 flex items-center justify-center">
              <Phone size={12} className="text-[#c8102e]" />
            </div>
            1 800 222 000
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`nav-link ${pathname === l.href ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — center */}
          <Link href="/" className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
            <div className="w-9 h-9 bg-[#c8102e] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-lg">🍕</span>
            </div>
            <span className="text-xl font-black tracking-tight">Pizzao</span>
          </Link>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/menu" className="btn btn-red text-xs py-2.5 px-5 rounded-sm">
              <ShoppingCart size={13} /> Order Online
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden ml-auto z-10 p-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden absolute inset-x-0 top-full bg-white border-t border-gray-100 shadow-xl"
            initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:.22 }}>
            <nav className="flex flex-col p-4 gap-1">
              {links.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${
                    pathname === l.href ? 'bg-[#c8102e]/10 text-[#c8102e]' : 'hover:bg-gray-50 text-gray-700'
                  }`}>
                  {l.label}
                </Link>
              ))}
              <Link href="/menu" onClick={() => setOpen(false)}
                className="btn btn-red mt-3 rounded-sm justify-center">
                <ShoppingCart size={14} /> Order Online
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
