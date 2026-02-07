
export enum Category {
  PHARMACY = 'صيدليات',
  RESTAURANT = 'مطاعم',
  DENTIST = 'عيادات أسنان',
  BAKERY = 'أفران',
  INSTITUTION = 'مؤسسات',
  DELIVERY = 'دليفري',
  BUTCHER = 'ملاحم',
  SHOE_STORE = 'محلات أحذية',
  WATER_STATION = 'محطات مياه'
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  phone: string;
  whatsapp?: string;
  address: string;
  mapUrl?: string;
  isOpen: boolean;
  isPinned?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
