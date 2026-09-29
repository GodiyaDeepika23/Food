import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Heart, ShieldAlert, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">ShareMeal</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ShareMeal is a community food donation and rescue platform connecting surplus food with NGOs, shelters, and volunteers to reduce food waste and feed hope.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active in Visakhapatnam & Surrounding Communities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => setActiveTab('find-food')} className="hover:text-emerald-400 transition-colors">Find Available Food</button></li>
              <li><button onClick={() => setActiveTab('donate')} className="hover:text-emerald-400 transition-colors">Donate Surplus Food</button></li>
              <li><button onClick={() => setActiveTab('volunteer')} className="hover:text-emerald-400 transition-colors">Become a Volunteer</button></li>
              <li><button onClick={() => setActiveTab('track')} className="hover:text-emerald-400 transition-colors">Track Donation ID</button></li>
            </ul>
          </div>

          {/* Resources & Safety */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('how-it-works')} className="hover:text-emerald-400 transition-colors">How It Works</button></li>
              <li><button onClick={() => setActiveTab('safety')} className="hover:text-emerald-400 transition-colors">Food Safety Guidelines</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">About Our Mission</button></li>
              <li><button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">Admin Portal</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support & Help</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@sharemeal.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+91 1800-SHARE-MEAL</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Visakhapatnam, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ShareMeal Platform. Built with care for a zero-hunger community.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('safety')} className="hover:text-slate-300 transition-colors">Privacy & Safety</button>
            <button onClick={() => setActiveTab('how-it-works')} className="hover:text-slate-300 transition-colors">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
