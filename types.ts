export enum Category {
  PHARMACY = 'صيدليات',
  RESTAURANT = 'مطاعم',
  DENTIST = 'عيادات أسنان',
  BAKERY = 'أفران',
  INSTITUTION = 'مؤسسات',
  DELIVERY = 'دليفري',
  BUTCHER = 'ملاحم',
  SHOE_STORE = 'محلات أحذية',
  CLOTHING_STORE = 'محلات ملابس',
  WATER_STATION = 'محطات مياه',
  POULTRY = 'فراريج',
  ICE_CREAM = 'مثلجات',
  INTERNET = 'إنترنت',
  LAUNDRY = 'مغاسل',
  CARPENTER = 'نجار',
  ALUMINUM = 'ألمنيوم',
  HOSPITALS = 'مستشفيات صور',
  AGRICULTURE = 'زراعة وبستنة',
  COFFEE_HOOKAH = 'قهاوي وأراجيل',
  NURSE = 'ممرض خاص',
  COCKTAILS_SWEETS = 'كوكتيلات حلويات وكعك',
  COMMERCIAL_STORES = 'محلات تجارية',
  PHONE_SERVICES = 'محلات تليفونات',
  SHEIKHS = 'مشايخ'
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  phone: string;
  whatsapp?: string;
  tiktok?: string;
  address: string;
  mapUrl?: string;
  isOpen: boolean;
  isPinned?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}