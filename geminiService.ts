import { GoogleGenAI } from "@google/genai";
import { Business } from "./types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "يا هلا بك! حالياً المساعد الذكي عم يرتاح شوي، بس فيك تبحث بالأرقام يدوياً من القائمة. تأكد من إعداد API_KEY في Vercel.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contextData = businesses
      .slice(0, 50) // تقليل حجم البيانات لضمان سرعة الاستجابة
      .map(b => `- ${b.name} (${b.category}): ${b.phone}`)
      .join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `أنت مساعد ذكي لأهل مخيم الرشيدية. صممتك ابتسام ديب. 
      أجب بلهجة المخيم وساعدهم في إيجاد الأرقام من هذه القائمة:
      ${contextData}
      
      سؤال المستخدم: "${query}"`,
      config: {
        systemInstruction: "رد بلهجة فلسطينية ودودة. اذكر اسم المحل والرقم بوضوح. صممتك ابتسام ديب."
      }
    });

    return response.text || "جرب ابحث بالاسم في القائمة الرئيسية هلق!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "يا هلا بك، صار ضغط على الشبكة. فيك تشوف الأرقام مباشرة من القائمة!";
  }
};