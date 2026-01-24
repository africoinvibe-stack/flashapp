import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, ArrowUpRight, Repeat, Wallet, ArrowDownLeft, CreditCard, ChevronRight, X, QrCode, Copy, ArrowLeft, Smartphone, Wifi, Tv, Gamepad2, ChevronLeft, TrendingUp, Zap, Hexagon, CircleDollarSign, History, ArrowRight } from 'lucide-react';
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
    
    // Quick Transfer State
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    // Promo Carousel State
    const [promoIndex, setPromoIndex] = useState(0);

    // Mock User Data
    const userPhone = "09011223344"; 
    const accountNumber = userPhone.substring(1); 

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

    // Default Wallet States (Futuristic Config)
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
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M10 10 h80 v80 h-80 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                                <circle cx="90" cy="90" r="2" fill="currentColor"/>
                                <path d="M10 10 l20 20 h40 l20 -20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
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
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="goldShine" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#b45309" stopOpacity="0"/>
                            </radialGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#goldShine)" />
                        <path d="M0 100 Q 50 50 100 100 T 200 100" stroke="rgba(251, 191, 36, 0.2)" fill="none" strokeWidth="2" />
                    </svg>
                </div>
            )
        },
        crypto: { 
            // BTC Default Data
            balance: tokens[0].balance, 
            currency: tokens[0].symbol, 
            label: tokens[0].name, 
            style: 'bg-gradient-to-br from-indigo-950 via-violet-950 to-fuchsia-950',
            border: 'border-violet-500/30',
            accent: 'text-violet-400',
            glow: 'bg-violet-500/20',
            subValue: `≈ $${tokens[0].value}`,
            pattern: (
                <div className="absolute inset-0 opacity-20">
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
            desc: "Upgrade to Flash Metal for 2% cashback and higher limits.", 
            color: "from-electric-600 to-electric-800",
            icon: <CreditCard className="text-white/80" size={24} />,
            btn: "View Plans",
            action: () => onChangeTab('cards')
        },
        { 
            id: 2,
            title: "Virtual Dollar Card", 
            desc: "Shop globally on Amazon, Netflix & Apple with zero restrictions.", 
            color: "from-brand-600 to-brand-800",
            icon: <Wallet className="text-white/80" size={24} />,
            btn: "Create Card",
             action: () => onChangeTab('cards')
        },
        { 
            id: 3,
            title: "Pay Bills Instantly", 
            desc: "Zero fees on Airtime and Data. Instant activation for Cable TV.", 
            color: "from-emerald-600 to-teal-800",
            icon: <Smartphone className="text-white/80" size={24} />,
            btn: "Pay Now",
             action: () => onChangeTab('bills')
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setPromoIndex((prev) => (prev + 1) % promos.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleWalletChange = (wallet: 'usd' | 'ngn' | 'crypto') => {
        setActiveWallet(wallet);
        // Reset selection when changing wallets, defaults to BTC for crypto
        setSelectedToken(null);
        setRecipient('');
        setAmount('');
    };

    // Determine current display values based on selection
    const activeConfig = walletConfig[activeWallet];
    
    // Override display if a token is explicitly selected from the list (only applicable in crypto mode)
    // If no token selected in crypto mode, walletConfig.crypto (BTC) is used.
    const displayData = (activeWallet === 'crypto' && selectedToken) ? {
        balance: selectedToken.balance,
        currency: selectedToken.symbol,
        label: selectedToken.name,
        style: activeConfig.style,
        accent: activeConfig.accent,
        subValue: `≈ $${selectedToken.value}`,
        border: activeConfig.border,
        glow: activeConfig.glow,
        pattern: activeConfig.pattern,
    } : {
        ...activeConfig,
    };

    return (
        <div className="space-y-6 relative">
             {/* Greeting Header */}
            <div className="flex items-center justify-between pb-2">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">
                        Good Morning, <span className="text-brand-400">@johndoe</span>
                    </h2>
                    <p className="text-slate-400 text-sm">Here's what's happening with your wallet today.</p>
                </div>
            </div>

            {/* Receive Modal Overlay */}
            <AnimatePresence>
                {showReceiveModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setShowReceiveModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-dark-900 border border-white/10 p-6 rounded-3xl w-full max-w-sm relative z-10 shadow-2xl"
                        >
                            <button onClick={() => setShowReceiveModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-bold text-white mb-6 text-center">Receive {displayData.currency}</h3>
                            <div className="bg-white p-4 rounded-xl mx-auto w-48 h-48 mb-6">
                                <QrCode className="w-full h-full text-black" />
                            </div>
                            <div className="bg-dark-950 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 mb-4">
                                <span className="text-xs text-slate-400 truncate font-mono">0x71C...92F9</span>
                                <button className="text-brand-400 hover:text-brand-300 p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <Copy size={16} />
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 text-center">
                                Only send {displayData.label} to this address. Sending other assets may result in permanent loss.
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Top Row: Balance Card & Side Panel */}
            <div className="grid lg:grid-cols-3 gap-6">
                <motion.div 
                    layout
                    className={`lg:col-span-2 rounded-[2rem] p-1 relative group overflow-hidden transition-all duration-500 shadow-2xl ${displayData.style}`}
                >
                    {/* Border Gradient Container */}
                    <div className={`absolute inset-0 rounded-[2rem] border border-white/10 ${displayData.border}`} />
                    
                    {/* Inner Card Content */}
                    <div className="relative h-full bg-black/20 backdrop-blur-sm rounded-[1.8rem] p-8 overflow-hidden">
                        {/* Background Patterns */}
                        {displayData.pattern}
                        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${displayData.glow}`} />

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[280px]">
                            
                            {/* Header: Label & Toggle */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 ${displayData.accent}`}>
                                            {activeWallet === 'ngn' && <Smartphone size={16} />}
                                            {activeWallet === 'usd' && <CircleDollarSign size={16} />}
                                            {activeWallet === 'crypto' && <Hexagon size={16} />}
                                        </div>
                                        <p className="text-white/90 font-bold tracking-wide text-sm uppercase flex items-center gap-2">
                                            {displayData.label}
                                            <button onClick={() => setShowBalance(!showBalance)} className="hover:text-white text-white/50 transition-colors">
                                                {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                                            </button>
                                        </p>
                                    </div>
                                </div>

                                {/* Wallet Switcher Pills */}
                                <div className="bg-black/40 backdrop-blur-xl rounded-full p-1 flex border border-white/10">
                                    <button 
                                        onClick={() => handleWalletChange('ngn')}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeWallet === 'ngn' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'text-white/50 hover:text-white'}`}
                                    >
                                        NGN
                                    </button>
                                    <button 
                                        onClick={() => handleWalletChange('usd')}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeWallet === 'usd' ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'text-white/50 hover:text-white'}`}
                                    >
                                        USD
                                    </button>
                                    <button 
                                        onClick={() => handleWalletChange('crypto')}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeWallet === 'crypto' ? 'bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'text-white/50 hover:text-white'}`}
                                    >
                                        Crypto
                                    </button>
                                </div>
                            </div>

                            {/* Main Balance Display */}
                            <div className="mt-8 mb-8">
                                <h2 className="font-mono font-bold text-5xl sm:text-6xl tracking-tighter text-white drop-shadow-lg flex items-baseline gap-2">
                                    {showBalance ? (
                                        <>
                                            {activeWallet !== 'crypto' && <span className={`text-2xl font-sans font-medium opacity-70 ${displayData.accent}`}>{displayData.currency}</span>}
                                            {displayData.balance}
                                            {activeWallet === 'crypto' && <span className={`text-2xl font-sans font-medium opacity-70 ${displayData.accent}`}>{displayData.currency}</span>}
                                        </>
                                    ) : '••••••••'}
                                </h2>
                                
                                {showBalance && (
                                    <div className="flex items-center gap-3 mt-2">
                                         {/* Sub Value for Crypto (BTC default or Selected Token) */}
                                        {activeWallet === 'crypto' && (
                                            <p className="text-white/80 text-sm font-medium bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/5">
                                                {displayData.subValue}
                                            </p>
                                        )}
                                        {/* NGN Account Number Display */}
                                        {activeWallet === 'ngn' && (
                                            <div className="inline-flex items-center gap-3 bg-emerald-500/10 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/20 group/copy cursor-pointer hover:bg-emerald-500/20 transition-all">
                                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Flash Account Number:</span>
                                                <span className="font-mono text-white font-bold tracking-widest text-sm">{accountNumber}</span>
                                                <button className="text-emerald-400 hover:text-white transition-colors">
                                                    <Copy size={12} />
                                                </button>
                                            </div>
                                        )}
                                        {activeWallet === 'usd' && (
                                             <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                                                <TrendingUp size={12} /> +2.4% yield
                                             </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                {activeWallet === 'crypto' ? (
                                    <>
                                        <button 
                                            onClick={() => setShowReceiveModal(true)}
                                            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-white/20"
                                        >
                                            <ArrowDownLeft size={18} className={displayData.accent} /> Receive
                                        </button>
                                        <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-white/20">
                                            <ArrowUpRight size={18} className={displayData.accent} /> Send
                                        </button>
                                        <button 
                                            onClick={() => onChangeTab('trade')}
                                            className="flex-1 bg-white text-slate-950 hover:bg-white/90 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <Plus size={18} /> Buy
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-white/20">
                                            <Plus size={18} className={displayData.accent} /> Add Money
                                        </button>
                                        <button className="flex-1 bg-white text-slate-950 hover:bg-white/90 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg">
                                            <ArrowUpRight size={18} /> Transfer
                                        </button>
                                        <button onClick={() => onChangeTab('trade')} className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-white/20">
                                            <Repeat size={18} className={displayData.accent} /> Swap
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel: Conditional Rendering based on Wallet Type */}
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-6 flex flex-col h-full overflow-hidden">
                    {activeWallet === 'crypto' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white">Your Assets</h3>
                                <Button variant="ghost" size="sm" className="text-xs">Manage</Button>
                            </div>
                            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                                {tokens.map((token) => (
                                    <div 
                                        key={token.id}
                                        onClick={() => setSelectedToken(token)}
                                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                                            (selectedToken?.id === token.id) || (!selectedToken && token.id === 'btc') // Highlight BTC if nothing selected (default view)
                                                ? 'bg-white/10 border-white/20 shadow-lg' 
                                                : 'bg-transparent border-transparent hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${token.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                                {token.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{token.name}</p>
                                                <p className="text-xs text-slate-400 font-mono">{token.balance} {token.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-white font-mono">${token.value}</p>
                                            <p className={`text-xs font-medium ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                {token.change}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <button className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all mt-2">
                                    <Plus size={16} /> Import Token
                                </button>
                            </div>
                        </>
                    ) : activeWallet === 'ngn' ? (
                        /* NGN View with Quick Bills & Transfer */
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white">Quick Bills</h3>
                                <div className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                    INSTANT
                                </div>
                            </div>
                            
                            {/* Bill Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-6">
                                <button onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-900/20">
                                        <Smartphone size={18} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Airtime</span>
                                </button>
                                <button onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-electric-500/30 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-electric-500/10 flex items-center justify-center text-electric-500 group-hover:scale-110 transition-transform shadow-lg shadow-electric-900/20">
                                        <Wifi size={18} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Data</span>
                                </button>
                                <button onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-lg shadow-orange-900/20">
                                        <Gamepad2 size={18} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Betting</span>
                                </button>
                                <button onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                                        <Tv size={18} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">TV</span>
                                </button>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white">Quick Transfer</h3>
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block uppercase">Recipient</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500">@</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            value={recipient}
                                            onChange={(e) => setRecipient(e.target.value)}
                                            placeholder="username or phone" 
                                            className="w-full bg-dark-950 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block uppercase">Amount</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500">₦</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00" 
                                            className="w-full bg-dark-950 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                                        />
                                    </div>
                                </div>
                                <Button className="w-full mt-auto bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold shadow-lg shadow-emerald-500/20">
                                    Send Instantly
                                </Button>
                            </div>
                        </>
                    ) : (
                        /* USD View with Quick Transfer (Replaced Promos) */
                        <>
                             <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white">Quick Transfer</h3>
                                <div className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                                    USD
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block uppercase">Recipient</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500">@</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Flash Tag" 
                                            className="w-full bg-dark-950 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 font-bold ml-1 mb-1.5 block uppercase">Amount</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500">$</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="0.00" 
                                            className="w-full bg-dark-950 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                                        />
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Exchange Rate</span>
                                        <span className="text-white">1 USD ≈ 1,450 NGN</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>Fee</span>
                                        <span className="text-green-400">Free</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-auto bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold shadow-lg shadow-amber-500/20">
                                    Send USD
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Bottom Row: Advert Carousel & Transactions */}
            <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Advert Carousel */}
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-6 relative overflow-hidden min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="font-bold text-white">Highlights</h3>
                        <div className="flex gap-1.5">
                            {promos.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === promoIndex ? 'bg-white' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 relative overflow-hidden rounded-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={promoIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`absolute inset-0 bg-gradient-to-br ${promos[promoIndex].color} p-6 flex flex-col justify-between`}
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                                        {promos[promoIndex].icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{promos[promoIndex].title}</h3>
                                    <p className="text-white/80 text-base leading-relaxed max-w-sm">{promos[promoIndex].desc}</p>
                                </div>

                                <button 
                                    onClick={promos[promoIndex].action}
                                    className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors shadow-lg mt-6 flex items-center justify-center gap-2 group"
                                >
                                    {promos[promoIndex].btn} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Recent Transactions Summary */}
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white">Recent Activity</h3>
                        <Button variant="ghost" size="sm" onClick={() => onChangeTab('transactions')} className="text-xs">
                            View All
                        </Button>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                        {recentTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-dark-950 border border-white/10 flex items-center justify-center text-lg shadow-sm group-hover:border-white/20 group-hover:scale-105 transition-all">
                                        {tx.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{tx.title}</p>
                                        <p className="text-xs text-slate-500">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-mono font-bold text-sm ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                                        {tx.amount}
                                    </p>
                                    <p className="text-[10px] text-slate-500 uppercase font-medium">{tx.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};