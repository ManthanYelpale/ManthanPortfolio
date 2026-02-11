import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ThemeProvider } from './contexts/ThemeContext';
import DynamicBackground from './components/DynamicBackground';
import GlobalNavigation from './components/GlobalNavigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import OpeningSequence from './components/OpeningSequence';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Video configuration with themes
const videoConfig = [
  {
    src: '/background_video.mp4',
    theme: {
      primary: '#06b6d4',      // cyan-500
      secondary: '#a855f7',    // purple-500  
      accent: '#22d3ee',       // cyan-400
      textGlow: 'rgba(34, 211, 238, 0.6)',
      name: 'cyan'
    }
  },
  {
    src: '/305660_small.mp4',
    theme: {
      primary: '#f59e0b',      // amber-500
      secondary: '#ec4899',    // pink-500
      accent: '#fbbf24',       // amber-400  
      textGlow: 'rgba(251, 191, 36, 0.6)',
      name: 'amber'
    }
  },
  {
    src: '/201254-915005916_medium.mp4',
    theme: {
      primary: '#10b981',      // emerald-500
      secondary: '#14b8a6',    // teal-500
      accent: '#34d399',       // emerald-400
      textGlow: 'rgba(52, 211, 153, 0.6)',
      name: 'emerald'
    }
  },
  {
    src: '/234735_medium.mp4',
    theme: {
      primary: '#8b5cf6',      // violet-500
      secondary: '#6366f1',    // indigo-500
      accent: '#a78bfa',       // violet-400
      textGlow: 'rgba(167, 139, 250, 0.6)',
      name: 'violet'
    }
  }
];

function App() {
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={containerRef} className="relative w-full bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden min-h-screen">
        {/* Dynamic Video Carousel Background - Always Visible */}
        <DynamicBackground videos={videoConfig} interval={20000} />

        <AnimatePresence mode="wait">
          {loading && <OpeningSequence onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Router>
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="relative z-10 w-full"
            >
              <GlobalNavigation />

              {/* Content Layer */}
              <main className="w-full">
                <AnimatedRoutes />

                {/* Footer */}
                <footer className="relative z-50 py-12 px-6 border-t-2 border-white/30 bg-white/5 backdrop-blur-lg">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                      {/* Name */}
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">Manthan Yelpale</h3>
                        <p className="text-sm text-white/80 mt-1">AI Intern</p>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-8">
                        <a href="#" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">Twitter</a>
                        <a href="https://github.com/ManthanYelpale" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/manthan-yelpale" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">LinkedIn</a>
                      </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-6 border-t border-white/20 text-center">
                      <p className="text-xs text-white/60">© 2026 Manthan Yelpale. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </main>
            </motion.div>

            {/* Global Grain Filter */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
