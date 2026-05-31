import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity, ArrowLeft, RefreshCw,
  AlertTriangle, AlertCircle,
  CheckCircle, Clock, User
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const urgencyConfig = {
  critical: {
    bg:    'border-red-500/30 bg-red-500/5',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    icon:  <AlertTriangle className="text-red-400" size={16} />,
  },
  urgent: {
    bg:    'border-orange-500/30 bg-orange-500/5',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    icon:  <AlertTriangle className="text-orange-400" size={16} />,
  },
  'semi-urgent': {
    bg:    'border-yellow-500/30 bg-yellow-500/5',
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    icon:  <AlertCircle className="text-yellow-400" size={16} />,
  },
  'non-urgent': {
    bg:    'border-green-500/30 bg-green-500/5',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    icon:  <CheckCircle className="text-green-400" size={16} />,
  },
};

export default function Queue() {
  usePageTitle('ER Queue');
  const [patients, setPatients] = useState([]);
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');
  const navigate                = useNavigate();

  useEffect(() => { fetchQueue(); }, []);

  const fetchQueue = async () => {
    try {
      const { data } = await api.get('/patients/');
      setPatients(data.data);
      setStats(data.stats);
    } catch {
      toast.error('Failed to load queue');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/patients/${id}/status`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchQueue();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = filter === 'all'
    ? patients
    : patients.filter(p => p.urgency_level === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-400" size={22} />
            <span className="text-xl font-bold">PatientPath</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchQueue}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-white transition">
              <RefreshCw size={16} /> Refresh
            </button>
            <Link to="/dashboard"
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-white transition">
              <ArrowLeft size={16} /> Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header + Stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">ER Queue</h1>
            <p className="text-gray-400 text-sm mt-1">
              Sorted by AI urgency score
            </p>
          </div>
          {stats && (
            <div className="flex items-center gap-3">
              <span className="bg-red-500/10 text-red-400 border
                               border-red-500/20 px-3 py-1 rounded-full
                               text-xs font-bold">
                {stats.critical} Critical
              </span>
              <span className="bg-blue-500/10 text-blue-400 border
                               border-blue-500/20 px-3 py-1 rounded-full
                               text-xs font-bold">
                {stats.total_waiting} Waiting
              </span>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800
                        rounded-xl p-1 mb-6 w-fit">
          {['all', 'critical', 'urgent', 'semi-urgent', 'non-urgent'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                          transition capitalize
                ${filter === f
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Queue List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500
                            border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl border border-gray-800
                          p-16 text-center">
            <Clock size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500">No patients in queue</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(patient => {
              const cfg = urgencyConfig[patient.urgency_level]
                || urgencyConfig['non-urgent'];
              return (
                <div key={patient.id}
                  className={`rounded-2xl border p-5 ${cfg.bg}`}>
                  <div className="flex items-center justify-between
                                  gap-4 flex-wrap">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-800 rounded-full
                                      flex items-center justify-center
                                      font-bold text-white text-sm">
                        {patient.queue_position}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {cfg.icon}
                          <p className="font-semibold text-white">
                            {patient.name}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full
                                            border font-semibold capitalize
                                            ${cfg.badge}`}>
                            {patient.urgency_level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {patient.age}y · {patient.gender} ·{' '}
                          {patient.chief_complaint}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-2xl font-black text-white">
                        {patient.urgency_score}
                      </span>

                      <select
                        value={patient.status}
                        onChange={(e) =>
                          handleStatusChange(patient.id, e.target.value)
                        }
                        className="bg-gray-800 border border-gray-700
                                   text-white text-xs rounded-lg px-3 py-2
                                   focus:outline-none focus:ring-2
                                   focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="waiting">Waiting</option>
                        <option value="in-treatment">In Treatment</option>
                        <option value="discharged">Discharged</option>
                      </select>

                      <button
                        onClick={() => navigate(`/patient/${patient.id}`)}
                        className="text-blue-400 text-sm hover:underline">
                        Details →
                      </button>
                    </div>
                  </div>

                  {patient.ai_assessment && (
                    <p className="text-xs text-gray-400 mt-3 pl-14">
                      🤖 {patient.ai_assessment}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}