'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShoppingBag, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/chefs', label: 'Chefs' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a1a1a] shadow-2xl' : 'bg-[#1a1a1a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Phone */}
          <div className="flex items-center gap-2 text-white text-sm">
            <Phone size={14} className="text-[#c8102e] animate-pulse" />
            <span className="hidden sm:inline font-medium">1 800 222 000</span>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-200 relative group ${
                  pathname === link.href ? 'text-[#c8102e]' : 'text-white hover:text-[#c8102e]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#c8102e] transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <div className="w-10 h-10 rounded-full bg-[#c8102e] flex items-center justify-center">
              <span className="text-white text-lg">🍕</span>
            </div>
            <span className="text-white text-xl font-bold italic">Pizzao</span>
          </Link>

          {/* Order Button */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#c8102e] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#a00d24] transition-colors"
            >
              <ShoppingBag size={16} />
              ORDER ONLINE
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#111] border-t border-gray-800"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-widest py-2 ${
                    pathname === link.href ? 'text-[#c8102e]' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="flex items-center gap-2 bg-[#c8102e] text-white px-5 py-2.5 rounded-full text-sm font-semibold w-fit">
                <ShoppingBag size={16} />
                ORDER ONLINE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
