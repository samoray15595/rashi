import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Search, 
  X, 
  Heart,
  Send,
  Bot,
  Sparkles,
  UserPlus,
  Eye,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  Download,
  LayoutGrid,
  Pill,
  UtensilsCrossed,
  HeartPulse,
  Croissant,
  Building2,
  Truck,
  ShoppingBag,
  Hospital,
  Stethoscope,
  Store,
  Smartphone,
  BookOpen,
  Shirt,
  Zap,
  Hammer,
  Droplets,
  Waves,
  Coffee,
  Trees,
  Flame,
  AlertCircle,
  Megaphone,
  Palette,
  Tag,
  Radio,
  Scissors,
  Wrench,
  Image as ImageIcon
} from 'lucide-react';
import { Category, Business, ChatMessage, Advertisement } from './types';
import { INITIAL_BUSINESSES, CATEGORIES_LIST, ADS_DATA } from './constants';
import { getSmartRecommendation } from './services/geminiService';

const ITEMS_PER_PAGE = 10;
const INITIAL_VISIBLE_CATEGORIES = 6;

const CategoryIcon = ({ category, className = "w-5 h-5" }: { category: Category, className?: string }) => {
  switch (category) {
    case Category.PHARMACY: return <Pill className={className} />;
    case Category.RESTAURANT: return <UtensilsCrossed className={className} />;
    case Category.DENTIST: return <HeartPulse className={className} />;
    case Category.BAKERY: return <Croissant className={className} />;
    case Category.DELIVERY: return <Truck className={className} />;
    case Category.SHOE_STORE: return <ShoppingBag className={className} />;
    case Category.CLOTHING_STORE: return <Shirt className={className} />;
    case Category.CARPENTER: return <Hammer className={className} />;
    case Category.HOSPITALS: return <Hospital className={className} />;
    case Category.NURSE: return <Stethoscope className={className} />;
    case Category.COMMERCIAL_STORES: return <Store className={className} />;
    case Category.PHONE_SERVICES: return <Smartphone className={className} />;
    case Category.SHEIKHS: return <BookOpen className={className} />;
    case Category.ELECTRICITY: return <Zap className={className} />;
    case Category.WATER_STATION: return <Droplets className={className} />;
    case Category.BUTCHER: return <Flame className={className} />;
    case Category.INTERNET: return <Waves className={className} />;
    case Category.AGRICULTURE: return <Trees className={className} />;
    case Category.COFFEE_HOOKAH: return <Coffee className={className} />;
    case Category.INSTITUTION: return <Building2 className={className} />;
    case Category.BARBER_BEAUTY: return <Scissors className={className} />;
    case Category.PLUMBING_TILING: return <Wrench className={className} />;
    default: return <LayoutGrid className={className} />;
  }
};

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.577h.005c6.632 0 12.028-5.398 12.03-12.032.003-3.218-1.251-6.242-3.535-8.524"/>
  </svg>
);

