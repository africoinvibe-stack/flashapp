import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Building2, ChevronRight, CheckCircle2, Loader2, Globe, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ForexFundingProps {
    onBack: () => void;
}

const BROKERS = [
    { id: 'xtb', name: 'XTB', logo: 'https://logo.clearbit.com/xtb.com', color: 'bg-orange-500', desc: 'Global Forex & CFD Broker' },
    { id: 'roqqu', name: 'Roqqu', logo: 'https://logo.clearbit.com/roqqu.com', color: 'bg-blue-600', desc: 'Crypto & Fiat Gateway' },
    { id: 'capital', name: 'Capital.com', logo: 'https://logo.clearbit.com/capital.com', color: 'bg-slate-800', desc: 'Award-winning Trading Platform' },
    { id: 'vantage', name: 'Vantage', logo: 'https://logo.clearbit.com/vantagemarkets.com', color: 'bg-red-600', desc: 'Multi-asset Institutional Trading' },
    { id: 'tradezero', name: 'TradeZero', logo: 'https://logo.clearbit.com/tradezero.co', color: 'bg-emerald-600', desc: 'Professional Stock Trading' },
];

export const ForexFunding: React.FC<ForexFundingProps> = ({ onBack }) => {
    const [step, setStep] = useState<'select' | 'details' | 'confirm' | 'processing' | 'success'>('select');
    const [selectedBroker, setSelectedBroker] = useState<typeof BROKERS[0] | null>(null);
    const [amount, setAmount] = useState('');
    const [accountId, setAccountId] = useState('');

    const handleNext = () => {
        if (step === 'select') setStep('details');
        else if (step === 'details') setStep('confirm');
        else if (step === 'confirm') {
            setStep('processing');
            setTimeout(() => setStep('success'), 3000);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'select':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">Forex Funding</h3>
                            <p className="text-slate-500 text-xs uppercase font-black tracking-[0.2em]">Direct Broker Settlement</p>
                        </div>
                        <div className="grid gap-4">
                            {BROKERS.map((broker) => (
                                <button 
                                    key={broker.id}
                                    onClick={() => { setSelectedBroker(broker); setStep('details'); }}
                                    className="flex items-center justify-between p-6 bg-dark-900 border border-white/5 rounded-[2rem] hover:border-brand-500/50 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl ${broker.color} flex items-center justify-center overflow-hidden shadow-xl group-hover:scale-110 transition-transform p-3`}>
                                            <img 
                                                src={broker.logo} 
                                                alt={broker.name} 
                                                className="w-full h-full object-contain filter brightness-0 invert"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-white uppercase tracking-tight text-lg italic">{broker.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{broker.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-600 group-hover:text-brand-400 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 'details':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <div className={`w-20 h-20 rounded-3xl ${selectedBroker?.color} flex items-center justify-center mx-auto shadow-2xl mb-4 p-4 overflow-hidden`}>
                                <img 
                                    src={selectedBroker?.logo} 
                                    alt={selectedBroker?.name} 
                                    className="w-full h-full object-contain filter brightness-0 invert"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">Fund {selectedBroker?.name}</h3>
                            <p className="text-slate-500 text-xs uppercase font-black tracking-widest">Enter account details</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Broker Account ID / Email</label>
                                <input 
                                    type="text" 
                                    value={accountId}
                                    onChange={(e) => setAccountId(e.target.value)}
                                    placeholder="e.g. 8829102 or user@email.com"
                                    className="w-full bg-dark-950 border border-white/10 rounded-2xl px-6 py-5 text-white font-bold focus:border-brand-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount to Fund (NGN)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-dark-950 border border-white/10 rounded-2xl px-14 py-6 text-3xl font-mono font-black text-white focus:border-brand-500 outline-none transition-all"
                                    />
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 text-xl font-black">₦</div>
                                </div>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest ml-1">Settlement via Flash NGN Hub</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep('select')} className="flex-1 py-5 rounded-2xl border-white/10 text-slate-500 font-black uppercase text-[10px] tracking-widest">Back</Button>
                            <Button onClick={handleNext} disabled={!amount || !accountId} className="flex-[2] py-5 rounded-2xl bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand-500/20">Continue</Button>
                        </div>
                    </div>
                );

            case 'confirm':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">Confirm Deposit</h3>
                            <p className="text-slate-500 text-xs uppercase font-black tracking-widest">Protocol Handshake Verification</p>
                        </div>

                        <div className="bg-dark-900 border border-white/5 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
                            
                            <div className="text-center space-y-2">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Funding Amount</p>
                                <h2 className="text-6xl font-mono font-black text-white tracking-tighter italic">
                                    ₦{parseFloat(amount).toLocaleString()}
                                </h2>
                            </div>

                            <div className="space-y-5 pt-8 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Broker</span>
                                    <span className="text-white font-black text-sm uppercase italic">{selectedBroker?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account ID</span>
                                    <span className="text-white font-mono font-bold text-sm">{accountId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Network Fee</span>
                                    <span className="text-emerald-400 font-black text-sm uppercase tracking-widest">Zero Fee</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SLA</span>
                                    <span className="text-brand-400 font-black text-[10px] uppercase tracking-widest">Instant Settlement</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep('details')} className="flex-1 py-5 rounded-2xl border-white/10 text-slate-500 font-black uppercase text-[10px] tracking-widest">Edit</Button>
                            <Button onClick={handleNext} className="flex-[2] py-5 rounded-2xl bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-brand-500/20">Execute Funding</Button>
                        </div>
                    </div>
                );

            case 'processing':
                return (
                    <div className="text-center space-y-10 py-16">
                        <div className="relative w-40 h-40 mx-auto">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-[6px] border-brand-500/10 border-t-brand-500 shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Zap className="w-16 h-16 text-brand-500 animate-pulse" fill="currentColor" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter animate-pulse">Connecting Network...</h3>
                            <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">Cryptographic Broker Handshake</p>
                        </div>
                    </div>
                );

            case 'success':
                return (
                    <div className="text-center space-y-12 py-10">
                        <div className="relative">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.6 }}
                                className="w-40 h-40 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_100px_rgba(16,185,129,0.3)] border-[12px] border-emerald-500/20"
                            >
                                <ShieldCheck size={80} className="text-white" strokeWidth={2.5} />
                            </motion.div>
                        </div>

                        <div className="space-y-5">
                            <h3 className="text-6xl font-display font-black text-white italic uppercase tracking-tighter">Settled!</h3>
                            <p className="text-emerald-400 font-mono text-4xl font-black">
                                ₦{parseFloat(amount).toLocaleString()}
                            </p>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">Successfully funded <span className="text-white font-black uppercase italic">{selectedBroker?.name}</span> account <span className="text-white font-mono">{accountId}</span>.</p>
                        </div>

                        <div className="flex flex-col gap-4 max-w-sm mx-auto">
                            <Button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">Download Protocol Receipt</Button>
                            <Button onClick={onBack} className="w-full py-5 rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-500/20">Back to Wallet</Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
