import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const WordsOnMarble: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-dark-950 relative overflow-hidden flex items-center justify-center">
      {/* Marble Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-brand-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative inline-block w-full"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute -top-6 -left-2 xs:-top-12 xs:-left-12 w-16 h-16 xs:w-24 xs:h-24 border-t-2 border-l-2 border-brand-500/20 rounded-tl-[2rem] xs:rounded-tl-[3rem]" />
          <div className="absolute -bottom-6 -right-2 xs:-bottom-12 xs:-right-12 w-16 h-16 xs:w-24 xs:h-24 border-b-2 border-r-2 border-brand-500/20 rounded-br-[2rem] xs:rounded-br-[3rem]" />

          <div className="mb-6 sm:mb-8 flex justify-center">
             <div className="p-3 sm:p-4 rounded-full bg-brand-500/10 border border-brand-500/20">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-brand-400 fill-brand-400/10" />
             </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-brand-500/60 mb-2">Words on the Marble</h2>
            
            <div className="relative group cursor-default">
                <h3 className="font-display font-black text-5xl xs:text-6xl sm:text-8xl lg:text-9xl italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 transition-all duration-700 group-hover:tracking-normal">
                  GOI <br />
                  <span className="gradient-text not-italic uppercase">Factor</span>
                </h3>
                {/* Secondary Layer for "God's Own Institute" */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 sm:mt-12 text-base xs:text-lg sm:text-2xl font-display font-medium text-slate-400 tracking-[0.1em] sm:tracking-[0.2em] italic px-4"
                >
                    Foundations by <span className="text-white font-bold not-italic border-b border-brand-500/30 pb-1">God's Own Institute</span>
                </motion.p>
            </div>

            <div className="pt-10 sm:pt-16 max-w-2xl mx-auto px-4">
               <p className="text-slate-500 text-[10px] sm:text-sm leading-relaxed font-medium uppercase tracking-[0.15em] sm:tracking-widest">
                  Excellence is not an act, but a habit of the institution. <br className="hidden sm:block" />
                  Built to endure. Engineered to lead.
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};