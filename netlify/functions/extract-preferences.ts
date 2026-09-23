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

function extractPreferencesHeuristically(query: string) {
  const lower = query.toLowerCase();
  let category: string | null = null;
  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('notebook')) category = 'Laptops';
  else if (lower.includes('headphone') || lower.includes('earbud') || lower.includes('earphone')) category = 'Headphones';
  else if (lower.includes('phone') || lower.includes('iphone') || lower.includes('samsung') || lower.includes('pixel')) category = 'Smartphones';
  else if (lower.includes('watch') || lower.includes('wearable') || lower.includes('garmin')) category = 'Wearables';
  else if (lower.includes('camera') || lower.includes('dslr') || lower.includes('mirrorless') || lower.includes('photo')) category = 'Cameras';
  else if (lower.includes('audio') || lower.includes('speaker')) category = 'Audio';

  let budget: number | null = null;
  const budgetMatch = query.match(/(?:under|below|less than|\$)\s*(\d{2,5})/i);
  if (budgetMatch && budgetMatch[1]) {
    budget = parseInt(budgetMatch[1], 10);
  }

  let brand: string | null = null;
  const brands = ['Apple', 'Sony', 'Bose', 'Dell', 'Lenovo', 'Samsung', 'Garmin', 'Asus', 'HP'];
  for (const b of brands) {
    if (lower.includes(b.toLowerCase())) {
      brand = b;
      break;
    }
  }

  let purpose: string | null = null;
  if (lower.includes('game') || lower.includes('gaming')) purpose = 'Gaming';
  else if (lower.includes('code') || lower.includes('program') || lower.includes('developer')) purpose = 'Programming';
  else if (lower.includes('travel') || lower.includes('flight') || lower.includes('commute')) purpose = 'Travel';
  else if (lower.includes('office') || lower.includes('work')) purpose = 'Office';
  else if (lower.includes('photo') || lower.includes('video') || lower.includes('editing')) purpose = 'Creative Work';
  else if (lower.includes('study') || lower.includes('student') || lower.includes('college')) purpose = 'Study';

  const features: string[] = [];
  if (lower.includes('lightweight') || lower.includes('light') || lower.includes('portable')) features.push('Lightweight');
  if (lower.includes('battery') || lower.includes('long battery')) features.push('Long Battery');
  if (lower.includes('anc') || lower.includes('noise cancel') || lower.includes('noise-cancelling')) features.push('ANC');
  if (lower.includes('oled') || lower.includes('display') || lower.includes('4k')) features.push('High-Res Display');
  if (lower.includes('rtx') || lower.includes('gpu')) features.push('Dedicated GPU');

  return {
    category,
    budget,
    brand,
    purpose,
    features,
    rawQuery: query,
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { query } = JSON.parse(event.body || '{}');
  if (!query || typeof query !== 'string') {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Query is required' }),
    };
  }

  const fallback = extractPreferencesHeuristically(query);
  const ai = getGeminiClient();
  if (!ai) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallback),
    };
  }

  try {
    const response = await generateWithFallback(ai, {
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
      body: JSON.stringify({
        category: parsed.category || fallback.category,
        budget: parsed.budget || fallback.budget,
        brand: parsed.brand || fallback.brand,
        purpose: parsed.purpose || fallback.purpose,
        features: (parsed.features && parsed.features.length > 0) ? parsed.features : fallback.features,
        rawQuery: query,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallback),
    };
  }
};
