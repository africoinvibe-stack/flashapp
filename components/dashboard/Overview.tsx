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
            desc: "Upgrade to Flash Metal for 2% cashback.", 
            color: "from-electric-600 to-electric-800",
            icon: <CreditCard className="text-white/80" size={24} />,
            btn: "Plans",
            action: () => onChangeTab('cards')
        },
        { 
            id: 2,
            title: "Dollar Card", 
            desc: "Shop globally on Amazon & Netflix.", 
            color: "from-brand-600 to-brand-800",
            icon: <Wallet className="text-white/80" size={24} />,
            btn: "Create",
             action: () => onChangeTab('cards')
        },
        { 
            id: 3,
            title: "Instant Bills", 
            desc: "Zero fees on Airtime and Data bundles.", 
            color: "from-emerald-600 to-teal-800",
            icon: <Smartphone className="text-white/80" size={24} />,
            btn: "Pay",
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
        setSelectedToken(null);
        setRecipient('');
        setAmount('');
    };

    const activeConfig = walletConfig[activeWallet];
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
        <div className="space-y-6 relative overflow-x-hidden">
             {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
                        Hi, <span className="text-brand-400">@johndoe</span>
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm">Activity summary for your wallet.</p>
                </div>
                <div className="w-full sm:w-auto">
                   <button 
                    onClick={() => onChangeTab('pay')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 text-slate-950 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-brand-500/20 active:scale-95 transition-transform"
                   >
                       <SmartphoneNfc size={16} /> Flash Pay
                   </button>
                </div>
            </div>

            {/* Receive Modal (Simplified mobile view) */}
            <AnimatePresence>
                {showReceiveModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReceiveModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-dark-900 border border-white/10 p-6 rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl">
                            <button onClick={() => setShowReceiveModal(false)} className="absolute top-4 right-4 text-slate-400 p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
                            <h3 className="text-lg font-bold text-white mb-6 text-center">Receive {displayData.currency}</h3>
                            <div className="bg-white p-4 rounded-2xl mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6 shadow-2xl">
                                <QrCode className="w-full h-full text-black" />
                            </div>
                            <div className="bg-dark-950 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 mb-4 overflow-hidden">
                                <span className="text-[10px] text-slate-400 truncate font-mono">0x71C8129384812938492F9</span>
                                <button className="text-brand-400 p-2 hover:bg-white/5 rounded-lg flex-shrink-0"><Copy size={16} /></button>
                            </div>
                            <p className="text-[10px] text-slate-500 text-center uppercase tracking-tighter">Only send {displayData.label} assets to this protocol address.</p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Top Row: Balance Card & Asset List */}
            <div className="grid lg:grid-cols-3 gap-6">
                <motion.div layout className={`lg:col-span-2 rounded-[2rem] p-0.5 relative group overflow-hidden shadow-2xl ${displayData.style}`}>
                    <div className="relative h-full bg-black/20 backdrop-blur-sm rounded-[1.9rem] p-6 sm:p-8 overflow-hidden">
                        {displayData.pattern}
                        <div className={`absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-[60px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${displayData.glow}`} />

                        <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px] sm:min-h-[280px]">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 ${displayData.accent}`}>
                                        {activeWallet === 'ngn' && <Smartphone size={16} />}
                                        {activeWallet === 'usd' && <CircleDollarSign size={16} />}
                                        {activeWallet === 'crypto' && <Hexagon size={16} />}
                                    </div>
                                    <p className="text-white/90 font-bold tracking-wide text-[10px] sm:text-xs uppercase flex items-center gap-2">
                                        {displayData.label}
                                        <button onClick={() => setShowBalance(!showBalance)} className="text-white/50">{showBalance ? <Eye size={12} /> : <EyeOff size={12} />}</button>
                                    </p>
                                </div>

                                <div className="bg-black/40 backdrop-blur-xl rounded-full p-1 flex border border-white/10 self-end sm:self-auto">
                                    {['ngn', 'usd', 'crypto'].map((w) => (
                                        <button key={w} onClick={() => handleWalletChange(w as any)} className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase transition-all ${activeWallet === w ? 'bg-white text-slate-950 shadow-xl' : 'text-white/40'}`}>{w}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 mb-8 overflow-hidden">
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
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                                        {activeWallet === 'crypto' && <p className="text-white/80 text-[10px] sm:text-xs font-bold bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">{displayData.subValue}</p>}
                                        {activeWallet === 'ngn' && (
                                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md px-2 py-1 rounded-lg border border-emerald-500/20 max-w-full overflow-hidden">
                                                <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest flex-shrink-0">Acc:</span>
                                                <span className="font-mono text-white font-bold text-[10px] sm:text-xs truncate">{accountNumber}</span>
                                            </div>
                                        )}
                                        {activeWallet === 'usd' && <div className="inline-flex items-center gap-1 text-amber-400 text-[9px] font-bold bg-amber-500/10 px-2 py-1 rounded-lg">+2.4% yield</div>}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-4">
                                {activeWallet === 'crypto' ? (
                                    <>
                                        <button onClick={() => setShowReceiveModal(true)} className="flex-1 bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-2"><ArrowDownLeft size={14} className={displayData.accent} /> Receive</button>
                                        <button className="flex-1 bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-2"><ArrowUpRight size={14} className={displayData.accent} /> Send</button>
                                        <button onClick={() => onChangeTab('trade')} className="flex-1 col-span-2 xs:col-span-1 bg-white text-slate-950 active:scale-95 py-3 sm:py-4 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg"><Plus size={14} /> Buy</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => onChangeTab('fund')} className="flex-1 bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-2"><Plus size={14} className={displayData.accent} /> Top-up</button>
                                        <button className="flex-1 bg-white text-slate-950 active:scale-95 py-3 sm:py-4 rounded-xl font-black uppercase text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg truncate px-2"><ArrowUpRight size={14} /> Transfer</button>
                                        <button onClick={() => onChangeTab('trade')} className="flex-1 col-span-2 xs:col-span-1 bg-white/10 active:scale-95 py-3 sm:py-4 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 border border-white/5 truncate px-2"><Repeat size={14} className={displayData.accent} /> Swap</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Panel: Assets/QuickSpend */}
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-5 sm:p-6 flex flex-col h-full overflow-hidden">
                    {activeWallet === 'crypto' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white text-sm">Assets</h3>
                                <button className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Manage</button>
                            </div>
                            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
                                {tokens.map((token) => (
                                    <div key={token.id} onClick={() => setSelectedToken(token)} className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${ (selectedToken?.id === token.id) || (!selectedToken && token.id === 'btc') ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent' }`}>
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${token.color} flex flex-shrink-0 items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg`}>{token.icon}</div>
                                            <div className="overflow-hidden">
                                                <p className="text-xs sm:text-sm font-bold text-white truncate">{token.name}</p>
                                                <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono truncate">{token.balance} {token.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs sm:text-sm font-bold text-white font-mono">${token.value}</p>
                                            <p className={`text-[9px] sm:text-[10px] font-bold ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{token.change}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : activeWallet === 'ngn' ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-white text-sm">Quick Bills</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-6">
                                {[
                                    { icon: <Smartphone size={16} />, label: 'Airtime', col: 'text-emerald-500' },
                                    { icon: <Wifi size={16} />, label: 'Data', col: 'text-electric-500' },
                                    { icon: <Gamepad2 size={16} />, label: 'Bets', col: 'text-orange-500' },
                                    { icon: <Tv size={16} />, label: 'TV', col: 'text-purple-500' },
                                ].map((item, i) => (
                                    <button key={i} onClick={() => onChangeTab('bills')} className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/5 active:scale-95 transition-all group">
                                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center ${item.col}`}>{item.icon}</div>
                                        <span className="text-[8px] sm:text-[9px] font-black uppercase text-slate-400 truncate max-w-full">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 mt-auto">
                                <button onClick={() => onChangeTab('pay')} className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-brand-500 text-slate-950 font-black uppercase text-[10px] tracking-tight"><span className="flex items-center gap-2"><QrCode size={16} /> Scan Terminal</span><ChevronRight size={14} /></button>
                                <button onClick={() => onChangeTab('pay')} className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white/5 text-white border border-white/10 font-black uppercase text-[10px] tracking-tight"><span className="flex items-center gap-2"><SmartphoneNfc size={16} /> Tap to Pay</span><ChevronRight size={14} /></button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white text-sm uppercase tracking-widest">USD Send</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] text-slate-500 font-black uppercase ml-1 block mb-1">Recipient Tag</label>
                                    <input type="text" placeholder="@tag" className="w-full bg-dark-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:border-brand-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-[9px] text-slate-500 font-black uppercase ml-1 block mb-1">Amount ($)</label>
                                    <input type="text" placeholder="0.00" className="w-full bg-dark-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:border-brand-500 outline-none" />
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-[9px] sm:text-[10px] space-y-1">
                                    <div className="flex justify-between text-slate-500 uppercase"><span>Rate</span><span className="text-white">1 USD ≈ 1,450 NGN</span></div>
                                    <div className="flex justify-between text-slate-500 uppercase"><span>Fee</span><span className="text-green-400">FREE</span></div>
                                </div>
                            </div>
                            <Button className="w-full mt-auto bg-amber-500 text-slate-950 font-black text-[10px] uppercase py-3.5 rounded-xl shadow-lg shadow-amber-500/10">Execute Send</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row: Advert Carousel & Transactions */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-6 relative overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="font-bold text-white text-sm">Highlights</h3>
                        <div className="flex gap-1">
                            {promos.map((_, idx) => (
                                <div key={idx} className={`w-1 h-1 rounded-full transition-colors ${idx === promoIndex ? 'bg-white' : 'bg-white/20'}`} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 relative overflow-hidden rounded-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div key={promoIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className={`absolute inset-0 bg-gradient-to-br ${promos[promoIndex].color} p-5 sm:p-6 flex flex-col justify-between`}>
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">{promos[promoIndex].icon}</div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2 italic uppercase tracking-tighter">{promos[promoIndex].title}</h3>
                                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">{promos[promoIndex].desc}</p>
                                </div>
                                <button onClick={promos[promoIndex].action} className="w-full py-3.5 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] hover:bg-white/90 transition-colors shadow-lg mt-4 flex items-center justify-center gap-2 group">
                                    {promos[promoIndex].btn} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-dark-900 border border-white/5 rounded-[2rem] p-5 sm:p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white text-sm">Activity</h3>
                        <button onClick={() => onChangeTab('transactions')} className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">All</button>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                        {recentTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group overflow-hidden">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-9 h-9 rounded-full bg-dark-950 border border-white/5 flex flex-shrink-0 items-center justify-center text-base sm:text-lg group-hover:scale-110 transition-transform">{tx.icon}</div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white text-[11px] sm:text-xs truncate">{tx.title}</p>
                                        <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                    <p className={`font-mono font-bold text-[11px] sm:text-xs ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>{tx.amount}</p>
                                    <p className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">{tx.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};