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
  UserPlus
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Category, Business, ChatMessage } from './types';
import { INITIAL_BUSINESSES, CATEGORIES_LIST } from './constants';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rashidiya_favs_v5');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

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

  const getSmartRecommendation = async (query: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contextData = INITIAL_BUSINESSES.map(b => `- ${b.name} (${b.category}): هاتف ${b.phone}, واتساب ${b.whatsapp || 'غير متوفر'}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          أنت المساعد الذكي الرسمي لـ "دليل مخيم الرشيدية"، صممتك "ابتسام ديب".
          مهمتك هي مساعدة أهل المخيم في العثور على ما يحتاجونه من قاعدة البيانات هذه:
          
          ${contextData}
          
          سؤال المستخدم: "${query}"
          رد مودة وذكاء بلهجة أهل المخيم واذكر الأرقام بوضوح.
        `,
        config: {
          systemInstruction: "أنت مساعد ودود بلهجة فلسطينية من مخيم الرشيدية. وظيفتك العثور على الأرقام واقتراح المحلات للمستخدمين. صممتك ابتسام ديب."
        }
      });
      return response.text || "يا هلا بك، جرب تبحث بالاسم في القائمة الرئيسية هلق!";
    } catch (error) {
      return "يا هلا بك يا طيب، صار عندي شوية تشويش. جرب تسألني كمان شوي!";
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

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredBusinesses = useMemo(() => {
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

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const msg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setUserInput('');
    setIsTyping(true);
    const aiResponse = await getSmartRecommendation(msg);
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
        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="ابحث عن صيدلية، مطعم، دكتور..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pr-12 pl-4 outline-none focus:border-indigo-500 transition-all text-sm font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center overflow-x-auto pb-2 scrollbar-hide">
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

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBusinesses.map(biz => (
            <div 
              key={biz.id} 
              className={`p-5 rounded-2xl bg-slate-900 border transition-all hover:border-slate-700 ${biz.isPinned ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-800'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{biz.category}</span>
                  <h3 className="text-base font-bold text-white mt-1 leading-tight">{biz.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <p className="text-[11px] font-medium">{biz.address}</p>
                  </div>
                </div>
                <button onClick={(e) => toggleFavorite(biz.id, e)} className="p-1">
                  <Heart className={`w-5 h-5 transition-all ${favorites.includes(biz.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-700 hover:text-slate-600'}`} />
                </button>
              </div>

              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <a 
                  href={`tel:${biz.phone}`} 
                  className={`bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all active:scale-95 shadow-lg shadow-indigo-600/20 ${biz.tiktok ? 'flex-[0.7]' : 'flex-1'}`}
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
                  className="flex-1 bg-green-600/10 text-green-500 hover:bg-green-600/20 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border border-green-600/20 transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" /> واتساب
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-12 py-10 border-t border-slate-800 text-center px-4">
        <p className="text-slate-400 text-sm font-bold leading-relaxed">
          صمم هذا التطبيق لمساعدة اهل المخيم بواسطة ابتسام احمد ديب
        </p>
        <div className="mt-4 flex justify-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          <span>جميع الحقوق محفوظة لابتسام ديب © 2026</span>
        </div>
      </footer>

      {showInstallModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-black text-white mb-2">ثبّت التطبيق الآن</h2>
              <p className="text-sm text-slate-400 font-bold mb-6">للوصول السريع لكل أرقام مخيم الرشيدية بضغطة واحدة.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowInstallModal(false)} className="flex-1 bg-slate-800 text-slate-400 py-3.5 rounded-2xl font-black text-sm">إلغاء</button>
                {!isIOS && <button onClick={handleInstallClick} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-2xl font-black text-sm">تثبيت الآن</button>}
                {isIOS && <button onClick={() => setShowInstallModal(false)} className="flex-1 bg-indigo-600 text-white py-3.5 rounded-2xl font-black text-sm">فهمت</button>}
              </div>
            </div>
          </div>
        </div>
      )}

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