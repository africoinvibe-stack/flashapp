import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/Button';

export const Narrative: React.FC = () => {
  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
        {/* Background Accents */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-brand-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-electric-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Part 1: The Problem */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-400 font-medium mb-4 uppercase tracking-wider text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>The Reality</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6 leading-tight">
              Holding Crypto Shouldn't Mean <br />
              <span className="text-white">You Can't Spend It.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              You've got USDT. Your client needs payment now. Your vendor wants dollars. Your team expects salaries.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed border-l-4 border-white/10 pl-4">
              Traditional platforms make you wait days for card funding. They cap your trading at amounts that don't match your reality. They charge fees that eat into your margins.
            </p>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-electric-500/20 rounded-2xl blur-xl" />
             <div className="relative bg-dark-900 border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-slate-800" />
                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                </div>
                <div className="space-y-4">
                    <div className="h-24 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col justify-center">
                        <span className="text-red-400 font-medium mb-1">Transaction Failed</span>
                        <span className="text-red-300/60 text-sm">Daily limit exceeded ($1,000.00)</span>
                    </div>
                    <div className="h-24 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex flex-col justify-center">
                        <span className="text-yellow-400 font-medium mb-1">Funding Pending</span>
                        <span className="text-yellow-300/60 text-sm">Estimated arrival: 2-3 Business Days</span>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Story Part 2: The Scale Up */}
        <div className="grid lg:grid-cols-12 gap-12 mb-32">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
                 <div className="h-full bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 blur-[80px]" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-slate-400">Level 1</span>
                                <span className="text-white font-mono">$25,000 Limit</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-slate-400">Level 2</span>
                                <span className="text-white font-mono">$100,000 Limit</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-brand-500/20 rounded-xl border border-brand-500/50">
                                <span className="text-brand-100 font-bold">Level 3</span>
                                <span className="text-brand-100 font-mono font-bold">$500,000 Limit</span>
                            </div>
                        </div>
                        <div className="mt-8">
                             <p className="text-sm text-slate-500 italic">"Your ceiling is your verification level, not our arbitrary rules."</p>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
                 <div className="inline-flex items-center gap-2 text-electric-400 font-medium mb-4 uppercase tracking-wider text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Built for Scale</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl mb-6">
                    Your Volume Outgrew <br />
                    <span className="text-white">Your Platform.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-6">
                    When you started, $1,000 daily limits felt fine. Now you're trading serious volume. 
                    You're splitting transactions across multiple days and using three different platforms.
                </p>
                <p className="text-white text-xl font-medium mb-8">
                    Start at $2K monthly with just your phone number. Verify your BVN in 5 minutes, unlock $25K. Complete KYC, trade $100K. Run a business? Scale to $500K.
                </p>
                <div className="flex gap-4">
                    <Button variant="secondary">Start Scaling</Button>
                </div>
            </div>
        </div>

        {/* Story Part 3: The Fees */}
        <div className="bg-dark-900 border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="font-display font-bold text-3xl mb-4">Death by a Thousand Fees</h2>
                <p className="text-slate-400 text-lg mb-8">
                    3% here. 5% there. FX spread hidden in the rate. Network markups you didn't notice. 
                    You're moving $50K monthly. That's <span className="text-red-400 font-bold">$1,500-$2,500</span> just evaporating. Every single month.
                </p>
                <div className="inline-block p-1 rounded-full bg-gradient-to-r from-brand-400 to-electric-400">
                    <div className="bg-dark-950 rounded-full px-8 py-3">
                         <span className="font-bold text-white tracking-wide">Flash flips that equation.</span>
                    </div>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};