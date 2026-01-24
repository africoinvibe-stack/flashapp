import React, { useState } from 'react';
import { Button } from './ui/Button';
import { ArrowRight, Mail } from 'lucide-react';

export const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Added ${email} to the waitlist!`);
    setEmail('');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-600/10 blur-[100px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">
          Ready to Unchain Your Assets?
        </h2>
        <p className="text-xl text-slate-300 mb-10">
          Join 50,000+ others who are already spending their crypto freely. 
          Get early access to our premium metal cards.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-white/10 rounded-full leading-5 bg-white/5 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              placeholder="Enter your email address"
            />
          </div>
          <Button type="submit" variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Join Waitlist
          </Button>
        </form>
        
        <p className="mt-4 text-sm text-slate-500">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};