import React from 'react';
import { ArrowRight, CheckCircle, Zap, Store, Smartphone, ShieldCheck, QrCode, Check, Wifi, Brain, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/Button';
import { CardVisual } from './CardVisual';
import { motion } from 'framer-motion';

interface HeroProps {
  onSignUp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignUp }) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-40 overflow-hidden">
      {/* Dynamic Ambient Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          {/* Enhanced Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-md shadow-xl group cursor-default">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 mr-3 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-300">Autonomous P2P Network Live</span>
              <div className="hidden xs:block ml-3 pl-3 border-l border-white/10 text-xs font-bold text-brand-400 group-hover:text-white transition-colors">AI Escrow 2.0</div>
            </div>
            
            <h1 className="font-display font-bold text-4xl xs:text-5xl sm:text-7xl lg:text-8xl leading-[0.95] sm:leading-[0.9] mb-6 sm:mb-8 tracking-tighter">
              Spend Crypto <br />
              <span className="gradient-text italic">In a Flash.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-8 sm:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The world's first handshake between <span className="text-white font-bold italic">Neural AI Trading</span> and <span className="text-white font-bold italic">Physical Retail</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-10 sm:mb-14">
              <Button 
                onClick={onSignUp}
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto py-5 px-10 text-xl font-black rounded-3xl"
                icon={<Zap className="w-6 h-6 fill-slate-950" />}
              >
                Launch Wallet
              </Button>
              <div className="flex items-center gap-4 px-6 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l-2 border-white/10 w-full sm:w-auto justify-center">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400">
                    <ArrowLeftRight size={20} />
                 </div>
                 <div className="text-left">
                    <p className="text-white font-bold leading-none mb-1 text-sm sm:text-base">P2P Hub</p>
                    <button onClick={onSignUp} className="text-slate-500 text-xs sm:text-sm hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-emerald-500/30 italic">Start Auto-Trade</button>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-8 border-t border-white/5">
              {[
                { icon: <Brain size={14} />, label: "AI Trading" },
                { icon: <Smartphone size={14} />, label: "Tap-to-Pay" },
                { icon: <ShieldCheck size={14} />, label: "Secured" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 text-slate-500 group cursor-default">
                  <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-brand-400 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-center sm:text-left">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Visual with Floating Badges - Responsive Scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative flex items-center justify-center py-12 lg:py-0"
          >
            <div className="relative z-10 w-full max-w-[280px] xs:max-w-md lg:max-w-lg">
                <CardVisual />
                
                {/* AI Badge - Top Right */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: 999999, ease: "easeInOut" }}
                    className="absolute -top-8 sm:-top-12 -right-2 sm:-right-6 bg-brand-500 text-slate-950 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl z-20 flex flex-col items-center"
                >
                    <Brain size={18} sm:size={24} fill="currentColor" className="mb-0.5 sm:mb-1" />
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none">Bot Active</span>
                </motion.div>

                {/* Floating UI Elements */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: 999999, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -top-10 sm:-top-12 -left-4 sm:-left-12 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 p-3 sm:p-5 rounded-2xl sm:rounded-[2.5rem] shadow-2xl flex items-center gap-2 sm:gap-4 z-20"
                >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                        <Check size={20} sm:size={28} strokeWidth={3} />
                    </div>
                    <div className="text-left">
                        <p className="text-[8px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-0.5">Success</p>
                        <p className="text-white font-bold text-xs sm:text-base">₦12.5k Paid</p>
                    </div>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: 999999, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 sm:-bottom-10 -right-4 sm:-right-12 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-2xl flex flex-col gap-3 sm:gap-4 z-20"
                >
                    <div className="flex items-center gap-2 sm:gap-3">
                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                            <Wifi size={12} sm:size={16} className="text-brand-400 rotate-90" />
                         </div>
                         <p className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest">Handshaking...</p>
                    </div>
                    <div className="h-1 sm:h-1.5 w-24 sm:w-32 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ x: ['-100%', '100%'] }} 
                            transition={{ duration: 1.5, repeat: 999999, ease: "linear" }}
                            className="h-full w-1/2 bg-brand-500 rounded-full" 
                        />
                    </div>
                </motion.div>
            </div>
            
            {/* Ambient Background Circles */}
            <div className="absolute inset-0 z-0 overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full opacity-50" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-white/5 rounded-full opacity-30" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};