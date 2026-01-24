import React from 'react';
import { MapPin, Search, Phone, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const AgentCenter: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Agent Network</h2>
                    <p className="text-slate-400 text-sm">Find verified cash points nearby or become a partner.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">Find Nearby</Button>
                    <Button variant="secondary" size="sm">Become an Agent</Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Agent List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search area (e.g., Ikeja, Lagos)" 
                            className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-brand-500 focus:outline-none"
                        />
                    </div>

                    <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">CyberCafe & Logistics</h3>
                                            <p className="text-slate-400 text-sm mb-2">124 Allen Avenue, Ikeja, Lagos</p>
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className="flex items-center gap-1 text-brand-400"><Star size={12} fill="currentColor" /> 4.9</span>
                                                <span className="text-slate-500">•</span>
                                                <span className="text-green-400">Open Now</span>
                                                <span className="text-slate-500">•</span>
                                                <span className="text-slate-400">0.8 km away</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-lg bg-white/5 text-slate-300 hover:bg-brand-500 hover:text-dark-950 transition-colors">
                                        <Phone size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Become an Agent CTA */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply" />
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 text-2xl shadow-xl">
                            💼
                        </div>
                        <h3 className="font-display font-bold text-2xl mb-2">Earn with Flash</h3>
                        <p className="text-brand-100 mb-8 leading-relaxed">
                            Turn your shop into a financial hub. Earn commissions on every deposit and withdrawal you process.
                        </p>
                        
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-brand-50 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> Instant commissions
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-50 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> Increased foot traffic
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-50 font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> Zero setup fees
                            </li>
                        </ul>
                        
                        <Button className="w-full bg-white text-brand-700 hover:bg-brand-50 shadow-xl border-none">
                            Apply Now <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
