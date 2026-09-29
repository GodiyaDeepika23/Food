import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Star, MapPin, Mail, Phone, Award } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, setActiveTab } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif text-slate-900">Please Log In</h2>
        <p className="text-xs text-slate-500">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-10 text-white flex flex-col sm:flex-row items-center gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              {currentUser.role} {currentUser.donorType ? `· ${currentUser.donorType}` : ''}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif">{currentUser.name}</h1>
            <p className="text-emerald-100 text-xs flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-4 h-4" /> <span>{currentUser.city}</span>
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900">Account Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                <span className="font-semibold text-slate-800">{currentUser.email}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Mobile Number</span>
                <span className="font-semibold text-slate-800">{currentUser.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <button
              onClick={() => {
                if (currentUser.role === 'donor') setActiveTab('donor-dashboard');
                else if (currentUser.role === 'receiver') setActiveTab('receiver-dashboard');
                else if (currentUser.role === 'volunteer') setActiveTab('volunteer-dashboard');
                else if (currentUser.role === 'admin') setActiveTab('admin-dashboard');
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
