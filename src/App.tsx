/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import LandingPage from './components/LandingPage';
import FindFoodPage from './components/FindFoodPage';
import DonateFoodPage from './components/DonateFoodPage';
import TrackingPage from './components/TrackingPage';
import BecomeVolunteerPage from './components/BecomeVolunteerPage';
import HowItWorksPage from './components/HowItWorksPage';
import AboutPage from './components/AboutPage';
import FoodSafetyPage from './components/FoodSafetyPage';
import ProfilePage from './components/ProfilePage';
import DonorDashboard from './components/dashboards/DonorDashboard';
import ReceiverDashboard from './components/dashboards/ReceiverDashboard';
import VolunteerDashboard from './components/dashboards/VolunteerDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import { N8nChatWidget } from './components/N8nChatWidget';

function MainContent() {
  const { activeTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        onOpenAuth={(mode) => { setAuthMode(mode); setShowAuthModal(true); }}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        showNotificationsModal={showNotificationsModal}
        onCloseNotifications={() => setShowNotificationsModal(false)}
        showAuthModal={showAuthModal}
        authMode={authMode}
        onCloseAuth={() => setShowAuthModal(false)}
      />

      <main className="flex-1">
        {activeTab === 'home' && <LandingPage />}
        {activeTab === 'find-food' && <FindFoodPage />}
        {activeTab === 'donate' && <DonateFoodPage />}
        {activeTab === 'track' && <TrackingPage />}
        {activeTab === 'volunteer' && <BecomeVolunteerPage />}
        {activeTab === 'how-it-works' && <HowItWorksPage />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'safety' && <FoodSafetyPage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'donor-dashboard' && <DonorDashboard />}
        {activeTab === 'receiver-dashboard' && <ReceiverDashboard />}
        {activeTab === 'volunteer-dashboard' && <VolunteerDashboard />}
        {activeTab === 'admin-dashboard' && <AdminDashboard />}
      </main>

      <Footer />
      <N8nChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
