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

    // New state for Ad Posting
    const [adForm, setAdForm] = useState({
        type: 'buy' as 'buy' | 'sell',
        asset: 'USDT',
        currency: 'NGN',
        priceType: 'fixed' as 'fixed' | 'floating',
        price: '1155.50',
        minLimit: '5000',
        maxLimit: '500000',
        paymentMethod: 'Bank Transfer'
    });
    const [myAds, setMyAds] = useState<any[]>([
        { id: 'AD-101', type: 'sell', asset: 'USDT', price: '1,160.00', limit: '10k - 1M', status: 'active', date: '2026-02-20' }
    ]);
    const [isPosting, setIsPosting] = useState(false);

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

    const handlePostAd = () => {
        setIsPosting(true);
        setTimeout(() => {
            const newAd = {
                id: `AD-${Math.floor(Math.random() * 900) + 100}`,
                type: adForm.type,
                asset: adForm.asset,
                price: parseFloat(adForm.price).toLocaleString(),
                limit: `${(parseInt(adForm.minLimit) / 1000).toFixed(0)}k - ${(parseInt(adForm.maxLimit) / 1000).toFixed(0)}k`,
                status: 'active',
                date: new Date().toISOString().split('T')[0]
            };
            setMyAds([newAd, ...myAds]);
            setIsPosting(false);
            setP2pView('my_ads');
        }, 1500);
    };

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
                        {['market', 'my_ads', 'post_ad', 'history'].map(v => (
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
                                            {isSearching ? <span className="text-brand-400 animate-pulse flex items-center justify-center gap-2"><Bot size={12} /> Connecting Network...</span> : showMatches ? <span className="text-emerald-400 flex items-center justify-center gap-2"><Zap size={12} /> Optimized Rates Found</span> : `≈ ${convertedValue} ${selectedToken.symbol}`}
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
                                            <tr><th className="px-6 py-5">Hub</th><th className="px-6 py-5">Rate</th><th className="px-6 py-5">Limit</th><th className="px-6 py-5 text-right">Action</th></tr>
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

                    {p2pView === 'post_ad' && (
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-dark-900 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] rounded-full" />
                                
                                <div className="relative z-10 space-y-8">
                                    <div className="text-center">
                                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white italic uppercase tracking-tighter">Post P2P Ad</h3>
                                        <p className="text-slate-500 text-xs sm:text-sm mt-2 uppercase font-black">Set your own rates and limits</p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ad Type</label>
                                            <div className="grid grid-cols-2 gap-2 bg-dark-950 p-1 rounded-xl border border-white/10">
                                                <button onClick={() => setAdForm({...adForm, type: 'buy'})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${adForm.type === 'buy' ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}>Buy</button>
                                                <button onClick={() => setAdForm({...adForm, type: 'sell'})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${adForm.type === 'sell' ? 'bg-red-500 text-white' : 'text-slate-500'}`}>Sell</button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset</label>
                                            <div className="relative">
                                                <select value={adForm.asset} onChange={(e) => setAdForm({...adForm, asset: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold appearance-none focus:border-brand-500 outline-none">
                                                    <option>USDT</option>
                                                    <option>BTC</option>
                                                    <option>ETH</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price Type</label>
                                            <div className="grid grid-cols-2 gap-2 bg-dark-950 p-1 rounded-xl border border-white/10">
                                                <button onClick={() => setAdForm({...adForm, priceType: 'fixed'})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${adForm.priceType === 'fixed' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Fixed</button>
                                                <button onClick={() => setAdForm({...adForm, priceType: 'floating'})} className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${adForm.priceType === 'floating' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Floating</button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Price (₦)</label>
                                            <input type="number" value={adForm.price} onChange={(e) => setAdForm({...adForm, price: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-brand-500 outline-none" />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Min Limit (₦)</label>
                                            <input type="number" value={adForm.minLimit} onChange={(e) => setAdForm({...adForm, minLimit: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-brand-500 outline-none" />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Max Limit (₦)</label>
                                            <input type="number" value={adForm.maxLimit} onChange={(e) => setAdForm({...adForm, maxLimit: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-brand-500 outline-none" />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button onClick={handlePostAd} disabled={isPosting} className="w-full py-5 bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-brand-500/20">
                                            {isPosting ? <Loader2 className="animate-spin" /> : 'Publish Advertisement'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {p2pView === 'my_ads' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">My Active Ads</h3>
                                <Button onClick={() => setP2pView('post_ad')} variant="outline" size="sm" className="text-[10px] uppercase font-black border-white/10"><Plus size={14} className="mr-2" /> New Ad</Button>
                            </div>

                            <div className="bg-dark-900 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-dark-950/50 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                            <tr>
                                                <th className="px-6 py-5">Ad ID</th>
                                                <th className="px-6 py-5">Type</th>
                                                <th className="px-6 py-5">Asset</th>
                                                <th className="px-6 py-5">Price</th>
                                                <th className="px-6 py-5">Limit</th>
                                                <th className="px-6 py-5">Status</th>
                                                <th className="px-6 py-5 text-right">Manage</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {myAds.map((ad) => (
                                                <tr key={ad.id} className="hover:bg-white/5 transition-all">
                                                    <td className="px-6 py-5 font-mono text-[10px] text-slate-400">{ad.id}</td>
                                                    <td className="px-6 py-5">
                                                        <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${ad.type === 'buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                            {ad.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 font-bold text-white text-xs">{ad.asset}</td>
                                                    <td className="px-6 py-5 font-mono font-black text-sm text-white">₦{ad.price}</td>
                                                    <td className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{ad.limit}</td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{ad.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Edit2 size={14} /></button>
                                                            <button onClick={() => setMyAds(myAds.filter(a => a.id !== ad.id))} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"><Trash2 size={14} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {myAds.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="px-6 py-12 text-center">
                                                        <p className="text-slate-500 text-xs uppercase font-black tracking-widest">No active advertisements found</p>
                                                        <button onClick={() => setP2pView('post_ad')} className="mt-4 text-brand-400 text-[10px] font-black uppercase tracking-widest hover:underline">Create your first ad</button>
                                                    </td>
                                                </tr>
                                            )}
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
                             
                             <AnimatePresence mode="wait">
                                {txStep === 'confirm' && (
                                    <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Button 
                                            onClick={() => {
                                                setTxStep('processing');
                                                setTimeout(() => {
                                                    setTxStep('success');
                                                }, 3000);
                                            }} 
                                            className="w-full py-4 bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-xl"
                                        >
                                            Execute Handshake
                                        </Button>
                                    </motion.div>
                                )}
                                {txStep === 'processing' && (
                                    <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                                        <Loader2 className="w-10 h-10 text-brand-500 animate-spin mx-auto mb-4" />
                                        <p className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Connecting Network...</p>
                                        <p className="text-[10px] text-slate-500 mt-2 uppercase font-black">Cryptographic Handshake in Progress</p>
                                    </motion.div>
                                )}
                                {txStep === 'success' && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Settled!</h4>
                                        <p className="text-[10px] text-slate-500 mt-2 uppercase font-black mb-6">Handshake Complete. Assets Transferred.</p>
                                        <Button 
                                            onClick={() => {
                                                setSelectedOffer(null);
                                                setTxStep('confirm');
                                            }} 
                                            className="w-full py-4 bg-emerald-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-xl"
                                        >
                                            Done
                                        </Button>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};