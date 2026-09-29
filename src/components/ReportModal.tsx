import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldAlert } from 'lucide-react';

interface ReportModalProps {
  targetType: 'donation' | 'user';
  targetId: string;
  targetTitle: string;
  onClose: () => void;
}

export default function ReportModal({ targetType, targetId, targetTitle, onClose }: ReportModalProps) {
  const { submitReport } = useApp();
  const [reason, setReason] = useState<string>('Unsafe food');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(targetType, targetId, targetTitle, reason, description);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2 text-rose-600">
          <ShieldAlert className="w-6 h-6" />
          <h3 className="text-xl font-bold font-serif text-slate-900">Report {targetType === 'donation' ? 'Donation' : 'User'}</h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">Report: <span className="font-semibold text-slate-700">{targetTitle}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reason for Report</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Unsafe food">Unsafe or Spoiled Food</option>
              <option value="Incorrect information">Incorrect Information</option>
              <option value="Suspicious activity">Suspicious Activity</option>
              <option value="Harassment">Harassment or Inappropriate Behavior</option>
              <option value="Other">Other Issues</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            Submit Report to Admin
          </button>
        </form>
      </div>
    </div>
  );
}
