import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center">
                <Zap className="text-white w-5 h-5 fill-white" />
              </div>
              <span className="font-display font-bold text-xl text-white italic">
                Flash
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Bridging DeFi and real-world spending at lightning speed. 
              Built on the architectural excellence of God's Own Institute.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-brand-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end">
            <h4 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-6 text-[10px] text-slate-600 font-mono uppercase tracking-widest">Protocol v2.4.0</p>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-slate-500 text-[10px] sm:text-xs font-medium">
            © {new Date().getFullYear()} Flash Inc. Part of the God's Own Institute Ecosystem.
          </p>
          <div className="flex gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
             <a href="#">Privacy</a>
             <a href="#">Terms</a>
             <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};