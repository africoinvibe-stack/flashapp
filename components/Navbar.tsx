import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet, Zap, User, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onLogin: () => void;
  onSignUp: () => void;
  onDemo?: () => void;
}

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Contact', href: '#contact-us' },
];

export const Navbar: React.FC<NavbarProps> = ({ onLogin, onSignUp, onDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-950/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Zap className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white italic">
              Flash
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={onDemo}
                className="text-sm font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-brand-500/10 transition-all"
              >
                <Play size={14} className="fill-current" /> Demo
              </button>
              <button 
                onClick={onLogin}
                className="text-sm font-medium text-white hover:text-brand-400 transition-colors"
              >
                Log In
              </button>
              <Button 
                onClick={onSignUp}
                variant="secondary" 
                size="sm" 
                icon={<Wallet className="w-4 h-4" />}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900 border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button onClick={onDemo} variant="ghost" className="w-full justify-start px-3 text-brand-400">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Try Demo
                </Button>
                <Button onClick={() => { onLogin(); setMobileMenuOpen(false); }} variant="ghost" className="w-full justify-start px-3">
                  <User className="w-4 h-4 mr-2" /> Log In
                </Button>
                <Button onClick={() => { onSignUp(); setMobileMenuOpen(false); }} variant="secondary" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};