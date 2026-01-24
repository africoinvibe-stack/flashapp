import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      key="splash"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Logo Container with Orbiting Rings */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
            
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-brand-500/10 blur-[60px] rounded-full" />

            {/* SVG Ring 1 - Electric Blue - Outer - Slow Rotation */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="url(#blueGradient)" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="80 180" />
            </svg>

            {/* SVG Ring 2 - Brand Amber - Inner - Fast Counter Rotation */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite_reverse]" viewBox="0 0 100 100">
                 <defs>
                    <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="none" stroke="url(#amberGradient)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="60 200" />
            </svg>

            {/* Static Thin Rings for depth */}
            <div className="absolute inset-0 rounded-full border border-white/5 w-[80%] h-[80%] top-[10%] left-[10%]" />
            <div className="absolute inset-0 rounded-full border border-white/5 w-[96%] h-[96%] top-[2%] left-[2%]" />

            {/* Central Logo */}
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] z-10 relative overflow-hidden"
            >
                {/* Shine Animation inside logo */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    initial={{ x: '-150%' }}
                    animate={{ x: '150%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 0.5 }}
                />
                
                <Zap className="text-white w-12 h-12 fill-white drop-shadow-md relative z-10" />
            </motion.div>
        </div>
        
        {/* Brand Text */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center relative z-20"
        >
            <h1 className="font-display font-bold text-5xl text-white italic tracking-wider mb-4">
            Flash
            </h1>
            
            {/* Modern Loading Dots */}
            <div className="flex items-center justify-center gap-1.5 h-4">
                <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-brand-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-brand-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-brand-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};