const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
  </svg>
);

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'الكل' | 'المفضلة'>('الكل');
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visitCount, setVisitCount] = useState<number>(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showChatCloud, setShowChatCloud] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const listTopRef = useRef<HTMLDivElement>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rashidiya_favs_v27');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const fullCategoriesList = useMemo(() => ['الكل', 'المفضلة', ...CATEGORIES_LIST], []);
  const visibleCategories = useMemo(() => {
    if (isCategoriesExpanded) return fullCategoriesList;
    return fullCategoriesList.slice(0, INITIAL_VISIBLE_CATEGORIES);
  }, [isCategoriesExpanded, fullCategoriesList]);

  // منطق التثبيت
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // معالجة الإعلانات للتحقق من انتهاء الصلاحية (3 أيام)
  const processedAds = useMemo(() => {
    const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();

    return ADS_DATA.map(ad => {
      // استثناء الإعلان رقم 2
      if (ad.id === 2) return ad;

      // التحقق من انتهاء الصلاحية إذا كان هناك تاريخ بدء
      if (ad.startDate) {
        const startTime = new Date(ad.startDate).getTime();
        if (now - startTime > THREE_DAYS_MS) {
          return {
            ...ad,
            title: `مساحة إعلانية شاغرة ${ad.id}`,
            description: 'تواصل معنا لحجز هذا المكان وتطوير عملك.',
            imageUrl: '',
            link: 'https://wa.me/966531354751'
          };
        }
      }
      return ad;
    });
  }, []);

  useEffect(() => {
    const updateVisitCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/hit/rashidiya-guide-ibtesam-v1/visits');
        const data = await response.json();
        setVisitCount(data.value || 1978);
      } catch (error) {
        const localViews = localStorage.getItem('fallback_views') || "1978";
        const newViews = parseInt(localViews) + 1;
        localStorage.setItem('fallback_views', newViews.toString());
        setVisitCount(newViews);
      }
    };
    updateVisitCount();
  }, []);

  useEffect(() => {
    localStorage.setItem('rashidiya_favs_v27', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const allFilteredBusinesses = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return INITIAL_BUSINESSES.filter(biz => {
      const matchesSearch = biz.name.toLowerCase().includes(lowerSearch) || 
                           biz.address.toLowerCase().includes(lowerSearch);
      if (activeCategory === 'الكل') return matchesSearch;
      if (activeCategory === 'المفضلة') return favorites.includes(biz.id) && matchesSearch;
      return biz.category === activeCategory && matchesSearch;
    }).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [activeCategory, searchTerm, favorites]);

  const currentBusinesses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allFilteredBusinesses.slice(start, start + ITEMS_PER_PAGE);
  }, [allFilteredBusinesses, currentPage]);

  const totalPages = Math.ceil(allFilteredBusinesses.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const msg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setUserInput('');
    setIsTyping(true);
    const aiResponse = await getSmartRecommendation(msg, INITIAL_BUSINESSES);
    setIsTyping(false);
    setChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'دليل مخيم الرشيدية الذكي',
          text: 'كل أرقام المخيم بمكان واحد - تصميم ابتسام ديب',
          url: window.location.href,
        });
      } catch (err) { console.log(err); }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-['Cairo']">
      {/* Header */}
      <header className="bg-[#020617] p-4 flex flex-col gap-4 border-b border-slate-900 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
             <div className="bg-[#5346e0] p-2.5 rounded-2xl shadow-lg shadow-indigo-600/30">
               <Phone className="w-6 h-6 text-white" />
             </div>
             <div>
               <h1 className="text-[15px] font-black text-white leading-tight">دليل مخيم الرشيدية الذكي</h1>
               <p className="text-[10px] text-indigo-400 font-bold">صمم بواسطة ابتسام احمد ديب</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            {deferredPrompt && (
              <button onClick={handleInstallClick} className="bg-emerald-600/20 p-2.5 rounded-xl text-emerald-500 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors animate-pulse">
                <Download className="w-6 h-6" />
              </button>
            )}
            
            <div className="relative flex items-center">
              {/* Smart Assistant Cloud Prompt - Repositioned and Shortened with new text */}
              {showChatCloud && !isChatOpen && (
                <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+12px)] bg-white text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black shadow-[0_8px_25px_rgba(255,255,255,0.15)] whitespace-nowrap z-50 animate-pulse border border-slate-200">
                  محتاج مساعدة؟ احكيني
                  {/* Arrow Pointing Left (towards the bot icon) */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2.5 h-2.5 bg-white rotate-45 border-l border-b border-slate-200"></div>
                </div>
              )}
              <button onClick={() => { setIsChatOpen(true); setShowChatCloud(false); }} className="bg-slate-800/40 p-2.5 rounded-xl text-[#5346e0] border border-slate-700/30 hover:bg-slate-800 transition-colors relative z-10">
                <Bot className="w-6 h-6" />
              </button>
            </div>

            <button onClick={handleShare} className="bg-slate-800/40 p-2.5 rounded-xl text-slate-400 border border-slate-700/30 hover:bg-slate-800 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <a href="https://wa.me/966531354751" target="_blank" className="w-full bg-[#5346e0] hover:bg-[#4338ca] text-white font-black text-[14px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]">
             <UserPlus className="w-5 h-5" /> أضفني على التطبيق
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 flex-1 py-6">
        {/* Search */}
        <div className="relative mb-6" ref={listTopRef}>
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" placeholder="ابحث عن ممرض، صيدلية، مطعم..."
            className="w-full bg-[#0f172a] border border-slate-800/80 rounded-2xl py-4.5 pr-12 pl-4 outline-none focus:border-[#5346e0]/50 transition-all text-sm font-semibold text-white placeholder:text-slate-600"
            value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>

        {/* Categories Grid - Collapsible */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 transition-all duration-300">
            {visibleCategories.map(cat => (
              <button
                key={cat} onClick={() => { setActiveCategory(cat as any); setCurrentPage(1); }}
                className={`px-4 py-2.5 rounded-xl text-[11px] font-black border transition-all ${
                  activeCategory === cat ? 'bg-[#5346e0] border-indigo-500 text-white shadow-lg' : 'bg-[#1e293b]/40 border-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
              className="px-4 py-2.5 rounded-xl text-[11px] font-black border bg-[#5346e0]/10 border-[#5346e0]/30 text-[#5346e0] hover:bg-[#5346e0]/20 flex items-center gap-1.5 transition-all"
            >
              {isCategoriesExpanded ? (
                <>إغلاق <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>المزيد <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>

        {/* Custom Static Banner (Design Services Image) */}
        <div className="mb-4 w-full rounded-[2.5rem] overflow-hidden relative shadow-2xl group transition-transform active:scale-[0.98]">
           <a href="https://wa.me/966531354751" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://i.postimg.cc/508Zkpj8/Picsart-26-02-11-22-17-30-658.jpg" 
                alt="ابتسام أحمد ديب لخدمات التصميم" 
                className="w-full h-auto object-cover block"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
           </a>
        </div>

        {/* Moving Thank You Marquee - Faster & Looping */}
        <div className="mb-2 bg-indigo-500/5 border-y border-indigo-500/10 py-2.5 relative overflow-hidden rounded-2xl shadow-sm">
           <div className="marquee-container">
             <div className="animate-marquee-fast flex items-center gap-20 text-[11px] font-black text-slate-300">
               {[1, 2].map((loop) => (
                 <React.Fragment key={loop}>
                   <span className="flex items-center gap-3 shrink-0">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      شكر خاص للحاج <span className="text-indigo-400">زياد أسعد</span> على مجهوداته في تجميع الأرقام لخدمة أهالينا
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                   </span>
                   <span className="flex items-center gap-3 shrink-0">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      نقدر عالياً مساهمة الحاج <span className="text-indigo-400">زياد أسعد</span> في هذا الدليل الذكي لمخيم الرشيدية
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                   </span>
                 </React.Fragment>
               ))}
             </div>
           </div>
        </div>

        {/* Thin Religious News Ticker Bar - Looping */}
        <div className="mb-8 bg-[#0f172a]/40 border-b border-slate-800/80 py-2 relative overflow-hidden rounded-b-2xl shadow-sm">
          <div className="marquee-container">
            <div className="animate-marquee flex items-center gap-16 text-[12px] font-black text-indigo-100">
              {[1, 2].map((loop) => (
                <React.Fragment key={loop}>
                  <span className="flex items-center gap-2 shrink-0">🌙 رمضان مبارك أعاننا الله على صيامه وقيامه</span>
                  <span className="flex items-center gap-2 shrink-0">📿 لا تنسى أبداً ذكر الله والصلاة على الرسول</span>
                  <span className="flex items-center gap-2 shrink-0">✨ لا إله إلا أنت سبحانك إني كنت من الظالمين</span>
                  <span className="flex items-center gap-2 shrink-0">🤲 أستغفرك ربي وأتوب إليك</span>
                  <span className="flex items-center gap-2 shrink-0">⚔️ لا حول ولا قوة إلا بالله العلي العظيم</span>
                  <span className="flex items-center gap-2 shrink-0">☝️ الله أكبر</span>
                  <span className="flex items-center gap-2 shrink-0">📜 لا إله إلا الله وحده لا شريك له</span>
                  <span className="flex items-center gap-2 shrink-0">💚 اللهم صل وبارك على سيدنا محمد</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Buy & Sell WhatsApp Group Banner */}
        <div className="mb-6 px-0.5">
           <a href="https://chat.whatsapp.com/EMRZxPMYNZR061GAdKCBRv?mode=gi_c" target="_blank" rel="noopener noreferrer" 
              className="block w-full rounded-[2.5rem] overflow-hidden relative shadow-xl hover:scale-[1.01] transition-all group active:scale-95 border border-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 opacity-95"></div>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-right">
                  <div className="bg-white/20 p-3.5 rounded-3xl backdrop-blur-md shadow-inner border border-white/10 shrink-0">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight mb-1">جروب بيع وشراء</h3>
                    <p className="text-emerald-50 text-[11px] font-bold opacity-90 leading-relaxed">داخل مخيم الرشيدية وخارجه.. انضم لعائلتنا التجارية الآن</p>
                  </div>
                </div>
                <div className="bg-white text-emerald-700 px-8 py-3.5 rounded-2xl font-black text-[14px] shadow-lg group-hover:bg-green-50 transition-all flex items-center gap-2 shrink-0 active:scale-90">
                  <UserPlus className="w-4 h-4" /> انضم الآن
                </div>
              </div>
           </a>
        </div>

        {/* 10 Numbered Ads Horizontal Scroller with Expiration Logic */}
        <div className="mb-10">
          <div className="flex overflow-x-auto gap-4 pb-4 px-0.5 scrollbar-hide snap-x snap-mandatory">
            {processedAds.map((ad) => (
              <a 
                key={ad.id}
                href={ad.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[85%] sm:w-[350px] snap-center rounded-[2.5rem] overflow-hidden relative shadow-lg active:scale-95 transition-all border border-slate-800 h-[220px] flex items-center"
              >
                {/* Image Background */}
                {ad.imageUrl ? (
                  <img src={ad.imageUrl} alt={ad.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#0f172a] opacity-95"></div>
                )}
                
                {/* Conditional Overlay and Text: Only show text if NO image is present */}
                {!ad.imageUrl ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
                    <div className="relative z-10 p-7 flex flex-col gap-4 w-full">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
                          <Tag className="w-6 h-6 text-indigo-400" />
                        </div>
                        <span className="text-[12px] font-black text-indigo-300 uppercase tracking-widest drop-shadow-md">مساحة إعلانية</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-[18px] font-black text-white leading-snug drop-shadow-lg">{ad.title}</h4>
                        <p className="text-[11px] text-slate-100 font-bold leading-relaxed opacity-90 drop-shadow-md">
                          {ad.description}
                        </p>
                      </div>
                      
                      <div className="mt-2 flex items-center gap-2 text-indigo-300 font-black text-[12px] drop-shadow-md">
                        <WhatsAppIcon className="w-4 h-4" /> اضغط هنا للتواصل
                      </div>
                    </div>
                  </>
                ) : null}
                
                {/* Number Badge - Always keep for slot identification, but make it clean */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-[14px] shadow-lg border border-white/20 z-20">
                  {ad.id}
                </div>
              </a>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-2 opacity-30">
             {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>)}
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid gap-6 mb-12">
          {currentBusinesses.map(biz => (
            <div key={biz.id} className={`p-6 rounded-[2.5rem] bg-[#0f172a] border transition-all duration-300 hover:border-indigo-500/30 ${biz.isPinned ? 'border-[#5346e0]/30 shadow-indigo-600/5' : 'border-slate-800'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-3xl flex items-center justify-center relative transition-all ${biz.isPinned ? 'bg-[#5346e0]/10 text-[#5346e0]' : 'bg-slate-800/50 text-slate-500'}`}>
                    <CategoryIcon category={biz.category} className="w-7 h-7" />
                    {biz.isPinned && <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />}
                  </div>
                  <div>
                    <span className="text-[9px] text-[#5346e0] font-black uppercase mb-1 block tracking-wider">{biz.category}</span>
                    <h3 className="text-[17px] font-black text-white leading-tight mb-2">{biz.name}</h3>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-bold"><MapPin className="w-3.5 h-3.5" /> {biz.address}</p>
                  </div>
                </div>
                <button onClick={() => setFavorites(f => f.includes(biz.id) ? f.filter(id => id !== biz.id) : [...f, biz.id])} className="p-2 hover:scale-110 transition-transform">
                  <Heart className={`w-6 h-6 transition-all ${favorites.includes(biz.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${biz.phone}`} className="flex-1 min-w-[120px] bg-[#5346e0] hover:bg-[#4338ca] text-white py-5 rounded-[1.5rem] text-[15px] font-black flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-xl shadow-indigo-600/10">
                  <Phone className="w-6 h-6" strokeWidth={3} /> اتصال
                </a>
                {biz.tiktok && (
                  <a href={biz.tiktok} target="_blank" className="flex-1 min-w-[120px] bg-white hover:bg-slate-100 text-black py-5 rounded-[1.5rem] text-[15px] font-black flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg">
                    <TikTokIcon className="w-6 h-6" /> تيكتوك
                  </a>
                )}
                <a href={`https://wa.me/${biz.whatsapp?.replace(/\D/g, '')}`} target="_blank" className="flex-[1.5] min-w-[140px] bg-green-600/10 text-green-500 border border-green-600/20 hover:bg-green-600/20 py-5 rounded-[1.5rem] text-[15px] font-black flex items-center justify-center gap-2.5 transition-all active:scale-95">
                  <WhatsAppIcon className="w-6 h-6" /> واتساب
                </a>
                {biz.whatsappChannel && (
                  <a href={biz.whatsappChannel} target="_blank" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5.5 rounded-[1.5rem] text-[15px] font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-emerald-500/20 mt-1">
                    <Radio className="w-6 h-6" strokeWidth={3} /> انضم لقناتي على الواتساب
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 mb-20 flex flex-col items-center gap-6">
             <div className="flex items-center justify-between gap-4 w-full max-w-sm">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 disabled:opacity-20 active:scale-95 transition-all shadow-md"
                >
                  <ChevronRight className="w-5 h-5" /> السابق
                </button>
                
                <div className="text-sm font-black text-slate-400 bg-slate-900 border border-slate-800 px-8 py-5 rounded-2xl shadow-inner text-center min-w-[100px]">
                   {currentPage} من {totalPages}
                </div>
                
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  className="flex-1 bg-[#5346e0] hover:bg-[#4338ca] text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 disabled:opacity-20 active:scale-95 transition-all"
                >
                  التالي <ChevronLeft className="w-5 h-5" />
                </button>
             </div>
          </div>
        )}
      </main>

      <footer className="py-12 text-center px-6 bg-[#020617] relative z-10 border-t border-slate-900/50">
        <p className="text-slate-300 text-[14px] font-black mb-6 leading-relaxed max-w-xs mx-auto opacity-90">صمم هذا التطبيق لمساعدة اهل المخيم بواسطة ابتسام احمد ديب</p>
        <div className="flex items-center justify-center gap-2 text-[#5346e0] font-black text-[12px] mb-8 bg-[#5346e0]/5 w-fit mx-auto px-6 py-3.5 rounded-full border border-indigo-400/10 shadow-sm transition-all hover:bg-[#5346e0]/10">
          <Eye className="w-4 h-4" /> 
          عدد المشاهدات: {visitCount > 0 ? visitCount.toLocaleString() : 'جاري التحميل...'}
        </div>
        <p className="text-slate-600 text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">جميع الحقوق محفوظة لابتسام ديب © 2026</p>
      </footer>

      {/* Chat رشيد */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col sm:max-w-md sm:mr-auto border-r border-slate-800 animate-in slide-in-from-right duration-500 shadow-2xl">
          <div className="p-6 bg-[#0f172a] border-b border-slate-800 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3 text-[#5346e0]">
              <div className="bg-[#5346e0]/10 p-2 rounded-xl">
                <Bot className="w-6 h-6" />
              </div>
              <span className="font-black text-[17px] text-white">المساعد الذكي</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-3 hover:bg-slate-800 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#020617] to-[#0f172a]">
             <div className="bg-[#1e293b]/50 border border-slate-800 p-6 rounded-[2.2rem] rounded-tr-none text-[13px] font-bold text-slate-300 leading-relaxed shadow-sm">
                يا هلا بيك! أنا مساعدك الذكي في مخيم الرشيدية. اسألني عن أي خدمة بدك إياها بالمخيم وأنا بدلك فوراً على الأرقام الموجودة عنا. كيف بقدر أخدمك اليوم؟
             </div>
             {chatMessages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[85%] p-5 rounded-[2.2rem] text-[13px] font-bold shadow-md ${m.role === 'user' ? 'bg-[#5346e0] text-white rounded-tl-none' : 'bg-[#0f172a] border border-slate-800 text-slate-100 rounded-tr-none'}`}>
                   {m.text}
                 </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex items-center gap-2 text-[#5346e0] text-[11px] font-black animate-pulse px-2">
                 <Sparkles className="w-4 h-4" /> جاري البحث عن طلبك...
               </div>
             )}
             <div ref={chatEndRef} />
          </div>
          <div className="p-6 bg-[#0f172a] border-t border-slate-800 flex gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
            <input 
              className="flex-1 bg-slate-800/80 px-5 py-4.5 rounded-2xl text-[13px] font-bold outline-none text-white focus:ring-2 ring-[#5346e0]/40 border border-slate-700 transition-all placeholder:text-slate-500"
              placeholder="اكتب طلبك هنا..." value={userInput} onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="bg-[#5346e0] p-4.5 rounded-2xl text-white shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"><Send className="w-6 h-6" /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;