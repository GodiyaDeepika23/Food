import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Users, Utensils, CheckCircle, ShieldAlert, Trash2, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  const { users, donations, requests, reports, resolveReport, stats } = useApp();
  const [activeTabSub, setActiveTabSub] = useState<'overview' | 'users' | 'donations' | 'reports'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-md">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-purple-400 font-bold">Admin Portal</div>
            <h1 className="text-2xl font-bold font-serif">Platform Moderation & Control Center</h1>
            <p className="text-xs text-slate-400">Manage users, monitor food rescue statistics, and review reported accounts.</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs max-w-md">
        <button
          onClick={() => setActiveTabSub('overview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${activeTabSub === 'overview' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTabSub('users')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${activeTabSub === 'users' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTabSub('donations')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${activeTabSub === 'donations' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Donations ({donations.length})
        </button>
        <button
          onClick={() => setActiveTabSub('reports')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${activeTabSub === 'reports' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Reports ({reports.filter(r => r.status === 'Pending').length})
        </button>
      </div>

      {activeTabSub === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold font-serif text-slate-900">{users.length}</div>
              <div className="text-xs text-slate-500 font-medium">Total Users</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold font-serif text-emerald-600">{donations.length}</div>
              <div className="text-xs text-slate-500 font-medium">Total Donations</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold font-serif text-blue-600">{stats.mealsDonated}</div>
              <div className="text-xs text-slate-500 font-medium">Meals Shared</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold font-serif text-rose-600">{reports.filter(r => r.status === 'Pending').length}</div>
              <div className="text-xs text-slate-500 font-medium">Pending Reports</div>
            </div>
          </div>
        </div>
      )}

      {activeTabSub === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900">Registered Users</h3>
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{u.name}</h4>
                    <p className="text-xs text-slate-500">{u.email} · <span className="uppercase font-semibold text-emerald-700">{u.role}</span></p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTabSub === 'donations' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900">All Platform Donations</h3>
          <div className="space-y-3">
            {donations.map(d => (
              <div key={d.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{d.foodName} <span className="font-mono text-emerald-700">({d.id})</span></h4>
                  <p className="text-xs text-slate-500">Donor: {d.donorName} · Status: <span className="font-bold text-slate-800">{d.status}</span></p>
                </div>
                <span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold">
                  {d.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTabSub === 'reports' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900">Reported Content & Users</h3>
          {reports.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No reports submitted.</p>
          ) : (
            <div className="space-y-4">
              {reports.map(rep => (
                <div key={rep.id} className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-rose-900">Reason: {rep.reason}</span>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md text-[10px] font-bold uppercase">
                        {rep.targetType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">Target: <span className="font-semibold">{rep.targetTitle}</span> ({rep.targetId})</p>
                    <p className="text-xs text-slate-600 italic">"{rep.description}"</p>
                    <span className="text-[10px] text-slate-400">Reported by: {rep.reporterName} on {rep.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => resolveReport(rep.id, 'resolve')}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold"
                        >
                          Take Action
                        </button>
                        <button
                          onClick={() => resolveReport(rep.id, 'dismiss')}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
                        >
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">
                        {rep.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
