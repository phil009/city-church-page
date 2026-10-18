export type BusinessCategory = {
  id: string;
  label: string;
  icon: string;
  description?: string;
};

export type BusinessEngagement = {
  ownerName: string;
  unitOrFellowship: string; // e.g. "Sweet Incense (Choir)", "Production (Sound)", "Small Group 4"
  contactPerson?: string;
};

export type MemberDiscount = {
  title: string; // e.g. "15% off for all City Church members"
  codeOrTerms?: string;
};

export type BusinessLocation = {
  address: string;
  city: string;
  state: string;
  area?: string;
};

export type BusinessContact = {
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  instagram?: string;
};

export type Business = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  services: string[];
  churchEngagement: BusinessEngagement;
  memberDiscount?: MemberDiscount;
  location: BusinessLocation;
  contact: BusinessContact;
  openingHours?: string;
  images: string[];
  isVerified: boolean;
  isFeatured?: boolean;
  createdAt: string;
};

export type BusinessRegistrationInput = {
  businessName: string;
  tagline?: string;
  category: string;
  description: string;
  services: string;
  ownerName: string;
  unitOrFellowship: string;
  contactPerson?: string;
  memberDiscountTitle?: string;
  memberDiscountTerms?: string;
  address: string;
  city: string;
  state: string;
  area?: string;
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  instagram?: string;
  openingHours?: string;
  imageUrls?: string;
};
