import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Users, Briefcase, ChevronRight, ChevronDown, Filter, Search, ShieldCheck, Gem, CheckCircle2, Lock, Zap, Star, Trophy, Clock, Bot, Sparkles, X, Loader2, Wallet, Check, TrendingDown, ThumbsUp, Plus, Edit2, Trash2, Power, Eye, Calendar, DollarSign, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const TradeHub: React.FC = () => {
    const [mode, setMode] = useState<'swap' | 'p2p' | 'otc'>('p2p');
    
    // P2P Navigation State
    const [p2pView, setP2pView] = useState<'market' | 'my_ads' | 'post_ad' | 'history'>('market');

    // P2P Market State
    const [p2pType, setP2pType] = useState<'buy' | 'sell'>('buy');
    const [p2pAmount, setP2pAmount] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showMatches, setShowMatches] = useState(false);
    const [sortFilter, setSortFilter] = useState<'best_price' | 'rating' | 'fastest'>('best_price');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // New State for Token Selection & Input Mode
    const [p2pInputMode, setP2pInputMode] = useState<'fiat' | 'token'>('fiat');
    const [showTokenSelector, setShowTokenSelector] = useState(false);
    const [selectedToken, setSelectedToken] = useState({ symbol: 'USDT', name: 'Tether', icon: '₮', rate: 1155.50 });

    // Transaction Flow State
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [txStep, setTxStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
    const [aiStatus, setAiStatus] = useState('');

    const p2pTokens = [
        { symbol: 'USDT', name: 'Tether', icon: '₮', rate: 1155.50 },
        { symbol: 'BTC', name: 'Bitcoin', icon: '₿', rate: 98500000 },
        { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', rate: 5200000 },
        { symbol: 'USDC', name: 'USD Coin', icon: '$', rate: 1150.00 },
        { symbol: 'SOL', name: 'Solana', icon: '◎', rate: 215000 },
    ];

    // Simulated AI Matching Logic
    useEffect(() => {
        if (p2pAmount.length > 0 && p2pView === 'market') {
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
                setShowMatches(true);
            }, 800); // Fake "AI processing" delay
            return () => clearTimeout(timer);
        } else {
            setShowMatches(false);
        }
    }, [p2pAmount, p2pView]);

    const tiers = [
        { level: 'Tier 1', name: 'Basic', req: 'Phone number only', daily: '$500', monthly: '$2,000', active: false },
        { level: 'Tier 2', name: 'Verified', req: 'BVN, NIN & Selfie', daily: '$5,000', monthly: '$25,000', active: true },
        { level: 'Tier 3', name: 'Premium', req: 'Full KYC & Proof of Income', daily: '$20,000', monthly: '$100,000', active: false },
        { level: 'Tier 4', name: 'Institutional', req: 'Business Registration', daily: '$100,000', monthly: '$500,000', active: false },
    ];

    // Mock Data - All using Flash Pay
    const topMatches = [
        { id: 1, user: 'CryptoKing_99', verified: true, completion: '99.8%', price: selectedToken.rate.toLocaleString(), limit: '50k - 5M', speed: '2 mins', matchScore: 99, badge: 'Best Price', payment: ['Flash Pay'] },
        { id: 2, user: 'FastLane_Lagos', verified: true, completion: '100%', price: (selectedToken.rate * 1.002).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '10k - 500k', speed: '30 secs', matchScore: 97, badge: 'Fastest', payment: ['Flash Pay'] },
        { id: 3, user: 'WhaleTrader_X', verified: true, completion: '98%', price: (selectedToken.rate * 1.005).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '100k - 10M', speed: '5 mins', matchScore: 95, badge: 'High Volume', payment: ['Flash Pay'] },
    ];

    const otherOffers = [
        { id: 4, user: 'AlexTrades', volume: '450 trades', completion: '95%', rating: 4.8, price: (selectedToken.rate * 0.99).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '100k - 2M', method: 'Flash Pay', speed: '5 mins' },
        { id: 5, user: 'BlueSky_Ventures', volume: '120 trades', completion: '92%', rating: 4.5, price: (selectedToken.rate * 1.01).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '20k - 150k', method: 'Flash Pay', speed: '2 mins' },
        { id: 6, user: 'Satoshi_Naija', volume: '890 trades', completion: '97%', rating: 4.9, price: (selectedToken.rate * 1.008).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '5k - 150k', method: 'Flash Pay', speed: '1 min' },
        { id: 7, user: 'Delta_Exchange', volume: '2200 trades', completion: '96%', rating: 4.7, price: (selectedToken.rate * 1.02).toLocaleString(undefined, {maximumFractionDigits: 2}), limit: '10k - 1M', method: 'Flash Pay', speed: '10 mins' },
    ];

    // Sorting Logic for "All Offers"
    const getSortedOffers = () => {
        let sorted = [...otherOffers];
        if (sortFilter === 'best_price') {
             // Mock sort for price string
             sorted.sort((a, b) => parseFloat(a.price.replace(/,/g, '')) - parseFloat(b.price.replace(/,/g, '')));
             if (p2pType === 'sell') sorted.reverse(); // Sell = want highest price
        } else if (sortFilter === 'rating') {
             sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortFilter === 'fastest') {
             // Mock speed sort (just generic for visual)
             sorted.sort((a, b) => parseInt(a.speed) - parseInt(b.speed));
        }
        return sorted;
    };

    const displayOffers = getSortedOffers();

    // Calculate conversion
    const numericAmount = parseFloat(p2pAmount.replace(/,/g, '')) || 0;
    const convertedValue = p2pInputMode === 'fiat' 
        ? (numericAmount / selectedToken.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) 
        : (numericAmount * selectedToken.rate).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const handleTradeInit = (offer: any) => {
        setSelectedOffer(offer);
        setTxStep('confirm');
    };

    const handleConfirmTrade = () => {
        setTxStep('processing');
        setAiStatus('Initiating secure transfer from Flash NGN Account...');
        setTimeout(() => setAiStatus('AI verifying transaction hash with banking partners...'), 1500);
        setTimeout(() => setAiStatus('Transaction verified. Releasing Escrow...'), 3000);
        setTimeout(() => setTxStep('success'), 4500);
    };

    const closeTxModal = () => {
        setSelectedOffer(null);
        setTxStep('confirm');
        setP2pAmount('');
    };

    return (
        <div className="space-y-8 relative">
            {/* Transaction Modal */}
            <AnimatePresence>
                {selectedOffer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={closeTxModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-dark-900 border border-white/10 w-full max-w-md rounded-3xl relative z-10 shadow-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            {txStep !== 'processing' && (
                                <button onClick={closeTxModal} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 z-20">
                                    <X size={20} />
                                </button>
                            )}

                            {txStep === 'confirm' && (
                                <div className="p-6 sm:p-8">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck size={32} className="text-brand-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Confirm Transaction</h3>
                                        <p className="text-slate-400 text-sm">You are about to {p2pType} {selectedToken.symbol} securely.</p>
                                    </div>

                                    <div className="bg-dark-950/50 rounded-2xl p-4 border border-white/5 space-y-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Merchant</span>
                                            <span className="text-white font-medium flex items-center gap-1">
                                                {selectedOffer.user} 
                                                <CheckCircle2 size={14} className="text-brand-500" />
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Rate</span>
                                            <span className="text-white font-mono">{selectedOffer.price} NGN/{selectedToken.symbol}</span>
                                        </div>
                                        <div className="h-px bg-white/10" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Payment Method</span>
                                            <div className="text-right">
                                                <span className="text-white font-bold block text-sm">Flash Pay</span>
                                                <span className="text-brand-400 text-xs">Internal Settlement</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-brand-500/5 rounded-xl p-4 mb-8 border border-brand-500/10">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-slate-300 text-sm font-medium">Total {p2pType === 'buy' ? 'Cost' : 'Receive'}</span>
                                            <span className="text-2xl font-bold text-white font-mono">
                                                ₦{p2pAmount || '0.00'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Includes escrow fees</span>
                                            <span className="text-brand-400 font-mono">
                                                ≈ {convertedValue} {selectedToken.symbol}
                                            </span>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={handleConfirmTrade}
                                        className="w-full py-4 text-lg font-bold shadow-lg shadow-brand-500/20" 
                                        variant="secondary"
                                    >
                                        Confirm & Pay
                                    </Button>
                                    <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                                        <Lock size={10} /> Secured by Flash AI Escrow
                                    </p>
                                </div>
                            )}

                            {/* Processing and Success steps remain similar to previous implementation, keeping brevity */}
                            {txStep === 'processing' && (
                                <div className="p-8 py-16 text-center">
                                     <div className="relative w-24 h-24 mx-auto mb-8">
                                        <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                                        <div className="absolute inset-0 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                                        <Bot size={32} className="absolute inset-0 m-auto text-brand-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">AI Processing</h3>
                                    <p className="text-brand-400 font-mono text-sm animate-pulse">{aiStatus}</p>
                                </div>
                            )}

                            {txStep === 'success' && (
                                <div className="p-8 text-center bg-gradient-to-b from-green-500/10 to-transparent">
                                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                                        <Check size={40} className="text-white stroke-[3]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Trade Successful!</h3>
                                    <p className="text-slate-300 mb-8">Asset has been credited to your wallet.</p>
                                    <Button onClick={closeTxModal} className="w-full bg-white text-dark-950 font-bold">Return to Dashboard</Button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header / Mode Switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Trading Hub</h2>
                    <p className="text-slate-400 text-sm">Secure and scalable trading solutions.</p>
                </div>
                <div className="bg-dark-900 border border-white/10 p-1 rounded-xl flex overflow-x-auto max-w-full">
                    <button 
                        onClick={() => setMode('swap')}
                        className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'swap' ? 'bg-brand-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Instant Swap
                    </button>
                    <button 
                        onClick={() => setMode('p2p')}
                        className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'p2p' ? 'bg-brand-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        P2P Market
                    </button>
                    <button 
                        onClick={() => setMode('otc')}
                        className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${mode === 'otc' ? 'bg-brand-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        VIP OTC <Gem size={14} className={mode === 'otc' ? 'text-slate-900' : 'text-amber-400'} />
                    </button>
                </div>
            </div>

            {mode === 'swap' && (
                /* Instant Swap UI - kept compact for file size */
                <div className="bg-dark-900 border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto text-center">
                    <ArrowLeftRight size={48} className="text-brand-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white">Instant Swap Active</h3>
                    <p className="text-slate-400">Swap engine is ready for trades.</p>
                </div>
            )}

            {mode === 'p2p' && (
                <div className="space-y-6">
                    {/* P2P Sub-Navigation */}
                    <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-white/5 w-fit overflow-x-auto max-w-full">
                        <button 
                            onClick={() => setP2pView('market')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${p2pView === 'market' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Marketplace
                        </button>
                        <button 
                            onClick={() => setP2pView('my_ads')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${p2pView === 'my_ads' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            My Ads
                        </button>
                        <button 
                            onClick={() => setP2pView('post_ad')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${p2pView === 'post_ad' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Plus size={14} /> Post Ad
                        </button>
                        <button 
                            onClick={() => setP2pView('history')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${p2pView === 'history' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Order History
                        </button>
                    </div>

                    {/* VIEW: MARKETPLACE */}
                    {p2pView === 'market' && (
                        <div className="space-y-12">
                            {/* Controller Section */}
                            <div className="bg-dark-900 border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-visible">
                                <div className={`absolute top-0 right-0 w-96 h-96 blur-[100px] rounded-full opacity-20 pointer-events-none transition-colors duration-500 ${p2pType === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                                    <div className="inline-flex bg-dark-950 p-1.5 rounded-2xl border border-white/10">
                                        <button onClick={() => setP2pType('buy')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${p2pType === 'buy' ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'text-slate-400 hover:text-white'}`}>I want to Buy</button>
                                        <button onClick={() => setP2pType('sell')} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${p2pType === 'sell' ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'text-slate-400 hover:text-white'}`}>I want to Sell</button>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-slate-400 text-sm font-medium">Enter Amount to {p2pType === 'buy' ? 'Spend' : 'Receive'}</label>
                                        <div className="relative max-w-lg mx-auto group">
                                            <input 
                                                type="text" 
                                                value={p2pAmount}
                                                onChange={(e) => setP2pAmount(e.target.value)}
                                                placeholder={p2pInputMode === 'fiat' ? "e.g. 50,000" : "e.g. 50"}
                                                className="w-full bg-dark-950/50 backdrop-blur-sm border border-white/10 rounded-2xl pl-16 pr-44 py-6 text-4xl font-mono text-center text-white focus:outline-none focus:border-white/20 transition-all placeholder-white/10"
                                            />
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-slate-500 font-display">{p2pInputMode === 'fiat' ? '₦' : selectedToken.icon}</div>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <button onClick={() => setP2pInputMode(prev => prev === 'fiat' ? 'token' : 'fiat')} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"><ArrowLeftRight size={16} /></button>
                                                <div className="relative">
                                                    <button onClick={() => setShowTokenSelector(!showTokenSelector)} className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 flex items-center gap-2 border border-white/5 transition-all">
                                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{selectedToken.icon}</div>
                                                        <span className="text-sm font-bold text-white">{selectedToken.symbol}</span>
                                                        <ChevronDown size={14} className="text-slate-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 pt-2">
                                            {isSearching ? <span className="flex items-center justify-center gap-2 text-brand-400 animate-pulse"><Bot size={14} /> AI is analyzing the market...</span> : showMatches ? <span className="flex items-center justify-center gap-2 text-green-400"><Sparkles size={14} /> Found {topMatches.length} perfect matches</span> : "Enter an amount to see AI-matched offers"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Matches */}
                            <AnimatePresence>
                                {showMatches && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6">
                                        <div className="flex items-center gap-2 px-2">
                                            <div className={`p-1.5 rounded-lg ${p2pType === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}><Bot size={20} /></div>
                                            <h3 className="text-xl font-bold text-white">Top Picks</h3>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            {topMatches.map((offer, index) => (
                                                <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-dark-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-brand-500/30 transition-all">
                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center text-lg font-bold text-slate-400">{offer.user.charAt(0)}</div>
                                                            <div><h4 className="font-bold text-white text-sm">{offer.user}</h4><span className="text-green-400 text-xs">{offer.completion} completion</span></div>
                                                        </div>
                                                        <div className="mb-6"><p className="text-slate-400 text-xs mb-1">Price</p><p className="text-3xl font-mono font-bold text-white tracking-tight">₦{offer.price}</p></div>
                                                        <Button onClick={() => handleTradeInit(offer)} className={`w-full py-3 font-bold ${p2pType === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{p2pType === 'buy' ? 'Buy' : 'Sell'}</Button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Offer List */}
                            <div className="bg-dark-900 border border-white/5 rounded-3xl overflow-hidden min-h-[400px]">
                                <div className="p-6 border-b border-white/5 flex flex-col gap-6">
                                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                                        <h3 className="text-lg font-bold text-white">All Offers</h3>
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                                <input type="text" placeholder="Search traders" className="bg-dark-950 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-brand-500 focus:outline-none" />
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setShowFilterMenu(!showFilterMenu)} className={`p-2 bg-dark-950 border rounded-lg transition-colors ${showFilterMenu ? 'border-brand-500 text-brand-400' : 'border-white/10 text-slate-400 hover:text-white'}`}>
                                                    <Filter size={18} />
                                                </button>
                                                <AnimatePresence>
                                                    {showFilterMenu && (
                                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-0 top-full mt-2 w-48 bg-dark-900 border border-white/10 rounded-xl shadow-2xl z-50">
                                                            <div className="p-1 space-y-0.5">
                                                                <button onClick={() => { setSortFilter('best_price'); setShowFilterMenu(false); }} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-white/5 text-slate-300"><span className="flex items-center gap-2"><TrendingDown size={14} /> Best Price</span></button>
                                                                <button onClick={() => { setSortFilter('rating'); setShowFilterMenu(false); }} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-white/5 text-slate-300"><span className="flex items-center gap-2"><ThumbsUp size={14} /> Rating</span></button>
                                                                <button onClick={() => { setSortFilter('fastest'); setShowFilterMenu(false); }} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-white/5 text-slate-300"><span className="flex items-center gap-2"><Zap size={14} /> Fastest</span></button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-dark-950/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                            <tr><th className="px-6 py-4">Advertiser</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Limit/Volume</th><th className="px-6 py-4">Payment</th><th className="px-6 py-4 text-right">Action</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {displayOffers.map((offer) => (
                                                <tr key={offer.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400">{offer.user.charAt(0)}</div><div><p className="font-medium text-white text-sm">{offer.user}</p></div></div></td>
                                                    <td className="px-6 py-4"><p className="font-mono font-bold text-white">₦{offer.price}</p></td>
                                                    <td className="px-6 py-4"><p className="text-xs text-slate-300">{offer.limit}</p></td>
                                                    <td className="px-6 py-4"><span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">{offer.method}</span></td>
                                                    <td className="px-6 py-4 text-right"><button onClick={() => handleTradeInit(offer)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${p2pType === 'buy' ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}>{p2pType === 'buy' ? 'Buy' : 'Sell'}</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: POST AD */}
                    {p2pView === 'post_ad' && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-dark-900 border border-white/5 rounded-3xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6">Post New Advertisement</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase">I want to</label>
                                            <div className="flex bg-dark-950 p-1 rounded-xl border border-white/10">
                                                <button className="flex-1 py-2 rounded-lg text-sm font-bold bg-green-500 text-white">Buy</button>
                                                <button className="flex-1 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white">Sell</button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase">Asset</label>
                                            <button className="w-full flex items-center justify-between bg-dark-950 border border-white/10 rounded-xl px-4 py-2.5 text-white">
                                                <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] font-bold">₮</div> USDT</span>
                                                <ChevronDown size={16} className="text-slate-500" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-medium text-white">Price Setting</label>
                                            <div className="flex items-center gap-2 text-xs bg-white/5 px-2 py-1 rounded-lg text-brand-400 border border-brand-500/20">
                                                <Zap size={12} /> Lowest Market Price: ₦1,154.20
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₦</span>
                                            <input type="text" defaultValue="1,155.00" className="w-full bg-dark-950 border border-white/10 rounded-xl pl-8 pr-4 py-4 text-white font-mono focus:border-brand-500 focus:outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <label className="text-sm font-medium text-white">Amount & Limits</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-slate-500 mb-1 block">Total Amount (USDT)</label>
                                                <input type="text" placeholder="e.g. 1000" className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-slate-500 mb-1 block">Min Limit (NGN)</label>
                                                <input type="text" placeholder="e.g. 5,000" className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <label className="text-sm font-medium text-white">Payment Methods</label>
                                        <div className="flex gap-2 flex-wrap">
                                            <button className="px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold flex items-center gap-2">
                                                <Check size={12} /> Flash Pay
                                            </button>
                                            <button className="px-3 py-1.5 rounded-lg bg-dark-950 text-slate-400 border border-white/10 text-xs font-medium hover:text-white">
                                                Bank Transfer
                                            </button>
                                            <button className="px-3 py-1.5 rounded-lg bg-dark-950 text-slate-400 border border-white/10 text-xs font-medium hover:text-white">
                                                Chipper Cash
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button onClick={() => setP2pView('my_ads')} className="w-full py-4 text-lg font-bold" variant="secondary">Post Advertisement</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW: MY ADS */}
                    {p2pView === 'my_ads' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { id: 'ad-01', type: 'buy', asset: 'USDT', price: '1,155.00', limit: '5k - 500k', status: 'online' },
                                { id: 'ad-02', type: 'sell', asset: 'BTC', price: '98,500,000', limit: '100k - 2M', status: 'offline' }
                            ].map((ad) => (
                                <div key={ad.id} className="bg-dark-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`text-xs font-bold px-2 py-1 rounded uppercase ${ad.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {ad.type} {ad.asset}
                                            </div>
                                            <span className="text-slate-500 text-xs font-mono">{ad.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                            <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <p className="text-3xl font-mono font-bold text-white tracking-tight">₦{ad.price}</p>
                                        <p className="text-slate-400 text-xs mt-1">Limit: ₦{ad.limit}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${ad.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
                                            <span className={`text-xs font-medium uppercase ${ad.status === 'online' ? 'text-green-500' : 'text-slate-500'}`}>{ad.status}</span>
                                        </div>
                                        <button className={`text-xs font-bold px-4 py-2 rounded-lg border transition-colors ${ad.status === 'online' ? 'bg-white/5 border-white/10 text-white' : 'bg-brand-500/10 border-brand-500/20 text-brand-400'}`}>
                                            {ad.status === 'online' ? 'Go Offline' : 'Go Online'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setP2pView('post_ad')} className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-500 hover:text-white hover:border-brand-500/50 hover:bg-white/5 transition-all min-h-[200px]">
                                <Plus size={32} className="mb-2 opacity-50" />
                                <span className="font-bold">Create New Ad</span>
                            </button>
                        </div>
                    )}

                    {/* VIEW: HISTORY */}
                    {p2pView === 'history' && (
                        <div className="bg-dark-900 border border-white/5 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-white/5">
                                <h3 className="font-bold text-white">Order History</h3>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-dark-950/50 text-xs font-semibold text-slate-500 uppercase">
                                    <tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Asset</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Counterparty</th><th className="px-6 py-4">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { id: '#O-9923', type: 'Buy', asset: 'USDT', amount: '₦50,000', user: 'CryptoKing', status: 'Completed' },
                                        { id: '#O-9921', type: 'Sell', asset: 'USDT', amount: '₦125,000', user: 'FastLane', status: 'Completed' },
                                        { id: '#O-9800', type: 'Buy', asset: 'BTC', amount: '₦5,000', user: 'WhaleTrader', status: 'Cancelled' }
                                    ].map((order, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors text-sm">
                                            <td className="px-6 py-4 font-mono text-slate-400">{order.id}</td>
                                            <td className="px-6 py-4"><span className={`font-bold ${order.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{order.type}</span></td>
                                            <td className="px-6 py-4 text-white">{order.asset}</td>
                                            <td className="px-6 py-4 font-mono text-white">{order.amount}</td>
                                            <td className="px-6 py-4 text-slate-300">{order.user}</td>
                                            <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{order.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {mode === 'otc' && (
                /* VIP OTC Desk UI - kept compact */
                <div className="bg-gradient-to-br from-amber-500/10 to-brand-900/10 border border-amber-500/20 rounded-3xl p-12 text-center">
                    <Gem size={32} className="text-amber-400 mx-auto mb-6" />
                    <h2 className="font-display font-bold text-4xl text-white mb-4">VIP OTC Desk</h2>
                    <p className="text-amber-100/60 text-lg mb-8">White-glove service for institutional clients trading $100K+ monthly.</p>
                    <Button variant="secondary" className="px-12">Contact OTC Desk</Button>
                </div>
            )}
        </div>
    );
};