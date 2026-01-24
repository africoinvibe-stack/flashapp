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
  History,
  ArrowLeft,
  Smartphone,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { CardVisual } from './CardVisual';
import { Button } from './ui/Button';
import { ChatWidget } from './ChatWidget';

// Sub-components
import { Overview } from './dashboard/Overview';
import { WalletCards } from './dashboard/WalletCards';
import { TransactionHistory } from './dashboard/TransactionHistory';
import { TradeHub } from './dashboard/TradeHub';
import { AgentCenter } from './dashboard/AgentCenter';
import { SettingsPage } from './dashboard/SettingsPage';
import { BillPayment } from './dashboard/BillPayment';
import { HelpSupport } from './dashboard/HelpSupport';

interface DashboardProps {
  onLogout: () => void;
}

type Tab = 'overview' | 'transactions' | 'cards' | 'trade' | 'agents' | 'settings' | 'bills' | 'help';

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'bills', label: 'Pay Bills', icon: <Smartphone size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <History size={20} /> },
    { id: 'cards', label: 'Virtual Cards', icon: <CreditCard size={20} /> },
    { id: 'trade', label: 'Trade & P2P', icon: <ArrowLeftRight size={20} /> },
    { id: 'agents', label: 'Agent Network', icon: <Users size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview onChangeTab={setActiveTab} />;
      case 'bills': return <BillPayment />;
      case 'transactions': return <TransactionHistory />;
      case 'cards': return <WalletCards />;
      case 'trade': return <TradeHub />;
      case 'agents': return <AgentCenter />;
      case 'settings': return <SettingsPage />;
      case 'help': return <HelpSupport />;
      default: return <Overview onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-950 text-slate-200">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-dark-900 border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                    <svg className="w-5 h-5 text-white fill-white" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                </div>
                <span className="font-display font-bold text-xl text-white italic tracking-wide">Flash</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                <X size={24} />
            </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setActiveTab(item.id as Tab);
                        setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                        activeTab === item.id 
                            ? 'bg-brand-500/10 text-brand-400 font-medium' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {activeTab === item.id && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-brand-400 rounded-full"
                        />
                    )}
                    <span className={`${activeTab === item.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {item.icon}
                    </span>
                    {item.label}
                </button>
            ))}
        </nav>

        <div className="p-4 border-t border-white/5">
            <div className="bg-white/5 rounded-xl p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    JD
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">John Doe</p>
                    <p className="text-xs text-slate-400 truncate">john@flashpay.app</p>
                </div>
            </div>
            <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-dark-950/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden text-slate-400 hover:text-white p-1"
                >
                    <Menu size={24} />
                </button>

                {activeTab !== 'overview' && (
                    <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setActiveTab('overview')}
                        className="group flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 mr-1"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                    </motion.button>
                )}

                <h1 className="font-display font-semibold text-lg text-white capitalize">
                    {activeTab === 'trade' ? 'Trading & P2P' : activeTab === 'bills' ? 'Bill Payment' : activeTab === 'help' ? 'Help & Support' : activeTab.replace('-', ' ')}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                 {/* Customer Care Chat Icon */}
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="p-2 text-slate-400 hover:text-white transition-colors relative group hover:bg-white/5 rounded-full"
                    title="Customer Support"
                >
                    <MessageCircle size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border-2 border-dark-950"></span>
                </button>

                <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-sm font-medium text-white">John Doe</span>
                    <span className="text-xs text-brand-400">@johndoe</span>
                </div>
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-dark-950"></span>
                </button>
            </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
            >
                {renderContent()}
            </motion.div>
        </div>

        {/* Global Chat Widget */}
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};