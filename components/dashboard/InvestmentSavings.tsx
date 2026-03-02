import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, BarChart3, ShieldCheck, ArrowRight, Sparkles, Wallet, Globe, Lock } from 'lucide-react';

export const InvestmentSavings: React.FC = () => {
  const features = [
    {
      title: "High-Yield Savings",
      description: "Earn up to 15% APY on your stablecoins and fiat balances with daily compounding interest.",
      icon: <PiggyBank className="w-6 h-6 text-emerald-400" />,
      color: "emerald"
    },
    {
      title: "Global Stock Markets",
      description: "Invest in US and International stocks directly from your wallet with fractional shares.",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Crypto Staking",
      description: "Put your idle crypto assets to work and earn rewards through secure on-chain staking.",
      icon: <TrendingUp className="w-6 h-6 text-brand-400" />,
      color: "brand"
    },
    {
      title: "Fixed Deposits",
      description: "Lock your funds for a fixed period and enjoy guaranteed higher returns with zero risk.",
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      color: "purple"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 via-dark-900 to-dark-950 border border-white/5 p-8 md:p-12">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BarChart3 size={240} className="text-brand-400" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} />
            <span>Coming Soon</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6 italic leading-tight"
          >
            Grow Your Wealth <br />
            <span className="gradient-text">Automatically.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 mb-8 leading-relaxed"
          >
            We're building a seamless way for you to save, invest, and compound your wealth across fiat and crypto markets. High-yield returns meet institutional-grade security.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="px-8 py-4 rounded-2xl bg-brand-500 text-dark-950 font-black text-sm uppercase tracking-widest hover:bg-brand-400 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 group">
              Join the Waitlist
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
              <ShieldCheck size={18} className="text-emerald-400" />
              NDIC & SEC Insured
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 4) }}
            className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Teaser Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-8 rounded-[2.5rem] bg-dark-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
            <Wallet size={40} className="text-brand-400" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">Smart Portfolio Management</h4>
            <p className="text-slate-500 text-sm">AI-driven insights to help you rebalance your assets for maximum returns.</p>
          </div>
        </div>
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-dark-900 bg-dark-800 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                alt="User" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-dark-900 bg-brand-500 flex items-center justify-center text-dark-950 text-xs font-black">
            +2k
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-center text-slate-600 text-[10px] uppercase tracking-[0.2em] font-medium">
        Investment products involve risk. Terms and conditions apply. Launching Q3 2026.
      </p>
    </div>
  );
};
