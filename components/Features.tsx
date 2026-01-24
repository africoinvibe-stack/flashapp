import React from 'react';
import { TrendingUp, Zap, Percent, Layers, Send, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <TrendingUp className="w-6 h-6 text-brand-400" />,
    title: "Higher Limits",
    description: "Trade $2K to $500K monthly based on verification tier. Your volume shouldn't be capped by arbitrary limits."
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-400" />,
    title: "Instant Liquidity",
    description: "From USDT in your wallet to USD on your card in 60 seconds. Your crypto should move as fast as you do."
  },
  {
    icon: <Percent className="w-6 h-6 text-brand-400" />,
    title: "Transparent Pricing",
    description: "1.5% conversion fees. Zero Flash-to-Flash transfer fees. No hidden spreads. Keep more of what you earn."
  },
  {
    icon: <Layers className="w-6 h-6 text-electric-400" />,
    title: "Your Chains. Your Choice.",
    description: "USDC on Polygon. USDT on Tron. Native Bitcoin. We support the networks that make sense for your workflow."
  },
  {
    icon: <Send className="w-6 h-6 text-electric-400" />,
    title: "Send Money Like Messages",
    description: "Pay your team or split bills in USDC. Instant. Zero fees. No minimums. The way payments should work."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-electric-400" />,
    title: "Card Convenience",
    description: "Pay for AWS, Meta ads, or ChatGPT. Your virtual dollar card is loaded while the blockchain is still settling."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-dark-900 relative">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/10 via-dark-900 to-dark-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            The Same Tools <span className="gradient-text">Institutions Use</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Flash was built for where you're going, not where you've been. 
            Level the playing field with professional-grade infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 group border-l-2 border-l-transparent hover:border-l-brand-400"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};