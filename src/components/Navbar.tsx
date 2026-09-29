import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Heart, Search, PlusCircle, Bell, User as UserIcon, Shield, Menu, X, LogOut, Truck } from 'lucide-react';
import AuthModal from './AuthModal';
import NotificationCenter from './NotificationCenter';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenNotifications: () => void;
  showNotificationsModal: boolean;
  onCloseNotifications: () => void;
  showAuthModal: boolean;
  authMode: 'login' | 'signup';
  onCloseAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenNotifications,
  showNotificationsModal,
  onCloseNotifications,
  showAuthModal,
  authMode,
  onCloseAuth
}) => {
  const { currentUser, logout, activeTab, setActiveTab, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && (!currentUser || n.userId === currentUser.id)).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'find-food', label: 'Find Food' },
    { id: 'donate', label: 'Donate Food' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'track', label: 'Track ID' },
    { id: 'safety', label: 'Food Safety' },
    { id: 'about', label: 'About' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand title */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">ShareMeal</span>
              <span className="block text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Share Food. Share Hope.</span>
            </div>
          </button>

          {/* Zone 2: 4-6 nav links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors hover:text-emerald-600 whitespace-nowrap ${
                  activeTab === link.id ? 'text-emerald-600 font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary actions & User profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('donate')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Donate Food</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (currentUser.role === 'donor') setActiveTab('donor-dashboard');
                    else if (currentUser.role === 'receiver') setActiveTab('receiver-dashboard');
                    else if (currentUser.role === 'volunteer') setActiveTab('volunteer-dashboard');
                    else if (currentUser.role === 'admin') setActiveTab('admin-dashboard');
                    else setActiveTab('profile');
                  }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-300"
                  />
                  <div className="hidden md:block">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[100px]">{currentUser.name}</div>
                    <div className="text-[10px] text-emerald-700 capitalize font-medium">{currentUser.role}</div>
                  </div>
                </button>

                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-emerald-600 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('donate');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Donate Food
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <Utensils className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('find-food')}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${activeTab === 'find-food' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <Search className="w-5 h-5" />
          <span>Find Food</span>
        </button>

        <button
          onClick={() => setActiveTab('donate')}
          className="flex flex-col items-center -mt-6 text-white group"
        >
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/40 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-emerald-700 mt-1">Donate</span>
        </button>

        <button
          onClick={onOpenNotifications}
          className={`relative flex flex-col items-center gap-1 text-[11px] font-medium ${showNotificationsModal ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <Bell className="w-5 h-5" />
          <span>Alerts</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            if (currentUser) {
              if (currentUser.role === 'donor') setActiveTab('donor-dashboard');
              else if (currentUser.role === 'receiver') setActiveTab('receiver-dashboard');
              else if (currentUser.role === 'volunteer') setActiveTab('volunteer-dashboard');
              else if (currentUser.role === 'admin') setActiveTab('admin-dashboard');
              else setActiveTab('profile');
            } else {
              onOpenAuth('login');
            }
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-medium ${activeTab.includes('dashboard') || activeTab === 'profile' ? 'text-emerald-600' : 'text-slate-500'}`}
        >
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal initialMode={authMode} onClose={onCloseAuth} />
      )}

      {showNotificationsModal && (
        <NotificationCenter onClose={onCloseNotifications} />
      )}
    </>
  );
};
