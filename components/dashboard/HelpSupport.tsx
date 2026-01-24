import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, FileText, ChevronRight, ChevronDown, Send, User, Bot, Paperclip, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const HelpSupport: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', text: 'Hi John! I\'m FlashBot ⚡️. How can I help you today?', time: '10:00 AM' }
    ]);

    const faqs = [
        {
            category: 'Transactions',
            items: [
                { q: 'Why is my deposit pending?', a: 'Deposits usually reflect instantly. If it takes longer than 15 minutes, it might be due to network congestion on the blockchain. Please check the transaction hash.' },
                { q: 'What is the limit for P2P transfers?', a: 'P2P transfer limits depend on your verification tier. Tier 1 is $500/day, while Tier 3 allows up to $100,000/day.' },
                { q: 'How do I reverse a transaction?', a: 'Crypto transactions are irreversible on the blockchain. However, if you sent funds to another Flash user via email/phone, please contact support immediately.' }
            ]
        },
        {
            category: 'Cards',
            items: [
                { q: 'My virtual card was declined.', a: 'Please check if you have sufficient USD balance. Also, ensure "Online Transactions" are enabled in your card settings.' },
                { q: 'How do I fund my card?', a: 'Go to the "Virtual Cards" tab, click "Fund Card", and select your source wallet (NGN, USD, or Crypto).' },
            ]
        },
        {
            category: 'Account',
            items: [
                { q: 'How do I upgrade my tier?', a: 'Navigate to Settings > Account > Verification Status to upload required documents for the next tier.' },
                { q: 'I forgot my transaction PIN.', a: 'You can reset your PIN in Settings > Security. You will need to verify your email and 2FA.' },
            ]
        }
    ];

    const tickets = [
        { id: '#Tk-9928', subject: 'Deposit not reflected', status: 'Resolved', date: 'Oct 24, 2023' },
        { id: '#Tk-9929', subject: 'Card freeze request', status: 'In Progress', date: 'Yesterday' },
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newMsg = { sender: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatHistory([...chatHistory, newMsg]);
        setChatMessage('');

        // Simulate Bot Response
        setTimeout(() => {
            setChatHistory(prev => [...prev, { 
                sender: 'bot', 
                text: 'Thanks for reaching out! A support agent will join this chat shortly. Expected wait time: 2 mins.', 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }]);
        }, 1000);
    };

    return (
        <div className="space-y-8 relative max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Help Center</h2>
                    <p className="text-slate-400 text-sm">Find answers or get in touch with our team.</p>
                </div>
                <div className="relative w-full md:w-auto min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search for answers..." 
                        className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Panel: Knowledge Base */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Common Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Transactions', icon: <FileText size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { name: 'Cards', icon: <div className="w-5 h-5 border-2 border-current rounded-sm" />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                            { name: 'Account', icon: <User size={20} />, color: 'text-green-400', bg: 'bg-green-500/10' },
                            { name: 'Security', icon: <div className="w-5 h-5 border-2 border-current rounded-full" />, color: 'text-red-400', bg: 'bg-red-500/10' },
                        ].map((cat) => (
                            <button 
                                key={cat.name}
                                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                                className={`p-4 rounded-xl border transition-all text-left group ${
                                    activeCategory === cat.name 
                                    ? 'bg-white/5 border-white/20' 
                                    : 'bg-dark-900 border-white/5 hover:border-brand-500/30'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${cat.bg} ${cat.color}`}>
                                    {cat.icon}
                                </div>
                                <span className="font-semibold text-white block text-sm">{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h3 className="font-semibold text-white">Frequently Asked Questions</h3>
                        </div>
                        <div className="divide-y divide-white/5">
                            {faqs
                                .filter(cat => !activeCategory || cat.category === activeCategory)
                                .map((cat) => (
                                    cat.items.map((item, idx) => (
                                        <details key={idx} className="group p-4 open:bg-white/5 transition-colors">
                                            <summary className="flex items-center justify-between cursor-pointer list-none">
                                                <span className="text-sm font-medium text-slate-200 group-hover:text-white">{item.q}</span>
                                                <ChevronDown size={16} className="text-slate-500 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="mt-3 text-sm text-slate-400 leading-relaxed pl-1">
                                                {item.a}
                                            </div>
                                        </details>
                                    ))
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Right Panel: Contact & History */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Contact Card */}
                    <div className="bg-gradient-to-br from-brand-900 to-dark-900 border border-brand-500/20 rounded-2xl p-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full" />
                         
                         <h3 className="text-lg font-bold text-white mb-2 relative z-10">Still need help?</h3>
                         <p className="text-slate-400 text-sm mb-6 relative z-10">Our support team is available 24/7 to assist you.</p>
                         
                         <div className="space-y-3 relative z-10">
                            <Button 
                                onClick={() => setIsChatOpen(true)}
                                className="w-full justify-center bg-brand-500 text-slate-950 hover:bg-brand-400 font-bold"
                            >
                                <MessageCircle size={18} className="mr-2" /> Live Chat
                            </Button>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <a href="mailto:support@flash.app" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-950/50 border border-white/10 hover:bg-white/5 hover:text-white text-slate-300 text-sm font-medium transition-colors">
                                    <Mail size={16} /> Email
                                </a>
                                <button className="flex items-center justify-center gap-2 p-3 rounded-xl bg-dark-950/50 border border-white/10 hover:bg-white/5 hover:text-white text-slate-300 text-sm font-medium transition-colors">
                                    <Phone size={16} /> Call
                                </button>
                            </div>
                         </div>
                    </div>

                    {/* Ticket History */}
                    <div className="bg-dark-900 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white text-sm">Recent Tickets</h3>
                            <button className="text-xs text-brand-400 hover:text-brand-300">View All</button>
                        </div>
                        <div className="space-y-3">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="p-3 rounded-xl bg-dark-950 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-mono text-slate-500">{ticket.id}</span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                            ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-medium text-white group-hover:text-brand-400 transition-colors truncate">{ticket.subject}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{ticket.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Modal */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[600px] max-h-[90vh] bg-dark-900 border border-white/10 shadow-2xl rounded-t-2xl md:rounded-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Chat Header */}
                        <div className="p-4 bg-brand-500 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot size={24} className="text-slate-900" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Flash Support</h3>
                                    <p className="text-xs text-slate-800/80 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-black/10 rounded-full text-slate-900">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 bg-dark-950 p-4 overflow-y-auto space-y-4">
                            <div className="text-center text-xs text-slate-500 my-4">Today</div>
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                        msg.sender === 'user' 
                                        ? 'bg-brand-500 text-slate-950 rounded-tr-none' 
                                        : 'bg-dark-900 border border-white/10 text-white rounded-tl-none'
                                    }`}>
                                        <p>{msg.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'}`}>{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-dark-900 border-t border-white/10 flex items-center gap-2">
                            <button type="button" className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5">
                                <Paperclip size={20} />
                            </button>
                            <input 
                                type="text" 
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Type a message..." 
                                className="flex-1 bg-dark-950 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
                            />
                            <button 
                                type="submit" 
                                disabled={!chatMessage.trim()}
                                className="p-2 bg-brand-500 text-slate-900 rounded-full hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};