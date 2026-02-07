
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendation(query: string, availableData: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `المستخدم يسأل: "${query}". 
      البيانات المتاحة لدينا هي: ${availableData}. 
      أجب باللغة العربية بلهجة ودودة ومختصرة. إذا كان السؤال عن رقم هاتف، اذكره بوضوح. 
      إذا لم تجد المعلومة في البيانات المتاحة، اقترح عليه البحث في فئات التطبيق.`,
      config: {
        systemInstruction: "أنت مساعد ذكي لتطبيق دليل هواتف محلي لمخيم الرشيدية. وظيفتك مساعدة المستخدمين في العثور على أرقام الصيدليات والمطاعم والعيادات والمؤسسات."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، واجهت مشكلة في معالجة طلبك. حاول لاحقاً.";
  }
}
