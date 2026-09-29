import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Clock, Users, ShieldAlert, CheckCircle, ArrowRight, X, Filter, Utensils } from 'lucide-react';
import ReportModal from './ReportModal';

export default function FindFoodPage() {
  const { donations, requestFood, currentUser, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'servings'>('recent');

  // Request modal state
  const [requestModalDonation, setRequestModalDonation] = useState<any | null>(null);
  const [servingsReq, setServingsReq] = useState<number>(10);
  const [preferredTime, setPreferredTime] = useState<string>('18:00 - 19:00');
  const [message, setMessage] = useState<string>('');

  // Report modal state
  const [reportTarget, setReportTarget] = useState<any | null>(null);

  const categories = ['All', 'Cooked food', 'Packaged food', 'Bakery', 'Fruits', 'Vegetables', 'Dairy', 'Other'];

  const filteredDonations = donations.filter(d => {
    // Only show Posted or Requested food in marketplace
    if (d.status !== 'Posted' && d.status !== 'Requested') return false;

    const matchesSearch = d.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.donorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesVeg = vegFilter === 'all' || (vegFilter === 'veg' ? d.isVeg : !d.isVeg);

    return matchesSearch && matchesCat && matchesVeg;
  }).sort((a, b) => {
    if (sortBy === 'servings') return b.servings - a.servings;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const receiverId = currentUser ? currentUser.id : 'u-receiver-1';
    
    requestFood(
      requestModalDonation.id,
      requestModalDonation.quantity,
      servingsReq,
      preferredTime,
      message
    );
    setRequestModalDonation(null);
    alert('Food request sent successfully to the donor!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold font-serif mb-2">Available Food Marketplace</h1>
        <p className="text-emerald-100 text-sm max-w-2xl">
          Browse surplus food donations from hotels, restaurants, and canteens in your area. Approximate locations are shown for privacy until requests are accepted.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by food name, city, area or donor..."
              className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-2xl shadow-md focus:outline-none text-sm font-medium"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-white text-slate-800 rounded-2xl shadow-md text-sm font-semibold focus:outline-none"
          >
            <option value="recent">Recently Added First</option>
            <option value="servings">Largest Servings First</option>
          </select>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-4">
        {/* Category Pills (Interactive Filter Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Veg / Non-Veg filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Diet:
          </span>
          <button
            onClick={() => setVegFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-lg ${vegFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            All Types
          </button>
          <button
            onClick={() => setVegFilter('veg')}
            className={`px-3 py-1 text-xs font-medium rounded-lg ${vegFilter === 'veg' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            🟢 Vegetarian Only
          </button>
          <button
            onClick={() => setVegFilter('non-veg')}
            className={`px-3 py-1 text-xs font-medium rounded-lg ${vegFilter === 'non-veg' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            🔴 Non-Vegetarian
          </button>
        </div>
      </div>

      {/* Donations Grid */}
      {filteredDonations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Utensils className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-800">No Food Donations Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or filters, or check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-all group"
            >
              {/* Photo & Status Badge */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={donation.photoUrl}
                  alt={donation.foodName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    donation.isVeg ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {donation.isVeg ? '🟢 Pure Veg' : '🔴 Non-Veg'}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-xs text-slate-800 rounded-full text-xs font-bold">
                    {donation.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white rounded-full text-xs font-bold">
                    ID: {donation.id}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold font-serif text-slate-900">{donation.foodName}</h3>
                    <button
                      onClick={() => setReportTarget(donation)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Report donation"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {donation.description}
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-600 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Serves: ~{donation.servings} people</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{donation.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Best before: {donation.bestBefore}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium">
                    By <span className="font-bold text-slate-800">{donation.donorName}</span> ({donation.donorType})
                  </div>
                  <button
                    onClick={() => {
                      setRequestModalDonation(donation);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>Request Food</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Food Modal */}
      {requestModalDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setRequestModalDonation(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">Request Food Donation</h3>
            <p className="text-xs text-slate-500 mb-4">Donation ID: <span className="font-bold text-slate-800">{requestModalDonation.id}</span> ({requestModalDonation.foodName})</p>

            <form onSubmit={handleSendRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Required Quantity / Servings</label>
                <input
                  type="number"
                  min={1}
                  max={requestModalDonation.servings}
                  required
                  value={servingsReq}
                  onChange={(e) => setServingsReq(Number(e.target.value))}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Maximum available servings: ~{requestModalDonation.servings} people</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Pickup / Delivery Time</label>
                <input
                  type="text"
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Message for Donor</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify vehicle details or shelter requirements..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
              >
                Send Request to Donor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportTarget && (
        <ReportModal
          targetType="donation"
          targetId={reportTarget.id}
          targetTitle={reportTarget.foodName}
          onClose={() => setReportTarget(null)}
        />
      )}

    </div>
  );
}
