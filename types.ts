export enum Category {
  BAKERY = 'أفران',
  ALUMINUM = 'ألمنيوم',
  INTERNET = 'إنترنت',
  DELIVERY = 'دليفري',
  AGRICULTURE = 'زراعة وبستنة',
  BARBER_BEAUTY = 'صالون حلاقة وتجميل',
  PLUMBING_TILING = 'صحية وبلاط ودهان',
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
  CARPENTER = 'نجار',
  EVENT_PHOTOGRAPHY = 'تصوير مناسبات',
  UPHOLSTERY_CURTAINS = 'تنجيد كنبيات وتركيب برادي داخلي وخارجي',
  FORGING = 'حدادة افرنجية',
  GAS_STATIONS = 'محطات وقود',
  CAR_MECHANICS = 'ميكانيك وكهرباء سيارات',
  VEGETABLES = 'محلات خضار',
  ELECTRONICS = 'الكترونيات',
  CONSTRUCTION = 'معلمين وورقة وعمار',
  ENGINEERING = 'هندسة مدنية',
  CURRENCY_EXCHANGE = 'صراف عملات اجنبية',
  TAXI_TRANSPORT = 'تاكسي نقليات عفش',
  ONLINE_SHEIN = 'اون لاين / شي إن',
  CUPPING = 'علاج بالحجامة'
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  phone: string;
  whatsapp?: string;
  whatsappChannel?: string;
  tiktok?: string;
  instagram?: string;
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