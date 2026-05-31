import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Activity, ArrowLeft, AlertTriangle,
  AlertCircle, CheckCircle, User,
  Thermometer, Heart, Wind, RefreshCw
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const urgencyColors = {
  critical:      'text-red-400',
  urgent:        'text-orange-400',
  'semi-urgent': 'text-yellow-400',
  'non-urgent':  'text-green-400',
};

const urgencyBg = {
  critical:      'bg-red-500/10 border-red-500/20 text-red-400',
  urgent:        'bg-orange-500/10 border-orange-500/20 text-orange-400',
  'semi-urgent': 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  'non-urgent':  'bg-green-500/10 border-green-500/20 text-green-400',
};

export default function Patient() {
  usePageTitle('Patient Detail');
  const { id }                  = useParams();
  const [patient, setPatient]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate                = useNavigate();

  useEffect(() => { fetchPatient(); }, [id]);

  const fetchPatient = async () => {
    try {
      const { data } = await api.get(`/patients/${id}`);
      setPatient(data.data);
    } catch {
      toast.error('Patient not found');
      navigate('/queue');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await api.put(`/patients/${id}/status`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchPatient();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500
                      border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!patient) return null;

  const scoreColor = urgencyColors[patient.urgency_level] || 'text-gray-400';

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-400" size={22} />
            <span className="text-xl font-bold">PatientPath</span>
          </div>
          <Link to="/queue"
            className="flex items-center gap-2 text-sm text-gray-400
                       hover:text-white transition">
            <ArrowLeft size={16} /> Queue
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl
                            flex items-center justify-center">
              <User className="text-blue-400" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{patient.name}</h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {patient.age} years · {patient.gender} ·
                Queue #{patient.queue_position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={patient.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="bg-gray-800 border border-gray-700 text-white
                         text-sm rounded-xl px-4 py-2 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="waiting">Waiting</option>
              <option value="in-treatment">In Treatment</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* AI Triage Result */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2">
              🤖 AI Triage Result
            </h2>

            <div className="flex items-center gap-4 mb-4">
              {/* Score Ring */}
              <div className="relative flex items-center
                              justify-center shrink-0">
                <svg width="80" height="80" className="-rotate-90">
                  <circle cx="40" cy="40" r="32"
                    fill="none" stroke="#1f2937" strokeWidth="6" />
                  <circle cx="40" cy="40" r="32"
                    fill="none"
                    stroke={
                      patient.urgency_score >= 75 ? '#ef4444' :
                      patient.urgency_score >= 50 ? '#f97316' :
                      patient.urgency_score >= 25 ? '#eab308' :
                      '#22c55e'
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 *
                      (1 - patient.urgency_score / 100)}`}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-lg font-black ${scoreColor}`}>
                    {patient.urgency_score}
                  </span>
                </div>
              </div>

              <div>
                <span className={`inline-block text-sm font-bold px-3 py-1
                                  rounded-full border capitalize mb-1
                                  ${urgencyBg[patient.urgency_level]
                                    || urgencyBg['non-urgent']}`}>
                  {patient.urgency_level}
                </span>
                <p className="text-xs text-gray-400">
                  Status: <span className="text-white capitalize">
                    {patient.status}
                  </span>
                </p>
              </div>
            </div>

            {patient.ai_assessment && (
              <div className="bg-gray-800 rounded-xl p-3 mb-3">
                <p className="text-xs text-gray-400 font-medium mb-1">
                  ASSESSMENT
                </p>
                <p className="text-sm text-gray-300">
                  {patient.ai_assessment}
                </p>
              </div>
            )}

            {patient.recommended_action && (
              <div className="bg-blue-500/5 border border-blue-500/20
                              rounded-xl p-3">
                <p className="text-xs text-blue-400 font-medium mb-1">
                  RECOMMENDED ACTION
                </p>
                <p className="text-sm text-gray-300">
                  {patient.recommended_action}
                </p>
              </div>
            )}
          </div>

          {/* Patient Info */}
          <div className="flex flex-col gap-4">

            {/* Chief Complaint + Symptoms */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h2 className="font-bold text-white mb-3">
                Chief Complaint
              </h2>
              <p className="text-blue-400 font-medium">
                {patient.chief_complaint}
              </p>

              {patient.symptoms?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-2">SYMPTOMS</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.symptoms.map((s, i) => (
                      <span key={i}
                        className="bg-gray-800 text-gray-300 text-xs
                                   px-2 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Vitals */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <h2 className="font-bold text-white mb-3">Vital Signs</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="text-red-400" size={14} />
                    <p className="text-xs text-gray-400">Blood Pressure</p>
                  </div>
                  <p className="font-bold text-white text-sm">
                    {patient.vitals?.blood_pressure || 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="text-blue-400" size={14} />
                    <p className="text-xs text-gray-400">Pulse</p>
                  </div>
                  <p className="font-bold text-white text-sm">
                    {patient.vitals?.pulse
                      ? `${patient.vitals.pulse} bpm`
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="text-orange-400" size={14} />
                    <p className="text-xs text-gray-400">Temperature</p>
                  </div>
                  <p className="font-bold text-white text-sm">
                    {patient.vitals?.temperature
                      ? `${patient.vitals.temperature}°F`
                      : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className="text-green-400" size={14} />
                    <p className="text-xs text-gray-400">O2 Saturation</p>
                  </div>
                  <p className="font-bold text-white text-sm">
                    {patient.vitals?.oxygen_saturation
                      ? `${patient.vitals.oxygen_saturation}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}