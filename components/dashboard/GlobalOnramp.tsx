import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Loader2,
  DollarSign,
  Smartphone,
  Info
} from 'lucide-react';

interface GlobalOnrampProps {
  onBack: () => void;
  onSuccess: (amount: number) => void;
}

type OnrampStep = 'provider' | 'config' | 'loading' | 'success';

const PROVIDERS = [
  { id: 'onramper', name: 'Onramper', logo: '⚡', desc: 'Best rates globally', speed: '2-5 mins' },
  { id: 'moonpay', name: 'MoonPay', logo: '🌙', desc: 'Instant card delivery', speed: '1-3 mins' },
  { id: 'transak', name: 'Transak', logo: '💎', desc: 'Low fees for bank transfers', speed: '5-10 mins' },
];

const COUNTRIES = [
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
];

export const GlobalOnramp: React.FC<GlobalOnrampProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState<OnrampStep>('provider');
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0]);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [amount, setAmount] = useState('100');

  const handleContinue = () => {
    if (step === 'provider') setStep('config');
    else if (step === 'config') {
      setStep('loading');
      setTimeout(() => {
        setStep('success');
        onSuccess(parseFloat(amount));
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'provider' && (
          <motion.div
            key="provider"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-display font-bold text-white italic">Select <span className="gradient-text">Provider</span></h2>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Global Stablecoin Onramp</p>
              </div>
            </div>

            <div className="grid gap-4">
              {PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider)}
                  className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all text-left group ${
                    selectedProvider.id === provider.id 
                      ? 'bg-brand-500/10 border-brand-500/50 shadow-lg shadow-brand-500/10' 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-dark-950 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                      {provider.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{provider.name}</h3>
                      <p className="text-slate-400 text-sm">{provider.desc}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Zap size={12} className="text-brand-400" />
                        <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">{provider.speed}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedProvider.id === provider.id ? 'border-brand-500 bg-brand-500' : 'border-white/10'
                  }`}>
                    {selectedProvider.id === provider.id && <CheckCircle2 size={14} className="text-slate-950" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 bg-brand-500 text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-8"
            >
              Continue with {selectedProvider.name} <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setStep('provider')} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-display font-bold text-white italic">Configure <span className="gradient-text">Purchase</span></h2>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Buy USDT via {selectedProvider.name}</p>
              </div>
            </div>

            <div className="bg-dark-900 border border-white/5 rounded-[2.5rem] p-8 space-y-8">
              {/* Amount Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount to Buy (USD)</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-400">
                    <DollarSign size={24} />
                  </div>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-dark-950 border border-white/10 rounded-2xl px-16 py-5 text-3xl font-mono font-black text-white focus:border-brand-500 outline-none transition-all" 
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-white">USDT</span>
                  </div>
                </div>
              </div>

              {/* Country Selector */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Country</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCountry(c)}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                        selectedCountry.code === c.code 
                          ? 'bg-brand-500/10 border-brand-500/50 text-white' 
                          : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{c.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                      paymentMethod === 'card' 
                        ? 'bg-brand-500/10 border-brand-500/50 text-white' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard size={20} className={paymentMethod === 'card' ? 'text-brand-400' : 'text-slate-500'} />
                    <div className="text-left">
                      <p className="text-xs font-bold">Debit/Credit Card</p>
                      <p className="text-[9px] opacity-50 uppercase font-black">Instant</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                      paymentMethod === 'bank' 
                        ? 'bg-brand-500/10 border-brand-500/50 text-white' 
                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <Building2 size={20} className={paymentMethod === 'bank' ? 'text-brand-400' : 'text-slate-500'} />
                    <div className="text-left">
                      <p className="text-xs font-bold">Bank Transfer</p>
                      <p className="text-[9px] opacity-50 uppercase font-black">Lower Fees</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-4 flex items-start gap-3">
              <Info size={18} className="text-brand-400 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                You will be redirected to {selectedProvider.name} to complete your KYC and payment. Flash does not store your card details.
              </p>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-5 bg-brand-500 text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Buy {amount} USDT <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 rounded-3xl bg-dark-900 border border-white/10 flex items-center justify-center shadow-2xl">
                <Loader2 size={48} className="text-brand-400 animate-spin" />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4 italic">Connecting to <span className="gradient-text">{selectedProvider.name}</span></h2>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Please wait while we secure your transaction session. Do not close this window.
            </p>
            <div className="mt-12 flex items-center gap-4 text-slate-500">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">PCI-DSS Compliant</span>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center py-10">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-4 italic">Purchase <span className="text-emerald-400">Successful</span></h2>
              <p className="text-slate-400 text-lg">USDT credited to your Flash wallet</p>
            </div>

            <div className="bg-dark-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Transaction Receipt</span>
                <span className="text-[10px] font-mono text-slate-500">REF: ONR-{Math.floor(Math.random()*900000 + 100000)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Amount Purchased</span>
                  <span className="text-lg font-mono font-black text-white">{amount} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Provider Used</span>
                  <span className="text-sm font-bold text-white">{selectedProvider.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Payment Method</span>
                  <span className="text-sm font-bold text-white capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Network Fee</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">≈ $1.20</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Instant Settlement</p>
                    <p className="text-[10px] text-slate-500">Your balance has been updated across all hubs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onBack}
                className="py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all"
              >
                Go to Wallet
              </button>
              <button
                onClick={() => setStep('provider')}
                className="py-5 bg-brand-500 text-slate-950 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Buy More
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
