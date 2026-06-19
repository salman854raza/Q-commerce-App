'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Send, User, MessageSquare } from 'lucide-react';

const typewriterWords = ['Hello! 👋', 'Assalam Alikum! 🌙', 'Hella! 🔥', 'Shalve! ✨', 'Ciao! 🍕'];

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < word.length) {
          setDisplayed(word.slice(0, displayed.length + 1));
          setSpeed(100);
        } else {
          setSpeed(1800);
          setDeleting(true);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(word.slice(0, displayed.length - 1));
          setSpeed(60);
        } else {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % typewriterWords.length);
          setSpeed(300);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, wordIndex, speed]);

  return (
    <span className="text-white font-black text-5xl md:text-6xl tracking-tight">
      SAY <span className="typewriter-cursor">{displayed}</span>
    </span>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Info */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
              variants={itemVariants}
            >
              WE'D LOVE TO<br />HEAR FROM YOU.
            </motion.h2>

            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <p className="text-xs font-bold text-[#c8102e] uppercase tracking-widest mb-2">
                  Feel Free To Get In Touch?
                </p>
                <p className="text-gray-600 leading-relaxed">
                  401 Broadway, 24th Floor,<br />Orchard View, London
                </p>
                <motion.button
                  className="btn-dark mt-4 text-xs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MapPin size={14} /> GET DIRECTIONS
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-xs font-bold text-[#c8102e] uppercase tracking-widest mb-2">
                  Let's Talk With Us?
                </p>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Phone size={14} className="text-[#c8102e]" />
                  <span>Phone: 1-800-222-000</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span>Fax: 1-800-222-002</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-xs font-bold text-[#c8102e] uppercase tracking-widest mb-2">
                  How Can We Help You?
                </p>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Mail size={14} className="text-[#c8102e]" />
                  <a href="mailto:info@yourdomain.com" className="hover:text-[#c8102e] transition-colors">
                    info@yourdomain.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="text-gray-400" />
                  <a href="mailto:help@yourdomain.com" className="hover:text-[#c8102e] transition-colors">
                    help@yourdomain.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Image + Form */}
          <motion.div variants={itemVariants} className="relative">
            {/* Staff image */}
            <div className="relative h-[420px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User size={80} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium opacity-50">Staff Photo</p>
                </div>
              </div>

              {/* Floating form card */}
              <motion.div
                className="absolute right-0 top-6 bottom-6 w-64 bg-[#c8102e] p-6 flex flex-col"
                initial={{ x: 80, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' as const }}
              >
                <div className="mb-6">
                  <TypewriterText />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name*"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/60 text-sm py-2 outline-none focus:border-white transition-colors"
                    />
                    <User size={14} className="absolute right-0 top-2 text-white/60" />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address*"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/60 text-sm py-2 outline-none focus:border-white transition-colors"
                    />
                    <Mail size={14} className="absolute right-0 top-2 text-white/60" />
                  </div>
                  <div className="relative flex-1">
                    <textarea
                      placeholder="Your message"
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/60 text-sm py-2 outline-none focus:border-white transition-colors resize-none"
                    />
                    <MessageSquare size={14} className="absolute right-0 top-2 text-white/60" />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading || submitted}
                    className="mt-auto bg-white text-[#c8102e] text-xs font-bold uppercase tracking-widest py-3 px-6 flex items-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-[#c8102e] border-t-transparent rounded-full" />
                    ) : submitted ? (
                      '✅ SENT!'
                    ) : (
                      <><Send size={14} /> SEND MESSAGE</>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Franchise banner */}
        <motion.div
          className="mt-16 flex items-center gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="w-10 h-10 bg-[#c8102e] rounded-full flex items-center justify-center text-white text-lg">🍕</div>
          <p className="text-gray-700 font-medium">
            Looking for a franchise that focuses on quality food?{' '}
            <a href="/franchise" className="text-[#c8102e] font-bold uppercase hover:underline">
              JOIN THE NETWORK
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
