import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
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
import { Dashboard } from './components/Dashboard';
import { ChatWidget } from './components/ChatWidget';
import { MessageCircle, Play } from 'lucide-react';

type ViewState = 'landing' | 'login' | 'signup' | 'onboarding' | 'dashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<ViewState>('landing');
  const [isLandingChatOpen, setIsLandingChatOpen] = useState(false);

  useEffect(() => {
    // Display splash screen for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleEnterDemo = () => {
    setView('dashboard');
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
                    onLogin={() => setView('login')} 
                    onSignUp={() => setView('signup')} 
                    onDemo={handleEnterDemo}
                  />
                  <main>
                    <Hero onSignUp={() => setView('signup')} />
                    <Stats />
                    <Narrative />
                    <Features />
                    <HowItWorks />
                    <AgentCTA onSignUp={() => setView('signup')} />
                    <AboutUs />
                    <ContactUs />
                    <Waitlist />
                  </main>
                  <Footer />
                  
                  {/* Persistent Floating Demo Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                    className="fixed bottom-6 left-6 z-40"
                  >
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEnterDemo}
                        className="bg-dark-900/80 backdrop-blur-md border border-brand-500/30 px-5 py-3 rounded-full flex items-center gap-3 text-brand-400 font-bold shadow-xl hover:border-brand-500/60 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-slate-900 transition-colors">
                            <Play size={16} className="fill-current ml-0.5" />
                        </div>
                        <span className="hidden sm:inline">Try Live Demo</span>
                    </motion.button>
                  </motion.div>

                  {/* Landing Page Chat Floating Button */}
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
                                className="w-14 h-14 bg-brand-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center text-slate-900 z-50 group"
                            >
                                <MessageCircle size={28} className="group-hover:text-white transition-colors" />
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-dark-900 animate-pulse"></span>
                            </motion.button>
                        )}
                     </AnimatePresence>
                  </motion.div>
                  
                  <ChatWidget isOpen={isLandingChatOpen} onClose={() => setIsLandingChatOpen(false)} />
                </motion.div>
              )}

              {view === 'login' && (
                <motion.div 
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                  <Login 
                    onBack={() => setView('landing')} 
                    onSignUp={() => setView('signup')}
                    onLoginSuccess={() => setView('dashboard')}
                  />
                </motion.div>
              )}

              {view === 'signup' && (
                <motion.div 
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                  <SignUp 
                    onBack={() => setView('landing')} 
                    onLogin={() => setView('login')}
                    onRegisterSuccess={() => setView('onboarding')}
                    onDemo={handleEnterDemo}
                  />
                </motion.div>
              )}

              {view === 'onboarding' && (
                <motion.div
                    key="onboarding"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <Onboarding onComplete={() => setView('dashboard')} />
                </motion.div>
              )}

              {view === 'dashboard' && (
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Dashboard onLogout={() => setView('landing')} />
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