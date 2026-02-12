import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "عذراً، مفتاح البرمجة غير متوفر.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // تقليص حجم البيانات المرسلة للموديل لتسريع المعالجة
    const contextData = businesses
      .map(b => `${b.name}|${b.category}|${b.phone}|${b.address}`)
      .join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        دليل مخيم الرشيدية (تصميم ابتسام ديب).
        البيانات:
        ${contextData}
        
        سؤال المستخدم: "${query}"
        
        أجب بلهجة فلسطينية ودودة جداً ومختصرة وسريعة. اذكر الاسم والرقم فوراً.
      `,
      config: {
        systemInstruction: "أنت مساعد سريع جداً لمخيم الرشيدية. هدفك الإجابة فوراً وبأقل عدد من الكلمات مع الحفاظ على الود.",
        // تعطيل التفكير لزيادة السرعة
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "يا هلا بك، ابحث بالاسم في القائمة الرئيسية هلق!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "يا هلا بك، جرب تسألني كمان شوي!";
  }
};