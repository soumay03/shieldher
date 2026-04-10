// ─── Support & Counseling — Static Dataset ────────────────────────────────────
// Replace getPsychiatrists / getNGOs with real HTTP calls when a backend exists.

import type { Psychiatrist, NGO, SupportFilter } from './support-types';

// ── Psychiatrists ─────────────────────────────────────────────────────────────

const PSYCHIATRISTS: Psychiatrist[] = [
  {
    id: 'psy-001',
    name: 'Dr. Ananya Sharma',
    title: 'MD Psychiatry, NIMHANS',
    specializations: ['Trauma & PTSD', 'Anxiety', 'Domestic Violence Recovery'],
    city: 'Mumbai',
    location: 'Bandra West, Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'available',
    nextSlot: 'Today 4:00 PM',
    rating: 4.9,
    reviewCount: 218,
    phone: '+91-9820012345',
    email: 'dr.ananya@supporther.in',
    isEmergency: true,
    categories: ['mental-health', 'crisis-line'],
  },
  {
    id: 'psy-002',
    name: 'Dr. Priya Menon',
    title: 'MD, DPM — Clinical Psychiatrist',
    specializations: ['Sexual Abuse Recovery', 'Depression', 'Cognitive Therapy'],
    city: 'Bangalore',
    location: 'Indiranagar, Bangalore',
    languages: ['English', 'Kannada', 'Tamil'],
    availability: 'available',
    nextSlot: 'Tomorrow 10:00 AM',
    rating: 4.8,
    reviewCount: 184,
    phone: '+91-9845067890',
    email: 'dr.priya@supporther.in',
    isEmergency: false,
    categories: ['mental-health'],
  },
  {
    id: 'psy-003',
    name: 'Dr. Kavita Iyer',
    title: 'PhD Clinical Psychology, IIT Delhi',
    specializations: ['Cyberbullying Trauma', 'Workplace Harassment', 'EMDR Therapy'],
    city: 'Delhi',
    location: 'South Extension, New Delhi',
    languages: ['English', 'Hindi'],
    availability: 'busy',
    nextSlot: 'Mon 11:00 AM',
    rating: 4.7,
    reviewCount: 156,
    phone: '+91-9910056789',
    email: 'dr.kavita@supporther.in',
    isEmergency: false,
    categories: ['mental-health'],
  },
  {
    id: 'psy-004',
    name: 'Dr. Nandita Roy',
    title: 'MRCPsych (UK), Trauma Specialist',
    specializations: ['Stalking & Harassment', 'Crisis Intervention', 'Group Therapy'],
    city: 'Kolkata',
    location: 'Salt Lake, Kolkata',
    languages: ['English', 'Bengali', 'Hindi'],
    availability: 'available',
    nextSlot: 'Today 6:00 PM',
    rating: 4.9,
    reviewCount: 271,
    phone: '+91-9830045678',
    email: 'dr.nandita@supporther.in',
    isEmergency: true,
    categories: ['mental-health', 'crisis-line'],
  },
  {
    id: 'psy-005',
    name: 'Dr. Lalitha Krishnamurthy',
    title: 'MD Psychiatry, CMC Vellore',
    specializations: ['Online Abuse Recovery', 'Adolescent Trauma', 'DBT'],
    city: 'Chennai',
    location: 'Anna Nagar, Chennai',
    languages: ['English', 'Tamil', 'Telugu'],
    availability: 'available',
    nextSlot: 'Today 2:00 PM',
    rating: 4.8,
    reviewCount: 193,
    phone: '+91-9841089012',
    email: 'dr.lalitha@supporther.in',
    isEmergency: false,
    categories: ['mental-health'],
  },
  {
    id: 'psy-006',
    name: 'Dr. Rekha Bajaj',
    title: 'MBBS, MD Psychiatry — Fortis',
    specializations: ['Intimate Partner Violence', 'Anxiety Disorders', 'Mindfulness-Based CBT'],
    city: 'Hyderabad',
    location: 'Jubilee Hills, Hyderabad',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'offline',
    nextSlot: 'Tue 9:00 AM',
    rating: 4.6,
    reviewCount: 142,
    phone: '+91-9989034567',
    email: 'dr.rekha@supporther.in',
    isEmergency: false,
    categories: ['mental-health'],
  },
];

// ── NGOs ─────────────────────────────────────────────────────────────────────

