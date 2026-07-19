import { FiFolder } from 'react-icons/fi';

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <FiFolder className="text-gray-600 text-4xl mb-3" />
      <p className="text-gray-500 text-lg">{message || 'No data found.'}</p>
    </div>
  );
}