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

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { query } = JSON.parse(event.body || '{}');
    if (!query || typeof query !== 'string') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Query is required' }),
      };
    }

    const ai = getGeminiClient();
    if (!ai) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: null,
          budget: null,
          brand: null,
          purpose: null,
          features: [],
          rawQuery: query,
        }),
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Extract structured product search preferences from this user request: "${query}"`,
      config: {
        systemInstruction: `You are a product recommendation assistant. Extract user preferences from the text.
Return JSON with the following structure:
{
  "category": "Laptops" | "Headphones" | "Smartphones" | "Wearables" | "Audio" | "Cameras" | null,
  "budget": number | null (extracted maximum dollar limit if specified, e.g. $1200 -> 1200),
  "brand": string | null (preferred brand name if specified e.g. "Apple", "Sony"),
  "purpose": string | null (e.g. "Programming", "Gaming", "Travel", "Office", "Photography", "Study"),
  "features": array of strings (e.g. ["Lightweight", "OLED", "ANC", "Long Battery", "4K"])
}
If a field is not specified, set it to null or empty array.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, nullable: true },
            budget: { type: Type.NUMBER, nullable: true },
            brand: { type: Type.STRING, nullable: true },
            purpose: { type: Type.STRING, nullable: true },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed, rawQuery: query }),
    };
  } catch (error: any) {
    console.error('Error in Netlify extract-preferences:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Failed to extract preferences' }),
    };
  }
};
