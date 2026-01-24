import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Wallet, CreditCard, Zap } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Initialize Account",
    desc: "Create your Flash identity in 30 seconds. No paperwork, just digital verification.",
    icon: <UserPlus className="w-6 h-6 text-brand-400" />,
    color: "border-brand-500"
  },
  {
    id: 2,
    title: "Connect Assets",
    desc: "Generate your multi-chain wallet address. Deposit USDT, BTC, or USDC instantly.",
    icon: <Wallet className="w-6 h-6 text-electric-400" />,
    color: "border-electric-500"
  },
  {
    id: 3,
    title: "Virtualize Fiat",
    desc: "Create a Virtual USD or NGN card. Your crypto collateral is converted in real-time.",
    icon: <CreditCard className="w-6 h-6 text-purple-400" />,
    color: "border-purple-500"
  },
  {
    id: 4,
    title: "Execute Spending",
    desc: "Transact globally. Online, offline, anywhere. Earn rewards on every execution.",
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
    color: "border-emerald-500"
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Circuitry */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%">
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10 h80 v80 h-80 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" className="text-white" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse" />
            System Protocol
          </motion.div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            How Flash <span className="gradient-text">Executes</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From cold storage to hot spending in four seamless operations. 
            Automated, encrypted, and instant.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 group"
              >
                <div className={`bg-dark-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-white/30 hover:transform hover:-translate-y-2`}>
                  
                  {/* Step Number Background */}
                  <span className="absolute -right-4 -bottom-8 text-9xl font-display font-bold text-white/5 z-0 group-hover:text-white/10 transition-colors">
                    0{step.id}
                  </span>

                  <div className={`w-14 h-14 rounded-2xl bg-dark-950 border-2 ${step.color} flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:shadow-brand-500/20`}>
                    {step.icon}
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-white mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </div>
                
                {/* Mobile Connector */}
                <div className="lg:hidden absolute left-1/2 bottom-[-32px] w-0.5 h-8 bg-white/10 -translate-x-1/2 last:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};