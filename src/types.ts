export type UserRole = 'donor' | 'receiver' | 'volunteer' | 'admin';

export type DonorSubType = 'Individual' | 'Restaurant' | 'Hotel' | 'College' | 'Hostel' | 'Event Organizer' | 'Shop';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  donorType?: DonorSubType;
  city: string;
  avatar: string;
  totalDonations?: number;
  mealsContributed?: number;
  completedDeliveries?: number;
  rating: number;
  reviewsCount: number;
  isVerified?: boolean;
  createdAt: string;
}

export type FoodCategory = 'Cooked food' | 'Packaged food' | 'Bakery' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Other';

export type DonationStatus = 'Posted' | 'Requested' | 'Accepted' | 'Volunteer Assigned' | 'Picked Up' | 'Delivered' | 'Completed';

export interface Donation {
  id: string; // e.g. SM10245
  donorId: string;
  donorName: string;
  donorType: DonorSubType;
  foodName: string;
  category: FoodCategory;
  quantity: string;
  servings: number;
  isVeg: boolean;
  preparedTime: string;
  bestBefore: string;
  packagingType: string;
  description: string;
  pickupAddress: string; // Private until accepted
  city: string;
  pinCode: string;
  preferredPickupTime: string;
  contactNumber: string;
  photoUrl: string;
  status: DonationStatus;
  createdAt: string;
  assignedVolunteerId?: string;
  assignedVolunteerName?: string;
  acceptedReceiverId?: string;
  acceptedReceiverName?: string;
}

export interface FoodRequest {
  id: string;
  donationId: string;
  receiverId: string;
  receiverName: string;
  organizationName: string;
  requestedQuantity: string;
  servingsRequested: number;
  preferredTime: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export interface VolunteerProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  serviceArea: string;
  availableDays: string;
  availableTime: string;
  vehicleType: string;
  isVerified: boolean;
  completedTasksCount: number;
}

export interface DeliveryTask {
  id: string;
  donationId: string;
  volunteerId?: string;
  volunteerName?: string;
  pickupLocation: string;
  deliveryLocation: string;
  quantity: string;
  pickupTime: string;
  estimatedDistance: string;
  status: 'Available' | 'Assigned' | 'Picked Up' | 'Delivered' | 'Completed';
  pickedUpAt?: string;
  deliveredAt?: string;
}

export interface Review {
  id: string;
  donationId: string;
  reviewerId: string;
  reviewerName: string;
  reviewedUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'donation' | 'user';
  targetId: string;
  targetTitle: string;
  reason: string;
  description: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  createdAt: string;
}

export interface ImpactStats {
  mealsDonated: number;
  peopleServed: number;
  activeVolunteers: number;
  partnerOrganizations: number;
  foodSavedKg: number;
}
