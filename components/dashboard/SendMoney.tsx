import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, User, Building2, Wallet, ChevronRight, CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface SendMoneyProps {
    onBack: () => void;
    initialMode?: 'id' | 'bank' | 'crypto';
}

export const SendMoney: React.FC<SendMoneyProps> = ({ onBack, initialMode = 'id' }) => {
    const [step, setStep] = useState<'select' | 'details' | 'confirm' | 'processing' | 'success'>('select');
    const [mode, setMode] = useState<'id' | 'bank' | 'crypto'>(initialMode);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [note, setNote] = useState('');
    const [selectedBank, setSelectedBank] = useState('');

    const handleNext = () => {
        if (step === 'select') setStep('details');
        else if (step === 'details') setStep('confirm');
        else if (step === 'confirm') {
            setStep('processing');
            setTimeout(() => setStep('success'), 2500);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 'select':
                return (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">Choose Destination</h3>
                            <p className="text-slate-500 text-xs uppercase font-black">Where are you sending to?</p>
                        </div>
                        <div className="grid gap-4">
                            <button 
                                onClick={() => { setMode('id'); setStep('details'); }}
                                className="flex items-center justify-between p-6 bg-dark-900 border border-white/5 rounded-3xl hover:border-brand-500/50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                                        <User size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-white">Flash ID</p>
                                        <p className="text-xs text-slate-500">Instant & Free internal transfer</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>

                            <button 
                                onClick={() => { setMode('bank'); setStep('details'); }}
                                className="flex items-center justify-between p-6 bg-dark-900 border border-white/5 rounded-3xl hover:border-emerald-500/50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                        <Building2 size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-white">Bank Account</p>
                                        <p className="text-xs text-slate-500">Send to any local bank</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>

                            <button 
                                onClick={() => { setMode('crypto'); setStep('details'); }}
                                className="flex items-center justify-between p-6 bg-dark-900 border border-white/5 rounded-3xl hover:border-violet-500/50 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                                        <Wallet size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-white">Crypto Wallet</p>
                                        <p className="text-xs text-slate-500">External blockchain transfer</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>
                        </div>
                    </div>
                );

            case 'details':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">
                                {mode === 'id' ? 'Send to Flash ID' : mode === 'bank' ? 'Send to Bank' : 'Send to Crypto'}
                            </h3>
                            <p className="text-slate-500 text-xs uppercase font-black">Enter transaction details</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Recipient</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder={mode === 'id' ? '@username' : mode === 'bank' ? 'Account Number' : 'Wallet Address'}
                                        className="w-full bg-dark-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-brand-500 outline-none transition-all"
                                    />
                                    {mode === 'id' && <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />}
                                </div>
                            </div>

                            {mode === 'bank' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select Bank</label>
                                    <select 
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="w-full bg-dark-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-brand-500 outline-none transition-all appearance-none"
                                    >
                                        <option value="">Choose a bank</option>
                                        <option value="zenith">Zenith Bank</option>
                                        <option value="gtb">GTBank</option>
                                        <option value="access">Access Bank</option>
                                        <option value="kuda">Kuda Bank</option>
                                    </select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-dark-950 border border-white/10 rounded-2xl px-12 py-5 text-2xl font-mono font-black text-white focus:border-brand-500 outline-none transition-all"
                                    />
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                                        {mode === 'crypto' ? '$' : '₦'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Note (Optional)</label>
                                <input 
                                    type="text" 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="What's this for?"
                                    className="w-full bg-dark-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-brand-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep('select')} className="flex-1 py-4 rounded-2xl border-white/10 text-slate-500 font-black uppercase text-[10px]">Back</Button>
                            <Button onClick={handleNext} disabled={!amount || !recipient} className="flex-[2] py-4 rounded-2xl bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-500/20">Continue</Button>
                        </div>
                    </div>
                );

            case 'confirm':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">Confirm Transfer</h3>
                            <p className="text-slate-500 text-xs uppercase font-black">Review your transaction</p>
                        </div>

                        <div className="bg-dark-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
                            
                            <div className="text-center space-y-1">
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total to Send</p>
                                <h2 className="text-5xl font-mono font-black text-white tracking-tighter">
                                    {mode === 'crypto' ? '$' : '₦'}{parseFloat(amount).toLocaleString()}
                                </h2>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Recipient</span>
                                    <span className="text-white font-bold text-sm">{recipient}</span>
                                </div>
                                {mode === 'bank' && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Bank</span>
                                        <span className="text-white font-bold text-sm uppercase">{selectedBank}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Fee</span>
                                    <span className="text-emerald-400 font-bold text-sm uppercase">{mode === 'id' ? 'Free' : '₦10.00'}</span>
                                </div>
                                {note && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Note</span>
                                        <span className="text-slate-400 text-xs italic">{note}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={() => setStep('details')} className="flex-1 py-4 rounded-2xl border-white/10 text-slate-500 font-black uppercase text-[10px]">Edit</Button>
                            <Button onClick={handleNext} className="flex-[2] py-4 rounded-2xl bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-500/20">Confirm & Send</Button>
                        </div>
                    </div>
                );

            case 'processing':
                return (
                    <div className="text-center space-y-8 py-12">
                        <div className="relative w-32 h-32 mx-auto">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-4 border-brand-500/20 border-t-brand-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter animate-pulse">Processing...</h3>
                            <p className="text-slate-500 text-xs uppercase font-black">Syncing with Flash Protocol</p>
                        </div>
                    </div>
                );

            case 'success':
                return (
                    <div className="text-center space-y-12 py-8">
                        <div className="relative">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.6 }}
                                className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(16,185,129,0.4)] border-[10px] border-emerald-500/20"
                            >
                                <CheckCircle2 size={64} className="text-white" strokeWidth={3} />
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-5xl font-display font-black text-white italic uppercase tracking-tighter">Sent!</h3>
                            <p className="text-emerald-400 font-mono text-3xl font-black">
                                {mode === 'crypto' ? '$' : '₦'}{parseFloat(amount).toLocaleString()}
                            </p>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto">Transfer to <span className="text-white font-bold">{recipient}</span> was successful.</p>
                        </div>

                        <div className="flex flex-col gap-4 max-w-sm mx-auto">
                            <Button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest">Download Receipt</Button>
                            <Button onClick={onBack} className="w-full py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase text-[10px] tracking-widest">Back to Wallet</Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-xl mx-auto py-8 px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
