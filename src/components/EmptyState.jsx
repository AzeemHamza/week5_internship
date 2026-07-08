import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ message = 'No data to display.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FiInbox className="text-gray-600 w-12 h-12 mb-4" />
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  );
}