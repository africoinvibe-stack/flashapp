import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Banknote, 
  ShieldCheck, 
  Zap, 
  QrCode, 
  Info, 
  RefreshCcw,
  ArrowDownLeft,
  Building2,
  Share2
} from 'lucide-react';
import { Button } from '../ui/Button';

interface AddCashProps {
  onBack: () => void;
  isMerchant?: boolean;
}

export const AddCash: React.FC<AddCashProps> = ({ onBack, isMerchant = false }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const accountDetails = {
    bank: "Flash Bank (powered by Wema)",
    number: isMerchant ? "9901122334" : "8812930291",
    name: isMerchant ? "FLASH-BIZ-CAFE-LTD" : "FLASH-JOHN-DOE-102",
    tag: isMerchant ? "@flashcafe" : "@johndoe"
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase italic tracking-tighter">
            {isMerchant ? 'Fund Business Account' : 'Add Cash to Wallet'}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Fund your account via bank transfer or Flash ID.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Main Funding Card */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 pointer-events-none ${isMerchant ? 'bg-emerald-500' : 'bg-brand-500'}`} />
            
            <div className="relative z-10 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg ${isMerchant ? 'bg-emerald-500' : 'bg-brand-500'}`}>
                    <Building2 size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Settlement Bank</p>
                    <p className="text-white font-bold">{accountDetails.bank}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                  <Zap size={10} className="fill-current" /> Instant Sync
                </div>
              </div>

              <div className="space-y-6">
                <div className="group relative">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 ml-1">Dedicated Account Number</p>
                  <div className="flex items-center justify-between bg-dark-950 border border-white/5 rounded-2xl p-5 sm:p-6 group-hover:border-white/20 transition-all shadow-inner">
                    <span className="text-2xl sm:text-4xl font-mono font-black text-white tracking-[0.1em]">{accountDetails.number}</span>
                    <button 
                      onClick={() => handleCopy(accountDetails.number, 'number')}
                      className={`p-3 rounded-xl transition-all ${copiedField === 'number' ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      {copiedField === 'number' ? <Check size={20} strokeWidth={3} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <div className="group relative">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 ml-1">Account Name</p>
                  <div className="flex items-center justify-between bg-dark-950 border border-white/5 rounded-2xl p-5 group-hover:border-white/20 transition-all shadow-inner">
                    <span className="text-sm sm:text-lg font-bold text-slate-300 truncate pr-4">{accountDetails.name}</span>
                    <button 
                      onClick={() => handleCopy(accountDetails.name, 'name')}
                      className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${copiedField === 'name' ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                    >
                      {copiedField === 'name' ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4">
                  <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-blue-200/70 leading-relaxed">
                    Transfer any amount to this account from your banking app. Your {isMerchant ? 'business account' : 'wallet'} will be credited automatically within 60 seconds of successful settlement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl py-4 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-white transition-all disabled:opacity-50"
            >
              <RefreshCcw size={16} className={isRefreshing ? 'animate-spin text-brand-400' : ''} />
              {isRefreshing ? 'Checking Ledger...' : 'Refresh Balance'}
            </button>
            <button className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl py-4 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-white transition-all">
              <Share2 size={16} />
              Share Details
            </button>
          </div>
        </div>

        {/* Sidebar: Flash ID & QR */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-xl">
             <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Receive via Flash ID</h3>
             
             <div className="bg-white p-5 rounded-[2.5rem] w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8 shadow-2xl relative group border-[12px] border-slate-950">
                <QrCode size="100%" className="text-slate-950" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-brand-500/5 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all rounded-3xl">
                   <Button variant="secondary" size="sm" className="shadow-2xl">Download QR</Button>
                </div>
             </div>

             <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Flash ID</p>
                <div className="inline-flex items-center gap-2 bg-dark-950 px-6 py-2.5 rounded-full border border-white/10">
                   <span className={`text-lg font-black italic ${isMerchant ? 'text-emerald-400' : 'text-brand-400'}`}>{accountDetails.tag}</span>
                   <button 
                    onClick={() => handleCopy(accountDetails.tag, 'tag')}
                    className="text-slate-500 hover:text-white"
                   >
                     {copiedField === 'tag' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                   </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-4 leading-tight uppercase tracking-tighter">Instant internal transfers from other Flash users are always $0.00 fee.</p>
             </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white relative overflow-hidden group shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
             <h4 className="font-display font-black uppercase italic tracking-tighter text-lg mb-2">Need a Cash Point?</h4>
             <p className="text-white/70 text-xs mb-6 font-medium">Find a verified Flash Agent nearby to fund your account with physical cash.</p>
             <button className="w-full bg-slate-950 text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                Find Agents <ArrowDownLeft size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};