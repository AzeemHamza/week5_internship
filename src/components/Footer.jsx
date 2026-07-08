import { FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Your Name. CODIORA Week 4.</p>
        <p className="flex items-center gap-1">
          Built with <FiHeart className="text-rose-500" /> using React & Tailwind
        </p>
      </div>
    </footer>
  );
}