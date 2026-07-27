import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-dark-700/50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-dark-900/70 backdrop-blur-md border-b border-white/20 dark:border-dark-700/50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          HA
        </NavLink>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-2 p-2 rounded-lg text-gray-700 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-dark-700/50 transition-colors"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}