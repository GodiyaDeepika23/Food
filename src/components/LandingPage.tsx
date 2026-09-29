import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Heart, Search, PlusCircle, ShieldCheck, Truck, Users, ArrowRight, Award, Recycle } from 'lucide-react';

export default function LandingPage() {
  const { setActiveTab, stats } = useApp();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Zero Hunger & Food Waste Reduction Initiative</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-slate-900 tracking-tight leading-[1.1]">
                Share Food. <span className="text-emerald-600">Share Hope.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect surplus food from hotels, restaurants, canteens, and events with people who need it. Together, we can eliminate hunger and reduce food waste in our community.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('donate')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-sm"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Donate Food Now</span>
                </button>

                <button
                  onClick={() => setActiveTab('find-food')}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-sm"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Available Food</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <div className="text-xl font-bold font-serif text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Verified NGOs</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-slate-900">Zero</div>
                  <div className="text-xs text-slate-500 font-medium">Platform Fees</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-slate-900">Real-Time</div>
                  <div className="text-xs text-slate-500 font-medium">Pickup Tracking</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl opacity-20 blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800"
                  alt="Community food sharing"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[420px]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Heart className="w-5 h-5 fill-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Meals Distributed</div>
                    <div className="text-sm font-serif font-bold text-emerald-600">14,250+ Portions</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl text-white p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Our Live Impact</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">Making a Real Difference Together</h2>
            </div>
            <div className="text-xs text-slate-400 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              ℹ️ Sample demo statistics updated in real-time upon completed deliveries.
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-emerald-600/20 text-emerald-400 rounded-xl flex items-center justify-center">
                🍱
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mb-1 tabular-nums">{stats.mealsDonated.toLocaleString()}</div>
              <div className="text-xs text-slate-400 font-medium">Meals Donated</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
                👥
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mb-1 tabular-nums">{stats.peopleServed.toLocaleString()}</div>
              <div className="text-xs text-slate-400 font-medium">People Served</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-orange-600/20 text-orange-400 rounded-xl flex items-center justify-center">
                🤝
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mb-1 tabular-nums">{stats.activeVolunteers}</div>
              <div className="text-xs text-slate-400 font-medium">Active Volunteers</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl text-center">
              <div className="w-10 h-10 mx-auto mb-3 bg-purple-600/20 text-purple-400 rounded-xl flex items-center justify-center">
                🏢
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mb-1 tabular-nums">{stats.partnerOrganizations}</div>
              <div className="text-xs text-slate-400 font-medium">Partner Organizations</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 p-6 rounded-2xl text-center col-span-2 lg:col-span-1">
              <div className="w-10 h-10 mx-auto mb-3 bg-teal-600/20 text-teal-400 rounded-xl flex items-center justify-center">
                ♻️
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-white mb-1 tabular-nums">{stats.foodSavedKg.toLocaleString()} kg</div>
              <div className="text-xs text-slate-400 font-medium">Food Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">Simple 3-Way Flow</span>
          <h2 className="text-3xl font-bold font-serif text-slate-900 mt-1">How ShareMeal Works</h2>
          <p className="text-sm text-slate-600 mt-2">Whether you have extra food, run a shelter, or want to volunteer, getting started takes less than a minute.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Donor Flow */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 relative group hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              01
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">For Donors</h3>
            <p className="text-xs text-emerald-700 font-semibold mb-4">Hotels, Restaurants, Canteens & Individuals</p>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Register account & select donor type.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Post food details, servings & pickup time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Accept receiver request & track delivery.</span>
              </li>
            </ol>
            <button
              onClick={() => setActiveTab('donate')}
              className="mt-8 w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Start Donating</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Receiver Flow */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 relative group hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              02
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">For Receivers / NGOs</h3>
            <p className="text-xs text-blue-700 font-semibold mb-4">Shelters, Community Groups & Orphanages</p>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Browse nearby available food donations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Send food request with required servings.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Receive food & confirm safe delivery.</span>
              </li>
            </ol>
            <button
              onClick={() => setActiveTab('find-food')}
              className="mt-8 w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Browse Food Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Volunteer Flow */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 relative group hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              03
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">For Volunteers</h3>
            <p className="text-xs text-orange-700 font-semibold mb-4">Community Champions & Delivery Helpers</p>
            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Register as a volunteer in your area.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Accept available food pickup & delivery tasks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Transport food safely from donor to receiver.</span>
              </li>
            </ol>
            <button
              onClick={() => setActiveTab('volunteer')}
              className="mt-8 w-full py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>Become a Volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Call to action banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif">Have surplus food from an event or restaurant today?</h2>
            <p className="text-emerald-100 text-sm sm:text-base">
              Don't let good food go to waste. Post your donation in under 2 minutes and let our network of volunteers deliver it to those in need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('donate')}
                className="px-8 py-3.5 bg-white text-emerald-800 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors text-sm"
              >
                Donate Food Now
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className="px-8 py-3.5 bg-emerald-800/60 hover:bg-emerald-800 text-white font-bold rounded-xl border border-emerald-500/40 transition-colors text-sm"
              >
                Track Donation ID
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
