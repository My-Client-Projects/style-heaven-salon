export type ViewMode = 
  | 'dashboard' 
  | 'appointments' 
  | 'calendar' 
  | 'clients' 
  | 'billing' 
  | 'staff' 
  | 'reports' 
  | 'booking' 
  | 'inventory';

export interface Stylist {
  id: string;
  name: string;
  title: string;
  avatarLetter: string;
  colorTag: string;
  utilization: number;
}

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  stylistId: string;
  stylistName: string;
  startTime: string;
  endTime: string;
  tag: string;
  tagColor: string;
  price: number;
  status: 'Arrived' | 'Scheduled' | 'In chair' | 'Completed' | 'Walk-in' | 'Booked';
  notes?: string;
  date?: string;
  isBreak?: boolean;
}

export interface ClientPreference {
  preferredStylist: string;
  preferredTime: string;
  drinkChoice: string;
}

export interface ClientFormula {
  note: string;
  lastFormulaName: string;
  colorCode: string;
  processingTime: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  service: string;
  stylist: string;
  amount: number;
  status: string;
}

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  clientSince: string;
  lastApptAgo: string;
  visits: number;
  spent: number;
  loyaltyPoints: number;
  avatarUrl?: string;
  preferences: ClientPreference;
  formulas: ClientFormula;
  visitHistory: VisitRecord[];
  photos: { title: string; url: string; alt: string }[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Hair' | 'Colour' | 'Nails' | 'Skin' | 'Bridal' | 'Products';
  description: string;
  durationMin: number;
  price: number;
  icon: string;
  bgClass: string;
  textClass: string;
}

export interface CartItem {
  cartId: string;
  serviceId: string;
  name: string;
  price: number;
  stylistName: string;
}

export interface Transaction {
  id: string;
  clientName: string;
  initials: string;
  avatarBg: string;
  category: string;
  staffName: string;
  date: string;
  amount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  unitPrice: number;
}
