import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "يا مية أهلاً بك يا غالي.. بعتذر منك كتير، يبدو في مشكلة تقنية بسيطة بمفتاح الخدمة. يا ريت تجرب تبحث بالاسم في القائمة فوق، وأنا بالخدمة دائماً.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // فلترة ذكية لتقليل حجم البيانات المرسلة (إرسال فقط ما له علاقة بكلمات البحث)
    const keywords = query.toLowerCase().split(' ');
    const relevantBusinesses = businesses.filter(b => 
      keywords.some(kw => 
        b.name.toLowerCase().includes(kw) || 
        b.category.toLowerCase().includes(kw) ||
        b.address.toLowerCase().includes(kw)
      )
    ).slice(0, 40); // إرسال أهم 40 نتيجة فقط لضمان سرعة الرد وعدم تعطل الشبكة

    const contextData = relevantBusinesses.length > 0 
      ? relevantBusinesses.map(b => `- ${b.name}: ${b.phone} (${b.category}) في ${b.address}`).join('\n')
      : "لا يوجد نتائج مباشرة، اعتذر بلباقة واطلب منه البحث بالاسم في القائمة.";

    const systemPrompt = `أنت "رشيد"، المساعد الذكي لدليل مخيم الرشيدية. 
    شخصيتك: شاب محترم من المخيم، راقٍ جداً، خدوم، وتتحدث بلهجة أهل الرشيدية المحببة.
    استخدم كلمات مثل: "يا مية أهلاً"، "تكرم عينك"، "على عيني يا طيب"، "آمرني".
    مهمتك: مساعدة المستخدم في إيجاد الأرقام من البيانات المتوفرة فقط.
    قواعد: اذكر الاسم والرقم بوضوح، إذا لم تجد اطلب منه البحث بالاسم فوق في المحرك الرئيسي بكل أدب.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `سؤال المستخدم: ${query}\n\nالبيانات المتاحة:\n${contextData}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return response.text || "تكرم عينك يا غالي، أنا معك.. بس يا ريت تعيد طلبك بوضوح أكتر أو ابحث عن الاسم فوق وما بقصر معك!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // رسالة خطأ راقية في حال تعطل الإنترنت أو الخادم
    return "يا مية أهلاً بك يا طيب.. بعتذر منك ومن ذوقك، يبدو صار عندي ضغط عالي ع السيستم أو مشكلة بالشبكة. جرب تسألني كمان شوي، أو دور بالاسم فوق بالقائمة وأنا بخدمتك من عيوني!";
  }
};