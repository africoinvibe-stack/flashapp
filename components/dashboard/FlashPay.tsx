import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SmartphoneNfc, 
  QrCode, 
  ArrowLeft, 
  CheckCircle2, 
  Wifi, 
  Zap, 
  X, 
  ShieldCheck, 
  Printer, 
  ChevronRight,
  CircleDollarSign,
  Smartphone,
  Lock,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/Button';

interface FlashPayProps {
  onBack: () => void;
}

type PayMode = 'idle' | 'tap' | 'scan' | 'handshake' | 'success';

export const FlashPay: React.FC<FlashPayProps> = ({ onBack }) => {
  const [mode, setMode] = useState<PayMode>('idle');
  const [activeWallet, setActiveWallet] = useState<'NGN' | 'USD' | 'USDT'>('NGN');
  const [paymentData, setPaymentData] = useState<any>(null);

  // Simulated NFC Loop
  useEffect(() => {
    if (mode === 'tap') {
      const timer = setTimeout(() => {
        setPaymentData({
          merchant: "Flash Cafe Ltd.",
          amount: "₦2,500.00",
          item: "Double Espresso + Muffin",
          id: "#TX-99283-F"
        });
        setMode('handshake');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  const handleScan = () => {
    setMode('handshake');
    setPaymentData({
      merchant: "Lagos Tech Hub",
      amount: "₦15,000.00",
      item: "Co-working Space (Daily)",
      id: "#TX-88219-Q"
    });
  };

  const confirmPayment = () => {
    setMode('success');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {mode === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full space-y-12 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-display font-black text-white italic uppercase tracking-tighter">Choose Pay Method</h2>
              <p className="text-slate-500 font-medium">Flash handshakes are encrypted and settle instantly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button 
                onClick={() => setMode('tap')}
                className="group relative bg-slate-900 border border-white/5 rounded-[3rem] p-10 hover:border-brand-500/50 transition-all shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-brand-500 rounded-[2rem] flex items-center justify-center text-slate-950 mx-auto shadow-xl group-hover:scale-110 transition-transform">
                    <SmartphoneNfc size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white italic uppercase">Tap to Pay</h3>
                    <p className="text-slate-500 text-sm mt-2">Hold phone near merchant terminal.</p>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setMode('scan')}
                className="group relative bg-slate-900 border border-white/5 rounded-[3rem] p-10 hover:border-emerald-500/50 transition-all shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-slate-950 mx-auto shadow-xl group-hover:scale-110 transition-transform">
                    <QrCode size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white italic uppercase">Scan QR</h3>
                    <p className="text-slate-500 text-sm mt-2">Scan merchant static or dynamic QR.</p>
                  </div>
                </div>
              </button>
            </div>

            <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 mx-auto font-bold uppercase text-xs tracking-widest pt-8">
              <ArrowLeft size={16} /> Return Home
            </button>
          </motion.div>
        )}

        {mode === 'tap' && (
          <motion.div 
            key="tap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center gap-12"
          >
            <div className="relative w-72 h-72">
              {/* Pulsing NFC Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 animate-[ping_4s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-2 border-brand-500/10 animate-[ping_5s_linear_infinite_reverse]" />
              
              <div className="relative w-full h-full bg-brand-500/5 rounded-full border-4 border-white/5 flex flex-col items-center justify-center text-brand-500 shadow-[0_0_100px_rgba(245,158,11,0.15)]">
                <Wifi size={120} className="rotate-90 animate-pulse" />
                <p className="absolute bottom-16 text-[10px] font-black uppercase tracking-[0.3em]">Ready to Tap</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">Searching for Hub...</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Bring your device within 2cm of the Flash certified merchant terminal.</p>
            </div>

            <button onClick={() => setMode('idle')} className="px-8 py-3 rounded-full bg-white/5 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest border border-white/5">Cancel Handshake</button>
          </motion.div>
        )}

        {mode === 'scan' && (
          <motion.div 
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md space-y-12"
          >
            <div className="aspect-square w-full bg-black rounded-[3rem] border-4 border-white/10 relative overflow-hidden group shadow-2xl">
              {/* Scan Viewfinder Mockup */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="absolute inset-12 border-2 border-emerald-500/30 rounded-3xl" />
              
              {/* Corners */}
              <div className="absolute top-12 left-12 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl" />
              <div className="absolute top-12 right-12 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl" />
              <div className="absolute bottom-12 left-12 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl" />
              <div className="absolute bottom-12 right-12 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl" />

              {/* Scanning Line */}
              <motion.div 
                animate={{ top: ['15%', '85%', '15%'] }}
                transition={{ duration: 3, repeat: 999999, ease: "linear" }}
                className="absolute left-12 right-12 h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] z-20"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                 <button onClick={handleScan} className="bg-emerald-500 text-slate-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform opacity-0 group-hover:opacity-100">Simulate Scan</button>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Align QR Code</h3>
              <p className="text-slate-500 text-sm">Hold steady to initiate the protocol handshake.</p>
            </div>

            <button onClick={() => setMode('idle')} className="w-full py-4 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Back</button>
          </motion.div>
        )}

        {mode === 'handshake' && (
          <motion.div 
            key="handshake"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8"
          >
            <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">☕</div>
                   <div>
                      <h3 className="font-black text-white text-xl uppercase italic tracking-tighter">{paymentData.merchant}</h3>
                      <p className="text-[10px] text-slate-500 font-mono tracking-widest">MERCHANT NODE ID: #HUB-44</p>
                   </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[10px] font-black uppercase">Verified</div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Item(s)</span>
                   <span className="text-white font-medium">{paymentData.item}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-end">
                   <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Total Bill</span>
                   <span className="text-6xl font-mono font-black text-white tracking-tighter">{paymentData.amount}</span>
                </div>
              </div>

              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pay with</p>
                 <div className="grid grid-cols-3 gap-3">
                    {['NGN', 'USD', 'USDT'].map(w => (
                      <button 
                        key={w}
                        onClick={() => setActiveWallet(w as any)}
                        className={`py-4 rounded-2xl text-xs font-black transition-all border ${activeWallet === w ? 'bg-brand-500 text-slate-950 border-brand-500 shadow-lg' : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/20'}`}
                      >
                        {w}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setMode('idle')} variant="outline" className="flex-1 py-6 rounded-[2rem] border-white/5 text-slate-500 font-black uppercase text-[10px]">Cancel</Button>
              <Button onClick={confirmPayment} className="flex-[2] py-6 rounded-[2rem] bg-brand-500 text-slate-950 font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-500/20">Execute Payment</Button>
            </div>
          </motion.div>
        )}

        {mode === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center space-y-12 py-12"
          >
            <div className="relative">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(16,185,129,0.4)] border-[10px] border-emerald-500/20"
              >
                 <ShieldCheck size={64} className="text-white" strokeWidth={3} />
              </motion.div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                 {/* Success Particles simulation */}
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-5xl font-display font-black text-white italic uppercase tracking-tighter">Settled!</h3>
               <p className="text-emerald-400 font-mono text-3xl font-black">{paymentData?.amount}</p>
               <p className="text-slate-500 text-sm max-w-xs mx-auto">Cryptographic handshake complete. Receipt transmitted to @johndoe.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
               <Button variant="outline" className="py-5 rounded-[2rem] border-white/10 text-slate-400 font-black uppercase text-[10px] tracking-widest"><Printer size={16} className="mr-2" /> Receipt</Button>
               <Button onClick={onBack} className="py-5 rounded-[2rem] bg-emerald-500 text-slate-950 font-black uppercase text-[10px] tracking-widest">Done</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};