import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { ThemeProvider } from './contexts/ThemeContext';
import DynamicBackground from './components/DynamicBackground';
import GlobalNavigation from './components/GlobalNavigation';
import OpeningSequence from './components/OpeningSequence';

// Lazy load pages for code splitting (reduces initial bundle by ~40%)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Resume = lazy(() => import('./pages/Resume'));

// Lightweight loading spinner (CSS only, no JS overhead)
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loading-spinner" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
        </Routes>
      </Suspense>
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
    src: '/videos/cyan.webm',
    theme: {
      primary: '#06b6d4',
      secondary: '#a855f7',
      accent: '#22d3ee',
      textGlow: 'rgba(34, 211, 238, 0.6)',
      name: 'cyan'
    }
  },
  {
    src: '/videos/violet.webm',
    theme: {
      primary: '#8b5cf6',
      secondary: '#6366f1',
      accent: '#a78bfa',
      textGlow: 'rgba(167, 139, 250, 0.6)',
      name: 'violet'
    }
  }
];

function App() {
  const containerRef = useRef();
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  // Optimized Lenis with visibility detection
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Pause Lenis when tab is hidden (saves CPU/battery)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      } else {
        if (!rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(raf);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={containerRef} className="relative w-full bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden min-h-screen">
        <DynamicBackground videos={videoConfig} interval={20000} />

        <AnimatePresence mode="wait">
          {loading && <OpeningSequence onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Router>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="relative z-10 w-full"
            >
              <GlobalNavigation />

              <main className="w-full">
                <AnimatedRoutes />

                <footer className="relative z-50 py-12 px-6 border-t-2 border-white/30 bg-white/5 backdrop-blur-lg">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">Manthan Yelpale</h3>
                        <p className="text-sm text-white/80 mt-1">AI Intern</p>
                      </div>

                      <div className="flex gap-8">
                        <a href="#" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">Twitter</a>
                        <a href="https://github.com/ManthanYelpale" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">GitHub</a>
                        <a href="https://www.linkedin.com/in/manthan-yelpale" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wider font-bold text-white hover:text-white/60 transition-colors">LinkedIn</a>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20 text-center">
                      <p className="text-xs text-white/60">© 2026 Manthan Yelpale. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </main>
            </motion.div>

            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </Router>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

