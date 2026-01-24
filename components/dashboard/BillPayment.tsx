import React, { useState } from 'react';
import { Smartphone, Wifi, Tv, Zap, Gamepad2, GraduationCap, ChevronRight, Search, CheckCircle2, History, CreditCard, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const BillPayment: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [paymentStep, setPaymentStep] = useState<'select' | 'details' | 'confirm' | 'processing' | 'success'>('select');
    const [provider, setProvider] = useState<any>(null);
    const [amount, setAmount] = useState('');
    const [identifier, setIdentifier] = useState(''); // Phone number or Smart Card Number

    const categories = [
        { id: 'airtime', name: 'Airtime', icon: <Smartphone size={24} />, color: 'from-pink-500 to-rose-600', desc: 'Top up any network instantly' },
        { id: 'data', name: 'Data Bundle', icon: <Wifi size={24} />, color: 'from-cyan-500 to-blue-600', desc: 'Daily, weekly & monthly plans' },
        { id: 'tv', name: 'Cable TV', icon: <Tv size={24} />, color: 'from-purple-500 to-indigo-600', desc: 'DSTV, GOTV, Startimes' },
        { id: 'electricity', name: 'Electricity', icon: <Zap size={24} />, color: 'from-yellow-500 to-orange-600', desc: 'Prepaid & Postpaid units' },
        { id: 'betting', name: 'Betting', icon: <Gamepad2 size={24} />, color: 'from-emerald-500 to-green-600', desc: 'Fund your betting wallets' },
        { id: 'education', name: 'Education', icon: <GraduationCap size={24} />, color: 'from-slate-500 to-slate-700', desc: 'JAMB, WAEC PINs' },
    ];

    const providers: Record<string, any[]> = {
        airtime: [
            { id: 'mtn', name: 'MTN', color: '#FFcc00' },
            { id: 'glo', name: 'Glo', color: '#00cc33' },
            { id: 'airtel', name: 'Airtel', color: '#ff0000' },
            { id: '9mobile', name: '9mobile', color: '#006600' },
        ],
        data: [
            { id: 'mtn', name: 'MTN Data', color: '#FFcc00' },
            { id: 'glo', name: 'Glo Data', color: '#00cc33' },
            { id: 'airtel', name: 'Airtel Data', color: '#ff0000' },
        ],
        tv: [
            { id: 'dstv', name: 'DSTV', color: '#00aeef' },
            { id: 'gotv', name: 'GOTV', color: '#fdb813' },
            { id: 'startimes', name: 'Startimes', color: '#0072bc' },
        ],
        electricity: [
            { id: 'ikeja', name: 'Ikeja Electric', color: '#ed1c24' },
            { id: 'eko', name: 'Eko Electric', color: '#0072bc' },
            { id: 'abuja', name: 'Abuja Electric', color: '#00a651' },
        ]
    };

    const handleCategorySelect = (id: string) => {
        setSelectedCategory(id);
        setPaymentStep('details');
        setProvider(null);
        setAmount('');
        setIdentifier('');
    };

    const handlePayment = () => {
        setPaymentStep('processing');
        setTimeout(() => {
            setPaymentStep('success');
        }, 2000);
    };

    const resetFlow = () => {
        setSelectedCategory(null);
        setPaymentStep('select');
        setProvider(null);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Bill Payments</h2>
                    <p className="text-slate-400 text-sm">Pay bills instantly with zero fees using your Flash Account.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors text-white border border-white/5">
                        <History size={16} /> History
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Panel: Selection & Flow */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-dark-900 border border-white/5 rounded-3xl p-6 md:p-8 min-h-[500px] relative overflow-hidden">
                        
                        <AnimatePresence mode="wait">
                            {paymentStep === 'select' && (
                                <motion.div 
                                    key="select"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative z-10"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-6">Select a Category</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {categories.map((cat) => (
                                            <motion.button
                                                key={cat.id}
                                                onClick={() => handleCategorySelect(cat.id)}
                                                whileHover={{ scale: 1.02, translateY: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative group p-6 rounded-2xl bg-dark-950/50 border border-white/5 hover:border-brand-500/30 text-left transition-all overflow-hidden"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                                    {cat.icon}
                                                </div>
                                                <h4 className="font-bold text-white mb-1">{cat.name}</h4>
                                                <p className="text-xs text-slate-500">{cat.desc}</p>
                                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
                                                    <ChevronRight className="text-white/50" size={20} />
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Recent Payments Quick Access */}
                                    <div className="mt-8">
                                        <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Recent Payments</h4>
                                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                            {[
                                                { name: 'Mom (MTN)', icon: <Smartphone size={16} />, type: 'Airtime' },
                                                { name: 'My DSTV', icon: <Tv size={16} />, type: 'Cable' },
                                                { name: 'Office Wifi', icon: <Wifi size={16} />, type: 'Data' },
                                            ].map((recent, i) => (
                                                <button key={i} className="flex items-center gap-3 pl-2 pr-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 hover:border-white/20 whitespace-nowrap transition-colors group">
                                                    <div className="w-8 h-8 rounded-full bg-dark-950 flex items-center justify-center text-slate-400 group-hover:text-brand-400 transition-colors">
                                                        {recent.icon}
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-medium text-white">{recent.name}</p>
                                                        <p className="text-[10px] text-slate-500">{recent.type}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {paymentStep === 'details' && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative z-10"
                                >
                                    <button onClick={() => setPaymentStep('select')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                                        <ArrowLeft size={16} /> Back to Categories
                                    </button>

                                    <div className="max-w-md mx-auto">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categories.find(c => c.id === selectedCategory)?.color} flex items-center justify-center text-white shadow-lg`}>
                                                {categories.find(c => c.id === selectedCategory)?.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{categories.find(c => c.id === selectedCategory)?.name}</h3>
                                                <p className="text-slate-400 text-sm">Enter payment details</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Provider Grid */}
                                            {providers[selectedCategory || ''] && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Provider</label>
                                                    <div className="grid grid-cols-4 gap-3">
                                                        {providers[selectedCategory || ''].map((p) => (
                                                            <button
                                                                key={p.id}
                                                                onClick={() => setProvider(p)}
                                                                className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                                                                    provider?.id === p.id 
                                                                    ? 'bg-brand-500/10 border-brand-500 ring-1 ring-brand-500' 
                                                                    : 'bg-dark-950 border-white/10 hover:border-white/30'
                                                                }`}
                                                            >
                                                                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: p.color }} />
                                                                <span className={`text-[10px] font-bold ${provider?.id === p.id ? 'text-brand-400' : 'text-slate-400'}`}>{p.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Identifier Input */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                    {selectedCategory === 'tv' ? 'Smart Card Number' : selectedCategory === 'electricity' ? 'Meter Number' : 'Phone Number'}
                                                </label>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        value={identifier}
                                                        onChange={(e) => setIdentifier(e.target.value)}
                                                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-brand-500 focus:outline-none transition-all placeholder-slate-600"
                                                        placeholder={selectedCategory === 'tv' ? 'e.g. 4123 4567 89' : 'e.g. 08012345678'}
                                                    />
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                        <Smartphone size={20} className="text-slate-600" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Amount Input */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">₦</span>
                                                    <input 
                                                        type="text" 
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        className="w-full bg-dark-950 border border-white/10 rounded-xl pl-8 pr-4 py-4 text-white font-mono text-lg focus:border-brand-500 focus:outline-none transition-all placeholder-slate-600"
                                                        placeholder="0.00"
                                                    />
                                                </div>
                                                {/* Quick Amounts */}
                                                <div className="flex gap-2">
                                                    {['500', '1000', '2000', '5000'].map((amt) => (
                                                        <button 
                                                            key={amt} 
                                                            onClick={() => setAmount(amt)}
                                                            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors border border-white/5"
                                                        >
                                                            ₦{amt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <Button 
                                                onClick={handlePayment} 
                                                disabled={!amount || !identifier || (providers[selectedCategory || ''] && !provider)}
                                                className="w-full py-4 text-lg mt-4" 
                                                variant="secondary"
                                            >
                                                Pay Bill
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {paymentStep === 'processing' && (
                                <motion.div 
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full py-20"
                                >
                                    <div className="relative w-24 h-24 mb-8">
                                        <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Zap className="text-brand-500 animate-pulse" size={32} fill="currentColor" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
                                    <p className="text-slate-400 text-sm">Connecting to {provider?.name || 'Service Provider'}...</p>
                                </motion.div>
                            )}

                            {paymentStep === 'success' && (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full py-12"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                        <Check size={40} className="text-white stroke-[3]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                                    <p className="text-slate-400 text-sm mb-8 text-center max-w-xs">
                                        You successfully sent ₦{amount} for {categories.find(c => c.id === selectedCategory)?.name}.
                                    </p>
                                    
                                    <div className="bg-dark-950 rounded-xl p-4 w-full max-w-sm border border-white/10 mb-8 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Transaction ID</span>
                                            <span className="text-white font-mono">#BILL-88293</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Beneficiary</span>
                                            <span className="text-white">{identifier}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Provider</span>
                                            <span className="text-white">{provider?.name || 'Direct'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 w-full max-w-sm">
                                        <Button onClick={resetFlow} variant="outline" className="flex-1">Back home</Button>
                                        <Button onClick={() => setPaymentStep('details')} variant="secondary" className="flex-1">Pay Again</Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Smart Insights & Promos */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Wallet Balance Widget */}
                    <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <p className="text-brand-100 text-sm font-medium mb-1">Available Balance</p>
                            <h3 className="text-3xl font-bold font-mono tracking-tight mb-4">₦8,450,200.00</h3>
                            <div className="flex items-center gap-2 text-xs bg-black/20 backdrop-blur-md rounded-lg p-2 inline-flex">
                                <CreditCard size={14} className="text-brand-200" />
                                <span>Flash NGN Account</span>
                            </div>
                        </div>
                    </div>

                    {/* Smart Suggestion */}
                    <div className="bg-dark-900 border border-white/5 rounded-3xl p-6">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-electric-500/10 flex items-center justify-center text-electric-500">
                                <Zap size={16} fill="currentColor" />
                            </div>
                            <h4 className="font-bold text-white">Smart Reminder</h4>
                         </div>
                         <div className="bg-dark-950 rounded-xl p-4 border border-white/5 mb-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Expires in 2 Days</span>
                                <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-0.5 rounded font-bold">DUE SOON</span>
                            </div>
                            <p className="text-white font-medium mb-1">DSTV Premium Sub</p>
                            <p className="text-slate-500 text-sm mb-3">Smart Card: 4123 4567 89</p>
                            <Button 
                                onClick={() => { handleCategorySelect('tv'); setIdentifier('4123 4567 89'); }}
                                size="sm" 
                                className="w-full text-xs" 
                                variant="outline"
                            >
                                Pay ₦29,500
                            </Button>
                         </div>
                    </div>

                    {/* Quick Promo */}
                    <div className="bg-dark-900 border border-white/5 rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-brand-500/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <h4 className="font-bold text-white mb-2">Win 100% Cashback</h4>
                            <p className="text-slate-400 text-sm mb-4">Pay your electricity bill this weekend and stand a chance to win back your payment!</p>
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                T&C Apply <ChevronRight size={12} />
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};