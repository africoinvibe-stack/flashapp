import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';

export const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Transmitted Securely.");
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact-us" className="py-24 bg-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Info */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
             <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">
                Initiate <span className="gradient-text">Contact</span>
             </h2>
             <p className="text-slate-400 text-lg mb-12">
                Have questions about the protocol? Need institutional integration? 
                Our team is ready to assist.
             </p>

             <div className="space-y-8">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-400" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold mb-1">Email Transmission</h4>
                      <p className="text-slate-400 text-sm mb-1">General Inquiries</p>
                      <a href="mailto:hello@flash.app" className="text-white hover:text-brand-400 transition-colors">hello@flash.app</a>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-electric-400" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold mb-1">Live Support</h4>
                      <p className="text-slate-400 text-sm mb-1">Available 24/7</p>
                      <button className="text-white hover:text-electric-400 transition-colors">Open Chat Console</button>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-400" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold mb-1">HQ Coordinates</h4>
                      <p className="text-slate-400 text-sm">
                         303 Flash Tower, Crypto Valley<br />
                         Delaware, USA 19901
                      </p>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Right: Holographic Form */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
             <form onSubmit={handleSubmit} className="bg-dark-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Form Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none" />
                
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                   <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" /> Secure Message Link
                </h3>

                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase">Identity Name</label>
                         <input 
                            type="text" 
                            required
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                            className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                            placeholder="John Doe"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase">Comms Channel</label>
                         <input 
                            type="email" 
                            required
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                            className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                            placeholder="email@domain.com"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Transmission Data</label>
                      <textarea 
                         rows={4}
                         required
                         value={formState.message}
                         onChange={e => setFormState({...formState, message: e.target.value})}
                         className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 focus:outline-none transition-colors"
                         placeholder="How can we assist you?"
                      />
                   </div>

                   <Button type="submit" variant="secondary" className="w-full mt-4" icon={<Send size={18} />}>
                      Transmit Message
                   </Button>
                </div>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};