'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a]">
      {/* CTA Banner */}
      <div className="bg-[#111] py-8 text-center border-b border-gray-800">
        <p className="text-white text-lg font-bold uppercase tracking-wide">
          UNFORGETTABLE HOME DELIVERY EXPERIENCE{' '}
          <a href="tel:+12345678910" className="text-[#c8102e] hover:underline">
            +1 234 567 8910
          </a>
        </p>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#c8102e] flex items-center justify-center">
                <span className="text-white text-lg">🍕</span>
              </div>
              <span className="text-white text-xl font-bold italic">Pizzao</span>
            </div>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Find our restaurants</h4>
            <p className="text-gray-400 text-sm">401 Broadway, 24th Floor</p>
            <p className="text-gray-400 text-sm">New York, NY 10013</p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Opening hours</h4>
            <p className="text-gray-400 text-sm">Monday - Sunday</p>
            <p className="text-gray-400 text-sm">9:00 AM to 11:30 PM</p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Connect with us</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, backgroundColor: '#c8102e' }}
                  className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6 text-gray-500 text-xs">
            {['Home', 'About', 'Menu', 'Chefs', 'Franchise', 'Contact'].map((item) => (
              <Link key={item} href={`/${item === 'Home' ? '' : item.toLowerCase()}`} className="hover:text-[#c8102e] transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <p className="text-gray-600 text-xs mt-2 md:mt-0">
            © 2026 Pizzao. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
