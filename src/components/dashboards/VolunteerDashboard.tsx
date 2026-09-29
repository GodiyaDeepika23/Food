import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, CheckCircle, Clock, MapPin, ArrowRight, Star } from 'lucide-react';
import RatingModal from '../RatingModal';

export default function VolunteerDashboard() {
  const { currentUser, deliveries, updateDeliveryStatus, donations, assignVolunteer, volunteers } = useApp();

  const [ratingTarget, setRatingTarget] = useState<{ donationId: string; userId: string; userName: string } | null>(null);

  // Available tasks or assigned tasks
  const myDeliveries = currentUser ? deliveries.filter(d => d.volunteerId === currentUser.id || d.status === 'Assigned') : deliveries;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'}
            alt="avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-200 font-bold">Volunteer Portal</div>
            <h1 className="text-2xl font-bold font-serif">{currentUser?.name || 'Rahul Sharma'}</h1>
            <p className="text-xs text-orange-100">Verified Volunteer · Visakhapatnam Area</p>
          </div>
        </div>
      </div>

      {/* Delivery Tasks List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <h3 className="text-lg font-bold font-serif text-slate-900">Delivery Tasks & Assignments</h3>

        {deliveries.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">No active delivery tasks available.</p>
        ) : (
          <div className="space-y-4">
            {deliveries.map((del) => {
              const donation = donations.find(d => d.id === del.donationId);

              return (
                <div key={del.id} className="p-6 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">{donation?.foodName || 'Food Delivery Task'}</h4>
                      <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded-full text-[10px] font-mono font-bold">
                        {del.donationId}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>Pickup: {del.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>Delivery: {del.deliveryLocation}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Quantity: <span className="font-semibold text-slate-800">{del.quantity}</span> · Status: <span className="font-bold text-orange-600">{del.status}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {del.status === 'Assigned' && (
                      <button
                        onClick={() => updateDeliveryStatus(del.id, 'Picked Up')}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                      >
                        Mark Picked Up
                      </button>
                    )}

                    {del.status === 'Picked Up' && (
                      <button
                        onClick={() => updateDeliveryStatus(del.id, 'Delivered')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                      >
                        Mark Delivered
                      </button>
                    )}

                    {del.status === 'Completed' && (
                      <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                        Delivered & Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
