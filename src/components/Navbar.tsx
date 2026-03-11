import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', dropdown: SERVICES },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${isScrolled ? 'py-2 bg-slate-950 shadow-2xl' : 'py-4 bg-slate-950/90 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold text-2xl tracking-tighter text-white">
              growthpartners<span className="text-emerald-500">co</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className="flex items-center gap-1 font-medium transition-colors text-white/90 hover:text-white"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={16} />}
                </Link>
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-colors"
                        >
                          <div className="font-semibold text-sm">{item.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl font-bold text-white hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-2 ml-4 space-y-2 border-l-2 border-white/10 pl-4">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block text-slate-400 hover:text-emerald-400 py-1"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-emerald-600 text-white text-center py-4 rounded-xl font-bold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
