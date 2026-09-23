import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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

// API Endpoint 1: Extract Preferences from Natural Language Query
app.post('/api/gemini/extract-preferences', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return fallback heuristic extraction if API key is not present
      return res.json({
        category: null,
        budget: null,
        brand: null,
        purpose: null,
        features: [],
        rawQuery: query,
      });
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
    return res.json({ ...parsed, rawQuery: query });
  } catch (error: any) {
    console.error('Error in /api/gemini/extract-preferences:', error);
    return res.status(500).json({ error: error.message || 'Failed to extract preferences' });
  }
});

// API Endpoint 2: Explain Recommendation & Buying Advice
app.post('/api/gemini/explain-recommendations', async (req, res) => {
  try {
    const { userQuery, preferences, topProducts } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        summary: "Based on your criteria, these products offer the optimal combination of performance, battery life, and overall build quality within your target scope.",
        buyingTips: [
          "Compare battery runtime under real-world usage conditions.",
          "Check warranty coverage and post-purchase customer support.",
          "Evaluate port availability for your existing accessories."
        ],
        thingsToConsider: "Pay attention to non-upgradeable components like soldered memory.",
        valueWinner: topProducts?.[0]?.name || "Primary recommendation"
      });
    }

    const prompt = `User Request: "${userQuery}"
Extracted Preferences: ${JSON.stringify(preferences)}
Top Ranked Products: ${JSON.stringify(topProducts.map((p: any) => ({ name: p.name, brand: p.brand, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons })))}

Provide personalized buying advice and explanations for why these products suit the user's requirements.
Output JSON format:
{
  "summary": "2-3 sentences overview explaining why the top choice wins for their explicit need",
  "buyingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "thingsToConsider": "Key trade-off or caution to keep in mind",
  "valueWinner": "Name of product that provides the best value for money"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/explain-recommendations:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate buying advice' });
  }
});

// API Endpoint 3: Cold Start Follow-up Questions
app.post('/api/gemini/cold-start', async (req, res) => {
  try {
    const { prompt } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        questions: [
          "What is your target budget limit?",
          "What primary use case or purpose do you have in mind?",
          "Are there any specific required features (e.g. noise cancellation, battery life, weight)?"
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
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
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/cold-start:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate cold start questions' });
  }
});

// API Endpoint 4: AI Assistant Copilot
app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { messages, contextProducts } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: "I am ProductPilot AI. How can I help you choose the best product today?"
      });
    }

    const systemInstruction = `You are ProductPilot AI, an intelligent, objective product recommendation assistant.
Available products in catalog:
${JSON.stringify(contextProducts.map((p: any) => ({ id: p.id, name: p.name, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons, category: p.category })))}

Help the user compare items, understand trade-offs, find budget options, or clarify technical specs.
Be friendly, direct, concise, and helpful. Mention specific product names when relevant.`;

    const formattedContents = messages.map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Chat history:\n${formattedContents}\nAssistant:`,
      config: {
        systemInstruction,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/assistant:', error);
    return res.status(500).json({ error: error.message || 'Assistant failed to reply' });
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
