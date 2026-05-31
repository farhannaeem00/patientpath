import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, Plus, X } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const COMMON_SYMPTOMS = [
  'Chest pain', 'Shortness of breath', 'Fever', 'Headache',
  'Nausea', 'Vomiting', 'Dizziness', 'Abdominal pain',
  'Back pain', 'Sweating', 'Fatigue', 'Confusion',
  'Bleeding', 'Swelling', 'Rash', 'Cough',
];

export default function Intake() {
  usePageTitle('New Patient Intake');
  const [form, setForm] = useState({
    name:            '',
    age:             '',
    gender:          'male',
    chief_complaint: '',
    symptoms:        [],
    vitals: {
      blood_pressure:    '',
      pulse:             '',
      temperature:       '',
      oxygen_saturation: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleVitalChange = (e) =>
    setForm({
      ...form,
      vitals: { ...form.vitals, [e.target.name]: e.target.value }
    });

  const toggleSymptom = (symptom) => {
    setForm(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.chief_complaint)
      return toast.error('Please fill required fields');

    setLoading(true);
    try {
      const payload = {
        ...form,
        age: parseInt(form.age),
      };
      const { data } = await api.post('/patients/', payload);
      toast.success('Patient registered! AI triaging...');
      navigate(`/patient/${data.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to register patient');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl bg-gray-800
    border border-gray-700 text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition placeholder-gray-500`;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-400" size={22} />
            <span className="text-xl font-bold">PatientPath</span>
          </div>
          <Link to="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400
                       hover:text-white transition">
            <ArrowLeft size={16} /> Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Patient Intake Form</h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill in patient details. AI will score urgency automatically.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Basic Info */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="font-bold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-xs text-gray-400 mb-1 block">
                  Full Name *
                </label>
                <input name="name" value={form.name}
                  onChange={handleChange} placeholder="Patient name"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Age *
                </label>
                <input name="age" type="number" value={form.age}
                  onChange={handleChange} placeholder="25"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Gender
                </label>
                <select name="gender" value={form.gender}
                  onChange={handleChange} className={inputClass}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-gray-400 mb-1 block">
                Chief Complaint *
              </label>
              <input name="chief_complaint" value={form.chief_complaint}
                onChange={handleChange}
                placeholder="Main reason for ER visit (e.g. chest pain)"
                className={inputClass} />
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="font-bold text-white mb-4">
              Symptoms
              <span className="text-gray-400 text-sm font-normal ml-2">
                (select all that apply)
              </span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition
                    ${form.symptoms.includes(symptom)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                >
                  {symptom}
                </button>
              ))}
            </div>

            {form.symptoms.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.symptoms.map(s => (
                  <span key={s}
                    className="flex items-center gap-1 bg-blue-500/10
                               text-blue-400 text-xs px-2 py-1 rounded-full">
                    {s}
                    <button type="button" onClick={() => toggleSymptom(s)}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Vitals */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h2 className="font-bold text-white mb-4">Vital Signs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Blood Pressure
                </label>
                <input name="blood_pressure"
                  value={form.vitals.blood_pressure}
                  onChange={handleVitalChange}
                  placeholder="120/80"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Pulse (bpm)
                </label>
                <input name="pulse"
                  value={form.vitals.pulse}
                  onChange={handleVitalChange}
                  placeholder="72"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Temperature (°F)
                </label>
                <input name="temperature"
                  value={form.vitals.temperature}
                  onChange={handleVitalChange}
                  placeholder="98.6"
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  O2 Saturation (%)
                </label>
                <input name="oxygen_saturation"
                  value={form.vitals.oxygen_saturation}
                  onChange={handleVitalChange}
                  placeholder="98"
                  className={inputClass} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl
                       font-semibold hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition text-base flex items-center
                       justify-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white
                                border-t-transparent rounded-full animate-spin" />
                Registering + AI Triaging...
              </>
            ) : (
              <>
                <Plus size={20} /> Register Patient
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}