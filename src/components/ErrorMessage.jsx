import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';

export default function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FiAlertTriangle className="text-rose-500 w-12 h-12 mb-4" />
      <p className="text-gray-300 text-lg font-medium mb-2">Oops! An error occurred</p>
      <p className="text-gray-500 text-sm mb-6">{message}</p>
      <Button variant="secondary" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  );
}