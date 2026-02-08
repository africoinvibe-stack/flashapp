import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, ArrowUpRight, Repeat, Wallet, ArrowDownLeft, CreditCard, ChevronRight, X, QrCode, Copy, ArrowLeft, Smartphone, Wifi, Tv, Gamepad2, ChevronLeft, TrendingUp, Zap, Hexagon, CircleDollarSign, History, ArrowRight, SmartphoneNfc, PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface OverviewProps {
    onChangeTab: (tab: any) => void;
}

type Token = {
    id: string;
    name: string;
    symbol: string;
    balance: string;
    value: string;
    color: string; // Gradient class
    icon: string;
    change: string; // 24h change
};

export const Overview: React.FC<OverviewProps> = ({ onChangeTab }) => {
    const [showBalance, setShowBalance] = useState(true);
    const [activeWallet, setActiveWallet] = useState<'usd' | 'ngn' | 'crypto'>('ngn');
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    
    // Promo Carousel State
    const [promoIndex, setPromoIndex] = useState(0);

    // Mock User Data
    const accountNumber = "9011223344"; 

    const tokens: Token[] = [
        { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '0.4521', value: '43,240.00', color: 'from-orange-500 to-amber-600', icon: '₿', change: '+2.4%' },
        { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '4.20', value: '12,450.00', color: 'from-indigo-500 to-purple-600', icon: 'Ξ', change: '-1.2%' },
        { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: '1,250.00', value: '1,250.00', color: 'from-emerald-500 to-teal-600', icon: '₮', change: '+0.01%' },
        { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: '850.00', value: '850.00', color: 'from-blue-500 to-cyan-600', icon: '$', change: '0.00%' },
    ];

    const recentTransactions = [
        { id: 1, title: 'Netflix Subscription', amount: '-$14.99', date: 'Today', icon: '🎬', type: 'debit' },
        { id: 2, title: 'USDT Swap', amount: '+$1,200.00', date: 'Yesterday', icon: '💱', type: 'credit' },
        { id: 3, title: 'Deposit from Bank', amount: '+$250.00', date: 'Yesterday', icon: '🏦', type: 'credit' },
        { id: 4, title: 'Starbucks Coffee', amount: '-$5.50', date: 'Yesterday', icon: '☕️', type: 'debit' },
    ];

    const walletConfig = {
        ngn: { 
            balance: '8,450,200.00', 
            currency: '₦', 
            label: 'Flash NGN', 
            style: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950',
            border: 'border-emerald-500/30',
            accent: 'text-emerald-400',
            glow: 'bg-emerald-500/20',
            pattern: (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M10 10 h80 v80 h-80 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                                <circle cx="90" cy="90" r="2" fill="currentColor"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" className="text-emerald-400" />
                    </svg>
                </div>
            )
        },
        usd: { 
            balance: '12,450.00', 
            currency: '$', 
            label: 'Flash USD', 
            style: 'bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-950',
            border: 'border-amber-500/30',
            accent: 'text-amber-400',
            glow: 'bg-amber-500/20',
            pattern: (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="goldShine" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#b45309" stopOpacity="0"/>
                            </radialGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#goldShine)" />
                    </svg>
                </div>
            )
        },
        crypto: { 
            balance: tokens[0].balance, 
            currency: tokens[0].symbol, 
            label: tokens[0].name, 
            style: 'bg-gradient-to-br from-indigo-950 via-violet-950 to-fuchsia-950',
            border: 'border-violet-500/30',
            accent: 'text-violet-400',
            glow: 'bg-violet-500/20',
            subValue: `≈ $${tokens[0].value}`,
            pattern: (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" className="text-violet-400" />
                    </svg>
                </div>
            )
        }
    };

    const promos = [
        { 
            id: 1,
            title: "Get Metal Card", 
            desc: "Upgrade for 2% cashback.", 
            color: "from-electric-600 to-electric-800",
            icon: <CreditCard className="text-white/80" size={24} />,
            btn: "Plans",
            action: () => onChangeTab('cards')
        },
        { 
            id: 2,
            title: "Dollar Card", 
            desc: "Shop on Amazon & Netflix.", 
            color: "from-brand-600 to-brand-800",
            icon: <Wallet className="text-white/80" size={24} />,
            btn: "Create",
             action: () => onChangeTab('cards')
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setPromoIndex((prev) => (prev + 1) % promos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const activeConfig = walletConfig[activeWallet];
    const displayData = (activeWallet === 'crypto' && selectedToken) ? {
        ...activeConfig,
        balance: selectedToken.balance,
        currency: selectedToken.symbol,
        label: selectedToken.name,
        subValue: `≈ $${selectedToken.value}`,
    } : { ...activeConfig };

    return (
        <div className="space-y-6">
             {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                        Hi, <span className="text-brand-400">@johndoe</span>
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-widest font-black">Verified Node 04A</p>
                </div>
                <button 
                    onClick={() => onChangeTab('pay')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 text-slate-950 rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-xl shadow-brand-500/20 active:scale-95 transition-transform"
                >
                    <SmartphoneNfc size={18} /> Flash Pay
                </button>
            </div>

            {/* Top Row: Balance Card & Asset List */}
            <div className="grid lg:grid-cols-3 gap-6">
                <motion.div layout className={`lg:col-span-2 rounded-[2rem] p-0.5 relative group overflow-hidden shadow-2xl ${displayData.style}`}>
                    <div className="relative h-full bg-black/20 backdrop-blur-sm rounded-[1.9rem] p-5 sm:p-8 overflow-hidden">
                        {displayData.pattern}
                        <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-[60px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${displayData.glow}`} />

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px] sm:min-h-[260px]">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <p className="text-white/90 font-bold tracking-wide text-[10px] sm:text-xs uppercase flex items-center gap-2">
                                        {displayData.label}
                                        <button onClick={() => setShowBalance(!showBalance)} className="text-white/50">{showBalance ? <Eye size={12} /> : <EyeOff size={12} />}</button>
                                    </p>
                                </div>
                                <div className="bg-black/40 backdrop-blur-xl rounded-full p-1 flex border border-white/10 scale-90 sm:scale-100 origin-right">
                                    {['ngn', 'usd', 'crypto'].map((w) => (
                                        <button key={w} onClick={() => setActiveWallet(w as any)} className={`px-3 sm:px-4 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase transition-all ${activeWallet === w ? 'bg-white text-slate-950 shadow-xl' : 'text-white/40'}`}>{w}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 mb-6">
                                <h2 className="font-mono font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl tracking-tighter text-white flex flex-wrap items-baseline gap-2">
                                    {showBalance ? (
                                        <>
                                            {activeWallet !== 'crypto' && <span className={`text-base sm:text-2xl font-sans font-medium opacity-70 ${displayData.accent}`}>{displayData.currency}</span>}
                                            <span className="truncate max-w-full">{displayData.balance}</span>
                                            {activeWallet === 'crypto' && <span className={`text-base sm:text-2xl font-sans font-medium opacity-70 ${displayData.accent}`}>{displayData.currency}</span>}
                                        </>
                                    ) : '••••••••'}
                                </h2>
                                
                                {showBalance && (
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {activeWallet === 'crypto' && <p className="text-white/80 text-[10px] sm:text-xs font-bold bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">{displayData.subValue}</p>}
                                        {activeWallet === 'ngn' && (
                                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                                <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">ID:</span>
                                                <span className="font-mono text-white font-bold text-[10px] sm:text-xs">{accountNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-4">
                                <button onClick={() => activeWallet === 'crypto' ? setShowReceiveModal(true) : onChangeTab('fund')} className="bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-[10px] sm:text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-1">
                                   {activeWallet === 'crypto' ? <ArrowDownLeft size={14} className={displayData.accent} /> : <Plus size={14} className={displayData.accent} />} 
                                   {activeWallet === 'crypto' ? 'Receive' : 'Fund'}
                                </button>
                                <button className="bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-[10px] sm:text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-1">
                                   <ArrowUpRight size={14} className={displayData.accent} /> Send
                                </button>
                                <button onClick={() => onChangeTab('trade')} className="col-span-2 xs:col-span-1 bg-white text-slate-950 active:scale-95 py-3 sm:py-4 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg">
                                   <Repeat size={14} /> Swap
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Bills / Assets Panel */}
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-5 sm:p-6">
                    {activeWallet === 'crypto' ? (
                        <div className="h-full flex flex-col">
                            <h3 className="font-bold text-white text-sm mb-4">Assets</h3>
                            <div className="flex-1 space-y-2 overflow-y-auto max-h-[160px] sm:max-h-none custom-scrollbar pr-1">
                                {tokens.map((token) => (
                                    <div key={token.id} onClick={() => setSelectedToken(token)} className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${ (selectedToken?.id === token.id) || (!selectedToken && token.id === 'btc') ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent' }`}>
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${token.color} flex flex-shrink-0 items-center justify-center text-white font-bold text-sm shadow-lg`}>{token.icon}</div>
                                            <p className="text-xs font-bold text-white truncate">{token.name}</p>
                                        </div>
                                        <p className="text-[10px] font-mono font-bold text-emerald-400">{token.change}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            <h3 className="font-bold text-white text-sm mb-4">Quick Bills</h3>
                            <div className="grid grid-cols-4 gap-2 mb-6">
                                {[
                                    { icon: <Smartphone size={16} />, label: 'Airtime', col: 'text-emerald-500' },
                                    { icon: <Wifi size={16} />, label: 'Data', col: 'text-electric-500' },
                                    { icon: <Gamepad2 size={16} />, label: 'Bet', col: 'text-orange-500' },
                                    { icon: <Tv size={16} />, label: 'TV', col: 'text-purple-500' },
                                ].map((item, i) => (
                                    <button key={i} onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 active:scale-95 transition-all">
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center ${item.col}`}>{item.icon}</div>
                                        <span className="text-[7px] sm:text-[9px] font-black uppercase text-slate-500 truncate">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => onChangeTab('pay')} className="w-full mt-auto flex items-center justify-between p-4 rounded-2xl bg-brand-500 text-slate-950 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-500/10">
                                <span className="flex items-center gap-2"><QrCode size={18} /> Scan Pay</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Activity Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-5 sm:p-6 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white text-sm">Recent Feed</h3>
                        <button onClick={() => onChangeTab('transactions')} className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">All History</button>
                    </div>
                    <div className="space-y-1">
                        {recentTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-9 h-9 rounded-full bg-dark-950 border border-white/5 flex flex-shrink-0 items-center justify-center text-base sm:text-lg">{tx.icon}</div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white text-[11px] sm:text-xs truncate">{tx.title}</p>
                                        <p className="text-[9px] text-slate-500 font-mono">{tx.date}</p>
                                    </div>
                                </div>
                                <p className={`font-mono font-bold text-[11px] sm:text-xs ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>{tx.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/40 via-dark-900 to-dark-900 border border-white/5 rounded-[2rem] p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                    <div>
                         <h3 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Upgrade Node</h3>
                         <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs mb-6">Verify BVN/NIN to unlock $100,000 monthly limits and metal cards.</p>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl group-hover:bg-indigo-500 transition-all">Start Verification</button>
                </div>
            </div>
            
            <AnimatePresence>
                {showReceiveModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReceiveModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-dark-900 border border-white/10 p-6 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl">
                            <button onClick={() => setShowReceiveModal(false)} className="absolute top-4 right-4 text-slate-400 p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
                            <h3 className="text-lg font-bold text-white mb-6 text-center">Receive Asset</h3>
                            <div className="bg-white p-4 rounded-2xl mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6 shadow-2xl">
                                <QrCode className="w-full h-full text-black" />
                            </div>
                            <div className="bg-dark-950 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 overflow-hidden">
                                <span className="text-[10px] text-slate-400 truncate font-mono">0x71C...492F9</span>
                                <button className="text-brand-400 p-2 hover:bg-white/5 rounded-lg flex-shrink-0"><Copy size={16} /></button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};