import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Search, 
  X, 
  Heart,
  Send,
  Share2,
  CheckCircle2,
  Download,
  Bot,
  Sparkles,
  UserPlus,
  Eye,
  ChevronRight,
  ChevronLeft,
  Pill,
  UtensilsCrossed,
  HeartPulse,
  Croissant,
  Building2,
  Truck,
  Drumstick,
  ShoppingBag,
  Droplets,
  IceCream,
  Globe,
  WashingMachine,
  Hammer,
  Construction,
  Hospital,
  Leaf,
  Coffee,
  Palette,
  Stethoscope,
  Cake,
  Store,
  Smartphone,
  BookOpen,
  Award,
  Shirt
} from 'lucide-react';
import { Category, Business, ChatMessage } from './types';
import { INITIAL_BUSINESSES, CATEGORIES_LIST } from './constants';
import { getSmartRecommendation } from './services/geminiService';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const ITEMS_PER_PAGE = 10;

const CategoryIcon = ({ category, className = "w-6 h-6" }: { category: Category, className?: string }) => {
  switch (category) {
    case Category.PHARMACY: return <Pill className={className} />;
    case Category.RESTAURANT: return <UtensilsCrossed className={className} />;
    case Category.DENTIST: return <HeartPulse className={className} />;
    case Category.BAKERY: return <Croissant className={className} />;
    case Category.INSTITUTION: return <Building2 className={className} />;
    case Category.DELIVERY: return <Truck className={className} />;
    case Category.BUTCHER: return <Drumstick className={className} />;
    case Category.SHOE_STORE: return <ShoppingBag className={className} />;
    case Category.CLOTHING_STORE: return <Shirt className={className} />;
    case Category.WATER_STATION: return <Droplets className={className} />;
    case Category.POULTRY: return <Drumstick className={className} />;
    case Category.ICE_CREAM: return <IceCream className={className} />;
    case Category.INTERNET: return <Globe className={className} />;
    case Category.LAUNDRY: return <WashingMachine className={className} />;
    case Category.CARPENTER: return <Hammer className={className} />;
    case Category.ALUMINUM: return <Construction className={className} />;
    case Category.HOSPITALS: return <Hospital className={className} />;
    case Category.AGRICULTURE: return <Leaf className={className} />;
    case Category.COFFEE_HOOKAH: return <Coffee className={className} />;
    case Category.NURSE: return <Stethoscope className={className} />;
    case Category.COCKTAILS_SWEETS: return <Cake className={className} />;
    case Category.COMMERCIAL_STORES: return <Store className={className} />;
    case Category.PHONE_SERVICES: return <Smartphone className={className} />;
    case Category.SHEIKHS: return <BookOpen className={className} />;
    default: return <Building2 className={className} />;
  }
};

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.602 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.577h.005c6.632 0 12.028-5.398 12.03-12.032.003-3.218-1.251-6.242-3.535-8.524"/>
  </svg>
);

