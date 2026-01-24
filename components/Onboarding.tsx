import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, Wallet, CreditCard, Zap, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "Save in Digital Dollars",
    description: "Inflation-proof your wealth. Hold USDC and USDT to keep your money stable, safe, and ready to deploy instantly.",
    icon: <Wallet className="w-16 h-16 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "bg-emerald-500/30"
  },
  {
    id: 2,
    title: "Spend Globally",
    description: "Create virtual USD cards in seconds. Pay for subscriptions, ads, or coffee anywhere Visa is accepted worldwide.",
    icon: <CreditCard className="w-16 h-16 text-electric-400" />,
    color: "from-electric-500/20 to-blue-600/20",
    glow: "bg-electric-500/30"
  },
  {
    id: 3,
    title: "Trade at Lightning Speed",
    description: "Swap between crypto and fiat with zero hidden spreads. High limits for serious traders and businesses.",
    icon: <Zap className="w-16 h-16 text-brand-400" />,
    color: "from-brand-500/20 to-orange-600/20",
    glow: "bg-brand-500/30"
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentIndex === slides.length - 1) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const skip = () => {
    onComplete();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950 overflow-hidden">
      {/* Dynamic Background Gradient */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.glow} 0%, transparent 70%)` 
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 opacity-40 blur-[100px]"
      />
      
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

      <div className="w-full max-w-lg px-6 relative z-10 flex flex-col h-[85vh] max-h-[800px]">
        
        {/* Top Navigation */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={skip}
            className="text-slate-500 hover:text-white text-sm font-medium transition-colors px-4 py-2"
          >
            Skip
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full flex flex-col items-center text-center"
            >
              {/* Visual Container */}
              <div className="relative mb-12 group">
                 {/* Animated Rings */}
                 <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${currentSlide.glow} animate-pulse-slow`} />
                 <motion.div 
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
                    className="w-40 h-40 bg-dark-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-md"
                 >
                    {/* Inner Gradient Border */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentSlide.color} opacity-20`} />
                    {currentSlide.icon}
                 </motion.div>
                 
                 {/* Floating Elements */}
                 <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center z-20"
                 >
                    <div className="w-2 h-2 rounded-full bg-white" />
                 </motion.div>
                 <motion.div 
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -bottom-2 -left-4 w-16 h-8 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center z-20"
                 >
                    <div className="w-8 h-1.5 rounded-full bg-white/20" />
                 </motion.div>
              </div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display font-bold text-3xl sm:text-4xl text-white mb-4"
              >
                {currentSlide.title}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-lg leading-relaxed max-w-sm mx-auto"
              >
                {currentSlide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="pb-8 pt-12">
          <div className="flex flex-col gap-8">
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2">
              {slides.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-brand-400' 
                      : 'w-2 bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Action Button */}
            <Button 
              onClick={nextSlide}
              variant={currentIndex === slides.length - 1 ? "secondary" : "primary"}
              className="w-full"
              size="lg"
              icon={currentIndex === slides.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            >
              {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
