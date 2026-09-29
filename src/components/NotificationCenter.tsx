import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, CheckCircle, Info, AlertTriangle, Check } from 'lucide-react';

interface NotificationCenterProps {
  onClose: () => void;
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { notifications, markNotificationAsRead, currentUser } = useApp();

  const userNotifs = currentUser
    ? notifications.filter(n => n.userId === currentUser.id)
    : notifications;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full h-[85vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {userNotifs.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          ) : (
            userNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  notif.read ? 'bg-white border-slate-200 opacity-80' : 'bg-emerald-50/75 border-emerald-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                    {notif.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
                    {notif.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
}
