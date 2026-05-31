import { Link } from 'react-router-dom';
import { Activity, Home } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('404 - Not Found');
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-400" size={22} />
          <span className="text-xl font-bold">PatientPath</span>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-[120px] font-black text-gray-800 leading-none">
            404
          </p>
          <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
          <p className="text-gray-400 text-sm mb-8">
            The page you are looking for does not exist.
          </p>
          <Link to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white
                       px-6 py-3 rounded-xl hover:bg-blue-700 transition
                       font-medium text-sm">
            <Home size={16} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}