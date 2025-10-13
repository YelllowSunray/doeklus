// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'customer' | 'klusser' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Klusser Types
export interface Klusser {
  id: string;
  userId: string;
  name: string;
  bio: string;
  city: string;
  services: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
  photoURL?: string;
  portfolioImages: string[];
  availability: Availability[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Availability {
  day: string;
  available: boolean;
  hours?: string;
}

// Task Types
export interface Task {
  id: string;
  userId: string;
  klusserId?: string;
  title: string;
  description: string;
  service: string;
  location: {
    address: string;
    postcode: string;
    city: string;
  };
  scheduledDate: Date;
  scheduledTime?: string;
  budget?: {
    min: number;
    max: number;
  };
  images: string[];
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  offers: Offer[];
  createdAt: Date;
  updatedAt: Date;
}

// Offer Types
export interface Offer {
  id: string;
  taskId: string;
  klusserId: string;
  klusserName: string;
  price: number;
  message: string;
  estimatedDuration: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

// Review Types
export interface Review {
  id: string;
  taskId: string;
  klusserId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  service: string;
  createdAt: Date;
}

// Booking Types
export interface Booking {
  id: string;
  taskId: string;
  userId: string;
  klusserId: string;
  price: number;
  scheduledDate: Date;
  status: 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

// Service Types
export interface Service {
  slug: string;
  name: string;
  icon: string;
  description: string;
  priceFrom: number;
  category: string;
}

