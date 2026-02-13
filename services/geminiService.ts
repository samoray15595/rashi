import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "يا مية أهلاً بك يا طيب.. بعتذر منك، في مشكلة بسيطة بمفتاح الخدمة. يا ريت تبحث بالاسم فوق بالقائمة وأنا بخدمتك.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // تنظيف نص البحث
    const q = query.toLowerCase().trim();
    
    // توسيع نطاق البحث ليشمل كل الاحتمالات (أكل، صحة، خدمات، نقل)
    const keywords = new Set<string>();
    keywords.add(q);
    
    // مرادفات ذكية شاملة لضمان الوصول لكل الأرقام
    if (q.includes('اكل') || q.includes('أكل') || q.includes('جوع') || q.includes('مطعم') || q.includes('سندويش') || q.includes('طلبية')) {
      keywords.add('مطاعم'); keywords.add('ملاحم'); keywords.add('فراريج'); keywords.add('أفران'); keywords.add('دليفري');
    }
    if (q.includes('دوا') || q.includes('مريض') || q.includes('وجع') || q.includes('صيدلية') || q.includes('حكيم') || q.includes('دكتور')) {
      keywords.add('صيدليات'); keywords.add('ممرض'); keywords.add('مستشفيات'); keywords.add('أسنان');
    }
    if (q.includes('نقل') || q.includes('تكسي') || q.includes('تاكسي') || q.includes('مشوار') || q.includes('عفش')) {
      keywords.add('تاكسي'); keywords.add('دليفري');
    }
    if (q.includes('حلاق') || q.includes('شعر') || q.includes('تجميل')) {
      keywords.add('حلاقة');
    }
    if (q.includes('انترنت') || q.includes('نت') || q.includes('واي فاي')) {
      keywords.add('إنترنت');
    }

    // فلترة البيانات بناءً على الكلمات المفتاحية بشكل أعمق
    const filtered = businesses.filter(b => {
      const nameMatch = b.name.toLowerCase().includes(q);
      const catMatch = Array.from(keywords).some(k => b.category.toLowerCase().includes(k));
      const addressMatch = b.address.toLowerCase().includes(q);
      
      // استثناء كلمة "بديوي" إذا كان البحث فقط عن "بدي" بمعنى "أريد"
      if (q === 'بدي' && b.name.includes('بديوي')) return false;
      
      return nameMatch || catMatch || addressMatch;
    });

    // إذا لم يجد نتائج محددة، نعطيه عينة من التصنيفات المشابهة
    const relevantData = filtered.length > 0 ? filtered : businesses.filter(b => b.isPinned).slice(0, 15);

    const contextData = relevantData
      .map(b => `- ${b.name}: ${b.phone} (${b.category}) في ${b.address}`)
      .join('\n');

    const systemPrompt = `أنت "المساعد الذكي" لدليل مخيم الرشيدية. 
    شخصيتك: ابن مخيم محترم جداً، راقٍ في كلامك، وتتحدث بلهجة أهل الرشيدية (يا مية أهلاً، تكرم عينك، من عيوني، على راسي).
    مهمتك: تزويد المستخدم بالأرقام من اللائحة المتوفرة فقط.
    قواعد هامة:
    1. إذا سأل عن "أكل" أو "مطعم"، اعطه كل المطاعم والملاحم والأفران المتوفرة في البيانات.
    2. اذكر الاسم والرقم بوضوح تام.
    3. لا تذكر اسم "رشيد" نهائياً، أنت "المساعد الذكي".
    4. إذا لم تجد طلباً محدداً، اعتذر برقي واطلب منه استخدام محرك البحث بالاسم الموجود في أعلى التطبيق.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        role: 'user',
        parts: [{
          text: `المستخدم يسأل عن: ${query}\n\nالبيانات المتاحة لدينا:\n${contextData}\n\nساعده في العثور على الرقم الصحيح بأسلوبك الراقي.`
        }]
      }],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.5, // تقليل العشوائية لضمان دقة الأرقام
      },
    });

    return response.text || "تكرم عينك يا غالي، جرب ابحث عن الاسم فوق بمحرك البحث وما بقصر معك أبداً!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "يا مية أهلاً بك يا طيب.. بعتذر منك، صار في ضغط بسيط ع الشبكة. جرب تسألني كمان شوي أو ابحث بالاسم فوق وأنا بخدمتك من عيوني.";
  }
};