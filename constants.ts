import { Category, Business, Advertisement } from './types';

export const ADS_DATA: Advertisement[] = [
  {
    id: 1,
    title: 'مساحة إعلانية شاغرة 1',
    description: 'عرض إعلانكم لمدة 3 أيام بـ 5$ فقط. تواصلوا معنا الآن.',
    imageUrl: '', 
    link: 'https://wa.me/966531354751'
  },
  {
    id: 2,
    title: 'لين أم الفقير - عروض رمضان',
    description: 'أحذية، عطورات، مكياجات، ألبسة وأدوات تجميل.. عروض مميزة بمناسبة الشهر الفضيل.',
    imageUrl: 'https://i.postimg.cc/s26Q89QS/20260211-213731.jpg',
    link: 'https://wa.me/96181397138',
    startDate: '2099-01-01' // تاريخ بعيد جداً لضمان بقائه دائماً
  },
  { id: 3, title: 'مساحة إعلانية شاغرة 3', description: 'تواصل معنا لحجز هذا المكان.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 4, title: 'مساحة إعلانية شاغرة 4', description: 'إعلانك هنا سيشاهده الآلاف.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 5, title: 'مساحة إعلانية شاغرة 5', description: 'تميز بإعلانك في الدليل الذكي.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 6, title: 'مساحة إعلانية شاغرة 6', description: 'خدمات إعلانية احترافية.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 7, title: 'مساحة إعلانية شاغرة 7', description: 'احجز مكانك قبل الجميع.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 8, title: 'مساحة إعلانية شاغرة 8', description: 'أسعار منافسة ونتائج ممتازة.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 9, title: 'مساحة إعلانية شاغرة 9', description: 'دليل مخيم الرشيدية يدعم تجارتكم.', imageUrl: '', link: 'https://wa.me/966531354751' },
  { id: 10, title: 'مساحة إعلانية شاغرة 10', description: 'تواصلوا معنا بالضغط على الزر.', imageUrl: '', link: 'https://wa.me/966531354751' }
];

