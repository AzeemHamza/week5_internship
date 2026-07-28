import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import { FiSearch } from 'react-icons/fi';

const actions = [
  { label: 'Go to Home', shortcut: 'g h', action: 'navigate', target: '/' },
  { label: 'Go to Projects', shortcut: 'g p', action: 'navigate', target: '/projects' },
  { label: 'Go to Contact', shortcut: 'g c', action: 'navigate', target: '/contact' },
  { label: 'Toggle Dark/Light Mode', shortcut: 't', action: 'toggleTheme' },
  { label: 'Download Resume', shortcut: 'd r', action: 'downloadResume' },
  { label: 'Open GitHub', shortcut: 'o g', action: 'external', url: 'https://github.com/AzeemHamza' },
  { label: 'Open LinkedIn', shortcut: 'o l', action: 'external', url: 'https://www.linkedin.com/in/hamza-azeem-298373404' },
  { label: 'Run Terminal', shortcut: '> _', action: 'focusTerminal' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === 'Escape' && open)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  const filteredActions = query
    ? actions.filter(
        (a) =>
          a.label.toLowerCase().includes(query.toLowerCase()) ||
          (a.shortcut && a.shortcut.includes(query))
      )
    : actions;

  const execute = (action) => {
    setOpen(false);
    switch (action.action) {
      case 'navigate':
        navigate(action.target);
        break;
      case 'toggleTheme':
        toggleTheme();
        break;
      case 'downloadResume':
        window.open('/resume.pdf', '_blank');
        break;
      case 'external':
        window.open(action.url, '_blank');
        break;
      case 'focusTerminal':
        setTimeout(() => {
          const termInput = document.querySelector('#terminal-input');
          if (termInput) termInput.focus();
        }, 100);
        break;
      default:
        break;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-white/80 dark:bg-dark-800/90 backdrop-blur-xl border border-white/20 dark:border-dark-700/50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-gray-200 dark:border-dark-700 flex items-center gap-3">
              <FiSearch className="text-gray-400" size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => execute(action)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <span className="text-gray-800 dark:text-gray-200">{action.label}</span>
                  {action.shortcut && (
                    <kbd className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-dark-600 px-2 py-0.5 rounded">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
              {filteredActions.length === 0 && (
                <div className="p-4 text-gray-500 text-sm text-center">No results.</div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-700 text-xs text-gray-400 flex justify-between">
              <span>Type to filter</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}