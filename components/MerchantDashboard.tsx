import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  Bell, 
  Menu,
  X,
  MessageCircle,
  Plus,
  QrCode,
  TrendingUp,
  ArrowRightLeft,
  Smartphone,
  Check,
  Printer,
  Trash2,
  ShoppingCart,
  Zap,
  Tag,
  Search,
  CheckCircle2,
  Receipt,
  ShieldCheck,
  Users,
  UserPlus,
  Shield,
  Building2,
  Activity,
  Download,
  Wifi,
  Copy,
  Info,
  CreditCard,
  ChevronRight,
  MoreVertical,
  BarChart3,
  PieChart,
  Crown,
  Share2,
  ExternalLink,
  SmartphoneNfc,
  Loader2,
  ChevronLeft,
  PackagePlus,
  ImageIcon,
  ChevronDown,
  Edit2,
  RotateCcw,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Globe,
  Tv,
  Smartphone as PhoneIcon,
  Flame,
  Banknote,
  Eye,
  ArrowLeftRight,
  ChevronUp,
  ShoppingBag,
  PlusCircle
} from 'lucide-react';
import { Button } from './ui/Button';
import { ChatWidget } from './ChatWidget';
import { CardVisual } from './CardVisual';

// Import shared trading/agent components
import { TradeHub } from './dashboard/TradeHub';
import { AgentCenter } from './dashboard/AgentCenter';
import { AddCash } from './dashboard/AddCash';

interface MerchantDashboardProps {
  onLogout: () => void;
}

