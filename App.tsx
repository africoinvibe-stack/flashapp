import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AIP2PSection } from './components/AIP2PSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { Stats } from './components/Stats';
import { Narrative } from './components/Narrative';
import { AgentCTA } from './components/AgentCTA';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Onboarding } from './components/Onboarding';
import { MerchantOnboarding } from './components/MerchantOnboarding';
import { Dashboard } from './components/Dashboard';
import { MerchantDashboard } from './components/MerchantDashboard';
import { ChatWidget } from './components/ChatWidget';
import { MessageCircle, Play, Store, User } from 'lucide-react';

type ViewState = 'landing' | 'login' | 'signup' | 'onboarding' | 'merchant_onboarding' | 'dashboard' | 'merchant_dashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('landing');
  const [defaultAuthType, setDefaultAuthType] = useState<'personal' | 'business'>('personal');
  const [isLandingChatOpen, setIsLandingChatOpen] = useState(false);
  const [showDemoPicker, setShowDemoPicker] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleEnterUserDemo = () => {
    setView('dashboard');
    setShowDemoPicker(false);
  };

  const handleEnterMerchantDemo = () => {
    setView('merchant_dashboard');
    setShowDemoPicker(false);
  };

  const handleDemoEntry = (isMerchant: boolean) => {
    if (isMerchant) {
        setView('merchant_dashboard');
    } else {
        setView('dashboard');
    }
  };

  const handleBusinessEntry = () => {
      setDefaultAuthType('business');
      setView('signup');
  };

  const handlePersonalEntry = () => {
      setDefaultAuthType('personal');
      setView('signup');
  };

  const handleLoginEntry = () => {
      setDefaultAuthType('personal');
      setView('login');
  }

  const handleAuthSuccess = (isMerchant: boolean) => {
    if (isMerchant) {
        setView('merchant_onboarding');
    } else {
        setView('onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans selection:bg-brand-500/30 selection:text-brand-200">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {view === 'landing' && (
                <motion.div 
                    key="landing"
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                  <Navbar 
                    onLogin={handleLoginEntry} 
                    onSignUp={handlePersonalEntry} 
                    onDemo={() => setShowDemoPicker(true)}
                    onBusiness={handleBusinessEntry}
                  />
                  <main>
                    <Hero onSignUp={handlePersonalEntry} />
                    <Stats />
                    <Narrative />
                    <Features />
                    <AIP2PSection />
                    <HowItWorks />
                    <AgentCTA onSignUp={handlePersonalEntry} />
                    <AboutUs />
                    <ContactUs />
                    <Waitlist />
                  </main>
                  <Footer />

                  <AnimatePresence>
                    {showDemoPicker && (
                      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          onClick={() => setShowDemoPicker(false)}
                          className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div 
                          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                          className="bg-dark-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl"
                        >
                          <h3 className="text-3xl font-display font-bold text-center mb-8 italic">Choose Your <span className="gradient-text">Experience</span></h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button 
                              onClick={handleEnterUserDemo}
                              className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-400 hover:bg-brand-500/5 transition-all group"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                                <User size={32} />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg text-white">User Wallet</p>
                                <p className="text-xs text-slate-500">Spend & Manage Crypto</p>
                              </div>
                            </button>
                            <button 
                              onClick={handleEnterMerchantDemo}
                              className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-400 hover:bg-emerald-500/5 transition-all group"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                <Store size={32} />
                              </div>
                              <div className="text-center">
                                <p className="font-bold text-lg text-white">POS Terminal</p>
                                <p className="text-xs text-slate-500">Merchant Retail Tools</p>
                              </div>
                            </button>
                          </div>
                          <button 
                            onClick={() => setShowDemoPicker(false)}
                            className="w-full mt-8 py-3 text-slate-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                          >
                            Go Back
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="fixed bottom-6 left-6 z-40"
                  >
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDemoPicker(true)}
                        className="bg-brand-500 text-slate-950 px-6 py-4 rounded-full flex items-center gap-3 font-black shadow-[0_15px_30px_rgba(245,158,11,0.3)] group uppercase text-xs tracking-widest"
                    >
                        <Play size={16} className="fill-current" />
                        <span>Launch Live Demo</span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="fixed bottom-6 right-6 z-40"
                  >
                     <AnimatePresence>
                        {!isLandingChatOpen && (
                             <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLandingChatOpen(true)}
                                className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-white z-50 group"
                            >
                                <MessageCircle size={28} className="group-hover:text-brand-400 transition-colors" />
                            </motion.button>
                        )}
                     </AnimatePresence>
                  </motion.div>
                  <ChatWidget isOpen={isLandingChatOpen} onClose={() => setIsLandingChatOpen(false)} />
                </motion.div>
              )}

              {view === 'login' && (
                <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Login 
                    onBack={() => setView('landing')} 
                    onSignUp={() => setView('signup')}
                    onLoginSuccess={(isMerchant) => handleAuthSuccess(isMerchant)}
                    onDemo={(isMerchant) => handleDemoEntry(isMerchant)}
                    initialAccountType={defaultAuthType}
                  />
                </motion.div>
              )}

              {view === 'signup' && (
                <motion.div key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <SignUp 
                    onBack={() => setView('landing')} 
                    onLogin={() => setView('login')}
                    onRegisterSuccess={(isMerchant) => handleAuthSuccess(isMerchant)}
                    onDemo={(isMerchant) => handleDemoEntry(isMerchant)}
                    initialAccountType={defaultAuthType}
                  />
                </motion.div>
              )}

              {view === 'onboarding' && (
                <motion.div key="onboarding" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                    <Onboarding onComplete={() => setView('dashboard')} />
                </motion.div>
              )}

              {view === 'merchant_onboarding' && (
                <motion.div key="merchant_onboarding" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                    <MerchantOnboarding onComplete={() => setView('merchant_dashboard')} />
                </motion.div>
              )}

              {view === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Dashboard onLogout={() => setView('landing')} />
                </motion.div>
              )}

              {view === 'merchant_dashboard' && (
                <motion.div key="merchant_dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <MerchantDashboard onLogout={() => setView('landing')} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;