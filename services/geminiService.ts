
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTeamHealth = async (teamData: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `حلل حالة الفريق التالية وقدم ملخصاً صحياً وخطوات تدخل رئيسية بلهجة سودانية قيادية رصينة.
      بيانات الفريق: ${teamData}. 
      اجعل الرد في شكل نقاط نصيحة مركزة. ركز على الجوانب السلوكية والنفسية.`,
      config: {
        temperature: 0.7,
        systemInstruction: "أنت خبير قيادي في بناء الفرق. هدفك هو تقديم رؤى عميقة لمنع انهيار الفريق وتعزيز النمو السلوكي. ركز على الأفعال لا النظريات."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Health Analysis Error:", error);
    return "عذراً، تعذر تحليل حالة الفريق حالياً.";
  }
};

export const getDecisionFeedback = async (scenario: string, decision: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `الموقف: ${scenario}. القرار المتخذ: ${decision}. حلل أثر هذا القرار على هيبة القائد وتماسك الفريق بلهجة سودانية في 3 نقاط مختصرة.`,
      config: { temperature: 0.8 }
    });
    return response.text;
  } catch (error) {
    return "التحليل غير متاح حالياً.";
  }
};

// Added getAICoachAnalysis to resolve missing export error in Mind.tsx
export const getAICoachAnalysis = async (executed: string, escaped: string, lastDecision: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بناءً على سجل الصدق التالي والقرار المتخذ، قدم تحليل كوتشينج سلوكي رصين بلهجة سودانية.
      إنجازات اليوم: ${executed}
      ما تم التهرب منه: ${escaped}
      آخر قرار قيادي: ${lastDecision}
      ركز على تطوير النفس والصدق والخطوات القادمة.`,
      config: {
        temperature: 0.8,
        systemInstruction: "أنت مدرب قيادي خبير (كوتش) متخصص في الفراسة السودانية وبناء الركائز. هدفك هو مساعدة القائد على مواجهة نفسه وتحسين سلوكه القيادي."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Coach Analysis Error:", error);
    return "عذراً، فشل المدرب في تحليل البيانات حالياً.";
  }
};

export const generateLeadershipVision = async (base64Image?: string) => {
  try {
    const prompt = "A futuristic 3D masterpiece of a 'Leadership Artifact' named 'REKAZ'. It should be a fusion of glowing emerald crystal and polished black obsidian. It looks like a high-tech pillar or a gem-encrusted geometric shield. Cinematic lighting, deep green and black tones, ultra-luxurious, 8k resolution, symbolizing stability and vision. Integrate the spirit of a professional network marketing leader logo.";
    
    const parts: any[] = [{ text: prompt }];

    if (base64Image) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: base64Image
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};
