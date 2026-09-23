import { Handler } from '@netlify/functions';
import { GoogleGenAI, Type } from '@google/genai';

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const MODELS_FALLBACK_LIST = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

async function generateWithFallback(ai: GoogleGenAI, params: { contents: string; config?: any }) {
  let lastError: any = null;
  for (const model of MODELS_FALLBACK_LIST) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
    }
  }
  throw lastError || new Error('All models failed');
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { userQuery, preferences, topProducts } = JSON.parse(event.body || '{}');
  const defaultAdvice = {
    summary: topProducts?.[0]
      ? `Based on your criteria, ${topProducts[0].name} is the top match delivering high reliability, strong battery runtime, and premium build quality within your scope.`
      : "Based on your criteria, these products offer the optimal combination of performance, battery life, and overall build quality.",
    buyingTips: [
      "Compare real-world battery endurance under continuous workload.",
      "Check warranty coverage and customer service availability.",
      "Verify port compatibility with your daily peripherals and accessories."
    ],
    thingsToConsider: "Check non-upgradeable specifications before finalizing your purchase.",
    valueWinner: topProducts?.[0]?.name || "Primary recommendation"
  };

  const ai = getGeminiClient();
  if (!ai) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultAdvice),
    };
  }

  try {
    const prompt = `User Request: "${userQuery || ''}"
Extracted Preferences: ${JSON.stringify(preferences || {})}
Top Ranked Products: ${JSON.stringify((topProducts || []).map((p: any) => ({ name: p.name, brand: p.brand, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons })))}

Provide personalized buying advice and explanations for why these products suit the user's requirements.
Output JSON format:
{
  "summary": "2-3 sentences overview explaining why the top choice wins for their explicit need",
  "buyingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "thingsToConsider": "Key trade-off or caution to keep in mind",
  "valueWinner": "Name of product that provides the best value for money"
}`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        systemInstruction: "You are ProductPilot AI, an expert product buying advisor. Provide clear, objective, concise buying advice based on the catalog provided.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            buyingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            thingsToConsider: { type: Type.STRING },
            valueWinner: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultAdvice),
    };
  }
};
