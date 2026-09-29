import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, MessageSquare } from 'lucide-react';

interface RatingModalProps {
  donationId: string;
  reviewedUserId: string;
  reviewedUserName: string;
  onClose: () => void;
}

export default function RatingModal({ donationId, reviewedUserId, reviewedUserName, onClose }: RatingModalProps) {
  const { submitReview } = useApp();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(donationId, reviewedUserId, rating, comment);
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

        <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">Rate Experience</h3>
        <p className="text-xs text-slate-500 mb-6">Rate your experience with {reviewedUserName} for donation {donationId}.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="p-1 focus:outline-hidden transform hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                  }`}
                />
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Review Comment (Optional)</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details about punctuality, food quality, or cooperation..."
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
          >
            Submit Rating & Review
          </button>
        </form>
      </div>
    </div>
  );
}
