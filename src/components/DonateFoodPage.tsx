import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Utensils, CheckCircle, ShieldCheck, Camera, MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function DonateFoodPage() {
  const { currentUser, createDonation, setActiveTab } = useApp();

  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<any>('Cooked food');
  const [quantity, setQuantity] = useState('');
  const [servings, setServings] = useState<number>(20);
  const [isVeg, setIsVeg] = useState(true);
  const [preparedTime, setPreparedTime] = useState('2026-09-28 14:00');
  const [bestBefore, setBestBefore] = useState('2026-09-28 22:00');
  const [packagingType, setPackagingType] = useState('Food Grade Containers');
  const [description, setDescription] = useState('');
  
  const [pickupAddress, setPickupAddress] = useState('');
  const [city, setCity] = useState(currentUser?.city || 'Visakhapatnam');
  const [pinCode, setPinCode] = useState('530001');
  const [preferredPickupTime, setPreferredPickupTime] = useState('18:00 - 20:00');
  const [contactNumber, setContactNumber] = useState(currentUser?.phone || '+91 9812345678');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600');

  // Safety checkboxes
  const [safeStored, setSafeStored] = useState(false);
  const [suitableConsumption, setSuitableConsumption] = useState(false);
  const [accurateInfo, setAccurateInfo] = useState(false);

  const [successId, setSuccessId] = useState<string | null>(null);

  const samplePhotos = [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safeStored || !suitableConsumption || !accurateInfo) {
      alert('Please confirm all food safety checkboxes before posting the donation.');
      return;
    }

    const donorId = currentUser ? currentUser.id : 'u-donor-1';
    const donorName = currentUser ? currentUser.name : 'Community Donor';
    const donorType = currentUser?.donorType || 'Individual';

    const newDonation = createDonation({
      donorId,
      donorName,
      donorType,
      foodName,
      category,
      quantity,
      servings,
      isVeg,
      preparedTime,
      bestBefore,
      packagingType,
      description,
      pickupAddress,
      city,
      pinCode,
      preferredPickupTime,
      contactNumber,
      photoUrl
    });

    setSuccessId(newDonation.id);
  };

  if (successId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-slate-900">Your food donation has been posted successfully!</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you for sharing surplus food to help reduce waste. Your unique Donation ID has been generated:
        </p>

        <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-3xl max-w-xs mx-auto shadow-md">
          <span className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Donation ID</span>
          <span className="text-3xl font-extrabold font-mono text-emerald-900">{successId}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveTab('donor-dashboard')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Go to Donor Dashboard
          </button>
          <button
            onClick={() => {
              setSuccessId(null);
              setFoodName('');
              setDescription('');
            }}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Donate Another Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-600 px-8 py-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold font-serif">Donate Surplus Food</h1>
          </div>
          <p className="text-emerald-100 text-xs">
            Provide accurate details about the prepared food, storage, and pickup location to help NGOs and volunteers collect it safely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section 1: Food Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">1. Food Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Food Name / Title *</label>
                <input
                  type="text"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Veg Biryani & Paneer Curry"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Food Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Cooked food">Cooked food</option>
                  <option value="Packaged food">Packaged food</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity (e.g. 10 kg) *</label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="10 kg"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Serves (Approx. People) *</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dietary Type *</label>
                <select
                  value={isVeg ? 'veg' : 'non-veg'}
                  onChange={(e) => setIsVeg(e.target.value === 'veg')}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="veg">🟢 Pure Vegetarian</option>
                  <option value="non-veg">🔴 Non-Vegetarian</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prepared Date & Time</label>
                <input
                  type="text"
                  value={preparedTime}
                  onChange={(e) => setPreparedTime(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Best Consumed By</label>
                <input
                  type="text"
                  value={bestBefore}
                  onChange={(e) => setBestBefore(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Packaging Type</label>
                <input
                  type="text"
                  value={packagingType}
                  onChange={(e) => setPackagingType(e.target.value)}
                  placeholder="Food Grade Containers"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Food Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention ingredients, temperature, or any specific details..."
                className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
          </div>

          {/* Section 2: Pickup Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">2. Pickup Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Address *</label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Street / Locality / Landmark"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Pickup Time *</label>
                <input
                  type="text"
                  required
                  value={preferredPickupTime}
                  onChange={(e) => setPreferredPickupTime(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Number *</label>
                <input
                  type="text"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Food Photo */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">3. Food Photo</h3>
            <p className="text-xs text-slate-500">Choose a preview sample photo or enter a photo URL:</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {samplePhotos.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => setPhotoUrl(url)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                    photoUrl === url ? 'border-emerald-600 ring-2 ring-emerald-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="sample" className="w-full h-24 object-cover" />
                </div>
              ))}
            </div>

            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Or enter image URL..."
              className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Section 4: Safety Confirmation */}
          <div className="bg-emerald-50/75 border border-emerald-200 p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Food Safety Confirmation</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={safeStored}
                  onChange={(e) => setSafeStored(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 font-medium">Food has been stored safely at appropriate temperatures and protected from contamination.</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={suitableConsumption}
                  onChange={(e) => setSuitableConsumption(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 font-medium">Food is fresh, wholesome, and suitable for human consumption before the best-before time.</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={accurateInfo}
                  onChange={(e) => setAccurateInfo(e.target.checked)}
                  className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 font-medium">I have provided accurate information regarding preparation time, ingredients, and pickup details.</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>Post Food Donation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </form>
      </div>

    </div>
  );
}
