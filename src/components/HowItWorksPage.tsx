import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Heart, Truck, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Complete Platform Flows</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">How ShareMeal Connects Communities</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From surplus preparation to shelter delivery, every step of the food rescue process is tracked transparently to ensure safety, efficiency, and zero food waste.
        </p>
      </div>

      {/* 3 Flows Grid */}
      <div className="space-y-16">
        
        {/* Donor Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">For Food Donors</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hotels, restaurants, colleges, canteens, and event organizers with extra wholesome food can post donations instantly.
            </p>
            <button
              onClick={() => setActiveTab('donate')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
            >
              <span>Post a Donation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-700 font-serif block mb-1">1</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Register</h4>
              <p className="text-[11px] text-slate-500">Create donor account.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-700 font-serif block mb-1">2</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Add Food</h4>
              <p className="text-[11px] text-slate-500">Enter food details & photo.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-700 font-serif block mb-1">3</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Pickup</h4>
              <p className="text-[11px] text-slate-500">Provide pickup address.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-700 font-serif block mb-1">4</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Track</h4>
              <p className="text-[11px] text-slate-500">Track donation status.</p>
            </div>
          </div>
        </div>

        {/* Receiver Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">For Receivers / NGOs</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Shelters, orphanages, and community organizations can browse verified surplus food donations and request what they need.
            </p>
            <button
              onClick={() => setActiveTab('find-food')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
            >
              <span>Find Available Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
              <span className="text-2xl font-bold text-blue-700 font-serif block mb-1">1</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Register</h4>
              <p className="text-[11px] text-slate-500">Create NGO account.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
              <span className="text-2xl font-bold text-blue-700 font-serif block mb-1">2</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Browse</h4>
              <p className="text-[11px] text-slate-500">Find nearby food.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
              <span className="text-2xl font-bold text-blue-700 font-serif block mb-1">3</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Request</h4>
              <p className="text-[11px] text-slate-500">Send food request.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
              <span className="text-2xl font-bold text-blue-700 font-serif block mb-1">4</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Confirm</h4>
              <p className="text-[11px] text-slate-500">Confirm delivery receipt.</p>
            </div>
          </div>
        </div>

        {/* Volunteer Flow */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">For Volunteers</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Volunteers view pickup and delivery tasks in their neighborhood, collect food from donors, and deliver it to receivers.
            </p>
            <button
              onClick={() => setActiveTab('volunteer')}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
            >
              <span>Become a Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
              <span className="text-2xl font-bold text-orange-700 font-serif block mb-1">1</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Register</h4>
              <p className="text-[11px] text-slate-500">Join volunteer network.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
              <span className="text-2xl font-bold text-orange-700 font-serif block mb-1">2</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Find Tasks</h4>
              <p className="text-[11px] text-slate-500">View pickup tasks.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
              <span className="text-2xl font-bold text-orange-700 font-serif block mb-1">3</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Collect</h4>
              <p className="text-[11px] text-slate-500">Collect from donor.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-2xl text-center border border-orange-100">
              <span className="text-2xl font-bold text-orange-700 font-serif block mb-1">4</span>
              <h4 className="text-xs font-bold text-slate-900 mb-1">Deliver</h4>
              <p className="text-[11px] text-slate-500">Deliver to shelter.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