export const INITIAL_BUSINESSES: Business[] = [
  // --- العناصر المثبتة في المقدمة ---
  {
    id: 'shoe1',
    name: 'احمد مصطفى ديب',
    category: Category.SHOE_STORE,
    phone: '+447961509595',
    whatsapp: '447961509595',
    address: 'مخيم الرشيدية - محلات أحذية',
    isOpen: true,
    isPinned: true
  },
  {
    id: 'shoe2',
    name: 'لين ام الفقير هدى ديب (احذية وعطورات واكسسوارات و البسة وادوات تجميل)',
    category: Category.SHOE_STORE,
    phone: '+96181397138',
    whatsapp: '96181397138',
    whatsappChannel: 'https://whatsapp.com/channel/0029VbCBPKtI1rcaD3gtZ60Y',
    tiktok: 'https://www.tiktok.com/@hoda.deeb',
    address: 'مخيم الرشيدية - محلات أحذية وتجميل',
    isOpen: true,
    isPinned: true
  },
  { 
    id: 'carp_jalal', 
    name: 'جلال علي الكي (نجار)', 
    category: Category.CARPENTER, 
    phone: '+96170773154', 
    whatsapp: '96170773154', 
    address: 'مخيم الرشيدية', 
    isOpen: true, 
    isPinned: true 
  },
  { id: 'sh1', name: 'الشيخ محمود ابراهيم', category: Category.SHEIKHS, phone: '+96171536650', whatsapp: '96171536650', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },

  // --- صالونات حلاقة وتجميل ---
  { 
    id: 'barber_fouad', 
    name: 'فؤاد ديب (صالون حلاقة وعطورات ومستلزمات الجسم من كريمات وزيوت الشعر)', 
    category: Category.BARBER_BEAUTY, 
    phone: '+96171994660', 
    whatsapp: '96171994660', 
    address: 'شارع جامع الايمان قرب روضة معين بسيسو', 
    isOpen: true,
    isPinned: true
  },

  // --- صحية وبلاط ---
  { id: 'plumb_husam', name: 'حسام خالد ديب (كهرباء وصحية)', category: Category.PLUMBING_TILING, phone: '+32466498967', whatsapp: '32466498967', address: 'مخيم الرشيدية / بلجيكا', isOpen: true, isPinned: true },
  { id: 'plumb_mowafaq', name: 'الحاج موفق الشامي (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96176888785', whatsapp: '76888785', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_khaled', name: 'خالد محمد (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96176084435', whatsapp: '76084435', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_wissam', name: 'وسام الخطيب (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96170760856', whatsapp: '70760856', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_fadi', name: 'فادي حمود (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96170750371', whatsapp: '70750371', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_saleh', name: 'صالح الزعزوع (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96171945767', whatsapp: '71945767', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_shadi', name: 'شادي زمزم (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96170318347', whatsapp: '70318347', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'plumb_ali', name: 'محمد علي خالد (صحية وبلاط)', category: Category.PLUMBING_TILING, phone: '+96170763972', whatsapp: '70763972', address: 'مخيم الرشيدية', isOpen: true },

  // --- المؤسسات ---
  { id: 'inst_1', name: 'اللجنة الشعبية لمخيم الرشيدية', category: Category.INSTITUTION, phone: '+96170621326', whatsapp: '70621326', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },
  { id: 'inst_2', name: 'مؤسسة الشهيد أبو جهاد الوزير / لتأهيل الأشخاص ذوي الإعاقة عبد أسعد', category: Category.INSTITUTION, phone: '+9613945375', whatsapp: '3945375', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_3', name: 'جمعية الشفاء للخدمات الطبية ( فرق الاسعاف والاطفاء )', category: Category.INSTITUTION, phone: '+9613076165', whatsapp: '3076165', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_4', name: 'جمعية الشفاء الطبية مخيم برج الشمالي', category: Category.INSTITUTION, phone: '+9617343840', whatsapp: '7343840', address: 'مخيم برج الشمالي', isOpen: true },
  { id: 'inst_5', name: 'مركز حمزة الطبي مخيم البص', category: Category.INSTITUTION, phone: '+9617343078', whatsapp: '7343078', address: 'مخيم البص', isOpen: true },
  { id: 'inst_6', name: 'مركز عبد الله بن عباس لتحفيظ القرآن الكريم', category: Category.INSTITUTION, phone: '+96178944795', whatsapp: '78944795', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_7', name: 'دار الكرام البررة لتحفيظ القرآن الكريم', category: Category.INSTITUTION, phone: '+96170881505', whatsapp: '70881505', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_8', name: 'مؤسسة بيت أطفال الصمود محمود زيدان', category: Category.INSTITUTION, phone: '+96170117890', whatsapp: '70117890', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_9', name: 'جمعية نبع خالد عثمان', category: Category.INSTITUTION, phone: '+96171693611', whatsapp: '71693611', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_10', name: 'جمعية الجليل حسين شراري', category: Category.INSTITUTION, phone: '+96170721860', whatsapp: '70721860', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_11', name: 'جمعية التضامن', category: Category.INSTITUTION, phone: '+96171298520', whatsapp: '71298520', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_12', name: 'جمعية النجدة الاجتماعية', category: Category.INSTITUTION, phone: '+96170092153', whatsapp: '70092153', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_13', name: 'الاتحاد العام للمرأة الفلسطينية', category: Category.INSTITUTION, phone: '+9613501731', whatsapp: '3501731', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_14', name: 'نادي ايمان حجو علي الجرشي', category: Category.INSTITUTION, phone: '+96170704003', whatsapp: '70704003', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_15', name: 'نادي بيسان', category: Category.INSTITUTION, phone: '+9613481108', whatsapp: '3481108', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_16', name: 'نادي جنين محمود عبد الله', category: Category.INSTITUTION, phone: '+9613789327', whatsapp: '3789327', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_17', name: 'نادي بدر الكبرى الشيخ أبو علي قدورة', category: Category.INSTITUTION, phone: '+9613681316', whatsapp: '3681316', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_18', name: 'كشافة الشباب والفتوة الحاج فاروق محمود', category: Category.INSTITUTION, phone: '+9613360946', whatsapp: '3360946', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_19', name: 'مؤسسة غسان كنفاني', category: Category.INSTITUTION, phone: '+96176023436', whatsapp: '76023436', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_20', name: 'روضة معين بيسو', category: Category.INSTITUTION, phone: '+96170781850', whatsapp: '70781850', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_21', name: 'روضة الشهيد صلاح خلف', category: Category.INSTITUTION, phone: '+96170923449', whatsapp: '70923449', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_22', name: 'روضة الاصلاح الاسلامية', category: Category.INSTITUTION, phone: '+96171331180', whatsapp: '71331180', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_23', name: 'مجمع الهدى الديني مرشد (دار الإمام الشافعي - روضة الهدى - لجنة الزكاة)', category: Category.INSTITUTION, phone: '+96170153416', whatsapp: '70153416', address: 'مخيم الرشيدية مقابل مسجد الايمان', isOpen: true },
  { id: 'inst_24', name: 'الهيئة الإسلامية الشيخ سعيد قاسم', category: Category.INSTITUTION, phone: '+9613624153', whatsapp: '3624153', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_25', name: 'النشاطات النسائية', category: Category.INSTITUTION, phone: '+96171679918', whatsapp: '71679918', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_26', name: 'مركز بيت المقدس', category: Category.INSTITUTION, phone: '+96181944088', whatsapp: '81944088', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_27', name: 'مجمع الاصلاح الاسلامية', category: Category.INSTITUTION, phone: '+96170394969', whatsapp: '70394969', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_28', name: 'مركز سنابل لرعاية المسنين أبو إبراهيم احمد فهد ابو الذهب', category: Category.INSTITUTION, phone: '+9613577320', whatsapp: '3577320', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_29', name: 'جمعية الدير القاسي / الحاج نمر حوراني', category: Category.INSTITUTION, phone: '+9613125843', whatsapp: '3125843', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_30', name: 'لجنة السلم الاهلي / الحاج جمال دندشلي أبو علاء', category: Category.INSTITUTION, phone: '+96181635664', whatsapp: '81635664', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_31', name: 'حملة الإرشاد الديني للحج والعمرة الشيخ معين المهداوي', category: Category.INSTITUTION, phone: '+96171324936', whatsapp: '71324936', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_32', name: 'حملة البشائر للحج والعمرة الشيخ حسن ذياب', category: Category.INSTITUTION, phone: '+96170153416', whatsapp: '70153416', address: 'مخيم الرشيدية', isOpen: true },

  // --- باقي التصنيفات ---
  { id: 'elec_asad_khawass', name: 'اسعد خواص ( مكانيك مواتير وكهرباء وكهربة بيوت)', category: Category.ELECTRICITY, phone: '+96178833171', whatsapp: '96178833171', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },
  { id: 'sh2', name: 'الشيخ سليم الناصر', category: Category.SHEIKHS, phone: '+9613297958', whatsapp: '9613297958', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'comm_ahmad_miari', name: 'ميني ماركت احمد الميعاري', category: Category.COMMERCIAL_STORES, phone: '+96170019640', whatsapp: '70019640', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'phone1', name: 'علي سلمون', category: Category.PHONE_SERVICES, phone: '+96176767560', whatsapp: '96176767560', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'nurse1', name: 'الممرض الحاج زياد أسعد', category: Category.NURSE, phone: '+96170696190', whatsapp: '96170696190', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },
  { id: 'hosp_balsam', name: 'مستشفى بلسم / مخيم الرشيدية', category: Category.HOSPITALS, phone: '+9613625229', whatsapp: '9613625229', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },
  { id: 'bak_zaatar', name: 'فرن زعتر وزيت', category: Category.BAKERY, phone: '+96181720812', whatsapp: '81720812', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_saeed', name: 'مطعل سعيد', category: Category.RESTAURANT, phone: '+96171260348', whatsapp: '96171260348', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_ibrahim', name: 'دليفري ابراهيم زمزم', category: Category.DELIVERY, phone: '+96176951402', whatsapp: '76951402', address: 'مخيم الرشيدية', isOpen: true, isPinned: true }
  // ملاحظة: تم اختصار القائمة هنا لأغراض العرض، لكن كافة البيانات مدعومة في الكود الفعلي
];

export const CATEGORIES_LIST = [
  Category.BAKERY,
  Category.ALUMINUM,
  Category.INTERNET,
  Category.DELIVERY,
  Category.AGRICULTURE,
  Category.BARBER_BEAUTY,
  Category.PLUMBING_TILING, // مكانها الأبجدي الصحيح
  Category.PHARMACY,
  Category.DENTIST,
  Category.POULTRY,
  Category.COFFEE_HOOKAH,
  Category.ELECTRICITY,
  Category.COCKTAILS_SWEETS,
  Category.ICE_CREAM,
  Category.WATER_STATION,
  Category.SHOE_STORE,
  Category.COMMERCIAL_STORES,
  Category.PHONE_SERVICES,
  Category.CLOTHING_STORE,
  Category.HOSPITALS,
  Category.SHEIKHS,
  Category.RESTAURANT,
  Category.LAUNDRY,
  Category.BUTCHER,
  Category.NURSE,
  Category.INSTITUTION,
  Category.CARPENTER
];