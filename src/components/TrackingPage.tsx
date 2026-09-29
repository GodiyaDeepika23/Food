import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, CheckCircle, Clock, Truck, Utensils, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TrackingPage() {
  const { donations, setActiveTab } = useApp();
  const [searchId, setSearchId] = useState('');
  const [queriedId, setQueriedId] = useState('SM10245'); // default sample

  const donation = donations.find(d => d.id.toLowerCase() === queriedId.toLowerCase().trim());

  const statuses = [
    { key: 'Posted', label: 'Posted', desc: 'Donation listed on marketplace' },
    { key: 'Requested', label: 'Requested', desc: 'Receiver/NGO sent food request' },
    { key: 'Accepted', label: 'Accepted', desc: 'Donor accepted request' },
    { key: 'Volunteer Assigned', label: 'Volunteer Assigned', desc: 'Volunteer assigned for transport' },
    { key: 'Picked Up', label: 'Picked Up', desc: 'Volunteer collected food from donor' },
    { key: 'Delivered', label: 'Delivered', desc: 'Food delivered to receiver destination' },
    { key: 'Completed', label: 'Completed', desc: 'Delivery confirmed & feedback submitted' },
  ];

  const getStatusIndex = (currentStatus: string) => {
    return statuses.findIndex(s => s.key === currentStatus);
  };

  const currentIndex = donation ? getStatusIndex(donation.status) : -1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      setQueriedId(searchId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl text-center space-y-4">
        <h1 className="text-3xl font-bold font-serif">Donation Tracking</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Enter any valid Donation ID (e.g., SM10245, SM10246) to track real-time pickup and delivery progress.
        </p>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            required
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Donation ID (e.g. SM10245)..."
            className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-2xl border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {/* Result Section */}
      {donation ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-serif text-slate-900">{donation.foodName}</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold font-mono">
                  {donation.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Donor: <span className="font-semibold text-slate-700">{donation.donorName}</span> ({donation.donorType}) · {donation.quantity} (~{donation.servings} servings)
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
              <span className="inline-block px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold mt-1">
                {donation.status}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {statuses.map((step, idx) => {
              const isCompleted = idx <= currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={step.key} className="flex items-start gap-4 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-colors ${
                    isCompleted ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>

                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    isCurrent ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' : 'bg-white border-slate-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </h4>
                      {isCompleted && (
                        <span className="text-[10px] text-emerald-700 font-medium">Completed</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t flex justify-between items-center text-xs text-slate-500">
            <span>Posted on: {donation.createdAt}</span>
            <button
              onClick={() => setActiveTab('find-food')}
              className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Browse more donations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-800">Donation ID Not Found</h3>
          <p className="text-xs text-slate-500 mt-1">Please check the ID (e.g. SM10245) and try again.</p>
        </div>
      )}

    </div>
  );
}
