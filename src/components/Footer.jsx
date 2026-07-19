import { FiLinkedin, FiGithub } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Hamza Azeem</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Actively seeking internship opportunities in tech.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="/" className="hover:text-indigo-500 transition">Home</a></li>
            <li><a href="/projects" className="hover:text-indigo-500 transition">Projects</a></li>
            <li><a href="/contact" className="hover:text-indigo-500 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Connect</h3>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/hamza-azeem-298373404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:text-indigo-500 hover:bg-gray-200 dark:hover:bg-dark-700 transition"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href="https://github.com/AzeemHamza"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:text-indigo-500 hover:bg-gray-200 dark:hover:bg-dark-700 transition"
            >
              <FiGithub size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-dark-700 py-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Hamza Azeem. All rights reserved.
      </div>
    </footer>
  );
}