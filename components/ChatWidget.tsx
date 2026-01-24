import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Send } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', text: 'Hi! I\'m FlashBot ⚡️. How can I help you today?', time: 'Now' }
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, isOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newMsg = { sender: 'user', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatHistory([...chatHistory, newMsg]);
        setChatMessage('');

        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                sender: 'bot',
                text: 'Thanks for reaching out! A support agent will join this chat shortly.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-24 right-6 md:bottom-6 md:right-6 w-[calc(100%-3rem)] md:w-96 h-[500px] max-h-[80vh] bg-dark-900 border border-white/10 shadow-2xl rounded-2xl z-[100] flex flex-col overflow-hidden font-sans"
                >
                     {/* Header */}
                    <div className="p-4 bg-brand-500 flex items-center justify-between shadow-md relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <Bot size={20} className="text-slate-900" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm leading-tight">Flash Support</h3>
                                <p className="text-[10px] text-slate-900/70 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" /> Online
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 hover:bg-black/10 rounded-full text-slate-900 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 bg-dark-950 p-4 overflow-y-auto space-y-4">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.sender === 'user'
                                    ? 'bg-brand-500 text-slate-950 rounded-tr-none'
                                    : 'bg-dark-800 border border-white/5 text-slate-200 rounded-tl-none'
                                }`}>
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1.5 text-right font-medium opacity-70`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-dark-900 border-t border-white/10 flex items-center gap-2">
                        <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none transition-all placeholder-slate-600"
                        />
                        <button
                            type="submit"
                            disabled={!chatMessage.trim()}
                            className="p-3 bg-brand-500 text-slate-900 rounded-xl hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-500/20"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};