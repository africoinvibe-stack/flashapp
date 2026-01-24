import React from 'react';
import { Button } from './ui/Button';
import { Users, Store, Zap } from 'lucide-react';

interface AgentCTAProps {
  onSignUp: () => void;
}

export const AgentCTA: React.FC<AgentCTAProps> = ({ onSignUp }) => {
  return (
    <section className="py-24 relative">
       <div className="absolute inset-0 bg-brand-500" style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
       </div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-slate-950">
                    <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">
                        Empower Your Community. <br/>
                        Grow Your Business.
                    </h2>
                    <p className="text-slate-900/80 text-xl font-medium mb-8 max-w-lg">
                        Become a FlashPay agent. Provide essential financial services, earn commissions, and attract more foot traffic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={onSignUp}
                            className="px-8 py-4 bg-slate-950 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-xl"
                        >
                            Start Trading in 5 Minutes
                        </button>
                        <button className="px-8 py-4 bg-white/20 text-slate-900 font-bold rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm border border-slate-900/10">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">Earn Commissions</h3>
                        <p className="text-slate-600 text-sm">Competitive rates on every deposit you process for your local community.</p>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <Store className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">More Customers</h3>
                        <p className="text-slate-600 text-sm">Become a financial hub and increase foot traffic to your physical business.</p>
                    </div>

                    <div className="sm:col-span-2 bg-white/90 backdrop-blur rounded-2xl p-6 shadow-xl flex items-center gap-6">
                         <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Zap className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                             <h3 className="font-bold text-lg text-slate-900 mb-1">Instant Settlement</h3>
                             <p className="text-slate-600 text-sm">No waiting for payouts. Your wallet is credited instantly.</p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </section>
  );
};