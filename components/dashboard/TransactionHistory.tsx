import React, { useState } from 'react';
import { Search, Filter, Download, ArrowDownLeft, ArrowUpRight, Repeat } from 'lucide-react';
import { Button } from '../ui/Button';

export const TransactionHistory: React.FC = () => {
    const [filterType, setFilterType] = useState('all');

    const transactions = [
        { id: 1, title: 'Netflix Subscription', date: 'Today, 10:42 AM', amount: '-$14.99', type: 'debit', status: 'completed', icon: '🎬' },
        { id: 2, title: 'Deposit from Bank', date: 'Yesterday, 4:20 PM', amount: '+$250.00', type: 'credit', status: 'completed', icon: '🏦' },
        { id: 3, title: 'Starbucks Coffee', date: 'Yesterday, 8:15 AM', amount: '-$5.50', type: 'debit', status: 'completed', icon: '☕️' },
        { id: 4, title: 'USDT Swap', date: 'Oct 24, 2023', amount: '+$1,200.00', type: 'swap', status: 'completed', icon: '💱' },
        { id: 5, title: 'Amazon Purchase', date: 'Oct 23, 2023', amount: '-$129.00', type: 'debit', status: 'pending', icon: '📦' },
        { id: 6, title: 'Transfer to Sarah', date: 'Oct 21, 2023', amount: '-$50.00', type: 'debit', status: 'failed', icon: '👤' },
        { id: 7, title: 'Spotify Premium', date: 'Oct 20, 2023', amount: '-$9.99', type: 'debit', status: 'completed', icon: '🎵' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Transactions</h2>
                    <p className="text-slate-400 text-sm">View and manage your financial activity.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-900 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:border-brand-500/50 transition-colors">
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name, amount or ID..." 
                        className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-500 text-white placeholder-slate-500"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                    {['All', 'Credits', 'Debits', 'Pending'].map((filter) => (
                        <button 
                            key={filter}
                            onClick={() => setFilterType(filter.toLowerCase())}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border ${
                                filterType === filter.toLowerCase() 
                                    ? 'bg-brand-500 text-slate-900 border-brand-500' 
                                    : 'bg-dark-900 text-slate-400 border-white/10 hover:bg-white/5'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                    <button className="px-3 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-slate-400 hover:text-white">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:grid">
                    <div className="col-span-6">Transaction</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Amount</div>
                </div>

                {transactions.map((tx) => (
                    <div key={tx.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group">
                        <div className="col-span-8 md:col-span-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center text-lg group-hover:border-white/20 transition-colors">
                                {tx.icon}
                            </div>
                            <div>
                                <p className="font-medium text-white">{tx.title}</p>
                                <p className="text-xs text-slate-400 md:hidden">{tx.date}</p>
                                <p className="text-xs text-slate-400 hidden md:block">Transaction ID: #8823{tx.id}99</p>
                            </div>
                        </div>

                        <div className="col-span-2 hidden md:flex items-center gap-2">
                            {tx.type === 'credit' && <div className="p-1 rounded bg-green-500/10 text-green-500"><ArrowDownLeft size={14} /></div>}
                            {tx.type === 'debit' && <div className="p-1 rounded bg-red-500/10 text-red-500"><ArrowUpRight size={14} /></div>}
                            {tx.type === 'swap' && <div className="p-1 rounded bg-blue-500/10 text-blue-500"><Repeat size={14} /></div>}
                            <span className="text-sm text-slate-300 capitalize">{tx.type}</span>
                        </div>

                        <div className="col-span-2 hidden md:block">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                'bg-red-500/10 text-red-500'
                            }`}>
                                {tx.status}
                            </span>
                        </div>

                        <div className="col-span-4 md:col-span-2 text-right">
                            <p className={`font-mono font-medium ${tx.type === 'credit' || tx.type === 'swap' ? 'text-green-400' : 'text-white'}`}>
                                {tx.amount}
                            </p>
                            <p className="text-xs text-slate-500 hidden md:block">{tx.date}</p>
                            <span className={`md:hidden inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                                tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                'bg-red-500/10 text-red-500'
                            }`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center pt-4">
                <Button variant="ghost" size="sm">Load More Activity</Button>
            </div>
        </div>
    );
};