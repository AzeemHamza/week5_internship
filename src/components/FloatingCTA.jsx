import { FiMessageCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function FloatingCTA() {
  return (
    <Link
      to="/contact"
      className="fixed bottom-24 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 hover:scale-105"
    >
      <FiMessageCircle size={20} />
      <span className="hidden sm:inline font-medium">Hire Me</span>
    </Link>
  );
}