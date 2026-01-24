import React from 'react';

const stats = [
  { value: "60s", label: "Wallet to Card" },
  { value: "$500k", label: "Monthly Limit" },
  { value: "1.5%", label: "Conversion Fee" },
  { value: "0%", label: "Flash Transfer Fee" },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-default">
              <div className="font-display font-bold text-4xl sm:text-5xl text-white mb-2 group-hover:text-brand-400 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};