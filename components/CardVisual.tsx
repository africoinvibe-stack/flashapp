import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const CardVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Glow effect behind card - mix of Brand and Electric */}
      <div className="absolute inset-0 bg-brand-500/20 blur-[80px] rounded-full transform -translate-y-10" />
      <div className="absolute -bottom-10 right-0 w-32 h-32 bg-electric-500/30 blur-[60px] rounded-full" />
      
      <motion.div
        className="relative w-full aspect-[1.586/1] rounded-2xl p-8 shadow-2xl overflow-hidden border border-white/10 backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -5, 0, 5, 0],
          y: [0, -15, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* Card Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Dynamic Lightning Accent in Background */}
        <div className="absolute -right-10 -top-10 text-brand-400/10 rotate-12">
           <Zap size={200} fill="currentColor" />
        </div>

        {/* Card Content */}
        <div className="relative h-full flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <div className="w-12 h-10 rounded bg-gradient-to-r from-brand-400 to-brand-600 opacity-90 relative overflow-hidden shadow-inner">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-30"></div>
            </div> 
            
            <div className="flex items-center gap-2">
              <Zap className="text-brand-400 w-6 h-6 fill-brand-400" />
              <div className="text-white font-display font-bold text-xl tracking-wider italic">FLASH</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-white/80 font-mono text-xl tracking-widest drop-shadow-md">**** **** **** 4298</span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Card Holder</div>
                <div className="text-white font-medium tracking-wide">ALEX MORGAN</div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="w-12 h-12 relative">
                   <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <circle cx="16" cy="24" r="12" fill="#EB001B" fillOpacity="0.8"/>
                     <circle cx="32" cy="24" r="12" fill="#F79E1B" fillOpacity="0.8"/>
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div 
          className="absolute top-0 -inset-full w-1/2 h-full z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20"
          animate={{ left: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
        />
      </motion.div>
      
      {/* Floating Elements behind */}
      <motion.div 
        className="absolute -top-12 -right-12 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-8 -left-8 w-32 h-32 bg-electric-500/20 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
};