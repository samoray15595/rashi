import { Category, Business } from './types';

export const INITIAL_BUSINESSES: Business[] = [
  // --- محلات أحذية (مثبتة في الأعلى) ---
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
    tiktok: 'https://www.tiktok.com/@hoda.deeb',
    address: 'مخيم الرشيدية - محلات أحذية وتجميل',
    isOpen: true,
    isPinned: true
  },
  
  // --- مستشفيات صور وصيدا (القائمة الكاملة) ---
  { id: 'hosp_balsam', name: 'مستشفى بلسم / مخيم الرشيدية', category: Category.HOSPITALS, phone: '+9613625229', whatsapp: '9613625229', address: 'مخيم الرشيدية (رقم إضافي: 81992156)', isOpen: true, isPinned: true },
  { id: 'hosp_italy', name: 'مستشفى اللبناني الايطالي', category: Category.HOSPITALS, phone: '+9617344423', whatsapp: '9617344423', address: 'صور (رقم إضافي: 07350065)', isOpen: true },
  { id: 'hosp_jabal', name: 'مستشفى جبل عامل', category: Category.HOSPITALS, phone: '+9617740348', whatsapp: '9617740348', address: 'صور (أرقام إضافية: 03280580 - 07740343)', isOpen: true },
  { id: 'hosp_hiram', name: 'مستشفى حيرام', category: Category.HOSPITALS, phone: '+9617343700', whatsapp: '9617343700', address: 'صور (رقم إضافي: 03218906)', isOpen: true },
  { id: 'hosp_faqih', name: 'مستشفى الفقيه السكسكية', category: Category.HOSPITALS, phone: '+9617443470', whatsapp: '9617443470', address: 'السكسكية', isOpen: true },
  { id: 'hosp_kharoubi', name: 'مستشفى خروبي الصرفند', category: Category.HOSPITALS, phone: '+9617443344', whatsapp: '9617443344', address: 'الصرفند', isOpen: true },
  { id: 'hosp_aladin', name: 'مستشفى علاء الدين الصرفند', category: Category.HOSPITALS, phone: '+9617443200', whatsapp: '9617443200', address: 'الصرفند', isOpen: true },
  { id: 'hosp_osairan', name: 'مستشفى عسيران / صيدا', category: Category.HOSPITALS, phone: '+9617726008', whatsapp: '9617726008', address: 'صيدا', isOpen: true },
  { id: 'hosp_labib', name: 'مستشفى لبيب / صيدا', category: Category.HOSPITALS, phone: '+9617723444', whatsapp: '9617723444', address: 'صيدا (رقم إضافي: 03112010)', isOpen: true },
  { id: 'hosp_hammoud', name: 'مستشفى حمود / صيدا', category: Category.HOSPITALS, phone: '+9617721021', whatsapp: '9617721021', address: 'صيدا (رقم إضافي: 07723111)', isOpen: true },
  { id: 'hosp_dalaa', name: 'مستشفى دلاعة / صيدا', category: Category.HOSPITALS, phone: '+9617724088', whatsapp: '9617724088', address: 'صيدا', isOpen: true },
  { id: 'hosp_hamshari', name: 'مستشفى الشهيد محمود الهمشري / صيدا', category: Category.HOSPITALS, phone: '+9617724871', whatsapp: '9617724871', address: 'صيدا', isOpen: true },
  { id: 'hosp_qassab', name: 'مستشفى قصب / عبرا', category: Category.HOSPITALS, phone: '+961723900', whatsapp: '961723900', address: 'عبرا (رقم إضافي: 07731541)', isOpen: true },
  { id: 'hosp_turkish', name: 'المستشفى التركي / صيدا', category: Category.HOSPITALS, phone: '+9617577560', whatsapp: '9617577560', address: 'صيدا (رقم إضافي: 76060537)', isOpen: true },

  // --- نجار ---
  { id: 'carp_jalal', name: 'جلال علي الكي (نجار)', category: Category.CARPENTER, phone: '+96170773154', whatsapp: '96170773154', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },

  // --- ألمنيوم ---
  { id: 'alum_mahmoud', name: 'محمود العريض (المنيوم)', category: Category.ALUMINUM, phone: '+96178862269', whatsapp: '96178862269', address: 'خط السكة محلات ابو النمل', isOpen: true },

  // --- مغاسل ---
  { id: 'laundry_alsayyed', name: 'مغسل ALSAYYED غسيل سيارات - دراجات ناريه- سجاد', category: Category.LAUNDRY, phone: '+96171773546', whatsapp: '96171773546', address: 'الحي الشمالي - مقابل مسجد العودة', isOpen: true },

  // --- إنترنت ---
  { id: 'net_ahmad', name: 'احمد محمد WI-FI NET', category: Category.INTERNET, phone: '+96171565420', whatsapp: '96171565420', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'net_abd', name: 'عبد Mega Net', category: Category.INTERNET, phone: '+96170618897', whatsapp: '96170618897', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'net_mohamad_iyad', name: 'محمد اياد Abo Reda Net', category: Category.INTERNET, phone: '+96176165611', whatsapp: '96176165611', address: 'مخيم الرشيدية', isOpen: true },

  // --- فراريج مخيم الرشيدية ---
  { id: 'pou_baraka1', name: 'فروج البركة / محمد جواد', category: Category.POULTRY, phone: '+96171209108', whatsapp: '96171209108', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_baraka2', name: 'مطبخ ومتبلات البركة / احمد جواد', category: Category.POULTRY, phone: '+96178985886', whatsapp: '96178985886', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_safouri_y', name: 'فروج ومتبلات ياسر الصفوري', category: Category.POULTRY, phone: '+96176883656', whatsapp: '96176883656', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_muna', name: 'فروج المنى / غسان الشولي', category: Category.POULTRY, phone: '+96176097213', whatsapp: '96176097213', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_shibli', name: 'فروج معتصم يعقوب / الشبلي', category: Category.POULTRY, phone: '+96176033486', whatsapp: '96176033486', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_khattab', name: 'فروج ياسر خطاب', category: Category.POULTRY, phone: '+96176646723', whatsapp: '96176646723', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_khaled_w', name: 'فروج خالد وليد أبو خالد', category: Category.POULTRY, phone: '+96176883656', whatsapp: '96176883656', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_dahab', name: 'فروج ومتبلات أبو الذهب', category: Category.POULTRY, phone: '+96176855400', whatsapp: '96176855400', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_fowzi', name: 'فروج فوزي حسن', category: Category.POULTRY, phone: '+96176106455', whatsapp: '96176106455', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_olayan', name: 'فروج عليان', category: Category.POULTRY, phone: '+96178770479', whatsapp: '96178770479', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'pou_samer_azzam', name: 'لحومات ومتبلات سامر عزام', category: Category.POULTRY, phone: '+96171418071', whatsapp: '96171418071', address: 'مخيم الرشيدية', isOpen: true },

  // --- مثلجات ---
  { id: 'ice_special', name: 'مثلجات سبيسيال / محمد فياض', category: Category.ICE_CREAM, phone: '+96181536314', whatsapp: '96181536314', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ice_nehro', name: 'مثلجات علاء نهرو', category: Category.ICE_CREAM, phone: '+96170744081', whatsapp: '96170744081', address: 'مخيم الرشيدية', isOpen: true },

  // --- محطات المياه ---
  { id: 'water_ridda', name: 'مياه الرضا', category: Category.WATER_STATION, phone: '+96171848705', whatsapp: '96171848705', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'water_balsam', name: 'مياه بلسم', category: Category.WATER_STATION, phone: '+96181912615', whatsapp: '96181912615', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'water_adnan', name: 'مياه العدنان', category: Category.WATER_STATION, phone: '+96176785731', whatsapp: '96176785731', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'water_family', name: 'مياه العائلة', category: Category.WATER_STATION, phone: '+96176723240', whatsapp: '96176723240', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'water_zamzam', name: 'مياة زمزم', category: Category.WATER_STATION, phone: '+96178791878', whatsapp: '96178791878', address: 'مخيم الرشيدية', isOpen: true },

  // --- ملاحم ---
  { id: 'bt_nakha', name: 'ملحمة النكهة', category: Category.BUTCHER, phone: '+96171696868', whatsapp: '96171696868', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_khaled_safouri', name: 'ملحمة خالد الصفوري', category: Category.BUTCHER, phone: '+96170889659', whatsapp: '96170889659', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_mahmoud_safouri', name: 'ملحمة محمود الصفوري', category: Category.BUTCHER, phone: '+9613493328', whatsapp: '9613493328', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_khal', name: 'ملحمة الخال', category: Category.BUTCHER, phone: '+9613029810', whatsapp: '9613029810', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_shafiq_safouri', name: 'ملحمة شفيق الصفوري', category: Category.BUTCHER, phone: '+9613241253', whatsapp: '9613241253', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_khalil_hweidi', name: 'ملحمة خليل هويدي', category: Category.BUTCHER, phone: '+96178984490', whatsapp: '96178984490', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bt_abu_samer_zeini', name: 'ملحمة أبو سامر الزيني', category: Category.BUTCHER, phone: '+9613538074', whatsapp: '9613538074', address: 'مخيم الرشيدية', isOpen: true },

  // --- أطباء الأسنان ---
  { id: 'den_mourad', name: 'الدكتور مراد عجاوي', category: Category.DENTIST, phone: '+96181696650', whatsapp: '96181696650', address: 'الشارع العام قرب محطة الحاج أبو رضا', isOpen: true },
  { id: 'den_hussein', name: 'الدكتور حسين الزنغري', category: Category.DENTIST, phone: '+9613325160', whatsapp: '9613325160', address: 'الشارع العام قرب مالية فتح', isOpen: true },
  { id: 'den_shehab', name: 'الدكتور شهاب الشربيني', category: Category.DENTIST, phone: '+9613794955', whatsapp: '9613794955', address: 'الشارع العام مقابل محطة الحاج أبو رضا', isOpen: true },
  { id: 'den_doureid', name: 'الدكتور دريد مطر', category: Category.DENTIST, phone: '+9613783856', whatsapp: '9613783856', address: 'الشارع العام مقابل مكتب مدير المخيم', isOpen: true },
  { id: 'den_ibrahim', name: 'الدكتور ابراهيم مطر', category: Category.DENTIST, phone: '+96170131670', whatsapp: '96170131670', address: 'الشارع العام مقابل مكتب مدير المخيم', isOpen: true },
  { id: 'den_wissam', name: 'الدكتور وسام مطر', category: Category.DENTIST, phone: '+96178876362', whatsapp: '96178876362', address: 'مؤسسة بيت أطفال الصمود - عيادة الأسنان', isOpen: true },
  { id: 'den_saddam', name: 'الدكتور صدام مطر', category: Category.DENTIST, phone: '+96178828249', whatsapp: '96178828249', address: 'الشارع العام مقابل مكتب مدير المخيم', isOpen: true },
  { id: 'den_hassan', name: 'الدكتور حسن يوسف', category: Category.DENTIST, phone: '+9613635195', whatsapp: '9613635195', address: 'الشارع العام مقابل محلات الحاج رزق هويدي', isOpen: true },
  { id: 'den_hamid', name: 'الدكتور حميد عجاوي', category: Category.DENTIST, phone: '+9613674703', whatsapp: '9613674703', address: 'الشارع العام قرب محلات الحاج لبيب عليان', isOpen: true },
  { id: 'den_hanan', name: 'الدكتورة حنان موسى', category: Category.DENTIST, phone: '+9613497721', whatsapp: '9613497721', address: 'الشارع العام الرئيسي', isOpen: true },
  { id: 'den_ahmad', name: 'الدكتور أحمد ميعاري', category: Category.DENTIST, phone: '+96171678896', whatsapp: '96171678896', address: 'عيادة الأونروا - مخيم الرشيدية', isOpen: true },

  // --- المؤسسات ---
  { id: 'inst_civil_defense', name: 'الدفاع المدني الفلسطيني - وحدة الإسعاف والطوارئ', category: Category.INSTITUTION, phone: '+96171542710', whatsapp: '96171542710', address: 'مخيم الرشيدية', isOpen: true, isPinned: true },
  { id: 'inst_abu_jihad', name: 'مؤسسة الشهيد أبو جهاد الوزير (تأهيل ذوي الإعاقة)', category: Category.INSTITUTION, phone: '+9613945375', whatsapp: '9613945375', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_shifa_rashidiya', name: 'جمعية الشفاء - مخيم الرشيدية', category: Category.INSTITUTION, phone: '+9613076165', whatsapp: '9613076165', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'inst_shifa_burj', name: 'جمعية الشفاء الطبية - مخيم برج الشمالي', category: Category.INSTITUTION, phone: '+9617343840', whatsapp: '9617343840', address: 'مخيم برج الشمالي', isOpen: true },
  { id: 'inst_hamza_medical', name: 'مركز حمزة الطبي - مخيم البص', category: Category.INSTITUTION, phone: '+9617343078', whatsapp: '9617343078', address: 'مخيم البص', isOpen: true },
  { id: 'inst_samoud', name: 'مؤسسة بيت أطفال الصمود', category: Category.INSTITUTION, phone: '+96107350444', whatsapp: '96107350444', address: 'مخيم الرشيدية', isOpen: true },

  // --- الصيدليات ---
  { id: 'ph_huda', name: 'صيدلية الهدى (داني وردة)', category: Category.PHARMACY, phone: '+96171883229', whatsapp: '96171883229', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_ghannam_ahmad', name: 'صيدلية احمد غنام', category: Category.PHARMACY, phone: '+96178875192', whatsapp: '96178875192', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_ghannam_ghannam', name: 'صيدلية غنام غنام', category: Category.PHARMACY, phone: '+9613642306', whatsapp: '9613642306', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_qatt', name: 'صيدلية الحاج أبو علاء القط', category: Category.PHARMACY, phone: '+96181612822', whatsapp: '96181612822', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_nour', name: 'صيدلية النور / الحاج منير ضاهر', category: Category.PHARMACY, phone: '+9613573110', whatsapp: '9613573110', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_fath', name: 'صيدلية فتح / فراس', category: Category.PHARMACY, phone: '+9613358351', whatsapp: '9613358351', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_ashqar', name: 'صيدلية الحاج محمد الأشقر', category: Category.PHARMACY, phone: '+96171852348', whatsapp: '96171852348', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_dawana', name: 'صيدلية دوانا', category: Category.PHARMACY, phone: '+96181537417', whatsapp: '96181537417', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_sayyed', name: 'صيدلية الحاج أشرف السيد', category: Category.PHARMACY, phone: '+9613244632', whatsapp: '9613244632', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'ph_balsam_clinics', name: 'العيادات الخارجية / مستشفى بلسم', category: Category.PHARMACY, phone: '+96181992156', whatsapp: '96181992156', address: 'مخيم الرشيدية', isOpen: true },

  // --- المطاعم ---
  { id: 'res_saeed', name: 'مطعم سعيد', category: Category.RESTAURANT, phone: '+96171260348', whatsapp: '96171260348', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_balsam', name: 'مطعم بلسم', category: Category.RESTAURANT, phone: '+96170624488', whatsapp: '96170624488', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_hisham', name: 'مطعم هشام خواص للفول', category: Category.RESTAURANT, phone: '+96170099351', whatsapp: '96170099351', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_nakha', name: 'مطعم النكهة حارة نحف', category: Category.RESTAURANT, phone: '+96181140161', whatsapp: '96181140161', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_khal_res', name: 'مطعم مشاوي ملحمة الخال', category: Category.RESTAURANT, phone: '+9613029810', whatsapp: '9613029810', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_amana', name: 'مطعم الأمانة عبد الله قاسم', category: Category.RESTAURANT, phone: '+96181017083', whatsapp: '96181017083', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_zahab', name: 'مطعم ابو الذهب', category: Category.RESTAURANT, phone: '+96176855400', whatsapp: '96176855400', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_samer_res', name: 'مطعم سامر أشعب مشاوي', category: Category.RESTAURANT, phone: '+96181936883', whatsapp: '96181936883', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_daaboul', name: 'مطعم الدعبول', category: Category.RESTAURANT, phone: '+96170976842', whatsapp: '96170976842', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_taan', name: 'مطعم طعان للفول', category: Category.RESTAURANT, phone: '+9613398427', whatsapp: '9613398427', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_abuali_pizza', name: 'فلافل ابو علي البيتزا', category: Category.RESTAURANT, phone: '+96181602588', whatsapp: '96181602588', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_walid', name: 'فلافل وليد حمزة ابو خالد', category: Category.RESTAURANT, phone: '+96170088236', whatsapp: '96170088236', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_sweets_saeed', name: 'حلويات السعيد', category: Category.RESTAURANT, phone: '+96181614250', whatsapp: '96181614250', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'res_sweets_abd', name: 'حلويات عبد أشعب', category: Category.RESTAURANT, phone: '+96176653025', whatsapp: '96176653025', address: 'مخيم الرشيدية', isOpen: true },

  // --- دليفري ---
  { id: 'del_abd_hussein', name: 'عبدالله الحسين', category: Category.DELIVERY, phone: '+96181293996', whatsapp: '96181293996', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_hisham', name: 'دليفري هشام الزيني', category: Category.DELIVERY, phone: '+96176950285', whatsapp: '96176950285', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_ibrahim', name: 'دليفري ابراهيم زمزم', category: Category.DELIVERY, phone: '+96176951402', whatsapp: '96176951402', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_ismail', name: 'دليفري اسماعيل قاسم', category: Category.DELIVERY, phone: '+96171185687', whatsapp: '96171185687', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_ezz', name: 'دليفري عزالدين قاسم', category: Category.DELIVERY, phone: '+96181334397', whatsapp: '96181334397', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_mahmoud', name: 'دليفري محمود قاسم', category: Category.DELIVERY, phone: '+96176117281', whatsapp: '96176117281', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_rashid', name: 'دليفري محمد ابو رشيد', category: Category.DELIVERY, phone: '+96176665279', whatsapp: '96176665279', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_omar', name: 'دليفري عمر هشوم', category: Category.DELIVERY, phone: '+96181821900', whatsapp: '96181821900', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_azzam', name: 'دليفري العزام', category: Category.DELIVERY, phone: '+96171727781', whatsapp: '96171727781', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_hadi', name: 'دليفري ابو هادي', category: Category.DELIVERY, phone: '+9613460175', whatsapp: '9613460175', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_arid', name: 'دليفري محمد العريض', category: Category.DELIVERY, phone: '+96176748248', whatsapp: '96176748248', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_ayman', name: 'دليفري أيمن حمود', category: Category.DELIVERY, phone: '+96170010684', whatsapp: '96170010684', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_sahm', name: 'دليفري السهم', category: Category.DELIVERY, phone: '+96178910672', whatsapp: '96178910672', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_amir', name: 'دليفري الأمير', category: Category.DELIVERY, phone: '+9613169107', whatsapp: '9613169107', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_youssef', name: 'دليفري يوسف العلي', category: Category.DELIVERY, phone: '+96179043852', whatsapp: '96179043852', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'del_mario', name: 'دليفري ماريو', category: Category.DELIVERY, phone: '+96181667234', whatsapp: '96181667234', address: 'مخيم الرشيدية', isOpen: true },

  // --- أفران ---
  { id: 'bak_zaatar', name: 'فرن زعتر وزيت (حطب)', category: Category.BAKERY, phone: '+96181720812', whatsapp: '96181720812', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_abuali', name: 'فرن ابو علي', category: Category.BAKERY, phone: '+96178891794', whatsapp: '96178891794', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_safadi', name: 'فرن ابو عمر الصفدي', category: Category.BAKERY, phone: '+96171517800', whatsapp: '96171517800', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_saadi', name: 'فرن عمر السعدي', category: Category.BAKERY, phone: '+9613812423', whatsapp: '9613812423', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_farhat', name: 'فرن مصطفى فرحات', category: Category.BAKERY, phone: '+96181760537', whatsapp: '96181760537', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_family_bak', name: 'فرن العائلة', category: Category.BAKERY, phone: '+96176766045', whatsapp: '96176766045', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_khaled_bak', name: 'فرن خالد السوري', category: Category.BAKERY, phone: '+96170751693', whatsapp: '96170751693', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_ahmad_osama', name: 'فرن احمد اسامة', category: Category.BAKERY, phone: '+96178896381', whatsapp: '96178896381', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_samer_bak', name: 'فرن سامر', category: Category.BAKERY, phone: '+96176863834', whatsapp: '96176863834', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_kassab', name: 'فرن احمد كساب', category: Category.BAKERY, phone: '+96181109680', whatsapp: '96181109680', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_tayea', name: 'فرن عمر الطايع', category: Category.BAKERY, phone: '+96176636123', whatsapp: '96176636123', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_qamar', name: 'صاج القمر', category: Category.BAKERY, phone: '+96170343079', whatsapp: '96170343079', address: 'مخيم الرشيدية', isOpen: true },
  { id: 'bak_abujoud', name: 'مناقيش أبو الجود', category: Category.BAKERY, phone: '+96181569357', whatsapp: '96181569357', address: 'مخيم الرشيدية', isOpen: true }
];

export const CATEGORIES_LIST = [
  Category.PHARMACY,
  Category.RESTAURANT,
  Category.DENTIST,
  Category.BAKERY,
  Category.DELIVERY,
  Category.BUTCHER,
  Category.WATER_STATION,
  Category.SHOE_STORE,
  Category.POULTRY,
  Category.ICE_CREAM,
  Category.INTERNET,
  Category.LAUNDRY,
  Category.CARPENTER,
  Category.ALUMINUM,
  Category.HOSPITALS,
  Category.INSTITUTION
];