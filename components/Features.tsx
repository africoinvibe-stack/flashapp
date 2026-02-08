import React from 'react';
import { TrendingUp, Zap, Percent, Layers, Send, Smartphone, Store, ShieldCheck, Cpu, Brain, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-brand-400" />,
    title: "Neural P2P Hub",
    description: "Our AI engine matches orders instantly, automates escrow release, and eliminates the 15-minute wait for crypto sellers.",
    badge: "Autonomous"
  },
  {
    icon: <Store className="w-6 h-6 text-emerald-400" />,
    title: "Merchant Terminal",
    description: "Accept crypto at your physical store as easily as cash. Handshake protocol ensures instant settlement into your business wallet.",
    badge: "B2B Node"
  },
  {
    icon: <Smartphone className="w-6 h-6 text-brand-400" />,
    title: "Tap-to-Spend",
    description: "Use your Flash wallet at any certified merchant terminal. Digital assets converted to local fiat via NFC handshake in milliseconds.",
    badge: "Contactless"
  },
  {
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    title: "AI Escrow Hub",
    description: "All transactions are bridged via our proprietary AI risk engine, protecting both merchant and customer from volatility and fraud.",
    badge: "Security"
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    title: "Omni-Asset Flow",
    description: "USDC on Polygon, USDT on Tron, or Native Bitcoin. One unified terminal interface handles all chains seamlessly.",
    badge: "Multi-Chain"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    title: "Institutional Limits",
    description: "High-volume infrastructure supporting $2K to $500K monthly limits. Scalability built for enterprises and heavy spenders.",
    badge: "Scale"
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Cyberpunk Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-900/10 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-6"
          >
            Core Infrastructure
          </motion.div>
          <h2 className="font-display font-black text-5xl sm:text-7xl mb-6 uppercase italic tracking-tighter">
            Next Gen <span className="gradient-text">Financial Hub</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Flash isn't just a wallet. It's a high-performance network connecting the liquid economy with real-world retail nodes through AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 hover:border-brand-500/30 transition-all duration-500 group relative overflow-hidden shadow-2xl"
            >
              {/* Feature Badge */}
              <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all">
                  {feature.badge}
              </div>

              <div className="w-16 h-16 bg-slate-950 border border-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                {feature.icon}
              </div>
              <h3 className="font-display font-black text-2xl mb-4 text-white uppercase italic tracking-tighter">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-base font-medium group-hover:text-slate-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};