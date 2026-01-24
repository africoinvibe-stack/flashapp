import React from 'react';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { CardVisual } from './CardVisual';
import { motion } from 'framer-motion';

interface HeroProps {
  onSignUp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignUp }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients - Balanced Tech Blue & Brand Amber */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-electric-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-brand-100">Trade $2K to $500K Monthly</span>
            </div>
            
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
              Your Crypto <br />
              <span className="gradient-text">Shouldn't Be Stuck.</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              The fastest way to turn your USDT, BTC, or USDC into spendable money. 
              Virtual cards, instant transfers, and trading limits that scale with you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                onClick={onSignUp}
                variant="secondary" 
                size="lg" 
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Create Free Account
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400" />
                <span>Instant Liquidity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400" />
                <span>Instituional Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-400" />
                <span>Zero Hidden Spreads</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <CardVisual />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};