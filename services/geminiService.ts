import { GoogleGenAI } from "@google/genai";
import { Business } from "../types";

export const getSmartRecommendation = async (query: string, businesses: Business[]): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "يا هلا بك يا طيب.. بعتذر منك كتير، بس يبدو في مشكلة بمفتاح الخدمة عندي. يا ريت تتواصل مع الإدارة أو تجرب تبحث بالاسم فوق بالقائمة.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // تقليص البيانات المرسلة لتفادي أخطاء الحجم ولزيادة السرعة
    const contextData = businesses
      .map(b => `- ${b.name}: ${b.phone} (${b.category}) في ${b.address}`)
      .slice(0, 200) // التأكد من عدم إرسال بيانات ضخمة تسبب توقف الموديل
      .join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `
              أنت "رشيد"، المساعد الذكي الرسمي لدليل مخيم الرشيدية (تصميم وتطوير ابتسام ديب).
              شخصيتك: ودود جداً، راقٍ في التعامل، خدوم، وتتحدث بلهجة فلسطينية محببة (لهجة أهل مخيم الرشيدية).
              
              البيانات المتوفرة لديك:
              ${contextData}
              
              سؤال المستخدم: "${query}"
              
              قواعد الإجابة:
              1. ابدأ دائماً بترحيب حار وراقٍ (مثلاً: يا مية أهلاً وسهلاً بك، على عيني يا غالي، تكرم عينك).
              2. إذا وجدت المحل المطلوب، اذكر الاسم والرقم والعنوان بوضوح وبأسلوب مهذب.
              3. إذا لم تجد المحل، اعتذر برقي واقترح عليه البحث في القائمة الرئيسية بالاسم.
              4. كن مختصراً ولكن "راعي الأصول" في الكلام.
              5. لا تخرج عن سياق مخيم الرشيدية.
            `
          }]
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "تكرم عينك يا غالي، بس يا ريت تعيد سؤالك أو تبحث عن الاسم مباشرة في الدليل فوق وبخدمك من عيوني!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "يا مية أهلاً بك.. بعتذر منك يا طيب، صار عندي عطل فني بسيط بالسيستم. غليّ قهوتك وجرب تسألني كمان شوي، أو دور بالاسم فوق بالقائمة وما بقصر معك!";
  }
};