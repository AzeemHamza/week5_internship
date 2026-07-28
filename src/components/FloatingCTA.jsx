import { useNavigate } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';

export default function FloatingCTA() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-32 right-6 z-[100] flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ pointerEvents: 'auto' }}
    >
      <FiMessageCircle size={20} />
      <span className="hidden sm:inline font-medium">Hire Me</span>
    </button>
  );
}