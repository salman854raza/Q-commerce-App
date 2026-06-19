'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/menu', label: 'Menu' },
  { href: '/chefs', label: 'Chefs' }, { href: '/franchise', label: 'Franchise' }, { href: '/contact', label: 'Contact' },
];

const socials = [
  { label: 'Facebook', icon: 'f', href: '#' },
  { label: 'Instagram', icon: '📷', href: '#' },
  { label: 'Twitter', icon: '𝕏', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* CTA Banner */}
      <div className="bg-[#111] text-center py-10 px-4">
        <motion.p className="text-lg md:text-2xl font-black uppercase tracking-wide"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          UNFORGETTABLE HOME DELIVERY EXPERIENCE{' '}
          <a href="tel:+12345678910" className="text-[#c8102e] hover:text-[#e01535] transition-colors">+1 234 567 8910</a>
        </motion.p>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍕</span>
              <span className="text-2xl font-black">Pizzao</span>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed">Original Italian Pizza Parlor since 1998.</p>
          </div>
          {/* Find us */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-400">Find our restaurants</h4>
            <p className="text-gray-500 text-sm leading-relaxed">401 Broadway, 24th Floor<br />New York, NY 10013</p>
          </div>
          {/* Hours */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-400">Opening hours</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Monday – Sunday<br />9:00 AM to 11:30 PM</p>
          </div>
          {/* Social */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-3 text-gray-400">Connect with us</h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#c8102e] hover:text-white transition-all font-bold text-sm"
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-xs"><Phone size={12} /> 1-800-222-000</div>
              <div className="flex items-center gap-2 text-gray-500 text-xs"><Mail size={12} /> info@pizzao.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-5 justify-center">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-gray-500 text-xs hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
          <p className="text-gray-600 text-xs">© 2026 Pizzao. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
