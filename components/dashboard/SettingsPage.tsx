import React from 'react';
import { User, Bell, Lock, Smartphone, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const SettingsPage: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-2xl ring-4 ring-dark-900">
                    JD
                </div>
                <h2 className="text-2xl font-bold text-white">John Doe</h2>
                <p className="text-slate-400">@johndoe • Verified Level 2</p>
            </div>

            <div className="space-y-4">
                <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Account</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <User className="text-slate-400 group-hover:text-brand-400 transition-colors" size={20} />
                                <span className="text-slate-200">Personal Information</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-600" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Bell className="text-slate-400 group-hover:text-brand-400 transition-colors" size={20} />
                                <span className="text-slate-200">Notifications</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-600" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Smartphone className="text-slate-400 group-hover:text-brand-400 transition-colors" size={20} />
                                <span className="text-slate-200">App Settings</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-600" />
                        </button>
                    </div>
                </div>

                <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Security</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Lock className="text-slate-400 group-hover:text-brand-400 transition-colors" size={20} />
                                <span className="text-slate-200">Change Password</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-600" />
                        </button>
                         <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded border border-slate-400 flex items-center justify-center text-[10px] text-slate-400 font-bold group-hover:border-brand-400 group-hover:text-brand-400 transition-colors">2FA</div>
                                <span className="text-slate-200">Two-Factor Authentication</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded">Enabled</span>
                                <ChevronRight size={16} className="text-slate-600" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="bg-dark-900 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Support</h3>
                    </div>
                    <div className="divide-y divide-white/5">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="text-slate-400 group-hover:text-brand-400 transition-colors" size={20} />
                                <span className="text-slate-200">Help Center</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-600" />
                        </button>
                    </div>
                </div>
                
                <div className="pt-4">
                    <Button variant="outline" className="w-full text-red-400 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10 border-white/10">
                        <LogOut size={18} className="mr-2" /> Sign Out
                    </Button>
                    <p className="text-center text-xs text-slate-500 mt-4">Version 2.4.0 (Build 882)</p>
                </div>
            </div>
        </div>
    );
};
