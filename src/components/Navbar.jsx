import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block md:inline-block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-dark-700/50'
    }`;

  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-dark-900/70 backdrop-blur-md border-b border-white/20 dark:border-dark-700/50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white z-50">
          HA
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/guestbook" className={linkClass}>GuestBook</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-2 p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-dark-700/50 transition-colors"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <kbd
            onClick={triggerCommandPalette}
            className="hidden sm:inline-flex items-center px-2 py-1 ml-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-700 transition"
          >
            ⌘K
          </kbd>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-dark-700/50 transition-colors"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-dark-700/50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-white/20 dark:border-dark-700/50">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={linkClass}>Home</NavLink>
          <NavLink to="/projects" onClick={() => setMenuOpen(false)} className={linkClass}>Projects</NavLink>
          <NavLink to="/guestbook" onClick={() => setMenuOpen(false)} className={linkClass}>GuestBook</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkClass}>Contact</NavLink>
        </div>
      )}
    </header>
  );
}