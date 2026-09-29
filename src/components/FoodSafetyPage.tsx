import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, CheckCircle, Utensils } from 'lucide-react';

export default function FoodSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">Food Safety & Compliance Guidelines</h1>
        </div>
        <p className="text-emerald-100 text-sm max-w-2xl">
          At ShareMeal, health and safety are paramount. Donors, receivers, and volunteers must strictly adhere to our food handling and safety standards.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6 text-sm text-slate-700 leading-relaxed">
        <h3 className="text-lg font-bold font-serif text-slate-900">1. Donor Responsibilities</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Accurate Information:</strong> Donors must accurately declare the preparation time, storage conditions, and best-before consumption time.</li>
          <li><strong>Safe Storage:</strong> Food must be stored at safe temperatures (hot food kept above 60°C or refrigerated below 5°C) prior to pickup.</li>
          <li><strong>Packaging Condition:</strong> All food items must be packed in clean, food-grade, sealed containers to prevent spillage or airborne contamination.</li>
          <li><strong>Prohibition of Spoiled Food:</strong> Donors are strictly prohibited from knowingly listing expired, spoiled, or contaminated food.</li>
        </ul>

        <h3 className="text-lg font-bold font-serif text-slate-900 pt-4">2. Volunteer Transport Standards</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Volunteers must ensure containers are kept upright and protected from direct sunlight or dust during transport.</li>
          <li>Transport time must be minimized to ensure perishable food reaches receivers within the safe consumption window.</li>
        </ul>

        <h3 className="text-lg font-bold font-serif text-slate-900 pt-4">3. Receiver & NGO Verification</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Receiving shelters must inspect food temperature, packaging seal, and aroma upon delivery before distributing to residents.</li>
        </ul>

        <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-800 flex items-start gap-3 mt-6">
          <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">Disclaimer</span>
            ShareMeal operates as a community connection and rescue platform. While we enforce rigorous safety confirmations, the platform does not independently guarantee the chemical or biological safety of donated food; responsibility for accurate food information and appropriate handling remains with the respective donors and receivers.
          </div>
        </div>
      </div>

    </div>
  );
}
