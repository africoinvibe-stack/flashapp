import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Award } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-16 sm:py-24 bg-dark-950 relative overflow-hidden">
       {/* Background Glows */}
       <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-600/5 blur-[120px] rounded-full pointer-events-none" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
           
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-center lg:text-left"
           >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-6">
                <Award size={14} /> The GOI Factor
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl mb-6 leading-tight italic uppercase tracking-tighter">
                Institutional <br />
                <span className="gradient-text">Heritage.</span>
              </h2>
              <div className="space-y-6 text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
                <p>
                  Flash is the digital manifestation of a larger vision. We operate under the standards of <span className="text-white underline decoration-brand-500/30">God's Own Institute</span>.
                </p>
                <p>
                  By applying the <strong>GOI Factor</strong>, we've built a system that flows freely between chains and borders.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10 text-left">
                 <div className="p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-white/5 border border-white/5 group hover:border-brand-500/30 transition-colors">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tighter italic">50K+</div>
                    <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest">Active Users</div>
                 </div>
                 <div className="p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-white/5 border border-white/5 group hover:border-brand-500/30 transition-colors">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tighter italic">$12M+</div>
                    <div className="text-[8px] sm:text-[10px] text-slate-500 uppercase font-black tracking-widest">Monthly Vol</div>
                 </div>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative pt-12 lg:pt-0"
           >
              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
                 <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                    <div className="bg-dark-900 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-electric-500/5 blur-2xl rounded-full" />
                       <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-electric-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                       <h4 className="font-black text-white mb-1 sm:mb-2 uppercase italic tracking-tighter text-base sm:text-lg">Borderless</h4>
                       <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Global access without geographical node boundaries.</p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] shadow-2xl text-slate-950 group">
                       <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                       <h4 className="font-black mb-1 sm:mb-2 uppercase italic tracking-tighter text-base sm:text-lg">Instant</h4>
                       <p className="text-[10px] sm:text-xs text-slate-950/70 font-bold">Settlement measured in milliseconds.</p>
                    </div>
                 </div>
                 <div className="space-y-3 sm:space-y-4">
                    <div className="bg-dark-800 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                        <div className="flex gap-1.5 mb-4 sm:mb-6">
                            <div className="w-1.5 h-6 sm:w-2 sm:h-8 bg-slate-700 rounded-full" />
                            <div className="w-1.5 h-10 sm:w-2 sm:h-12 bg-brand-500 rounded-full" />
                            <div className="w-1.5 h-5 sm:w-2 sm:h-6 bg-slate-700 rounded-full" />
                        </div>
                       <h4 className="font-black text-white mb-1 sm:mb-2 uppercase italic tracking-tighter text-base sm:text-lg">GOI Growth</h4>
                       <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Tools to scale wealth via the Institute blueprint.</p>
                    </div>
                    <div className="bg-dark-900 p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl group">
                       <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                       <h4 className="font-black text-white mb-1 sm:mb-2 uppercase italic tracking-tighter text-base sm:text-lg">Secure</h4>
                       <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Bank-grade encryption meets audited protocols.</p>
                    </div>
                 </div>
              </div>
           </motion.div>

         </div>
       </div>
    </section>
  );
};