import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "عذراً، مفتاح الربط غير متوفر. يرجى التأكد من الإعدادات.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // إعداد البيانات كمرجع للموديل
    const contextData = businesses
      .slice(0, 100) // لضمان عدم تجاوز حد التوكينز
      .map(b => `- ${b.name} (${b.category}): ${b.phone}, ${b.address}`)
      .join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        أنت مساعد ذكي لدليل مخيم الرشيدية، صممتك "ابتسام ديب".
        استخدم هذه البيانات للإجابة بلهجة أهل الرشيدية الفلسطينية:
        ${contextData}
        
        سؤال المستخدم: "${query}"
        
        رد بوضوح، اذكر الاسم والرقم، وكن ودوداً جداً.
      `,
      config: {
        systemInstruction: "أنت مساعد خدوم من مخيم الرشيدية. هدفك مساعدة الناس في الوصول للأرقام والخدمات."
      }
    });

    return response.text || "يا هلا، جرب تبحث في القائمة الرئيسية!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "يا هلا بك، صار عندي تشويش بسيط. حاول مرة ثانية كمان شوي!";
  }
};