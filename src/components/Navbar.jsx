import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-dark-700">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white">
          HA
        </NavLink>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <button
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}