const NGOS: NGO[] = [
  {
    id: 'ngo-001',
    name: 'iCall — TISS',
    tagline: 'Free psychological counselling helpline by Tata Institute',
    city: 'Mumbai',
    location: 'Deonar, Mumbai',
    distance: '5.1 km',
    services: ['Telephone Counselling', 'Online Chat', 'Mental Health Referrals'],
    contactPhone: '9152987821',
    contactEmail: 'icall@tiss.edu',
    website: 'https://icallhelpline.org',
    isVerified: true,
    isEmergency: true,
    categories: ['mental-health', 'crisis-line'],
    operatingHours: 'Mon–Sat, 8 AM – 10 PM',
  },
  {
    id: 'ngo-002',
    name: 'Majlis Legal Centre',
    tagline: 'Free legal aid for women facing violence and discrimination',
    city: 'Mumbai',
    location: 'Andheri East, Mumbai',
    distance: '8.4 km',
    services: ['Legal Consultation', 'Court Representation', 'FIR Filing Support'],
    contactPhone: '+91-22-26838923',
    contactEmail: 'majlislaw@gmail.com',
    website: 'https://majlislaw.com',
    isVerified: true,
    isEmergency: false,
    categories: ['legal-aid'],
    operatingHours: 'Mon–Fri, 10 AM – 5 PM',
  },
  {
    id: 'ngo-003',
    name: 'Sakshi Violence Intervention Centre',
    tagline: 'Gender justice through advocacy, counselling and legal support',
    city: 'Delhi',
    location: 'Lajpat Nagar, New Delhi',
    distance: '3.2 km',
    services: ['Crisis Counselling', 'Legal Aid', 'Shelter Referrals', 'Documentation Support'],
    contactPhone: '+91-11-26844061',
    contactEmail: 'sakshi@sakshi.org',
    website: 'https://sakshi.org',
    isVerified: true,
    isEmergency: true,
    categories: ['legal-aid', 'shelter', 'mental-health'],
    operatingHours: 'Mon–Sat, 9 AM – 6 PM',
  },
  {
    id: 'ngo-004',
    name: 'Parihar — SPYM Shelter',
    tagline: 'Safe shelter and rehabilitation for women in crisis',
    city: 'Delhi',
    location: 'Dwarka, New Delhi',
    distance: '11.7 km',
    services: ['Emergency Shelter', 'Vocational Training', 'Counselling', 'Child Care'],
    contactPhone: '+91-11-25082299',
    contactEmail: 'parihar@spym.org',
    website: 'https://spym.org',
    isVerified: true,
    isEmergency: true,
    categories: ['shelter', 'mental-health'],
    operatingHours: '24/7',
  },
  {
    id: 'ngo-005',
    name: 'Vandrevala Foundation',
    tagline: '24/7 mental health helpline across India',
    city: 'Bangalore',
    location: 'Koramangala, Bangalore',
    services: ['24/7 Crisis Helpline', 'Chat Support', 'Grief Counselling'],
    contactPhone: '1860-2662-345',
    contactEmail: 'support@vandrevalafoundation.com',
    website: 'https://vandrevalafoundation.com',
    isVerified: true,
    isEmergency: true,
    categories: ['crisis-line', 'mental-health'],
    operatingHours: '24 × 7',
  },
  {
    id: 'ngo-006',
    name: 'Samvedna Trust',
    tagline: 'Psychosocial support for survivors of gender-based violence',
    city: 'Kolkata',
    location: 'Ballygunge, Kolkata',
    distance: '2.8 km',
    services: ['Group Therapy', 'Legal Referral', 'Child Protection', 'Life Skills'],
    contactPhone: '+91-33-24661034',
    contactEmail: 'info@samvednatrust.org',
    website: 'https://samvednatrust.org',
    isVerified: true,
    isEmergency: false,
    categories: ['mental-health', 'legal-aid'],
    operatingHours: 'Mon–Sat, 9 AM – 5 PM',
  },
  {
    id: 'ngo-007',
    name: 'Tulir — Child & Adult Safety',
    tagline: 'Prevention and healing from child sexual abuse & harassment',
    city: 'Chennai',
    location: 'T. Nagar, Chennai',
    distance: '4.5 km',
    services: ['Therapeutic Counselling', 'Parent Workshops', 'Crisis Support', 'Legal Guidance'],
    contactPhone: '+91-44-45011167',
    contactEmail: 'tulir@tulir.org',
    website: 'https://tulir.org',
    isVerified: true,
    isEmergency: false,
    categories: ['mental-health', 'legal-aid'],
    operatingHours: 'Mon–Fri, 9 AM – 6 PM',
  },
  {
    id: 'ngo-008',
    name: 'Prajwala — Anti-Trafficking',
    tagline: 'Rescue, rehabilitation and reintegration for trafficking survivors',
    city: 'Hyderabad',
    location: 'Secunderabad, Hyderabad',
    distance: '6.9 km',
    services: ['Emergency Rescue', 'Shelter', 'Legal Prosecution Support', 'Livelihood Training'],
    contactPhone: '+91-40-27808400',
    contactEmail: 'prajwala@prajwalaindia.com',
    website: 'https://prajwalaindia.com',
    isVerified: true,
    isEmergency: true,
    categories: ['shelter', 'legal-aid', 'medical'],
    operatingHours: '24/7 Emergency Line',
  },
];

// ── Filter Helpers ────────────────────────────────────────────────────────────

function matchesFilter<T extends { name: string; city: string; categories: string[] }>(
  item: T,
  filter: SupportFilter,
  extraText: string
): boolean {
  const q = filter.query.toLowerCase().trim();
  if (filter.emergencyOnly && !(item as unknown as { isEmergency: boolean }).isEmergency) {
    return false;
  }
  if (filter.category !== 'all' && !item.categories.includes(filter.category)) {
    return false;
  }
  if (filter.city && filter.city !== 'all' && item.city.toLowerCase() !== filter.city.toLowerCase()) {
    return false;
  }
  if (q) {
    const searchable = `${item.name} ${item.city} ${item.categories.join(' ')} ${extraText}`.toLowerCase();
    return searchable.includes(q);
  }
  return true;
}

export function getPsychiatrists(filter: SupportFilter): Psychiatrist[] {
  return PSYCHIATRISTS.filter((p) =>
    matchesFilter(p, filter, `${p.specializations.join(' ')} ${p.location} ${p.languages.join(' ')}`)
  );
}

export function getNGOs(filter: SupportFilter): NGO[] {
  return NGOS.filter((n) =>
    matchesFilter(n, filter, `${n.services.join(' ')} ${n.location} ${n.tagline}`)
  );
}

export const ALL_CITIES = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'] as const;
export type SupportCity = (typeof ALL_CITIES)[number];
