import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const config = {
  critical: {
    bg:   'bg-red-500/10 text-red-400 border-red-500/20',
    icon: <AlertTriangle size={12} />,
  },
  urgent: {
    bg:   'bg-orange-500/10 text-orange-400 border-orange-500/20',
    icon: <AlertTriangle size={12} />,
  },
  'semi-urgent': {
    bg:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    icon: <AlertCircle size={12} />,
  },
  'non-urgent': {
    bg:   'bg-green-500/10 text-green-400 border-green-500/20',
    icon: <CheckCircle size={12} />,
  },
};

export default function UrgencyBadge({ level, score }) {
  const cfg = config[level] || config['non-urgent'];

  return (
    <span className={`flex items-center gap-1 text-xs font-bold
                      px-2.5 py-1 rounded-full border capitalize
                      ${cfg.bg}`}>
      {cfg.icon}
      {level}
      {score !== undefined && ` · ${score}`}
    </span>
  );
}