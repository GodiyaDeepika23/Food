import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Utensils, CheckCircle, Clock, Search, ArrowRight, Star, ShieldAlert } from 'lucide-react';
import RatingModal from '../RatingModal';

export default function ReceiverDashboard() {
  const { currentUser, requests, donations, confirmDelivery, setActiveTab } = useApp();
  const [ratingTarget, setRatingTarget] = useState<{ donationId: string; userId: string; userName: string } | null>(null);

  const myRequests = currentUser ? requests.filter(r => r.receiverId === currentUser.id) : requests;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150'}
            alt="avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-200 font-bold">Receiver / NGO Portal</div>
            <h1 className="text-2xl font-bold font-serif">{currentUser?.name || 'Hope Foundation Shelter'}</h1>
            <p className="text-xs text-blue-100">{currentUser?.city || 'Visakhapatnam'} · Verified Organization</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('find-food')}
          className="px-6 py-3 bg-white text-blue-800 font-bold rounded-2xl shadow-md hover:bg-blue-50 transition-colors text-xs flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Browse Available Food</span>
        </button>
      </div>

      {/* My Food Requests */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold font-serif text-slate-900">My Food Requests & Deliveries</h3>

        {myRequests.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">You have not requested any donations yet.</p>
        ) : (
          <div className="space-y-4">
            {myRequests.map((req) => {
              const donation = donations.find(d => d.id === req.donationId);

              return (
                <div key={req.id} className="p-6 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">{donation?.foodName || 'Food Donation'}</h4>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-mono font-bold">
                        {req.donationId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Requested Quantity: <span className="font-semibold text-slate-800">{req.requestedQuantity}</span> · Status: <span className="font-bold text-blue-600">{donation?.status || req.status}</span>
                    </p>
                    <span className="text-[10px] text-slate-400">Request Date: {req.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {donation?.status === 'Delivered' && (
                      <button
                        onClick={() => confirmDelivery(donation.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                      >
                        Confirm Delivery Receipt
                      </button>
                    )}

                    {donation?.status === 'Completed' && (
                      <button
                        onClick={() => setRatingTarget({ donationId: donation.id, userId: donation.donorId, userName: donation.donorName })}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
                      >
                        <Star className="w-4 h-4 fill-white" /> Rate Donor
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
              );
            })}
          </div>
        )}
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
