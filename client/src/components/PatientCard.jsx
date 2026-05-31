import { useNavigate } from 'react-router-dom';
import UrgencyBadge from './UrgencyBadge';
import { User } from 'lucide-react';

export default function PatientCard({ patient, onStatusChange }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/patient/${patient.id}`)}
      className="bg-gray-900 rounded-2xl border border-gray-800 p-5
                 hover:border-blue-500/50 cursor-pointer transition"
    >
      <div className="flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-blue-500/10 rounded-full
                          flex items-center justify-center shrink-0">
            <User className="text-blue-400" size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-white truncate">
              {patient.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {patient.age}y · {patient.chief_complaint}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          <UrgencyBadge
            level={patient.urgency_level}
            score={patient.urgency_score}
          />
        </div>

      </div>

      {patient.ai_assessment && (
        <p className="text-xs text-gray-500 mt-3 truncate">
          🤖 {patient.ai_assessment}
        </p>
      )}
    </div>
  );
}