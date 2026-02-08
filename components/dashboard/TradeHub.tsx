import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Users, Briefcase, ChevronRight, ChevronDown, Filter, Search, ShieldCheck, Gem, CheckCircle2, Lock, Zap, Star, Trophy, Clock, Bot, Sparkles, X, Loader2, Wallet, Check, TrendingDown, ThumbsUp, Plus, Edit2, Trash2, Power, Eye, Calendar, DollarSign, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const TradeHub: React.FC = () => {
    const [mode, setMode] = useState<'swap' | 'p2p' | 'otc'>('p2p');
    const [p2pView, setP2pView] = useState<'market' | 'my_ads' | 'post_ad' | 'history'>('market');
    const [p2pType, setP2pType] = useState<'buy' | 'sell'>('buy');
    const [p2pAmount, setP2pAmount] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showMatches, setShowMatches] = useState(false);
    const [selectedToken, setSelectedToken] = useState({ symbol: 'USDT', name: 'Tether', icon: '₮', rate: 1155.50 });
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [txStep, setTxStep] = useState<'confirm' | 'processing' | 'success'>('confirm');

    useEffect(() => {
        if (p2pAmount.length > 0 && p2pView === 'market') {
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
                setShowMatches(true);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setShowMatches(false);
        }
    }, [p2pAmount, p2pView]);

    const topMatches = [
        { id: 1, user: 'CryptoKing_99', verified: true, completion: '99.8%', price: '1,155.50', limit: '5k - 5M', speed: '2 mins', badge: 'Best Price' },
        { id: 2, user: 'FastLane_Lagos', verified: true, completion: '100%', price: '1,158.20', limit: '10k - 500k', speed: '30 secs', badge: 'Fastest' },
    ];

    const numericAmount = parseFloat(p2pAmount.replace(/,/g, '')) || 0;
    const convertedValue = (numericAmount / selectedToken.rate).toLocaleString(undefined, { maximumFractionDigits: 4 });

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white italic uppercase tracking-tighter">Trade Hub</h2>
                <div className="bg-dark-900 border border-white/5 p-1 rounded-xl flex overflow-x-auto no-scrollbar w-full sm:w-auto">
                    {['swap', 'p2p', 'otc'].map(m => (
                        <button key={m} onClick={() => setMode(m as any)} className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-brand-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}>{m}</button>
                    ))}
                </div>
            </div>

            {mode === 'p2p' && (
                <div className="space-y-6">
                    <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-white/5 w-full sm:w-fit overflow-x-auto no-scrollbar">
                        {['market', 'post_ad', 'history'].map(v => (
                            <button key={v} onClick={() => setP2pView(v as any)} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${p2pView === v ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}>{v.replace('_', ' ')}</button>
                        ))}
                    </div>

                    {p2pView === 'market' && (
                        <div className="space-y-6 sm:space-y-12">
                            <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
                                <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full opacity-10 pointer-events-none ${p2pType === 'buy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                                    <div className="inline-flex bg-dark-950 p-1 rounded-2xl border border-white/10 w-full sm:w-auto">
                                        <button onClick={() => setP2pType('buy')} className={`flex-1 sm:px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${p2pType === 'buy' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-white'}`}>Buy</button>
                                        <button onClick={() => setP2pType('sell')} className={`flex-1 sm:px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${p2pType === 'sell' ? 'bg-red-500 text-white' : 'text-slate-500 hover:text-white'}`}>Sell</button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative max-w-md mx-auto">
                                            <input 
                                                type="number" 
                                                value={p2pAmount}
                                                onChange={(e) => setP2pAmount(e.target.value)}
                                                placeholder="Enter Amount"
                                                className="w-full bg-dark-950 border border-white/10 rounded-2xl px-12 sm:px-16 py-5 sm:py-6 text-xl sm:text-3xl font-mono text-center text-white focus:border-white/20 transition-all placeholder-white/5 outline-none"
                                            />
                                            <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xl text-slate-600 font-display italic">₦</div>
                                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                                                <button className="bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2 border border-white/5 transition-all">
                                                    <span className="text-[10px] font-black text-white">{selectedToken.symbol}</span>
                                                    <ChevronDown size={14} className="text-slate-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                                            {isSearching ? <span className="text-brand-400 animate-pulse flex items-center justify-center gap-2"><Bot size={12} /> Syncing Nodes...</span> : showMatches ? <span className="text-emerald-400 flex items-center justify-center gap-2"><Zap size={12} /> Optimized Rates Found</span> : `≈ ${convertedValue} ${selectedToken.symbol}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-900 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <div className="p-5 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Market Liquidity</h3>
                                </div>
                                <div className="overflow-x-auto custom-scrollbar no-scrollbar-mobile">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead className="bg-dark-950/50 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                            <tr><th className="px-6 py-5">Node</th><th className="px-6 py-5">Rate</th><th className="px-6 py-5">Limit</th><th className="px-6 py-5 text-right">Action</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {(showMatches ? topMatches : topMatches).map((offer: any) => (
                                                <tr key={offer.id} className="hover:bg-white/5 transition-all">
                                                    <td className="px-6 py-5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-xs font-black text-slate-500">{offer.user.charAt(0)}</div><div><p className="font-black text-white text-xs uppercase italic truncate">{offer.user}</p><p className="text-[9px] text-slate-500 font-mono">{offer.completion} SUCCESS</p></div></div></td>
                                                    <td className="px-6 py-5"><p className="font-mono font-black text-sm text-white">₦{offer.price}</p></td>
                                                    <td className="px-6 py-5"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{offer.limit}</p></td>
                                                    <td className="px-6 py-5 text-right"><button onClick={() => setSelectedOffer(offer)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p2pType === 'buy' ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-red-500 text-white shadow-lg shadow-red-500/20'}`}>{p2pType}</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <AnimatePresence>
                {selectedOffer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOffer(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-dark-900 border border-white/10 p-6 sm:p-8 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl">
                             <button onClick={() => setSelectedOffer(null)} className="absolute top-4 right-4 text-slate-400 p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
                             <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4 border border-brand-500/20"><ShieldCheck size={32} className="text-brand-500" /></div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Trade Confirm</h3>
                                <p className="text-slate-500 text-xs mt-2 uppercase font-black">Executing via Flash Protocol</p>
                             </div>
                             
                             <div className="bg-dark-950 rounded-2xl p-6 border border-white/5 mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Partner</span>
                                    <span className="text-white font-bold text-sm uppercase italic">{selectedOffer.user}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Rate</span>
                                    <span className="text-emerald-400 font-mono font-bold text-sm">₦{selectedOffer.price}</span>
                                </div>
                             </div>
                             
                             <Button onClick={() => setSelectedOffer(null)} className="w-full py-4 bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-xl">Execute Handshake</Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};