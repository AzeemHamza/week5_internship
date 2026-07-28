import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/SkipToContent';
import FloatingCTA from './components/FloatingCTA';
import CommandPalette from './components/CommandPalette';
import EasterEggs from './components/EasterEggs';
import { FiHome } from 'react-icons/fi';

export default function App() {
  const location = useLocation();

  return (
    <>
      <SkipToContent />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
              >
                <h1 className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">404</h1>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4 mb-2">Page not found</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">The page you're looking for doesn't exist or has been moved.</p>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">
                  <FiHome /> Back to Home
                </Link>
              </motion.div>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
      <FloatingCTA />
      <CommandPalette />
      <EasterEggs onTriggerSnake={() => window.dispatchEvent(new CustomEvent('openSnake'))} />
    </>
  );
}