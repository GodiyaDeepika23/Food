import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Donation,
  FoodRequest,
  VolunteerProfile,
  DeliveryTask,
  Review,
  Report,
  AppNotification,
  ImpactStats
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DONATIONS,
  INITIAL_REQUESTS,
  INITIAL_VOLUNTEERS,
  INITIAL_DELIVERIES,
  INITIAL_REVIEWS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_STATS
} from '../mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  donations: Donation[];
  requests: FoodRequest[];
  volunteers: VolunteerProfile[];
  deliveries: DeliveryTask[];
  reviews: Review[];
  reports: Report[];
  notifications: AppNotification[];
  stats: ImpactStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  login: (email: string) => boolean;
  logout: () => void;
  signup: (userData: Partial<User>, password?: string) => User;
  createDonation: (donationData: Omit<Donation, 'id' | 'createdAt' | 'status'>) => Donation;
  requestFood: (donationId: string, requestedQuantity: string, servingsRequested: number, preferredTime: string, message: string) => void;
  respondToRequest: (requestId: string, accept: boolean) => void;
  assignVolunteer: (donationId: string, volunteerId: string, volunteerName: string) => void;
  updateDeliveryStatus: (deliveryId: string, status: DeliveryTask['status']) => void;
  confirmDelivery: (donationId: string) => void;
  submitReview: (donationId: string, reviewedUserId: string, rating: number, comment: string) => void;
  submitReport: (targetType: 'donation' | 'user', targetId: string, targetTitle: string, reason: string, description: string) => void;
  resolveReport: (reportId: string, action: 'resolve' | 'dismiss') => void;
  markNotificationAsRead: (notifId: string) => void;
  registerAsVolunteer: (volunteerData: Omit<VolunteerProfile, 'id' | 'isVerified' | 'completedTasksCount'>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sharemeal_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[1]; // default to donor-1 for easy testing
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sharemeal_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('sharemeal_donations');
    const parsed: Donation[] = saved ? JSON.parse(saved) : [];
    const merged = [...INITIAL_DONATIONS];
    parsed.forEach(p => {
      if (!merged.some(m => m.id === p.id)) {
        merged.push(p);
      }
    });
    return merged;
  });

  const [requests, setRequests] = useState<FoodRequest[]>(() => {
    const saved = localStorage.getItem('sharemeal_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [volunteers, setVolunteers] = useState<VolunteerProfile[]>(() => {
    const saved = localStorage.getItem('sharemeal_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [deliveries, setDeliveries] = useState<DeliveryTask[]>(() => {
    const saved = localStorage.getItem('sharemeal_deliveries');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERIES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('sharemeal_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [reports, setReports] = useState<Report[]>(() => {
    const saved = localStorage.getItem('sharemeal_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sharemeal_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [stats, setStats] = useState<ImpactStats>(() => {
    const saved = localStorage.getItem('sharemeal_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Persistence effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sharemeal_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sharemeal_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sharemeal_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sharemeal_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('sharemeal_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('sharemeal_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('sharemeal_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('sharemeal_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('sharemeal_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('sharemeal_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sharemeal_stats', JSON.stringify(stats));
  }, [stats]);

  const login = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      addNotification(found.id, 'Welcome Back', `Successfully logged in as ${found.name}`, 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (userData: Partial<User>): User => {
    const newId = `u-${Date.now()}`;
    const newUser: User = {
      id: newId,
      name: userData.name || 'New User',
      email: userData.email || 'user@sharemeal.org',
      phone: userData.phone || '+91 9000000000',
      role: userData.role || 'donor',
      donorType: userData.donorType || 'Individual',
      city: userData.city || 'Visakhapatnam',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      totalDonations: 0,
      mealsContributed: 0,
      completedDeliveries: 0,
      rating: 5.0,
      reviewsCount: 0,
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    addNotification(newUser.id, 'Welcome to ShareMeal!', 'Your account has been created successfully.', 'success');
    return newUser;
  };

  const addNotification = (userId: string, title: string, message: string, type: AppNotification['type']) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toLocaleString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createDonation = (donationData: Omit<Donation, 'id' | 'createdAt' | 'status'>): Donation => {
    const randomId = `SM${Math.floor(10000 + Math.random() * 90000)}`;
    const newDonation: Donation = {
      ...donationData,
      id: randomId,
      status: 'Posted',
      createdAt: new Date().toLocaleString()
    };

    setDonations(prev => [newDonation, ...prev]);

    // Update donor stats
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        totalDonations: (currentUser.totalDonations || 0) + 1,
        mealsContributed: (currentUser.mealsContributed || 0) + donationData.servings
      };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    }

    addNotification(donationData.donorId, 'Donation Posted', `Your donation ${randomId} has been posted successfully!`, 'success');
    return newDonation;
  };

  const requestFood = (
    donationId: string,
    requestedQuantity: string,
    servingsRequested: number,
    preferredTime: string,
    message: string
  ) => {
    const receiver = currentUser || users.find(u => u.role === 'receiver') || { id: 'u-receiver-1', name: 'Hope Foundation Shelter' };
    const reqId = `req-${Date.now()}`;
    const newReq: FoodRequest = {
      id: reqId,
      donationId,
      receiverId: receiver.id,
      receiverName: receiver.name,
      organizationName: receiver.name,
      requestedQuantity,
      servingsRequested,
      preferredTime,
      message,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    setRequests(prev => [newReq, ...prev]);

    // Update donation status to Requested
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        addNotification(d.donorId, 'New Food Request', `${receiver.name} has requested your donation ${d.id}.`, 'info');
        return { ...d, status: 'Requested', acceptedReceiverId: receiver.id, acceptedReceiverName: receiver.name };
      }
      return d;
    }));

    addNotification(receiver.id, 'Request Sent', `Your request for donation ${donationId} was sent successfully.`, 'success');
  };

  const respondToRequest = (requestId: string, accept: boolean) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: accept ? 'Accepted' : 'Rejected' } : r));

    setDonations(prev => prev.map(d => {
      if (d.id === req.donationId) {
        const newStatus = accept ? 'Accepted' : 'Posted';
        if (accept) {
          addNotification(req.receiverId, 'Request Accepted', `Your food request for ${d.id} has been accepted by the donor!`, 'success');
        }
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const assignVolunteer = (donationId: string, volunteerId: string, volunteerName: string) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        addNotification(volunteerId, 'New Delivery Task', `You have been assigned to deliver donation ${d.id}.`, 'success');
        addNotification(d.donorId, 'Volunteer Assigned', `Volunteer ${volunteerName} has been assigned to collect your donation ${d.id}.`, 'success');
        return {
          ...d,
          status: 'Volunteer Assigned',
          assignedVolunteerId: volunteerId,
          assignedVolunteerName: volunteerName
        };
      }
      return d;
    }));

    // Create delivery task
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      const newDelivery: DeliveryTask = {
        id: `del-${Date.now()}`,
        donationId,
        volunteerId,
        volunteerName,
        pickupLocation: donation.pickupAddress,
        deliveryLocation: `${donation.city} Shelter / Receiver`,
        quantity: donation.quantity,
        pickupTime: donation.preferredPickupTime,
        estimatedDistance: '3.2 km',
        status: 'Assigned'
      };
      setDeliveries(prev => [newDelivery, ...prev]);
    }
  };

  const updateDeliveryStatus = (deliveryId: string, status: DeliveryTask['status']) => {
    const delivery = deliveries.find(del => del.id === deliveryId);
    if (!delivery) return;

    const timeStr = new Date().toLocaleString();
    setDeliveries(prev => prev.map(del => {
      if (del.id === deliveryId) {
        return {
          ...del,
          status,
          ...(status === 'Picked Up' ? { pickedUpAt: timeStr } : {}),
          ...(status === 'Delivered' ? { deliveredAt: timeStr } : {})
        };
      }
      return del;
    }));

    // Update donation status
    setDonations(prev => prev.map(d => {
      if (d.id === delivery.donationId) {
        let newStatus = d.status;
        if (status === 'Picked Up') {
          newStatus = 'Picked Up';
          addNotification(d.donorId, 'Food Picked Up', `Your donation ${d.id} has been picked up by volunteer.`, 'info');
        } else if (status === 'Delivered') {
          newStatus = 'Delivered';
          if (d.acceptedReceiverId) {
            addNotification(d.acceptedReceiverId, 'Food Delivered', `Food donation ${d.id} has arrived. Please confirm delivery.`, 'success');
          }
        }
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const confirmDelivery = (donationId: string) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        addNotification(d.donorId, 'Donation Completed', `Your donation ${d.id} has been successfully delivered and completed!`, 'success');
        return { ...d, status: 'Completed' };
      }
      return d;
    }));

    setDeliveries(prev => prev.map(del => del.donationId === donationId ? { ...del, status: 'Completed' } : del));

    // Update global impact stats
    setStats(prev => ({
      ...prev,
      mealsDonated: prev.mealsDonated + 25,
      peopleServed: prev.peopleServed + 20,
      foodSavedKg: prev.foodSavedKg + 12
    }));
  };

  const submitReview = (donationId: string, reviewedUserId: string, rating: number, comment: string) => {
    if (!currentUser) return;
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      donationId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewedUserId,
      rating,
      comment,
      createdAt: new Date().toLocaleString()
    };
    setReviews(prev => [newRev, ...prev]);

    // Update target user rating
    setUsers(prev => prev.map(u => {
      if (u.id === reviewedUserId) {
        const newCount = u.reviewsCount + 1;
        const newRating = Number(((u.rating * u.reviewsCount + rating) / newCount).toFixed(1));
        return { ...u, rating: newRating, reviewsCount: newCount };
      }
      return u;
    }));

    addNotification(currentUser.id, 'Review Submitted', 'Thank you for rating and reviewing your experience!', 'success');
  };

  const submitReport = (targetType: 'donation' | 'user', targetId: string, targetTitle: string, reason: string, description: string) => {
    if (!currentUser) return;
    const newRep: Report = {
      id: `rep-${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      targetType,
      targetId,
      targetTitle,
      reason,
      description,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };
    setReports(prev => [newRep, ...prev]);
    addNotification(currentUser.id, 'Report Submitted', 'Our moderation team will review this report promptly.', 'warning');
  };

  const resolveReport = (reportId: string, action: 'resolve' | 'dismiss') => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: action === 'resolve' ? 'Resolved' : 'Dismissed' } : r));
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const registerAsVolunteer = (volData: Omit<VolunteerProfile, 'id' | 'isVerified' | 'completedTasksCount'>) => {
    const newVol: VolunteerProfile = {
      ...volData,
      id: `vol-${Date.now()}`,
      isVerified: true,
      completedTasksCount: 0
    };
    setVolunteers(prev => [newVol, ...prev]);
    if (currentUser) {
      const updated = { ...currentUser, role: 'volunteer' as const };
      setCurrentUser(updated);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    }
    addNotification(volData.userId, 'Volunteer Registration', 'You are now registered as a ShareMeal volunteer!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        donations,
        requests,
        volunteers,
        deliveries,
        reviews,
        reports,
        notifications,
        stats,
        activeTab,
        setActiveTab,
        login,
        logout,
        signup,
        createDonation,
        requestFood,
        respondToRequest,
        assignVolunteer,
        updateDeliveryStatus,
        confirmDelivery,
        submitReview,
        submitReport,
        resolveReport,
        markNotificationAsRead,
        registerAsVolunteer,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
