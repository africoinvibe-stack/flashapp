import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Bot, ShieldCheck, Zap, Infinity as InfinityIcon, Cpu, Activity, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/Button';

export const AIP2PSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-dark-950 relative overflow-hidden">
      {/* Neural Background Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side: The Neural Engine */}
          <div className="relative order-2 lg:order-1 pt-12 lg:pt-0">
             <div className="relative w-full max-w-[280px] xs:max-w-sm sm:max-w-lg mx-auto aspect-square">
                {/* Rotating Rings */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: 999999, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-sky-500/20 border-dashed" 
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: 999999, ease: "linear" }}
                    className="absolute inset-4 sm:inset-8 rounded-full border border-brand-500/10 border-dashed" 
                />

                {/* Central AI Hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 sm:w-48 sm:h-48 bg-dark-900 rounded-[2rem] sm:rounded-[3rem] border border-white/10 flex items-center justify-center relative shadow-2xl backdrop-blur-xl"
                    >
                        <div className="absolute inset-0 bg-brand-500/5 blur-3xl rounded-full animate-pulse" />
                        <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-brand-400 fill-brand-400/10 relative z-10" />
                        
                        {/* Orbiting Data Nodes */}
                        {[0, 72, 144, 216, 288].map((deg, i) => (
                            <motion.div
                                key={i}
                                animate={{ rotate: [deg, deg + 360] }}
                                transition={{ duration: 10, repeat: 999999, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-dark-800 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                                    {i % 2 === 0 ? <ShieldCheck size={14} className="text-emerald-400" /> : <Zap size={14} className="text-brand-400" />}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* AI Log Terminal Mockup */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-4 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-full max-w-sm bg-slate-900/90 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl z-20"
                >
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/50" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest">Neural_P2P_Engine v2.4</span>
                    </div>
                    <div className="space-y-1 sm:space-y-1.5 font-mono text-[9px] sm:text-[11px]">
                        <p className="text-emerald-400">{'>> Scanning global nodes...'}</p>
                        <p className="text-brand-400">{'>> Matching: 5,000 USDT'}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-slate-400">{'>> Node verified'}</p>
                            <span className="text-emerald-500"> [OK]</span>
                        </div>
                        <motion.p 
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, repeat: 999999 }}
                            className="text-white bg-brand-500/20 px-1 inline-block"
                        >
                            {'>> Executing Handshake_'}
                        </motion.p>
                    </div>
                </motion.div>
             </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-400 mb-6">
                    <Bot size={14} /> Autonomous P2P
                </div>
                <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl mb-6 leading-tight italic uppercase tracking-tighter">
                  Let the AI <br />
                  <span className="gradient-text">Trade for You.</span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 mb-8 sm:mb-10 leading-relaxed font-medium">
                  Traditional P2P is slow and risky. Flash replaces human error with <span className="text-white underline decoration-brand-500/30">Neural Liquidity Nodes</span>.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 text-left">
                   <div className="space-y-2 sm:space-y-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-400">
                         <Activity size={20} />
                      </div>
                      <h4 className="text-white font-bold text-base sm:text-lg">Smart Rate Discovery</h4>
                      <p className="text-slate-500 text-xs sm:text-sm">Secures the most efficient handshake rate for your assets.</p>
                   </div>
                   <div className="space-y-2 sm:space-y-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                         <InfinityIcon size={20} />
                      </div>
                      <h4 className="text-white font-bold text-base sm:text-lg">Autonomous Release</h4>
                      <p className="text-slate-500 text-xs sm:text-sm">Once payment is detected, the AI releases crypto instantly.</p>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                   <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10" icon={<ArrowLeftRight size={20} />}>Start Auto-Trading</Button>
                   <div className="flex items-center gap-3 px-6 py-3 border border-white/5 bg-white/5 rounded-full">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-dark-950 bg-slate-800" />)}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">2.4k Bots Active</span>
                   </div>
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};