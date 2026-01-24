import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-24 bg-dark-950 relative overflow-hidden">
       {/* Background Glows */}
       <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-600/5 blur-[120px] rounded-full pointer-events-none" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
           
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span>The Mission</span>
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 leading-tight">
                Bridging the <br />
                <span className="gradient-text">Digital Divide</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  We believe liquidity shouldn't be locked behind complex exchanges or slow banking rails. 
                  Flash was born from a simple frustration: <span className="text-white font-medium">Why is spending crypto so hard?</span>
                </p>
                <p>
                  We are building the financial operating system for the crypto-native generation. 
                  A world where assets flow freely between chains, currencies, and borders without friction.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">50K+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Active Users</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">$12M+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Processed Monthly</div>
                 </div>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                 <div className="space-y-4 mt-8">
                    <div className="bg-dark-900 p-6 rounded-3xl border border-white/10 shadow-xl">
                       <Globe className="w-8 h-8 text-electric-400 mb-4" />
                       <h4 className="font-bold text-white mb-2">Borderless</h4>
                       <p className="text-xs text-slate-400">Global access without geographical restrictions.</p>
                    </div>
                    <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-6 rounded-3xl shadow-xl text-slate-900">
                       <Zap className="w-8 h-8 text-white mb-4" />
                       <h4 className="font-bold text-white mb-2">Instant</h4>
                       <p className="text-xs text-white/80">Settlement speeds measured in milliseconds, not days.</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="bg-dark-800 p-6 rounded-3xl border border-white/5">
                        {/* Abstract visual */}
                        <div className="flex gap-2 mb-4">
                            <div className="w-2 h-8 bg-slate-700 rounded-full" />
                            <div className="w-2 h-12 bg-brand-500 rounded-full" />
                            <div className="w-2 h-6 bg-slate-700 rounded-full" />
                        </div>
                       <h4 className="font-bold text-white mb-2">Growth</h4>
                       <p className="text-xs text-slate-400">Tools designed to scale with your wealth.</p>
                    </div>
                    <div className="bg-dark-900 p-6 rounded-3xl border border-white/10 shadow-xl">
                       <Shield className="w-8 h-8 text-green-400 mb-4" />
                       <h4 className="font-bold text-white mb-2">Secure</h4>
                       <p className="text-xs text-slate-400">Bank-grade encryption and audited smart contracts.</p>
                    </div>
                 </div>
              </div>
           </motion.div>

         </div>
       </div>
    </section>
  );
};