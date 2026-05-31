import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity, Users, AlertTriangle,
  Clock, LogOut, Plus, Menu, X,
  TrendingUp, CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const urgencyColors = {
  critical:    'bg-red-500/10 text-red-400 border-red-500/20',
  urgent:      'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'semi-urgent': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'non-urgent':  'bg-green-500/10 text-green-400 border-green-500/20',
};

export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, logout }    = useAuth();
  const [stats, setStats]   = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate                = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/patients/');
      setPatients(data.data.slice(0, 5));
      setStats(data.stats);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-400" size={22} />
            <span className="text-xl font-bold">PatientPath</span>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm text-gray-400">
              <span className="font-semibold text-white">{user?.name}</span>
              {' '}· {user?.role}
            </span>
            <Link to="/intake"
              className="flex items-center gap-2 bg-blue-600 text-white
                         px-4 py-2 rounded-lg hover:bg-blue-700 transition
                         font-medium text-sm">
              <Plus size={16} /> New Patient
            </Link>
            <Link to="/queue"
              className="text-sm text-gray-400 hover:text-white transition">
              Queue
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-red-400 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-gray-400 hover:text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-800
                          flex flex-col gap-3">
            <Link to="/intake" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-blue-600 text-white
                         px-4 py-2 rounded-lg text-sm font-medium w-fit">
              <Plus size={16} /> New Patient
            </Link>
            <Link to="/queue" onClick={() => setMenuOpen(false)}
              className="text-sm text-gray-400 hover:text-white w-fit">
              View Queue
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-red-400 w-fit">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">ER Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Real-time emergency room overview
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-900 rounded-2xl border border-gray-800
                            p-5 text-center">
              <p className="text-3xl font-black text-blue-400">
                {stats.total_waiting}
              </p>
              <p className="text-gray-400 text-xs mt-1">Waiting</p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-red-500/20
                            p-5 text-center">
              <p className="text-3xl font-black text-red-400">
                {stats.critical}
              </p>
              <p className="text-gray-400 text-xs mt-1">Critical</p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-orange-500/20
                            p-5 text-center">
              <p className="text-3xl font-black text-orange-400">
                {stats.urgent}
              </p>
              <p className="text-gray-400 text-xs mt-1">Urgent</p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800
                            p-5 text-center">
              <p className="text-3xl font-black text-purple-400">
                {stats.in_treatment}
              </p>
              <p className="text-gray-400 text-xs mt-1">In Treatment</p>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800
                            p-5 text-center">
              <p className="text-3xl font-black text-green-400">
                {stats.discharged_today}
              </p>
              <p className="text-gray-400 text-xs mt-1">Discharged</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/intake"
            className="bg-blue-600 hover:bg-blue-700 transition rounded-2xl
                       p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl
                            flex items-center justify-center">
              <Plus className="text-white" size={24} />
            </div>
            <div>
              <p className="font-bold text-white">Register Patient</p>
              <p className="text-blue-200 text-sm">New intake form</p>
            </div>
          </Link>

          <Link to="/queue"
            className="bg-gray-900 hover:bg-gray-800 transition
                       border border-gray-800 rounded-2xl
                       p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl
                            flex items-center justify-center">
              <Users className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="font-bold text-white">View Queue</p>
              <p className="text-gray-400 text-sm">ER patient queue</p>
            </div>
          </Link>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl
                          p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl
                            flex items-center justify-center">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <div>
              <p className="font-bold text-white">Avg Wait Time</p>
              <p className="text-gray-400 text-sm">~45 minutes today</p>
            </div>
          </div>
        </div>

        {/* Critical Patients */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white flex items-center gap-2">
              <AlertTriangle className="text-red-400" size={18} />
              Top Priority Patients
            </h2>
            <Link to="/queue"
              className="text-sm text-blue-400 hover:underline">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-4 border-blue-500
                              border-t-transparent rounded-full animate-spin" />
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle size={36}
                className="mx-auto text-green-500/30 mb-3" />
              <p className="text-gray-500 text-sm">No patients in queue</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {patients.map(patient => (
                <div key={patient.id}
                  onClick={() => navigate(`/patient/${patient.id}`)}
                  className="flex items-center justify-between p-4
                             bg-gray-800 rounded-xl cursor-pointer
                             hover:bg-gray-700 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full
                                    flex items-center justify-center text-sm
                                    font-bold text-blue-400">
                      {patient.queue_position}
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">
                        {patient.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {patient.age}y · {patient.chief_complaint}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1
                                      rounded-full border capitalize
                                      ${urgencyColors[patient.urgency_level]
                                        || urgencyColors['non-urgent']}`}>
                      {patient.urgency_level}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {patient.urgency_score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}