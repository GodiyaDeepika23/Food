import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Heart, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">About ShareMeal</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">Sharing Food, Eradicating Hunger</h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ShareMeal was founded as a community-driven college initiative to bridge the gap between surplus food and food insecurity. We harness technology to make food rescue fast, safe, and transparent.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <h3 className="text-xl font-bold font-serif text-slate-900">Our Mission</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every day, tons of wholesome food from hotels, weddings, college canteens, and restaurants goes to waste while thousands in our cities sleep hungry. ShareMeal provides an intuitive digital marketplace where donors can list surplus food in minutes, NGOs can request what they need, and volunteers can coordinate safe, rapid delivery.
        </p>

        <h3 className="text-xl font-bold font-serif text-slate-900 pt-4">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <h4 className="text-sm font-bold text-emerald-900 mb-1">Zero Waste</h4>
            <p className="text-xs text-slate-600">Diverting surplus nutritious food from landfills to plates.</p>
          </div>
          <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="text-sm font-bold text-blue-900 mb-1">Community Trust</h4>
            <p className="text-xs text-slate-600">Verifying all partner NGOs, volunteers, and donors rigorously.</p>
          </div>
          <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
            <h4 className="text-sm font-bold text-orange-900 mb-1">Radical Transparency</h4>
            <p className="text-xs text-slate-600">Tracking every donation ID from posting to final delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
