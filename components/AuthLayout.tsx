import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onBack: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onBack }) => {
  return (
    <div className="min-h-screen bg-dark-950 flex relative overflow-hidden items-center justify-center p-4">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-500/10 rounded-full blur-[120px]" 
            />
            <motion.div 
                 animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-electric-500/10 rounded-full blur-[120px]" 
            />
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md relative z-10"
        >
            <div className="bg-dark-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Shine effect on card */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <button 
                    onClick={onBack}
                    className="absolute top-6 left-6 group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 z-20"
                >
                    <ArrowLeft size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </button>

                <div className="text-center mb-8 pt-6">
                    <div className="inline-flex items-center justify-center mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <Zap className="text-white w-7 h-7 fill-white" />
                         </div>
                    </div>
                    <h2 className="font-display font-bold text-3xl text-white mb-2">{title}</h2>
                    <p className="text-slate-400 text-sm">{subtitle}</p>
                </div>

                {children}
            </div>
            
            <p className="text-center text-slate-500 text-xs mt-6">
                © {new Date().getFullYear()} Flash Inc. Secure encrypted connection.
            </p>
        </motion.div>
    </div>
  );
};