type Tab = 'pos' | 'wallet' | 'cards' | 'utilities' | 'sales' | 'team' | 'settings' | 'p2p' | 'agents' | 'fund';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Caffè Latte', price: 2500, category: 'Coffee', image: '☕' },
  { id: '2', name: 'Cappuccino', price: 2200, category: 'Coffee', image: '🥛' },
  { id: '3', name: 'Croissant', price: 1800, category: 'Pastry', image: '🥐' },
  { id: '4', name: 'Muffin', price: 1500, category: 'Pastry', image: '🧁' },
  { id: '5', name: 'Cold Brew', price: 2800, category: 'Coffee', image: '🧊' },
  { id: '6', name: 'Avocado Toast', price: 4500, category: 'Food', image: '🥑' },
  { id: '7', name: 'Sparkling Water', price: 1000, category: 'Drinks', image: '💧' },
  { id: '8', name: 'Pain au Chocolat', price: 2000, category: 'Pastry', image: '🍫' },
];

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('pos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const menuItems = [
    { id: 'pos', label: 'Terminal (POS)', icon: <SmartphoneNfc size={20} /> },
    { id: 'wallet', label: 'Business Wallet', icon: <Wallet size={20} /> },
    { id: 'fund', label: 'Fund Business', icon: <PlusCircle size={20} /> },
    { id: 'p2p', label: 'Liquidity Trading', icon: <ArrowLeftRight size={20} /> },
    { id: 'agents', label: 'Agent Services', icon: <Users size={20} /> },
    { id: 'cards', label: 'Corporate Cards', icon: <CreditCard size={20} /> },
    { id: 'utilities', label: 'Store Utilities', icon: <Zap size={20} /> },
    { id: 'sales', label: 'Audit Ledger', icon: <History size={20} /> },
    { id: 'team', label: 'Staff Hub', icon: <Users size={20} /> },
    { id: 'settings', label: 'Identity', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden">
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

      <motion.aside className={`fixed lg:sticky top-0 left-0 z-[70] h-screen w-72 bg-slate-900 border-r border-white/5 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                    <Store className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white italic tracking-wide">Flash<span className="text-emerald-400 not-italic ml-1 border-l border-white/10 pr-2 uppercase text-sm font-black">Biz</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
            <div className="px-4 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Retail Operations</div>
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as Tab); setIsSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    {activeTab === item.id && <motion.div layoutId="activeTabMerchant" className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-400 rounded-full" />}
                    <span className={activeTab === item.id ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}>{item.icon}</span>
                    <span className="text-sm tracking-tight">{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="p-4 border-t border-white/5">
            <div className="bg-emerald-500/5 rounded-2xl p-4 mb-4 border border-emerald-500/10 relative overflow-hidden group">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">FC</div>
                   <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">Flash Cafe Ltd.</p>
                      <p className="text-[9px] text-emerald-400 font-mono tracking-tighter uppercase font-black">Node #TK-04-A</p>
                   </div>
                </div>
            </div>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm font-bold">
                <LogOut size={18} />
                <span>Lock Terminal</span>
            </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-950">
        <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-xl"><Menu size={20} /></button>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)] flex-shrink-0" />
                    <h1 className="font-display font-bold text-sm sm:text-lg text-white tracking-tight uppercase italic truncate max-w-[120px] sm:max-w-none">
                        {activeTab === 'pos' ? 'Retail Terminal' : 
                         activeTab === 'p2p' ? 'Liquidity Trading' :
                         activeTab === 'agents' ? 'Agent Services' :
                         activeTab === 'fund' ? 'Fund Business' :
                         activeTab.replace('-', ' ')}
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden xs:flex flex-col items-end mr-2 sm:mr-4 pr-2 sm:pr-4 border-r border-white/10">
                   <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Live Revenue</p>
                   <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 tracking-tighter">₦1,142,500.00</p>
                </div>
                <button onClick={() => setIsChatOpen(true)} className="p-2 text-slate-400 hover:text-white transition-all relative group hover:bg-white/5 rounded-xl">
                  <MessageCircle size={20} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-slate-950"></span>
                </button>
                <button className="relative p-2 text-slate-400 hover:text-white transition-all hover:bg-white/5 rounded-xl">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-slate-950"></span>
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-hidden">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }} 
              className="h-full overflow-y-auto custom-scrollbar"
            >
                {activeTab === 'pos' && <PointOfSale onOpenFund={() => setActiveTab('fund')} />}
                {activeTab === 'wallet' && <BusinessWallet onOpenFund={() => setActiveTab('fund')} />}
                {activeTab === 'fund' && <div className="p-4 sm:p-8 lg:p-12"><AddCash onBack={() => setActiveTab('wallet')} isMerchant /></div>}
                {activeTab === 'cards' && <CorporateCards />}
                {activeTab === 'utilities' && <StoreUtilities />}
                {activeTab === 'sales' && <SalesHistory />}
                {activeTab === 'team' && <TeamManagement />}
                {activeTab === 'settings' && <StoreSettings />}
                {activeTab === 'p2p' && <div className="p-4 sm:p-8 lg:p-12 h-full"><TradeHub /></div>}
                {activeTab === 'agents' && <div className="p-4 sm:p-8 lg:p-12 h-full"><AgentCenter /></div>}
            </motion.div>
        </div>
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};

const SalesHistory = () => {
    const sales = [
        { id: '#INV-9921', customer: 'Cash Customer', amount: '₦12,500', method: 'Tap to Pay', time: '10:45 AM' },
        { id: '#INV-9920', customer: 'Alex Morgan', amount: '₦4,200', method: 'Flash ID', time: '09:12 AM' },
        { id: '#INV-9919', customer: 'Cash Customer', amount: '₦2,800', method: 'Scan QR', time: 'Yesterday' },
        { id: '#INV-9918', customer: 'Business User', amount: '₦45,000', method: 'Transfer', time: 'Yesterday' },
    ];

    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8 bg-slate-950 h-full min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Audit Ledger</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Full transaction history for this terminal node.</p>
                </div>
                <Button variant="outline" className="w-full md:w-auto border-white/10 text-[10px] uppercase font-black"><Download size={14} className="mr-2" /> Export Ledger</Button>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-950 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {sales.map((sale, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-6 font-mono text-xs text-slate-400">{sale.id}</td>
                                    <td className="px-6 py-6 text-sm font-bold text-white">{sale.customer}</td>
                                    <td className="px-6 py-6 text-[10px] font-black uppercase text-emerald-400">{sale.method}</td>
                                    <td className="px-6 py-6 text-xs text-slate-500">{sale.time}</td>
                                    <td className="px-6 py-6 text-right font-mono font-black text-white">{sale.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const TeamManagement = () => {
    const staff = [
        { name: 'Sarah Wilson', role: 'Store Manager', status: 'online', avatar: 'SW' },
        { name: 'Mike Ross', role: 'Cashier', status: 'offline', avatar: 'MR' },
        { name: 'Jane Doe', role: 'Inventory', status: 'online', avatar: 'JD' },
    ];

    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8 bg-slate-950 h-full min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Staff Hub</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage permissions and terminal access for your team.</p>
                </div>
                <Button variant="secondary" className="w-full md:w-auto bg-emerald-500 text-slate-950 font-black rounded-xl px-10 uppercase text-[10px]"><UserPlus size={16} className="mr-2" /> Add Staff</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member, i) => (
                    <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                                {member.avatar}
                            </div>
                            <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-tighter ${member.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                                {member.status}
                            </div>
                        </div>
                        <h3 className="text-lg font-black text-white uppercase italic tracking-tight mb-1">{member.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mb-6">{member.role}</p>
                        <div className="flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-colors">Permissions</button>
                            <button className="px-3 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StoreSettings = () => {
    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8 bg-slate-950 h-full min-h-screen">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Store Identity</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Verify and update your business profile on the network.</p>
                </div>
            </div>

            <div className="max-w-3xl space-y-6">
                <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Business Name</label>
                            <input type="text" defaultValue="Flash Cafe Ltd." className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Registration No (RC)</label>
                            <input type="text" defaultValue="RC-1293848" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none font-mono" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Store Address</label>
                        <textarea defaultValue="Shop 4, Allen Avenue, Ikeja, Lagos State" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none font-medium h-24" />
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Merchant Level 2 Verified</p>
                            <p className="text-[10px] text-slate-500">You are eligible for T+0 instant bank settlements.</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="secondary" className="flex-1 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-xs py-4 rounded-xl">Commit Changes</Button>
                    <button className="px-8 py-4 border border-white/10 text-slate-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">Verification Center</button>
                </div>
            </div>
        </div>
    );
};

const BusinessWallet = ({ onOpenFund }: { onOpenFund: () => void }) => {
    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 bg-slate-950 h-full min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Business Wallet</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage your retail revenue and settlements.</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl border-white/10 text-[10px] uppercase font-black"><History size={14} className="mr-2" /> Audit</Button>
                    <Button variant="secondary" className="flex-1 md:flex-none rounded-xl bg-emerald-500 text-slate-950 text-[10px] uppercase font-black px-4 sm:px-8">Push to Bank</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Main Balance Display */}
                <div className="lg:col-span-2 bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 border border-emerald-500/20 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/10 blur-[80px] sm:blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <div className="p-2 rounded-xl bg-white/10 text-emerald-400 backdrop-blur-md">
                                <Activity size={18} />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-black text-white/50 uppercase tracking-[0.2em] sm:tracking-[0.4em]">Settled Business Capital</span>
                        </div>
                        
                        <div className="mb-8 sm:mb-12">
                            <h2 className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-white tracking-tighter drop-shadow-xl flex flex-wrap items-baseline gap-2 sm:gap-3">
                                <span className="text-xl sm:text-2xl font-sans text-emerald-500/50">₦</span>8,450,200.00
                            </h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4">
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp size={12} /> +₦142,500 Today
                                </div>
                                <div className="text-slate-500 text-[9px] font-mono truncate max-w-full">ID: HUB-REGION-4491</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <button onClick={onOpenFund} className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg hover:scale-105 transition-transform group">
                                <ArrowDownLeft size={20} sm:size={24} />
                                <span className="text-[9px] font-black uppercase">Fund</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                <ArrowUpRight size={20} sm:size={24} className="text-white" />
                                <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white">Withdraw</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                <RotateCcw size={20} sm:size={24} className="text-white" />
                                <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white">Convert</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                <Plus size={20} sm:size={24} className="text-white" />
                                <span className="text-[9px] font-black uppercase text-slate-400 group-hover:text-white">More</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Details Panel */}
                <div className="bg-slate-900 border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div>
                        <h3 className="font-black text-white text-xs sm:text-sm uppercase tracking-widest mb-6">Business Payout Node</h3>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 sm:p-5">
                                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Primary Bank Account</p>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-lg sm:text-xl font-mono font-black text-white tracking-tighter">8812930291</span>
                                    <Copy size={14} sm:size={16} className="text-emerald-500 cursor-pointer" />
                                </div>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400">Zenith Bank PLC</p>
                            </div>
                            <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 sm:p-5">
                                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Liquidation Tier</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-bold text-white uppercase italic">Elite T+0 Node</span>
                                    <ShieldCheck size={16} sm:size={18} className="text-emerald-400 flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl sm:rounded-2xl p-4">
                        <p className="text-[9px] sm:text-[10px] text-emerald-400 leading-tight">Your revenue is automatically pushed to your bank at 00:00 UTC daily.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CorporateCards = () => {
    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 bg-slate-950 h-full min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Corporate Cards</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Provision virtual cards for business expenses.</p>
                </div>
                <Button variant="secondary" className="w-full md:w-auto bg-emerald-500 text-slate-950 font-black rounded-xl px-6 sm:px-10 uppercase text-[10px]" icon={<Plus size={14} />}>Issue Card</Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6 sm:space-y-10">
                    <CardVisual />
                    <div className="grid grid-cols-4 gap-2 sm:gap-4">
                        {[
                            { label: 'Freeze', icon: <Flame size={16} sm:size={18} /> },
                            { label: 'Top-up', icon: <Plus size={16} sm:size={18} /> },
                            { label: 'Limits', icon: <Settings size={16} sm:size={18} /> },
                            { label: 'Details', icon: <Eye size={16} sm:size={18} /> },
                        ].map((btn, i) => (
                            <button key={i} className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all text-slate-500 hover:text-white group">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                                    {btn.icon}
                                </div>
                                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest truncate">{btn.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-white/10 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        <h3 className="font-black text-white text-xs sm:text-sm uppercase tracking-widest mb-6 sm:mb-8 flex items-center gap-3">
                            <BarChart3 className="text-emerald-400" size={16} sm:size={18} /> Expense Analytics
                        </h3>
                        <div className="space-y-6 sm:space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Monthly Supply Budget</span>
                                    <span className="text-xs sm:text-sm font-mono font-black text-white">₦850k / ₦2M</span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="h-full bg-emerald-500 rounded-full" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5">
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase mb-2">Active Cards</p>
                                    <p className="text-xl sm:text-3xl font-mono font-black text-white">04</p>
                                </div>
                                <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/5">
                                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase mb-2">Total Spent</p>
                                    <p className="text-xl sm:text-3xl font-mono font-black text-emerald-400">₦2.4M</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-white/5 bg-slate-950/50 text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Fleet Management</div>
                        <div className="divide-y divide-white/5">
                            {[
                                { name: 'Logistics Gas', last4: '8821', status: 'active', icon: '🚛' },
                                { name: 'Ads Node', last4: '2938', status: 'active', icon: '🌐' },
                                { name: 'Kitchen', last4: '4491', status: 'frozen', icon: '👨‍🍳' },
                            ].map((card, i) => (
                                <div key={i} className="p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-800 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">{card.icon}</div>
                                        <div className="overflow-hidden">
                                            <p className="font-black text-white text-[11px] sm:text-sm italic uppercase truncate">{card.name}</p>
                                            <p className="text-[9px] sm:text-[10px] font-mono text-slate-500">**** {card.last4}</p>
                                        </div>
                                    </div>
                                    <div className={`px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-tighter flex-shrink-0 ${card.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400'}`}>{card.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoreUtilities = () => {
    return (
        <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 bg-slate-950 h-full min-h-screen">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter">Store Utilities</h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Pay business bills directly from revenue.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                    { name: 'Electricity', icon: <Zap />, color: 'from-orange-500 to-amber-600' },
                    { name: 'Wifi/Data', icon: <Wifi />, color: 'from-blue-500 to-indigo-600' },
                    { name: 'Airtime', icon: <PhoneIcon />, color: 'from-emerald-500 to-teal-600' },
                    { name: 'Gov. Fees', icon: <Building2 />, color: 'from-slate-500 to-slate-700' },
                    { name: 'Cable TV', icon: <Tv />, color: 'from-purple-500 to-violet-600' },
                    { name: 'Water', icon: <Download />, color: 'from-cyan-500 to-blue-500' },
                ].map((utility, i) => (
                    <button key={i} className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all relative overflow-hidden shadow-xl">
                        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${utility.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                            {React.cloneElement(utility.icon as React.ReactElement, { size: 20 })}
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{utility.name}</span>
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
                <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-2xl overflow-hidden relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
                        <h3 className="font-black text-white text-lg sm:text-xl font-display italic uppercase tracking-tighter flex items-center gap-3">
                            <div className="w-1 h-6 sm:h-8 bg-emerald-500 rounded-full" /> Quick Pay: Meter
                        </h3>
                        <div className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Saved</div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Meter Number</label>
                                <div className="relative">
                                    <input type="text" defaultValue="0492-3841-293" className="w-full bg-slate-950 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white font-mono font-bold tracking-widest outline-none focus:border-emerald-500 transition-all text-sm sm:text-base" />
                                    <CheckCircle2 size={16} sm:size={18} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Purchase Amount (₦)</label>
                                <input type="number" placeholder="e.g. 5000" className="w-full bg-slate-950 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-emerald-400 font-mono font-black text-lg sm:text-xl outline-none focus:border-emerald-500 transition-all" />
                            </div>
                        </div>

                        <div className="flex flex-col justify-end gap-3 sm:gap-4">
                            <div className="bg-slate-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/5 space-y-3 sm:space-y-4 shadow-inner">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span>Vendor Fee</span>
                                    <span className="text-white">₦0.00</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span>Cashback</span>
                                    <span className="text-emerald-500">+₦140</span>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[10px] font-black text-white uppercase italic">Total</span>
                                    <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-tighter">₦0.00</span>
                                </div>
                            </div>
                            <Button className="w-full py-4 sm:py-5 bg-emerald-500 text-slate-950 font-black uppercase tracking-widest rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-500/20 text-[10px] sm:text-xs">Execute Utility</Button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-emerald-500 rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-8 text-slate-950 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/20 blur-2xl sm:blur-3xl rounded-full" />
                        <h4 className="text-lg sm:text-xl font-display font-black uppercase italic tracking-tighter mb-2 sm:mb-4">Bulk Staff</h4>
                        <p className="font-bold text-slate-900/70 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">Top up entire teams in one handshake.</p>
                        <Button className="w-full bg-slate-950 text-white font-black py-3 sm:py-4 uppercase text-[8px] sm:text-[10px] tracking-[0.2em] rounded-xl sm:rounded-2xl">Upload List</Button>
                    </div>
                    
                    <div className="bg-slate-900 border border-white/5 rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-8">
                         <h4 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                            <History size={14} sm:size={16} className="text-slate-500" /> Utility Logs
                         </h4>
                         <div className="space-y-4">
                            {[
                                { name: 'IKEDC', date: 'Yesterday', amt: '₦25k' },
                                { name: 'MTN Biz', date: 'Oct 24', amt: '₦12k' },
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-default">
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] sm:text-[11px] font-black text-slate-200 uppercase tracking-tight truncate">{log.name}</p>
                                        <p className="text-[8px] sm:text-[9px] text-slate-500 font-mono">{log.date}</p>
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-mono font-black text-white flex-shrink-0 ml-2">{log.amt}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PointOfSale = ({ onOpenFund }: { onOpenFund: () => void }) => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
    const [manualAmount, setManualAmount] = useState('');
    const [checkoutState, setCheckoutState] = useState<'idle' | 'generating' | 'payment_method' | 'waiting' | 'paid'>('idle');
    const [paymentMethod, setPaymentMethod] = useState<'tap' | 'scan' | 'transfer'>('tap');
    const [searchQuery, setSearchQuery] = useState('');
    const [billRef, setBillRef] = useState(`FL-INV-${Math.floor(Math.random()*90000 + 10000)}`);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isMobileCartVisible, setIsMobileCartVisible] = useState(false);

    // Form state shared between Add and Edit
    const [formProduct, setFormProduct] = useState({ name: '', price: '', category: 'General', image: '📦' });

    const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalManual = (manualAmount ? parseFloat(manualAmount) : 0);
    const subtotal = cartSubtotal + totalManual;
    const vat = subtotal * 0.075;
    const total = subtotal + vat;
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0) + (manualAmount ? 1 : 0);

    const addToCart = (product: Product) => {
      setCart(prev => {
        const existing = prev.find(item => item.product.id === product.id);
        if (existing) {
          return prev.map(item => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item);
        }
        return [...prev, { product, quantity: 1 }];
      });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.product.id !== id));
    };

    const generateBill = () => {
        if (total <= 0) return;
        setCheckoutState('generating');
        setTimeout(() => setCheckoutState('payment_method'), 1000);
    };

    const confirmPayment = () => {
        setCheckoutState('waiting');
        if (paymentMethod !== 'transfer') {
            setTimeout(() => setCheckoutState('paid'), 5000);
        }
    };

    const clear = () => {
        setCart([]);
        setManualAmount('');
        setCheckoutState('idle');
        setPaymentMethod('tap');
        setIsMobileCartVisible(false);
        setBillRef(`FL-INV-${Math.floor(Math.random()*90000 + 10000)}`);
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormProduct({ name: '', price: '', category: 'General', image: '📦' });
        setShowAddProductModal(true);
    };

    const openEditModal = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        setEditingProduct(product);
        setFormProduct({ 
            name: product.name, 
            price: product.price.toString(), 
            category: product.category, 
            image: product.image 
        });
        setShowAddProductModal(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formProduct.name || !formProduct.price) return;
        
        if (editingProduct) {
            // Update existing
            const updated: Product = {
                ...editingProduct,
                name: formProduct.name,
                price: parseFloat(formProduct.price),
                category: formProduct.category,
                image: formProduct.image
            };
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
            setCart(prev => prev.map(item => item.product.id === editingProduct.id ? { ...item, product: updated } : item));
        } else {
            // Add new
            const product: Product = {
                id: Date.now().toString(),
                name: formProduct.name,
                price: parseFloat(formProduct.price),
                category: formProduct.category,
                image: formProduct.image
            };
            setProducts(prev => [product, ...prev]);
        }
        
        setShowAddProductModal(false);
    };

    const handleDeleteProduct = (productId: string, productName: string) => {
        if (confirm(`Remove ${productName} from catalog permanently?`)) {
            setProducts(prev => prev.filter(p => p.id !== productId));
            setCart(prev => prev.filter(item => item.product.id !== productId));
            if (editingProduct?.id === productId) {
                setShowAddProductModal(false);
            }
        }
    };

    const clearFullCatalog = () => {
        if (confirm("DANGER: This will delete ALL saved items in your catalog. Proceed?")) {
            setProducts([]);
            setCart([]);
        }
    };

    const resetCatalogToDefault = () => {
        if (confirm("Restore the default product list? This will add initial items back.")) {
            setProducts(INITIAL_PRODUCTS);
        }
    }

    return (
        <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-slate-950 relative">
            {/* Catalog Section */}
            <div className={`flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar lg:border-r lg:border-white/5 pb-32 lg:pb-6 ${isMobileCartVisible ? 'hidden lg:block' : 'block'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tighter uppercase italic">Billing Terminal</h2>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-1">
                            <p className="text-slate-500 text-xs sm:text-sm font-medium">Manage SKUs and checkout.</p>
                            <div className="flex gap-2">
                                <button onClick={clearFullCatalog} className="text-[8px] sm:text-[10px] font-black text-red-500/60 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/5">
                                    <Trash2 size={10} /> Clear
                                </button>
                                {products.length === 0 && (
                                    <button onClick={resetCatalogToDefault} className="text-[8px] sm:text-[10px] font-black text-emerald-500/60 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/5">
                                        <RotateCcw size={10} /> Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} sm:size={18} />
                            <input 
                                type="text" 
                                placeholder="Find SKUs..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 text-xs sm:text-sm text-white focus:border-emerald-500 outline-none transition-all shadow-inner"
                            />
                        </div>
                        <button 
                            onClick={openAddModal}
                            className="bg-emerald-500 text-slate-950 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl hover:bg-emerald-400 transition-colors shadow-lg flex items-center justify-center gap-2 font-bold whitespace-nowrap"
                        >
                            <Plus size={18} sm:size={20} />
                            <span className="hidden xs:inline text-xs sm:text-sm font-black uppercase">Add SKU</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
                    <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openAddModal}
                        className="bg-emerald-500/5 border border-dashed border-emerald-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-center flex flex-col items-center justify-center group hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all min-h-[140px] sm:min-h-[180px]"
                    >
                        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-emerald-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-emerald-500 mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
                            <Plus size={24} sm:size={32} />
                        </div>
                        <h4 className="font-bold text-emerald-400 text-[10px] sm:text-sm tracking-tight uppercase">New SKU</h4>
                    </motion.button>

                    {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                        <motion.button
                            key={product.id}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addToCart(product)}
                            className="bg-slate-900 border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-left group hover:border-emerald-500/30 transition-all shadow-xl relative overflow-hidden min-h-[140px] sm:min-h-[180px]"
                        >
                            <div className="absolute top-2 right-4 text-[8px] sm:text-[10px] font-black text-white/10 group-hover:text-emerald-500/20 transition-colors uppercase italic">{product.category}</div>
                            <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id, product.name); }}
                                    className="p-1.5 sm:p-2.5 bg-red-500/20 sm:bg-red-500/10 rounded-lg sm:rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg"
                                >
                                    <Trash2 size={12} sm:size={16} />
                                </button>
                                <button 
                                    onClick={(e) => openEditModal(e, product)}
                                    className="p-1.5 sm:p-2.5 bg-white/10 sm:bg-white/5 rounded-lg sm:rounded-xl text-slate-500 hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-500/20 shadow-lg"
                                >
                                    <Edit2 size={12} sm:size={16} />
                                </button>
                            </div>
                            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
                                {product.image}
                            </div>
                            <h4 className="font-bold text-white text-xs sm:text-base mb-1 tracking-tight pr-6 sm:pr-8 truncate">{product.name}</h4>
                            <p className="text-emerald-400 font-mono text-[10px] sm:text-sm font-black">₦{product.price.toLocaleString()}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Manual Sale Entry */}
                <div className="bg-slate-900/40 border border-white/10 rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-10 max-w-full sm:max-w-md mx-auto lg:mx-0 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <div className="p-2 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-400">
                          <Tag size={16} sm:size={20} />
                      </div>
                      <h3 className="text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Quick Manual Sale</h3>
                   </div>
                   
                   <div className="mb-6 sm:mb-10 bg-slate-950 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-inner group relative overflow-hidden text-center">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10 overflow-hidden">
                            <span className="text-xl sm:text-3xl font-display text-emerald-500 font-black opacity-40 italic">₦</span>
                            <h2 className="text-4xl sm:text-6xl font-display font-black text-white truncate tracking-tighter">{manualAmount || '0'}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4 relative z-10">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '.'].map(key => (
                            <button 
                                key={key} 
                                onClick={() => key === 'C' ? setManualAmount('') : setManualAmount(prev => prev.length < 9 ? prev + key : prev)} 
                                className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-white/5 text-lg sm:text-2xl font-black text-white hover:bg-emerald-500 hover:text-slate-950 transition-all active:scale-90 border border-white/5 shadow-lg flex items-center justify-center"
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Smart Floating Cart Bar (Mobile Only) */}
            {(cartCount > 0) && (
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: isMobileCartVisible ? 100 : 0 }}
                className="lg:hidden fixed bottom-6 left-6 right-6 z-50 pointer-events-auto"
              >
                  <button 
                    onClick={() => setIsMobileCartVisible(true)}
                    className="w-full bg-emerald-500 text-slate-950 p-5 rounded-[2rem] flex items-center justify-between shadow-[0_15px_40px_rgba(16,185,129,0.4)] group"
                  >
                    <div className="flex items-center gap-4">
                       <div className="relative">
                          <ShoppingBag size={24} />
                          <span className="absolute -top-2 -right-2 bg-slate-950 text-emerald-400 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-emerald-500/20">{cartCount}</span>
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Invoice</p>
                          <p className="text-lg font-mono font-black tracking-tight">₦{total.toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
                       Review Bill <ChevronUp size={20} className="animate-bounce" />
                    </div>
                  </button>
              </motion.div>
            )}

            {/* Bill Preview - Desktop Sidebar / Mobile Modal */}
            <AnimatePresence>
                {(isMobileCartVisible || window.innerWidth >= 1024) && (
                    <motion.div 
                        initial={window.innerWidth < 1024 ? { y: '100%' } : { x: 40, opacity: 0 }}
                        animate={window.innerWidth < 1024 ? { y: 0 } : { x: 0, opacity: 1 }}
                        exit={window.innerWidth < 1024 ? { y: '100%' } : { x: 40, opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`w-full lg:w-[420px] xl:w-[480px] bg-slate-900 border-l border-white/5 flex flex-col h-full shadow-2xl z-[55] lg:z-30 ${
                          window.innerWidth < 1024 ? 'fixed inset-0 pt-16' : 'relative'
                        }`}
                    >
                        {/* Mobile Close Handle */}
                        <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full cursor-pointer" onClick={() => setIsMobileCartVisible(false)} />
                        
                        <div className="p-6 sm:p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                    <Receipt size={20} sm:size={24} />
                                </div>
                                <div>
                                   <h3 className="font-black text-lg sm:text-xl font-display uppercase italic tracking-tighter text-white">Draft Invoice</h3>
                                   <p className="text-[8px] sm:text-[10px] font-mono text-slate-500 tracking-widest truncate max-w-[150px]">{billRef}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {(cart.length > 0 || manualAmount) && (
                                    <button onClick={clear} className="p-2.5 sm:p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-xl sm:rounded-2xl" title="Clear Bill">
                                       <Trash2 size={18} sm:size={20} />
                                    </button>
                                )}
                                <button onClick={() => setIsMobileCartVisible(false)} className="lg:hidden p-2.5 text-slate-500 hover:text-white transition-all rounded-xl">
                                   <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-3 sm:space-y-4 custom-scrollbar">
                            <AnimatePresence mode="popLayout">
                                {cart.length === 0 && !manualAmount ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4 py-20">
                                        <ShoppingCart size={48} className="opacity-10" />
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Terminal Idle</p>
                                        <button onClick={onOpenFund} className="text-emerald-400 text-xs font-black uppercase tracking-widest hover:underline">Fund Node Portfolio</button>
                                    </motion.div>
                                ) : (
                                    <>
                                        {cart.map(item => (
                                            <motion.div 
                                              key={item.product.id} 
                                              layout 
                                              initial={{ opacity: 0, x: -20 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              exit={{ opacity: 0, x: 20 }}
                                              className="bg-white/5 rounded-2xl sm:rounded-[2rem] p-4 border border-white/5 flex justify-between items-center group relative"
                                            >
                                                <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-800 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">{item.product.image}</div>
                                                    <div className="text-left overflow-hidden">
                                                        <p className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">{item.product.name}</p>
                                                        <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono">₦{item.product.price.toLocaleString()} × {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                  <p className="text-lg sm:text-xl font-mono font-black text-white tracking-tighter flex-shrink-0">₦{(item.product.price * item.quantity).toLocaleString()}</p>
                                                  <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
                                                </div>
                                            </motion.div>
                                        ))}
                                        {manualAmount && (
                                            <motion.div 
                                              layout
                                              initial={{ opacity: 0, scale: 0.9 }}
                                              animate={{ opacity: 1, scale: 1 }}
                                              className="bg-emerald-500/5 rounded-2xl sm:rounded-[2rem] p-5 border border-emerald-500/20 flex justify-between items-center"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <Zap size={16} sm:size={20} className="text-emerald-400 fill-emerald-400 flex-shrink-0" />
                                                    <span className="text-[10px] sm:text-sm font-black text-white uppercase tracking-[0.2em] italic">Manual Entry</span>
                                                </div>
                                                <p className="text-lg sm:text-2xl font-mono font-black text-emerald-400 truncate ml-2">₦{parseFloat(manualAmount).toLocaleString()}</p>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="p-6 sm:p-10 bg-slate-900 border-t border-white/5 space-y-6 sm:space-y-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
                           <div className="space-y-2 sm:space-y-4">
                              <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500">
                                  <span>Subtotal</span>
                                  <span className="font-mono text-slate-300">₦{subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500">
                                  <span>Tax (VAT 7.5%)</span>
                                  <span className="font-mono text-slate-300">₦{vat.toLocaleString()}</span>
                              </div>
                              <div className="h-px bg-white/5" />
                              <div className="flex justify-between items-center pt-1 sm:pt-2">
                                <span className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-[0.4em]">Payable</span>
                                <span className="text-3xl sm:text-5xl font-mono font-black text-emerald-400 tracking-tighter">₦{total.toLocaleString()}</span>
                              </div>
                           </div>
                           
                           <Button 
                            onClick={generateBill} 
                            disabled={total <= 0 || checkoutState !== 'idle'} 
                            variant="secondary"
                            className="w-full py-5 sm:py-7 text-lg sm:text-2xl font-black bg-emerald-500 text-slate-950 uppercase tracking-[0.15em] shadow-2xl rounded-2xl sm:rounded-[2.5rem]"
                           >
                              Generate Bill
                           </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Product Modal (Add / Edit) */}
            <AnimatePresence>
                {showAddProductModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl px-4 py-6 overflow-y-auto">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-white/10 rounded-[1.5rem] sm:rounded-[3rem] w-full max-w-md shadow-2xl relative my-auto"
                        >
                            <div className="p-6 sm:p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
                                <h3 className="text-lg sm:text-2xl font-display font-black text-white uppercase italic tracking-tighter">
                                    {editingProduct ? 'Edit SKU' : 'New SKU'}
                                </h3>
                                <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={20} sm:size={24} /></button>
                            </div>
                            <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formProduct.name}
                                        onChange={(e) => setFormProduct({...formProduct, name: e.target.value})}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-emerald-500 outline-none transition-all font-bold text-sm sm:text-base"
                                        placeholder="Product Name"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={formProduct.price}
                                            onChange={(e) => setFormProduct({...formProduct, price: e.target.value})}
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-emerald-400 focus:border-emerald-500 outline-none transition-all font-mono font-black text-base sm:text-xl"
                                        />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Icon</label>
                                        <input 
                                            type="text" 
                                            value={formProduct.image}
                                            onChange={(e) => setFormProduct({...formProduct, image: e.target.value})}
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-emerald-500 outline-none transition-all text-center text-xl sm:text-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 relative">
                                    <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                    <div className="relative">
                                        <select 
                                            value={formProduct.category}
                                            onChange={(e) => setFormProduct({...formProduct, category: e.target.value})}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer font-bold text-sm sm:text-base"
                                        >
                                            <option value="Coffee">Coffee</option>
                                            <option value="Pastry">Pastry</option>
                                            <option value="Food">Food</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="General">General</option>
                                        </select>
                                        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronDown size={18} sm:size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                                    {editingProduct && (
                                        <button 
                                            type="button" 
                                            onClick={() => handleDeleteProduct(editingProduct.id, editingProduct.name)}
                                            className="flex-1 py-3 sm:py-5 border border-white/10 hover:bg-red-500/10 text-red-400 font-bold rounded-xl sm:rounded-2xl transition-all text-xs sm:text-sm"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <Button type="submit" className="flex-[2] py-3 sm:py-5 bg-emerald-500 text-slate-950 font-black uppercase text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl">
                                        {editingProduct ? 'Commit' : 'Save'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Handshake Flow Modal */}
            <AnimatePresence>
                {checkoutState !== 'idle' && checkoutState !== 'generating' && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl px-4 py-4 overflow-y-auto">
                        <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} className="bg-slate-900 border border-white/10 rounded-[2rem] sm:rounded-[4rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto">
                            {checkoutState === 'paid' ? (
                                <div className="p-8 sm:p-16 text-center w-full bg-slate-950">
                                     <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-2xl border-[6px] sm:border-[10px] border-emerald-500/20">
                                        <ShieldCheck size={40} sm:size={56} className="text-white" strokeWidth={3} />
                                     </div>
                                     <h3 className="text-2xl sm:text-4xl font-display font-black text-white mb-2 sm:mb-3 uppercase italic">Settled!</h3>
                                     <p className="text-emerald-400 font-mono text-2xl sm:text-3xl font-black mb-4 sm:mb-6">₦{total.toLocaleString()}</p>
                                     <p className="text-slate-400 text-xs sm:text-sm mb-8 sm:mb-12">Cryptographic handshake complete.</p>
                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <Button variant="outline" className="py-4 sm:py-6 font-black uppercase text-[10px] sm:text-[11px] rounded-xl sm:rounded-[2rem] border-white/10" onClick={() => alert("Printing...")}><Printer className="mr-2 sm:mr-3" size={16} sm:size={18} /> Receipt</Button>
                                        <Button className="py-4 sm:py-6 bg-emerald-500 text-slate-950 font-black uppercase text-[10px] sm:text-[11px] rounded-xl sm:rounded-[2rem]" onClick={clear}>Done</Button>
                                     </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex md:flex-col w-full md:w-72 bg-slate-950 border-b md:border-b-0 md:border-r border-white/5 p-6 sm:p-10 justify-between items-center md:items-start">
                                        <div>
                                            <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Total Payable</p>
                                            <h3 className="text-xl sm:text-3xl font-mono font-black text-white">₦{total.toLocaleString()}</h3>
                                        </div>
                                        <div className="hidden md:block bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20 text-[10px] text-emerald-200/60 leading-tight">Present screen to customer.</div>
                                    </div>

                                    <div className="flex-1 flex flex-col bg-slate-900">
                                        <div className="flex p-3 sm:p-4 gap-2 bg-slate-950/40 border-b border-white/5 overflow-x-auto no-scrollbar">
                                            {['tap', 'scan', 'transfer'].map(m => (
                                                <button key={m} onClick={() => setPaymentMethod(m as any)} className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2.5 sm:py-3.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border ${paymentMethod === m ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}>
                                                    {m}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center items-center text-center min-h-[300px]">
                                            {paymentMethod === 'tap' && (
                                                <div className="space-y-6 sm:space-y-10">
                                                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
                                                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-[ping_4s_linear_infinite]" />
                                                        <div className="relative w-full h-full bg-emerald-500/5 rounded-full flex items-center justify-center text-emerald-500 border-4 border-white/5 shadow-2xl">
                                                            <Wifi size={80} sm:size={100} className="rotate-90 animate-pulse" />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tighter">Ready for Tap</h4>
                                                    <Button onClick={confirmPayment} className="bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[10px] uppercase font-black px-8">Simulate Tap</Button>
                                                </div>
                                            )}

                                            {paymentMethod === 'scan' && (
                                                <div className="space-y-6 sm:space-y-10">
                                                    <div className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[3.5rem] mx-auto w-52 h-52 sm:w-64 sm:h-64 shadow-2xl relative overflow-hidden group border-8 sm:border-[12px] border-white/5">
                                                        <QrCode size={180} sm:size={200} className="text-slate-950 mx-auto" strokeWidth={1} />
                                                    </div>
                                                    <h4 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tighter">Align QR Code</h4>
                                                    <Button onClick={confirmPayment} className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-8">Confirm</Button>
                                                </div>
                                            )}

                                            {paymentMethod === 'transfer' && (
                                                <div className="w-full max-w-md space-y-6 sm:space-y-8 text-left">
                                                    <div className="bg-slate-950 border border-white/10 rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 space-y-6 sm:space-y-8 shadow-inner">
                                                        <div>
                                                            <label className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3 sm:mb-4">Node Account</label>
                                                            <div className="flex items-center justify-between bg-white/5 p-4 sm:p-5 rounded-xl sm:rounded-[2rem] border border-white/5 overflow-hidden">
                                                                <span className="text-xl sm:text-3xl font-mono font-black text-white truncate">8812930291</span>
                                                                <Copy size={16} sm:size={20} className="text-slate-400 flex-shrink-0 ml-2" />
                                                            </div>
                                                        </div>
                                                        <p className="text-base sm:text-lg font-black text-white italic tracking-tight">Flash / Wema Bank</p>
                                                    </div>
                                                    <Button onClick={confirmPayment} className="w-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest py-4">Confirm Settlement</Button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 sm:p-8 border-t border-white/5 bg-slate-950/40">
                                             <button onClick={() => setCheckoutState('idle')} className="w-full py-4 text-slate-500 hover:text-red-400 font-black uppercase text-[9px] sm:text-[10px] transition-all border border-white/5 rounded-full hover:bg-white/5">Cancel Handshake</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};