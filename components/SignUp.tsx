import React, { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from './ui/Button';
import { Mail, Lock, User, Eye, EyeOff, Play, Briefcase } from 'lucide-react';

interface SignUpProps {
    onBack: () => void;
    onLogin: () => void;
    onRegisterSuccess: (isMerchant: boolean) => void;
    onDemo?: (isMerchant: boolean) => void;
    initialAccountType?: 'personal' | 'business';
}

export const SignUp: React.FC<SignUpProps> = ({ onBack, onLogin, onRegisterSuccess, onDemo, initialAccountType = 'personal' }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [accountType, setAccountType] = useState<'personal' | 'business'>(initialAccountType);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            onRegisterSuccess(accountType === 'business');
        }, 500);
    };

    return (
        <AuthLayout 
            title="Create Account" 
            subtitle={accountType === 'business' ? "Start accepting crypto payments at your store" : "Start spending your crypto instantly"} 
            onBack={onBack}
        >
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mb-8">
                <button 
                    onClick={() => setAccountType('personal')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${accountType === 'personal' ? 'bg-brand-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <User size={16} /> Personal
                </button>
                <button 
                    onClick={() => setAccountType('business')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${accountType === 'business' ? 'bg-brand-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Briefcase size={16} /> Business
                </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                 <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 ml-1">{accountType === 'business' ? 'Business Name' : 'Full Name'}</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {accountType === 'business' ? <Briefcase className="h-5 w-5 text-slate-500" /> : <User className="h-5 w-5 text-slate-500" />}
                        </div>
                        <input
                            type="text"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                            placeholder={accountType === 'business' ? "Flash Cafe Ltd." : "John Doe"}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                        </div>
                        <input
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                            placeholder="business@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300 ml-1">Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                            placeholder="Create a strong password"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-2 mt-2">
                    <input type="checkbox" required className="mt-1 rounded bg-white/10 border-white/20 text-brand-500 focus:ring-brand-500" />
                    <p className="text-xs text-slate-400 leading-tight">
                        I agree to the <a href="#" className="text-brand-400 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>.
                    </p>
                </div>

                <div className="pt-2">
                    <Button type="submit" className="w-full shadow-lg shadow-brand-500/20" variant="secondary" size="lg">
                        Create {accountType === 'business' ? 'Business' : 'Personal'} Account
                    </Button>
                </div>
            </form>

            <div className="mt-4">
                <button 
                    onClick={() => onDemo?.(accountType === 'business')}
                    className="w-full py-3.5 rounded-xl border border-brand-500/30 bg-brand-500/5 text-brand-400 font-bold flex items-center justify-center gap-2 hover:bg-brand-500/10 hover:border-brand-500/50 transition-all group"
                >
                    <div className="w-6 h-6 rounded-full bg-brand-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={12} className="fill-brand-400 ml-0.5" />
                    </div>
                    Explore Live Demo
                </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <button onClick={onLogin} className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
                    Log In
                </button>
            </p>
        </AuthLayout>
    )
}