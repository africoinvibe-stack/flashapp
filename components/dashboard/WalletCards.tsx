import React, { useState } from 'react';
import { CardVisual } from '../CardVisual';
import { Button } from '../ui/Button';
import { Eye, EyeOff, Snowflake, Plus, Settings, ShieldAlert, CreditCard, X, Globe, Banknote, Check, Sparkles, ShoppingBag, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WalletCards: React.FC = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedType, setSelectedType] = useState<'usd' | 'ngn'>('usd');
    const [cardLabel, setCardLabel] = useState('');

    return (
        <div className="space-y-8 relative">
            {/* Create Card Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCreateModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-dark-950 border border-white/10 w-full max-w-4xl rounded-[2rem] relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
                        >
                             {/* Ambient Background Glows */}
                            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                            {/* Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center relative z-20">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-white">Design Your Card</h3>
                                    <p className="text-slate-400 text-sm mt-1">Select a currency and customize your virtual card.</p>
                                </div>
                                <button 
                                    onClick={() => setShowCreateModal(false)} 
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8 overflow-y-auto relative z-20 custom-scrollbar">
                                
                                <div className="grid md:grid-cols-2 gap-6 mb-10">
                                    {/* USD Option */}
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedType('usd')}
                                        className={`relative p-1 rounded-3xl cursor-pointer transition-all duration-300 ${
                                            selectedType === 'usd' 
                                            ? 'bg-gradient-to-br from-brand-400 to-brand-600 shadow-[0_0_40px_rgba(251,191,36,0.2)]' 
                                            : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className="bg-dark-900 h-full rounded-[1.3rem] p-6 relative overflow-hidden">
                                            {/* Selection Indicator */}
                                            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${
                                                selectedType === 'usd' ? 'border-brand-500 bg-brand-500' : 'border-slate-600'
                                            }`}>
                                                {selectedType === 'usd' && <Check size={14} className="text-slate-950 stroke-[3]" />}
                                            </div>

                                            {/* Card Preview Visual - USD */}
                                            <div className="aspect-[1.586/1] w-full rounded-xl mb-6 relative overflow-hidden shadow-lg group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black" />
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                                {/* Gold Accents */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-[40px] rounded-full" />
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-400/10 blur-[40px] rounded-full" />
                                                
                                                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <Globe className="text-brand-400" size={24} />
                                                        <span className="font-display font-bold text-white/90 italic tracking-wider">FLASH</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-white/80 font-mono text-lg tracking-widest mb-2">•••• 4298</div>
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-xs text-brand-400 font-medium tracking-wider">USD PLATINUM</span>
                                                            <div className="w-8 h-8 opacity-80">
                                                                <svg viewBox="0 0 48 48" fill="none"><circle cx="16" cy="24" r="12" fill="#EB001B" fillOpacity="0.9"/><circle cx="32" cy="24" r="12" fill="#F79E1B" fillOpacity="0.9"/></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-white font-bold text-xl">USD Global</h4>
                                                    <span className="text-xs font-bold bg-brand-500/10 text-brand-400 px-2 py-1 rounded-lg border border-brand-500/20">$2.00 Fee</span>
                                                </div>
                                                <p className="text-slate-400 text-sm">Seamless international payments for subscriptions and shopping.</p>
                                                
                                                <div className="space-y-2">
                                                    {[
                                                        'Works on Netflix, Apple, Amazon',
                                                        'Limit up to $10,000 / month',
                                                        'Instant funding from crypto wallet'
                                                    ].map((feat, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                            <Check size={14} className="text-brand-400" /> {feat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* NGN Option */}
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedType('ngn')}
                                        className={`relative p-1 rounded-3xl cursor-pointer transition-all duration-300 ${
                                            selectedType === 'ngn' 
                                            ? 'bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_40px_rgba(16,185,129,0.2)]' 
                                            : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className="bg-dark-900 h-full rounded-[1.3rem] p-6 relative overflow-hidden">
                                             {/* Selection Indicator */}
                                             <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10 ${
                                                selectedType === 'ngn' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                                            }`}>
                                                {selectedType === 'ngn' && <Check size={14} className="text-slate-950 stroke-[3]" />}
                                            </div>

                                            {/* Card Preview Visual - NGN */}
                                            <div className="aspect-[1.586/1] w-full rounded-xl mb-6 relative overflow-hidden shadow-lg group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-teal-950" />
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                                {/* Green Accents */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[40px] rounded-full" />
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 blur-[40px] rounded-full" />
                                                
                                                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <Banknote className="text-emerald-400" size={24} />
                                                        <span className="font-display font-bold text-white/90 italic tracking-wider">FLASH</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-white/80 font-mono text-lg tracking-widest mb-2">•••• 8829</div>
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-xs text-emerald-400 font-medium tracking-wider">NAIRA ELITE</span>
                                                            <div className="w-8 h-8 opacity-80 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px] text-white">
                                                                VERVE
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="text-white font-bold text-xl">Naira Local</h4>
                                                    <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/20">₦500 Fee</span>
                                                </div>
                                                <p className="text-slate-400 text-sm">Ideal for local expenses, government portals, and bills.</p>
                                                
                                                <div className="space-y-2">
                                                    {[
                                                        'Works on Jumia, Gov.ng, Betting',
                                                        'Limit up to ₦5,000,000 / month',
                                                        'Low maintenance fees'
                                                    ].map((feat, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                            <Check size={14} className="text-emerald-400" /> {feat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Customization Input */}
                                <div className="bg-dark-900 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1 w-full">
                                        <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-wider">Name your card</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={cardLabel}
                                                onChange={(e) => setCardLabel(e.target.value)}
                                                placeholder="e.g. Shopping, Travels, Subs" 
                                                className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-4 pl-12 text-white text-base focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600" 
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                                <Sparkles size={18} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 max-w-sm">
                                        <div className="p-2 bg-blue-500 rounded-lg text-white">
                                            <Wifi size={16} />
                                        </div>
                                        <p className="text-xs text-blue-200 leading-tight">
                                            Cards are issued instantly and ready for contactless online payments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-dark-950 relative z-20">
                                <Button 
                                    className={`w-full py-4 text-lg font-bold shadow-2xl transition-all duration-300 ${
                                        selectedType === 'usd' 
                                        ? 'bg-brand-500 text-slate-950 hover:bg-brand-400 shadow-brand-500/20' 
                                        : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20'
                                    }`} 
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Create {selectedType === 'usd' ? 'USD' : 'Naira'} Card {selectedType === 'usd' ? '($2.00)' : '(₦500)'}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Main View */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Virtual Cards</h2>
                    <p className="text-slate-400 text-sm">Manage your Flash virtual dollar cards.</p>
                </div>
                <Button 
                    variant="secondary" 
                    icon={<Plus size={18} />}
                    onClick={() => setShowCreateModal(true)}
                >
                    Create New Card
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Visual & Controls */}
                <div className="space-y-8">
                    <div className="relative group">
                        {isFrozen && (
                            <div className="absolute inset-0 z-20 bg-blue-900/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center border border-blue-400/30">
                                <div className="bg-dark-900/90 px-6 py-3 rounded-xl border border-blue-500/50 flex items-center gap-3 shadow-2xl">
                                    <Snowflake className="text-blue-400" />
                                    <span className="text-blue-100 font-semibold">Card Frozen</span>
                                </div>
                            </div>
                        )}
                        <CardVisual />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button 
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-dark-900 border border-white/5 hover:bg-white/5 hover:border-brand-500/50 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors">
                                {showDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                            <span className="text-xs font-medium text-slate-300">{showDetails ? 'Hide Info' : 'Show Info'}</span>
                        </button>
                        
                        <button 
                            onClick={() => setIsFrozen(!isFrozen)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all group ${isFrozen ? 'bg-blue-900/20 border-blue-500/50' : 'bg-dark-900 border-white/5 hover:bg-white/5'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isFrozen ? 'bg-blue-500 text-white' : 'bg-dark-800 group-hover:bg-blue-500/20 group-hover:text-blue-400'}`}>
                                <Snowflake size={20} />
                            </div>
                            <span className={`text-xs font-medium ${isFrozen ? 'text-blue-400' : 'text-slate-300'}`}>{isFrozen ? 'Unfreeze' : 'Freeze'}</span>
                        </button>

                        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-dark-900 border border-white/5 hover:bg-white/5 hover:border-green-500/50 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                                <Plus size={20} />
                            </div>
                            <span className="text-xs font-medium text-slate-300">Fund Card</span>
                        </button>

                        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-dark-900 border border-white/5 hover:bg-white/5 hover:border-purple-500/50 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                                <Settings size={20} />
                            </div>
                            <span className="text-xs font-medium text-slate-300">Settings</span>
                        </button>
                    </div>

                    {showDetails && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-dark-900 border border-white/5 rounded-xl p-4 space-y-4"
                        >
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-slate-400 text-sm">Card Number</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-white tracking-wider">4242 4242 4242 4298</span>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Copy</Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-slate-400 text-sm">CVV</span>
                                <span className="font-mono text-white tracking-wider">882</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Billing Address</span>
                                <span className="text-white text-sm text-right">303 Flash Ave, Crypto City, DE 19901</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Column: Limits & Settings */}
                <div className="space-y-6">
                    <div className="bg-dark-900 border border-white/5 rounded-2xl p-6">
                        <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                             <ShieldAlert size={18} className="text-brand-400" /> Spending Limits
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-slate-400">Monthly Limit</span>
                                    <div className="text-right">
                                        <span className="text-white font-medium">$12,450</span>
                                        <span className="text-slate-500 text-xs"> / $20,000</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-dark-950 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '62%' }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full" 
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-right">Resets on Nov 1st</p>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-slate-400">Per Transaction Limit</span>
                                    <div className="text-right">
                                        <span className="text-white font-medium">$2,500</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" 
                                        className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-500" 
                                        defaultValue={50}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-900 border border-white/5 rounded-2xl p-6">
                         <h3 className="font-semibold text-white mb-4">Card Settings</h3>
                         <div className="space-y-1">
                            {[
                                { label: 'Online Transactions', desc: 'Enable payments on websites', active: true },
                                { label: 'International Use', desc: 'Allow payments outside Nigeria', active: true },
                                { label: 'ATM Withdrawals', desc: 'Enable cash withdrawals', active: false },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                    <div>
                                        <p className="text-sm font-medium text-white">{setting.label}</p>
                                        <p className="text-xs text-slate-400">{setting.desc}</p>
                                    </div>
                                    <div className={`w-11 h-6 rounded-full relative transition-colors ${setting.active ? 'bg-brand-500' : 'bg-dark-950 border border-white/10'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${setting.active ? 'left-6' : 'left-1'}`} />
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                    
                    <button className="w-full py-4 text-red-400 text-sm font-medium hover:bg-red-500/5 rounded-xl transition-colors border border-transparent hover:border-red-500/20">
                        Terminate Card
                    </button>
                </div>
            </div>
        </div>
    );
};
