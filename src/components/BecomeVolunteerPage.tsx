import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, CheckCircle, ShieldCheck, ArrowRight, User as UserIcon, Phone, Mail, MapPin } from 'lucide-react';

export default function BecomeVolunteerPage() {
  const { currentUser, registerAsVolunteer, setActiveTab } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [city, setCity] = useState(currentUser?.city || 'Visakhapatnam');
  const [serviceArea, setServiceArea] = useState('MVP Colony, Beach Road');
  const [availableDays, setAvailableDays] = useState('Mon, Tue, Wed, Thu, Fri, Sat, Sun');
  const [availableTime, setAvailableTime] = useState('16:00 - 21:00');
  const [vehicleType, setVehicleType] = useState('Two-Wheeler (Motorcycle)');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in or sign up first to register as a volunteer.');
      return;
    }

    registerAsVolunteer({
      userId: currentUser.id,
      name,
      email,
      phone,
      city,
      serviceArea,
      availableDays,
      availableTime,
      vehicleType
    });

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <Truck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-slate-900">Welcome to the Volunteer Team!</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your volunteer registration has been successfully verified. You can now view and accept pickup delivery tasks from your volunteer dashboard.
        </p>
        <button
          onClick={() => setActiveTab('volunteer-dashboard')}
          className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
        >
          Open Volunteer Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        <div className="bg-orange-600 px-8 py-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-serif">Become a ShareMeal Volunteer</h1>
          </div>
          <p className="text-orange-100 text-xs">
            Help transport surplus food safely from donors to NGOs and shelters. Your time makes a direct impact in ending hunger.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Service Area *</label>
            <input
              type="text"
              required
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="e.g. MVP Colony, Beach Road, Maddilapalem"
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Available Days *</label>
              <input
                type="text"
                required
                value={availableDays}
                onChange={(e) => setAvailableDays(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Available Time Window *</label>
              <input
                type="text"
                required
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Availability *</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Two-Wheeler (Motorcycle/Scooter)">Two-Wheeler (Motorcycle / Scooter)</option>
              <option value="Bicycle">Bicycle</option>
              <option value="Car / Four-Wheeler">Car / Four-Wheeler</option>
              <option value="Walking">Walking</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>Register as Volunteer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}
