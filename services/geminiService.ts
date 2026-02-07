import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    // التأكد من وجود مفتاح API
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "عذراً، يبدو أن مفتاح البرمجة غير متوفر حالياً. يرجى مراجعة الإعدادات.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // تجهيز البيانات لتقديمها للموديل كمرجع
    const contextData = businesses
      .map(b => `- ${b.name} (${b.category}): هاتف ${b.phone}, عنوان: ${b.address}, واتساب: ${b.whatsapp || 'غير متوفر'}`)
      .join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        أنت المساعد الذكي الرسمي لـ "دليل مخيم الرشيدية الشامل"، صممتك المبدعة "ابتسام ديب".
        مهمتك هي مساعدة أهل المخيم في العثور على أرقام الهواتف والخدمات بسرعة وبطريقة ودودة جداً.
        
        استخدم البيانات التالية للإجابة على سؤال المستخدم بدقة:
        ${contextData}
        
        سؤال المستخدم: "${query}"
        
        قواعد الإجابة:
        1. رد بلهجة أهل مخيم الرشيدية المحببة (فلسطينية).
        2. كن ذكياً وقدم اقتراحات إذا لم تجد طلباً دقيقاً.
        3. اذكر اسم المحل والرقم بوضوح تام.
        4. لا تنسى ذكر أنك من تصميم "ابتسام ديب" إذا سُئلت عن هويتك.
      `,
      config: {
        systemInstruction: "أنت مساعد ودود ومبادر من مخيم الرشيدية. هدفك مساعدة الناس في الوصول للخدمات الطبية والتجارية بالمخيم."
      }
    });

    return response.text || "يا هلا بك، جرب تبحث بالاسم في القائمة الرئيسية هلق!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "يا هلا بك يا طيب، صار عندي شوية تشويش بالشبكة. جرب تسألني كمان شوي!";
  }
};
