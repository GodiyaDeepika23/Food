import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, DonorSubType } from '../types';
import { Utensils, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowRight, Sparkles, X } from 'lucide-react';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  onClose: () => void;
}

export default function AuthModal({ initialMode, onClose }: AuthModalProps) {
  const { login, signup, users, setActiveTab } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [error, setError] = useState('');

  // Signup state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('donor');
  const [donorType, setDonorType] = useState<DonorSubType>('Restaurant');
  const [city, setCity] = useState('Visakhapatnam');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(loginEmail);
    if (success) {
      onClose();
      // Navigate to appropriate dashboard
      const user = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
      if (user) {
        if (user.role === 'donor') setActiveTab('donor-dashboard');
        else if (user.role === 'receiver') setActiveTab('receiver-dashboard');
        else if (user.role === 'volunteer') setActiveTab('volunteer-dashboard');
        else if (user.role === 'admin') setActiveTab('admin-dashboard');
        else setActiveTab('profile');
      }
    } else {
      setError('Email not found in demo accounts. Try one of the quick demo buttons below!');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in required fields.');
      return;
    }
    const newUser = signup({
      name,
      email,
      phone: phone || '+91 9876543210',
      role,
      donorType: role === 'donor' ? donorType : undefined,
      city,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`
    });

    onClose();
    if (newUser.role === 'donor') setActiveTab('donor-dashboard');
    else if (newUser.role === 'receiver') setActiveTab('receiver-dashboard');
    else if (newUser.role === 'volunteer') setActiveTab('volunteer-dashboard');
    else setActiveTab('profile');
  };

  const fillDemo = (demoEmail: string) => {
    setLoginEmail(demoEmail);
    const success = login(demoEmail);
    if (success) {
      onClose();
      const user = users.find(u => u.email.toLowerCase() === demoEmail.toLowerCase());
      if (user) {
        if (user.role === 'donor') setActiveTab('donor-dashboard');
        else if (user.role === 'receiver') setActiveTab('receiver-dashboard');
        else if (user.role === 'volunteer') setActiveTab('volunteer-dashboard');
        else if (user.role === 'admin') setActiveTab('admin-dashboard');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-serif">Welcome to ShareMeal</h3>
          </div>
          <p className="text-emerald-100 text-xs">
            {mode === 'login' ? 'Sign in to access your dashboard and manage donations.' : 'Create an account to start sharing or rescuing surplus food.'}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. donor@hotel.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    defaultValue="demopassword"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Logins */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Instant Demo Logins (Click to test):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemo('donor@hotel.com')}
                    className="p-2 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-medium text-left border border-emerald-200 transition-colors"
                  >
                    🏨 Hotel Donor
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('receiver@hope.org')}
                    className="p-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-medium text-left border border-blue-200 transition-colors"
                  >
                    🏢 NGO Receiver
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('volunteer@sharemeal.org')}
                    className="p-2 text-xs bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-lg font-medium text-left border border-orange-200 transition-colors"
                  >
                    🛵 Volunteer
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('admin@sharemeal.org')}
                    className="p-2 text-xs bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg font-medium text-left border border-purple-200 transition-colors"
                  >
                    🛡️ Admin Portal
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Organization Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sunshine Bakery / John Doe"
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">I want to join as</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="donor">Donor (Have Surplus Food)</option>
                    <option value="receiver">Receiver / NGO (Need Food)</option>
                    <option value="volunteer">Volunteer (Deliver Food)</option>
                  </select>
                </div>

                {role === 'donor' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Donor Type</label>
                    <select
                      value={donorType}
                      onChange={(e) => setDonorType(e.target.value as DonorSubType)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Hotel">Hotel</option>
                      <option value="College">College</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Event Organizer">Event Organizer</option>
                      <option value="Shop">Shop / Grocery</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
