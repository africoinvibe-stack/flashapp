import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowLeftRight, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Menu,
  X,
  ArrowLeft,
  Smartphone,
  HelpCircle,
  MessageCircle,
  Zap,
  QrCode,
  SmartphoneNfc,
  PlusCircle
} from 'lucide-react';
import { ChatWidget } from './ChatWidget';

// Sub-components
import { Overview } from './dashboard/Overview';
import { WalletCards } from './dashboard/WalletCards';
import { TradeHub } from './dashboard/TradeHub';
import { AgentCenter } from './dashboard/AgentCenter';
import { SettingsPage } from './dashboard/SettingsPage';
import { BillPayment } from './dashboard/BillPayment';
import { HelpSupport } from './dashboard/HelpSupport';
import { FlashPay } from './dashboard/FlashPay';
import { AddCash } from './dashboard/AddCash';

interface DashboardProps {
  onLogout: () => void;
}

type Tab = 'overview' | 'bills' | 'cards' | 'trade' | 'agents' | 'help' | 'settings' | 'pay' | 'fund';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Wallet Home', icon: <LayoutDashboard size={20} /> },
    { id: 'fund', label: 'Add Cash', icon: <PlusCircle size={20} /> },
    { id: 'pay', label: 'Flash Pay', icon: <SmartphoneNfc size={20} /> },
    { id: 'bills', label: 'Lifestyle & Bills', icon: <Smartphone size={20} /> },
    { id: 'cards', label: 'Virtual Studio', icon: <CreditCard size={20} /> },
    { id: 'trade', label: 'P2P Trading', icon: <ArrowLeftRight size={20} /> },
    { id: 'agents', label: 'Cash Points', icon: <Users size={20} /> },
    { id: 'help', label: 'Help Center', icon: <HelpCircle size={20} /> },
    { id: 'settings', label: 'Identity', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview onChangeTab={setActiveTab} />;
      case 'pay': return <FlashPay onBack={() => setActiveTab('overview')} />;
      case 'fund': return <AddCash onBack={() => setActiveTab('overview')} />;
      case 'bills': return <BillPayment />;
      case 'cards': return <WalletCards />;
      case 'trade': return <TradeHub />;
      case 'agents': return <AgentCenter />;
      case 'settings': return <SettingsPage />;
      case 'help': return <HelpSupport />;
      default: return <Overview onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950 text-slate-200 font-sans selection:bg-brand-500/30 overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-md" 
          />
        )}
      </AnimatePresence>

      <motion.aside className={`fixed lg:sticky top-0 left-0 z-[70] h-screen w-72 bg-dark-900 border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-display font-bold text-xl text-white italic tracking-wide">Flash</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={24} /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            <div className="px-4 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Spending</div>
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as Tab); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${activeTab === item.id ? 'bg-brand-500/10 text-brand-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    {activeTab === item.id && <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-brand-400 rounded-full" />}
                    <span className={`${activeTab === item.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="p-4 border-t border-white/5">
            <div className="bg-white/5 rounded-xl p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">JD</div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">John Doe</p>
                    <p className="text-[10px] text-brand-400 uppercase font-black">Level 2 Verified</p>
                </div>
            </div>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold">
                <LogOut size={18} /> Sign Out
            </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-dark-950">
        <header className="h-16 border-b border-white/5 bg-dark-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg"><Menu size={20} /></button>
                {activeTab !== 'overview' && (
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={() => setActiveTab('overview')} className="group flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all mr-1">
                        <ArrowLeft size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                    </motion.button>
                )}
                <h1 className="font-display font-semibold text-base sm:text-lg text-white capitalize truncate max-w-[150px] sm:max-w-none">
                    {activeTab === 'trade' ? 'Trading & P2P' : 
                     activeTab === 'bills' ? 'Lifestyle & Bills' : 
                     activeTab === 'help' ? 'Help Center' : 
                     activeTab === 'pay' ? 'Flash Pay Terminal' :
                     activeTab === 'fund' ? 'Add Cash' :
                     activeTab.replace('-', ' ')}
                </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={() => setIsChatOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors relative group hover:bg-white/5 rounded-full">
                    <MessageCircle size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full border border-dark-950"></span>
                </button>
                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-sm font-bold text-white">John Doe</span>
                    <span className="text-[10px] text-brand-400 font-black uppercase tracking-widest">@johndoe</span>
                </div>
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-dark-950"></span>
                </button>
            </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto custom-scrollbar">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto h-full">
                {renderContent()}
            </motion.div>
        </div>
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};