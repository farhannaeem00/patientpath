import { Link } from 'react-router-dom';
import {
  Activity, Users, Brain, Shield,
  ArrowRight, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6
                  hover:border-blue-500/50 transition">
    <div className="w-12 h-12 bg-blue-500/10 rounded-xl
                    flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function Landing() {
  usePageTitle('AI Hospital Triage System');

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-400" size={24} />
            <span className="text-xl font-bold">PatientPath</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-sm text-gray-400 hover:text-white transition">
              Sign In
            </Link>
            <Link to="/register"
              className="text-sm bg-blue-600 text-white px-4 py-2
                         rounded-lg hover:bg-blue-700 transition font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10
                        text-blue-400 text-sm font-medium px-4 py-2
                        rounded-full mb-6 border border-blue-500/20">
          <Brain size={14} /> AI-Powered Hospital Triage
        </div>

        <h1 className="text-6xl font-black leading-tight mb-6">
          Smarter ER Triage
          <span className="text-blue-400"> Saves Lives</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          AI instantly scores patient urgency, reorders the ER queue
          automatically, and alerts doctors for critical cases —
          so the right patients are seen first.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register"
            className="flex items-center gap-2 bg-blue-600 text-white
                       px-8 py-4 rounded-xl hover:bg-blue-700 transition
                       font-semibold text-lg shadow-lg shadow-blue-900/50">
            Start Free <ArrowRight size={20} />
          </Link>
          <Link to="/login"
            className="flex items-center gap-2 bg-gray-800 text-white
                       px-8 py-4 rounded-xl hover:bg-gray-700 transition
                       font-semibold text-lg border border-gray-700">
            Sign In
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {[
            'No credit card required',
            'Free to use',
            'AI-powered triage',
          ].map(item => (
            <div key={item}
              className="flex items-center gap-2 text-gray-500 text-sm">
              <CheckCircle size={14} className="text-green-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Urgency Levels */}
      <section className="border-y border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-gray-400 text-sm mb-6 uppercase
                        tracking-wide font-medium">
            AI Urgency Classification
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { level: 'Critical',    score: '75-100', color: 'bg-red-500/10 border-red-500/30 text-red-400' },
              { level: 'Urgent',      score: '50-74',  color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
              { level: 'Semi-Urgent', score: '25-49',  color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
              { level: 'Non-Urgent',  score: '0-24',   color: 'bg-green-500/10 border-green-500/30 text-green-400' },
            ].map(u => (
              <div key={u.level}
                className={`rounded-xl border p-4 text-center ${u.color}`}>
                <p className="font-bold text-sm">{u.level}</p>
                <p className="text-xs opacity-70 mt-1">Score: {u.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything Your ER Needs
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            PatientPath brings AI intelligence to emergency room triage
            so critical patients are never missed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Brain className="text-blue-400" size={24} />}
            title="AI Triage Scoring"
            description="Groq AI analyzes symptoms and vitals to score urgency from 0–100 instantly."
          />
          <FeatureCard
            icon={<Users className="text-purple-400" size={24} />}
            title="Smart Queue"
            description="ER queue auto-reorders by severity. Critical patients always move to top."
          />
          <FeatureCard
            icon={<AlertTriangle className="text-red-400" size={24} />}
            title="Critical Alerts"
            description="Instant alerts when a critical patient is registered or vitals worsen."
          />
          <FeatureCard
            icon={<Clock className="text-green-400" size={24} />}
            title="Real-Time Updates"
            description="Live queue updates as patients are triaged, treated, and discharged."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-900 border-y border-gray-800 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="flex flex-col gap-8">
            {[
              { n: '1', t: 'Patient Arrives', d: 'Staff registers patient with symptoms and vital signs on any device.' },
              { n: '2', t: 'AI Analyzes', d: 'Groq AI scores urgency 0-100 and classifies as Critical/Urgent/Semi/Non-urgent.' },
              { n: '3', t: 'Queue Updates', d: 'ER queue reorders automatically. Critical patients move to position 1.' },
              { n: '4', t: 'Doctor Treats', d: 'Doctor sees prioritized queue and treats highest urgency patients first.' },
            ].map(step => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full
                                flex items-center justify-center font-bold
                                text-sm shrink-0">
                  {step.n}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{step.t}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">
          Bring AI to Your Emergency Room
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Free to use. No setup fees. Start saving lives smarter today.
        </p>
        <Link to="/register"
          className="inline-flex items-center gap-2 bg-blue-600 text-white
                     px-10 py-4 rounded-xl hover:bg-blue-700 transition
                     font-semibold text-lg shadow-lg shadow-blue-900/50">
          Get Started Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center
                         text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="text-blue-400" size={18} />
          <span className="font-semibold text-gray-300">PatientPath</span>
        </div>
        <p>© {new Date().getFullYear()} PatientPath. AI-Powered Triage.</p>
      </footer>

    </div>
  );
}