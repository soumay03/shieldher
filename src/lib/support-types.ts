// ─── Support & Counseling — Type Definitions ──────────────────────────────────

export type SupportCategory =
  | 'all'
  | 'mental-health'
  | 'legal-aid'
  | 'shelter'
  | 'crisis-line'
  | 'medical';

export type AvailabilityStatus = 'available' | 'busy' | 'offline';

export interface Psychiatrist {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  /** City name, e.g. "Mumbai" */
  city: string;
  location: string; // full address / area
  languages: string[];
  availability: AvailabilityStatus;
  nextSlot: string; // human-readable, e.g. "Today 5 PM"
  rating: number; // 0-5
  reviewCount: number;
  phone: string;
  email: string;
  isEmergency: boolean;
  categories: SupportCategory[];
}

export interface NGO {
  id: string;
  name: string;
  tagline: string;
  city: string;
  location: string;
  distance?: string; // e.g. "2.3 km"
  services: string[];
  contactPhone: string;
  contactEmail: string;
  website?: string;
  isVerified: boolean;
  isEmergency: boolean;
  categories: SupportCategory[];
  operatingHours: string;
}

export interface SupportFilter {
  query: string;
  category: SupportCategory;
  city: string;
  emergencyOnly: boolean;
}
