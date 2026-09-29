import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Utensils, CheckCircle, Clock, X, Check, ArrowRight, Star, ShieldAlert } from 'lucide-react';
import RatingModal from '../RatingModal';
import ReportModal from '../ReportModal';

export default function DonorDashboard() {
  const { currentUser, donations, requests, respondToRequest, assignVolunteer, volunteers, setActiveTab } = useApp();

  const [ratingTarget, setRatingTarget] = useState<{ donationId: string; userId: string; userName: string } | null>(null);
  const [reportTarget, setReportTarget] = useState<any | null>(null);

  // Filter donations for current donor
  const myDonations = currentUser ? donations.filter(d => d.donorId === currentUser.id) : donations;

  // Incoming requests for this donor's donations
  const myDonationIds = myDonations.map(d => d.id);
  const incomingRequests = requests.filter(r => myDonationIds.includes(r.donationId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150'}
            alt="avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-bold">Donor Portal</div>
            <h1 className="text-2xl font-bold font-serif">{currentUser?.name || 'Grand Pavilion Hotel'}</h1>
            <p className="text-xs text-emerald-100">{currentUser?.donorType || 'Hotel'} · {currentUser?.city || 'Visakhapatnam'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('donate')}
            className="px-6 py-3 bg-white text-emerald-800 font-bold rounded-2xl shadow-md hover:bg-emerald-50 transition-colors text-xs flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Donate New Food</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-bold font-serif text-slate-900">{myDonations.length}</div>
          <div className="text-xs text-slate-500 font-medium">Total Donations Posted</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-bold font-serif text-emerald-600">{currentUser?.mealsContributed || 850}</div>
          <div className="text-xs text-slate-500 font-medium">Meals Contributed</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-2xl font-bold font-serif text-amber-500">⭐ {currentUser?.rating || 4.8}</div>
          <div className="text-xs text-slate-500 font-medium">Donor Rating ({currentUser?.reviewsCount || 15} reviews)</div>
        </div>
      </div>

      {/* Incoming Requests Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold font-serif text-slate-900">Incoming Food Requests</h3>
        
        {incomingRequests.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">No incoming requests at the moment.</p>
        ) : (
          <div className="space-y-4">
            {incomingRequests.map((req) => {
              const donation = donations.find(d => d.id === req.donationId);

              return (
                <div key={req.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{req.organizationName}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-[10px] font-bold">
                        Request for {req.donationId} ({donation?.foodName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Requested: <span className="font-semibold text-slate-800">{req.requestedQuantity} (~{req.servingsRequested} servings)</span> · Time: {req.preferredTime}
                    </p>
                    <p className="text-xs text-slate-500 italic">"{req.message}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => respondToRequest(req.id, true)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
                        >
                          <Check className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req.id, false)}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My Donations List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold font-serif text-slate-900">My Food Donations</h3>

        <div className="space-y-4">
          {myDonations.map((donation) => (
            <div key={donation.id} className="p-6 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white shadow-xs">
              <div className="flex items-center gap-4">
                <img src={donation.photoUrl} alt="food" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{donation.foodName}</h4>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-mono font-bold">
                      {donation.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {donation.quantity} · Serves ~{donation.servings} · Status: <span className="font-bold text-emerald-600">{donation.status}</span>
                  </p>
                  <span className="text-[10px] text-slate-400">Posted: {donation.createdAt}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {donation.status === 'Accepted' && !donation.assignedVolunteerId && (
                  <button
                    onClick={() => {
                      const vol = volunteers[0];
                      if (vol) {
                        assignVolunteer(donation.id, vol.userId, vol.name);
                      } else {
                        alert('No active volunteers available currently.');
                      }
                    }}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                  >
                    Assign Volunteer
                  </button>
                )}

                {donation.status === 'Completed' && (
                  <button
                    onClick={() => setRatingTarget({ donationId: donation.id, userId: donation.acceptedReceiverId || 'u-receiver-1', userName: donation.acceptedReceiverName || 'Receiver' })}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
                  >
                    <Star className="w-4 h-4 fill-white" /> Rate Receiver
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('track')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
                >
                  Track ID
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {ratingTarget && (
        <RatingModal
          donationId={ratingTarget.donationId}
          reviewedUserId={ratingTarget.userId}
          reviewedUserName={ratingTarget.userName}
          onClose={() => setRatingTarget(null)}
        />
      )}

    </div>
  );
}
