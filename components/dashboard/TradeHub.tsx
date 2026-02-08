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
    const [sortFilter, setSortFilter] = useState<'best_price' | 'rating' | 'fastest'>('best_price');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [p2pInputMode, setP2pInputMode] = useState<'fiat' | 'token'>('fiat');
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [selectedToken, setSelectedToken] = useState({ symbol: 'USDT', name: 'Tether', icon: '₮', rate: 1155.50 });
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [txStep, setTxStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
    const [aiStatus, setAiStatus] = useState('');

    const p2pTokens = [
        { symbol: 'USDT', name: 'Tether', icon: '₮', rate: 1155.50 },
        { symbol: 'BTC', name: 'Bitcoin', icon: '₿', rate: 98500000 },
        { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', rate: 5200000 },
    ];

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
        { id: 1, user: 'CryptoKing_99', verified: true, completion: '99.8%', price: selectedToken.rate.toLocaleString(), limit: '50k - 5M', speed: '2 mins', matchScore: 99, badge: 'Best Price', payment: ['Flash Pay'] },
        { id: 2, user: 'FastLane_Lagos', verified: true, completion: '100%', price: (selectedToken.rate * 1.002).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '10k - 500k', speed: '30 secs', matchScore: 97, badge: 'Fastest', payment: ['Flash Pay'] },
        { id: 3, user: 'WhaleTrader_X', verified: true, completion: '98%', price: (selectedToken.rate * 1.005).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '100k - 10M', speed: '5 mins', matchScore: 95, badge: 'High Volume', payment: ['Flash Pay'] },
    ];

    const otherOffers = [
        { id: 4, user: 'AlexTrades', volume: '450 trades', completion: '95%', rating: 4.8, price: (selectedToken.rate * 0.99).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '100k - 2M', method: 'Flash Pay', speed: '5 mins' },
        { id: 5, user: 'BlueSky_X', volume: '120 trades', completion: '92%', rating: 4.5, price: (selectedToken.rate * 1.01).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '20k - 150k', method: 'Flash Pay', speed: '2 mins' },
        { id: 6, user: 'Satoshi_N', volume: '890 trades', completion: '97%', rating: 4.9, price: (selectedToken.rate * 1.008).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '5k - 150k', method: 'Flash Pay', speed: '1 min' },
    ];

    const numericAmount = parseFloat(p2pAmount.replace(/,/g, '')) || 0;
    const convertedValue = p2pInputMode === 'fiat' 
        ? (numericAmount / selectedToken.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) 
        : (numericAmount * selectedToken.rate).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleTradeInit = (offer: any) => {
        setSelectedOffer(offer);
        setTxStep('confirm');
    };

    return (
        <div className="space-y-6 sm:space-y-8 relative overflow-x-hidden">
            {/* Transaction Modal (Full Screen Mobile) */}
            <AnimatePresence>
                {selectedOffer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOffer(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-dark-900 border-t sm:border border-white/10 w-full h-full sm:h-auto sm:max-w-md sm:rounded-[2.5rem] relative z-10 shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-6 sm:p-8 flex-1">
                                <button onClick={() => setSelectedOffer(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
                                
                                {txStep === 'confirm' && (
                                    <div className="space-y-8 pt-8 sm:pt-0">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4 border border-brand-500/20"><ShieldCheck size={32} className="text-brand-500" /></div>
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Secure Protocol</h3>
                                            <p className="text-slate-400 text-xs sm:text-sm font-medium">Verify handshake with {selectedOffer.user}</p>
                                        </div>

                                        <div className="bg-dark-950/80 rounded-2xl p-5 border border-white/5 space-y-4">
                                            <div className="flex justify-between items-center text-xs uppercase font-black tracking-widest text-slate-500"><span>Merchant Node</span><span className="text-white flex items-center gap-1">{selectedOffer.user} <CheckCircle2 size={12} className="text-brand-400" /></span></div>
                                            <div className="flex justify-between items-center text-xs uppercase font-black tracking-widest text-slate-500"><span>Handshake Rate</span><span className="text-white font-mono">{selectedOffer.price} NGN</span></div>
                                            <div className="h-px bg-white/5" />
                                            <div className="flex justify-between items-center text-xs uppercase font-black tracking-widest text-slate-500"><span>Gateway</span><span className="text-brand-400">Flash Internal Pay</span></div>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-6 border border-brand-500/20">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 text-center">Execution Amount</p>
                                            <div className="flex justify-center items-baseline gap-2">
                                                <span className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tighter">₦{p2pAmount}</span>
                                            </div>
                                            <p className="text-center text-brand-400 font-mono text-sm mt-2 font-bold tracking-tight">≈ {convertedValue} {selectedToken.symbol}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <Button onClick={() => setTxStep('processing')} className="w-full py-5 bg-brand-500 text-slate-950 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-500/20">Execute Handshake</Button>
                                            <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center justify-center gap-2"><Lock size={12} className="opacity-40" /> Locked by AI Escrow 2.0</p>
                                        </div>
                                    </div>
                                )}

                                {txStep === 'processing' && (
                                    <div className="h-full flex flex-col items-center justify-center py-20">
                                         <div className="relative w-24 h-24 mb-10">
                                            <div className="absolute inset-0 rounded-full border-4 border-white/5 animate-pulse" />
                                            <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                                            <Bot size={32} className="absolute inset-0 m-auto text-brand-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Analyzing Nodes</h3>
                                        <p className="text-brand-400 font-mono text-xs animate-pulse text-center max-w-[200px]">Securing internal ledger and verifying merchant liquidity...</p>
                                        <div className="mt-20 w-full">
                                            <Button onClick={() => setTxStep('success')} variant="ghost" className="w-full text-[10px] uppercase font-black text-slate-700">Force Complete (Demo)</Button>
                                        </div>
                                    </div>
                                )}

                                {txStep === 'success' && (
                                    <div className="h-full flex flex-col items-center justify-center py-10 space-y-10">
                                        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)] border-8 border-emerald-500/20"><Check size={48} className="text-white stroke-[4]" /></div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Settled!</h3>
                                            <p className="text-emerald-400 font-mono text-xl font-bold tracking-tight">+{convertedValue} {selectedToken.symbol}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl w-full border border-white/5 text-center"><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Receipt ID</p><p className="text-xs font-mono text-white tracking-widest">#992-TX-FLASH-04A</p></div>
                                        <Button onClick={() => setSelectedOffer(null)} className="w-full py-5 bg-white text-dark-950 font-black uppercase text-xs tracking-widest rounded-2xl shadow-2xl">Return Terminal</Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Sub-Navigation (Fixed scroll for mobile) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white italic uppercase tracking-tighter">Trade Hub</h2>
                </div>
                <div className="bg-dark-900 border border-white/5 p-1 rounded-xl flex overflow-x-auto no-scrollbar w-full sm:w-auto">
                    {['swap', 'p2p', 'otc'].map(m => (
                        <button key={m} onClick={() => setMode(m as any)} className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${mode === m ? 'bg-brand-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}>{m}</button>
                    ))}
                </div>
            </div>

            {mode === 'p2p' && (
                <div className="space-y-6">
                    <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-white/5 w-full sm:w-fit overflow-x-auto no-scrollbar">
                        {['market', 'my_ads', 'post_ad', 'history'].map(v => (
                            <button key={v} onClick={() => setP2pView(v as any)} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${p2pView === v ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}>{v.replace('_', ' ')}</button>
                        ))}
                    </div>

                    {p2pView === 'market' && (
                        <div className="space-y-8 sm:space-y-12">
                            {/* Unified Control Panel */}
                            <div className="bg-dark-900 border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-visible shadow-2xl">
                                <div className={`absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 blur-[80px] sm:blur-[100px] rounded-full opacity-10 sm:opacity-20 pointer-events-none transition-colors ${p2pType === 'buy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
                                    <div className="inline-flex bg-dark-950 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
                                        <button onClick={() => setP2pType('buy')} className={`flex-1 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${p2pType === 'buy' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white'}`}>Buy</button>
                                        <button onClick={() => setP2pType('sell')} className={`flex-1 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${p2pType === 'sell' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-500 hover:text-white'}`}>Sell</button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="relative max-w-md mx-auto group">
                                            <input 
                                                type="text" 
                                                value={p2pAmount}
                                                onChange={(e) => setP2pAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-dark-950 border border-white/10 rounded-2xl px-12 sm:px-16 py-5 sm:py-6 text-2xl sm:text-4xl font-mono text-center text-white focus:border-white/20 transition-all placeholder-white/5 outline-none"
                                            />
                                            <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xl sm:text-2xl text-slate-600 font-display italic">₦</div>
                                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                                                <button onClick={() => setShowTokenSelector(!showTokenSelector)} className="bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2 border border-white/5 transition-all">
                                                    <span className="text-[10px] sm:text-xs font-black text-white">{selectedToken.symbol}</span>
                                                    <ChevronDown size={14} className="text-slate-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 h-4">
                                            {isSearching ? <span className="text-brand-400 animate-pulse flex items-center justify-center gap-2"><Bot size={12} /> Syncing Market Nodes...</span> : showMatches ? <span className="text-emerald-400 flex items-center justify-center gap-2"><Zap size={12} /> AI Optimised Rates Found</span> : `Conversion: ≈ ${convertedValue} ${selectedToken.symbol}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Marketplace Offers with Mobile Table Scrolling */}
                            <div className="bg-dark-900 border border-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-2xl relative">
                                <div className="p-5 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Live Orderbook</h3>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <div className="relative flex-1 sm:w-64 group">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                            <input type="text" placeholder="Search Node ID" className="w-full bg-dark-950 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-[10px] text-white focus:border-brand-500 outline-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto custom-scrollbar no-scrollbar-mobile">
                                    <table className="w-full text-left border-collapse min-w-[700px]">
                                        <thead className="bg-dark-950/50 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                            <tr><th className="px-6 py-6">Handshake Partner</th><th className="px-6 py-6">Protocol Rate</th><th className="px-6 py-6">Capability</th><th className="px-6 py-6">Channel</th><th className="px-6 py-6 text-right">Execution</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {(showMatches ? topMatches : otherOffers).map((offer: any) => (
                                                <tr key={offer.id} className="hover:bg-white/5 transition-all group">
                                                    <td className="px-6 py-6"><div className="flex items-center gap-3 overflow-hidden"><div className="w-9 h-9 rounded-xl bg-dark-800 border border-white/5 flex items-center justify-center text-xs font-black text-slate-500 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors flex-shrink-0">{offer.user.charAt(0)}</div><div className="overflow-hidden"><p className="font-black text-white text-xs uppercase italic tracking-tighter truncate">{offer.user}</p><p className="text-[9px] text-slate-500 font-mono tracking-widest">{offer.verified ? 'VERIFIED NODE' : 'STANDARD NODE'}</p></div></div></td>
                                                    <td className="px-6 py-6"><p className="font-mono font-black text-sm text-white tracking-tight">₦{offer.price}</p></td>
                                                    <td className="px-6 py-6"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{offer.limit || 'UNLIMITED'}</p></td>
                                                    <td className="px-6 py-6"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-sm">Flash Pay</span></td>
                                                    <td className="px-6 py-6 text-right"><button onClick={() => handleTradeInit(offer)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${p2pType === 'buy' ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' : 'bg-red-500 text-white shadow-red-500/20'} active:scale-95`}>{p2pType}</button></td>
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
        </div>
    );
};