const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.81-.6-4.03-1.37-.08 3.39-.01 6.77-.01 10.16 0 1.34-.33 2.73-1.05 3.89-.77 1.13-1.93 2.02-3.19 2.53-1.42.59-3.04.74-4.54.44-1.35-.24-2.61-.91-3.61-1.89-1.3-1.24-2.02-3-2.01-4.79 0-1.5.45-3.01 1.35-4.22.94-1.26 2.3-2.18 3.79-2.55.9-.22 1.83-.26 2.75-.12v4.24c-.67-.13-1.38-.09-2.02.12-.8.25-1.51.81-1.93 1.52-.45.71-.63 1.58-.51 2.41.1 1 .6 1.94 1.39 2.57.8.63 1.85.91 2.87.78 1.02-.13 1.96-.75 2.47-1.64.44-.8.58-1.74.58-2.65 0-3.48.02-6.97.02-10.46 0-1.88 0-3.75 0-5.62z"/>
  </svg>
);

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'الكل' | 'المفضلة'>('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const listTopRef = useRef<HTMLDivElement>(null);

  const bannerUrl = "https://cdn.jina.ai/assistant/d8601662-8f9f-4f51-893f-5d0758417c8f/f9642071-881b-43d9-813c-7389025c8681.png";
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rashidiya_favs_v5');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    const savedVisits = localStorage.getItem('rashidiya_visits_v1');
    const initialCount = savedVisits ? parseInt(savedVisits) : 1842;
    const newCount = initialCount + 1;
    localStorage.setItem('rashidiya_visits_v1', newCount.toString());
    setVisitCount(newCount);
  }, []);

  useEffect(() => {
    const isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIphone);
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowInstallModal(true), 5000);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') console.log('Install accepted');
      setDeferredPrompt(null);
      setShowInstallModal(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('rashidiya_favs_v5', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const allFilteredBusinesses = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const baseList = INITIAL_BUSINESSES.filter(biz => {
      const matchesSearch = biz.name.toLowerCase().includes(lowerSearch) || 
                           biz.address.toLowerCase().includes(lowerSearch);
      if (activeCategory === 'الكل') return matchesSearch;
      if (activeCategory === 'المفضلة') return favorites.includes(biz.id) && matchesSearch;
      return biz.category === activeCategory && matchesSearch;
    });
    return [...baseList].sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
  }, [activeCategory, searchTerm, favorites]);

  const totalPages = Math.ceil(allFilteredBusinesses.length / ITEMS_PER_PAGE);
  
  const currentBusinesses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allFilteredBusinesses.slice(start, start + ITEMS_PER_PAGE);
  }, [allFilteredBusinesses, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-['Cairo']">
      <header className="sticky top-0 z-40 bg-[#020617]/95 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/30">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-black text-white leading-tight">دليل مخيم الرشيدية الذكي</h1>
              <p className="text-[10px] sm:text-xs text-indigo-400 font-bold tracking-wide">صمم بواسطة ابتسام احمد ديب</p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end items-center">
            <a 
              href="https://wa.me/966531354751" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 border border-indigo-500 rounded-xl text-white hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-xs font-black">أضفني على التطبيق</span>
            </a>
            
            <button 
              onClick={copyURL} 
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all active:scale-95"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsChatOpen(true)} 
              className="bg-indigo-500 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/30 active:scale-95 transition-all hover:bg-indigo-600"
            >
              <Bot className="w-6 h-6 animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full p-4 flex-1">
        <div className="relative mb-6" ref={listTopRef}>
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="ابحث عن ممرض، صيدلية، مطعم..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-indigo-500 transition-all text-sm font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center overflow-x-auto pb-2 scrollbar-hide">
          {['الكل', 'المفضلة', ...CATEGORIES_LIST].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* بنر إعلاني احترافي */}
        <div className="mb-6 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 rounded-[2rem] blur-xl opacity-25 group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:scale-[1.01] group-hover:shadow-indigo-500/10">
            <a 
              href="https://wa.me/966531354751" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative w-full"
            >
              {!imageError ? (
                <div className="aspect-[3/1] w-full relative">
                   <img 
                    src={bannerUrl} 
                    alt="تصاميم ابتسام ديب" 
                    className="w-full h-full object-cover transition-opacity duration-700"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"></div>
                </div>
              ) : (
                <div className="aspect-[3/1] w-full bg-gradient-to-br from-indigo-950 via-indigo-700 to-blue-800 p-8 sm:p-12 flex items-center justify-center text-center overflow-hidden relative">
                   <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-6 gap-8 rotate-12 -translate-y-12">
                      {[...Array(18)].map((_, i) => (
                        <Palette key={i} className="w-16 h-16 text-white" />
                      ))}
                   </div>
                   
                   <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 animate-pulse"></div>
                   <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl -ml-32 -mb-32 animate-pulse [animation-delay:1s]"></div>
                   
                   <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 max-w-2xl">
                      <div className="bg-white/10 p-3 sm:p-5 rounded-[1.5rem] backdrop-blur-md border border-white/20 animate-bounce shadow-xl">
                        <Palette className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-4xl font-black text-white leading-tight drop-shadow-lg">ابتسام أحمد ديب لخدمات التصميم الإبداعية</h2>
                      <p className="text-[10px] sm:text-[15px] text-indigo-100 font-bold bg-black/30 px-5 py-2 rounded-full border border-white/10 shadow-inner">
                        تصميم لوغو، هويات بصرية، وبنرات احترافية لمشروعك أو لمصلحتك
                      </p>
                      <div className="mt-2 sm:mt-4 flex items-center gap-2 bg-white text-indigo-950 px-6 py-3 sm:px-10 sm:py-4 rounded-[1.2rem] font-black text-xs sm:text-sm shadow-2xl transition-all hover:-translate-y-1 active:scale-95">
                        <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        تواصل معنا لبدء مشروعك
                      </div>
                   </div>
                </div>
              )}
            </a>
          </div>
        </div>

        {/* شريط الشكر المتحرك */}
        <div className="mb-10 overflow-hidden bg-white/5 border-y border-white/10 py-3 relative backdrop-blur-sm rounded-xl">
          <div className="animate-marquee flex items-center">
             <span className="text-xs sm:text-sm font-bold text-white/90 mx-4 flex items-center gap-2">
               <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
               شكر خاص للحاج زياد اسعد على مجهوداته المبذولة لتجميع الارقام لمشاركتها معكم في هذا الدليل الذكي
               <Award className="w-4 h-4 text-amber-400" />
             </span>
             <span className="text-xs sm:text-sm font-bold text-white/90 mx-4 flex items-center gap-2">
               <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
               شكر خاص للحاج زياد اسعد على مجهوداته المبذولة لتجميع الارقام لمشاركتها معكم في هذا الدليل الذكي
               <Award className="w-4 h-4 text-amber-400" />
             </span>
             <span className="text-xs sm:text-sm font-bold text-white/90 mx-4 flex items-center gap-2">
               <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
               شكر خاص للحاج زياد اسعد على مجهوداته المبذولة لتجميع الارقام لمشاركتها معكم في هذا الدليل الذكي
               <Award className="w-4 h-4 text-amber-400" />
             </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 min-h-[400px]">
          {currentBusinesses.map(biz => (
            <div 
              key={biz.id} 
              className={`p-5 rounded-2xl bg-slate-900 border transition-all hover:border-slate-700 group flex flex-col justify-between ${biz.isPinned ? 'border-indigo-500/50 bg-indigo-500/5 shadow-xl shadow-indigo-600/5' : 'border-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 relative ${biz.isPinned ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                    <CategoryIcon category={biz.category} />
                    {biz.isPinned && (
                      <div className="absolute -top-1 -right-1 bg-indigo-600 p-1 rounded-full border border-slate-900">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md">{biz.category}</span>
                    <h3 className="text-[15px] font-black text-white mt-1 leading-tight">{biz.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <p className="text-[10px] font-bold">{biz.address}</p>
                    </div>
                  </div>
                </div>
                
                <button onClick={(e) => toggleFavorite(biz.id, e)} className="p-1">
                  <Heart className={`w-5 h-5 transition-all ${favorites.includes(biz.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700 hover:text-slate-600'}`} />
                </button>
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap mt-2">
                <a 
                  href={`tel:${biz.phone}`} 
                  className={`bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all active:scale-95 shadow-lg shadow-indigo-600/20 ${biz.tiktok ? 'flex-[0.7]' : 'flex-1'}`}
                >
                  <Phone className="w-4 h-4" /> اتصال
                </a>

                {biz.tiktok && (
                  <a 
                    href={biz.tiktok} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-slate-100 text-slate-950 hover:bg-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black transition-all active:scale-95 shadow-lg shadow-white/10"
                  >
                    <TikTokIcon className="w-4 h-4" /> تيكتوك
                  </a>
                )}

                <a 
                  href={`https://wa.me/${biz.whatsapp?.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-green-600/10 text-green-500 hover:bg-green-600/20 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black border border-green-600/20 transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" /> واتساب
                </a>
              </div>
            </div>
          ))}
          
          {currentBusinesses.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-900/50 rounded-3xl p-8 border border-dashed border-slate-800">
                <p className="text-slate-500 font-bold">لم يتم العثور على نتائج للبحث الحالي</p>
              </div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-xl flex items-center gap-2 font-black text-xs transition-all border ${
                currentPage === totalPages 
                ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50 cursor-not-allowed' 
                : 'bg-indigo-600 border-indigo-500 text-white active:scale-95 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700'
              }`}
            >
              التالي <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-indigo-400 font-black text-sm">{currentPage}</span>
              <span className="text-slate-600 font-bold text-xs">من</span>
              <span className="text-slate-300 font-black text-sm">{totalPages}</span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-xl flex items-center gap-2 font-black text-xs transition-all border ${
                currentPage === 1 
                ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50 cursor-not-allowed' 
                : 'bg-indigo-600 border-indigo-500 text-white active:scale-95 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700'
              }`}
            >
              <ChevronRight className="w-4 h-4" /> السابق
            </button>
          </div>
        )}
      </main>

      <footer className="mt-12 py-10 border-t border-slate-800 text-center px-4 bg-slate-900/30">
        <p className="text-slate-400 text-sm font-bold leading-relaxed mb-4">
          صمم هذا التطبيق لمساعدة اهل المخيم بواسطة ابتسام احمد ديب
        </p>
        
        <div className="flex items-center justify-center gap-2 mb-4 bg-indigo-500/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-indigo-500/20">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span className="text-[11px] font-black text-indigo-400">عدد المشاهدات:</span>
          <span className="text-xs font-black text-white tabular-nums">{visitCount.toLocaleString()}</span>
        </div>

        <div className="flex justify-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          <span>جميع الحقوق محفوظة لابتسام ديب © 2026</span>
        </div>
      </footer>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col sm:max-w-md sm:mr-auto border-r border-slate-800 animate-in slide-in-from-left duration-300 shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">مساعد الرشيدية الذكي</h3>
                <p className="text-[10px] text-indigo-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> مدعوم بالذكاء الاصطناعي
                </p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-1 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            <div className="flex justify-start">
              <div className="max-w-[85%] p-4 rounded-2xl text-sm font-bold bg-slate-800 text-slate-100 border border-slate-700 leading-relaxed shadow-sm">
                يا هلا بك! أنا المساعد الذكي لدليل الرشيدية. صممتني ابتسام ديب لخدمتكم. <br/>
                تفضل، شو حابب تبحث اليوم؟
              </div>
            </div>
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold shadow-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-100 border border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-slate-800 px-4 py-3 rounded-xl outline-none text-sm font-bold placeholder-slate-600 focus:ring-2 ring-indigo-500/20 transition-all" 
                placeholder="اسألني عن أي مطعم أو خدمة..." 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage} 
                disabled={!userInput.trim() || isTyping}
                className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showCopySuccess && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full font-bold text-xs shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4" /> تم نسخ الرابط بنجاح
        </div>
      )}
    </div>
  );
};

export default App;