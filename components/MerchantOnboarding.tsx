import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { ArrowRight, Store, SmartphoneNfc, Zap, Check, ShieldCheck, Building2 } from 'lucide-react';

interface MerchantOnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "The Flash Terminal",
    description: "Accept crypto payments at your storefront with zero hardware. Use our high-performance software POS for instant handshakes.",
    icon: <SmartphoneNfc className="w-16 h-16 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "bg-emerald-500/30"
  },
  {
    id: 2,
    title: "Instant Liquidation",
    description: "Revenue collected in crypto is automatically converted and pushed to your local bank account every 24 hours. T+0 available for top tiers.",
    icon: <Building2 className="w-16 h-16 text-blue-400" />,
    color: "from-blue-500/20 to-indigo-600/20",
    glow: "bg-blue-500/30"
  },
  {
    id: 3,
    title: "Scale Your Operations",
    description: "Manage staff access, view granular retail analytics, and issue corporate virtual cards for your business supplies.",
    icon: <Zap className="w-16 h-16 text-emerald-500" />,
    color: "from-emerald-500/20 to-teal-600/20",
    glow: "bg-emerald-500/30"
  }
];

export const MerchantOnboarding: React.FC<MerchantOnboardingProps> = ({ onComplete }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      <motion.div 
        animate={{ 
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.glow} 0%, transparent 70%)` 
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 opacity-40 blur-[100px]"
      />
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />

      <div className="w-full max-w-lg px-6 relative z-10 flex flex-col h-[85vh] max-h-[800px]">
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Store size={14} className="text-white fill-white" />
             </div>
             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Merchant Portal</span>
          </div>
          <button onClick={onComplete} className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Skip</button>
        </div>

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
              <div className="relative mb-12">
                 <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${currentSlide.glow} animate-pulse`} />
                 <motion.div 
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-40 h-40 bg-slate-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10 backdrop-blur-md"
                 >
                    <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${currentSlide.color} opacity-20`} />
                    {currentSlide.icon}
                 </motion.div>
              </div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 italic uppercase tracking-tighter"
              >
                {currentSlide.title}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-slate-400 text-lg leading-relaxed max-w-sm mx-auto font-medium"
              >
                {currentSlide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pb-8 pt-12">
          <div className="flex flex-col gap-8">
            <div className="flex justify-center gap-2">
              {slides.map((_, index) => (
                <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/10'}`} />
              ))}
            </div>

            <Button 
              onClick={nextSlide}
              className={`w-full py-6 rounded-3xl font-black uppercase text-sm tracking-widest shadow-2xl ${currentIndex === slides.length - 1 ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-white text-slate-950'}`}
              icon={currentIndex === slides.length - 1 ? <ShieldCheck className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            >
              {currentIndex === slides.length - 1 ? "Launch Business Terminal" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};