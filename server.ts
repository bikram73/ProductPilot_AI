import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory LRU cache to prevent burning API quotas
const apiCache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

function getCached(key: string) {
  const item = apiCache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    apiCache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key: string, data: any) {
  if (apiCache.size > 500) {
    const firstKey = apiCache.keys().next().value;
    if (firstKey) apiCache.delete(firstKey);
  }
  apiCache.set(key, { timestamp: Date.now(), data });
}

// Cooldown tracker for rate-limited models
let rateLimitUntil = 0;

// Initialize Gemini SDK with User-Agent header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
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
  if (Date.now() < rateLimitUntil) {
    throw new Error('In rate-limit cooldown, using heuristic fallback');
  }

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
      if (err?.status === 'RESOURCE_EXHAUSTED' || err?.code === 429 || err?.message?.includes('429')) {
        rateLimitUntil = Date.now() + 20000; // 20s cooldown
      }
    }
  }
  throw new Error('Gemini API unavailable or quota reached');
}

// Fallback heuristics for preference extraction
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

// API Endpoint 1: Extract Preferences from Natural Language Query
app.post('/api/gemini/extract-preferences', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  const cacheKey = `extract_${query.trim().toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const fallback = extractPreferencesHeuristically(query);
  const ai = getGeminiClient();
  if (!ai) {
    setCache(cacheKey, fallback);
    return res.json(fallback);
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
    const result = {
      category: parsed.category || fallback.category,
      budget: parsed.budget || fallback.budget,
      brand: parsed.brand || fallback.brand,
      purpose: parsed.purpose || fallback.purpose,
      features: (parsed.features && parsed.features.length > 0) ? parsed.features : fallback.features,
      rawQuery: query,
    };
    setCache(cacheKey, result);
    return res.json(result);
  } catch (_e) {
    setCache(cacheKey, fallback);
    return res.json(fallback);
  }
});

// API Endpoint 2: Explain Recommendation & Buying Advice
app.post('/api/gemini/explain-recommendations', async (req, res) => {
  const { userQuery, preferences, topProducts } = req.body;
  const topIds = (topProducts || []).map((p: any) => p.id).join(',');
  const cacheKey = `explain_${(userQuery || '').trim().toLowerCase()}_${topIds}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

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
    setCache(cacheKey, defaultAdvice);
    return res.json(defaultAdvice);
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
    setCache(cacheKey, parsed);
    return res.json(parsed);
  } catch (_e) {
    setCache(cacheKey, defaultAdvice);
    return res.json(defaultAdvice);
  }
});

// API Endpoint 3: Cold Start Follow-up Questions
app.post('/api/gemini/cold-start', async (req, res) => {
  const { prompt } = req.body;
  const cacheKey = `cold_${(prompt || '').trim().toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const defaultQuestions = {
    questions: [
      "What is your target budget limit?",
      "What primary use case or purpose do you have in mind?",
      "Are there any specific required features (e.g. noise cancellation, battery life, weight)?"
    ]
  };

  const ai = getGeminiClient();
  if (!ai) {
    setCache(cacheKey, defaultQuestions);
    return res.json(defaultQuestions);
  }

  try {
    const response = await generateWithFallback(ai, {
      contents: `The user provided a very vague product query: "${prompt}". Ask up to 3 concise, highly relevant follow-up questions to help narrow down the exact product recommendation.`,
      config: {
        systemInstruction: "Ask at most 3 direct, friendly, high-impact clarifying questions. Output JSON with a 'questions' array of strings.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    setCache(cacheKey, parsed);
    return res.json(parsed);
  } catch (_e) {
    setCache(cacheKey, defaultQuestions);
    return res.json(defaultQuestions);
  }
});

// API Endpoint 4: AI Assistant Copilot
app.post('/api/gemini/assistant', async (req, res) => {
  const { messages, contextProducts } = req.body;
  const lastUserMsg = (messages || []).filter((m: any) => m.sender === 'user').slice(-1)[0]?.text || '';
  const cacheKey = `chat_${lastUserMsg.trim().toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const fallbackReply = {
    reply: "Based on our product catalog, our top picks offer class-leading performance, optimal battery runtime, and proven user satisfaction. Let me know if you want a detailed spec comparison!"
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json(fallbackReply);
  }

  try {
    const systemInstruction = `You are ProductPilot AI, an intelligent, objective product recommendation assistant.
Available products in catalog:
${JSON.stringify((contextProducts || []).map((p: any) => ({ id: p.id, name: p.name, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons, category: p.category })))}

Help the user compare items, understand trade-offs, find budget options, or clarify technical specs.
Be friendly, direct, concise, and helpful. Mention specific product names when relevant.`;

    const formattedContents = (messages || []).map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');

    const response = await generateWithFallback(ai, {
      contents: `Chat history:\n${formattedContents}\nAssistant:`,
      config: {
        systemInstruction,
      },
    });

    const resObj = { reply: response.text };
    setCache(cacheKey, resObj);
    return res.json(resObj);
  } catch (_e) {
    return res.json(fallbackReply);
  }
});

async function startServer() {
  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
