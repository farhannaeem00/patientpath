import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

export default function Register() {
  usePageTitle('Create Account');
  const [form, setForm]         = useState({
    name: '', email: '', password: '', role: 'nurse'
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { register }            = useAuth();
  const navigate                = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return toast.error('Please fill in all fields');
    if (form.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl bg-gray-800
    border border-gray-700 text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500
    focus:border-transparent transition placeholder-gray-500`;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center
                    justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Activity className="text-blue-400" size={28} />
            <span className="text-2xl font-bold text-white">PatientPath</span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">Create staff account</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Get Started</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input type="text" name="name" value={form.name}
                onChange={handleChange} placeholder="Dr. Ahmed Khan"
                className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@hospital.com"
                className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select name="role" value={form.role}
                onChange={handleChange}
                className={inputClass}>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="Min. 6 characters"
                  className={`${inputClass} pr-12`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl
                         font-semibold hover:bg-blue-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition mt-2">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login"
              className="text-blue-400 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}