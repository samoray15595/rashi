export enum Category {
  BAKERY = 'أفران',
  ALUMINUM = 'ألمنيوم',
  INTERNET = 'إنترنت',
  DELIVERY = 'دليفري',
  AGRICULTURE = 'زراعة وبستنة',
  BARBER_BEAUTY = 'صالون حلاقة وتجميل',
  PLUMBING_TILING = 'صحية وبلاط',
  PHARMACY = 'صيدليات',
  DENTIST = 'عيادات أسنان',
  POULTRY = 'فراريج',
  COFFEE_HOOKAH = 'قهاوي وأراجيل',
  ELECTRICITY = 'كهرباء عامة',
  COCKTAILS_SWEETS = 'كوكتيلات حلويات وكعك',
  ICE_CREAM = 'مثلجات',
  WATER_STATION = 'محطات مياه',
  SHOE_STORE = 'محلات أحذية',
  COMMERCIAL_STORES = 'محلات تجارية',
  PHONE_SERVICES = 'محلات تليفونات',
  CLOTHING_STORE = 'محلات ملابس',
  HOSPITALS = 'مستشفيات صور',
  SHEIKHS = 'مشايخ',
  RESTAURANT = 'مطاعم',
  LAUNDRY = 'مغاسل',
  BUTCHER = 'ملاحم',
  NURSE = 'ممرض خاص',
  INSTITUTION = 'مؤسسات',
  CARPENTER = 'نجار'
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  phone: string;
  whatsapp?: string;
  whatsappChannel?: string;
  tiktok?: string;
  address: string;
  mapUrl?: string;
  isOpen: boolean;
  isPinned?: boolean;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  startDate?: string; // تاريخ بدء الإعلان بصيغة ISO (YYYY-MM-DD)
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}